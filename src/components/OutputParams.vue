<template>
  <el-form :model="ruleForm"
           ref="ruleForm"
           :rules="rules"
           label-suffix="："
           label-width="0"
           class="demo-ruleForm">
    <div class="button-box">
      <el-button type="primary"
                 @click="addHeader">添加参数</el-button>
    </div>
    <el-table :data="ruleForm.outputDef"
              border>
      <el-table-column label="参数名称">
        <template slot-scope="scope">
          <el-form-item required
                        :prop="`outputDef.${scope.$index}.name`">
            <el-input clearable
                      v-model="ruleForm.outputDef[scope.$index].name"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="参数值">
        <template slot-scope="scope">
          <el-form-item required
                        :prop="`outputDef.${scope.$index}.value`">
            <el-input clearable
                      v-model="ruleForm.outputDef[scope.$index].value"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="参数说明">
        <template slot-scope="scope">
          <el-form-item required
                        :prop="`outputDef.${scope.$index}.remark`">
            <el-input clearable
                      v-model="ruleForm.outputDef[scope.$index].remark"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<script>
export default {
  name: 'OutputParams',
  data () {
    return {
      ruleForm: {
        outputDef: [{
          name: 'token',
          value: '123',
          remark: ''
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
      this.ruleForm.outputDef.push({
        name: '',
        value: '',
        remark: ''
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