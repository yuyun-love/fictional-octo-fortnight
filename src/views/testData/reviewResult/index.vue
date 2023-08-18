<template>
  <div class="app-container" v-loading="loading" element-loading-text="loading" element-loading-spinner="el-icon-loading">

      <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
          <el-form-item label="项目">
            <el-select v-model="formInline.project" placeholder="项目" style="width:150px;" @change="updateReview" filterable clearable>
              <el-option
                v-for="item in projectList"
                :key="item.name"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="评审名称">
            <el-select ref="select" v-model="formInline.review"  placeholder="请选择" style="width:300px;" value-key="name" @change="updateData" @visible-change="visibleChange" filterable clearable>
              <el-option
                v-for="item in reviewList"
                :key="item.name"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
<!--            <el-tooltip class="item" effect="dark" content="通知评审人审核用例" placement="top">-->
<!--              <el-button type="primary" @click="push" v-show="showType1==1" :loading="autoLoading">飞书推送通知</el-button>-->
<!--            </el-tooltip>-->
            <el-popover
              placement="top"
              width="160"
              v-model="visible">
              <p>通知评审人审核用例</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="push">确定</el-button>
              </div>
              <el-button slot="reference" type="primary" v-show="showType1==1" :loading="autoLoading">飞书推送通知</el-button>
            </el-popover>
          </el-form-item>

        </div>
      </el-form>
      <el-card class="box-card" v-show="showType==1">
        <div id="overview">
          <p class="p-style"><span> 概览 </span></p>
          <form class="el-form form-info">
            <div class="el-form-item">
              <label class="el-form-item__label">评审名称:</label>
              <div class="el-form-item__content"> {{title}} </div>
            </div>
            <div class="select-time el-row is-justify-space-between el-row--flex">
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">用例总数:</label>
                  <div class="el-form-item__content"> {{total}} </div>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">通过率:</label>
                  <div class="el-form-item__content"> {{passed}} </div>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">评审状态:</label>
                  <div class="el-form-item__content"> {{status}} </div>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div class="el-form-item">
                  <label class="el-form-item__label">评审人:</label>
                  <div class="el-form-item__content"> {{reviewer}} </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <!--详细数据-->
        <div>
          <p class="p-style"><span> 评审详情 </span></p>
          <el-table :data="result" style="width: 100%;">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="node_path" label="模块" sortable></el-table-column>
            <el-table-column prop="name" label="用例名称"></el-table-column>
            <el-table-column prop="description" label="评审记录">
              <template slot-scope="scope">
                <div v-html="scope.row.description"></div>
              </template>
            </el-table-column>
            <el-table-column prop="review_status" label="评审结果" width="100" align="center">
              <template slot-scope="scope">
                <div v-html="handleData(scope.row.review_status)"></div>
              </template>
            </el-table-column>
            <el-table-column prop="create_user" label="编写人" width="100"></el-table-column>
            <el-table-column prop="comment_user" label="评审人" width="140"></el-table-column>

          </el-table>
        </div>
      </el-card>

  </div>
</template>

<script>
  import { getProjectList,getReviewList,getReviewResult,getReviewData,batchSendMessage } from '@/api/testData'

  export default {
    data() {
      return {
        title: '',
        total: '',
        passed: '',
        status: '',
        reviewer: '',
        projectList: this.projectData(),
        reviewList: [],
        result: [],
        showType: 0,
        showType1: 0,
        autoLoading: false,
        pushUser: '',
        visible: false,
        formInline: {
          project: '',
          review: '',
        },
        loading: false,
      }
    },
    methods: {
      onSubmit() {
        this.showType1 = 0
        this.autoLoading = false
        const params = {
          'review': this.formInline.review.id,
          };
        getReviewResult(params).then((res) => {
          let {msg, data, users} = res;
          if (msg === 'success') {
              this.result = data
              const num = (this.total - data.length) / this.total * 100

              this.passed = num.toFixed(1) + '%'
              this.showType = 1
              if (this.result.length) {
                this.showType1 = 1
                this.pushUser = users
              }
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
      updateReview() {
        if (this.formInline.project) {
        const params = {
          'project': this.formInline.project,
          };
        getReviewList(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
              this.reviewList = data
              this.formInline.review = ''
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      } else {
          this.formInline.review = ''
          this.reviewList = []
        }},
      updateData(data){
        // console.log(data)
        if (data) {
          this.loading = true;
          this.showType = 0;
          const statusName = {
            'Prepare': '未开始',
            'Underway': '进行中',
            'Finished': '已结束',
            'Completed': '已完成',
            'Archived': '已归档'
          }
          this.title = data.name
          this.status = statusName[data.status]

          const params = {
            'review': data.id,
            };
          getReviewData(params).then((res) => {
            let {msg, data} = res;
            if (msg === 'success') {
              this.reviewer = data.reviewer
              this.total = data.total
              this.onSubmit()
              this.loading = false
            } else {
              this.$message.error({
                message: msg,
                center: true,
              })
            }
        })
        }
      },
      handleData(data) {
        const text = {
            'Pass': '<span style="background-color: #67c23a; color: #fff; padding: 3px 5px; border-radius: 30px">通过</span>',
            'Prepare': '<span style="background-color: #909399; color: #fff; padding: 3px 5px; border-radius: 30px">未评审</span>',
            'UnPass': '<span style="background-color: #f56c6c; color: #fff; padding: 3px 5px; border-radius: 30px">未通过</span>'
          }
        return text[data]
      },
      // 下拉框自动脱焦
      visibleChange(flag) {
        if (flag) {
          this.$refs.select.focus()
        } else {
          this.$refs.select.blur()
        }
      },
      push(){
        const params = {
          'usernames': this.pushUser,
          'content': '{"post":{"zh_cn":{"title":"用例评审通知","content":[[{"tag":"text","text":"用例已修改 :"},{"tag":"a","href":"http://qa.test.internal.taqu.cn:8081/#/track/review/view/'+this.formInline.review.id+'","text":"点击查看"}]]}}}',
          'msg_type': 'post'
        }
        this.visible = false
        this.autoLoading = true
        batchSendMessage(params).then((res) => {
          let {msg} = res;
          this.autoLoading = false
          if (msg === 'success') {
              this.$message.success({
                  message: '推送成功',
                  center: true,
              })
          } else {
              this.$message.error({
                  message: '接口异常：' + msg,
                  center: true,
              })
          }
      })
      }

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