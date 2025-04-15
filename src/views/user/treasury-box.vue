<template>
  <div id="treasury-box"
       class="treasury-box name">
    <el-form :model="ruleForm"
             :disabled="loading"
             :rules="rules"
             ref="ruleForm"
             label-width="120px">
      <div class="tips primary">
        当前操作已触发金库模式，请选择相应的审批人进行金库审批
      </div>
      <el-form-item label="审批人："
                    prop="selectedApproverAcct">
        <el-select v-model="ruleForm.selectedApproverAcct"
                   size="mini"
                   placeholder="-请选择-"
                   @change="changeApprover"
                   clearable>
          <el-option v-for="acc in approvers"
                     :label="acc.approverName"
                     :value="acc.approverAcct"
                     :key="acc.approverAcct"></el-option>
        </el-select>
        <el-checkbox v-model="ruleForm.saveAsDefaultApprover"
                     style="margin-left: 8px;">保存为默认金库审批人</el-checkbox>
      </el-form-item>
      <el-form-item label="手机号码："
                    prop="approverMobile">
        {{ ruleForm.approverMobile }}
      </el-form-item>
      <el-form-item label="账号状态："
                    prop="accStatus">
        <span :class="[ruleForm.accStatus == '正常' ? 'primary' : 'error']"
              v-if="ruleForm.selectedApproverAcct">
          {{ ruleForm.accStatus }}</span>
      </el-form-item>
      <el-form-item label="组织机构："
                    prop="orgPath">
        {{ ruleForm.orgPath }}
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item label="选择或者输入申请原因："
                    prop="applyReason">
        <el-select v-model="selDesc"
                   @change="chooseDesc"
                   size="mini"
                   clearable
                   placeholder="-请选择-">
          <el-option label="shanghai来自上海"
                     value="shanghai来自上海"></el-option>
          <el-option label="beijing"
                     value="beijing"></el-option>
        </el-select>
        <el-input type="textarea"
                  :maxlength="60"
                  :minlength="6"
                  size="mini"
                  show-word-limit
                  clearable
                  rows="3"
                  placeholder="请规范填写申请原因! 长度为6~60字符，且至少包含4个不同汉字！"
                  v-model="ruleForm.applyReason"></el-input>
        <el-checkbox v-model="ruleForm.saveAsDefaultApplyReason">保存为常用申请操作原因</el-checkbox>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="申请审批方式："
                    prop="approvalType">
        {{ approvalType }}
      </el-form-item>
      <div class="tips center">
        <el-button type="primary"
                   :loading="loading"
                   @click="submitForm('ruleForm')">{{ ApplyButtonText }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { Loading } from 'element-ui';
import { validateDesc } from './validation'
export default {
  data () {
    return {
      ApplyButtonText: '申请审批',
      loading: false,
      approvalTypeOptions: {
        'MainAcct': '主账号密码方式',
        'SmsKey': '短信密钥方式',
        'SmsReply': '回复短信网关方式'
      },
      loopTimer: null,
      loopStart: false,
      approvers: [],
      ruleForm: {
        saveAsDefaultApprover: false,
        saveAsDefaultApplyReason: false,
        applyReason: '',
        accStatus: '正常',
        approverMobile: '-',
        orgPath: '-',
        approvalType: 'SmsReply'
      },
      selDesc: '',
      rules: {
        selectedApproverAcct: [
          { required: true, message: '请选择审批人', trigger: 'change' }
        ],
        applyReason: [
          { required: true, message: '申请原因必填', trigger: 'blur' },
          { validator: validateDesc, trigger: 'blur' }
        ]
      }
    };
  },
  mounted () {
    this.init()
  },
  computed: {
    approvalType () {
      return this.approvalTypeOptions[this.ruleForm.approvalType]
    }
  },
  methods: {
    init () {
      let loadingInstance = Loading.service({
        target: '#treasury-box'
      });
      this.getApprovers()
      this.getDefaultApprover()
      this.getData().then(res => {
        loadingInstance.close()
        this.approvers = res.data.approvers
      })
    },
    /**
     * 获取审批人列表
     */
    getApprovers () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
    },
    /**
     * 
     */
    getData () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ "code": "000", "msg": "请求成功", "data": { "operationCode": "1-AIUAP-30650", "appCode": "BOMC", "rsp": "0", "policyFlag": "2", "vaultRequestSn": "126261515", "approvalSn": "126261515", "approvalToken": "40|-100|42|-83|35|46|100|0|88|40|-47|102|75", "applyType": "1", "applyTypeName": "单次审批", "applyMaxValidTime": "60", "approvalTypes": [{ "approvalType": "MainAcct", "approvalTypeName": "主账号密码" }, { "approvalType": "SmsKey", "approvalTypeName": "短信密钥" }, { "approvalType": "SmsReply", "approvalTypeName": "回复短信网关" }], "approvers": [{ "approverAcct": "zhangsan", "approverName": "张三", "approverMobile": "13700000000", "orgPath": "中国移动/中移动信息技术有限公司/广州业务支撑中心" }, { "approverAcct": "lisi", "approverName": "李四", "approverMobile": "13700000001", "orgPath": "中国移动/中移动信息技术有限公司/广州业务支撑中心" }, { "approverAcct": "wangwu", "approverName": "王五", "approverMobile": "13700000002", "orgPath": "中国移动/中移动信息技术有限公司/广州业务支撑中心" }] }, "exception": "" })
        }, 500)
      })
    },
    submitApproval () {
      this.loading = true
      return new Promise((resolve, reject) => {
        console.log('提交了数据：', this.ruleForm)
        setTimeout(() => {
          // this.loading = false
          this.ApplyButtonText = '已发送审批申请，正在等待审批人审批'
          this.start()
          // this.$emit('submit', { result: true, message: '审批成功' })
          resolve()
        }, 1200)
      })
    },
    changeApprover (val) {
      const acc = this.approvers.find(item => item.approverAcct == val)
      this.ruleForm.approverMobile = acc?.approverMobile || '-'
      this.ruleForm.orgPath = acc?.orgPath || '-'
      // this.ruleForm.approverMobile = acc?.approverMobile || ''
    },
    chooseDesc (val) {
      this.ruleForm.applyReason = val
      this.$refs.ruleForm.validateField('applyReason')
    },
    /**
     * 保存为默认金库审批人
     * TODO
     */
    saveDefaultApprover () {

    },
    /**
     * 获取默认的金库审批人
     * TODO
     */
    getDefaultApprover () {

    },
    /**
     * 提交表单
     */
    async submitForm (formName) {
      const valid = await this.$refs[formName].validate();
      if (valid) {
        if (this.ruleForm.approvalType === 'SmsKey') {
          this.openConfirmDialog()
        } else {
          this.submitApproval()
        }
      }
    },
    start () {
      this.loopStart = true
      this.startLoop(1)
    },
    /**
     * 短信秘钥弹窗
     */
    openConfirmDialog () {
      this.$prompt('请向审批人线下获取短信秘钥信息', '请输入短信秘钥', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入短信秘钥',
        inputErrorMessage: '短信秘钥不能为空',
        inputPattern: /\S/,
        closeOnClickModal: false,
        customClass: 'treasury-message-key',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            this.submitApproval().then(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            })
          } else {
            done();
          }
        }
      })
    },
    reset () {
      this.loading = false
      this.loopStart = false
      this.ApplyButtonText = '申请审批'
      clearTimeout(this.loopTimer)
    },
    startLoop (count) {
      this.loopTimer = setTimeout(() => {
        this.recheckApprovalStatus(count).then(() => {
          this.showMessage({ result: true })
          this.reset()
          this.$emit('submit', { result: true, message: '审批成功' })
        }).catch(() => {
          if (this.loopStart) {
            this.startLoop(++count)
          }
        })
      }, 1000)
    },
    recheckApprovalStatus (count) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const num = Math.random()
          console.log(`轮询了${count}次`, num)
          if (num > 0.9) {
            resolve()
          } else {
            reject()
          }
        }, 1000)
      })
    },
    /**
   * 显示审批后的结果信息
   */
    showMessage (res = {}) {
      const type = res.result ? 'success' : 'error'
      const message = res.result ? '审批通过' : res.message || '审批失败'
      this.$message({
        type,
        message
      })
    },
    // 关闭弹窗钩子
    beforeDialogClose ({ next }) {
      // 没经过金库审批，弹窗二次确认关闭
      if (!this.loading) {
        this.closeConfirm(next)
        return
      }
      if (typeof next === 'function') {
        next()
      }
    },
    afterDialogClose ({ next }) {
      if (typeof next === 'function') {
        next()
      }
    },
    /**
  * 关闭二次确认
  */
    closeConfirm (next) {
      this.$confirm(this.treasuryConfig.treasuryConfirmMsg || '待金库管理员反馈审批结果，确定关闭当前的金库审批弹框吗？关闭后将取消本次金库触发操作', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (typeof next === 'function') {
          next()
        }
      }).catch(() => {
      })
    },
  },
  beforeDestroy () {
    if (this.loopTimer) {
      clearTimeout(this.loopTimer)
      this.loopTimer = null
    }
  }
}
</script>
<style lang="scss" scoped> 
.name {
  color: blue;
} 
.treasury-box {
  min-width: 800px;
  .tips {
    margin: 12px;
  }
  .center {
    text-align: center;
  }
  .primary {
    color: #409eff;
  }
  .error {
    color: #ff4040;
  }
  ::v-deep {
    .el-form-item__label {
      font-weight: bold;
    }
  }
}
</style>

<style lang="scss">
.treasury-message-key {
  .el-message-box__title {
    font-weight: bold;
  }
  .el-message-box__message {
    color: #409eff;
  }
  .el-input {
    display: flex;
    align-items: center;
    input {
      order: 3;
      flex: 1;
    }
    &::before {
      order: 2;
      content: '短信秘钥：';
      width: 5em;
      display: block;
    }
    &::after {
      content: '*';
      color: red;
      order: 1;
      width: 1em;
      display: block;
    }
  }
}
</style>