/**
 * Canvas-related functions.
 * @module modules/canvas
 */

import { color } from '.'

/**
 * Creates an `ImageData` object that contains a 2D hue saturation gradient.
 * @param width width of the gradient.
 * @param height height of the gradient.
 */
export function create_hue_saturation_gradient(width: number, height: number): ImageData {
    const pixels = new ImageData(width, height)
    for (let row = 0; row < pixels.height; row += 1) {
        const relative_row = row / pixels.height

        for (let col = 0; col < pixels.width; col += 1) {
            const relative_col = col / pixels.width
            const offset = 4 * (pixels.width * row + col)
            const rgb = color.hsl_to_rgb({
                hue: color.normalized_component(relative_col),
                saturation: color.normalized_component(1 - relative_row),
                luminosity: color.normalized_component(0.5),
            })
            const { red, green, blue } = color.rgb_as_rgb24(rgb)

            pixels.data[offset + 0] = red
            pixels.data[offset + 1] = green
            pixels.data[offset + 2] = blue
            pixels.data[offset + 3] = 255
        }
    }
    return pixels
}

/**
 * Gets image pixel data from HTML image element.
 *
 * @param img_element HTML image element.
 * @param chunk_dimensions 2D dimensions of chunk of image pixel data. If not specified, the data for the whole image will be returned.
 */
export function get_image_data_from_element(
    img_element: HTMLImageElement,
    chunk_dimensions?: {
        from_x: number
        from_y: number
        width: number
        height: number
    },
): ImageData {
    const tmp_canvas = document.createElement('canvas')
    tmp_canvas.width = img_element.naturalWidth
    tmp_canvas.height = img_element.naturalHeight
    const ctx = tmp_canvas.getContext('2d')
    if (!ctx) {
        throw Error('Could not get 2D canvas context.')
    }
    ctx.drawImage(img_element, 0, 0)
    if (chunk_dimensions) {
        return ctx.getImageData(
            chunk_dimensions.from_x,
            chunk_dimensions.from_y,
            chunk_dimensions.width,
            chunk_dimensions.height,
        )
    } else {
        return ctx.getImageData(0, 0, tmp_canvas.width, tmp_canvas.height)
    }
}

/**
 * Calculates the average pixel value in an `ImageData` object. Each component is calculated using an arithmetic mean.
 * @param pixel_data image pixel data.
 * @return an array of 4 values (R,G,B,A) in range [0, 255].
 */
export function get_average_pixel(pixel_data: ImageData): Uint8ClampedArray {
    const average_pixel = [0, 0, 0, 0]
    const number_of_pixels = pixel_data.width * pixel_data.height

    for (let pixel_index = 0; pixel_index < number_of_pixels; pixel_index += 4) {
        average_pixel[0] += pixel_data.data[pixel_index]
        average_pixel[1] += pixel_data.data[pixel_index + 1]
        average_pixel[2] += pixel_data.data[pixel_index + 2]
        average_pixel[3] += pixel_data.data[pixel_index + 3]
    }

    return new Uint8ClampedArray(average_pixel.map((x) => x / number_of_pixels))
}
