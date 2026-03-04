'use client';

/**
 * Contact
 *
 * Split-layout contact section:
 *   LEFT  — compelling copy + trust signals
 *   RIGHT — React Hook Form with POST to /api/contact
 *
 * On success: sonner toast + animated checkmark SVG.
 * On error:   sonner error toast.
 */
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import {
  CONTACT,
  ROLE_OPTIONS,
  INTEREST_OPTIONS,
} from '@/lib/constants';

/* ── Form field types ── */
interface ContactFormValues {
  full_name: string;
  email: string;
  organization: string;
  role: string;
  country: string;
  interest_type: string;
  message: string;
}

/* ── Shared input/select class builder ── */
const fieldBase =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 focus:border-[#4CAF50] focus:bg-white/10 focus:ring-1 focus:ring-[#4CAF50] min-h-[44px]';

const errorClass = 'border-red-500/60 focus:border-red-500 focus:ring-red-500/50';

/* ── Animated checkmark on success ── */
function SuccessCheckmark() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center gap-4 py-12 text-center"
    >
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#1B5E20]/60 border-2 border-[#4CAF50]">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
        >
          <motion.path
            d="M10 24 L20 34 L38 14"
            stroke="#66BB6A"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="50"
            initial={{ strokeDashoffset: 50 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          />
        </svg>
      </div>
      <h3 className="font-display text-xl font-semibold text-white">Message Sent!</h3>
      <p className="text-sm text-white/60 max-w-xs">
        {CONTACT.successMessage}
      </p>
    </motion.div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? CONTACT.errorMessage);
      }

      toast.success(CONTACT.successMessage, { duration: 6000 });
      setSubmitted(true);
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : CONTACT.errorMessage;
      toast.error(message, { duration: 6000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#0A3D0A] section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 md:items-start">

          {/* ── LEFT: copy + trust signals ── */}
          <RevealOnScroll direction="right">
            <div className="flex flex-col gap-8">
              {/* Badge */}
              <span className="inline-block w-fit rounded-full border border-[#4CAF50]/40 bg-[#4CAF50]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#66BB6A]">
                Get Involved
              </span>

              <div>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight mb-4">
                  {CONTACT.heading}
                </h2>
                <div className="h-px w-20 bg-gradient-to-r from-[#F9A825] to-transparent mb-6" />
                <p className="text-base text-white/65 leading-relaxed">
                  {CONTACT.subheading}
                </p>
              </div>

              {/* Trust items */}
              <ul className="flex flex-col gap-4">
                {CONTACT.trustItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="text-[#66BB6A] flex-shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative element */}
              <div className="hidden md:block mt-4 rounded-xl border border-[#F9A825]/20 bg-[#F9A825]/5 p-5">
                <p className="text-xs text-[#FFCA28]/70 leading-relaxed italic">
                  &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
                  <span className="block mt-2 not-italic font-semibold text-[#FFCA28]/50">— Nelson Mandela</span>
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* ── RIGHT: contact form ── */}
          <RevealOnScroll direction="left" delay={0.1}>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessCheckmark key="success" />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        className={[fieldBase, errors.full_name ? errorClass : ''].join(' ')}
                        {...register('full_name', {
                          required: 'Full name is required.',
                          minLength: { value: 2, message: 'Please enter your full name.' },
                        })}
                      />
                      {errors.full_name && (
                        <p className="mt-1 text-xs text-red-400">{errors.full_name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="jane@organisation.org"
                        className={[fieldBase, errors.email ? errorClass : ''].join(' ')}
                        {...register('email', {
                          required: 'Email address is required.',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address.',
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Organization + Role — two columns on sm+ */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Organization */}
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                          Organisation
                        </label>
                        <input
                          type="text"
                          placeholder="Ministry of Education"
                          className={fieldBase}
                          {...register('organization')}
                        />
                      </div>

                      {/* Role */}
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                          Your Role <span className="text-red-400">*</span>
                        </label>
                        <select
                          className={[
                            fieldBase,
                            'cursor-pointer',
                            errors.role ? errorClass : '',
                          ].join(' ')}
                          {...register('role', { required: 'Please select your role.' })}
                          defaultValue=""
                        >
                          <option value="" disabled className="bg-[#0A3D0A] text-white/40">
                            Select role
                          </option>
                          {ROLE_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              className="bg-[#0A3D0A] text-white"
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.role && (
                          <p className="mt-1 text-xs text-red-400">{errors.role.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Country + Interest — two columns on sm+ */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Country */}
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                          Country
                        </label>
                        <input
                          type="text"
                          placeholder="Ghana"
                          className={fieldBase}
                          {...register('country')}
                        />
                      </div>

                      {/* Area of Interest */}
                      <div>
                        <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                          Area of Interest <span className="text-red-400">*</span>
                        </label>
                        <select
                          className={[
                            fieldBase,
                            'cursor-pointer',
                            errors.interest_type ? errorClass : '',
                          ].join(' ')}
                          {...register('interest_type', {
                            required: 'Please select an area of interest.',
                          })}
                          defaultValue=""
                        >
                          <option value="" disabled className="bg-[#0A3D0A] text-white/40">
                            Select interest
                          </option>
                          {INTEREST_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              className="bg-[#0A3D0A] text-white"
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.interest_type && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.interest_type.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wide">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your interest in UMOJA-ai..."
                        className={[fieldBase, 'resize-none leading-relaxed'].join(' ')}
                        {...register('message')}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-full mt-2 text-base font-semibold"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="inline-block h-4 w-4 rounded-full border-2 border-[#051F05]/30 border-t-[#051F05]"
                          />
                          Sending…
                        </span>
                      ) : (
                        CONTACT.submitLabel
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
