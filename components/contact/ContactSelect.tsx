"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

/**
 * Custom dark dropdown for the contact form — a styled button + listbox,
 * NOT the browser's native <select> UI. Supports click, Escape, arrow-key
 * navigation and outside-click close. The chosen value rides into the
 * server action via a hidden input, so the surrounding form stays a plain
 * HTML form.
 */
export default function ContactSelect({
  name,
  options,
  placeholder,
  error,
  required = false,
  onChange,
}: {
  name: string;
  options: Option[];
  placeholder: string;
  error?: string;
  required?: boolean;
  /** Notifies the parent form so its error state can clear live. */
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  /** Opens the listbox with the highlight synced to the current value. */
  const openMenu = () => {
    const index = options.findIndex((option) => option.value === value);
    setHighlighted(index >= 0 ? index : 0);
    setOpen(true);
  };

  const select = (option: Option) => {
    setValue(option.value);
    onChange?.(option.value);
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((h) => (h + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((h) => (h - 1 + options.length) % options.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      select(options[highlighted]);
    }
  };

  const selected = options.find((option) => option.value === value);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={clsx(
          "flex w-full items-center justify-between gap-3 rounded-xl border bg-surface px-4 py-3.5 text-left text-sm transition-all outline-none",
          error
            ? "border-red-500/70"
            : open
              ? "border-[#AFF45D] shadow-sm"
              : "border-line hover:border-line"
        )}
      >
        <span className={selected ? "text-ink" : "text-muted"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-accent-ink"
          )}
          aria-hidden="true"
        />
      </button>

      {value && <input type="hidden" name={name} value={value} />}
      {/* Keeps native validation honest when nothing is chosen yet */}
      {required && !value && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          defaultValue=""
          onInvalid={(e) => e.preventDefault()}
        />
      )}

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-line bg-surface p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.6)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => select(option)}
                className={clsx(
                  "flex cursor-pointer items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-colors",
                  index === highlighted && "bg-[#AFF45D]/10 text-accent-ink",
                  isSelected && "font-semibold text-accent-ink",
                  index !== highlighted && !isSelected && "text-muted"
                )}
              >
                {option.label}
                {isSelected && <Check className="h-4 w-4" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}


