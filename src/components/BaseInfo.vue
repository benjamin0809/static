<template>

  <el-form :model="ruleForm"
           ref="ruleForm"
           :rules="rules"
           label-suffix="："
           label-width="160px"
           class="demo-ruleForm">
    <el-form-item label="节点名称"
                  required
                  prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="节点id"
                  required
                  prop="id">
      <el-input v-model="ruleForm.id"></el-input>
    </el-form-item>
    <el-form-item label="节点别名"
                  prop="alias">
      <el-input v-model="ruleForm.alias"></el-input>
    </el-form-item>
    <el-form-item label="输出结果"
                  prop="outputResult">
      <el-select v-model="ruleForm.outputResult"
                 placeholder="">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="分页读取"
                  prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="是" value="1"></el-radio>
        <el-radio label="否" value="0"></el-radio>
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="保存请求参数"
                  prop="saveRequest">
      <el-radio-group v-model="ruleForm.saveRequest">
        <el-radio label="是"
                  value="1"></el-radio>
        <el-radio label="否"
                  value="0"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="保存API调用结果"
                  prop="saveResult">
      <el-radio-group v-model="ruleForm.saveResult">
        <el-radio label="是"
                  value="1"></el-radio>
        <el-radio label="否"
                  value="0"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="备注"
                  prop="desc">
      <el-input type="textarea"
                v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'BaseInfo',
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入节点id', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>