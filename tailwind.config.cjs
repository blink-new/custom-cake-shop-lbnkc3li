/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          '50': '#fcf5f0',
          '100': '#f9eae0',
          '200': '#f3d5c0',
          '300': '#eab89a',
          '400': '#e29370',
          '500': '#d86f49',
          '600': '#c3573f',
          '700': '#a24134',
          '800': '#85362f',
          '900': '#6d2f29',
          '950': '#3a1612',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          '50': '#f0f6ff',
          '100': '#e3edff',
          '200': '#cddcff',
          '300': '#aabfff',
          '400': '#859aff',
          '500': '#6271ff',
          '600': '#4b4bf5',
          '700': '#3f3ad7',
          '800': '#3431ad',
          '900': '#2f2f88',
          '950': '#1c1a4a',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Bakery theme colors
        cake: {
          vanilla: '#f8e9d1',
          chocolate: '#614230', 
          redVelvet: '#9f2e36',
          lemon: '#f8eaaf',
          marble: '#e5ded6'
        },
        filling: {
          buttercream: '#fff4e0',
          chocolate: '#3d2a20',
          fruit: '#ff9eb0',
          cream: '#f9f9f9',
          custard: '#ffeec0'
        },
        frosting: {
          buttercream: '#fff9e8',
          fondant: '#ffe0e9',
          whipped: '#ffffff',
          cream: '#f4f4f0'
        },
        // Original chart colors
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      fontFamily: {
        sans: [
          'Inter var',
          'sans-serif'
        ],
        display: [
          'Playfair Display',
          'serif'
        ],
        hand: [
          'Pacifico',
          'cursive'
        ],
        sketch: [
          'Cabin Sketch',
          'cursive'
        ]
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'wiggle': 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'wiggle': {
          '0%, 100%': { 
            transform: 'rotate(-1deg)' 
          },
          '50%': { 
            transform: 'rotate(1deg)' 
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}