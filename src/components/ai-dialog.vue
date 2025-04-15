<template>
  <div class="dialog">
    <div class="dialog-modal">
      <div class="dialog-content">
        <div class="bg bg1"></div>
        <div class="bg bg2"></div>
        <header>
          <img class="logo" src="../assets/ai-dialog/ai-logo.png" alt="logo" />
          <label class="label">智能产品封装助手</label>
          <div class="action">
            <img class="logo" src="../assets/ai-dialog/refresh.png" alt="logo" />
            <span>重新对话</span>
            <span class="border"></span>
            <img class="logo" src="../assets/ai-dialog/close.png" alt="logo" @click="close" />
          </div>
        </header>
        <section id="chat-scroll">
          <div v-for="item in chats" :class="!item.isUser ? 'left' : 'right'" :key="item.id">
            <div class="left-box" v-if="!item.isUser">
              <img class="logo" src="../assets/ai-dialog/left-arrow.png" alt="logo" />
              <div class="message">
                {{ item.message }}
                <div v-if="item.isfirst" style="margin-top: 4px; color: #666666">你也可点击查看操作文档了解设计步骤<span style="margin-left: 4px; color: #2460fe">查看文档></span></div>
              </div>
            </div>
            <div v-if="item.isAsk" class="tag-box" style="margin-top: 4px; color: #666666">
              <div class="tag"><span class="num">1</span> 连续</div>
              <div class="tag"><span class="num">2</span> 一次性</div>
            </div>
            <div v-if="item.isLoading" class="tag-box" style="margin-top: 4px; color: #666666" @click="handleStop">
              <div class="tag"><img class="logo" src="../assets/ai-dialog/stop.png" alt="logo" /> 停止生成</div>
            </div>
            <div v-if="item.isUser" class="right-box">
              <div class="message">{{ item.message }}</div>
              <img class="logo" src="../assets/ai-dialog/right-arrow.png" alt="logo" />
            </div>
            <div class="scroll-bottom"></div>
          </div>
        </section>
        <footer>
          <div class="inner" style="margin-left: 0;" v-if="isloading">
            <div class="isloading">
              <img class="logo" src="../assets/ai-dialog/loading.png" alt="logo" />
              <div style="color: #FFFFFF;">AI正在处理中……</div>
            </div>
          </div>
          <div class="inner" v-if="!isloading">
            <el-input placeholder="请描述您的需求" :maxlength="500" show-word-limit v-model="input" size="mini"> </el-input>
            <div class="send">
              <img class="logo" @click="sendMsg" src="../assets/ai-dialog/send.png" alt="logo" slot="append" />
            </div>
            <img class="more logo" src="../assets/ai-dialog/more.png" alt="logo" slot="append" />
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    selected() {
      return this.all.filter((item) => item.checked)
    },
  },
  data() {
    return {
      input: '',
      id: 1,
      isloading: false,
      messages: [
        {
          id: 2,
          message: '请输入封装后的商品名称。',
        },
        {
          id: 4,
          message: '请选择收费方式。',
          isAsk: true,
        },
        {
          id: 4,
          message: '正在按照你的要求成封装后的商品信息……',
          isLoading: true,
        },
      ],
      chats: [
        {
          id: 1,
          message: '操作系统是BC-LINCX我是智能产品封装助手，您可以通过与我对话快速完成产品基本封装。',
          isfirst: true,
          isUser: false,
        },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
      this.$emit('update:visible', false)
    },
    categoryChange(category) {
      this.category = category
    },
    addToList() {
      this.$message.success('已加入清单')
    },
    goPackage() {
      this.$router.push('/pending-package')
    },
    revertMessage() {
      if (this.messages.length > 0) {
        const mesg = this.messages.shift()
        this.chats.push({
          id: ++this.id,
          message: mesg.message,
          isUser: false,
          isAsk: mesg.isAsk,
          isLoading: mesg.isLoading,
        })
        if (mesg.isLoading) {
          this.isloading = true
        }
        this.$nextTick(() => {
          document.querySelector('.scroll-bottom').scrollIntoView({})
        })
      } else {
        this.chats.push({
          id: ++this.id,
          message: '系统繁忙',
          isUser: false,
        })
      }
    },
    handleStop() {
      this.isloading = false
    },
    sendMsg() {
      this.chats.push({
        id: ++this.id,
        message: this.input,
        isUser: true,
      })
      this.input = ''
      this.$nextTick(() => {
        document.querySelector('.scroll-bottom').scrollIntoView({
          block: 'end',
        })
      })
      setTimeout(() => {
        this.revertMessage()
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
.dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  inset: 0 0 0 0;

  .dialog-modal {
    position: relative;
    z-index: 9998;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.15);
    .dialog-content {
      position: relative;
      z-index: 9999;
      background-image: url(../assets/ai-dialog/ai-bg.png);
      width: 500px;
      height: 70vh;
      background-size: 100% auto;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 0 0 12px 12px;
      .bg {
        position: absolute;
        z-index: -1;
      }
      .bg1 {
        top: 3vh;
        width: 100%;
        height: 10vh;
        background-image: linear-gradient(180deg, #ffffff00 0%, #f3f6fc 86%);
        border-radius: 4px 4px 0 0;
      }

      .bg2 {
        top: 13vh;
        width: 100%;
        height: 57vh;
        background: #f3f6fc;
        border-radius: 0 0 12px 12px;
      }
      header {
        height: 50px;
        padding: 12px;
        display: flex;
        gap: 4px;
        align-items: center;
      }
      section {
        overflow-y: auto;
        height: calc(70vh - 94px);
        flex: 1;
        padding-bottom: 12px;
        font-size: 12px;
        .left {
          margin-top: 12px;
          .logo {
            width: 8px;
            height: 10px;
          }
          .tag-box {
            display: flex;
            .tag {
              cursor: pointer;
              padding: 4px 8px;
              margin-left: 12px;
              background: #ffffff;
              border-radius: 12px;
              display: flex;
              align-items: center;
              gap: 8px;
              .num {
                color: #2460fe;
              }
              .logo {
                width: 14px;
                height: 14px;
              }
            }
          }
          .left-box {
            display: flex;
            position: relative;
            .logo {
              position: absolute;
              top: 0;
              left: 12px;
              transform: translateX(-100%);
            }
            .message {
              padding: 8px;
              margin-left: 12px;
              margin-right: 28px;
              background: #ffffff;
              border-top-left-radius: 0;
              border-bottom-right-radius: 12px;
              border-top-right-radius: 12px;
              border-bottom-left-radius: 12px;
            }
          }
        }
        .right {
          margin-top: 12px;
          display: flex;
          justify-content: flex-end;
          .logo {
            width: 8px;
            height: 10px;
          }
          .right-box {
            margin-left: 28px;
            position: relative;
            .logo {
              position: absolute;
              top: 0;
              right: 12px;
              transform: translateX(100%);
            }
            .message {
              padding: 8px;
              margin-left: auto;
              margin-right: 12px;
              text-align: right;
              background: #cce0ff;
              border-top-left-radius: 12px;
              border-bottom-right-radius: 12px;
              border-top-right-radius: 0;
              border-bottom-left-radius: 12px;
            }
          }
        }
      }
      footer {
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        background: #ffffff;
        box-shadow: 0 -1px 25px 0 #01168812;
        border-radius: 12px;
        display: flex;
        padding: 12px;
        align-items: center;
        .inner {
          margin-left: 12px;
          width: 100%;
          align-items: center;
          display: flex;
          .isloading {
            width: 100%;
            height: 38px;
            background: #bbceff;
            border-radius: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 18px;
              height: 18px;
            }
          }
          .send {
            height: 28px;
            width: 30px;
            margin-left: 0px;
            box-sizing: border-box;
            border-top: 1px solid #dcdfe6;
            border-bottom: 1px solid #dcdfe6;
            background: #f5f6f9;
            border-top-right-radius: 22px;
            border-bottom-right-radius: 22px;
            img {
              cursor: pointer;
              margin-top: 1px;
              &:hover {
                filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
              }
            }
          }
        }
        ::v-deep .el-input__inner {
          background: #f5f6f9;
          border-radius: 0px;
          border-top-left-radius: 22px;
          border-bottom-left-radius: 22px;
          border-right: none;
          &:focus {
            border-color: #dcdfe6;
          }
        }
        ::v-deep .el-input {
          .el-input__count-inner {
            background: transparent;
          }
        }
      }
      .logo {
        width: 24px;
        height: 24px;
      }
      .more {
        width: 16px;
        height: 16px;
      }
      .label {
        width: 144px;
        height: 26px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        font-size: 14px;
        color: #1e1f24;
        letter-spacing: 0;
        line-height: 26px;
      }
      .action {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #62636c;
        gap: 4px;
        img {
          width: 14px;
          height: 14px;
          cursor: pointer;
        }
        .border {
          margin: 0 4px;
          width: 0px;
          height: 15px;
          border-right: 1px solid #8b8d98;
        }
      }
    }
  }
}
</style>
