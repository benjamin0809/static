<template>
  <div style="text-align: right">
    <el-popover placement="bottom" width="240" trigger="hover">
      <el-badge slot="reference" :value="all.length" class="item" type="warning">
        <el-button class="popover-btn" size="small">
          <div class="flex a-center">
            <img id="u14_img" class="img" src="../../assets/u14.svg" />
            <span style="margin-left: 4px">待封装产品清单</span>
          </div>
        </el-button>
      </el-badge>
      <div>
        <div v-for="(item, index) in all" class="flex a-center popover-item" style="margin-top: 12px; gap: 8px" :key="index">
          <el-checkbox v-model="item.checked"></el-checkbox>
          <img class="u18_img" src="../../assets/store/popover.png" />
          <div class="content">
            <div style="font-weight: bold">产品名称*****</div>
            <div style="color: gray">专业公司名称</div>
            <div style="color: gray">移动连接/固话</div>
          </div>
          <div class="content" style="margin-left: auto; font-size: 24px; cursor: pointer">
            <i class="el-icon-delete" @click="handleDelete(index)"></i>
          </div>
        </div>
        <div class="flex" style="margin-top: 12px">
          <div class="flex" style="flex-direction: column; font-size: 12px">
            <el-checkbox label="全选"></el-checkbox>
            <div>
              已选中<span style="color: red">{{ selected.length }}</span
              >个产品
            </div>
          </div>
          <div style="margin-left: auto">
            <el-button type="primary" @click="goPackage">去封装（{{ selected.length }}）</el-button>
          </div>
        </div>
      </div>
    </el-popover>
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
      all: [{ checked: true }, { checked: false }, { checked: true }],
      category: '通信产品',
    }
  },
  methods: {
    add() {
      this.all.push({ checked: true })
    },
    categoryChange(category) {
      this.category = category
    },
    handleDelete(index) {
      this.all.splice(index, 1)
    },
    addToList() {
      this.$message.success('已加入清单')
    },
    goPackage() {
      this.$router.push('/pending-package')
    },
  },
}
</script>
<style lang="scss" scoped>
.market-box {
  display: flex;
  .selected {
    text-decoration: underline;
    color: #5584ff;
  }
  .market {
    margin-bottom: 10px;
    padding: 0px 10px;
    font-size: 20px;
    font-weight: bold;
    border-right: 2px solid #ccc;
    &:last-child {
      border-right: none;
    }
    &:first-child {
      padding-left: 0px;
    }
  }
}
.product-box {
  display: flex;
  font-size: 18px;
  .category-title {
    font-weight: bold;
  }
  .category {
    margin-left: 8px;
    &:hover {
      cursor: pointer;
      color: #5584ff;
    }
  }
  .selected {
    text-decoration: underline;
    color: #5584ff;
  }
}
.input-box {
  margin: 12px 0;
  width: 200px;
}

.title-box {
  padding-left: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: left;
  background: #e6edfe;
  font-size: 18px;
  font-weight: bold;
}

.flex {
  display: flex;
}

.a-center {
  align-items: center;
}
#u14_img {
  border-width: 0px;
  left: 0px;
  top: 0px;
  width: 20px;
  height: 20px;
}
.u18_img {
  width: 44px;
  height: 44px;
}
.popover-btn {
  padding: 8px;
}
.popover-item {
}
</style>
