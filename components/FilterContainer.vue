<template>
  <div class="border-t">
    <div class="flex items-center px-1 hover:bg-gray-200 cursor-default" @click="open = !open">
      <svg
        class="rounded-full bg-gray-500 p-1"
        :style="{
          transform: !open ? 'rotate(-90deg)' : 'rotate(0deg)',
          transition: 'all 0.3s'
        }"
        id="i-chevron-bottom"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24"
        fill="none"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="4"
      >
        <path d="M30 12 L16 24 2 12" />
      </svg>
      <p class="ml-3 text-xl">{{ label }}</p>
    </div>
    <div v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label"],
  data() {
    return {
      open: false
    };
  }
};
</script>
