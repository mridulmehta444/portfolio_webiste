import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowUpRight, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/lib/portfolio";
const schema = z.object({
  name: z.string().trim().min(1, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  subject: z.string().trim().min(1, "Enter a subject.").max(150),
  message: z.string().trim().min(1, "Enter a message.").max(3000),
});
export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    if (values["website"]) return;
    const ejs = portfolio.emailjs;
    if (ejs) {
      setSending(true);
      setStatus("");
      try {
        const { name, email, subject, message } = parsed.data;
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: ejs.serviceId,
            template_id: ejs.templateId,
            user_id: ejs.publicKey,
            template_params: {
              name,
              email,
              subject,
              message,
              from_name: name,
              from_email: email,
              reply_to: email,
              title: subject,
            },
          }),
        });
        if (!response.ok) throw new Error("Submission failed");
        setStatus("Your message has been sent. Thank you for reaching out!");
        form.reset();
      } catch {
        setStatus("Your message could not be sent. Please email me directly.");
      } finally {
        setSending(false);
      }
      return;
    }
    if (!portfolio.contactEndpoint) {
      const subject = encodeURIComponent(parsed.data.subject);
      const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`);
      window.location.href = `mailto:${portfolio.email}?subject=${subject}&body=${body}`;
      setStatus("Opening your email app with the message pre-filled — just press send.");
      return;
    }
    setSending(true);
    setStatus("");
    try {
      const response = await fetch(portfolio.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) throw new Error("Submission failed");
      const result = await response.json();
      if (result.success !== true) throw new Error("Delivery not confirmed");
      setStatus("Your message has been received. Thank you for reaching out.");
      form.reset();
    } catch {
      setStatus("Your message could not be sent. Please use the email link below.");
    } finally {
      setSending(false);
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner contact-grid">
        <div>
          <p className="eyebrow">LET’S BUILD SOMETHING</p>
          <h2>
            Let's Connect<span className="text-primary">.</span>
          </h2>
          <p className="section-copy">
            I'm interested in software development opportunities, internships, technical
            collaborations, and projects where I can apply and expand my skills.
          </p>
          <div className="contact-links">
            <a href={`mailto:${portfolio.email}`}>
              <Mail size={20} />
              <span>
                <small>Email me</small>
                {portfolio.email}
              </span>
              <ArrowUpRight size={20} />
            </a>
            <a href="tel:+917888428209">
              <Phone size={20} />
              <span>
                <small>Give me a call</small>
                {portfolio.phone}
              </span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
        <div className="contact-card">
          <h3>Send a Message</h3>
          <form onSubmit={submit} noValidate className="contact-form">
            {["name", "email", "subject", "message"].map((field) => (
              <div key={field}>
                <label htmlFor={field}>
                  {
                    {
                      name: "Full name",
                      email: "Email address",
                      subject: "Subject",
                      message: "Message",
                    }[field]
                  }
                </label>
                {field === "message" ? (
                  <textarea
                    id={field}
                    name={field}
                    required
                    maxLength={3000}
                    aria-invalid={Boolean(errors[field])}
                    aria-describedby={errors[field] ? `${field}-error` : undefined}
                  />
                ) : (
                  <input
                    id={field}
                    name={field}
                    type={field === "email" ? "email" : "text"}
                    required
                    maxLength={field === "name" ? 100 : field === "subject" ? 150 : 255}
                    aria-invalid={Boolean(errors[field])}
                    aria-describedby={errors[field] ? `${field}-error` : undefined}
                  />
                )}{" "}
                {errors[field] && (
                  <p id={`${field}-error`} className="text-destructive">
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <Button disabled={sending} type="submit" className="contact-submit">
              <Send />
              {sending ? "Sending…" : "Send Message"}
            </Button>
            <p role="status">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
