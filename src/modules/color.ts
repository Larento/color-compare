/**
 * Color-related functions.
 * @module modules/color
 */

import type { color, json } from '../models'
export type * from '../models/color'

/**
 * Creates a color component with normalized value.
 * @param value possibly non-normalized value. Will be clamped to [0, 1] range.
 */
export function normalized_component(value: number): color.NormalizedComponent {
    return Math.max(Math.min(value, 1), 0) as color.NormalizedComponent
}

/**
 * Creates a color component with 8-bit value.
 * @param value normalized value. This will be mapped, rounded and clamped to the [0, 255] range.
 */
export function component_8bit(value: color.NormalizedComponent): color.Component8Bit {
    const normalized_value = normalized_component(value)
    return Math.min(Math.floor(normalized_value * 256), 255) as color.Component8Bit
}

/**
 * Converts color from HSL to RGB model.
 * @param color HSL color.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
 * @see https://www.w3.org/TR/css-color-4/#hsl-to-rgb
 */
export function hsl_to_rgb({ hue, saturation, luminosity }: color.HSL): color.RGB {
    const a = saturation * Math.min(luminosity, 1 - luminosity)

    function rgb_normalized_component(n: number): color.NormalizedComponent {
        const k = (n + hue * 12) % 12
        const component = luminosity - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
        return normalized_component(component)
    }

    return {
        red: rgb_normalized_component(0),
        green: rgb_normalized_component(8),
        blue: rgb_normalized_component(4),
    }
}

/**
 * Converts color from RGB to HSL model.
 * @param color RGB color.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Saturation
 * @see https://www.w3.org/TR/css-color-4/#rgb-to-hsl
 */
export function rgb_to_hsl({ red: red, green: green, blue: blue }: color.RGB): color.HSL {
    let max = Math.max(red, green, blue)
    let min = Math.min(red, green, blue)
    let [hue, saturation, luminosity] = [0, 0, (min + max) / 2]
    let d = max - min
    let epsilon = 1 / 100000 // max Sat is 1, in this code

    if (d !== 0) {
        saturation =
            luminosity === 0 || luminosity === 1 ? 0 : (max - luminosity) / Math.min(luminosity, 1 - luminosity)

        switch (max) {
            case red:
                hue = (green - blue) / d + (green < blue ? 6 : 0)
                break
            case green:
                hue = (blue - red) / d + 2
                break
            case blue:
                hue = (red - green) / d + 4
        }

        hue = hue / 6
    }

    // Very out of gamut colors can produce negative saturation
    // If so, just rotate the hue by 180 and use a positive saturation
    // see https://github.com/w3c/csswg-drafts/issues/9222
    if (saturation < 0) {
        hue += 180
        saturation = Math.abs(saturation)
    }

    if (hue >= 1) {
        hue -= 1
    }

    if (saturation <= epsilon) {
        hue = 0
    }

    return {
        hue: normalized_component(hue),
        saturation: normalized_component(saturation),
        luminosity: normalized_component(luminosity),
    }
}

/**
 * Converts color from HSV to RGB model.
 * @param color HSV color.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
 */
export function hsv_to_rgb({ hue, saturation, value }: color.HSV): color.RGB {
    const a = saturation * value

    function rgb_normalized_component(n: number): color.NormalizedComponent {
        const k = (n + hue * 6) % 6
        const component = value - a * Math.max(0, Math.min(k, 4 - k, 1))
        return normalized_component(component)
    }

    return {
        red: rgb_normalized_component(5),
        green: rgb_normalized_component(3),
        blue: rgb_normalized_component(1),
    }
}

/**
 * Gets a TrueColor 24-bit representation of RGB color.
 * @param color RGB color.
 * @see https://en.wikipedia.org/wiki/List_of_monochrome_and_RGB_color_formats#24-bit_RGB
 */
export function rgb_as_rgb24({ red, green, blue }: color.RGB): color.RGB24 {
    return {
        red: component_8bit(red),
        green: component_8bit(green),
        blue: component_8bit(blue),
    }
}

/**
 * Gets a string representation of color model. The representation is consistent regardless of the key ordering in the object - only component names and values matter.
 */
export function color_as_str(color: color.NormalizedColorModel): json.JsonString {
    return JSON.stringify(color, Object.keys(color).sort()) as json.JsonString
}

/**
 * Creates a RGB color from its TrueColor representation.
 */
export function rgb_from_rgb24({ red, green, blue }: color.RGB24): color.RGB {
    return {
        red: normalized_component(red / 255),
        green: normalized_component(green / 255),
        blue: normalized_component(blue / 255),
    }
}
