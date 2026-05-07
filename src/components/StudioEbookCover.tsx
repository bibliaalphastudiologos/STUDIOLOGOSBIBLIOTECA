import React from "react";
import { type Ebook } from "../studioTypes";

interface StudioEbookCoverProps {
  ebook: Ebook;
  className?: string;
  compact?: boolean;
  showTitle?: boolean;
}

function initials(value: string): string {
  return value
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function coverTitleClass(title: string, compact: boolean): string {
  if (compact) {
    if (title.length > 48) return "text-[9px] sm:text-[10px] md:text-xs leading-[1.08] md:leading-[1.12]";
    if (title.length > 32) return "text-[10px] sm:text-[11px] md:text-[13px] leading-[1.1] md:leading-[1.13]";
    return "text-[11px] sm:text-xs md:text-sm leading-[1.12] md:leading-[1.15]";
  }

  if (title.length > 56) return "text-base md:text-lg leading-[1.08]";
  if (title.length > 34) return "text-lg md:text-xl leading-[1.1]";
  return "text-xl md:text-2xl leading-[1.08]";
}

export function StudioEbookCover({ ebook, className = "", compact = false, showTitle = true }: StudioEbookCoverProps) {
  return (
    <div className={`aspect-[2/3] relative overflow-hidden paper-texture ebook-shadow border border-black/5 bg-[#171512] ${className}`}>
      <div className={`absolute inset-0 ${ebook.coverColor}`} />
      {ebook.coverImage && (
        <img
          src={ebook.coverImage}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-95 saturate-[0.95] contrast-[1.08]"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.06)_38%,rgba(0,0,0,0.86)),radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.20),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(0,0,0,0.32))]" />
      <div className="absolute inset-2 md:inset-3 border border-white/20" />
      <div className="absolute inset-x-4 md:inset-x-6 top-6 md:top-8 h-px bg-white/24" />
      <div className="absolute inset-x-4 md:inset-x-6 bottom-6 md:bottom-8 h-px bg-white/18" />
      <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
      <div
        className="absolute -right-5 top-7 font-serif text-[5rem] md:text-[6rem] leading-none opacity-[0.11] select-none"
        style={{ color: ebook.coverAccent }}
      >
        {ebook.coverMark}
      </div>

      {showTitle && (
        <div className="absolute inset-0 flex flex-col justify-between py-3.5 md:py-7 px-2.5 sm:px-3 md:px-5 text-center z-10">
          <div className="space-y-2 md:space-y-5">
            <span
              className="text-[5.5px] sm:text-[6px] md:text-[7px] tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.26em] uppercase font-black line-clamp-1 drop-shadow"
              style={{ color: ebook.coverAccent }}
            >
              {ebook.isSpecial ? "Premium" : ebook.category}
            </span>

            <div className="hidden sm:flex mx-auto h-7 w-7 md:h-10 md:w-10 rounded-full border border-white/20 items-center justify-center bg-black/25 backdrop-blur-[1px]">
              <span className="font-serif text-[10px] md:text-sm" style={{ color: ebook.coverAccent }}>
                {initials(ebook.author) || ebook.coverMark}
              </span>
            </div>

            <div className="flex min-h-[68px] sm:min-h-[74px] md:min-h-[92px] flex-col justify-center gap-1 items-center px-0.5">
              <h3 className={`font-serif line-clamp-5 break-words hyphens-auto text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] ${coverTitleClass(ebook.title, compact)}`}>
                {ebook.title}
              </h3>
              <p className="hidden sm:block text-[6px] md:text-[7px] uppercase tracking-[0.12em] md:tracking-[0.18em] line-clamp-2 text-white/58">
                {ebook.coverEdition}
              </p>
            </div>
          </div>

          <span className="text-[5.5px] sm:text-[6px] md:text-[8px] font-mono tracking-[0.12em] md:tracking-widest uppercase line-clamp-2 px-1 text-white/64">
            {ebook.author}
          </span>
        </div>
      )}
    </div>
  );
}
