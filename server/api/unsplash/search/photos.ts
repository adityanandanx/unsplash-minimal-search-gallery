import { ImageResponseItem } from "~~/shared/types/unsplash";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const accessKey = config.unsplashAccessKey;
  const apiBase = config.public.unsplashApiBase;

  const data = await $fetch<{
    results: ImageResponseItem[];
    total: number;
    total_pages: number;
  }>(`${apiBase}/search/photos`, {
    params: getQuery(event), // forward query params
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });
  return data.results;
});
