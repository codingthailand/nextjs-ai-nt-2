# Feature: Contact Us

## Goal

สร้างหน้า `/contact` เพื่อให้ผู้เยี่ยมชมเว็บไซต์สามารถส่งข้อความติดต่อร้านได้จากหน้าเว็บ

หน้า Contact ต้องเป็น public page และใช้งานได้ทั้ง Desktop และ Mobile

---

## Requirements

### 1. Contact Page

สร้างหน้า:

`/contact`

Layout:

- Desktop: 2 คอลัมน์
- Mobile: 1 คอลัมน์
- ซ้าย: ข้อมูลติดต่อ
- ขวา: Contact Form

ข้อมูลติดต่อประกอบด้วย:

- ที่อยู่
- เบอร์โทร
- อีเมล
- เวลาทำการ
- Social links
- FAQ 3–4 ข้อ

เพิ่มลิงก์ `/contact` ใน navigation ของเว็บไซต์ด้วย

---

### 2. Contact Form

ฟอร์มประกอบด้วย:

- Name
- Email
- Subject
- Message
- Honeypot field สำหรับลด spam

Validation:

- name: 2–100 ตัวอักษร
- email: ต้องเป็น email ที่ถูกต้อง
- subject: 3–150 ตัวอักษร
- message: 10–2000 ตัวอักษร

Validation ที่สำคัญต้องทำฝั่ง Server

---

### 3. Send Email

เมื่อข้อมูลถูกต้อง ให้ส่งอีเมลแจ้ง Admin ผ่าน Resend

ใช้ environment variables:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

ข้อกำหนด:

- `from` ต้องใช้ `CONTACT_FROM_EMAIL`
- `to` ต้องใช้ `CONTACT_TO_EMAIL`
- `replyTo` ใช้อีเมลของผู้กรอก
- ห้ามเปิดเผย API key หรือ error ภายในระบบให้ client

ไม่ต้องส่ง Auto Reply กลับผู้ใช้

---

### 4. Form States

ฟอร์มต้องรองรับ:

- idle
- pending
- success
- validation error
- send error

เมื่อ validation หรือส่งอีเมลไม่สำเร็จ:

- แสดงข้อความ error ที่เหมาะสม
- ค่าที่ผู้ใช้กรอกไว้ต้องไม่หาย

เมื่อส่งสำเร็จ:

- แสดงข้อความสำเร็จ
- reset form

---

## Security

- Validate ข้อมูลฝั่ง Server
- ห้ามเชื่อข้อมูลจาก client โดยตรง
- ห้ามรับอีเมลปลายทางจาก client
- Secrets ต้องอยู่ฝั่ง Server เท่านั้น
- Honeypot มีค่า → ไม่ส่งอีเมล แต่ตอบเหมือนส่งสำเร็จ

---

## Accessibility

- ทุก field มี label
- Validation error เชื่อมกับ field ที่เกี่ยวข้อง
- ใช้งานด้วย keyboard ได้
- แสดง status/error ให้ screen reader รับรู้ได้

---

## Out of Scope

ไม่ต้องทำ:

- CAPTCHA
- Google Maps
- File Upload
- Admin Page
- Database
- Auto Reply
- Rate Limiting

---

## Acceptance Criteria

Feature ถือว่าเสร็จเมื่อ:

- `/contact` เปิดได้โดยไม่ต้อง login
- Desktop แสดง 2 คอลัมน์
- Mobile แสดง 1 คอลัมน์
- Contact Form แสดง validation ถูกต้อง
- ข้อมูลไม่หายเมื่อ validation error
- ส่งอีเมลผ่าน Resend ได้
- `replyTo` เป็นอีเมลของผู้กรอก
- Honeypot ไม่ทำให้เกิดการส่งอีเมลจริง
- ไม่มี secret หรือ internal error หลุดไป client
- Pending / Success / Error state ทำงานครบ
- Project ผ่าน lint, type check, test และ build

---

## Implementation Guidance

ให้ Coding Agent:

1. ตรวจสอบโครงสร้างและ convention ของ project ก่อน
2. Reuse component หรือ utility ที่มีอยู่แล้วเมื่อเหมาะสม
3. เลือกโครงสร้างไฟล์ให้สอดคล้องกับ project
4. หลีกเลี่ยงการสร้าง abstraction ที่ไม่จำเป็น
5. หลัง implement ให้รัน test, lint, type check และ build
6. รายงานไฟล์ที่สร้างหรือแก้ไข พร้อมสรุปผลการทดสอบ