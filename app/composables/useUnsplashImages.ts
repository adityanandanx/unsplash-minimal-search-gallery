export const useUnsplashImages = (
  query: string | Ref<string>,
  page: number = 1,
  perPage: number = 10
) => {
  let result: ReturnType<typeof useFetch<ImageResponseItem[]>>;
  // if empty query, fetch general photos
  const isEmpty =
    typeof query === "string" ? query.trim() === "" : query.value.trim() === "";
  if (isEmpty) {
    result = useFetch(`/api/unsplash/photos`, {
      params: {
        page,
        per_page: perPage,
      },
      lazy: true,
    });
  } else {
    result = useFetch(`/api/unsplash/search/photos`, {
      params: {
        query,
        page,
        per_page: perPage,
      },
      lazy: true,
    });
  }
  const { data, ...queryResult } = result;
  return {
    images: data,
    ...queryResult,
  };
};
