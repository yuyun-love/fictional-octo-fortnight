<template xmlns="http://www.w3.org/1999/html">
  <div class="app-container" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading">

      <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
      <h2>用例统计</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
          <el-form-item label="项目" :rules="[{ required: true, message: '项目不能为空'}]">
            <el-select v-model="formInline.project" placeholder="项目" style="width:150px;" @change="updateFirstNode" filterable clearable>
              <el-option
                v-for="item in projectList"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="一级模块">
            <el-select ref="select" v-model="formInline.node1"  placeholder="请选择" style="width:250px;" @visible-change="updateSecondNode" multiple collapse-tags filterable clearable>
              <el-option
                v-for="item in nodeList1"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="二级模块">
            <el-select ref="select" v-model="formInline.node2"  placeholder="请选择" style="width:250px;" @visible-change="updateThirdNode" multiple collapse-tags filterable clearable>
              <el-option
                v-for="item in nodeList2"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="三级模块">
            <el-select ref="select" v-model="formInline.node3"  placeholder="请选择" style="width:250px;" multiple collapse-tags filterable clearable>
              <el-option
                v-for="item in nodeList3"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
                    v-model="formInline.timeValue"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :disabled="timeDisabled"
                    align="right"
                    value-format="timestamp"
                    :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="统计指标">
            <el-select v-model="formInline.queryType" placeholder="请选择" style="width:150px;" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="autoLoading">查询</el-button>
          </el-form-item>

        </div>
      </el-form>
      <el-card class="box-card" v-show="showType==1">
        <div id="overview">
          <p class="p-style"><span> 用例统计 </span></p>
          <form class="el-form form-info">
            <div class="el-form-item">
              <label class="el-form-item__label">用例总数:</label>
              <div class="el-form-item__content"> {{total}} </div>
            </div>
            <div class="select-time el-row is-justify-space-between el-row--flex">
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">P0:</label>
                  <div class="el-form-item__content"> {{P0}} </div>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">P1:</label>
                  <div class="el-form-item__content"> {{P1}} </div>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">P2:</label>
                  <div class="el-form-item__content"> {{P2}} </div>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">P3:</label>
                  <div class="el-form-item__content"> {{P3}} </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div>
<!--          <p class="p-style"><span> 人员明细： </span></p>-->
          <el-form label-position="left" inline>
            <el-form-item label="编写者明细："></el-form-item>
            <br>
            <el-form-item style="margin-right: 50px" v-for="data in creator" :label="data.name">
              <span style="">{{data.count}}</span>
            </el-form-item>
          </el-form>
          </div>
        <div>
          <p class="p-style"><span> 执行数据 </span></p>
            <form class="el-form form-info">
            <div class="el-form-item">
              <label class="el-form-item__label">用例总数:</label>
              <div class="el-form-item__content"> {{executeTotal}} </div>
            </div>
              <div>
                <el-form label-position="left" inline>
                  <el-form-item style="margin-bottom: 0px;margin-right: 100px" v-for="(value,key) in executeDetail" :label="key">
                    <span style="">{{value}}</span>
                  </el-form-item>
                </el-form>
              </div>
            </form>
        </div>
      </el-card>

  </div>
</template>

<script>
  import { getProjectList,getFirstNode,getChildrenNode,getCaseNums } from '@/api/testData'

  export default {
    data() {
      return {
        total: 0,
        P0: 0,
        P1: 0,
        P2: 0,
        P3: 0,
        projectList: this.projectData(),
        nodeList1: [],
        nodeList2: [],
        nodeList3: [],
        creator:[],
        timeDisabled: false,
        options: [{
          value: '1',
          label: '新增'
          },
          {
            value: '2',
            label: '更新'
          },
          {
            value: '3',
            label: '新增&更新'
          }
        ],
        result: [],
        showType: 0,
        showType1: 0,
        autoLoading: false,
        pushUser: '',
        visible: false,
        executeTotal: 0,
        executeDetail: {},
        formInline: {
          project: '',
          node1: [],
          node2: [],
          node3: [],
          timeValue: '',
          queryType: '',
        },
        loading: false,
      }
    },
    methods: {
      onSubmit() {
        this.showType = 0
        let nodes = []
        if (this.formInline.node3.length) {
          nodes = this.formInline.node3
        } else if (this.formInline.node2.length) {
          nodes = this.formInline.node2
        } else if (this.formInline.node1.length) {
          nodes = this.formInline.node1
        }
        this.autoLoading = true
        const params = {
          'project_id': this.formInline.project,
          'nodes': nodes,
          'start_time': this.handleData(this.formInline.timeValue, 0),
          'end_time': this.handleData(this.formInline.timeValue, 1),
          'query_type': this.formInline.queryType
          };
        getCaseNums(params).then((res) => {
          this.autoLoading = false
          let {msg, data} = res;
          if (msg === 'success') {
              this.total = data['total']
              this.P0 = data['P0']
              this.P1 = data['P1']
              this.P2 = data['P2']
              this.P3 = data['P3']
              this.executeTotal = data['execute_total']
              this.executeDetail = data['execute']
              this.creator = data['creator']
              this.showType = 1
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      },
      projectData() {
        getProjectList().then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
              this.projectList = data
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      },
      updateFirstNode() {
        if (this.formInline.project) {
        const params = {
          'project_id': this.formInline.project,
          };
        getFirstNode(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
              this.nodeList1 = data
              this.formInline.node1 = ''
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      } else {
          this.formInline.node1 = ''
          this.nodeList1 = []
        }},
      updateSecondNode() {
        if (this.formInline.node1.length) {
        const params = {
          'project_id': this.formInline.project,
          'parent_id': this.formInline.node1
          };
        getChildrenNode(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
              this.nodeList2 = data
              this.formInline.node2 = ''
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      } else {
          this.formInline.node2 = []
          this.nodeList2 = []
        }},
      updateThirdNode() {
        if (this.formInline.node2.length) {
        const params = {
          'project_id': this.formInline.project,
          'parent_id': this.formInline.node2
          };
        getChildrenNode(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
              this.nodeList3 = data
              this.formInline.node3 = ''
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      } else {
          this.formInline.node3 = []
          this.nodeList3 = []
        }},
      handleData(data, index) {
        if (data) {
          return data[index]
        } else {
          return ''
        }
      },
      // 下拉框自动脱焦
      visibleChange(flag) {
        if (flag) {
          this.$refs.select.focus()
        } else {
          this.$refs.select.blur()
        }
      },

    }
  }
</script>
<style>
.p-style {
    padding: 3px 5px;
    font-size: 16px;
    border-radius: 0;
    border-left: 4px solid #409EFF;
    margin: 5px 5px 10px 5px;
}

</style>