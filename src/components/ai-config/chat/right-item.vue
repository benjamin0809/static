<template>
  <div class="right-item">
    <slot name="before"></slot>
    <div class="right-item-content-wrapper">
      <div class="right-item-content">
        {{ content }}
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
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  .right-item-avator {
    width: 20px;
    height: 20px;
  }
  .right-item-content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .right-item-content {
      background: #eff6ff;
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