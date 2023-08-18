<template>

  <div class="app-container"  v-loading="loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading">
    <aside>
      聊天室脚本执行
      <br>
      ps：
      <br>
      1，自动提现脚本，一周只支持执行一次，再次执行无效
      <br>
          2，执行提现报表脚本，时间仅支持每周一（本周产生的数据，日期选下周一）
    </aside>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
          <el-form-item label="脚本">
            <el-select v-model="formInline.script" placeholder="项目" style="width:200px;">
              <el-option label="房间流水结算脚本" value="1">房间流水结算脚本</el-option>
              <el-option label="自动提现脚本" value="2">自动提现脚本</el-option>
              <el-option label="提现报表脚本" value="3">提现报表脚本</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker class="selectarea"
              v-model="formInline.time" style="width:220px"
              type="date"
              clearable
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="execute">执行脚本</el-button>
          </el-form-item>
        </div>
      </el-form>
      <br>
  </div>
</template>

<script>
  import { scriptExecution } from '@/api/testTool'

  export default {
    data() {
      return {
        showType: 0,
        disableValue: "false",
        formInline: {
          script: '1',
          time: '',
        },
        loading: false,
        pickerOptions: {
          disabledDate: (time) => {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    methods: {
      execute(){
        const params = {
          'script': this.formInline.script,
          'time': this.formInline.time
          };
        this.showType = 0
        this.loading = true
        scriptExecution(params).then((res) => {
          let {msg} = res;
          this.loading = false;
          if (msg === 'success') {
              this.$message({
                message: '执行成功',
                type: 'success'
              });
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
        })
      }
    },
  }
</script>