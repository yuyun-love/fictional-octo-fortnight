<template>
    <div class="app-container">
        <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
        <div>
            <el-row>
                <label class="radio-label">项目: </label>
                <el-select v-model="projectname" style="width:200px;" @change="projectchange" clearable>
                    <el-option
                            v-for="item in projectList"
                            :key="item.project"
                            :label="item.project"
                            :value="item.start_job"
                    />
                </el-select>
                <label class="radio-label">构建批次号: </label>
                <el-select v-model="startBuildId" style="width:200px;" @change="startBuildchange" clearable>
                    <el-option
                            v-for="item in startBuildList"
                            :key="item.start_job_build_id"
                            :label="'第'+item.start_job_build_id+'次构建'"
                            :value="item.start_job_build_id"
                    />
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
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="timeChange"
                        :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-row>


        </div>
        <div v-loading="loading" element-loading-text="数据加载中" element-loading-spinner="el-icon-loading"
             element-loading-custom-class="my-loading">
            <el-table
                    :data="apiTestData"
                    style="width: 100%">
                <el-table-column
                        prop="start_job_name"
                        label="业务"
                        align='center'
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="job_name"
                        label="job名称"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="job_description"
                        label="job说明"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="job_build_id"
                        label="构建id"
                        align='center'
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="job_build_time"
                        label="构建时长"
                        align='center'
                        sortable
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="job_case_num"
                        label="case总数"
                        align='center'
                        sortable
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="job_fail_case_num"
                        label="case失败数"
                        sortable
                        align='center'
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="job_fail_step_num"
                        label="step失败数"
                        sortable
                        align='center'
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="create_time"
                        label="报告生成时间"
                        sortable
                        align='center'
                        width="180">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        align='center'
                        width="280">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                v-show="scope.row.hasChildren==0"
                                type="success"
                                @click="viewReports(scope.row.job_name,scope.row.job_report)">全部报告
                        </el-button>
                        <el-button
                                size="mini"
                                v-show="scope.row.hasChildren==0"
                                type="primary"
                                @click="viewReports(scope.row.job_name,scope.row.job_fail_report)">失败报告
                        </el-button>
                        <el-button
                                size="mini"
                                v-show="scope.row.hasChildren==0"
                                type="info"
                                @click="viewReports(scope.row.job_name,scope.row.job_console)">运行日志
                        </el-button>
                        <el-button
                                size="mini"
                                v-show="scope.row.hasChildren==1"
                                type="success"
                                @click="getbuildJobs(scope.row.job_name,scope.row.job_build_id)"
                                style="margin-left: 15px;">查看构建详情
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>
            <el-drawer
                    title="job构建详情"
                    :visible.sync="drawer"
                    :direction="direction"
                    size="80%"
            >
                <el-table
                        :data="detailData"
                        height="99%"
                        style="width: 100%">
                    <el-table-column
                            prop="start_job_name"
                            label="业务"
                            align='center'
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="job_name"
                            label="job名称"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="job_description"
                            label="job说明"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="job_build_id"
                            label="构建id"
                            align='center'
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="job_build_time"
                            label="构建时长"
                            align='center'
                            sortable
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="job_case_num"
                            label="case总数"
                            align='center'
                            sortable
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="job_fail_case_num"
                            label="case失败数"
                            sortable
                            align='center'
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="job_fail_step_num"
                            label="step失败数"
                            sortable
                            align='center'
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="create_time"
                            label="报告生成时间"
                            sortable
                            align='center'
                            width="180">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            align='center'
                            width="280">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="success"
                                    @click="viewReports(scope.row.job_name,scope.row.job_report)">全部报告
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="viewReports(scope.row.job_name,scope.row.job_fail_report)">失败报告
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="info"
                                    @click="viewReports(scope.row.job_name,scope.row.job_console)">运行日志
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-drawer>
        </div>

    </div>

</template>

<script>
import {getAPiProjectList, getProjectBuilds, getbuildJob, getBuildSummaryData} from '@/api/automate'

export default {
    name: 'automate',
    data() {
        return {
            drawer: false,
            direction: 'btt',
            loading: false,
            projectList: [],
            moreMsg: '',
            outerVisible: false,
            startBuildList: [],
            apiTestData: [],
            detailData: [],
            projectname: '',
            startBuildId: '',
            timeValue: '',
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

        }
    },

    methods: {
        getProjects() {
            getAPiProjectList().then(response => {
                let {msg, code, data} = response;
                if (code == '20000' && msg == 'success') {
                    this.projectList = data
                } else {
                    this.$message.error({
                        message: msg,
                        center: true,
                    })
                }
            })
        },
        getProjectBuild() {
            const params = {
                'start_job_name': this.projectname,
            };
            getProjectBuilds(params).then(response => {
                let {msg, code, data} = response;
                if (code == '20000' && msg == 'success') {
                    this.startBuildList = data
                } else {
                    this.$message.error({
                        message: msg,
                        center: true,
                    })
                }
            })
        },
        getbuildJobs(start_job_name, start_job_build_id,drawer_status=true) {
            const params = {
                'start_job_name': start_job_name,
                'start_job_build_id': start_job_build_id,
            }
            this.loading = true
            getbuildJob(params).then(response => {
                let {msg, code, data} = response;
                if (code == '20000' && msg == 'success') {
                    this.loading = false
                    this.drawer = drawer_status
                    if (drawer_status) {
                        this.detailData = data
                    } else {
                        this.apiTestData = data
                    }
                } else {
                    this.$message.error({
                        message: msg,
                        center: true,
                    })
                }
            })
        },
        projectchange() {
            this.getProjectBuild()
            this.updateData()

        },
        timeChange() {
            this.updateData()
        },
        startBuildchange() {
            this.updateData()

        },
        updateData() {
            if (this.startBuildId || this.startBuildId === 0) {
                this.getbuildJobs(this.projectname, this.startBuildId, false)
            } else {
                this.getBuildSummaryDatas()
            }
        },
        viewReports(job_name, key) {
            window.open('http://qa.test.internal.taqu.cn/api/getReport?job_name=' + job_name + '&key=' + key)
        },
        getBuildSummaryDatas() {
            this.loading = true
            const params = {
                'start_job_name': this.projectname,
                'start_job_build_id': this.startBuildId,
            }
            if (this.timeValue && this.timeValue.length > 0) {
                params.start_time = this.timeValue[0]
                params.end_time = this.timeValue[1]

            }
            getBuildSummaryData(params).then(response => {
                this.loading = false
                let {msg, code, data} = response;
                if (code == '20000' && msg == 'success') {
                    this.apiTestData = data
                } else {
                    this.$message.error({
                        message: msg,
                        center: true,
                    })
                }
            })
        },
    },
    created() {
        this.getProjects()
        this.getProjectBuild()
        this.getBuildSummaryDatas()
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
.my-loading {

.el-loading-spinner {
    top: 200px !important;
}

}
.el-drawer.btt {
    overflow: scroll;
}

</style>
