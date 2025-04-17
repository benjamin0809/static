<template>
  <div class="chat-container" :style="containerStyle">
    <!-- 头部区域 -->
    <header class="chat-header">
      <span class="header-title">商品极简配置助手</span>
    </header>

    <!-- 消息内容区域 -->
    <div class="chat-content" ref="chatContent">
      <div v-for="(item, index) in messages" :key="index">
        <!-- AI消息 -->
        <LeftItem v-if="!item.isUser" :content="item.message" :item="item" />
        <!-- 用户消息 -->
        <RightItem v-if="item.isUser" :content="item.message" />
      </div>
    </div>

    <!-- 底部输入区域 -->
    <footer class="chat-footer">
      <div class="input-wrapper">
        <el-input
          v-model="inputMessage"
          type="textarea"
          :rows="1"
          :autosize="{ minRows: 1, maxRows: 4 }"
          placeholder="请描述您的需求，按Ctrl+Enter发送"
          :maxlength="500"
          @keydown.native="handleKeyDown"
          @input="handleInput"
          ref="inputRef"
        />
        <div class="bottom-controls">
          <span class="word-count">{{ inputMessage.length }}/500</span>
          <div class="send-icon-wrapper">
            <el-tooltip
            v-if="!isLoading"
              effect="dark"
              content="发送，按Ctrl+Enter快捷发送"
              placement="top"
            >
              <img class="send-icon" src="./assets/send.png" alt="发送" @click="sendMessage" />
            </el-tooltip>
            <i class="el-icon-video-pause"  v-if="isLoading" @click="stopRequest"></i>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import LeftItem from "./left-item.vue";
import RightItem from "./right-item.vue";

export default {
  name: "ChatBox",
  components: {
    LeftItem,
    RightItem,
  },
  props: {
    // 对话框显示状态
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // 监听对话框显示状态变化
    visible(val) {
      this.$refs.popover.visible = val;
    },
    // 监听消息列表变化，自动滚动到底部
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true,
    },
  },
  computed: {
    // 容器样式
    containerStyle() {
      return {
        paddingTop: `${this.$headerHeight}px`,
        paddingBottom: `${this.footerHeight}px`
      };
    },
  },
  methods: {
    /**
     * 处理对话框显示状态变化
     * @param {Boolean} val - 显示状态
     */
    handleVisibleChange(val) {
      this.$emit("update:visible", val);
    },

    /**
     * 处理键盘事件
     * @param {Event} e - 键盘事件对象
     */
    handleKeyDown(e) {
      if (e.ctrlKey && e.key === "Enter") {
        this.sendMessage();
      }
    },

    /**
     * 处理输入事件
     */
    handleInput() {
      this.$nextTick(() => {
        const textarea = this.$refs.inputRef.$el.querySelector('textarea');
        if (textarea) {
          // 计算文本行数
          const lineHeight = 20; // 行高
          const padding = 16; // 上下内边距
          const minHeight = 44; // 最小高度
          const maxHeight = 120; // 最大高度
          
          // 计算内容高度
          const contentHeight = textarea.scrollHeight;
          // 计算实际需要的高度
          const newHeight = Math.min(Math.max(contentHeight, minHeight), maxHeight);
          
          // 更新底部区域高度
          this.footerHeight = newHeight + 22; // 22px 是底部控制区域的高度
        }
      });
    },
    stopRequest() {
      this.isLoading = false
      this.lastMesgRef.isLoading = false
    },
    /**
     * 发送消息
     */
    sendMessage() {
      if (!this.inputMessage.trim()) return;

      this.messages.push({
        isUser: true,
        message: this.inputMessage,
      });
      this.inputMessage = "";
      this.footerHeight = 66; // 重置高度
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      this.sendToSever()
    },
    async sendToSever() {
      this.lastMesgRef = {
        message: '',
        isLoading: true
      }
      this.isLoading = true
      this.messages.push(this.lastMesgRef)
      const mesg = await this.waitToReply()
      this.lastMesgRef.message = mesg
      this.lastMesgRef.isLoading = false
      this.isLoading = false
    },

    async waitToReply() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('服务器繁忙,请稍后再试')
        }, 10000)
      })
    },

    /**
     * 滚动到底部
     */
    scrollToBottom() {
      const chatContent = this.$refs.chatContent;
      if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    },

    /**
     * 关闭对话框
     */
    toggleDialog() {
      this.$emit("toggleDialog", false);
    },
  },
  data() {
    return {
      lastMesgRef: null,
      isLoading: false,
      $headerHeight: 44,
      footerHeight: 66, // 默认高度
      inputMessage: "",
      messages: [
        {
          message: `名称	统一产商品编码	商品分类	归属机构
港澳台三地1天流量包	999912119980028008	商品/可选包/国际漫游包	国际公司
一带一路多国22天流量包	999912110800385094	商品/可选包/国际漫游包	国际公司
一带一路多国28天流量包	999932110900558044	商品/可选包/国际漫游包	国际公司
亚洲漫游5天1.5GB叠加包	999912111000088146	商品/可选包/国际漫游包	国际公司
一带一路多国21天流量包	999912110800368094	商品/可选包/国际漫游包	国际公司
春季特惠6天包	989912110800090150	商品/可选包/国际漫游包	国际公司
一带一路多国19天流量包	999912119980378010	商品/可选包/国际漫游包	国际公司
RCEP多国8天流量包	999912119980130233	商品/可选包/国际漫游包	国际公司
json格式输出`,
        },
        {
          isUser: true,
          message: "你好",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$header-height: 44px;
$footer-height: 66px;
.chat-container {
  box-sizing: border-box;
  position: relative;
  height: 100%;
  padding-top: $header-height;
  padding-bottom: $footer-height;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #fbf4ff, #ddecff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

// 头部样式
.chat-header {
  height: 44px;
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  backdrop-filter: blur(8px);
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .header-title {
    text-align: center;
    margin-left: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #2c3e50;
    letter-spacing: 0.5px;
  }
}

// 内容区域样式
.chat-content {
  position: relative;
  width: 100%;
  flex: 1;
  padding: 12px;
  box-sizing: border-box;
  overflow: auto;

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}

// 底部样式
.chat-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -1px 25px 0 rgba(1, 22, 136, 0.05);
  display: flex;
  padding: 8px 8px 4px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  transition: height 0.3s ease;
}

// 输入框包装器
.input-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  ::v-deep .el-textarea {
    width: 100%;

    .el-textarea__inner {
      background: #ddecff;
      border-radius: 12px;
      color: #2c3e50;
      font-size: 12px;
      padding: 8px 12px;
      border: none;
      //transition: all 0.3s ease;
      resize: none;
      line-height: 18px;
      min-height: 28px !important;
      box-shadow: none;

      &:focus {
        border: none;
        box-shadow: none;
      }

      &::placeholder {
        color: #a8abb2;
        font-size: 12px;
      }
    }

    .el-input__count {
      display: none;
    }
  }

  .bottom-controls {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 4px;
    padding-right: 8px;
    width: 100%;
  }

  .word-count {
    color: #a8abb2;
    font-size: 12px;
    margin-right: 12px;
  }

  .send-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }

    .send-icon {
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
    }
  }
  .send-icon-wrapper[disabled=true] {
    opacity: 0.6;
  }
}

</style>
