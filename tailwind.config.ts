import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"brand-dark-blue": "#000931",
				"brand-sea-green": "#00C2FC",
				"brand-pink": "#F22F7E",
			}
		}
	},
	plugins: [],
};
export default config;
