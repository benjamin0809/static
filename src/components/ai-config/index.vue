<template>
  <!-- <div class="ai-config">
    <a class="logo" v-if="showLogo">Logo</a>
    <Chat ref="chat" v-if="!showLogo"></Chat>
  </div> -->
  <floating-dialog>
</floating-dialog>
</template>
<script>
import FloatingDialog from './chat/floating-dialog.vue'
// import Chat from './chat/chat.vue'
export default {
  components: {
    // Chat,
    FloatingDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
      this.$refs.popover.visible = val
    }
  },
  methods: {
    handleVisibleChange (val) {
      this.$emit('update:visible', val)
    }
  },
  data () {
    return {
      showLogo: true,
      displayList: []
    }
  }
}
</script>
<style lang="scss">
.ai-config {
  height: 50vh;
  width: 300px;
  position: fixed;
  inset: 100px 0 0 50px;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
</style>