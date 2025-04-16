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
        <LeftItem v-if="!item.isUser" :content="item.message" />
        <!-- 用户消息 -->
        <RightItem v-if="item.isUser" :content="item.message" />
      </div>
    </div>

    <!-- 底部输入区域 -->
    <footer class="chat-footer">
      <div class="input-wrapper">
        <el-input
          v-model="inputMessage"
          placeholder="请描述您的需求，按Ctrl+Enter发送"
          :maxlength="500"
          show-word-limit
          size="mini"
          @keydown.native="handleKeyDown"
        />
        <div class="send-button" @click="sendMessage">
          <img class="send-icon" src="./assets/send.png" alt="发送" />
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
      return this.height
        ? { height: this.height + "px", transform: "scale(0.5)", width: "40px" }
        : {};
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
     * 发送消息
     */
    sendMessage() {
      if (!this.inputMessage.trim()) return;

      this.messages.push({
        isUser: true,
        message: this.inputMessage,
      });
      this.inputMessage = "";
      this.$nextTick(() => {
        this.scrollToBottom();
      });
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
      showLogo: false,
      displayList: [],
      height: 0,
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
.chat-container {
  position: relative;
  height: 100%;
  padding: 44px 0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom right, #f8f9ff, #f0f4ff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
  background: rgba(255, 255, 255, 0.9);
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
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
  background: rgba(255, 255, 255, 0.6);

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
  height: 44px;
  box-sizing: border-box;
  box-shadow: 0 -1px 25px 0 rgba(1, 22, 136, 0.05);
  border-radius: 12px;
  display: flex;
  padding-right: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
}

// 输入框包装器
.input-wrapper {
  margin-left: 12px;
  width: 100%;
  display: flex;
  align-items: center;

  // 发送按钮
  .send-button {
    height: 28px;
    width: 30px;
    margin-left: 0;
    box-sizing: border-box;
    border-top: 1px solid rgba(220, 223, 230, 0.8);
    border-bottom: 1px solid rgba(220, 223, 230, 0.8);
    background: #f5f7fa;
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
    transition: all 0.3s ease;

    &:hover {
      background: #eef2f7;
    }

    .send-icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-top: 1px;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }
    }
  }

  // 输入框样式覆盖
  ::v-deep .el-input__inner {
    background: #f5f7fa;
    border-radius: 0;
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
    border-right: none;
    color: #2c3e50;
    font-size: 14px;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
    border: 1px solid rgba(220, 223, 230, 0.8);
    transition: all 0.3s ease;

    &::placeholder {
      color: #a8abb2;
    }

    &:focus {
      border-color: #409eff;
      background: #fff;
      box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
    }
  }

  ::v-deep .el-input {
    .el-input__count-inner {
      background: transparent;
      color: #a8abb2;
      font-size: 12px;
    }
  }
}
</style>
