<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

import HelloWorld from "./components/HelloWorld.vue";
import ResfulApi from "./components/ResfulApi.vue";
import Table from "./components/Table.vue";
export default {
  name: "app",
  components: {
    HelloWorld,
    ResfulApi,
    Table
  },
  methods: {
    handle() {
      // this.tableData.reverse()
      this.p.reverse()
      Object.defineProperty(this.obj, 'sex', {
        enumerable: true,
        writable: true,
        configurable: true,
        value: '123213'
      })
      this.obj.sex = 99999999

      // this.$set(this.obj, 'reactive', '12312312')
      console.log(this.obj)
    }
  },
  data() {
    return {
      obj: {
        name: 'Benjamin'
      },
      p: [1,2,3,4,5],
      radio: '1',
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
      oldTableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>