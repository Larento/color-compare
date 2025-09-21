<script lang="ts">
/**
 * Component for marking a specific color on a 2D hue-saturation map.
 * @module components/ColorMapMark.vue
 */
export default {}
</script>

<template>
    <div class="root" />
</template>

<script setup lang="ts">
import * as vue from 'vue'
import type { color } from '../modules'

const props = defineProps<{
    color: color.HSL
}>()

const left_position = vue.computed(() => {
    const { hue } = props.color
    return `${(100 * hue).toPrecision(4)}%`
})

const top_position = vue.computed(() => {
    const { saturation } = props.color
    return `${(100 * (1 - saturation)).toPrecision(4)}%`
})

const background_color_real = vue.computed(() => {
    const { hue, saturation, luminosity } = props.color
    return `hsl(${360 * hue}deg, ${(100 * saturation).toPrecision(4)}%, ${100 * luminosity}%)`
})

const background_color_mid_luminosity = vue.computed(() => {
    const { hue, saturation } = props.color
    return `hsl(${360 * hue}deg, ${(100 * saturation).toPrecision(4)}%, 50%)`
})
</script>

<style lang="css" scoped>
.root {
    position: absolute;
    left: v-bind(left_position);
    top: v-bind(top_position);
    width: 30px;
    height: 30px;
    overflow: hidden;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    border: 6px solid #0008;
    box-shadow: 0 0 8px #0004;
    transition:
        left 500ms,
        top 500ms;

    transform-origin: center;
    animation: appear 500ms forwards;
}

.root::before,
.root::after {
    position: absolute;
    transition: background-color 500ms;
    content: '';
}

.root::before {
    inset: 0 50% 0 0;
    background: v-bind(background_color_mid_luminosity);
}

.root::after {
    inset: 0 0 0 50%;
    background: v-bind(background_color_real);
}

@keyframes appear {
    from {
        opacity: 0;
        scale: 0.5;
    }
    to {
        opacity: 1;
        scale: 1;
    }
}
</style>
