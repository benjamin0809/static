<template>
  <div class="ai-dialog">
    <!-- 对话框主体 -->
    <div class="dialog-content" ref="dialogContent">
      <!-- 消息列表 -->
      <div class="message-list" ref="messageList">
        <div v-for="(message, index) in messages" :key="index" class="message-item">
          <!-- AI消息 -->
          <div v-if="!message.isUser" class="message ai-message">
            <div class="message-bubble">
              <div class="message-text">{{ message.content }}</div>
              <div class="message-actions">
                <button class="copy-btn" @click="copyMessage(message.content)">
                  <span class="copy-icon">📋</span>
                  <span class="copy-tooltip">复制</span>
                </button>
              </div>
            </div>
          </div>
          <!-- 用户消息 -->
          <div v-else class="message user-message">
            <div class="message-bubble">
              <div class="message-text">{{ message.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 输入框区域 -->
    <div class="input-area">
      <el-input
        v-model="inputMessage"
        type="textarea"
        :rows="3"
        placeholder="请输入消息，按Ctrl+Enter发送"
        @keydown.ctrl.enter="sendMessage"
      ></el-input>
      <el-button type="primary" @click="sendMessage" class="send-btn">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AiDialog',
  data() {
    return {
      messages: [
        {
          content: '你好！我是AI助手，有什么可以帮你的吗？',
          isUser: false
        },
        {
          content: '你好',
          isUser: true
        }
      ],
      inputMessage: ''
    }
  },
  methods: {
    // 复制消息内容
    async copyMessage(content) {
      try {
        await navigator.clipboard.writeText(content)
        this.$message.success('复制成功')
      } catch (err) {
        console.error('复制失败:', err)
        this.$message.error('复制失败，请手动复制')
        // 降级方案：使用临时textarea
        const textarea = document.createElement('textarea')
        textarea.value = content
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
    },
    // 发送消息
    sendMessage() {
      if (!this.inputMessage.trim()) return
      
      this.messages.push({
        content: this.inputMessage,
        isUser: true
      })
      
      this.inputMessage = ''
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    // 滚动到底部
    scrollToBottom() {
      const messageList = this.$refs.messageList
      if (messageList) {
        messageList.scrollTop = messageList.scrollHeight
      }
    }
  },
  watch: {
    // 监听消息变化，自动滚动到底部
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ai-dialog {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dialog-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
    
    &:hover {
      background: #a8a8a8;
    }
  }
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  align-items: flex-start;
  
  &.ai-message {
    justify-content: flex-start;
  }
  
  &.user-message {
    justify-content: flex-end;
  }
}

.message-bubble {
  position: relative;
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 8px;
  word-break: break-word;
  
  .ai-message & {
    background: #f5f7fa;
    color: #333;
  }
  
  .user-message & {
    background: #409eff;
    color: #fff;
  }
}

.message-text {
  margin-right: 30px;
}

.message-actions {
  position: absolute;
  right: 8px;
  top: 8px;
  opacity: 0;
  transition: opacity 0.2s;
  
  .message-bubble:hover & {
    opacity: 1;
  }
}

.copy-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    color: #333;
  }
  
  .copy-icon {
    font-size: 14px;
  }
  
  .copy-tooltip {
    font-size: 12px;
  }
}

.input-area {
  padding: 16px;
  border-top: 1px solid #ebeef5;
  display: flex;
  gap: 12px;
  
  ::v-deep .el-textarea__inner {
    resize: none;
    border-radius: 4px;
    
    &:focus {
      border-color: #409eff;
    }
  }
  
  .send-btn {
    align-self: flex-end;
  }
}
</style>
