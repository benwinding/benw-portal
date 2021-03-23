<template>
  <div class="rounded-xl bg-gray-400 mb-1 ml-1" v-on:click="clickedIcon()">
    <span class="px-2">{{ iconLabel }}</span>
  </div>
</template>

<script>
export default {
  props: ["enabled", "iconName", "iconLabel"],
  methods: {
    clickedIcon() {
      this.$emit("clickedItem", this.iconName);
    }
  }
};
</script>
