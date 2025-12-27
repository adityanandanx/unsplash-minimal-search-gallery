export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const accessKey = config.unsplashAccessKey;
  const apiBase = config.public.unsplashApiBase;

  const query = getQuery(event);
  let data: ImageResponseItem[] = [];

  // if query param is present, do a search
  if (query.query && (query.query as string).length > 0) {
    const searchData = await $fetch<{
      results: ImageResponseItem[];
      total: number;
      total_pages: number;
    }>(`${apiBase}/search/photos`, {
      query: getQuery(event), // forward query params, TODO: sanitize?
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    data = searchData.results;
  }
  // else, fetch general photos
  else {
    data = await $fetch<ImageResponseItem[]>(`${apiBase}/photos`, {
      query: getQuery(event), // forward query params, TODO: sanitize?
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
  }
  return data;
});
