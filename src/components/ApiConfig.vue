<template>
  <el-form :model="ruleForm"
           ref="ruleForm"
           :rules="rules"
           label-suffix="："
           label-width="160px"
           class="demo-ruleForm">
    <el-form-item label="API URL"
                  required
                  prop="apiUrl">
      <el-input placeholder="请输入内容"
                v-model="ruleForm.apiUrl"
                class="input-with-select">
        <el-select v-model="ruleForm.httpMethod"
                   slot="prepend"
                   style="width: 100px"
                   placeholder="请选择">
          <el-option label="POST"
                     value="POST"></el-option>
          <el-option label="GET"
                     value="GET"></el-option>
        </el-select>
        <el-button slot="append">选择</el-button>
      </el-input>
      <span>asdasdasdsdasd</span>
    </el-form-item>
    <el-form-item label="参数传递方式"
                  prop="parameterType">
      <el-radio-group v-model="ruleForm.parameterType">
        <el-radio label="Form键值对"
                  value="1"></el-radio>
        <el-radio label="Body请求"
                  value="0"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="异步调用"
                  prop="asyncInvoke">
      <el-radio-group v-model="ruleForm.asyncInvoke">
        <el-radio label="否"
                  value="0"></el-radio>
        <el-radio label="是"
                  value="1"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="请求超时时间"
                  prop="timeout">
      <el-input-number v-model="ruleForm.timeout"
                       :min="0"
                       :max="300000"
                       :controls="false"
                       label="描述文字"></el-input-number>
    </el-form-item>
    <!-- <el-form-item label="重试次数"
                  prop="alias">
      <el-input v-model="ruleForm.alias"></el-input>
    </el-form-item>
    <el-form-item label="重试间隔"
                  prop="alias">
      <el-input v-model="ruleForm.alias"></el-input>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
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
          { required: true, message: '请输入API URL', trigger: 'blur' }
        ],
        timeout: [
          { required: true, message: '请输入超时时间', trigger: 'change' }
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