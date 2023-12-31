/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-sm": "repeat(auto-fit,minmax(300px,1fr))",
      },
      padding: {
        xs: "5px",
        sm: "10px",
        md: "1rem",
        lg: "2rem",
        xl: "3rem",
      },
      gap: {
        xs: "1rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
      },
      boxShadow: {
        sm: " rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        xl: "  rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
      },
      borderColor: {
        light: "#cbd5e1",
        default: "#cbd5e1",
        dark: "#94a3b8",
      },
      borderWidth: {
        xs: "0.2px",
        sm: "0.5px",
        md: "1px",
        lg: "2px",
        xl: "4px",
      },
      colors: {
        orange: {
          light: "#fb923c",
          dark: "#f97316",
        },
        black: {
          default: "#1e293b",
          dark: "#020617",
          light: "#475569",
        },
        gray: {
          default: "#9ca3af",
          dark: "#6b7280",
          light: "#d1d5db",
        },
        blue: {
          light: "#0ea5e9",
          dark: "#0891b2",
        },
        green: {
          light: "#22c55e",
          dark: "#059669",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
