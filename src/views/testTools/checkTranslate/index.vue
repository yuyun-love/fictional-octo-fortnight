<template >

    <div class="app-container"  v-loading="loading" element-loading-text="翻译检测中" element-loading-spinner="el-icon-loading">
        <aside>
          <div>
            <p style="line-height: 5px">说明：将要对比的翻译文本复制到Excel模板里面，上传即可(android或iOS包含h5翻译的话需要☑️)</p>
            <p style="color:#ff4800; line-height: 8px">tips ：结果差异标记(上方Excel翻译，下方仓库翻译)-黄色代表变更；红色代表删除；绿色代表新增</p>
            <el-link href="/api/downloadFile?filename=翻译模板.xlsx" type="primary" style="line-height: 0px" :underline="false">Excel模板下载</el-link>
          </div>
        </aside>
        <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-upload
                            class="upload-demo"
                            drag
                            ref="upload"
                            action=""
                            :http-request="check"
                            :auto-upload="false"
                            multiple
                            :limit="1"
                            :on-exceed="checkFile">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> <br/>只能上传xlsx文件</div>
                        <div class="el-upload__tip" slot="tip"></div>
                    </el-upload>
                </div>
            </el-col>
        </el-row>

        <div>
          <el-form inline>
            <el-form-item label="仓库">
        <el-select v-model="platform" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
              </el-form-item>
            <el-form-item>
        <el-tooltip class="item" effect="dark" content="android或iOS包含h5翻译需要勾选，检测时间会长一点" placement="top">
            <el-checkbox v-model="h5" border style="left: 5px">包含h5翻译</el-checkbox>
        </el-tooltip>
              </el-form-item>
            <el-form-item>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="checkStart">检测翻译</el-button>
              </el-form-item>
          </el-form>
        </div>
        <div>
        <el-form inline>
            <el-form-item label="Android分支" v-show="platform=='Android'">
              <el-select v-model="branch_android"  placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in androidBranchList"
                  :key="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="iOS分支" v-show="platform=='iOS'">
              <el-select v-model="branch_ios"  placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in iosBranchList"
                  :key="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="server分支" v-show="platform !='h5'">
              <el-select v-model="branch_server"  placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in serverBranchList"
                  :key="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="h5分支" v-show="platform !='server'">
              <el-select v-model="branch_h5"  placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in h5BranchList"
                  :key="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        </div>

        <el-table
            v-show="showType==1"
            :data="result"
            border
            style="width: 100%; color: black; font-size: 15px">
            <el-table-column
                type="index"
                label="序号"
                align='center'
                width="50">
            </el-table-column>
            //遍历表头 key的值对应其数据的字段名
            <el-table-column
              v-for="item in header" :key="item.key"
              :prop="item.key"
              align='center'
              sortable
              :label="item.key">
              <template slot-scope="scope">
                <div v-html="scope.row[item.key]"></div>
              </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import { checkTranslate,getBranches } from '@/api/testTool'

    export default {
        name: 'CountQuality',
        data() {
            return {
                result: [],
                header: [],
                branch_android: '',
                branch_ios: '',
                branch_h5: '',
                branch_server: '',
                androidBranchList: [],
                iosBranchList: [],
                h5BranchList: [],
                serverBranchList: [],
                showType: 0,
                options: [{
                    value: 'Android',
                    label: 'Android'
                },
                  {
                    value: 'iOS',
                    label: 'iOS'
                },
                  {
                    value: 'h5',
                    label: 'h5'
                },
                  {
                    value: 'server',
                    label: 'server'
                }
                ],
                platform: 'Android',
                h5: '',
                loading: false
            }
        },
        methods: {
            check(params) {
                var FileExt = params.file.name.split('.')[1]
                var file_type = ['xlsx'].indexOf(FileExt) === -1
                //拿到上传的文件的格式，限制上传的文件格式
                if (file_type) {
                    this.$message({
                        type: 'warning',
                        message: '请上传后缀名为xlsx的文件'
                    })
                    return
                }
                const isLt10M = params.file.size / 1024 / 1024 < 10
                //限制上传的文件大小
                if (!isLt10M) {
                    this.$message.warning('上传的文件大小不能超过10MB')
                    return
                }
                var formdata = new FormData()
                formdata.append('file', params.file)
                formdata.append('platform', this.platform)
                formdata.append('h5', this.h5)
                if (this.branch_android) {
                    formdata.append('branch_android', this.branch_android)
                }
                if (this.branch_ios) {
                    formdata.append('branch_ios', this.branch_ios)
                }
                if (this.branch_h5) {
                    formdata.append('branch_h5', this.branch_h5)
                }
                if (this.branch_server) {
                    formdata.append('branch_server', this.branch_server)
                }
                this.showType = 0
                this.loading = true
                checkTranslate(formdata).then((res) => {
                    let {msg, data, header} = res;
                    this.loading = false;
                    if (msg === 'success') {
                        this.result = data
                        this.header = header
                        this.showType = 1
                        // var v = document.getElementById("downloadFile")
                        // v.href = '/api/downloadFile?filename=' + data
                    } else {
                        this.$message.error({
                            message: '接口异常：' + msg,
                            center: true,
                        })
                    }
                })
            },
            checkStart() {
                this.$refs.upload.submit()
            },
            checkFile() {
                this.$message.warning('只能上传一个文件！')
            },
            updateBranches() {
              getBranches().then((res) => {
                    let {msg, data} = res;
                    if (msg === 'success') {
                        this.androidBranchList = data['android_branches']
                        this.iosBranchList = data['ios_branches']
                        this.h5BranchList = data['h5_branches']
                        this.serverBranchList = data['server_branches']
                    } else {
                        this.$message.error({
                            message: '接口异常：' + msg,
                            center: true,
                        })
                    }
                })
            }
        },
        created() {
            this.updateBranches()
        }

    }

</script>
<style type="text/css">
        table.diff {font-size:16px}
        .diff_header {background-color:#e0e0e0}
        td.diff_header {text-align:center}
        .diff_next {background-color:#c0c0c0}
        .diff_add {background-color:#aaffaa}
        .diff_chg {background-color:#ffff77}
        .diff_sub {background-color:#ffaaaa}
        .el-table td, .el-table th {padding: 0px;}
</style>
