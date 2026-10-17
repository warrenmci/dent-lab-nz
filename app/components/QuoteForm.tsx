"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ACCEPTED_TYPES,
  MAX_PHOTOS,
  MAX_UPLOAD_BYTES,
  compressImage,
  formatBytes,
} from "@/lib/compress-image";

type Status = "idle" | "submitting" | "sent" | "error";

interface Photo {
  id: string;
  file: File;
  previewUrl: string;
}

const FALLBACK_ERROR =
  "Something went wrong sending your request. Please email dentlabnz@gmail.com or give us a call.";

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [processing, setProcessing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Release preview blobs when the component goes away
  useEffect(() => {
    return () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usedBytes = photos.reduce((sum, photo) => sum + photo.file.size, 0);

  async function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    // Let the same file be picked again after being removed
    event.target.value = "";
    if (!selected.length) return;

    setError("");
    setProcessing(true);

    const accepted: Photo[] = [];
    let running = usedBytes;
    let skippedForSpace = 0;
    let failed = 0;

    for (const file of selected) {
      if (photos.length + accepted.length >= MAX_PHOTOS) {
        skippedForSpace++;
        continue;
      }

      try {
        const compressed = await compressImage(file);
        if (running + compressed.size > MAX_UPLOAD_BYTES) {
          skippedForSpace++;
          continue;
        }
        running += compressed.size;
        accepted.push({
          id: `${file.name}-${file.lastModified}-${accepted.length}`,
          file: compressed,
          previewUrl: URL.createObjectURL(compressed),
        });
      } catch {
        failed++;
      }
    }

    if (accepted.length) setPhotos((current) => [...current, ...accepted]);

    const problems: string[] = [];
    if (failed) {
      problems.push(
        `${failed} file${failed > 1 ? "s" : ""} couldn't be read. Please use a JPG or PNG.`,
      );
    }
    if (skippedForSpace) {
      problems.push(
        `${skippedForSpace} photo${skippedForSpace > 1 ? "s were" : " was"} skipped. Up to ${MAX_PHOTOS} photos fit in one enquiry.`,
      );
    }
    if (problems.length) setError(problems.join(" "));

    setProcessing(false);
    if (status === "error" && !problems.length) setStatus("idle");
  }

  function removePhoto(id: string) {
    setPhotos((current) => {
      const match = current.find((photo) => photo.id === id);
      if (match) URL.revokeObjectURL(match.previewUrl);
      return current.filter((photo) => photo.id !== id);
    });
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const payload = new FormData(event.currentTarget);
    photos.forEach((photo) => payload.append("photos", photo.file));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data?.error || FALLBACK_ERROR);
        setStatus("error");
        return;
      }

      setStatus("sent");
      formRef.current?.reset();
      photos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      setPhotos([]);
    } catch {
      setError(FALLBACK_ERROR);
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[var(--accent)] focus:bg-white/8 focus:ring-2 focus:ring-[var(--accent)]/30";

  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 sm:p-8">
      <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
        Get a free quote
      </h3>
      <p className="mt-1 text-sm text-white/50">
        Describe your damage or send photos, and we&apos;ll get back to you fast.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative mt-6 space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-medium text-white/60">
              Full name
            </label>
            <input
              id="name"
              name="name"
              required
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="phone"
              className="text-xs font-medium text-white/60"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={inputClass}
              placeholder="021 000 0000"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-white/60">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@email.com"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="vehicle"
            className="text-xs font-medium text-white/60"
          >
            Vehicle (make, model, year)
          </label>
          <input
            id="vehicle"
            name="vehicle"
            className={inputClass}
            placeholder="e.g. Toyota Corolla 2021"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="damage" className="text-xs font-medium text-white/60">
            Type of damage
          </label>
          <select
            id="damage"
            name="damage"
            className={`${inputClass} cursor-pointer`}
            defaultValue=""
          >
            <option value="" disabled className="bg-[#1a1a1a] text-white/30">
              Select damage type
            </option>
            <option value="door-ding" className="bg-[#1a1a1a] text-white">
              Door ding / parking dent
            </option>
            <option value="hail" className="bg-[#1a1a1a] text-white">
              Hail damage
            </option>
            <option value="crease" className="bg-[#1a1a1a] text-white">
              Crease or sharp dent
            </option>
            <option value="panel" className="bg-[#1a1a1a] text-white">
              Panel dent
            </option>
            <option value="garage-door" className="bg-[#1a1a1a] text-white">
              Garage door
            </option>
            <option value="fleet" className="bg-[#1a1a1a] text-white">
              Fleet / multiple vehicles
            </option>
            <option value="other" className="bg-[#1a1a1a] text-white">
              Other / not sure
            </option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-xs font-medium text-white/60"
          >
            Additional details
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className={`${inputClass} resize-none rounded-lg`}
            placeholder="Location, number of dents, any other info..."
          />
        </div>

        {/* Photos, compressed in the browser before upload */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-medium text-white/60">
              Photos of the damage{" "}
              <span className="text-white/30">(optional)</span>
            </span>
            <span className="text-[0.7rem] tabular-nums text-white/30">
              {photos.length}/{MAX_PHOTOS}
              {usedBytes > 0 && ` · ${formatBytes(usedBytes)}`}
            </span>
          </div>

          <input
            ref={fileInputRef}
            id="photos"
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple
            className="sr-only"
            onChange={handleFiles}
            disabled={processing || photos.length >= MAX_PHOTOS}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={processing || photos.length >= MAX_PHOTOS}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-4 py-3 text-xs font-medium text-white/60 transition hover:border-[var(--accent)]/40 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="h-4 w-4 text-[var(--accent)]"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z" />
            </svg>
            {processing
              ? "Preparing photos..."
              : photos.length >= MAX_PHOTOS
                ? `Maximum ${MAX_PHOTOS} photos added`
                : photos.length
                  ? "Add another photo"
                  : "Add photos"}
          </button>

          <p className="text-[0.7rem] leading-relaxed text-white/30">
            Clear shots from a couple of angles help us quote accurately. Photos
            are resized on your device before sending, so large files are fine.
          </p>

          {photos.length > 0 && (
            <ul className="grid grid-cols-3 gap-2 pt-1 sm:grid-cols-5">
              {photos.map((photo) => (
                <li
                  key={photo.id}
                  className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-black/40"
                >
                  <Image
                    src={photo.previewUrl}
                    alt={photo.file.name}
                    fill
                    unoptimized
                    sizes="120px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    aria-label={`Remove ${photo.file.name}`}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/75 text-xs leading-none text-white/80 transition hover:bg-black hover:text-white"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Honeypot: hidden from users, catches naive spam bots */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting" || status === "sent" || processing}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting"
            ? "Sending..."
            : status === "sent"
              ? "Quote requested ✓"
              : status === "error"
                ? "Try again"
                : "Request free quote"}
        </button>

        <div aria-live="polite" className="empty:hidden">
          {status === "sent" && (
            <p className="text-xs text-white/50">
              Thanks, we&apos;ll be in touch within one business day.
            </p>
          )}
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
