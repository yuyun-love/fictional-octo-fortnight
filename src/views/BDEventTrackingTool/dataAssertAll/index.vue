<template>
    <div class="app-container">
       <aside>
            用于大数据服务端埋点的天玑或标签全链路数据巡检
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
              <label class="radio-label" style="width:200px;" >覆盖天玑核心场景:</label>
              <el-link type="success" href="https://o15vj1m4ie.feishu.cn/wiki/wikcnNId01wPfE3zvWYkLWWZq8f" target="_blank">天玑平台-服务端埋点核心场景</el-link>
              </el-row>
              <el-form :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules" :inline="true" >
                <el-form-item class="radio-label"  label="执行范围:">
                  <el-select v-model="formInline.execute_type"  placeholder="请选择" style="width:150px;" >
                    <el-option label="海外服务端埋点" value="hw_server">海外服务端埋点</el-option>
                    <el-option label="他趣服务端埋点" value="taqu_server">他趣服务端埋点</el-option>
                    <el-option label="所有用例" value="all">以上所有</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="radio-label" >
                  <el-button type="primary" @click="submitForm()">开始执行巡检</el-button>
<!--                  <el-Button type="primary" @click="resetForm('formInline')">重置</el-Button>-->
                </el-form-item>
              </el-form>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="reportLink"
                    label="最近3次报告链接"
                    width="400">
              <template slot-scope="scope">
                  <a :href="scope.row.reportLink" target="_blank" type="success" class="buttonText">{{scope.row.reportLink}}</a>
              </template>
            </el-table-column>
            <el-table-column
                    prop="finishTime"
                    label="生成时间"
                    width="180">
            </el-table-column>

          </el-table>
        </div>
    </div>
</template>

<script>
    import {run_BDtest,get_report_list} from '@/api/BigdataTool'
    export default {
        data() {
            return {
              formInline: {
                execute_type: '',
                vExecuteType: 0,
                },
              tableData: [],
              rules: {
                  execute_type: [{required: true, message: '请选择执行范围', trigger: 'blur'}],
                },
              assert_result: '',
              isSpinShow: false
            }
        },
       mounted(){
            this.init()
          },

        methods: {
          submitForm() {
            this.$refs.formInline.validate((valid) => {
              if (valid) {
                 const params = {
                   'execute_type': this.formInline.execute_type
                 }
                 if (this.formInline.execute_type==='')
                 {
                   this.$message.error({
                     message: '请选择执行范围',
                     center: true,
                   })
                 }
                 else {
                   run_BDtest(params)
                   this.$message({
                     message: '执行成功，稍后到飞书查看执行报告',
                     type: 'success'
                   })
                 }
                }
              })
            },
          init(){
              // if (this.isSpinShow === false) {
              //     this.isSpinShow = true
              //   }
                get_report_list().then(response => {
                  console.log('response', response.data)
                  this.isSpinShow = true
                  if (response.code === 20000) {
                    this.tableData = response.data
                  }
                })
            }
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
    :last-child {
        margin-bottom: 0;
    }

</style>
