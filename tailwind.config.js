/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./content/**/*.{js,md}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--ink)",
            "--tw-prose-headings": "var(--ink)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-bold": "var(--ink)",
            "--tw-prose-quotes": "var(--muted)",
            "--tw-prose-quote-borders": "var(--accent)",
            "--tw-prose-code": "var(--accent)",
            "--tw-prose-pre-bg": "var(--code-bg)",
            "--tw-prose-pre-code": "var(--ink)",
            "--tw-prose-hr": "var(--line)",
            "--tw-prose-th-borders": "var(--line)",
            "--tw-prose-td-borders": "var(--line)",
            "--tw-prose-bullets": "var(--muted)",
            "--tw-prose-counters": "var(--muted)",
            maxWidth: "none",
            a: { textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            pre: { border: "1px solid var(--line)" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
