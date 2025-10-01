<script lang="ts">
/**
 * Component for displaying an image provided by user. Handles color picking actions.
 * @module components/Image.vue
 */
export default {}
</script>

<template>
    <img class="root" crossOrigin="anonymous" src="https://picsum.photos/1280/720" @click="handle_click" />
</template>

<script setup lang="ts">
import { canvas, color } from '../modules'

const emit = defineEmits<{
    (e: 'select-color', color: color.RGB): void
}>()

function handle_click(event: MouseEvent) {
    if (event.target instanceof HTMLImageElement) {
        const image_element = event.target
        const image_box = image_element.getBoundingClientRect()
        const relative_x = (event.clientX - image_box.left) / image_box.width
        const relative_y = (event.clientY - image_box.top) / image_box.height
        const pixels = canvas.get_image_data_from_element(image_element, {
            from_x: Math.floor(relative_x * image_element.naturalWidth),
            from_y: Math.floor(relative_y * image_element.naturalHeight),
            width: 1,
            height: 1,
        })
        const avg_pixel = canvas.get_average_pixel(pixels)
        const clr = {
            red: color.component_8bit(color.normalized_component(avg_pixel[0] / 255)),
            green: color.component_8bit(color.normalized_component(avg_pixel[1] / 255)),
            blue: color.component_8bit(color.normalized_component(avg_pixel[2] / 255)),
        } satisfies color.RGB24
        const normalized_clr: color.RGB = color.rgb_from_rgb24(clr)
        emit('select-color', normalized_clr)
    }
}
</script>

<style lang="css" scoped>
.root {
    display: block;
    width: 100%;
}
</style>
