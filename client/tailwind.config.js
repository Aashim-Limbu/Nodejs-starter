/** @type {import('tailwindcss').Config} */
import aspectRatioPlugin from "@tailwindcss/aspect-ratio";
import typographyPlugin from "@tailwindcss/typography";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Open Sans", "sans-serif"],
			},
		},
	},
	plugins: [aspectRatioPlugin, typographyPlugin],
};
