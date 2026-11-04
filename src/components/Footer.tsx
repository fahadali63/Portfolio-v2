import { contact } from "@content/contact.ts";
import { site } from "@content/site.ts";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";

const LinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 10.5v6M8 7.5v.01M12 16.5v-6M12 13c0-1.4 1-2.5 2.3-2.5 1.4 0 2.2 1 2.2 2.7v3.3" />
  </svg>
);
const Instagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </svg>
);

export function Footer() {
  const links = [
    { href: `mailto:${contact.email}`, label: "Email", Icon: () => <Mail size={18} strokeWidth={1.75} aria-hidden="true" /> },
    { href: contact.whatsapp, label: "WhatsApp", Icon: () => <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />, ext: true },
    { href: contact.linkedin, label: "LinkedIn", Icon: LinkedIn, ext: true },
    { href: contact.instagram, label: "Instagram", Icon: Instagram, ext: true },
  ];
  return (
    <footer className="footer">
      <p className="footer__name">
        {site.name} © {new Date().getFullYear()}
      </p>
      <ul className="footer__icons">
        {links.map(({ href, label, Icon, ext }) => (
          <li key={label}>
            <a href={href} aria-label={label + (ext ? " (opens in new tab)" : "")} {...(ext ? { target: "_blank", rel: "noopener" } : {})}>
              <Icon />
            </a>
          </li>
        ))}
        <li>
          <a href="#top" aria-label="Back to top">
            <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
