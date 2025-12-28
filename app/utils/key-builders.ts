export const buildUnsplashImageKey = (
  query: string,
  page: number,
  perPage: number
): string => {
  return `unsplash-${query}-${page}-${perPage}`;
};
