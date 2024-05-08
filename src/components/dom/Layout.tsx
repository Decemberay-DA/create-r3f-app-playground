"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"

const Scene = dynamic(() => import("@/components/canvas/Scene").then((mod) => mod.Scene), { ssr: false })

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null)

	return (
		<div ref={ref} className='relative w-[100%] h-[100%] overflow-auto touch-action-auto'>
			{children}
			<Scene className='absolute top-0 left-0 w-[100vw] h-[100vh] pointer-events-none' eventSource={ref} eventPrefix='client' />
		</div>
	)
}
