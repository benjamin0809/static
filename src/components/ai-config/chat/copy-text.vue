<template>
  <div class="copy-container">
    <!-- 复制操作区域 -->
    <div class="action-bar">
      <button class="copy-btn" @click="handleCopy" :disabled="isCopying">
        <tooltip content="复制"><span>📋</span></tooltip>
      </button>

      <!-- 反馈提示 -->
      <transition name="fade">
        <div v-if="showFeedback" class="feedback" :class="feedbackType">
          {{ feedbackMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import tooltip from "./tooltip.vue";
export default {
  components: {
    tooltip,
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    feedbackDuration: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      isCopying: false,
      showFeedback: false,
      feedbackType: "success",
      feedbackMessage: "",
    };
  },
  methods: {
    /**
     *  处理复制操作
     */
    async handleCopy() {
      this.isCopying = true;
      try {
        await this.copyToClipboard(this.content);
        // this.showFeedbackMessage("复制成功!", "success");
      } catch (err) {
        console.error("复制失败:", err);
        this.showFeedbackMessage("复制失败，请手动复制", "error");
        this.fallbackCopy();
      } finally {
        this.isCopying = false;
      }
    },

    /**
     *  现代API方案
     * @param text 要复制的文本
     */
    async copyToClipboard(text) {
      console.log(navigator.clipboard, text)
      // 现代API方案
      if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
      }
      // 兼容方案
      return this.legacyCopy(text);
    },

    /**
     *  兼容旧版浏览器的复制方法
     * @param text 要复制的文本
     */
    legacyCopy(text) {
      return new Promise((resolve, reject) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed"; // 避免滚动跳转
        document.body.appendChild(textarea);
        textarea.select();

        try {
          const successful = document.execCommand("copy");
          if (!successful) throw new Error("复制命令被拒绝");
          resolve();
        } catch (err) {
          reject(err);
        } finally {
          document.body.removeChild(textarea);
        }
      });
    },

    /**
     * 兼容旧版浏览器的复制方法
     */
    fallbackCopy() {
      // 创建临时可选中区域
      const range = document.createRange();
      const selection = window.getSelection();
      const contentNode = this.$el.querySelector(".code-content");

      range.selectNodeContents(contentNode);
      selection.removeAllRanges();
      selection.addRange(range);

      setTimeout(() => {
        selection.removeAllRanges();
      }, 100);
    },

    /**
     * 显示反馈信息
     * @param message 反馈信息
     * @param type 反馈类型，可选值为 'success' 或 'error'
     */
    showFeedbackMessage(message, type) {
      this.feedbackType = type;
      this.feedbackMessage = message;
      this.showFeedback = true;

      setTimeout(() => {
        this.showFeedback = false;
      }, this.feedbackDuration);
    },
  },
};
</script>

<style scoped>
.copy-container {
  position: relative;
  user-select: none; /* 防止文本被选中 */
}

.action-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 20px; /* 固定高度防止抖动 */
}

.copy-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  -webkit-tap-highlight-color: transparent; /* 移除移动端点击高亮 */
  outline: none; /* 移除焦点轮廓 */
}


.copy-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.feedback {
  position: absolute;
  left: 30px; /* 复制按钮宽度 + 间距 */
  top: 0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  user-select: none; /* 防止文本被选中 */
}

.feedback.success {
  background: #f0f9eb;
  color: #67c23a;
}

.feedback.error {
  background: #fef0f0;
  color: #f56c6c;
}

/* 提示动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
