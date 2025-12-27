export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const accessKey = config.unsplashAccessKey;
  const apiBase = config.public.unsplashApiBase;

  const data = await $fetch<ImageResponseItem[]>(`${apiBase}/photos`, {
    params: getQuery(event), // forward query params
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });
  return data;
});
