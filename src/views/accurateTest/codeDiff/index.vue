<template>
  <div class="app-container"  v-loading="loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading">
    <aside>
      相同分支比对方法：分别选择系统，分支，并输入提测后的第一个commitID
      <br>
      不同分支比对方法：分别选择系统，两个不同分支即可
      <br>
      ps：数据为空时请检查输入内容是否正确
      <br>
      <pre style="margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit;">       处理中：正在获取数据</pre>
    </aside>
    <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <div>
        <el-form-item label="项目">
          <el-select v-model="formInline.project" filterable placeholder="项目" style="width:120px;" @change="changeProject">
            <el-option label="他趣&公共" value="tq">他趣&公共</el-option>
            <el-option label="海外" value="hw">海外</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="formInline.projectName" filterable placeholder="仓库" style="width:160px;" @change="projectChanged">
            <el-option v-for="item in projectNameList" :value="item" :key="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比对方式">
          <el-select v-model="formInline.type" placeholder="比对方式" style="width:120px;">
            <el-option label="相同分支" value="0">相同分支</el-option>
            <el-option label="不同分支" value="1">不同分支</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分支a" v-if="formInline.type === '1'">
          <el-select v-model="formInline.branchA" filterable placeholder="分支A" style="width:200px;">
            <el-option v-for="item in branchList" :value="item" :key="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分支b" v-if="formInline.type === '1'">
          <el-select v-model="formInline.branchB" filterable placeholder="分支B" style="width:200px;">
            <el-option v-for="item in branchList" :value="item" :key="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分支" v-if="formInline.type === '0'">
          <el-select v-model="formInline.branch" filterable placeholder="分支" style="width:200px;">
            <el-option v-for="item in branchList" :value="item" :key="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Commit" v-if="showCommitSelect">
          <el-input v-model="formInline.commitId">
            <el-button slot="append" @click="showCommitList">选择</el-button>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="authorCommitList" style="width: 100%">
      <el-table-column prop="author" label="提交者">
      </el-table-column>
      <el-table-column prop="commitCount" label="提交次数">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="download(scope.row)" type="text" size="small">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="选择commit" :visible.sync="dialogCommitVisible">
      <el-form inline>
        <el-form-item label="按日期筛选">
          <div class="block">
            <el-date-picker
              v-model="formInline.filter_date"
              type="datetimerange"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="getCommitList">过滤</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="commitList" v-loading="commitLoading">
        <el-table-column property="author" label="提交者" width="100"></el-table-column>
        <el-table-column property="date" label="日期" width="100"></el-table-column>
        <el-table-column property="content" label="内容" width="300"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="50">
          <template slot-scope="scope">
            <el-button @click="selectCommit(scope.row)" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px">
        <el-button @click="preCommitPage">上一页</el-button>
        <el-button @click="nextCommitPage">下一页</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {compareCode, getBranchList, getProjectNamelist, getCommitList} from '@/api/testTool'

export default {
  data() {
    return {
      result: [],
      showType: 0,
      dialogTableVisible: false,
      autoLoading: false,
      templateList: [],
      formInline: {
        project: "tq",
        type: "",
        projectName: '',
        branchA: '',
        branchB: '',
        branch: '',
        commitId: '',
        filter_date: '',
      },
      total_data: [],
      projectNameList: [],
      branchList: [],
      authorCommitList: [],
      commitList: [],
      commitPage: 0,
      loading: false,
      commitLoading: false,
      dialogCommitVisible: false
    }
  },
  watch: {
    'formInline.branch': {
      deep: true,
      handler: function (newVal, oldVal) {
        this.formInline.commitId = ''
      }
    }
  },
  computed: {
    showCommitSelect() {
      return this.formInline.type === '0' && this.formInline.branch !== ''
    }
  },
  methods: {
    projectChanged(value) {
      this.formInline.type = ''
      this.formInline.branch = ''
      this.formInline.branchA = ''
      this.formInline.branchB = ''
      this.formInline.commitId = ''
      this.authorCommitList = []
      this.commitList = []
      this.commitPage = 0
      this.loading = true;
      const params = {
        'project_name': value,
      };
      getBranchList(params).then((res) => {
        this.loading = false;
        this.branchList = res.data;
      })
    },
    getProjectNamelist() {
      getProjectNamelist().then((res) => {
        this.projectNameList = res.data[this.formInline.project];
        this.total_data = res.data
      })
    },
    changeProject() {
      this.projectNameList = this.total_data[this.formInline.project];
      this.formInline.projectName = ''
      this.formInline.type = ''
    },
    showCommitList() {
      this.dialogCommitVisible = true
      this.formInline.filter_date = ''
      this.commitPage = 0
      this.commitList = []
      this.getCommitList()
    },
    preCommitPage() {
      if(this.commitPage <= 0) {
        return
      }
      this.commitPage--
      this.getCommitList()
    },
    nextCommitPage() {
      this.commitPage++
      this.getCommitList()
    },
    getCommitList() {
      this.commitList = []
      this.commitLoading = true
      const params = {
        'project_name': this.formInline.projectName,
        'branch': this.formInline.branch,
        'offset': this.commitPage * 50,
        'filter_date': this.formInline.filter_date
      };
      getCommitList(params).then((res) => {
        this.commitList = res.data;
        this.commitLoading = false;
      })
    },
    selectCommit(item) {
      this.dialogCommitVisible = false
      this.formInline.commitId = item.commitId
    },
    compareSame() {
      this.authorCommitList = []
      this.loading = true;
      const params = {
        'type': "1",
        'project_name': this.formInline.projectName,
        'branch': this.formInline.branch,
        'commit_id': this.formInline.commitId,
      };
      compareCode(params).then((res) => {
        this.loading = false;
        this.authorCommitList = res.data;
      })
    },
    compareDiff() {
      this.authorCommitList = []
      this.loading = true;
      const params = {
        'type': "2",
        'project_name': this.formInline.projectName,
        'a_branch': this.formInline.branchA,
        'b_branch': this.formInline.branchB,
      };
      compareCode(params).then((res) => {
        this.loading = false;
        this.authorCommitList = res.data;
      })
    },
    onSubmit() {
      if (this.formInline.type === '0') {
        this.compareSame()
      } else {
        this.compareDiff()
      }
    },
    download(item) {
      var text = "";
      for (let index in item.commitList) {
        text = text + item.commitList[index] + "\n\n";
      }
      let urlObject = window.URL || window.webkitURL || window;
      let exportBlob = new Blob([text]);
      let saveLink = document.createElement("a")
      saveLink.href = urlObject.createObjectURL(exportBlob);
      saveLink.download = item.author;
      if (document.createEvent) {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        saveLink.dispatchEvent(event);
      } else {
        saveLink.click();
      }
    }
  },
  created() {
    this.getProjectNamelist()
  }
}
</script>
<style>
  .commit_info {
    margin: 0 0 1em;
  }
  .commit_author {
    padding: 1em;
    border: #DDDDDD solid 1px;
  }
  .commit_content {
    font-size: 0.9em;
    background-color: #DDDDDD;
    padding: 1em;
    margin: 0;
  }
</style>