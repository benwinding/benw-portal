<template>
  <component
    :is="iconName"
    :height="width || 40"
    :width="width || 40"
    :style="{
      fill: color || (colorKeys[iconName] ? colorKeys[iconName].color : '#ddd')
    }"
    v-on:click="$emit('click')"
  />
</template>

<script>
import colorKeys from "~/assets/icon-color-keys.json";
import * as components from './Icon.ts';

export default {
  props: ["iconName", "color", "width"],
  components: {...components},  
  data() {
    return {
      colorKeys: colorKeys
    };
  }
};
</script>
