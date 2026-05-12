"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/common/material-icon";

type OtpFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  targetHref: string;
  helperLabel: string;
  helperHref?: string;
  showTimer?: boolean;
  footerNote?: string;
  badgeLabel?: string;
};

export function OtpForm({
  title,
  description,
  submitLabel,
  targetHref,
  helperLabel,
  helperHref,
  showTimer = false,
  footerNote,
  badgeLabel,
}: OtpFormProps) {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(178);
  const [submitted, setSubmitted] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!showTimer) {
      return;
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [showTimer]);

  const formattedTimer = useMemo(() => {
    const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const seconds = String(secondsLeft % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  function updateDigit(value: string, index: number) {
    const nextDigits = [...digits];
    nextDigits[index] = value.replace(/\D/g, "").slice(-1);
    setDigits(nextDigits);

    if (nextDigits[index] && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) {
      return;
    }

    const nextDigits = pasted.split("");
    while (nextDigits.length < 6) {
      nextDigits.push("");
    }
    setDigits(nextDigits);

    const lastFilledIndex = Math.min(pasted.length, 6) - 1;
    inputsRef.current[Math.max(lastFilledIndex, 0)]?.focus();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (digits.some((digit) => digit.length === 0)) {
      return;
    }

    router.push(targetHref);
  }

  return (
    <div className="glass-card-strong rounded-xl p-xl text-center">
      <div className="mx-auto mb-md flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10 electric-glow">
        <MaterialIcon className="text-[42px] text-primary" name="shield_person" filled />
      </div>

      <div className="space-y-xs">
        <h1 className="font-h2 text-h2 text-on-surface">{title}</h1>
        <p className="mx-auto max-w-md text-body-md text-on-surface-variant">{description}</p>
      </div>

      <form className="mt-lg space-y-md" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-xs md:gap-sm" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              className="h-14 w-12 rounded-lg border border-outline-variant bg-[#0F172A] text-center font-data-mono text-h3 text-primary outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary/30 md:h-16 md:w-14"
              inputMode="numeric"
              key={index}
              maxLength={1}
              onChange={(event) => updateDigit(event.target.value, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              placeholder="·"
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              value={digit}
            />
          ))}
        </div>

        {submitted && digits.some((digit) => digit.length === 0) ? (
          <div className="rounded-lg border border-error/20 bg-error/10 p-sm text-sm text-error">
            Saisis les 6 chiffres pour poursuivre.
          </div>
        ) : null}

        {showTimer ? (
          <div className="flex items-center justify-center gap-xs text-on-surface-variant">
            <MaterialIcon className="text-[18px]" name="timer" />
            <span className="font-data-mono text-data-mono">
              Code expire dans: <span className="text-primary">{formattedTimer}</span>
            </span>
          </div>
        ) : null}

        <button className="primary-button w-full justify-center py-md text-body-md" type="submit">
          {submitLabel}
        </button>

        <div className="border-t border-white/5 pt-md text-center">
          {helperHref ? (
            <Link className="font-label-caps text-label-caps text-primary hover:underline" href={helperHref}>
              {helperLabel}
            </Link>
          ) : (
            <button className="font-label-caps text-label-caps text-primary hover:underline" type="button">
              {helperLabel}
            </button>
          )}
        </div>
      </form>

      {footerNote || badgeLabel ? (
        <div className="mt-md flex items-center gap-md rounded-xl border border-white/5 bg-white/[0.03] p-md text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-highest">
            <MaterialIcon className="text-secondary" name="send" filled />
          </div>
          <div className="flex-1">
            <p className="font-label-caps text-label-caps text-on-surface-variant">CANAL DE SÉCURITÉ</p>
            <p className="font-medium text-on-surface">{footerNote}</p>
          </div>
          {badgeLabel ? (
            <span className="rounded-full bg-secondary/10 px-sm py-xs font-label-caps text-[10px] text-secondary">
              {badgeLabel}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
