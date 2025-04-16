<template>
  <div class="tooltip-container">
    <div
      class="tooltip-trigger"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      ref="trigger"
    >
      <slot></slot>
    </div>
    <transition name="fade">
      <div
        v-show="isVisible"
        class="tooltip-content"
        :position="computedPosition"
        :style="tooltipPosition"
        ref="content"
      >
        {{ content }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: false,
      computedPosition: 'top'
    }
  },
  watch: {
    disabled(val) {
      if(val) {
        this.isVisible = false
      }
    }
  },
  computed: {
    tooltipPosition() {
      const positions = {
        top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)' },
        bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)' },
        left: { right: '100%', top: '50%', transform: 'translateY(-50%)' },
        right: { left: '100%', top: '50%', transform: 'translateY(-50%)' }
      }
      return positions[this.computedPosition]
    }
  },
  methods: {
    showTooltip() {
      if (this.disabled) return
      this.isVisible = true
      this.$nextTick(() => {
        this.calculatePosition()
      })
    },
    hideTooltip() {
      this.isVisible = false
    },
    calculatePosition() {
      if (!this.$refs.trigger || !this.$refs.content) return

      const trigger = this.$refs.trigger.getBoundingClientRect()
      const content = this.$refs.content.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      // 检查顶部是否有足够空间
      if (trigger.top - content.height - 10 > 0) {
        this.computedPosition = 'top'
        return
      }

      // 检查底部是否有足够空间
      if (trigger.bottom + content.height + 10 < viewportHeight) {
        this.computedPosition = 'bottom'
        return
      }

      // 检查右侧是否有足够空间
      if (trigger.right + content.width + 10 < viewportWidth) {
        this.computedPosition = 'right'
        return
      }

      // 检查左侧是否有足够空间
      if (trigger.left - content.width - 10 > 0) {
        this.computedPosition = 'left'
        return
      }

      // 如果都没有足够空间，默认显示在顶部
      this.computedPosition = 'top'
    }
  }
}
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-trigger {
  display: inline-block;
}

.tooltip-content {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 1000;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  border-width: 6px;
  border-style: solid;
}

.tooltip-content[position="right"] {
  margin-left: 4px;
}

.tooltip-content[position="right"]::after {
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-color: transparent rgba(0, 0, 0, 0.8) transparent transparent;
}

.tooltip-content[position="left"] {
  margin-right: 4px;
}

.tooltip-content[position="left"]::after {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  border-color: transparent transparent transparent rgba(0, 0, 0, 0.8);
}

.tooltip-content[position="top"] {
  margin-bottom: 4px;
}

.tooltip-content[position="top"]::after {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
}

.tooltip-content[position="bottom"] {
  margin-top: 4px;
}

.tooltip-content[position="bottom"]::after {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>