import type { Preview } from "@storybook/react-vite";
import "../src/theme/global.css";

type ThemeMode = "light" | "dark";

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;

  document.body.style.backgroundColor = "var(--color-bg-canvas)";
  document.body.style.color = "var(--color-text-primary)";
  document.body.style.fontFamily = "var(--font-family-sans)";
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global color theme",
      toolbar: {
        dynamicTitle: true,
        icon: "mirror",
        items: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "System", value: "system" },
        ],
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals.theme as
        | "light"
        | "dark"
        | "system"
        | undefined;

      const resolvedTheme =
        selectedTheme === "system"
          ? typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : (selectedTheme ?? "light");

      applyTheme(resolvedTheme);
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
