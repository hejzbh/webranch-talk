import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1200px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      xs: ["0.68rem", "0.75rem"],
      sm: ["0.75rem", "0.85rem"],
      md: "0.85rem",
      lg: "1rem",
      xl: "1.180rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      base: "1rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        "border-common-2": "#232528",
        black: "#121212", // 15161A
        primary: "white",
        main: "#6763FE",
        inputBG: "#232529",
        secondary: "#a8aeb6",
        owner: "#FFD700",
        admin: "red",
        moderator: "rgb(99, 102, 241)",
        guest: "gray",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        actionHover: "rgba(	103, 99, 254,0.4)",
        danger: "#f43f5e",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "custom-gray-1": "rgba(32,33,38,1)",
        "custom-gray-2": "rgba(30,31,36,1)",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
