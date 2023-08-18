<template>
  <div class="app-container">
    <aside>
      推广数据diff：针对调用巨量openapi直接存储入库的场景
    </aside>
      <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
      <el-form :inline="true" class="demo-form-inline" ref="formdata" :model="formdata" :rules="rules">
        <div>
          <el-form-item label="场景" prop="type" :rules="rules.type">
            <el-select v-model="formdata.type" placeholder="请选择" @change="scene_to_table">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表名" prop="table" :rules="rules.table">
            <el-input v-model="formdata.table" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="Access_Token" prop="access_token">
            <el-input v-model="formdata.access_token" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="账户ID" prop="advertiser_id">
            <el-input v-model="formdata.advertiser_id" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item v-show="show" label="Asset_ID" prop="asset_id">
            <el-input v-model="formdata.asset_id" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="tgDataDiff">数据diff</el-button>
          </el-form-item>
        </div>
      </el-form>

    <h3 style="height: 10px">数据diff</h3>
    <div v-loading="loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading">
      <el-form :inline="true" class="demo-form-inline" label-position="top" label-width="80px" style="height: 50px">
        <el-form-item label="db diff数据" label-position=“top” style="width: 490px;">
        </el-form-item>
        <el-form-item label="巨量api resp diff数据">
        </el-form-item>
      </el-form>
      <div class="compare" style="width: 1000px">
        <CodeDiff class="center"
                  :old-string="db_diff_result"
                  :new-string="api_diff_result"
                  :drawFileList="false"
                  :context="10000"
                  :renderNothingWhenEmpty="false"
                  :isShowNoChange="false"
                  outputFormat="side-by-side" />
      </div>

      <h3>源数据</h3>
      <el-form :inline="true" class="demo-form-inline" label-position="top" label-width="80px">
        <el-form-item label="db源数据" label-position=“top”>
          <div class="compare" style="width: 495px">
            <json-viewer
                :value="this.db_source"
                :expand-depth="100"
                boxed
                sort
            ></json-viewer>
          </div>
        </el-form-item>
        <el-form-item label="巨量api resp源数据">
          <div class="compare" style="width: 495px">
            <json-viewer
                :value="this.api_source"
                :expand-depth="100"
                boxed
                sort
            ></json-viewer>
          </div>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { tgDataDiff } from '@/api/testTool'
// eslint-disable-next-line no-unused-vars
import CodeDiff from 'vue-code-diff'
import JSONViewer from "vue-json-viewer";

  export default {
    // eslint-disable-next-line vue/no-unused-components,no-undef
    components: { CodeDiff , JSONViewer},
    data() {
      return {
        show: false,
        loading: false,
        params: {
          type: 0,
          access_token: "",
          table: "",
          advertiser_id: "",
          asset_id: ""
        },
        formdata: {
          type: '',
          access_token: '',
          table: '',
          advertiser_id: '',
          asset_id: ""
        },
        rules:
            {
              type: [{required: true, message: '请选择场景', trigger: 'blur'}],
              access_token: [{required: true, message: '请输入access_token', trigger: 'blur'}],
              table: [{required: true, message: '请输入表名', trigger: 'blur'}],
              advertiser_id: [{required: true, message: '请输入账户ID', trigger: 'blur'}]
            },
        options: [{
          value: 1,
          label: '定向包'
        }, {
          value: 2,
          label: '资产列表'
        }, {
          value: 3,
          label: '事件列表'
        }, {
          value: 4,
          label: '头条应用'
        }, {
          value: 5,
          label: '抖音账号'
        }],
        diff_result: {
          diff_db_result: [],
          diff_api_result: [],
          db_result: [],
          api_resp: []
        },
        db_diff_result: "[]",
        api_diff_result: "[]",
        api_diff_result1: [],
        db_source: {},
        api_source: {}
      }
    },
    methods: {
      scene_to_table() {
        this.show = false
        if(this.formdata.type === 1){
          this.formdata.table = "sa_tt_audience_package"
        }
        if(this.formdata.type === 2){
          this.formdata.table = "sa_tt_event_asset"
        }
        if(this.formdata.type === 3){
          this.formdata.table = "sa_tt_event_config"
          this.show = true
        }
        if(this.formdata.type === 4){
          this.formdata.table = "sa_tt_app"
        }
        if(this.formdata.type === 5){
          this.formdata.table = "sa_tt_aweme_account"
        }
      },
      object_to_array(arr,obj) {
        arr.length = 0
        for (var i in obj) {
          arr.push(obj[i]);
        }
      },
      tgDataDiff() {
        this.$refs["formdata"].validate((valid) => {
          // 保存前验证处理
          if (valid) {
            this.db_diff_result = "[]"
            this.api_diff_result = "[]"
            this.api_diff_result1 = []
            this.db_source = {}
            this.api_source = {}
            this.params.type = this.formdata.type
            this.params.table = this.formdata.table
            this.params.access_token = this.formdata.access_token
            this.params.advertiser_id = this.formdata.advertiser_id
            this.params.asset_id = this.formdata.asset_id
            this.loading = true
            tgDataDiff(this.params).then((resp) => {
              this.loading = false
              let {msg, code} = resp
              if (code === 20000 && msg === 'success' && typeof resp.data === "object") {
                this.diff_result = resp.data
                this.db_diff_result = JSON.stringify(this.diff_result.diff_db_result, null, '\t')
                this.object_to_array(this.api_diff_result1, this.diff_result.diff_api_result)
                this.api_diff_result = JSON.stringify(this.api_diff_result1, null, '\t')
                this.db_source = this.diff_result.db_result
                this.api_source = this.diff_result.api_resp
              } else if (msg !== 'success') {
                this.$message.error({
                  message: msg,
                  center: true,
                })
              } else {
                msg = resp.data
                this.$message.error({
                  message: msg,
                  center: true,
                })
              }
            })
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
.center {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  // overflow-x: auto;
}
/* 样式穿透-起始行左右对齐，*/
.center>>>.d2h-code-side-line{
  height:15px;
}
.center>>>code.hljs{
  padding: 0;
}
.box-card{
  width: 600px;
}

.file_board {
  width: 100%;
  height: 500px;
  display: flex;
  margin-top: 10px;
}

.file_list {
  height: 500px;
  width: 30%;
}

.diff_list {
  height: 500px;
  width: 70%;
  overflow-y: scroll;
}


</style>