"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Click-to-copy island for the direct email address in the contact card.
 * Shows a brief checkmark confirmation after copying.
 */
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (permissions/insecure context) — silently ignore;
      // the mailto link right next to it still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      title="Copy email address"
      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#AAFF00] hover:text-[#AAFF00]"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-[#AAFF00]" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
