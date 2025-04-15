<template>
  <div style="height: 400px">
    <el-table :data="data" style="width: 100%; height: 400px">
      <el-table-column prop="date" label="Date" width="180"> </el-table-column>
      <el-table-column prop="name" label="Name" width="180"> </el-table-column>
      <el-table-column prop="address" label="Address"> </el-table-column>
    </el-table>
  </div>
</template>
  <script>
export default {
  name: "helleWorld",
  props: {
    oldData: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {

    };
  },
  methods: {
    compare(data, oldData, compareProps) {
      
    }
  },
  watch: {
    oldData(newVal) {

    },
    data(newVal) {
      
    }
  }
};
</script>