<template>
  <div class="app-container"  v-loading="loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading">
    <aside>
      修改活动列表-榜单活动：活动开始时间
    </aside>
      <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
          <el-form-item label="项目">
            <el-select v-model="formInline.projectName" placeholder="项目" style="width:100px;">
              <el-option label="海外" value="海外">海外</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="环境">
            <el-select v-model="formInline.env"  placeholder="请选择" style="width:100px;">
              <el-option label="测试1" value="测试1">测试1</el-option>
              <el-option label="测试2" value="测试2">测试2</el-option>
              <el-option label="测试3" value="测试3">测试3</el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <br>
      <el-table :data="result.filter((v) => v.cycle.key != 4)" style="width: 100%" v-show="showType==1">
        <el-table-column prop="id" label="ID" width="60" sortable></el-table-column>
        <el-table-column prop="countryList" label="国家"></el-table-column>
        <el-table-column prop="rankType.value" label="榜单类型">
        </el-table-column>
        <el-table-column prop="subRankType.value" label="子榜">
        </el-table-column>
        <el-table-column prop="cycle.value" label="榜单周期">
        </el-table-column>
        <el-table-column
            prop="startTime"
            sortable
            label="活动开始时间"
            :formatter='formatDate'>
        </el-table-column>
        <el-table-column prop="status" label="活动状态" :formatter="statusName">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">修改活动时间</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="编辑" :visible.sync="dialogTableVisible" :data="templateList" style="width: 60%; margin: 0 auto 50px;">
        <template scope='scope'>
          <el-form :model="templateList" ref="templateList" style="padding-left: 80px; width: 600px">

              <el-form-item label="活动开始时间" prop="startTime">
                <template>
                  <div class="block">
                    <el-date-picker class="selectarea"
                      v-model="templateList.startTime"
                      type="date"
                      value-format="timestamp">
                    </el-date-picker>
                  </div>
                </template>
              </el-form-item>
          </el-form>
        </template>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="autoLoading" @click="submitForm(templateList)">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import { getRankList,updateRankTime } from '@/api/testTool'

  export default {
    data() {
      return {
        result: [],
        showType: 0,
        dialogTableVisible: false,
        autoLoading: false,
        templateList: [],
        formInline: {
          env: '测试1',
          projectName: '海外',
        },
        loading: false,
      }
    },
    methods: {
      onSubmit() {
        const params = {
          'env': this.formInline.env,
          };
        this.showType = 0
        this.loading = true
        getRankList(params).then((res) => {
          let {msg, data} = res;
          this.loading = false;
          if (msg === 'success') {
              this.result = data
              this.showType = 1
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      },
      handleClick(data) {
        this.dialogTableVisible = true
        this.templateList = extendCopy(data);
        // 对象进行深拷贝，否则“编辑”框内修改内容(data)会影响到页面

        function extendCopy(p) {
          var c = {};
          for (var i in p) {
            c[i] = p[i];
          }
          return c;
          }
      },
      formatDate(row) {
        let date = new Date(row['startTime']);
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
      statusName(row) {
        let name = {
          0: '待激活',
          1: '未开始',
          2: '进行中',
          3: '已结束'
        }
        return name[row['status']]
      },
      submitForm(val) {
          this.autoLoading = true
          console.log(val.link)
          const params = {
            "id": val.id,
            "countryList": val.country,
            "rankType": val.rankType.key,
            "subRankType": val.subRankType.key,
            "cycle": val.cycle.key,
            "startTime": val.startTime,
            "unitTime": val.unitTime,
            "templateType": val.templateType,
            "linkType": 0,
            "env": this.formInline.env,
            "status": val.status
          };
          if (val.link) {
            params["linkType"] = 1
            params["link"] = val.link
          }
          updateRankTime(params).then((res) => {
          let {msg, data} = res;
          this.autoLoading = false;
          if (msg === 'success') {
              this.$message.success({
                  message: data,
                  center: true,
              })
              this.dialogTableVisible = false
              this.onSubmit()
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
        },
    }
  }
</script>
<style>


</style>