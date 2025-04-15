<template>
  <div>
    <el-button @click="addNewRecord">添加记录</el-button>
    <vxe-table
      :data="tableData"
      :columns="columns"
      :max-height="400"
      ref="xTable"
      border
    >
      <template v-slot:default="{ row }">
        <vxe-column
          field="region"
          title="归属地区"
          :edit-render="{ name: 'input', props: { disabled: isRegionDisabled(row) } }"
        ></vxe-column>
        <vxe-column
          field="effectiveDate"
          title="生效时间"
          :edit-render="{ name: 'date', props: { disabled: isEffectiveDateDisabled(row) } }"
        ></vxe-column>
        <vxe-column
          field="expiryDate"
          title="失效时间"
          :edit-render="{ name: 'date', props: { disabled: isExpiryDateDisabled(row) } }"
        ></vxe-column>
        <vxe-column title="操作" width="100">
          <template v-slot="{ row }">
            <el-button
              v-if="canDelete(row)"
              @click="deleteRecord(row)"
              type="danger"
            >删除</el-button>
          </template>
        </vxe-column>
      </template>
    </vxe-table>

    <el-divider></el-divider>
    <h3>变更对比</h3>
    <el-table :data="comparisonResults" border>
      <el-table-column prop="type" label="类型" width="100"></el-table-column>
      <el-table-column prop="region" label="归属地区" width="180"></el-table-column>
      <el-table-column prop="effectiveDate" label="生效时间" width="180"></el-table-column>
      <el-table-column prop="expiryDate" label="失效时间" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(), // 当前操作时间
      oldData: [
        { region: '地区1', effectiveDate: '2023-01-01', expiryDate: '2023-12-31' },
        { region: '地区2', effectiveDate: '2023-06-01', expiryDate: '2023-12-31' },
      ],
      tableData: [
        { region: '地区1', effectiveDate: '2023-01-01', expiryDate: '2023-12-31' },
        { region: '地区3', effectiveDate: '2023-06-01', expiryDate: '2023-12-31' }, // 新增记录
      ],
      comparisonResults: [],
      columns: [
        { field: 'region', title: '归属地区' },
        { field: 'effectiveDate', title: '生效时间', editRender: { name: 'date' } },
        { field: 'expiryDate', title: '失效时间', editRender: { name: 'date' } },
      ],
    };
  },
  mounted() {
    this.compareData();
  },
  methods: {
    isRegionDisabled(row) {
      return true; // 归属地区字段不可修改
    },
    isEffectiveDateDisabled(row) {
      return new Date(row.effectiveDate) <= this.currentDate; // 生效时间的可修改性逻辑
    },
    isExpiryDateDisabled(row) {
      return new Date(row.expiryDate) <= this.currentDate; // 失效时间的可修改性逻辑
    },
    addNewRecord() {
      this.tableData.push({ region: '', effectiveDate: '', expiryDate: '' });
    },
    deleteRecord(row) {
      const index = this.tableData.indexOf(row);
      if (index > -1) {
        this.tableData.splice(index, 1);
      }
    },
    canDelete(row) {
      return new Date(row.effectiveDate) > this.currentDate; // 判断是否可以删除
    },
    compareData() {
      const newDataSet = new Set(this.tableData.map(item => `${item.region}-${item.effectiveDate}-${item.expiryDate}`));
      const oldDataSet = new Set(this.oldData.map(item => `${item.region}-${item.effectiveDate}-${item.expiryDate}`));

      const added = this.tableData.filter(item => !oldDataSet.has(`${item.region}-${item.effectiveDate}-${item.expiryDate}`));
      const removed = this.oldData.filter(item => !newDataSet.has(`${item.region}-${item.effectiveDate}-${item.expiryDate}`));

      this.comparisonResults = [
        ...added.map(item => ({ type: '新增', ...item })),
        ...removed.map(item => ({ type: '删除', ...item })),
      ];
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 10px;
}
</style>