<template>
  <div class="flex flex-col items-center py-10">
    <div class="flex flex-col items-center">
      <h2 class="p-4 text-xl italic">{{text || 'Loading...'}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text']
};
</script>
