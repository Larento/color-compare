<template>
    <Image @select-color="handle_color_selection" />
    <ColorMap :color_marks="color_marks" />
    <LanguagePicker />
</template>

<script setup lang="ts">
import * as vue from 'vue'
import { ColorMap, Image, LanguagePicker } from './components'
import { color } from './modules'

const selected_color = vue.ref<color.RGB>()
const color_marks = vue.computed(() => {
    if (selected_color.value) {
        return [color.rgb_to_hsl(selected_color.value)]
    } else {
        return undefined
    }
})

function handle_color_selection(color: color.RGB) {
    selected_color.value = color
}
</script>

<style lang="css">
:root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    min-width: 320px;
    height: 100dvh;
    display: grid;
    grid-template-rows: 50% 50%;
    align-items: stretch;
    overflow: hidden;
}

@media screen and (aspect-ratio > 1.6) {
    body {
        grid-template-columns: 8fr 5fr;
        grid-template-rows: 100%;
    }
}

h1 {
    font-size: 3.2em;
    line-height: 1.1;
}

a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
}

a:hover {
    color: #535bf2;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
}

button:hover {
    border-color: #646cff;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}

select {
    appearance: none;
    border-radius: 0.5em;
    border: 1px solid transparent;
    padding: 0.6em 1em;
    font-size: 0.9em;
    font-weight: 600;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    text-align: center;
    box-shadow: 0 0.2em 0.8em #2224;
}

button:hover {
    border-color: #646cff;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
    :root {
        color: #213547;
        background-color: #ffffff;
    }

    a:hover {
        color: #747bff;
    }

    button,
    select {
        background-color: #f9f9f9;
    }
}
</style>
