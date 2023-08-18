<template>
  <div class="app-container"  v-loading="loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading">
    <aside>
      <div>
        <h4 style="color: #00c4ff;line-height: 0px">1.日志信息为{key:value}，过滤字段写法：例如：facilitateType;accountUuid;matchAccountArray</h4>
          <p style="color: #00c4ff" >i.如果是多层级数据取值过滤字段写法：<br/>&nbsp;&nbsp;&nbsp;&nbsp;数组：['matchAccountArray'][0]['accountUuid'];['matchAccountArray'][*]['accountUuid']<br/>对象： ['matchAccount']['accountUuid']</p>
<!--          <p style="color: #00c4ff">ii.二者可以一起使用：<br/>&nbsp;&nbsp;&nbsp;&nbsp;例如：facilitateType;accountUuid;['matchAccountArray'][0]['accountUuid']</p>-->
        <h4 style="color: #00c4ff;line-height: 0px">2.日志信息为[{key:value},{key:value}]，遍历数据过滤字段写法：例如：[*]['id'];[*]['script_mode_message_count'];[*]['uuid']</h4>
        <p style="color: #ff5100;line-height: 0px">PS：以上两种日志数据必须为json格式，[*]代表遍历数组内所有数据</p>
        <h4 style="color: #00c4ff;line-height: 0px">3.日志信息为文本：【配配系统牵线】发送匹配成功数据到tqmq,delayTime:59,params:，匹配字段写法：例如：(delayTime)</h4>

      </div>
    </aside>
      <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
        <template>
        <el-radio-group v-model="formInline.queryGrammar">
          <el-radio v-model="formInline.queryGrammar" label="1">基本查询</el-radio>
          <el-radio v-model="formInline.queryGrammar" label="3">自定义查询</el-radio>
        </el-radio-group>
        </template>
          <br>
        </div>
        <div v-if="this.formInline.queryGrammar === '1'" style="margin-top:12px;">
          <el-form-item label="环境">
            <el-select v-model="formInline.envList" multiple placeholder="请选择" style="width:100px;" @change="mutexProcess">
              <el-option label="全部" value="-1">全部</el-option>
              <el-option label="线上" value="0">线上</el-option>
              <el-option label="灰度" value="1">灰度</el-option>
              <el-option label="自动化" value="2">自动化</el-option>
              <el-option label="测试" value="3">测试</el-option>
              <el-option label="测试1" value="4">测试1</el-option>
              <el-option label="测试2" value="5">测试2</el-option>
              <el-option label="测试3" value="6">测试3</el-option>
              <el-option label="测试4" value="7">测试4</el-option>
              <el-option label="测试5" value="8">测试5</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-select v-model="formInline.projectName" placeholder="项目" style="width:100px;">
              <el-option label="他趣" value="taqu">他趣</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日志库">
            <el-select v-model="formInline.logstoreName" placeholder="日志库" style="width:120px;">
              <el-option label="service_logdb" value="service_logdb">service_logdb</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统名称">
            <el-input v-model="formInline.system" clearable></el-input>
          </el-form-item>
          <el-form-item label="日志级别">
            <el-select v-model="formInline.level" placeholder="日志级别" style="width:100px;">
              <el-option label="全部" value="">全部</el-option>
              <el-option label="info" value="info">info</el-option>
              <el-option label="notice" value="notice">notice</el-option>
              <el-option label="warning" value="warning">warning</el-option>
              <el-option label="error" value="error">error</el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="client_uri" prop="clientUri">
            <el-input class="textarea" auto-complete="on" name="clientUri" v-model="formInline.clientUri" style="width: 260px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="uri" prop="uri">
            <el-input class="textarea" auto-complete="on" name="uri" v-model="formInline.uri" style="width: 240px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="appcode" prop="appcode">
            <el-input v-model="formInline.appcode" auto-complete="on" name="appcode" style="width: 140px;" class="textarea" clearable></el-input>
          </el-form-item>
          <el-form-item label="cloned" prop="cloned">
            <el-input class="textarea" auto-complete="on" name="cloned" v-model="formInline.cloned" style="width: 140px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="tracerId" prop="tracerId">
            <el-input class="textarea" auto-complete="on" name="tracerId" v-model="formInline.tracerId" style="width: 300px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="设备号" prop="deviceToken">
            <el-input class="textarea" auto-complete="on" name="deviceToken" v-model="formInline.deviceToken" style="width: 300px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="日志来源" prop="origin">
            <el-select v-model="formInline.origin" style="width:120px;"  class="selectarea">
              <el-option label="全部" value="">全部</el-option>
              <el-option label="rest" value="rest">rest</el-option>
              <el-option label="cli" value="cli">cli</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间(默认最近1小时)" >
            <template>
              <div class="block">
                <el-date-picker class="selectarea"
                  v-model="formInline.fromTime" style="width:220px"
                  :picker-options="pickerOptionsStart"
                  type="datetime"
                  clearable
                  placeholder="选择日期"
                  value-format="timestamp">
                </el-date-picker>
              </div>
            </template>
          </el-form-item>
          <el-form-item style="margin-left:-6px" label="至">
            <template>
              <div class="block" style="margin-left: -6px" >
                <el-date-picker class="selectarea"
                  v-model="formInline.toTime"
                  type="datetime" style="width:220px"
                  clearable
                  placeholder="选择日期"
                  value-format="timestamp">
                </el-date-picker>
              </div>
            </template>
          </el-form-item>
          <el-form-item label="日志内容" prop="message">
            <el-input class="textarea"  auto-complete="on" name="message" v-model="formInline.message" style="width: 400px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="过滤字段" prop="filter">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <span slot="content"><span v-html="infoMsg"></span></span>
              <span class="el-icon-question" style="color: #409eff;margin-left:-10px "></span>
            </el-tooltip>
            <el-input class="textarea" placeholder="多个字段请用英文;间隔" auto-complete="on" name="filter" v-model="formInline.filter" style="width: 600px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="页数" prop="page">
            <el-input class="textarea" placeholder="一页40条数据" oninput="value=value.replace(/[^\d]/g,'')" auto-complete="on" name="page" v-model="formInline.page" style="width: 140px;" clearable></el-input>
          </el-form-item>
          <el-form-item>
          <template>
            <!-- `last` 为 true 或 false -->
            <el-checkbox v-model="formInline.last" border>只导出最新一条</el-checkbox>
          </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
        <div v-if="this.formInline.queryGrammar === '3'" style="margin-top:12px;">
          <el-form-item label="环境">
            <el-select v-model="formInline.envList" multiple placeholder="请选择" style="width:100px;" @change="mutexProcess">
              <el-option label="全部" value="-1">全部</el-option>
              <el-option label="线上" value="0">线上</el-option>
              <el-option label="灰度" value="1">灰度</el-option>
              <el-option label="自动化" value="2">自动化</el-option>
              <el-option label="测试" value="3">测试</el-option>
              <el-option label="测试1" value="4">测试1</el-option>
              <el-option label="测试2" value="5">测试2</el-option>
              <el-option label="测试3" value="6">测试3</el-option>
              <el-option label="测试4" value="7">测试4</el-option>
              <el-option label="测试5" value="8">测试5</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-select v-model="formInline.projectName" placeholder="项目" style="width:100px;">
              <el-option label="他趣" value="taqu">他趣</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日志库">
            <el-select v-model="formInline.logstoreName" placeholder="日志库" style="width:120px;">
              <el-option label="service_logdb" value="service_logdb">service_logdb</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间(默认最近1小时)" >
            <template>
              <div class="block">
                <el-date-picker class="selectarea"
                  v-model="formInline.fromTime" style="width:220px"
                  :picker-options="pickerOptionsStart"
                  type="datetime"
                  clearable
                  placeholder="选择日期"
                  value-format="timestamp">
                </el-date-picker>
              </div>
            </template>
          </el-form-item>
          <el-form-item style="margin-left:-6px" label="至">
            <template>
              <div class="block" style="margin-left: -6px" >
                <el-date-picker class="selectarea"
                  v-model="formInline.toTime"
                  type="datetime" style="width:220px"
                  clearable
                  placeholder="选择日期"
                  value-format="timestamp">
                </el-date-picker>
              </div>
            </template>
          </el-form-item>
          <el-form-item label="查询条件" prop="query">
            <el-input v-model="formInline.query" class="textarea" name="query" auto-complete="on" clearable style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item label="过滤字段" prop="filter">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <span slot="content"><span v-html="infoMsg"></span></span>
              <span class="el-icon-question" style="color: #409eff;margin-left:-10px "></span>
            </el-tooltip>
            <el-input class="textarea" placeholder="多个字段请用英文;间隔" auto-complete="on" name="filter" v-model="formInline.filter" style="width: 600px;" clearable></el-input>
          </el-form-item>
          <el-form-item label="页数" prop="page">
            <el-input class="textarea" placeholder="一页40条数据" oninput="value=value.replace(/[^\d]/g,'')" auto-complete="on" name="page" v-model="formInline.page" style="width: 140px;" clearable></el-input>
          </el-form-item>
          <el-form-item>
          <template>
            <!-- `last` 为 true 或 false -->
            <el-checkbox v-model="formInline.last" border>只导出最新一条</el-checkbox>
          </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-link href="" type="success" id="downloadFile" style="font-size: 18px">{{result}}</el-link>
      <el-table :data="logData" style="width: 100%;" v-show="showType==1" border >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="datetime" label="时间" width="180"></el-table-column>
        <el-table-column prop="uri" label="uri" width="180">
          <template slot-scope="scope">
                <div v-html="scope.row.uri"></div>
            </template>
        </el-table-column>
        <el-table-column prop="device" label="设备信息">
          <template slot-scope="scope">
                <div v-html="scope.row.device"></div>
            </template>
        </el-table-column>
        <el-table-column prop="other" label="其他内容">
          <template slot-scope="scope">
                <div v-html="scope.row.other"></div>
            </template>
        </el-table-column>
        <el-table-column prop="content" label="日志内容">
          <template slot-scope="scope">
                <div v-html="scope.row.content"></div>
            </template>
        </el-table-column>
        <el-table-column prop="more" label="操作" width="100" align="center">
          <template slot-scope="scope">

            <el-row>
              <el-col>
                <div>
                  <el-link :underline="false" type="primary" @click="onMore(scope.row)" >查看更多</el-link>
                </div>
              </el-col>
            </el-row>
          </template>

        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisible">
        <div style="overflow:auto;max-height:600px;white-space:pre-wrap" v-html="moreMsg.more">{{moreMsg.more}}</div>
      </el-dialog>
  </div>
</template>

<script>
  import { filterLog } from '@/api/testTool'

  export default {
    data() {
      return {
        result: '',
        showType: 0,
        logData: [],
        infoMsg: '填写过滤字段，查询后可导出Excel',
        dialogVisible: false,
        moreMsg: '',
        formInline: {
          envList: ['-1'],
          queryGrammar: '1',
          projectName: 'taqu',
          logstoreName: 'service_logdb',
          system: '',
          level: '',
          clientUri: '',
          uri: '',
          appcode: '',
          cloned: '',
          tracerId: '',
          origin: '',
          deviceToken: '',
          message: '',
          query: '',
          fromTime: '',
          toTime: '',
          filter: '',
          page: '',
          last: false
        },
        loading: false,
        pickerOptionsStart: {
          disabledDate: (time) => {
            return time.getTime() > new Date() * 1 + 600 * 1000
          }
        }
      }
    },
    methods: {
      onSubmit() {
        const params = {
          'message': this.formInline.message,
          'projectName': this.formInline.projectName,
          'logstoreName': this.formInline.logstoreName,
          'system': this.formInline.system,
          'uri': this.formInline.uri,
          'level': this.formInline.level,
          'deviceToken': this.formInline.deviceToken,
          'query': this.formInline.query,
          'tracerId': this.formInline.tracerId,
          'clientUri': this.formInline.clientUri,
          'fromTime': parseInt(this.formInline.fromTime),
          'toTime': parseInt(this.formInline.toTime),
          'appcode': this.formInline.appcode,
          'cloned': this.formInline.cloned,
          'queryGrammar': this.formInline.queryGrammar,
          'envList': this.formInline.envList,
          'origin': this.formInline.origin,
          'filter': this.formInline.filter,
          'page': this.handlePage(this.formInline.page),
          'last': this.formInline.last
          };
        this.result = ''
        this.showType = 0
        this.loading = true
        console.log(params);
        filterLog(params).then((res) => {
          let {msg, data, log} = res;
          this.loading = false;
          if (msg === 'success') {
              if (data) {
                this.result = '点此导出过滤数据'
                let v = document.getElementById("downloadFile")
                v.href = '/api/downloadFile?filename=' + data
              }

          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
          this.showType = 1
          this.logData = log
      })
      },
      // 互斥处理，点击全部则去除其他选项，选择其他选项则去除全部
      mutexProcess (value) {
      if (value.length > 1 && value[value.length - 1] === '-1') {
        this.$set(this.formInline, 'envList', ['-1'])
      }
      if (value.length === 2 && value[0] === '-1') {
        this.$set(this.formInline, 'envList', value.slice(1))
      }
    },
      handlePage (page) {
        if (page == '') {
          return 1
        } else {
          return parseInt(page)
        }
      },
      onMore (row) {
        this.moreMsg = row
        this.dialogVisible = true
      },
    }
  }
</script>
<style>


</style>
