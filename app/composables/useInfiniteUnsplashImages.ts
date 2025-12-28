export const useInfiniteUnsplashImages = (
  query: Ref<string>,
  perPage: number = 10
) => {
  const page = ref(1);
  const images = ref<ImageResponseItem[]>([]);
  const hasMore = ref(true);
  const isLoading = ref(false);

  const { data, error, refresh, pending } = useFetch<ImageResponseItem[]>(
    `/api/unsplash/photos`,
    {
      query: {
        query,
        page,
        per_page: perPage,
      },
      key: () => buildUnsplashImageKey(query.value, page.value, perPage),
      lazy: true,
      immediate: false,
    }
  );

  const loadMore = async () => {
    if (isLoading.value || !hasMore.value) return;

    isLoading.value = true;
    await refresh();

    if (data.value) {
      images.value = [...images.value, ...data.value];
      if (data.value.length < perPage) {
        hasMore.value = false;
      } else {
        page.value++;
      }
    }

    isLoading.value = false;
  };

  watch(query, () => {
    // reset
    page.value = 1;
    images.value = [];
    hasMore.value = true;
    loadMore();
  });

  return {
    images,
    hasMore,
    isLoading,
    pending,
    loadMore,
    error,
  };
};
