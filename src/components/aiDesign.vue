<template>
  <transition name="dialog-fade">
    <el-card class="aiDesign"
             :body-style="{padding:'0px'}"
             v-dialogDrag
             v-show="show">
      <div class="aiDesign-header drag">
        <div class="aiDesign-header-title drag">
          <span>智能产品封装助手</span>
        </div>
        <div class="reset no-drag">
          <el-popconfirm title="确定执行该操作吗？"
                         confirm-button-type="text"
                         @confirm="resetMessages">
            <el-button slot="reference"
                       type="text"
                       size="small"
                       :disabled="messageList.length===0">
              <i class="el-icon-refresh"></i>
              重新对话</el-button>
          </el-popconfirm>
        </div>
        <div class="close no-drag">
          <i class="el-dialog__close el-icon el-icon-close no-drag"
             @click="closeDialog"></i>
        </div>
      </div>
      <div class="aiDesign-container"
           ref="aiDesignContainer">
        <div class="example">
          <div>
            <span>
              您好！我是智能产品封装助手，您可以通过与我对话快速完成产品基本封装。您也可以关闭直接在当前页面发起配置。
            </span>
          </div>
          <div><span style="color:#7F7F7F;">有使用疑问或了解产品封装流程可点击查看操作文档了解设计步骤。</span><span style="color:#0000FF; cursor: pointer;">查看文档&gt;</span></div>
        </div>
        <div class="message-box">
          <div class="message-item"
               v-for="item in messageList"
               :key="item.id">
            <div class="message-item-left"
                 v-if="item.role==='system'&&!item.isError">
              <div class="message-system">
                <div class="loading-animation"
                     v-if="!item.message&&item.isReceiving">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </div>
                <div v-show="item.message"
                     class="markdown-body"
                     :class="{'add-cursor-blink':item.message&&item.isReceiving}">
                  {{item.message}}
                </div>
              </div>
              <div class="stop"
                   v-if="item.isReceiving"
                   @click="stop">停止生成</div>
            </div>
            <div class="message-item-right"
                 v-else-if="item.role==='user'">
              <span class="message-user">{{item.message}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="aiDesign-footer">
        <div class="aiDesign-input">
          <el-input type="textarea"
                    :rows="2"
                    placeholder="请描述你的需求"
                    maxlength="500"
                    show-word-limit
                    resize="none"
                    v-model="searchValue"
                    @keyup.native="onKeydown"></el-input>
          <el-tooltip class="item"
                      effect="dark"
                      content="ctrl+enter快捷发送"
                      placement="top-start"
                      :disabled="!!receivingData">
            <button class="send-btn"
                    :class="{disabled:receivingData}"
                    @click="handleSendBtn">
              <i class="el-icon-s-promotion"></i>
            </button>
          </el-tooltip>
        </div>
      </div>
    </el-card>
  </transition>
</template>

<script>
export default {
  name: 'AiDesign',
  props: {
    show: { default: false }
  },
  data () {
    return {
      messageList: [{ message: '请输入封装后的商品名称。', role: 'system', id: Date.now() }],
      searchValue: '',
      aiDesignContainer: null,
      receivingData: null,
      conversationId: ''
    }
  },
  methods: {
    // 关闭弹框前
    closeDialog () {
      this.$emit('update:show', !this.show)
    },

    handleSendBtn () {
      if (!this.searchValue || this.receivingData) return
      const id = Date.now()
      this.messageList.push({ role: 'user', message: this.searchValue, id: id, isError: false })
      this.receivingData = { role: 'system', id: id + 1, message: '', isReceiving: true, isError: false, userId: id }
      this.messageList.push(this.receivingData)
      this.searchValue = ''
    },
    // 通过快捷键发送
    onKeydown (e) {
      const { keyCode, ctrlKey } = e
      if (keyCode === 13 && ctrlKey) {
        this.handleSendBtn()
      }
    },
    scrollToBottom () {
      this.$nextTick(() => {
        const container = this.$refs.aiDesignContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    // 重置对话
    resetMessages () {
      this.messageList = []
      this.conversationId = ''
      this.receivingData = null
    },
    stop () {
      this.messageList.splice(this.messageList.length - 1, 1)
      this.receivingData = null
    }
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  destroyed () {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  watch: {
    'messageList.length' () {
      this.scrollToBottom()
    }
  },
  directives: {
    dialogDrag: {
      bind (el) {
        const header = el.querySelector('.aiDesign-header')
        let startX = 0
        let startY = 0
        header.onmousedown = handleMousedown
        function handleMousedown (e) {
          if (e.target.classList.contains('no-drag')) return
          e.preventDefault()
          startX = e.clientX - el.offsetLeft
          startY = e.clientY - el.offsetTop
          window.addEventListener('mousemove', handleMousemove)
          window.addEventListener('mouseup', handleMouseup)
        }

        function handleMousemove (e) {
          let left = e.clientX - startX
          let top = e.clientY - startY
          const windowHeight = window.innerHeight
          const windowWidth = window.innerWidth
          const offsetLeftMax = windowWidth - 580
          const offsetTopMax = windowHeight - 490
          // 限制可拖动区域
          if (top < 0) {
            top = 0
          }
          if (left > offsetLeftMax) {
            left = offsetLeftMax
          }
          if (left < 0) {
            left = 0
          }
          if (top > offsetTopMax) {
            top = offsetTopMax
          }
          el.style.cssText = `top:${top}px;left:${left}px`
        }

        function handleMouseup () {
          window.removeEventListener('mousemove', handleMousemove)
          window.removeEventListener('mouseup', handleMouseup)
        }
      }
    }
  }

}

</script>

<style lang='scss' scoped>
.dialog-fade-enter-active {
  animation: dialog-fade-in 0.3s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out 0.3s;
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(1);
    background-color: #ccc;
  }
  40% {
    transform: scale(1.5);
    background-color: #000;
  }
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.aiDesign {
  transition: transform 0.05s ease-out;
  z-index: 2000;
  position: fixed;
  width: 580px;
  top: calc(50% - 290px);
  left: calc(50% - 245px);
  font-size: 14px;
  line-height: 1.5;
  word-break: break-all;
  background: linear-gradient(to bottom right, #fbf4ff, #ddecff);
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f1f1f1;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(120, 207, 241, 0.7);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(120, 207, 241);
  }
  .aiDesign-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(133, 130, 130, 0.2);
    padding: 15px;
    .aiDesign-header-title {
      font-weight: 700;
      color: #333333;
      flex: 1;
    }
    .reset {
      margin-right: 50px;
      cursor: pointer;
    }
    .close {
      cursor: pointer;
      transition: color 0.3s;
      font-size: 15px;
      &:hover {
        color: skyblue;
      }
    }
  }
  .aiDesign-container {
    height: 320px;
    padding: 15px;
    overflow: auto;
    .example {
      border-radius: 6px;
      padding: 5px;
      background-color: #fff;
    }
    .message-item-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .system-title {
        margin: 10px 0px;
        font-weight: 700;
        width: 100%;
      }
      .message-system {
        overflow: auto;
        background-color: #fff;
        border-radius: 6px;
        margin-top: 10px;
        .markdown-body {
          font-size: 14px;
          padding: 10px;
        }
        .add-cursor-blink > :last-child:after,
        .add-cursor-blink > ol:last-child li:last-child:after,
        .add-cursor-blink > pre:last-child code:after,
        .add-cursor-blink > ul:last-child li:last-child:after {
          content: '';
          width: 6px;
          height: 6px;
          display: inline-block;
          background-color: #000;
          border-radius: 50%;
          animation: blink 1s infinite;
          vertical-align: middle;
          margin-left: 5px;
        }
        .loading-animation {
          display: flex;
          align-items: center;
          height: 10px;
          width: max-content;
          padding: 10px;
          .dot {
            width: 4px;
            height: 4px;
            margin: 0 5px;
            background-color: #ccc;
            border-radius: 50%;
            animation: bounce 1.5s infinite;
          }

          .dot:nth-child(1) {
            animation-delay: 0s;
          }

          .dot:nth-child(2) {
            animation-delay: 0.3s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.6s;
          }
        }
      }
      .action-area {
        width: 100%;
        .preview {
          width: max-content;
          border-radius: 6px;
          padding: 10px;
          background-color: #fff;
        }
        .el-button {
          padding-left: 10px;
        }
      }
    }
    .message-item-right {
      margin-top: 10px;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .message-user {
        background-color: rgba(0, 153, 255, 0.8);
        border-radius: 6px;
        padding: 8px;
        white-space: pre-wrap;
      }
      i {
        font-size: 22px;
        color: red;
        margin-right: 10px;
      }
    }
  }
  .aiDesign-footer {
    padding: 15px 10px;
    border-top: 1px solid rgba(133, 130, 130, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    .aiDesign-input {
      display: flex;
      align-items: center;
      width: 100%;
      .send-btn {
        margin-left: 15px;
        cursor: pointer;
        width: 38px;
        height: 38px;
        background-color: #55a3ff;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        outline: none;
        border: 0px;
        transition: background-color 0.3s ease; /* 平滑过渡效果 */
        &:hover {
          background-color: #338bff; /* 鼠标悬停时的背景色 */
        }

        &:active {
          background-color: #1169ff; /* 点击时的背景色 */
        }
        .el-icon-s-promotion {
          font-size: 20px;
        }
        &.disabled {
          background-color: #9ac4ff; /* 禁用时的灰色背景 */
          cursor: not-allowed;

          &:hover {
            background-color: #9ac4ff; /* 禁用时悬停不改变颜色 */
          }

          &:active {
            background-color: #9ac4ff; /* 禁用时点击不改变颜色 */
          }

          .el-icon-s-promotion {
            opacity: 0.7; /* 图标透明度降低 */
          }
        }
      }
    }
    .loading {
      width: 100%;
      button {
        width: 100%;
        background: linear-gradient(to right, #9bcdff, #94b8ff);
        border: 0;
      }
    }
  }
}
.stop {
  margin: 5px 0px 0px 5px;
  cursor: pointer;
}
</style>
