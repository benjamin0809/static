<template>
  <div class="chat-box" :style="chatStyle">
    <header class="chat-box-header">
      商品配置
      <button class="close-btn" @click="toggleDialog">◎</button>
    </header>
    <div class="dialog-content">
      <div v-for="item in messages">
        <LeftItem v-if="!item.isUser" :content="item.message"></LeftItem>
        <RightItem  v-if="item.isUser" :content="item.message"></RightItem>
      </div>
    </div>
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
    visible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    visible(val) {
      this.$refs.popover.visible = val;
    },
  },
  computed: {
    chatStyle() {
      return this.height
        ? { height: this.height + "px", transform: "scale(0.5)", width: "40px" }
        : {};
    },
  },
  methods: {
    handleVisibleChange(val) {
      this.$emit("update:visible", val);
    },
    /**
     * 关闭弹窗
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
      messages: [{
        message: `名称	统一产商品编码	商品分类	归属机构
港澳台三地1天流量包	999912119980028008	商品/可选包/国际漫游包	国际公司
一带一路多国22天流量包	999912110800385094	商品/可选包/国际漫游包	国际公司
一带一路多国28天流量包	999932110900558044	商品/可选包/国际漫游包	国际公司
亚洲漫游5天1.5GB叠加包	999912111000088146	商品/可选包/国际漫游包	国际公司
一带一路多国21天流量包	999912110800368094	商品/可选包/国际漫游包	国际公司
春季特惠6天包	989912110800090150	商品/可选包/国际漫游包	国际公司
一带一路多国19天流量包	999912119980378010	商品/可选包/国际漫游包	国际公司
RCEP多国8天流量包	999912119980130233	商品/可选包/国际漫游包	国际公司
json格式输出`
      },{
        isUser: true,
        message: '你好'
      }]
    };
  },
};
</script>
<style lang="scss" scoped>
.chat-box {
  border-radius: 8px;
  height: 100%;
  background: white;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.chat-box-header {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    cursor: pointer;
  }
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  padding: 0 6px;
}

.close-btn:hover {
  color: #333;
}

.dialog-content {
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 12px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
