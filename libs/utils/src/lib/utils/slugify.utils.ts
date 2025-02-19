export function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove any non-alphanumeric characters (except hyphens)
  }