<template>
  <div style="height: 400px; padding: 24px">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">原子产品库</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">产品目录查询</a></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="query-area">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="产品目录：">
          <el-input v-model="form.name" size="mini" style="width: 200px">
            <el-button slot="append">选择</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="产商品分类：">
          <el-select v-model="form.region" size="mini" placeholder="请选择产商品分类">
            <el-option label="产品/数字内容产品/增值业务原子产品" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属机构：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="全部" name="type"></el-checkbox>
            <el-checkbox label="在线营销服务中心" name="type"></el-checkbox>
            <el-checkbox label="咪咕" name="type"></el-checkbox>
            <el-checkbox label="杭州研究院" name="type"></el-checkbox>
            <el-checkbox label="政企事业部" name="type"></el-checkbox>
            <el-checkbox label="政企事业部" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="产品标识：">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="全部" name="type"></el-checkbox>
            <el-checkbox label="战略产品" name="type"></el-checkbox>
            <el-checkbox label="普通产品" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="button-area">
        <el-button size="mini" type="primary" >查询</el-button>
        <el-button size="mini">清空</el-button>
      </div>
    </div>
    <div class="data-area"></div>
  </div>
</template>
<script>
export default {
  name: 'Products',
  props: {},
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    compare(data, oldData, compareProps) {},
  },
  watch: {
    oldData(newVal) {},
    data(newVal) {},
  },
}
</script>
<style lang="scss" scoped>
.query-area {
  margin-top: 12px;
}
.button-area {
  margin-left: auto;
}
::v-deep .el-form-item {
  margin-bottom: 2px;
}
</style>
