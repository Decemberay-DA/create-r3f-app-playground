// @ts-nocheck
import * as THREE from "three"
import vertex from "./glsl/shader.vert"
import fragment from "./glsl/shader.frag"
import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { forwardRef, useRef, useImperativeHandle } from "react"

const ShaderImpl = shaderMaterial(
	{
		time: 0,
		color: new THREE.Color(0.05, 0.0, 0.025),
	},
	vertex,
	fragment,
)

extend({ ShaderImpl })

type ShaderProps = {
	children: React.ReactNode
	[key: string]: any
}
export const Shader = forwardRef(({ children, ...props }: ShaderProps, ref) => {
	const localRef = useRef()

	useImperativeHandle(ref, () => localRef.current)

	useFrame((_, delta) => (localRef.current.time += delta))

	return <ShaderImpl ref={localRef} glsl={THREE.GLSL3} {...props} attach='material' />
})
