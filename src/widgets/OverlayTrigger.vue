<template>
  <button type="button" v-if="type == 'button'" @click="openOverlay" :class="'btn ' + cssClass">
    <slot></slot>
  </button>
  <a v-else-if="type == 'link'" @click="openOverlay" :class="'btn ' + cssClass">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    target: {
      type: String,
      default: null
    },
    cssClass: {
      type: String,
      default: ''
    }
  },
  methods: {
    openOverlay() {
      this.$events.$emit('open-overlay')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
