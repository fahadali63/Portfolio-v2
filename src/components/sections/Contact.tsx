import { contact } from "@content/contact.ts";
import { copy } from "@content/copy.ts";
import { site } from "@content/site.ts";
import { ArrowUpRight, Download } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { MailCta } from "@/components/MailCta";
import { Block, noDot, TitleBlock } from "@/components/Sheet";

type Channel = { label: string; value: string; href?: string; external?: boolean; copy?: string };

/** Contact: the primary action in the title block, then every channel in one ruled list. */
export function Contact() {
  const channels: Channel[] = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, copy: contact.email },
    { label: "Phone", value: contact.phone, href: contact.phoneHref, copy: contact.phone },
    { label: "WhatsApp", value: contact.whatsappLabel, href: contact.whatsapp, external: true },
    { label: "LinkedIn", value: contact.linkedinLabel, href: contact.linkedin, external: true },
    { label: "Instagram", value: contact.instagramLabel, href: contact.instagram, external: true },
  ];
  return (
    <>
      <TitleBlock
        code="G-05"
        title={noDot(copy.contact.title)}
        lead={
          <>
            <p className="title-block__lead-strong">{copy.contact.lead}</p>
            <p>{site.availability}.</p>
          </>
        }
        meta={[{ label: "Based in", value: contact.location }]}
      >
        <p className="btn-row">
          <MailCta href={`mailto:${contact.email}`} rest="Write an email" />
        </p>
      </TitleBlock>

      <Block id="channels" title="Channels" caption="Copy a value or open it directly">
        <ul className="channels">
          {channels.map((c) => (
            <li key={c.label}>
              <span className="channels__label">{c.label}</span>
              {c.href ? (
                <a className="channels__value" href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                  {c.value}
                  {c.external && (
                    <>
                      <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                      <span className="visually-hidden"> (opens in new tab)</span>
                    </>
                  )}
                </a>
              ) : (
                <span className="channels__value">{c.value}</span>
              )}
              <span className="channels__action">{c.copy && <CopyButton value={c.copy} label={`Copy ${c.label.toLowerCase()}`} />}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="resumes" title="Résumés" caption="One per career, as PDF">
        <p className="btn-row">
          {contact.resumes.map((r) => (
            <a key={r.track} className="btn btn--secondary" href={r.file} download={r.download} data-track={r.track}>
              <Download size={16} strokeWidth={1.5} aria-hidden="true" /> {noDot(r.label)}
            </a>
          ))}
        </p>
      </Block>
    </>
  );
}
