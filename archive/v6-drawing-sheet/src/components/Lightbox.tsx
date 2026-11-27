"use client";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Shown = { src: string; alt: string; title: string };

/**
 * Links marked `data-lightbox` point straight at the full image (so they work without JavaScript).
 * With JavaScript, they open the image in a dialog on the page instead.
 */
export function Lightbox() {
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState<Shown | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.("a[data-lightbox]") as HTMLAnchorElement | null;
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      setShown({ src: link.href, alt: link.dataset.alt ?? "", title: link.dataset.title ?? "" });
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={shown?.title || "Document"}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      onClose={() => setShown(null)}
    >
      {shown && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shown.src} alt={shown.alt} />
          <div className="lightbox__bar">
            <p className="small">{shown.title}</p>
            <button type="button" className="icon-btn" onClick={() => ref.current?.close()} aria-label="Close">
              <X size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
