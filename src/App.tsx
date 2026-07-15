import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import ColorMixer, {
  RGB_COLOR_SPACE,
  XYZ_COLOR_SPACE,
  type SliderProp,
} from "./components/ui/colorMixer"
import { DESC_OBJ } from "./lib/desc"

const colorObj: { [name: string]: SliderProp } = {
  R: { label: "Red", min: 0, max: 255, step: 1 },
  G: { label: "Green", min: 0, max: 255, step: 1 },
  B: { label: "Blue", min: 0, max: 255, step: 1 },
  H: { label: "Hue", min: 0, max: 359, step: 1, unit: "deg" },
  S: {
    label: "Saturation",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
    defaultValue: 50,
  },
  L: {
    label: "Lightness",
    min: 0,
    max: 100,
    step: 1,
    unit: "%",
    defaultValue: 50,
  },
  a1: {label: 'a', min: -0.4, max: 0.4, step: 0.01, defaultValue: 0},
  b1: {label: 'b', min: -0.4, max: 0.4, step: 0.01, defaultValue: 0},
  a2: {label: 'a', min: -125, max: 125, step: 1, defaultValue: 60},
  b2: {label: 'b', min: -125, max: 125, step: 1, defaultValue: 60},
  CH1: { label: "Chroma", min: 0, max: 0.4, step: 0.01, defaultValue: 0.25 },
  CH2: { label: "Chroma", min: 0, max: 230, step: 1, defaultValue: 75 },
  C1: { label: "C1", min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
  C2: { label: "C2", min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
  C3: { label: "C3", min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
  X: { label: "X", min: 0, max: 2, step: 0.01, defaultValue: 0.5 },
  Y: { label: "Y", min: 0, max: 2, step: 0.01, defaultValue: 0.5 },
  Z: { label: "Z", min: 0, max: 2, step: 0.01, defaultValue: 0.5 },
}

let key = 0

export function App() {
  console.log("App rendered")
  return (
    <div className="flex flex-col gap-6">
      {/* RGB Color Space Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">RGB Color Space</CardTitle>
          <CardDescription className="text-lg">
            {DESC_OBJ["rgb"]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Using a grid layout ensures your nested ColorMixer cards align beautifully */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RGB_COLOR_SPACE.map((cs) => (
              <ColorMixer
                key={key++} // Fixed: Stable unique key
                colorSpace={cs}
                slider1={colorObj.C1}
                slider2={colorObj.C2}
                slider3={colorObj.C3}
              />
            ))}

            <ColorMixer
              key={key++}
              func="rgb"
              slider1={colorObj.R}
              slider2={colorObj.G}
              slider3={colorObj.B}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">CIELAB Color Space</CardTitle>
          <CardDescription className="text-lg">
            {DESC_OBJ["cielab"]}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ColorMixer
            key={key++}
            func="lch"
            slider1={colorObj.L}
            slider2={colorObj.CH2}
            slider3={colorObj.H}
          />
          <ColorMixer
            key={key++}
            func="oklch"
            slider1={colorObj.L}
            slider2={colorObj.CH1}
            slider3={colorObj.H}
          />
          <ColorMixer
            key={key++}
            func="lab"
            slider1={colorObj.L}
            slider2={colorObj.a2}
            slider3={colorObj.b2}
          />
          <ColorMixer
            key={key++}
            func="oklab"
            slider1={colorObj.L}
            slider2={colorObj.a1}
            slider3={colorObj.b1}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">XyZ Color Space</CardTitle>
          <CardDescription className="text-lg">
            {DESC_OBJ["xyz"]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Using a grid layout ensures your nested ColorMixer cards align beautifully */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {XYZ_COLOR_SPACE.map((cs) => (
              <ColorMixer
                key={key++} // Fixed: Stable unique key
                colorSpace={cs}
                slider1={colorObj.C1}
                slider2={colorObj.C2}
                slider3={colorObj.C3}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
