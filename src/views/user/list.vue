<template>
  <div>
    <el-table ref="multipleTable"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
      :selectable="isSelectable"
                       width="55">
      </el-table-column>
      <el-table-column label="Date"
                       width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name"
                       label="Name"
                       width="120">
      </el-table-column>
      <el-table-column property="address"
                       label="Address"
                       show-overflow-tooltip>
      </el-table-column>
      <div v-for="item in [1]">
        <treasury ref="sd"></treasury>
      </div>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">Toggle selection status of second and third rows</el-button>
      <el-button @click="toggleSelection()">Clear selection</el-button>
    </div>
  </div>
</template>

<script>
import treasury from './treasury.vue'
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }],
      multipleSelection: []
    }
  },
  components: {
    treasury
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val, ...args) {
      console.log(val, args)
      this.multipleSelection = val;
    },
    // 表格复选列，禁用的行不能选中
    isSelectable (row, index) {
      return index % 2 === 0
    },
  },
  mounted() {
    console.log(this.$refs)
  }
}
</script>