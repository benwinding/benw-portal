<template>
  <div class="border-2 rounded-md mt-2">
    <div class="p-1 flex justify-between">
      <p class="text-gray-700 -mt-1">Order Projects:</p>
    </div>
    <div class="m-1 flex flex-wrap items-center gap-x-1">
      <span
        :key="order"
        v-for="order in orderby"
        class="cursor-pointer px-2 py-0 bg-gray-400 rounded-2xl"
        :class="order === orderSelected ? 'bg-green-400' : ''"
        v-on:click="clickOrderBy(order)"
      >
        {{ order }}
      </span>
      <svg
        v-on:click="clickReverse()"
        class="rounded-full bg-gray-500 p-1 cursor-pointer"
        :style="{
          transform: !orderReversed ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'all 0.3s'
        }"
        id="i-arrow-bottom"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M16.8396 20.1642V6.54639" />
        <path d="M20.9173 16.0681L16.8395 20.1648L12.7617 16.0681" />
        <path d="M6.91115 3.83276V17.4505" />
        <path d="M2.8335 7.92894L6.91127 3.83228L10.9891 7.92894" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["projectsall", "foundCount"],
  data() {
    return {
      orderby: ["name", "year"],
      orderSelected: "",
      orderReversed: null
    };
  },
  mounted() {
    this.orderSelected = "year";
  },
  methods: {
    clickOrderBy(order) {
      const alreadySelected = order === this.orderSelected;
      if (alreadySelected) {
        this.clickReverse();
      } else {
        this.orderSelected = order;
        this.emitChanged();
      }
    },
    clickReverse() {
      this.orderReversed = !this.orderReversed;
      this.emitChanged();
    },
    emitChanged() {
      const orderChangedEvent = {
        order: this.orderSelected,
        isReversed: !!this.orderReversed,
      };
      console.log("emitChanged", { orderChangedEvent });
      this.$emit("orderChanged", orderChangedEvent);
    }
  }
};
</script>
