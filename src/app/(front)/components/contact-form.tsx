"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RiCheckboxCircleFill, RiErrorWarningLine } from "@remixicon/react";

import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

type Status = "idle" | "pending" | "success" | "error";

type SubmitResult = {
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    if (form.formState.isSubmitting) return;
    setStatus("pending");
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json().catch(() => ({}))) as SubmitResult;

      if (!response.ok) {
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            const message = messages?.[0];
            if (message) {
              form.setError(field as keyof ContactFormValues, {
                type: "server",
                message,
              });
            }
          }
        }
        setSubmitError(
          result.message ?? "เกิดข้อผิดพลาด กรุณาลองใหม่ภายหลัง"
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setSubmitError("ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองใหม่ภายหลัง");
      setStatus("error");
    }
  }

  return (
    <form
      id="form-contact"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => {
            const errorId = "contact-form-name-error";
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-form-name">ชื่อ</FieldLabel>
                <Input
                  {...field}
                  id="contact-form-name"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? errorId : undefined}
                  placeholder="ชื่อของคุณ"
                  autoComplete="name"
                />
                {fieldState.invalid && (
                  <FieldError id={errorId} errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => {
            const errorId = "contact-form-email-error";
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-form-email">อีเมล</FieldLabel>
                <Input
                  {...field}
                  id="contact-form-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? errorId : undefined}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError id={errorId} errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => {
            const errorId = "contact-form-subject-error";
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-form-subject">หัวข้อ</FieldLabel>
                <Input
                  {...field}
                  id="contact-form-subject"
                  type="text"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? errorId : undefined}
                  placeholder="หัวข้อที่ต้องการติดต่อ"
                />
                {fieldState.invalid && (
                  <FieldError id={errorId} errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => {
            const errorId = "contact-form-message-error";
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="contact-form-message">ข้อความ</FieldLabel>
                <Textarea
                  {...field}
                  id="contact-form-message"
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? errorId : undefined}
                  placeholder="รายละเอียดข้อความของคุณ"
                  rows={6}
                />
                {fieldState.invalid && (
                  <FieldError id={errorId} errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />

        <Controller
          name="website"
          control={form.control}
          render={({ field }) => (
            <div className="sr-only" aria-hidden="true">
              <FieldLabel htmlFor="contact-form-website">
                อย่ากรอกช่องนี้
              </FieldLabel>
              <Input
                {...field}
                id="contact-form-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
          )}
        />

        <div aria-live="polite">
          {status === "success" && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
            >
              <RiCheckboxCircleFill className="mt-0.5 size-4 shrink-0" />
              ข้อความของคุณถูกส่งเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด
            </div>
          )}

          {status === "error" && submitError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              <RiErrorWarningLine className="mt-0.5 size-4 shrink-0" />
              {submitError}
            </div>
          )}
        </div>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className="mt-8 w-full"
        disabled={status === "pending"}
      >
        {status === "pending" && <Spinner aria-hidden="true" />}
        ส่งข้อความ
      </Button>
    </form>
  );
}
