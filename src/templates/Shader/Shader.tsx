// @ts-nocheck
import * as THREE from "three"
import vertex from "./glsl/shader.vert"
import fragment from "./glsl/shader.frag"
import { FIBER } from "@/FExport"
import { REACT } from "@/FExport"
import { DREI } from "@/FExport"

const ShaderImpl = DREI.shaderMaterial(
	{
		time: 0,
		color: new THREE.Color(0.05, 0.0, 0.025),
	},
	vertex,
	fragment,
)

FIBER.extend({ ShaderImpl })

// eslint-disable-next-line react/display-name
const Shader = REACT.forwardRef(({ children, ...props }, ref) => {
	const localRef = REACT.useRef()

	REACT.useImperativeHandle(ref, () => localRef.current)

	FIBER.useFrame((_, delta) => (localRef.current.time += delta))
	return <shaderImpl ref={localRef} glsl={THREE.GLSL3} {...props} attach='material' />
})

export default Shader
