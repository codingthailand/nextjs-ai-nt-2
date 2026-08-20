import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema, escapeHtml } from "@/lib/contact-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "ข้อมูลที่ส่งมาไม่ถูกต้อง" },
      { status: 400 }
    );
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot filled -> pretend success, do not send any email.
  if (typeof raw.website === "string" && raw.website !== "") {
    return NextResponse.json({
      message: "ข้อความของคุณถูกส่งเรียบร้อยแล้ว",
    });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "กรุณาตรวจสอบข้อมูลในฟอร์ม",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!process.env.RESEND_API_KEY || !from || !to) {
    console.error(
      "Contact feature is not configured: missing RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL"
    );
    return NextResponse.json(
      { message: "ระบบขัดข้อง กรุณาลองใหม่ภายหลัง" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  let result: { error: { message: string } | null };
  try {
    result = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[ติดต่อผ่านเว็บ] ${subject}`,
      html: `
        <p><strong>ชื่อ:</strong> ${escapeHtml(name)}</p>
        <p><strong>อีเมล:</strong> ${escapeHtml(email)}</p>
        <p><strong>หัวข้อ:</strong> ${escapeHtml(subject)}</p>
        <p><strong>ข้อความ:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
      text: `ชื่อ: ${name}\nอีเมล: ${email}\nหัวข้อ: ${subject}\n\nข้อความ:\n${message}`,
    });
  } catch (err) {
    console.error(
      "Resend send error:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      { message: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่ภายหลัง" },
      { status: 500 }
    );
  }

  if (result.error) {
    console.error("Resend send error:", result.error.message);
    return NextResponse.json(
      { message: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่ภายหลัง" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "ข้อความของคุณถูกส่งเรียบร้อยแล้ว",
  });
}
