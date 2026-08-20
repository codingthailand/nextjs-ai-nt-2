import { describe, it, expect } from "vitest";
import { contactSchema, escapeHtml } from "./contact-schema";

const validInput = {
  name: "สมชาย ใจดี",
  email: "somchai@example.com",
  subject: "สอบถามสินค้า",
  message: "อยากทราบราคาสินค้าล่าสุดครับ",
};

describe("contactSchema", () => {
  it("accepts a valid contact input", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts an empty honeypot field", () => {
    const result = contactSchema.safeParse({ ...validInput, website: "" });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "ก" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("rejects name longer than 100 characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "ก".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects subject shorter than 3 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, subject: "ab" });
    expect(result.success).toBe(false);
  });

  it("rejects subject longer than 150 characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      subject: "ก".repeat(151),
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "สั้นมาก" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });

  it("rejects message longer than 2000 characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: "ก".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("trims whitespace before validating length", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "  ก  ",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name containing a newline", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "สมชาย\nโจมตี",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("rejects email containing a newline", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "somchai@example.com\nuser",
    });
    expect(result.success).toBe(false);
  });

  it("rejects subject containing a newline", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      subject: "หัวข้อ\rโจมตี",
    });
    expect(result.success).toBe(false);
  });

  it("allows newlines in the message body", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: "บรรทัดแรก\nบรรทัดที่สอง\nบรรทัดที่สาม",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an oversized honeypot field", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      website: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const result = contactSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("escapeHtml", () => {
  it("escapes html special characters", () => {
    expect(escapeHtml('<a href="x" onclick="y">&\'</a>')).toBe(
      "&lt;a href=&quot;x&quot; onclick=&quot;y&quot;&gt;&amp;&#39;&lt;/a&gt;"
    );
  });
});
