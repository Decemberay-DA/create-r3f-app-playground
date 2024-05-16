import Scroll from "@/templates/Scroll"
import type { AppProps } from "next/app"

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		// also wrap in scroll container
		<Scroll>
			{/* yo like it still not working cz i`m not using canvaseseses */}
			<Component {...pageProps} />
		</Scroll>
	)
}
