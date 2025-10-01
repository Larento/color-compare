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
const resize_observer = vue.ref(new ResizeObserver(handle_canvas_resize))

async function draw_canvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const image_data = canvas.create_hue_saturation_gradient(width, height)
    return createImageBitmap(image_data).then((data) => requestAnimationFrame(() => ctx.drawImage(data, 0, 0)))
}

vue.onMounted(() => {
    const cvs = canvas_element.value
    if (cvs) {
        // @ts-expect-error ts2322
        cvs.width = null
        // @ts-expect-error ts2322
        cvs.height = null
        resize_observer.value.observe(cvs)
    }
})

async function handle_canvas_resize([cvs]: readonly ResizeObserverEntry[]) {
    if (cvs.target instanceof HTMLCanvasElement) {
        cvs.target.width = cvs.contentRect.width
        cvs.target.height = cvs.contentRect.height

        const ctx = cvs.target.getContext('2d')
        if (ctx) {
            cvs.target.width = cvs.contentRect.width
            cvs.target.height = cvs.contentRect.height
            await draw_canvas(ctx, cvs.contentRect.width, cvs.contentRect.height)
            resize_observer.value.unobserve(cvs.target)
        }
    }
}
</script>

<style lang="css" scoped>
.root {
    position: relative;
    height: 100%;
}

.canvas {
    display: block;
    height: 100%;
    width: 100%;
}
</style>
