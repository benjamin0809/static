<template>
  <div class="copy-container">
    <el-tooltip effect="dark" content="复制" placement="top">
      <i class="copy-icon el-icon-copy-document" @click="handleCopy"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    /**
     * 处理复制操作
     */
    async handleCopy() {
      try {
        await this.copyToClipboard(this.content);
        this.$message.success('复制成功');
      } catch (err) {
        console.error("复制失败:", err);
        this.$message.error('复制失败，请手动复制');
        this.fallbackCopy();
      }
    },

    /**
     * 复制到剪贴板
     * @param {String} text - 要复制的文本
     */
    async copyToClipboard(text) {
      if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
      }
      return this.legacyCopy(text);
    },

    /**
     * 兼容旧版浏览器的复制方法
     * @param {String} text - 要复制的文本
     */
    legacyCopy(text) {
      return new Promise((resolve, reject) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
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
     * 备用复制方法
     */
    fallbackCopy() {
      const range = document.createRange();
      const selection = window.getSelection();
      const contentNode = this.$el.querySelector(".code-content");

      if (contentNode) {
        range.selectNodeContents(contentNode);
        selection.removeAllRanges();
        selection.addRange(range);

        setTimeout(() => {
          selection.removeAllRanges();
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.copy-container {
  position: relative;
  user-select: none;
  height: 16px;
  display: flex;
  padding-top:4px;

}

.copy-icon {
  cursor: pointer;
  font-size: 12px;
  color: #909399;
  transition: color 0.2s ease;
}
</style>
