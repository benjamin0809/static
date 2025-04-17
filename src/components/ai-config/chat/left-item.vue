<template>
  <div class="left-item">
    <slot name="before"></slot>
    <img class="left-item-avator"
         src="./assets/chat-commodity-config.svg"
         alt="avator" />
    <div class="left-item-content-wrapper">
      <div class="left-item-content-icon" v-if="item.isLoading">
        <i class="el-icon-loading"></i>
      </div>
      <div class="left-item-content" v-if="!item.isLoading">
        {{  content }}
      </div>
      <copyText :content="content" class="copy-text" v-if="!item.isLoading"></copyText>
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
    },
    item:{
      type: Object,
      default: {}
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
    .left-item-content-icon {
      width: 20px;
      height: 20px;
    }
    .left-item-content {
      background-color: #c0c4cc;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 8px;
      font-size: 12px;
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