<template>
  <div class="right-item">
    <slot name="before"></slot>
    <div class="right-item-content-wrapper">
      <div class="right-item-content">
        {{ content }}
        <div class="triangle"></div>
      </div>
      <copyText :content="content" class="copy-text"></copyText>
    </div>
    <slot name="after"></slot>
  </div>
</template>
<script>
import copyText from './copy-text.vue'
export default {
  name: 'ChatRightItem',
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
.right-item {
  margin-top: 4px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  .right-item-avator {
    width: 20px;
    height: 20px;
  }
  .right-item-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-width: 100%;
    .right-item-content {
      --backgroud: #b8cee9;
      background: var(--backgroud);
      box-sizing: border-box;
      border-radius: 5px;
      padding: 8px;
      font-size: 12px;
      line-height: 1.5;
      word-break: break-word;
      white-space: pre-wrap;
      max-width: 100%;
      position: relative;
      .triangle {
        position: absolute;
        right: -6px;
        bottom: 12px;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid var(--backgroud);
      }
    }
    .copy-text {
      opacity: 0;
      transition: opacity 0.2s;
    }
    &:hover .copy-text {
      opacity: 1;
    }
  }
}
</style>