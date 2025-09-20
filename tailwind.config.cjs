const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      boxShadow: {
        's-0': 'none',
        's-1': '0 1px 2px rgba(0,0,0,.14), 0 1px 1px rgba(0,0,0,.08)',
        's-2': '0 6px 12px rgba(0,0,0,.18)',
        's-3': '0 18px 42px rgba(0,0,0,.28)'
      },
      colors: {
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#6366f1',
        background: '#ffffff',
        foreground: '#111827',
        heading: '#111827',
        link: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
          hover: '#4f46e5',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#111827',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#111827',
        },
        primary: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
          hover: '#4f46e5',
        },
        success: '#16a34a',
        warning: '#f59e0b',
        error: '#dc2626',
        info: '#3b82f6',
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.foreground / 0.85'),
            '--tw-prose-headings': theme('colors.heading'),
            '--tw-prose-lead': theme('colors.foreground'),
            '--tw-prose-links': theme('colors.link.DEFAULT'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-counters': theme('colors.muted.foreground'),
            '--tw-prose-bullets': theme('colors.border'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.foreground'),
            '--tw-prose-quote-borders': theme('colors.border'),
            '--tw-prose-captions': theme('colors.muted.foreground'),
            '--tw-prose-code': theme('colors.foreground'),
            '--tw-prose-pre-code': theme('colors.foreground'),
            '--tw-prose-pre-bg': theme('colors.muted.DEFAULT'),
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};


