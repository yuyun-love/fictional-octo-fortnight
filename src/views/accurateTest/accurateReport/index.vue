<template>
    <div class="app-container">
        <div>
            <el-row>
                <!--            <ProjectOption v-model="projectname" @change="testchange"/>-->
                <label class="radio-label">项目: </label>
                <el-select v-model="projectname" style="width:110px;" @change="projectchange">
                    <el-option label="风控" value="fengkong">风控</el-option>
                    <el-option label="海外" value="hw">海外</el-option>
                </el-select>
                <label class="radio-label" v-show="vShowSystem1==1">区域: </label>
                <el-select v-model="region" style="width:110px;" @change="regionchange" v-show="vShowSystem1==1">
                    <el-option label="国内" value="home">国内</el-option>
                    <el-option label="海外" value="overseas">海外</el-option>
                </el-select>
                <label class="radio-label" v-show="vShowSystem==1">系统: </label>
                <el-select v-model="system" style="width:110px;" @change="systemchange" v-show="vShowSystem1==1">
                    <el-option
                            v-for="item in systemList"
                            :key="item"
                            :label="item"
                            :value="item"
                    />
                </el-select>
                <label class="radio-label" v-show="vShowEnv==1">环境: </label>
                <el-select v-model="envname" style="width:110px;" @change="envchange" v-show="vShowEnv1==1">
                    <el-option label="测试1" value="test1">测试1</el-option>
                    <el-option label="测试2" value="test2">测试2</el-option>
                    <el-option label="测试3" value="test3">测试3</el-option>
                </el-select>
                <label class="radio-label">类型: </label>
                <el-select v-model="accurateType" style="width:110px;" @change="typechange">
                    <el-option label="全量" value="all">全量</el-option>
                    <el-option label="增量" value="add">增量</el-option>
                </el-select>

                <label class="radio-label">时间: </label>
                <el-date-picker
                        v-model="timeValue"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>

            </el-row>
            <el-row v-show="accurateType=='add' && projectname!='hw'">
                <label class="radio-label">baseVersion: </label>
                <el-input v-model="gitBranch1" style="width:300px;height:70px"></el-input>
                <label class="radio-label">nowVersion: </label>
                <el-input v-model="gitBranch2" style="width:300px;height:70px"></el-input>
            </el-row>
            <el-row v-show="accurateType=='add' && projectname=='hw'">
                <el-collapse v-model="activeNames">
                    <el-collapse-item>
                        <template slot="title">点击展开填写git仓库的提交id<i class="header-icon el-icon-info"></i>
                        </template>
                        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px"
                                 class="demo-dynamic">
                            <el-form-item
                                    v-for="(domain, index) in dynamicValidateForm.domains"
                                    :label="domain.system"
                                    :key="domain.key"
                                    :prop="'domains.' + index + '.value'"
                                    :inline="true">
                                <el-col :span="6.5">
                                    <el-input v-model="domain.baseVersion" id="input2">
                                        <template slot="prepend">baseVersion</template>
                                    </el-input>
                                </el-col>
                                <el-col :span="6.5">
                                    <el-input v-model="domain.nowVersion" id="input3">
                                        <template slot="prepend">nowVersion</template>
                                    </el-input>
                                </el-col>
                            </el-form-item>
                        </el-form>
                    </el-collapse-item>
                </el-collapse>

            </el-row>
            <el-row>
                <!--                <el-button type="primary" style="margin:0 0 20px 20px;" :loading="autoLoading"-->
                <!--                           @click="generateAccurateReport">-->
                <!--                    生成覆盖率数据文件-->
                <!--                </el-button>-->
                <template>
                    <el-popconfirm
                            confirm-button-text='确定生成'
                            cancel-button-text='取消'
                            icon="el-icon-info"
                            icon-color="red"
                            title="如果没有新的测试数据，请不要重复生成覆盖率数据文件"
                            @onConfirm='generateAccurateReport'
                    >
                        <el-button slot="reference" type="primary" :loading="autoLoading">生成覆盖率数据文件</el-button>
                    </el-popconfirm>
                </template>
                <el-button type="primary" style="margin:0 0 20px 20px;" :loading="autoLoading1"
                           @click="viewReport">
                    生成报告到报告列表
                </el-button>
            </el-row>
        </div>


        <el-tabs v-model="activeName">
            <el-tab-pane label="覆盖率数据文件" name="first">
                <el-table
                        :data="execTableData"
                        style="width: 100%">
                    <el-table-column
                            prop="project"
                            label="项目"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="system"
                            label="系统"
                            width="180" v-show="vShowSystem==1">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.system}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="env"
                            label="环境"
                            width="180" v-show="vShowEnv==1">
                    </el-table-column>
                    <el-table-column
                            prop="ossKey"
                            label="ossKey"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="创建人"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建时间">
                    </el-table-column>
                </el-table>
                <!--                </el-col>-->
            </el-tab-pane>
            <el-tab-pane label="报告列表" name="second">
                <el-table
                        :data="reportTableDataHw"
                        style="width: 100%"
                        v-show="projectname=='hw'">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item
                                        v-for="(value, key) in props.row"
                                        :label="key+'-'+hwSystemList[key]"
                                        v-show="key!='username' && key!='env' && key!='createTime'"
                                >
                                    <el-button
                                            v-for="item in value"
                                            size="mini"
                                            :type="item.includes('provider') ? 'success': 'primary'"
                                            @click="openReportHtml(item,key)">{{item.includes('provider') ?
                                        'Provider': 'Api'}}
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="报告生成时间"
                            prop="createTime">
                    </el-table-column>
                    <el-table-column
                            label="创建用户"
                            prop="username">
                    </el-table-column>
                </el-table>
                <el-table
                        :data="reportTableDataFk"
                        style="width: 100%"
                        v-show="projectname=='fengkong'">
                    <el-table-column
                            label="系统"
                            prop="system"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="报告生成时间"
                            prop="createTime"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            label="创建用户"
                            prop="username"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="300">
                        <template slot-scope="scope">
                            <el-button @click="openReportHtml(scope.row.ossKey,scope.row.system)" type="primary">查看报告
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
    import {
        generateAccurateReports,
        viewAccurateReports,
        viewAddReports,
        getExecLists,
        getReportLists,
        openReport
    } from '@/api/testTool'
    import {getUserName} from '@/utils/auth'

    export default {
        name: 'AutoCreateRole',
        data() {
            return {
                reportTableDataHw: [],
                reportTableDataFk: [],
                activeNames: ['1'],
                hwSystemList: this.GLOBAL.hwSystemList,
                projectname: 'fengkong',
                activeName: 'first',
                accurateType: 'all',
                system: 'j62',
                systemList: ["j61", "j62", "j63", "j64", "j80", "j81", "j95", "risk-safe-center"],
                homeSystemList: ["j61", "j62", "j63", "j64", "j80", "j81", "j95", "risk-safe-center"],
                abroadSystemList: ['j61', 'j62', 'j63', 'j80', 'j81', 'risk-safe-center'],
                envOptions: this.GLOBAL.envList,
                vShowType: 0,
                env: '测试1',
                vShowEnv: 0,
                vShowEnv1: 0,
                vShowSystem: 1,
                vShowSystem1: 1,
                autoLoading: false,
                autoLoading1: false,
                timeValue: '',
                envname: 'test1',
                region: 'home',
                gitUrl: '',
                gitBranch1: '',
                gitBranch2: '',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                execTableData: [],
                hwTableData: [],
                dynamicValidateForm: {
                    domains: []
                }

            }
        },

        methods: {
            generateAccurateReport() {
                const params = {
                    'project': this.projectname,
                    'system': this.system,
                    'env': this.envname,
                    'region': this.region,
                    'username': getUserName(),
                };
                this.autoLoading = true
                generateAccurateReports(params).then(response => {
                    this.autoLoading = false
                    let {msg, code} = response;
                    if (code == '20000' && msg == 'success') {
                        this.vShowType = 1
                        this.$message({
                            message: '生成exec文件成功',
                            type: 'success'
                        });
                        this.getExecList()
                    } else {
                        this.getExecList()
                        this.$message.error({
                            message: msg,
                            center: true,
                        })

                    }
                })
            },
            sleep(numberMillis) {
                var now = new Date();
                var exitTime = now.getTime() + numberMillis;
                while (true) {
                    now = new Date();
                    if (now.getTime() > exitTime)
                        return;
                }
            },
            viewReport() {
                if (this.timeValue.length < 1) {
                    this.$message.error({
                        message: '时间为必填',
                        center: true,
                    })
                } else {
                    if (this.accurateType == 'all') {
                        const params = {
                            'project': this.projectname,
                            'system': this.system,
                            'time': this.timeValue,
                            'region': this.region,
                            'env': this.envname,
                            'username': getUserName(),
                        };
                        this.autoLoading1 = true
                        viewAccurateReports(params).then(response => {
                            this.autoLoading1 = false
                            let {msg, code, data} = response;
                            if (code == '20000' && msg == 'success') {
                                this.vShowType = 1
                                this.$message({
                                    message: '获取报告成功',
                                    type: 'success'
                                });
                                this.getReportList()
                            } else {
                                this.$message.error({
                                    message: msg,
                                    center: true,
                                })
                            }

                        })
                    } else {
                        if (this.projectname == 'fengkong' && (this.gitBranch1 == '' || this.gitBranch2 == '')) {
                            this.$message.error({
                                message: 'git分支为必填',
                                center: true,
                            })
                        } else {
                            const params = {
                                'project': this.projectname,
                                'system': this.system,
                                'time': this.timeValue,
                                'region': this.region,
                                'gitBranch1': this.gitBranch1,
                                'gitBranch2': this.gitBranch2,
                                'env': this.envname,
                                'username': getUserName(),
                                'hwGitList': JSON.stringify(this.dynamicValidateForm.domains)
                            };
                            this.autoLoading1 = true
                            viewAddReports(params).then(response => {
                                this.autoLoading1 = false
                                let {msg, code, data} = response;
                                if (code == '20000' && msg == 'success') {
                                    this.vShowType = 1
                                    this.$message({
                                        message: '获取报告成功',
                                        type: 'success'
                                    });
                                    this.getReportList()
                                } else {
                                    this.$message.error({
                                        message: msg,
                                        center: true,
                                    })
                                }
                            })
                        }


                    }
                }
            },
            regionchange() {
                if (this.region == '国内') {
                    this.systemList = this.homeSystemList
                } else {
                    this.systemList = this.abroadSystemList
                }
                this.getExecList()
            },
            systemchange() {
                this.getExecList()
                this.getReportList()
            },
            envchange() {
                this.getExecList()
                this.getReportList()
            },
            projectchange() {
                if (this.projectname == 'hw') {
                    this.vShowSystem = 0
                    this.vShowSystem1 = 0
                    this.vShowEnv = 1
                    this.vShowEnv1 = 1
                } else if (this.projectname == 'fengkong') {
                    this.vShowSystem = 1
                    this.vShowSystem1 = 1
                    this.vShowEnv = 0
                    this.vShowEnv1 = 0
                }
                this.getExecList()
                this.getReportList()
            },
            typechange() {
                if (this.projectname == 'hw' && this.accurateType == 'add') {
                    this.dynamicValidateForm.domains = []
                    Object.entries(this.GLOBAL.hwSystemList).forEach(([key, value]) => {
                        const tmpDict = {
                            system: key + '-' + value,
                            baseVersion: '',
                            nowVersion: ''
                        }
                        this.dynamicValidateForm.domains.push(tmpDict);
                    });
                }
                this.getReportList()
            },
            getExecList() {
                const params = {
                    'project': this.projectname,
                    'region': this.region,
                    'system': this.system,
                    'env': this.envname
                };
                getExecLists(params).then(response => {
                    this.autoLoading = false
                    let {msg, code, data} = response;
                    if (code == '20000' && msg == 'success') {
                        this.execTableData = data

                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }

                })
            },
            getReportList() {
                const params = {
                    'project': this.projectname,
                    'region': this.region,
                    'system': this.system,
                    'env': this.envname,
                    'accurateType': this.accurateType
                };
                getReportLists(params).then(response => {
                    this.autoLoading = false
                    let {msg, code, data} = response;
                    if (code == '20000' && msg == 'success') {
                        if (this.projectname == 'hw') {
                            this.reportTableDataHw = data
                        } else {
                            this.reportTableDataFk = data
                        }

                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }

                })
            },
            openReportHtml(ossKey, system) {
                const params = {
                    'ossKey': ossKey,
                    'system': system,
                    'env': this.envname,
                    'accurateType': this.accurateType,
                    'project': this.projectname
                };

                openReport(params).then(response => {
                    let {msg, code} = response;
                    if (code == '20000' && msg == 'success') {
                        if (this.projectname == 'hw') {
                            var modleName = 'provider'
                            if (ossKey.includes('api')) {
                                modleName = 'api'
                            }
                            window.open('http://qa.test.internal.taqu.cn/accurateReport/' + this.accurateType + '/hw/' + this.envname + '/' + system + '/' + modleName)
                        } else {
                            window.open('http://qa.test.internal.taqu.cn/accurateReport/' + this.accurateType + '/' + system)
                        }

                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }

                })
            },
            testButton(){
                console.info(1111111111)
            }
        },
        created() {
            this.getExecList()
            this.getReportList()
        }
    }
</script>

<style>
    #input2 {
        min-height: 30px;
        margin: 0px;
        width: 400px;
    }

    #input3 {
        min-height: 30px;
        margin: 0px;
        width: 400px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 160px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }

    .radio-label {
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 30px;
    }

    .el-row {
        margin-bottom: 8px;

    &

    :last-child {
        margin-bottom: 0;
    }

    }

</style>
