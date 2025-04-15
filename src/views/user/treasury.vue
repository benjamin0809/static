<template>
  <div>
    <el-button type="primary"
               @click="dialogVisible = true">导出</el-button>
    <el-button type="primary"
               @click="openPrompt">mock</el-button>
    <el-dialog title="金库审批"
               :visible.sync="dialogVisible"
               width="840px"
               :before-close="handleClose">
      <TreasuryBoxVue @submit="handleSubmit"></TreasuryBoxVue>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { MessageBox } from 'element-ui';
import TreasuryBoxVue from './treasury-box.vue';
export default {
  components: {
    TreasuryBoxVue,
  },
  data () {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose (done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleSubmit () {
      this.dialogVisible = false
    },
    openPrompt () {
      const instance = this.$prompt('Please input your e-mail', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'Invalid Email'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: 'Your email is:' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Input canceled'
        });
      });
      console.dir(MessageBox)

      setTimeout(() => {
        MessageBox.close()
      }, 1200)
    }
  }
}
</script> 
<style scoped>
.name {
  color: red;
}
</style>