<template>
  <div style="margin: 12px">
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :load="load"
      size="mini"
      lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="上架机构" width="150">
      </el-table-column>
      <el-table-column label="汇总" align="center">
        <el-table-column prop="name" align="center" label="全部" width="120">
        </el-table-column>
        <el-table-column prop="name" align="center" label="启用" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="个人商品" align="center">
        <el-table-column prop="name" align="center" label="全部" width="120">
        </el-table-column>
        <el-table-column prop="name" align="center" label="启用" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="家庭市场商品" align="center">
        <el-table-column prop="name" align="center" label="全部" width="120">
        </el-table-column>
        <el-table-column prop="name" align="center" label="启用" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="政企商品" align="center">
        <el-table-column prop="name" align="center" label="全部" width="120">
        </el-table-column>
        <el-table-column prop="name" align="center" label="启用" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column label="新产品" align="center">
        <el-table-column prop="name" align="center" label="全部" width="120">
        </el-table-column>
        <el-table-column prop="name" align="center" label="启用" width="120">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true,
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      console.log(tree, treeNode)
      this.getData().then(resolve)
    },
    getData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
            },
          ])
        }, 1000)
      })
    },
  },
}
</script>
