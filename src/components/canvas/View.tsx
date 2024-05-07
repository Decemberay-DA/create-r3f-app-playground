"use client"

import { forwardRef, Suspense, useImperativeHandle, useRef } from "react"
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from "@react-three/drei"
import { Three } from "@/helpers/components/Three"
import { THREE } from "@/FExport"

export const Common = ({ color }: { color: THREE.ColorRepresentation }) => (
	<Suspense fallback={null}>
		{color && <color attach='background' args={[color]} />}
		<ambientLight />
		<pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
		<pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
		<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
	</Suspense>
)

type ViewProps = {
	children: React.ReactNode
	orbit?: boolean
	[key: string]: any
}

<<<<<<< HEAD
const View = forwardRef(({ children, orbit, ...props }: ViewProps, ref) => {
	const localRef = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => localRef.current)
=======
const View = forwardRef<HTMLDivElement, ViewProps>((props, ref) => {
	const localRef = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => localRef.current!)
>>>>>>> a63f69a31fbc2dc2ac5f442473827b5971435b63

	return (
		<>
			<div ref={localRef} {...props.otherProps} />
			<Three>
<<<<<<< HEAD
				<ViewImpl track={localRef as React.MutableRefObject<HTMLDivElement>}>
					{children}
					{orbit && <OrbitControls />}
=======
				<ViewImpl track={localRef as React.MutableRefObject<HTMLElement>}>
					{" "}
					{props.children}
					{props.orbit && <OrbitControls />}
>>>>>>> a63f69a31fbc2dc2ac5f442473827b5971435b63
				</ViewImpl>
			</Three>
		</>
	)
})
View.displayName = "View"

export { View }
