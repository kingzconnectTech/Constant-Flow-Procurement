import { useEffect } from "react";

/**
 * useSEO — Dynamically updates <title> and <meta description> per page.
 * Call this at the top of every page component so Google indexes distinct
 * titles and descriptions for each URL.
 */
export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
}: {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}) {
  useEffect(() => {
    // ── <title> ──
    document.title = title;

    // ── <meta name="description"> ──
    setMeta("name", "description", description);

    // ── Canonical ──
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // ── Open Graph ──
    setMeta("property", "og:title", ogTitle ?? title);
    setMeta("property", "og:description", ogDescription ?? description);
    setMeta("property", "og:url", canonical ?? window.location.href);
    if (ogImage) setMeta("property", "og:image", ogImage);

    // ── Twitter Card ──
    setMeta("name", "twitter:title", ogTitle ?? title);
    setMeta("name", "twitter:description", ogDescription ?? description);
  }, [title, description, canonical, ogTitle, ogDescription, ogImage]);
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}
