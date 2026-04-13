import { useEffect } from "react";

const BASE = "https://asfandsaeed.github.io/beyondbasicsstudio";

interface PageMeta {
  title: string;
  description: string;
  ogImage: string;
  url?: string;
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

export function usePageMeta({ title, description, ogImage, url }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setNameMeta("description", description);

    const fullImage = `${BASE}/og/${ogImage}`;
    const fullUrl = url ? `${BASE}${url}` : BASE;

    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", fullImage);
    setMeta("og:url", fullUrl);

    setNameMeta("twitter:title", title);
    setNameMeta("twitter:description", description);
    setNameMeta("twitter:image", fullImage);
  }, [title, description, ogImage, url]);
}
