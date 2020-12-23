<template>
  <component
    :is="iconName"
    height="40"
    width="40"
    :style="{fill: colorKeys[iconName] ? colorKeys[iconName].color : '#ddd'}"
    v-on:click="$emit('click')"
  />
</template>

<script>
import colorKeys from "~/assets/icon-color-keys.json";

import three from "~/assets/icons/custom/three-js.svg";

import pdf from "~/assets/icons/material/file-pdf.svg";
import hackernews from "~/assets/icons/material/hackernews.svg";
import pen from "~/assets/icons/material/lead-pencil.svg";

import angular from "~/assets/icons/simple/angular.svg";
import firebase from "~/assets/icons/simple/firebase.svg";
import instagram from "~/assets/icons/simple/instagram.svg";
import javascript from "~/assets/icons/simple/javascript.svg";
import messenger from "~/assets/icons/simple/messenger.svg";
import chrome from "~/assets/icons/simple/googlechrome.svg";
import firefox from "~/assets/icons/simple/mozillafirefox.svg";
import python from "~/assets/icons/simple/python.svg";
import react from "~/assets/icons/simple/react.svg";
import svelte from "~/assets/icons/simple/svelte.svg";
import vue from "~/assets/icons/simple/vuejs.svg";
import wordpress from "~/assets/icons/simple/wordpress.svg";

import android from "~/assets/icons/devicons/android.svg";
import apple from "~/assets/icons/devicons/apple.svg";
import flutter from "~/assets/icons/devicons/flutter.svg";

export default {
  props: ["iconName"],
  components: {
    three,
    pdf,
    hackernews,
    pen,
    angular,
    firebase,
    instagram,
    javascript,
    messenger,
    chrome,
    firefox,
    python,
    react,
    svelte,
    vue,
    wordpress,
    android,
    apple,
    flutter,
  },
  data() {
    return {
      colorKeys: colorKeys
    };
  }
};
</script>