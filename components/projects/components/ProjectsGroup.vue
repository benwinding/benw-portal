<template>
  <div class="border-2 rounded-md mt-2">
    <div class="p-1 flex justify-between">
      <p class="text-gray-700 -mt-1">Group Projects:</p>
    </div>
    <div class="m-1 flex flex-wrap items-center">
      <span
        :key="group"
        v-for="group in groupby"
        class="cursor-pointer px-1 py-0 bg-gray-400 rounded-2xl mr-1"
        :class="group === groupSelected ? 'bg-green-400' : ''"
        v-on:click="clickGroupBy(group)"
      >
        {{ group }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["projectsall", "foundCount"],
  data() {
    return {
      groupby: ["type", "year", "tech"],
      groupSelected: "",
    };
  },
  mounted() {
    this.groupSelected = "year";
  },
  methods: {
    clickGroupBy(group) {
      this.groupSelected = group;
      this.emitChanged();
    },
    emitChanged() {
      const groupChangedEvent = {
        group: this.groupSelected,
      };
      console.log("emitChanged", { groupChangedEvent });
      this.$emit("groupChanged", groupChangedEvent);
    }
  }
};
</script>
