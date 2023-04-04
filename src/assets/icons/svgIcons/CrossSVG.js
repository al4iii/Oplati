import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CrossSVG() {
  return (
    <Svg
      className="svg-icon"
      style={{
        width: "24",
        height: "24",
        verticalAlign: "middle"
      }}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
      overflow="hidden"
    >
      <Path d="M512 928c229.44 0 416-186.56 416-416S741.44 96 512 96 96 282.56 96 512s186.56 416 416 416zm0-896c264.672 0 480 215.36 480 480S776.672 992 512 992C247.36 992 32 776.64 32 512S247.36 32 512 32zm214.72 265.28c12.512 12.48 12.512 32.96 0 45.44L557.44 512l169.28 169.28c6.08 6.4 9.28 14.4 9.28 22.72 0 8.32-3.2 16.32-9.28 22.72A32.64 32.64 0 01704 736c-8.32 0-16.32-3.2-22.72-9.28L512 557.44 342.72 726.72A32.64 32.64 0 01320 736c-8.32 0-16.32-3.2-22.72-9.28-12.48-12.48-12.48-32.96 0-45.44L466.56 512 297.28 342.72c-6.048-6.4-9.28-14.4-9.28-22.72 0-8.32 3.232-16.32 9.28-22.72 12.512-12.48 32.96-12.48 45.44 0L512 466.56l169.28-169.28c12.512-12.48 32.96-12.48 45.44 0z" />
    </Svg>
  )
}

export default CrossSVG