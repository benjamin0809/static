<template>
  <div>
    <h1>
      Hello Compare
      <quark-button loadingcolor="blue" id="btn" @click="handle">Button</quark-button>
      <quark-button loadingcolor="blue"  @click="obj.sex = 88888;p.reverse()">Button</quark-button>
      <quark-radio-group :value="radio">
        <quark-radio value="1">1</quark-radio>
        <quark-radio value="2">2</quark-radio>
        <quark-radio value="3">3</quark-radio>
      </quark-radio-group>
      {{ obj.name }}
      {{ obj.sex }}
      <HelloWorld :data="tableData" :oldData="oldTableData"></HelloWorld>
      <ResfulApi></ResfulApi>
      <Table></Table>
      <ul>
        <li v-for="(item,index) in p" :key="index">{{ item }}</li>
      </ul>
    </h1>
  </div>
</template>
<script>

import HelloWorld from "./HelloWorld.vue";
import ResfulApi from "./ResfulApi.vue";
import Table from "./Table.vue";
export default {
  name: "home",
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