<template>
  <div style="height: 400px; padding: 24px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">原子产品库</el-breadcrumb-item>
      <el-breadcrumb-item><a >产品清单</a></el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <Popover style="text-align: right"></Popover> -->
    <div class="label">待封装产品清单</div>

    <el-table @selection-change="selectionChange" class="table1" :data="tableData1" style="width: 100%; margin-top: 8px" header-row-class-name="header-row">
      <el-table-column type="selection" label="全选" width="55"> </el-table-column>
      <el-table-column prop="产品名称" label="" width="120">
        <template>
          <img class="u18_img" src="../../assets/product-list/table-icon.png" />
        </template>
      </el-table-column>
      <el-table-column prop="产品名称" label="产品名称"> </el-table-column>
      <el-table-column prop="归属机构" label="归属机构"> </el-table-column>
      <el-table-column prop="小类" label="小类"> </el-table-column>
      <el-table-column prop="描述" label="描述"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template>
          <i class="el-icon-delete" @click="handleDelete(index)"></i>
          <!-- <el-button type="text" size="small">移除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom bg">
      <el-button style="margin-left: 12px" type="text">批量删除</el-button>
      <el-button type="primary"
        @click="goToWrap"
        :disabled="selected.length === 0"
        >去封装( <span style="color: red">{{ selected.length }}</span
        >)</el-button
      >
    </div>
  </div>
</template>
<script>
import { tableData } from './data.js'
import Popover from './popover.vue'
export default {
  name: 'Products',
  components: {
    Popover,
  },
  props: {},
  data() {
    return {
      selected: [],
      tableData1: [...tableData.通信服务, ...tableData.信息服务],
    }
  },
  mounted() {
    const a = document.querySelector('table tbody')
    this.appendEle(0, '通信服务', 'image_message')
    this.appendEle(2, '信息服务', 'image_info')
    console.log(a)
  },
  methods: {
    handleDelete() {

    },
    goToWrap() {
      this.$router.push({
        path: '/package'
      })
    },
    selectionChange(val) {
      this.selected = val
    },
    compare(data, oldData, compareProps) {},
    appendEle(index, text, imageclass) {
      // 获取父元素
      const parentElement = document.querySelector('table tbody') // 替换为你的父元素ID或选择器

      // 创建要插入的新 div
      const newDiv = document.createElement('div')
      const image = document.createElement('div')
      const title = document.createElement('span')
      title.textContent = text
      newDiv.className = 'table-title' // 可选：添加类名以便样式控制
      image.className = imageclass // 可选：添加类名以便样式控制
      newDiv.appendChild(image)
      newDiv.appendChild(title)
      // 获取父元素的子元素列表
      const children = parentElement.children

      // 确保至少有2个子元素
      if (children.length >= index) {
        // 在第二个子元素后插入（即在第三个位置插入）
        parentElement.insertBefore(newDiv, children[index] || null)
      } else {
        // 如果子元素少于2个，直接追加到末尾
        parentElement.appendChild(newDiv)
      }
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

  .el-checkbox__input  {
    &::after {
      content: '全选';
      display: block;
      position: absolute;
      right: 0;top: 0;
      transform: translateX(30px) ;
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
