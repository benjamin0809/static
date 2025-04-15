<template>
  <div id="login-page">
    <div class="login-form">
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               @submit="submitForm('ruleForm')"
               label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="Password"
                      prop="pass">
          <el-input type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm"
                      prop="checkPass">
          <el-input type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Age"
                      prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :loading="loading"
                     @click="submitForm('ruleForm')">Submit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the age'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'));
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    document.addEventListener('keyup', this.onkeyupEnterHandler)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.onkeyupEnterHandler)
  },
  methods: {
    onkeyupEnterHandler (event) {
      if (event.key == 'Enter') {
        this.submitForm('ruleForm')
      }
    },
    submitForm (formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        this.loading = false
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
<style lang="scss" scoped>
#login-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  background: url('../../assets/bg.png') no-repeat;
  background-attachment: fixed;
  background-size: 100% 54%;
  background-position: center;
  // align-items: center;
  // justify-content: center;
  .login-form {
    margin-left: auto;
    margin-right: 120px;
    height: 360px;
    width: 580px;
    padding: 12px;
    background: #fff;
    // outline: 1px solid gray;
    box-shadow: 0px -1px 8px #3e3d3d;
  }
}
</style>