/**
 * Types and interfaces related to JSON serialization.
 * @module models/json
 */

import type { Tagged } from 'type-fest'

/**
 * Type for valid JSON string.
 */
export type JsonString = Tagged<string, 'JsonString'>
