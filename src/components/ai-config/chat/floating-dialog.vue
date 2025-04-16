<template>
  <div class="floating-container">
    <!-- 悬浮图标 -->
    <div
      class="floating-icon"
      :class="{ 'active': isOpen }"
      @click="toggleDialog"
    >
      <slot name="icon">
        <Tooltip content="产商品极简配置" :disabled="isOpen">
          <img class="default-icon" src="./assets/chat-commodity-config.svg" alt="icon" />
        </Tooltip>
      </slot>
    </div>
    <!-- 对话框过渡动画 -->
    <transition name="dialog">
      <div
        v-show="isOpen"
        class="dialog-container"
        :style="dialogPosition"
      >
      <Chat  @toggleDialog="toggleDialog"></Chat>
      </div>
    </transition>
  </div>
</template>

<script>
import Chat from './chat.vue'
import Tooltip from './tooltip.vue'

export default {
  components: {
    Chat,
    Tooltip
  },
  data() {
    return {
      isOpen: false,
      iconSize: 40 // 根据实际图标尺寸调整
    }
  },
  computed: {
    dialogPosition() {
      return {
        transformOrigin: `${this.iconSize / 2}px ${this.iconSize / 2}px`
      }
    }
  },
  methods: {
    toggleDialog() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped>
.floating-container {
  position: fixed;
  top: 50px;
  left: 50px;
  z-index: 1000;
}

.floating-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: transform 0.3s;
}

.floating-icon.active {
  transform: rotate(45deg);
}


/* 悬浮图标阴影方案 */
.default-icon {
  width: 40px;
  height: 40px;
  background: #409eff;
  border-radius: 50%;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5))
    drop-shadow(0 4px 8px rgba(0,0,0,0.45));
  transition: filter 0.3s;
}

.default-icon:hover {
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.75))
    drop-shadow(0 8px 16px rgba(0,0,0,0.6));
}

.dialog-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 50vh;
}



/* 进入离开动画 */
.dialog-enter-active {
  animation: dialog-in 0.3s;
}

.dialog-leave-active {
  animation: dialog-out 0.3s;
}

@keyframes dialog-in {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes dialog-out {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
}
</style>