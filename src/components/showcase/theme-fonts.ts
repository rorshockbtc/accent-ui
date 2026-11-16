/** next/font loads families under CSS variables, so map theme font labels to them. */
export const THEME_FONT_VAR: Record<string, string> = {
  Fraunces: "var(--font-serif), 'Fraunces', Georgia, serif",
  Lora: "var(--font-lora), 'Lora', Georgia, serif",
  'Public Sans': "var(--font-public-sans), 'Public Sans', system-ui, sans-serif",
  Newsreader: "var(--font-newsreader), 'Newsreader', Georgia, serif",
  'EB Garamond': "var(--font-eb-garamond), 'EB Garamond', Georgia, serif",
  'Bricolage Grotesque': "var(--font-bricolage), 'Bricolage Grotesque', system-ui, sans-serif",
  'IBM Plex Sans': "var(--font-plex-sans), 'IBM Plex Sans', system-ui, sans-serif",
  Literata: "var(--font-literata), 'Literata', Georgia, serif",
  'Source Serif 4': "var(--font-source-serif), 'Source Serif 4', Georgia, serif",
  'Work Sans': "var(--font-work-sans), 'Work Sans', system-ui, sans-serif",
  Inter: "var(--font-sans), 'Inter', system-ui, sans-serif",
};
