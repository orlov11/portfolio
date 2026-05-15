"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { GradientCover } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

interface ProjectCoverProps {
  image?: string;
  slug: string;
  title: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Open in a full-screen lightbox on click */
  openable?: boolean;
}

export function ProjectCover({
  image,
  slug,
  title,
  className,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  openable = false,
}: ProjectCoverProps) {
  const [errored, setErrored] = useState(false);
  const [open, setOpen] = useState(false);
  const showImage = image && !errored;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!showImage) {
    return <GradientCover seed={slug} label={title} className={className} />;
  }

  const wrapperClass = cn(
    "group relative overflow-hidden rounded-xl border border-border bg-muted",
    className
  );

  return (
    <>
      <div className={wrapperClass}>
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={() => setErrored(true)}
        />
        {openable && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open full-size screenshot of ${title}`}
            className="absolute inset-0 cursor-zoom-in"
          />
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Screenshot of ${title}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <motion.img
              src={image}
              alt={title}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-full max-w-full rounded-lg shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
