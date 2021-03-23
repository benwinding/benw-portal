<template>
  <div class="w-full">
    <label
      :class="enabled ? 'bg-blue-400' : ''"
      class="cursor-pointer hover:bg-gray-400 flex items-center"
      v-on:click="clickedIcon()"
    >
      <Icon width="28" class="p-1" v-bind:iconName="iconName"></Icon>
      <span class="w-full">{{ iconLabel }}</span>
      <span>
        <svg
          v-if="enabled"
          class="mr-1"
          id="i-close"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="16"
          height="16"
          fill="none"
          stroke="currentcolor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        >
          <path d="M2 30 L30 2 M30 30 L2 2" />
        </svg>
      </span>
    </label>
  </div>
</template>

<script>
import Icon from "~/components/Icon";

export default {
  props: ["enabled", "iconName", "iconLabel"],
  components: {
    Icon
  },
  methods: {
    clickedIcon() {
      this.$emit("clickedItem", this.iconName);
    }
  }
};
</script>
