export const useScreenType = () => {
  type ScreenType = "mobile" | "tablet" | "desktop";

  const screenType = ref<ScreenType>("desktop");

  // cannot initalize MediaQueryList outside of onMounted in client-side composable
  let mobileQuery: MediaQueryList;
  let tabletQuery: MediaQueryList;
  let desktopQuery: MediaQueryList;

  const updateDevice = () => {
    if (mobileQuery.matches) screenType.value = "mobile";
    else if (tabletQuery.matches) screenType.value = "tablet";
    else screenType.value = "desktop";
  };

  onMounted(() => {
    // media queries
    mobileQuery = window.matchMedia("(width < 640px)");
    tabletQuery = window.matchMedia(
      // "(min-width: 640px) and (max-width: 1023px)"
      "(width >= 640px) and (width < 1024px)"
    );
    desktopQuery = window.matchMedia("(width >= 1024px)");
    // initial check
    updateDevice();

    mobileQuery.addEventListener("change", updateDevice);
    tabletQuery.addEventListener("change", updateDevice);
    desktopQuery.addEventListener("change", updateDevice);
  });

  onUnmounted(() => {
    mobileQuery.removeEventListener("change", updateDevice);
    tabletQuery.removeEventListener("change", updateDevice);
    desktopQuery.removeEventListener("change", updateDevice);
  });
  return {
    screenType,
  };
};
