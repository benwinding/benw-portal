<template>
  <div class="rounded-xl bg-gray-400 mb-1 ml-1">
    <span class="px-2">{{ iconLabel }}</span>
  </div>
</template>

<script>
export default {
  props: ["enabled", "iconName", "iconLabel"],
  methods: {
    clickedIcon() {
      this.$emit("clickedIcon", this.iconName);
    }
  }
};
</script>
