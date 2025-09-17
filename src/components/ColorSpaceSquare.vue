<template>
    <canvas ref="canvas" class="canvas" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { hsl_to_rgb } from '../modules/color'

const canvas = ref<HTMLCanvasElement>()
const canvas_context = computed(() => canvas.value?.getContext('2d'))

onMounted(() => {
    const ctx = canvas_context.value
    if (ctx) {
        const pixels = new ImageData(ctx.canvas.width, ctx.canvas.height)
        console.log(pixels)
        for (let row = 0; row < pixels.height; row += 1) {
            const relative_row = row / pixels.height

            for (let col = 0; col < pixels.width; col += 1) {
                const relative_col = col / pixels.width
                const offset = 4 * (pixels.width * row + col)
                const [r, g, b] = hsl_to_rgb(relative_col, 1 - relative_row, 0.5)

                pixels.data[offset + 0] = r
                pixels.data[offset + 1] = g
                pixels.data[offset + 2] = b
                pixels.data[offset + 3] = 255
            }
        }
        ctx.putImageData(pixels, 0, 0)
    }
})
</script>

<style lang="css" scoped>
.canvas {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    background-color: white;
}
</style>
