import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card"
import { Label } from "./label"
import { Slider } from "./slider"
import { DESC_OBJ } from "@/lib/desc"

export const RGB_COLOR_SPACE = [
  // Whitepoint: D65
  "srgb",
  // Whitepoint: D65
  "srgb-linear",
  // Whitepoint: D65
  "display-p3",
  // Whitepoint: D65
  "display-p3-linear",
  // Whitepoint: D65
  "a98-rgb",
  // Whitepoint: D50
  "prophoto-rgb",
  // Whitepoint: D65
  "rec2020",
] as const

// use lab(), lch() for d50
// use oklab(), oklch() for d65
export const CIELAB_COLOR_SPACE = ["lab-d50", "lab-d65", "oklab"] as const

// xyz <=> xyz-d65
export const XYZ_COLOR_SPACE = ["xyz-d50", "xyz-d65"] as const

export type SliderProp = {
  label: string
  min: number
  max: number
  step: number
  defaultValue?: number
  unit?: string
}

type ColorMixerProp = {
  func?: "rgb" | "hsl" | "oklch" | "lch" | "lab" | "oklab"
  colorSpace?:
    (typeof RGB_COLOR_SPACE)[number] | (typeof XYZ_COLOR_SPACE)[number]
  slider1: SliderProp
  slider2: SliderProp
  slider3: SliderProp
}

export default function ColorMixer({
  func,
  slider1,
  slider2,
  slider3,
  colorSpace,
}: Readonly<ColorMixerProp>) {
  const [x, setX] = useState<number[]>([slider1.defaultValue || 0])
  const [y, setY] = useState<number[]>([slider2.defaultValue || 0])
  const [z, setZ] = useState<number[]>([slider3.defaultValue || 0])
  let bgColor = ""
  if (colorSpace) bgColor = `color(${colorSpace} ${x[0]} ${y[0]} ${z[0]})`
  else if (func)
    bgColor = `${func}(${x[0]}${slider1.unit || ""} ${y[0]}${slider2.unit || ""} ${z[0]}${slider3.unit || ""})`
  else bgColor = `color(srgb ${x[0]} ${y[0]} ${z[0]}))`

  const xId = `${func}-0`
  const yId = `${func}-1`
  const zId = `${func}-2`

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {func ? func+"()": (colorSpace || "srgb").toUpperCase()}
        </CardTitle>
        <p className="text-base text-muted-foreground">
          Adjust the sliders to create a custom {func} color.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <CardDescription className="text-lg h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white">
            {colorSpace ? DESC_OBJ?.[colorSpace]: DESC_OBJ?.[func+"()"]}
        </CardDescription>
        {/* Dynamic Color Preview Box */}
        <div
          className="flex h-48 w-full items-center justify-center rounded-xl border font-mono text-lg font-bold tracking-wider text-white shadow-inner"
          style={{
            backgroundColor: bgColor,
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          {bgColor}
        </div>

        {/* Sliders Container */}
        <div className="space-y-6">
          {/* Slider 1*/}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor={xId}
                className="text-base font-semibold text-red-500"
              >
                {slider1.label}
              </Label>
              <span className="rounded border border-red-200 bg-red-50 px-2 py-0.5 font-mono text-base font-medium text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
                {x[0]}
              </span>
            </div>
            <Slider
              id={xId}
              className="cursor-pointer py-2"
              value={x}
              onValueChange={(value) => {
                setX([value as number])
              }}
              min={slider1.min}
              max={slider1.max}
              step={slider1.step}
            />
          </div>

          {/* Slider 2*/}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor={yId}
                className="text-base font-semibold text-red-500"
              >
                {slider2.label}
              </Label>
              <span className="rounded border border-red-200 bg-red-50 px-2 py-0.5 font-mono text-base font-medium text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
                {y[0]}
              </span>
            </div>
            <Slider
              id={yId}
              className="cursor-pointer py-2"
              value={y}
              onValueChange={(value) => {
                setY([value as number])
              }}
              min={slider2.min}
              max={slider2.max}
              step={slider2.step}
            />
          </div>

          {/* Slider 1*/}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor={zId}
                className="text-base font-semibold text-red-500"
              >
                {slider3.label}
              </Label>
              <span className="rounded border border-red-200 bg-red-50 px-2 py-0.5 font-mono text-base font-medium text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
                {z[0]}
              </span>
            </div>
            <Slider
              id={zId}
              className="cursor-pointer py-2"
              value={z}
              onValueChange={(value) => {
                setZ([value as number])
              }}
              min={slider3.min}
              max={slider3.max}
              step={slider3.step}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
