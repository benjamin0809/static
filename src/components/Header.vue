<template>
  <el-form :model="ruleForm"
           ref="ruleForm"
           :rules="rules"
           label-suffix="："
           label-width="0"
           class="demo-ruleForm">
    <div class="button-box">
      <el-button type="primary"
                 @click="addHeader">添加header头</el-button>
    </div>
    <el-table :data="ruleForm.headers"
              border>
      <el-table-column label="Header">
        <template slot-scope="scope">
          <el-form-item required
                        :prop="`headers.${scope.$index}.name`">
            <el-input clearable
                      v-model="ruleForm.headers[scope.$index].name"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="缺省值">
        <template slot-scope="scope">
          <el-form-item required
                        :prop="`headers.${scope.$index}.value`">
            <el-input clearable
                      v-model="ruleForm.headers[scope.$index].value"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
    <el-form-item label="透传Header"
                  label-width="120px"
                  prop="transHeader">
      <el-radio-group v-model="ruleForm.transHeader">
        <el-radio label="1">是</el-radio>
        <el-radio label="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      ruleForm: {
        headers: [{
          name: 'token',
          value: '123'
        }],
        transHeader: '1'
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
    addHeader () {
      console.log(this.ruleForm)
      this.ruleForm.headers.push({
        name: '',
        value: ''
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
.button-box {
  margin-bottom: 12px;
}
</style>