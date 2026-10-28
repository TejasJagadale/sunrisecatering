import { useEffect } from 'react';
import { SITE } from '../config/site';
import { OG_IMAGE } from '../config/images';

function upsert(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create.tag);
    Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Per-page <title>, description, canonical and Open Graph tags (no extra dependency needed).
// NOTE: because this is a client-rendered SPA, crawlers that do not run JavaScript see the defaults
// from index.html. See README ("SEO notes") for pre-rendering options.
export default function Seo({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title.includes(SITE.shortName) ? title : `${title} | ${SITE.shortName}`;
    const url = `${SITE.url}${path === '/' ? '/' : path}`;
    document.title = fullTitle;
    upsert('meta[name="description"]', { tag: 'meta', attrs: { name: 'description' } }, 'content', description);
    upsert('link[rel="canonical"]', { tag: 'link', attrs: { rel: 'canonical' } }, 'href', url);
    upsert('meta[property="og:title"]', { tag: 'meta', attrs: { property: 'og:title' } }, 'content', fullTitle);
    upsert('meta[property="og:description"]', { tag: 'meta', attrs: { property: 'og:description' } }, 'content', description);
    upsert('meta[property="og:url"]', { tag: 'meta', attrs: { property: 'og:url' } }, 'content', url);
    upsert('meta[property="og:image"]', { tag: 'meta', attrs: { property: 'og:image' } }, 'content', `${SITE.url}${OG_IMAGE}`);
  }, [title, description, path]);
  return null;
}
