<template>
  <div
    :style="{ 'background-color': color, 'gap': '0.25em' }"
    :class="enabled ? 'bg-blue-400' : ''"
    class="rounded-xl cursor-pointer bg-gray-400 px-2 mb-1 ml-1 flex items-center"
    v-on:click="clickedIcon()"
  >
    <span class="">{{ iconLabel }}</span>
    <span v-if="count" style="font-size: 0.6em; font-weight: bold; color: #666;">{{ count }}</span>
    <span>
      <svg
        v-if="enabled"
        id="i-close"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="10"
        height="10"
        fill="none"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      >
        <path d="M2 30 L30 2 M30 30 L2 2" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  props: ["enabled", "iconName", "iconLabel", "count", "color"],
  methods: {
    clickedIcon() {
      this.$emit("clickedItem", this.iconName);
    }
  }
};
</script>
