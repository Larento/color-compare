<script lang="ts">
/**
 * Component for displaying a 2D hue-saturation color map.
 * @module components/ColorMap.vue
 */
export default {}
</script>

<template>
    <div class="root">
        <canvas ref="canvas_element" class="canvas" />
        <ColorMapMark v-for="(clr, i) in $props.color_marks" :key="i" :color="clr" />
    </div>
</template>

<script setup lang="ts">
import * as vue from 'vue'
import { canvas, color } from '../modules'
import { ColorMapMark } from '.'

defineProps<{
    /**
     * Array of colors that should be marked on the color picker.
     */
    color_marks?: Array<color.HSL>
}>()

const canvas_element = vue.ref<HTMLCanvasElement>()
const canvas_context = vue.computed(() => canvas_element.value?.getContext('2d'))

vue.onMounted(() => {
    const ctx = canvas_context.value
    if (ctx) {
        const image_data = canvas.create_hue_saturation_gradient(ctx.canvas.width, ctx.canvas.height)
        ctx.putImageData(image_data, 0, 0)
    }
})
</script>

<style lang="css" scoped>
.root {
    position: relative;
    height: 100%;
}

.canvas {
    display: block;
    height: 100%;
}
</style>
