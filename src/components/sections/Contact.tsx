import { contact } from "@content/contact.ts";
import { copy } from "@content/copy.ts";
import { site } from "@content/site.ts";
import { CopyButton } from "@/components/CopyButton";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Channel = { label: string; value: string; href?: string; external?: boolean; copy?: string };

export function Contact({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  const channels: Channel[] = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, copy: contact.email },
    { label: "Phone", value: contact.phone, href: contact.phoneHref, copy: contact.phone },
    { label: "WhatsApp", value: contact.whatsappLabel, href: contact.whatsapp, external: true },
    { label: "LinkedIn", value: contact.linkedinLabel, href: contact.linkedin, external: true },
    { label: "Instagram", value: contact.instagramLabel, href: contact.instagram, external: true },
    { label: "Based in", value: contact.location },
  ];
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div>
        <H id="contact-title" className="display contact__title">
          {copy.contact.title}
        </H>
        <p className="contact__lead">{copy.contact.lead}</p>
        <p className="contact__status small">{site.availability}</p>
        <p style={{ marginTop: 28 }}>
          <a href={`mailto:${contact.email}`} className="btn">
            Write an email
            <span className="btn__disc" aria-hidden="true">
              <ArrowRight size={18} strokeWidth={2} />
            </span>
          </a>
        </p>
      </div>
      <ul className="channels">
        {channels.map((c) => (
          <li key={c.label}>
            <span className="label muted">{c.label}</span>
            {c.href ? (
              <a className="channel__value" href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                {c.value}
                {c.external && <span className="visually-hidden"> (opens in new tab)</span>}
              </a>
            ) : (
              <span className="channel__value">{c.value}</span>
            )}
            <span className="channel__actions">
              {c.copy && <CopyButton value={c.copy} label={`Copy ${c.label.toLowerCase()}`} />}
              {c.href && (
                <a
                  className="round-btn"
                  href={c.href}
                  aria-hidden="true"
                  tabIndex={-1}
                  {...(c.external ? { target: "_blank", rel: "noopener" } : {})}
                >
                  <ArrowUpRight size={18} strokeWidth={1.75} />
                </a>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
