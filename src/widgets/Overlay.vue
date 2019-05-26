<template>
  <div ref="overlay" class="side-overlay dark p-4">
    <b-button @click="close" class="close">
      <i class="mic">chevron_left</i>
    </b-button>
    <h1 class="mt-4 mb-5 pb-4"><i class="mic" v-if="icon != null">{{icon}}</i> {{title}}</h1>
    <b-row>
      <b-col cols="10">
      </b-col>
      <b-col cols="2">

      </b-col>
    </b-row>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {
    open() {
      this.$refs.overlay.style.marginLeft = 0;
    },
    close() {
      this.$refs.overlay.style.marginLeft = '-100%';
    }
  },
  created() {
    this.$events.$on('open-overlay', this.open)                                                                                
    this.$events.$on('close-overlay', this.close)
  }
}
</script>

<style lang="scss" scoped>
  .side-overlay {
    border-right: 1px solid #ddd;
    position: fixed;
    height: 100%;
    left: 0;
    margin-left: -100%;
    max-width: 600px;
    overflow-y: auto;
    top: 0;
    transition: all 0.5s;
    width: 90%;

    h1 {
      border-bottom: 1px solid #ffffff22;
      color: #e2e2e2;
      text-align: center;
    }
  }
</style>
