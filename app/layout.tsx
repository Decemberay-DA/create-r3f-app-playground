import { Layout } from "@/components/dom/Layout"
import "@/global.css"
import Scroll, { ScrollTicker } from "@/templates/Scroll"

export const metadata = {
	title: "Next.js + Three.js but cursed",
	description: "A minimal starter for bla bla bla bla bla bla.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='antialiased'>
			{/* <head /> will contain the components returned by the nearest parent head.tsx. Find out more at
			https://beta.nextjs.org/docs/api-reference/file-conventions/head
			<head /> */}
			<body>
				{/* also wrap in scroll container */}
				<Scroll>
					{/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
					<Layout>{children}</Layout>
				</Scroll>
				<ScrollTicker smooth={9999999} />
			</body>
		</html>
	)
}
