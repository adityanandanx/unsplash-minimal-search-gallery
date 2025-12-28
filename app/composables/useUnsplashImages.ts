export const useUnsplashImages = (
  query: Ref<string>,
  page: number = 1,
  perPage: number = 10
) => {
  const { data, ...queryResult } = useFetch<ImageResponseItem[]>(
    `/api/unsplash/photos`,
    {
      query: {
        query,
        page,
        per_page: perPage,
      },
      key: () => buildUnsplashImageKey(query.value, page, perPage),
      lazy: true,
    }
  );

  return {
    images: data,
    ...queryResult,
  };
};
