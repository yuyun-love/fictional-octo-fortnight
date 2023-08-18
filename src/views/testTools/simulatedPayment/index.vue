<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="他趣模拟充值" name="first">
      <div class="app-container" v-loading="loading" element-loading-text="充值中，请耐心等待" element-loading-spinner="el-icon-loading">
          <aside>
              他趣模拟充值
          </aside>
          <el-form ref="temp_android" :model="temp_android" :rules="rules" label-position="left" label-width="220px"
                   style="width: 600px; margin-left:50px;">
              <div>
              <el-form-item label="平台" :rules="[{ required: true, message: '平台不能为空'}]" prop="platform">
              <el-radio-group v-model="temp_android.platform">
                  <el-radio-button label="安卓"></el-radio-button>
                  <el-radio-button label="苹果"></el-radio-button>
              </el-radio-group>
              </el-form-item>
              </div>
              <el-form-item label="手机号/uuid" prop="phoneNum">
                  <el-input size="medium" v-model="temp_android.phoneNum"  clearable/>
              </el-form-item>
              <el-form-item label="金额" prop="rechargeAmount">
                  <el-input size="medium" placeholder="单位：趣豆" v-model="temp_android.rechargeAmount" maxlength="8" clearable/>
              </el-form-item>
              <el-form-item label="次数" prop="rechargeNum">
                  <el-input size="medium" placeholder="1" v-model="temp_android.rechargeNum" clearable/>
              </el-form-item>

              <el-button type="success" @click="submitForm('temp_android')" size="small">
                  提交
              </el-button>
          </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="他趣后台模拟支付" name="second">
      <div class="app-container" v-loading="loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading">
          <aside>
              他趣后台模拟支付
          </aside>
          <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="220px"
                   style="width: 600px; margin-left:50px;">
              <el-form-item label="业务组订单号" prop="orderNo">
                  <el-input size="medium" v-model="temp.orderNo"/>
              </el-form-item>
              <el-form-item label="金额" prop="amount">
                  <el-input size="medium" v-model="temp.amount"/>
              </el-form-item>
              <el-form-item label="用户的标示符" prop="userMark">
                  <el-input size="medium" v-model="temp.userMark"/>
              </el-form-item>
              <el-form-item label="支付时间">
                  <el-date-picker class="payTime"
                                  v-model="temp.payTime" style="width:380px"
                                  type="datetime"
                                  size="medium"
                                  placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-button @click="submit" type="success" size="small">
                  提交
              </el-button>
          </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>


</template>

<script>
  import {simulaterPay,androidRecharge} from '@/api/testTool'
    export default {
        data() {
            return {
              activeName: "first",
                temp: {
                    // orderNo: '',
                    // amount: '',
                    userMark: '',
                    payTime: new Date(),
                },
                temp_android: {
                    phoneNum: '',
                    rechargeAmount: '',
                    rechargeNum: 1,
                    platform: '安卓',
                },
                loading: false,
                rules: {
                    orderNo: [{
                        type: "number",
                        required: true,
                        message: '订单号必填且只能数字',
                        trigger: 'blur',
                        transform: (value) => Number(value)
                    }],
                    amount: [{
                        type: "number",
                        required: true,
                        message: '金额必填且只能数字',
                        trigger: 'blur',
                        transform: (value) => Number(value)
                    }],
                    rechargeAmount: [{
                        required: true,
                        message: '金额必填且只能数字',
                        trigger: 'blur',
                    }],
                    phoneNum: [{
                        required: true,
                        message: '必填',
                        trigger: 'blur',
                    }],
                },
            }
        },
        methods: {
            submitForm(formName) {
                  this.$refs[formName].validate((valid) => {
                    if (valid) {
                      let platform = 'android';
                      if (this.temp_android.platform == '苹果'){
                          platform = 'iphone'
                      }
                      const params = {
                          'phone': this.temp_android.phoneNum,
                          'orderAmount': this.temp_android.rechargeAmount,
                          'num': this.temp_android.rechargeNum,
                          'platform': platform,
                      };
                      this.loading = true
                      androidRecharge(params).then(response => {
                          this.loading = false
                          let {msg, code} = response;
                          if (code == '20000' && msg == 'success') {
                              this.$notify({
                                          title: 'Success',
                                          message: '充值成功',
                                          type: 'success',
                                          duration: 2000
                                      })

                          } else {
                              this.$message.error({
                                  message: msg,
                                  center: true,
                              })
                          }
                      })
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                  });
            },
            submit(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const params = {
                            'orderId': this.temp.orderNo,
                            'orderAmount': this.temp.amount,
                            'openId': this.temp.userMark,
                            'payTime': this.temp.payTime,
                        };
                        this.loading = true
                        simulaterPay(params).then(response => {
                            this.loading = false
                            let {msg, code} = response;
                            if (code == '20000' && msg == 'success') {
                                this.$notify({
                                    title: 'Success',
                                    message: '处理成功',
                                    type: 'success',
                                    duration: 2000
                                })

                            } else {
                                this.$message.error({
                                    message: msg,
                                    center: true,
                                })
                            }
                        })
                    }
                });

            }
        },
    }
</script>