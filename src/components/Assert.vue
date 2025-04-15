<template>
  <el-form :model="ruleForm"
           ref="ruleForm"
           label-suffix="："
           label-width="160px"
           class="demo-ruleForm">
    <el-form-item label="失败处理方式"
                  required
                  prop="assertion.fail">
      <el-select v-model="ruleForm.assertion.fail"
                 style="width: 100px"
                 placeholder="请选择">
        <el-option label="补偿" value="1">补偿</el-option>
        <el-option label="跳过" value="2">跳过</el-option>
        <el-option label="终止流程" value="3">终止流程</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="断言逻辑"
                  prop="assertion.logic">
      <codemirror v-model="ruleForm.assertion.logic"
                  :options="cmOptions"></codemirror>
    </el-form-item>
  </el-form>
</template>
<script>
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/base16-dark.css'
export default {
  name: 'Assert',
  data () {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      ruleForm: {
        assertion: {
          fail: '',
          logic: ''
        }
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