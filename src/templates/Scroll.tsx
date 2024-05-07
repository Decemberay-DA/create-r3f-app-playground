// https://github.com/studio-freight/lenis
// TODO refactor for app-directory
// See https://github.com/pmndrs/react-three-next/pull/123

// 1 - wrap <Component {...pageProps} /> with <Scroll /> in _app.jsx
// 2 - add <ScrollTicker /> wherever in the canvas
// 3 - enjoy
import { addEffect, useFrame } from "@react-three/fiber"
import Lenis from "@studio-freight/lenis"
import { REACT, THREE, LAINS, FIBER } from "@/FExport"

const state = {
	top: 0,
	progress: 0,
}

export default function Scroll({ children }: { children: React.ReactNode }) {
	const content = REACT.useRef<HTMLDivElement>(null)
	const wrapper = REACT.useRef<HTMLDivElement>(null)

	REACT.useEffect(() => {
		const lenis = new Lenis({
			wrapper: wrapper.current as HTMLElement,
			content: content.current as HTMLElement,
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
			touchMultiplier: 2,
			infinite: false,
		})

		lenis.on("scroll", ({ scroll, progress }: { scroll: number; progress: number }) => {
			state.top = scroll
			state.progress = progress
		})
		const effectSub = addEffect((time) => lenis.raf(time))
		return () => {
			effectSub()
			lenis.destroy()
		}
	}, [])

	return (
		<div
			ref={wrapper}
			style={{
				position: "absolute",
				overflow: "hidden",
				width: "100%",
				height: "100%",
				top: 0,
			}}
		>
			<div
				ref={content}
				style={{
					position: "relative",
					minHeight: "200vh",
				}}
			>
				{children}
			</div>
		</div>
	)
}

export const ScrollTicker = ({ smooth = 9999999 }) => {
	FIBER.useFrame(({ viewport, camera }, delta) => {
		camera.position.y = THREE.MathUtils.damp(camera.position.y, -state.progress * viewport.height, smooth, delta)
	})

	return null
}
