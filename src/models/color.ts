/**
 * Types and interfaces related to color models and representations.
 * @module models/color
 */

import type { Tagged } from 'type-fest'

/**
 * Color component with normalized value. The value is a float number in [0.0, 1.0] range.
 */
export type NormalizedComponent = Tagged<number, 'NormalizedComponent'>

/**
 * General type for color models with normalized values.
 */
export type NormalizedColorModel = {
    [k in string]: NormalizedComponent
}

/**
 * Color represented with HSL model in RGB space.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export type HSL = {
    hue: NormalizedComponent
    saturation: NormalizedComponent
    luminosity: NormalizedComponent
}

/**
 * Color represented with HSV model in RGB space.
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 */
export type HSV = {
    hue: NormalizedComponent
    saturation: NormalizedComponent
    value: NormalizedComponent
}

/**
 * Color represented with RGB model in RGB space.
 */
export type RGB = {
    red: NormalizedComponent
    green: NormalizedComponent
    blue: NormalizedComponent
}

/**
 * Color component with 8-bit value. The value is an integer in [0, 255] range.
 */
export type Component8Bit = Tagged<number, 'Component8Bit'>

/**
 * RGB TrueColor 24-bit representation, 8 bits per channel.
 */
export type RGB24 = {
    red: Component8Bit
    green: Component8Bit
    blue: Component8Bit
}
