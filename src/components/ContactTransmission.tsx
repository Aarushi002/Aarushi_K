"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { useSound } from "@/context/SoundContext";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

const CONTACT_EMAIL = "aarushikrishna5@gmail.com";

const initial: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

function validate(data: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Valid email, please — no phantom inboxes.";
  if (!data.projectType.trim()) errors.projectType = "What are we building?";
  if (!data.budget.trim()) errors.budget = "Ballpark helps me calibrate scope.";
  if (data.message.trim().length < 12)
    errors.message = "A few more characters — surprise me with context.";
  return errors;
}

export function ContactTransmission() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const { playTick } = useSound();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (honeypot.trim()) return;

    try {
      setSubmitting(true);
      const subject = `[Portfolio] ${form.name.trim()} — ${form.projectType.trim()}`;
      const body = [
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Project type: ${form.projectType.trim()}`,
        `Budget: ${form.budget.trim()}`,
        ``,
        `Message:`,
        form.message.trim(),
      ].join("\n");

      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      setSent(true);
      playTick();
    } catch {
      setSubmitError("Could not open your email app. Please try again.");
      playTick();
    } finally {
      setSubmitting(false);
    }
  };

  const field = (key: keyof FormState) =>
    cnInput(errors[key] ? "border-accent-cyan ring-1 ring-accent-cyan/30" : "");

  return (
    <section
      id="contact"
      className="relative z-10 scroll-mt-20 border-y border-stone-200/90 bg-gradient-to-b from-stone-50 via-zinc-50 to-stone-100 px-4 py-14 text-zinc-900 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.4em] text-violet-600">
              Contact
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-zinc-900 md:text-4xl lg:text-5xl">
              Let&apos;s make{" "}
              <span className="holo-text">something real</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
              Got a project sitting on your &ldquo;I&rsquo;ll do it later&rdquo;
              list? Let&rsquo;s change that.
            </p>
            <div className="mt-6 max-w-2xl space-y-3 text-base font-medium leading-relaxed text-zinc-800 md:text-lg">
              <p>
                I help turn ideas into fast, scalable, and impactful web
                solutions.
              </p>
              <p className="font-normal text-zinc-600">
                Open for freelance work — remote-friendly and quick to respond.
              </p>
            </div>
          </div>

          <motion.div
            layout
            className="relative min-w-0 rounded-xl border border-zinc-200/90 bg-white/95 p-5 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] ring-1 ring-zinc-900/[0.04] backdrop-blur-sm md:p-6"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-lavender to-accent-cyan" aria-hidden />
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="relative flex flex-col items-center gap-3 py-6 pl-4 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center bg-accent-cyan text-base text-white">
                    <Send className="h-7 w-7" aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900">Received</h3>
                  <p className="max-w-sm text-sm text-zinc-600">
                    A prefilled email draft has been opened. Hit send in your mail app.
                  </p>
                  <button
                    type="button"
                    className="focus-orbit mt-2 border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 hover:border-accent-cyan"
                    onClick={() => {
                      setSent(false);
                      setForm(initial);
                      setErrors({});
                      setSubmitError(null);
                      setHoneypot("");
                    }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  id="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="relative space-y-3 pl-4"
                  noValidate
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="co-name"
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-600"
                      >
                        Name
                      </label>
                      <input
                        id="co-name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className={field("name")}
                        placeholder="Ada Lovelace"
                      />
                      {errors.name ? (
                        <p className="mt-1 text-xs text-accent-cyan">{errors.name}</p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="co-email"
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-600"
                      >
                        Email
                      </label>
                      <input
                        id="co-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        className={field("email")}
                        placeholder="you@studio.com"
                      />
                      {errors.email ? (
                        <p className="mt-1 text-xs text-accent-cyan">{errors.email}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="co-type"
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-600"
                      >
                        Project type
                      </label>
                      <input
                        id="co-type"
                        value={form.projectType}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            projectType: e.target.value,
                          }))
                        }
                        className={field("projectType")}
                        placeholder="MERN, Shopify, WordPress…"
                      />
                      {errors.projectType ? (
                        <p className="mt-1 text-xs text-accent-cyan">
                          {errors.projectType}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="co-budget"
                        className="text-xs font-semibold uppercase tracking-wider text-zinc-600"
                      >
                        Budget
                      </label>
                      <select
                        id="co-budget"
                        value={form.budget}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, budget: e.target.value }))
                        }
                        className={field("budget")}
                      >
                        <option value="">Select range</option>
                        <option value="<2k">&lt; $2k</option>
                        <option value="2k-5k">$2k – $5k</option>
                        <option value="5k-15k">$5k – $15k</option>
                        <option value="15k+">$15k+</option>
                        <option value="discuss">Let&apos;s discuss</option>
                      </select>
                      {errors.budget ? (
                        <p className="mt-1 text-xs text-accent-cyan">{errors.budget}</p>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="co-msg"
                      className="text-xs font-semibold uppercase tracking-wider text-zinc-600"
                    >
                      Message
                    </label>
                    <textarea
                      id="co-msg"
                      rows={3}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      className={`${field("message")} min-h-[88px] resize-y`}
                      placeholder="Goals, timeline, and the vibe you want."
                    />
                    {errors.message ? (
                      <p className="mt-1 text-xs text-accent-cyan">{errors.message}</p>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="hidden"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                  {submitError ? (
                    <p
                      className="text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="focus-orbit flex w-full items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent-cyan py-3 text-sm font-bold uppercase tracking-widest text-white shadow-[0_0_28px_rgba(124,58,237,0.35)] hover:opacity-95 disabled:pointer-events-none disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" aria-hidden />
                    {submitting ? "Sending…" : "Send"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function cnInput(extra: string) {
  return [
    "focus-orbit mt-1.5 w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400",
    "focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30",
    extra,
  ].join(" ");
}
