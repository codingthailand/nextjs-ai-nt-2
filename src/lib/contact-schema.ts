import * as z from "zod";

const noLineBreaks = (value: string) => !/[\r\n]/.test(value);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร")
    .max(100, "ชื่อต้องไม่ยาวเกิน 100 ตัวอักษร")
    .refine(noLineBreaks, "ห้ามใช้การขึ้นบรรทัดใหม่ในช่องนี้"),
  email: z
    .string()
    .trim()
    .min(1, "กรุณากรอกอีเมล")
    .pipe(z.email("รูปแบบอีเมลไม่ถูกต้อง"))
    .refine(noLineBreaks, "ห้ามใช้การขึ้นบรรทัดใหม่ในช่องนี้"),
  subject: z
    .string()
    .trim()
    .min(3, "หัวข้อต้องมีความยาวอย่างน้อย 3 ตัวอักษร")
    .max(150, "หัวข้อต้องไม่ยาวเกิน 150 ตัวอักษร")
    .refine(noLineBreaks, "ห้ามใช้การขึ้นบรรทัดใหม่ในช่องนี้"),
  message: z
    .string()
    .trim()
    .min(10, "ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร")
    .max(2000, "ข้อความต้องไม่ยาวเกิน 2000 ตัวอักษร"),
  website: z.string().trim().max(2000).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
