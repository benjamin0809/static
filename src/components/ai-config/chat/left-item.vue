<template>
  <div class="left-item">
    <slot name="before"></slot>
    <img class="left-item-avator"
         src="./assets/chat-commodity-config.svg"
         alt="avator" />
    <div class="left-item-content-wrapper">
      <div class="left-item-content">
        {{  content }}
      </div>
      <copyText :content="content" class="copy-text"></copyText>
    </div>
    <slot name="after"></slot>
  </div>
</template>
<script>
import copyText from './copy-text.vue'
export default {
  name: 'ChatLeftItem',
  components: {
    copyText
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    content:{
      type: String,
      default: ''
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
      displayList: []
    }
  }
}
</script>
<style lang="scss" scoped>
.left-item {
  display: flex;
  gap: 8px;
  .left-item-avator {
    width: 20px;
    height: 20px;
  }
  .left-item-content-wrapper {
    display: flex;
    flex-direction: column;
    .left-item-content {
      background-color: rgb(207, 194, 194);
      box-sizing: border-box;
      border-width: 1px solid rgb(255, 255, 255);
      border-radius: 5px;
      padding: 8px;
      font-size: 12px;
    }
    .copy-text {
      margin-top: 4px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    &:hover .copy-text {
      opacity: 1;
    }
  }
}
</style>