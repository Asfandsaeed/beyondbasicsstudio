import { useEffect } from "react";

const SITE_BASE = "https://beyondbasics.studio";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  url?: string;
  updateBrowserUrl?: boolean;
}

function setMeta(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setNameMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta({ title, description, ogImage, url, updateBrowserUrl = false }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setNameMeta("description", description);

    const fullUrl = url ? `${SITE_BASE}${url}` : SITE_BASE;

    if (ogImage) {
      const fullImage = `${SITE_BASE}/og/${ogImage}`;
      setMeta("og:image", fullImage);
      setNameMeta("twitter:image", fullImage);
    }

    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:url", fullUrl);
    setNameMeta("twitter:title", title);
    setNameMeta("twitter:description", description);

    setCanonical(fullUrl);

    if (updateBrowserUrl && url) {
      const base = (import.meta.env.BASE_URL as string).replace(/\/$/, "");
      history.replaceState(null, "", base + url);
    }
  }, [title, description, ogImage, url, updateBrowserUrl]);
}
