"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "กรุณากรอกชื่อ")
      .min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร")
      .max(50, "ชื่อต้องไม่เกิน 50 ตัวอักษร"),
    email: z
      .string()
      .min(1, "กรุณากรอกอีเมล")
      .email("รูปแบบอีเมลไม่ถูกต้อง"),
    password: z
      .string()
      .min(1, "กรุณากรอกรหัสผ่าน")
      .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
    confirmPassword: z
      .string()
      .min(1, "กรุณายืนยันรหัสผ่าน"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: RegisterFormValues) {
     await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
     }, {
        onSuccess: () => {
          alert('สมัครสมาชิกสำเร็จ');
          router.replace('/login');
        },
        onError: (ctx) => {
          alert(JSON.stringify(ctx.error));
        }
     });
  }

  return (
  <div className="min-h-screen flex items-center justify-center">
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>สมัครสมาชิก</CardTitle>
        <CardDescription>
          กรอกข้อมูลด้านล่างเพื่อสร้างบัญชีใหม่
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-register" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-name">ชื่อ</FieldLabel>
                  <Input
                    {...field}
                    id="form-register-name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="สมชาย ใจดี"
                    autoComplete="name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-email">อีเมล</FieldLabel>
                  <Input
                    {...field}
                    id="form-register-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-password">
                    รหัสผ่าน
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-confirm-password">
                    ยืนยันรหัสผ่าน
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-confirm-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button type="submit" form="form-register" className="w-full">
          สมัครสมาชิก
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          มีบัญชีอยู่แล้ว?{" "}
          <a
            href="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            เข้าสู่ระบบ
          </a>
        </p>
      </CardFooter>
    </Card>
  </div>
  )
}