import { Redis } from '@upstash/redis'
import { revalidateTag, unstable_cache } from 'next/cache'

export type InstagramMediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'

export interface InstagramPost {
  id: string
  media_type: InstagramMediaType
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
}

interface InstagramApiResponse {
  data: InstagramPost[]
  paging?: {
    cursors: { before: string; after: string }
    next?: string
  }
}

const FIELDS = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp'
const BASE_URL = 'https://graph.instagram.com'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Namespaced per site so a Redis store shared with another project can't hand
// this site the other account's token (or have its refresh overwrite ours).
const TOKEN_KEY = 'dentlabnz:instagram:access_token'

async function getToken(): Promise<string> {
  const stored = await redis.get<string>(TOKEN_KEY)
  if (stored) return stored

  // Falls back to env var on first deploy, before cron has run
  const envToken = process.env.INSTAGRAM_GRAPH_API_KEY
  if (envToken) return envToken

  throw new Error('No Instagram access token found in Redis or environment')
}

/**
 * The Upstash client issues an uncached (`no-store`) fetch, which would opt the
 * whole homepage out of static rendering. Wrapping the lookup in the data cache
 * keeps the page statically generated with ISR. The cron only rotates the token
 * monthly and Instagram's long-lived tokens last 60 days, so a day of staleness
 * is harmless.
 */
const getCachedToken = unstable_cache(getToken, ['dentlabnz-instagram-access-token'], {
  revalidate: 86400,
  tags: ['instagram-token'],
})

export async function getInstagramPosts(limit = 12): Promise<InstagramPost[]> {
  const token = await getCachedToken()

  const url = `${BASE_URL}/me/media?fields=${FIELDS}&limit=${limit}&access_token=${token}`

  const res = await fetch(url, {
    next: { revalidate: 604800, tags: ['instagram'] }, // Re-fetch images once a week
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(
      `Instagram API error ${res.status}: ${error?.error?.message ?? res.statusText}`
    )
  }

  const json: InstagramApiResponse = await res.json()
  return json.data
}

export async function refreshInstagramToken(): Promise<string> {
  const token = await getToken()

  const url = `${BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`

  const res = await fetch(url)

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(
      `Token refresh failed ${res.status}: ${error?.error?.message ?? res.statusText}`
    )
  }

  const json = await res.json()
  const newToken = json.access_token as string

  await redis.set(TOKEN_KEY, newToken)

  // Drop the cached copy so the next render picks the new token up immediately
  revalidateTag('instagram-token', 'max')
  console.log('[instagram] Token updated in Redis')

  return newToken
}
