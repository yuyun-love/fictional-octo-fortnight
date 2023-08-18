<template>
    <div class="app-container" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading">
       <aside>
         用于大数据服务端埋点构造并校验数据：kafka消息/落库mysql的数据
       </aside>
       <div>
            <el-row>
              <el-row>
              <label class="radio-label" style="width:200px;" >覆盖他趣埋点:</label>
              <el-link type="success" href="https://o15vj1m4ie.feishu.cn/wiki/wikcn2V3IgYGbSI0p5t5U0bXFuh" target="_blank">他趣-服务端埋点梳理</el-link>
              </el-row>
              <el-row>
              <label class="radio-label" style="width:200px;" >覆盖海外埋点:</label>
              <el-link type="success" href="https://o15vj1m4ie.feishu.cn/wiki/wikcn9zQWGiVIyy9YSHidJBA2hc" target="_blank">海外-服务端埋点梳理</el-link>
              </el-row>
              <el-row>
              <label class="radio-label" style="width:200px;" >操作手册:</label>
              <el-link type="success" href="https://o15vj1m4ie.feishu.cn/wiki/wikcn1a1G8RKdIZ22o7WOjH2hpz" target="_blank">QA平台大数据工具操作手册</el-link>
              </el-row>
              <el-form :model="formInline" ref="formInline" class="demo-form-inline" :inline="true" >
                <el-form-item class="radio-label"  prop="appcode" label="应用:"  >
                  <el-select v-model="formInline.appcode" style="width:150px;" @change="updateEvent" filterable>
                    <el-option
                            v-for="item in formInline.appcodeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item class="radio-label"  prop="event_id" label="埋点名称:"  >
                  <el-select v-model="formInline.event_id" style="width:250px;" @change="event_idchange" filterable>
                    <el-option
                            v-for="item in formInline.event_idOptions"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value"
                            :disabled="item.disabled"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item class="radio-label"  v-show="formInline.vShowTqenv==1" prop="tqenv" label="他趣测试环境:">
                  <el-select v-model="formInline.tqenv"  placeholder="请选择" style="width:130px;" v-show="formInline.vShowTqenv==1">
                    <el-option label="测试环境" value="测试环境">测试环境</el-option>
                    <el-option label="测试环境1" value="测试环境1">测试环境1</el-option>
                    <el-option label="测试环境2" value="测试环境2">测试环境2</el-option>
                    <el-option label="测试环境3" value="测试环境3">测试环境3</el-option>
                    <el-option label="测试环境4" value="测试环境4">测试环境4</el-option>
                    <el-option label="测试环境5" value="测试环境5">测试环境5</el-option>
                  </el-select>
                </el-form-item>

                <el-form-item class="radio-label" >
                  <el-button type="primary" @click="submitForm(formInline)">开始校验</el-button>
                  <el-Button type="primary" @click="resetForm('formInline')">重置</el-Button>
                </el-form-item>
              </el-form>
            </el-row>

            <el-row>
            <label class="radio-label" style="width:200px;" >校验结果</label>
              <json-viewer :value="assert_result" :expand-depth=100 copyable></json-viewer>
            </el-row>
       </div>
    </div>
</template>

<script>
    import {Bigdata_kafka_event_assert, get_event_list} from '@/api/BigdataTool'
    export default {
        data() {
            return {
              formInline: {
                  appcode: '',
                  appcodeOptions: this.GLOBAL.appcodeList,
                  event_id: '',
                  event_idOptions: [],
                  tqenv: '测试环境',
                  vShowTqenv: 1
                },
              assert_result: {"tips": "校验埋点后显示数据"},
              loading: false
            }
        },

        methods: {
          submitForm(param) {
            this.$refs.formInline.validate((valid) => {
              if (valid) {
                console.log('data', param)
                const params = {
                  'appcode': this.formInline.appcode,
                  'event_id': this.formInline.event_id,
                  'tqenv': this.formInline.tqenv
                };
                if (this.formInline.appcode === '') {
                  this.$message.error({
                    message: '请选择应用！',
                    center: true,
                  })
                }
                else if (this.formInline.event_id === '') {
                  this.$message.error({
                    message: '请选择埋点名称',
                    center: true,
                  })
                }
                else {
                                  // 启动loading
                  if (this.loading === false) {
                    this.loading = true
                  }
                  Bigdata_kafka_event_assert(params).then(response => {
                    console.log('response', response)
                    this.loading = true
                    if (response.code === 20000) {
                      this.loading = false
                      this.$message({
                        message: '执行成功',
                        type: 'success'
                        });
                      } else {
                      this.loading = false
                      this.$message.error({
                        message: '执行失败！',
                        center: true,
                        })
                      }
                    this.assert_result = JSON.parse(JSON.stringify(response))
                    // this.list = response.data
                    })
                  }
                }
              })
            },

            updateEvent() {
                if (this.formInline.appcode) {
                  this.formInline.vShowTqenv = 0
                  const params = {
                    'appcode': this.formInline.appcode,
                  };
                  this.formInline.event_idOptions = this.eventData(params)

                  if (this.formInline.appcode === 'taqu') {
                    this.formInline.vShowTqenv = 1
                  }
                }
            },

            eventData(params){
                  get_event_list(params).then((res) => {
                    let {msg, data} = res;
                    if (msg === 'success') {
                      this.formInline.event_idOptions = data
                      this.formInline.event_id = ''
                    } else {
                      this.$message.error({
                        message: msg,
                        center: true,
                      })
                    }
                  })
              },

            event_idchange(){
                 this.formInline.vShowTqenv= 0
                if(this.formInline.appcode === 'taqu'){
                        this.formInline.vShowTqenv = 1
                }
            },
            resetForm(formInline) {
            this.$refs[formInline].resetFields();
          },
        }
    }

</script>

<style>
    .radio-label {
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 30px;
    }

    .el-row {
      margin-bottom: 20px;

    }
    .last-child {
        margin-bottom: 0;
    }

</style>
