// Small helpers shared by page templates.

/** True when a value is still a [[CONFIRM: ...]] placeholder. */
export const isPlaceholder = (s?: string) => !!s && s.includes("[[CONFIRM");

/** "6250 7949" -> "tel:+6562507949" */
export const tel = (n: string) => "tel:+65" + n.replace(/\s/g, "");

/** WhatsApp link for a Singapore number, or null while it's still a placeholder. */
export const waHref = (s?: string) => {
  if (!s || isPlaceholder(s)) return null;
  const digits = s.replace(/\D/g, "");
  return digits.length >= 8 ? `https://wa.me/65${digits.slice(-8)}` : null;
};

/** A link only once it's a real URL (not a placeholder or "#"). */
export const realUrl = (s?: string) => (s && !isPlaceholder(s) && s !== "#" ? s : null);
