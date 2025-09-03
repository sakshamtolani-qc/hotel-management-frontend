import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
<<<<<<< HEAD
		"./index.html",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
=======
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
>>>>>>> de23ad80 (Reservation List Page)
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
<<<<<<< HEAD
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
=======
>>>>>>> de23ad80 (Reservation List Page)
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
<<<<<<< HEAD
				brand: {
					primary: 'hsl(var(--brand-primary))',
					secondary: 'hsl(var(--brand-secondary))',
					accent: 'hsl(var(--brand-accent))'
				},
=======
>>>>>>> 0ddf930d (Implement Room List View)
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#FFFFFF',
					100: '#EFF0F2', 
					500: '#484848',
					900: '#212121',
=======
				brand: {
					primary: 'hsl(var(--brand-primary))',
					secondary: 'hsl(var(--brand-secondary))',
					accent: 'hsl(var(--brand-accent))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
>>>>>>> de23ad80 (Reservation List Page)
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
<<<<<<< HEAD
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				checkout: {
					DEFAULT: 'hsl(var(--checkout))',
					foreground: 'hsl(var(--checkout-foreground))'
				},
=======
>>>>>>> 0ddf930d (Implement Room List View)
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
<<<<<<< HEAD
=======
				status: {
					vacant: 'hsl(var(--status-vacant))',
					'vacant-foreground': 'hsl(var(--status-vacant-foreground))',
					occupied: 'hsl(var(--status-occupied))',
					'occupied-foreground': 'hsl(var(--status-occupied-foreground))',
					dirty: 'hsl(var(--status-dirty))',
					'dirty-foreground': 'hsl(var(--status-dirty-foreground))'
				},
>>>>>>> 0ddf930d (Implement Room List View)
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
<<<<<<< HEAD
} satisfies Config;
=======
} satisfies Config;
>>>>>>> de23ad80 (Reservation List Page)
