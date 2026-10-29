## Application structure

- Keep the Fiscare landing page assembled from focused section components, with shared brand and CTA controls, so section changes remain isolated.
- Keep diagnosis schemas in the browser-safe shared module (`src/lib/diagnosis.ts`); any connected receiving server must revalidate the same schema to prevent invalid submissions.
- Diagnosis leads are delivered through EmailJS using the public template ids in `.env`; if the transport changes, keep the form's validation boundary in `DiagnosisForm.tsx` intact.
- Keep privacy and terms in dedicated public content routes with independent metadata so footer links are usable and shareable, and keep their copy in sync with what the form actually does with data.
- Keep founder photography and founder presentation in a focused browser-safe section module, shared with the opening avatar strip, so identities remain consistent across the page.
- Keep the WhatsApp number and its prefilled message templates in `src/lib/contact.ts`, and build every URL through `whatsappLink()` so the number changes in one place. The page exposes WhatsApp in exactly two places — the floating button and the number in the footer — plus the exit offer; the owner asked for that restraint, so do not add WhatsApp links to the header, hero, sections, service cards or the form. The diagnosis form stays the primary CTA, and the exit offer shows once per session and only on pointer/fine viewports already wide enough for the desktop layout.
- Keep motion in the shared controls (`Reveal`, `RevealWords` in `shared.tsx`) and guard every animation with `useReducedMotion()`, so a section can change its entrance without touching the others.
