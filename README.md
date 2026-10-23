# Mridul Mehta — Software Developer Portfolio

A single-page portfolio built with React 19, TanStack Start, TypeScript, Tailwind CSS v4, Lucide icons, and accessible Radix project dialogs. It uses a purple hero with golden-yellow accents over airy white sections. The hero shows Mridul's real portrait photograph, stored as a normal project asset.

## Development

Install Bun, then run from the project directory:

```sh
bun install
bun run dev
```

Use the local address printed by Vite. `bun run test` runs the existing test suite. `bun run build` creates production output; `bun run preview` previews it locally.

## Project structure

```text
src/routes/index.tsx                 Portfolio sections and sticky navigation
src/routes/__root.tsx                Document shell, fonts, and favicon
src/components/portfolio/contact.tsx EmailJS-backed contact form with validation
src/components/portfolio/project-card.tsx Accessible detailed project dialogs
src/lib/portfolio.ts                 Editable facts, skills, projects, links
src/assets/                          Portrait photo and conceptual project illustrations
src/styles.css                      Semantic design tokens and responsive styling
public/favicon.svg                  Monogram favicon
```

## Resume

There is no resume PDF yet. The site offers **Request Resume**, opening an email to Mridul. To enable downloads, add the real PDF to `public/downloads/` and set `portfolio.resumeUrl` to its same-origin URL, for example `/downloads/mridul-mehta-resume.pdf`. Do not set the URL until that file exists.

## Contact

Messages are delivered through EmailJS using the public (browser-safe) service ID, template ID, and public key in `portfolio.emailjs` in `src/lib/portfolio.ts`. Set that object to `null` to switch the form back to a `mailto:` fallback, or set `portfolio.contactEndpoint` to your own HTTPS endpoint to use a self-hosted receiver instead.

EmailJS template parameters are `name`, `email`, `subject`, `message`, `from_name`, `from_email`, `reply_to`, and `title`. The free EmailJS tier covers roughly 200 emails per month, so monitor the quota. Only the public key belongs in client code — never place a private EmailJS key or any other secret in portfolio configuration. A self-hosted endpoint must independently validate all fields, enforce length limits, rate-limit requests, store submissions somewhere the owner can read them, and return success only after receipt. The honeypot is supplementary, not a replacement for server protection.

## Content accuracy

Only the supplied Cloud File Storage repository is linked. Unprovided repositories and demos are omitted. Project images are labeled conceptual illustrations, not screenshots or verified metrics. Training is explicitly distinguished from employment. No invented proficiency levels or problem-solving counts are shown.

## Deployment

Publish through Lovable's Publish dialog when ready. Source edits do not change the public version until published. For independent hosting, use a TanStack Start-compatible Cloudflare Workers deployment; this is not a plain static Vite SPA. Preserve the existing Vite and server configuration, install dependencies, and use the host's supported build/deploy workflow. Set the final domain before creating an absolute-URL sitemap; none is generated for an unknown deployment URL. Root metadata uses self-referencing relative canonical and Open Graph URLs. No secret environment variables are required; the contact form talks to EmailJS directly with its public key, which lives in `src/lib/portfolio`.

## Verification

Browser checks cover desktop, phone, and tablet layouts; menu navigation; project details; rendered illustrations; external link destinations; email and resume fallback links; and runtime errors. No Lighthouse scores are claimed. Contact delivery runs through EmailJS and should be confirmed with one real test submission. PDF download stays inactive until a real resume PDF is supplied.
