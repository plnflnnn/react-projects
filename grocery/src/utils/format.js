export function slugify(string) {
  return string.toLowerCase().trim().replace(/\s+/g, '-');
}

export function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
