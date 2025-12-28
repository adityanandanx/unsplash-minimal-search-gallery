export type ThemeMode = "light" | "dark" | "system";

export const theme = ref<ThemeMode>("system");

export const useThemeMode = () => {
  let mediaQuery: MediaQueryList;

  // function to apply the theme to DOM
  const applyTheme = (mode: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  const handleMediaChange = (e: MediaQueryListEvent) => {
    if (theme.value === "system") {
      applyTheme(e.matches ? "dark" : "light");
    }
  };

  onMounted(() => {
    if (!import.meta.client) return;
    // initial theme setup
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      theme.value = savedTheme;
    } else {
      theme.value = "system";
    }
    mediaQuery.addEventListener("change", handleMediaChange);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handleMediaChange);
  });

  watch(theme, (newMode) => {
    if (!import.meta.client) return;
    if (newMode === "system") {
      localStorage.removeItem("theme");
      applyTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      localStorage.theme = newMode;
      applyTheme(newMode);
    }
  });

  return { theme };
};
