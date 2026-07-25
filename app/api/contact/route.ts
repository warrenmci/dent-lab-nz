import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BUSINESS } from "@/lib/site";

/**
 * Server-side mirrors of the client limits in lib/compress-image.ts. The browser
 * compresses before uploading, but nothing stops a direct POST, so re-check here.
 */
const MAX_PHOTOS = 5;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const MAX_FILE_BYTES = 2 * 1024 * 1024;

function clean(value: FormDataEntryValue | null, max = 200): string {
  if (typeof value !== "string") return "";
  // Strip CR/LF so a submitted value can't inject extra mail headers
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

/** Keep only characters that are safe in a MIME filename. */
function safeFilename(name: string, fallback: string): string {
  const cleaned = name
    .replace(/[\r\n]+/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/^\.+/, "")
    .slice(-80);
  return cleaned || fallback;
}

export async function POST(req: NextRequest) {
  let form: FormData;

  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans never see them
  if (clean(form.get("company"))) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(form.get("name"), 120);
  const email = clean(form.get("email"), 200);
  const phone = clean(form.get("phone"), 40);
  const vehicle = clean(form.get("vehicle"), 120);
  const damage = clean(form.get("damage"), 60);
  const message = clean(form.get("message"), 5000);

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please provide your name and email." },
      { status: 400 }
    );
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  const photos = form
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (photos.length > MAX_PHOTOS) {
    return NextResponse.json(
      { error: `Please attach no more than ${MAX_PHOTOS} photos.` },
      { status: 400 }
    );
  }

  let totalBytes = 0;
  for (const photo of photos) {
    if (!photo.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Attachments must be image files." },
        { status: 400 }
      );
    }
    if (photo.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "One of your photos is too large to send." },
        { status: 413 }
      );
    }
    totalBytes += photo.size;
  }

  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Your photos are too large in total. Please attach fewer." },
      { status: 413 }
    );
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("[contact] SMTP credentials are not configured");
    return NextResponse.json(
      { error: "Quote requests are temporarily unavailable." },
      { status: 503 }
    );
  }

  const attachments = await Promise.all(
    photos.map(async (photo, i) => ({
      filename: safeFilename(photo.name, `photo-${i + 1}.jpg`),
      content: Buffer.from(await photo.arrayBuffer()),
      contentType: photo.type,
    }))
  );

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${BUSINESS.name} Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? BUSINESS.email,
      replyTo: email,
      subject: `New quote request from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "not provided"}`,
        `Vehicle: ${vehicle || "not provided"}`,
        `Damage type: ${damage || "not provided"}`,
        `Photos attached: ${attachments.length}`,
        `Message:\n${message || "—"}`,
      ].join("\n"),
      attachments,
    });
  } catch (error) {
    console.error("[contact] Failed to send quote request", error);
    return NextResponse.json(
      {
        error: `We couldn't send your request. Please email us directly at ${BUSINESS.email}.`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
