<template>
    <div class="container" :class="is_shown ? undefined : 'hidden'">
        <select class="root" name="language" v-model="$language.current">
            <option v-for="(label, value) in $language.available" :value="value">
                {{ label }}
            </option>
        </select>
        <span class="divider"></span>
        <button
            class="globe"
            :title="is_shown ? $gettext('Hide language select') : $gettext('Show language select')"
            @click="is_shown = !is_shown"
        >
            <span>🌍</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import * as vue from 'vue'
const is_shown = vue.ref(false)
</script>

<style lang="css" scoped>
.container {
    position: fixed;
    bottom: 1em;
    left: 1em;
    display: flex;
    place-items: center;
    background-color: #1a1a1a;
    border-radius: 0.5em;
    box-shadow: 0 0.2em 0.8em #2224;
    user-select: none;
    -webkit-user-select: none;
    transition: transform 500ms;
}

.hidden {
    transform: translateX(calc(2em - 100%));
}

.root {
    background: transparent;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none;
}

.divider {
    width: 1px;
    align-self: stretch;
    background-color: #fff5;
    margin-block: 0.5em;
}

.globe {
    padding: 0;
    padding-inline: 0.6em;
    font-size: 1.2em;
    align-self: stretch;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.globe span {
    filter: brightness(90%) contrast(125%);
    text-shadow: 0 0 0.5em #fff5;
}

@media (prefers-color-scheme: light) {
    .container {
        background-color: #f9f9f9;
    }

    .divider {
        background-color: #2225;
    }

    .globe span {
        filter: brightness(100%) contrast(95%);
        text-shadow: 0 0 0.4em #2225;
    }
}
</style>
