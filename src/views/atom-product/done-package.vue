<template>
  <div style="height: 400px; padding: 24px">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/store' }">原子货架</el-breadcrumb-item>
      <el-breadcrumb-item><a>已封装商品清单</a></el-breadcrumb-item>
    </el-breadcrumb> -->
    <div style="text-align: right;">
      <el-button type="" size="small" @click="() => $router.back()">返回</el-button>
    </div>
    <!-- <Popover style="text-align: right"></Popover> -->
    <div class="label">
      已封装商品清单
      <div class="btn"><el-button type="primary" size="mini" @click="handleCopy">复制已有商品</el-button></div>
      
    </div>

    <el-table ref="multipleTable" @selection-change="selectionChange" class="table1" :data="tableData1" style="width: 100%; margin-top: 8px" header-row-class-name="header-row">
      <el-table-column type="selection" label="全选" width="55"> </el-table-column>
      <el-table-column prop="商品名称" label="" width="120">
        <template>
          <img class="u18_img" src="../../assets/product-list/done.png" />
        </template>
      </el-table-column>
      <el-table-column prop="商品名称" label="商品名称"> </el-table-column>
      <el-table-column prop="归属机构" label="归属机构"> </el-table-column>
      <el-table-column prop="商品类型" label="商品类型"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template>
          <i class="el-icon-delete" @click="handleDelete(index)"></i>
          <!-- <el-button type="text" size="small">移除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom bg">
      <el-button style="margin-left: 12px" type="text">批量删除</el-button>
      <el-button type="primary" @click="goToWrap" :disabled="selected.length === 0"
        >提交配置工单( <span style="color: red">{{ selected.length }}</span
        >)</el-button
      >
    </div>
  </div>
</template>
<script>
import Popover from './popover.vue'
const source = {
  id: 1,
  商品名称: '全球通5GA尊享套卡199档',
  归属机构: '集团市场部',
  商品类型: '基础业务组合',
  商品价格: '199（元）',
}
export default {
  name: 'Products',
  components: {
    Popover,
  },
  props: {},
  data() {
    return {
      selected: [],
      id: 1,
      tableData1: [source],
    }
  },
  mounted() {
    // const a = document.querySelector('table tbody')
    // this.appendEle(0, '通信服务', 'image_message')
    // this.appendEle(2, '信息服务', 'image_info')
    // console.log(a)
    this.$nextTick(() => {
      this.tableData1.slice(0, 2).forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      });
    });
  },
  methods: {
    handleCopy() {
      const obj = JSON.parse(JSON.stringify(source))
      obj.id = ++this.id
      this.tableData1.push(obj)
      this.$nextTick(() => {
      this.$refs.multipleTable.toggleRowSelection(obj, true);
    });
    },
    handleDelete(index) {
      this.tableData1.splice(index, 1)
    },
    goToWrap() {
      this.$message.success('提交成功')
    },
    selectionChange(val) {
      this.selected = val
    },
  },
  watch: {
    oldData(newVal) {},
    data(newVal) {},
  },
}
</script>
<style lang="scss" scoped>
.bg {
  background-color: #f0f2f5;
}
.label {
  margin-top: 20px;
  background-color: #d4e6ff;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  font-size: 16px;
  padding: 12px;
  color: #414352;
  text-align: justify;
  .btn {
    float: right;
  }
}
.u18_img {
  width: 48px;
  height: 48px;
  vertical-align: middle;
  margin-right: 5px;
}
.bottom {
  height: 44px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}

.image {
  margin-right: 12px;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-image: url(../../assets/u14.svg);
}

.image_message {
  margin-right: 12px;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-image: url(../../assets/product-list/phone.png);
}

.image_info {
  margin-right: 12px;
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  background-image: url(../../assets/product-list/message.png);
}
</style>

<style lang="scss">
.header-row {
  background-color: rgba(242, 242, 242, 1) !important;
  th {
    background-color: rgba(242, 242, 242, 1) !important;
  }

  .el-checkbox__input {
    &::after {
      content: '全选';
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(30px);
    }
  }
}

.table-title {
  width: 300px;
  font-size: 16px;
  font-weight: 600;
  padding: 12px;
  display: flex;
}
</style>
