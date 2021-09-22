<template>
  <a v-if="href" :href="href" class="flex items-center" :target="samePage ? undefined : '_blank'">
    <Icon class="mr-2" :iconName="iconName" :color="iconColor" width="20" />
    <span>{{ label }}</span>
  </a>
</template>

<script>
import Icon from "~/components/Icon";

export default {
  components: {
    Icon
  },
  props: ["href", "label", "iconName", "iconColor", "samePage"]
};
</script>
