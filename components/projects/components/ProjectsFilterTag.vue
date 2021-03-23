<template>
  <div
    :class="enabled ? 'bg-blue-400' : ''"
    class="rounded-xl cursor-pointer bg-gray-400 mb-1 ml-1 flex items-center"
    v-on:click="clickedIcon()"
  >
    <span class="px-2">{{ iconLabel }}</span>
    <span>
      <svg
        v-if="enabled"
        class="mr-2"
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
  props: ["enabled", "iconName", "iconLabel"],
  methods: {
    clickedIcon() {
      this.$emit("clickedItem", this.iconName);
    }
  }
};
</script>
