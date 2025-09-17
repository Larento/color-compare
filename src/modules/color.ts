/**
 * Converts color from HSL to RGB space.
 *
 * @param hue 0 to 1
 * @param saturation 0 to 1
 * @param luminosity 0 to 1
 *
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
 */
export function hsl_to_rgb(
    hue: number,
    saturation: number,
    luminosity: number,
): [red: number, green: number, blue: number] {
    const a = saturation * Math.min(luminosity, 1 - luminosity)

    function rgb_normalized_component(n: number) {
        const k = (n + hue * 12) % 12
        return luminosity - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    }

    function rgb_8bit(n: number) {
        const normalized_component = rgb_normalized_component(n)
        return Math.min(Math.floor(normalized_component * 256), 255)
    }

    return [rgb_8bit(0), rgb_8bit(8), rgb_8bit(4)]
}

/**
 * Converts color from HSV to RGB space.
 *
 * @param hue 0 to 1
 * @param saturation 0 to 1
 * @param value 0 to 1
 *
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
 */
export function hsv_to_rgb(hue: number, saturation: number, value: number): [red: number, green: number, blue: number] {
    function rgb_normalized_component(n: number) {
        const k = (n + hue * 6) % 6
        return value - value * saturation * Math.max(0, Math.min(k, 4 - k, 1))
    }

    function rgb_8bit(n: number) {
        const normalized_component = rgb_normalized_component(n)
        return Math.min(Math.floor(normalized_component * 256), 255)
    }

    return [rgb_8bit(5), rgb_8bit(3), rgb_8bit(1)]
}
