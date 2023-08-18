<template>
    <div>
        <aside>
            <strong>
                <div class="card-panel-text">
                    测试报告
                </div>
            </strong><br>
            <div class="app-container">
                <strong>During：</strong>{{during}}<br>
                <strong>Target Host：</strong>{{host}}<br>
                <strong>Script：</strong>{{script}}<br>
                <strong>User：</strong>{{user}}<br>
            </div>
            <div class="app-container">
                <div class="card-panel-text1">
                    Request Statistics
                </div>
                <el-table :data="requestStatistics" stripe highlight-current-row>
                    <el-table-column
                            prop="safe_name"
                            label="脚本名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="num_requests"
                            label="请求总数"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="num_failures"
                            label="失败总数"
                            width="100">
                        <template slot-scope="scope">
                            <p style="color: red">{{ scope.row.num_failures}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="current_rps"
                            label="QPS"
                            width="80">
                        <template slot-scope="scope">
                            <p>{{ scope.row.current_rps | numFilter}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="avg_response_time"
                            label="Average Response Time"
                            width="180">
                        <template slot-scope="scope">
                            <p>{{ scope.row.avg_response_time | numFilter}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="median_response_time"
                            label="50% Response Time"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="ninetieth_response_time"
                            label="90% Response Time"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="ninety_ninth_response_time"
                            label="95% Response Time"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="min_response_time"
                            label="Min Response Time"
                            width="170">
                    </el-table-column>
                    <el-table-column
                            prop="max_response_time"
                            label="Max Response Time"
                            width="170">
                    </el-table-column>
                    <el-table-column
                            prop="avg_content_length"
                            label="Average size (bytes)"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="current_fail_per_sec"
                            label="Failures/s"
                            width="180">
                    </el-table-column>
                </el-table>
            </div>
            <div class="app-container">
                <div class="card-panel-text1">
                    Charts
                </div>
                <el-row>
                    <div id="qpsChart" style="height:400px;"></div>
                </el-row>
                <el-row>
                    <div id="responseTimeChart" style="height:400px;"></div>
                </el-row>
                <el-row>
                    <div id="userChart" style="height:400px;"></div>
                </el-row>
            </div>
        </aside>
        <br>
    </div>
</template>


<script>
    import {getReportDatas} from '@/api/performanceTest'

    export default {
        data() {
            return {
                during: '',
                endTime: '',
                host: '',
                script: '',
                user: '',
                requestStatistics: [],
                timeList: [],
                qpsList: [],
                failList: [],
                rt50List: [],
                rt95List: [],
                userList: [],
            };
        },
        methods: {
            echartsInit() {
                const qpsOptions = {
                    title: {
                        text: 'Qps 折线图',
                        textStyle: {
                            fontSize: 15,
                            color: '#67C23A'
                        },
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Qps', 'Failures/s']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.timeList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Qps',
                            type: 'line',
                            lineStyle: {
                                color: "#67C23A"
                            },
                            itemStyle: {
                                color: "#67C23A"
                            },
                            data: this.qpsList
                        },
                        {
                            name: 'Failures/s',
                            type: 'line',
                            lineStyle: {
                                color: "#F56C6C"
                            },
                            itemStyle: {
                                color: "#F56C6C"
                            },
                            data: this.failList
                        }
                    ]
                }
                const rtOptions = {
                    title: {
                        text: 'Response Time 折线图',
                        textStyle: {
                            fontSize: 15,
                            color: "#E6A23C"
                        },
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['50% percentile', '95% percentile']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.timeList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '50% percentile',
                            type: 'line',
                            lineStyle: {
                                color: "#67C23A"
                            },
                            itemStyle: {
                                color: "#67C23A"
                            },
                            data: this.rt50List
                        },
                        {
                            name: '95% percentile',
                            type: 'line',
                            lineStyle: {
                                color: "#E6A23C"
                            },
                            itemStyle: {
                                color: "#E6A23C"
                            },
                            data: this.rt95List
                        }
                    ]
                }
                const userOptions = {
                    title: {
                        text: 'Users 折线图',
                        textStyle: {
                            fontSize: 15,
                            color: '#409EFF'
                        },
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Users']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.timeList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Users',
                            type: 'line',
                            lineStyle: {
                                color: "#409EFF"
                            },
                            itemStyle: {
                                color: "#409EFF"
                            },
                            data: this.userList
                        }
                    ]
                }
                this.$echarts.init(document.getElementById('qpsChart')).setOption(qpsOptions)
                this.$echarts.init(document.getElementById('responseTimeChart')).setOption(rtOptions)
                this.$echarts.init(document.getElementById('userChart')).setOption(userOptions)
            },
            getReportData() {
                // console.info(this.$route.query.runId)
                const params = {
                    'runId': this.$route.query.runId
                };
                getReportDatas(params).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        this.requestStatistics = data.stats
                        this.during = data.during
                        this.user = data.user
                        this.script = data.script
                        this.host = data.host
                        this.qpsList = data.qpsList
                        this.failList = data.failCountList
                        this.timeList = data.collectTimeList
                        this.userList = data.userCountList
                        this.rt50List = data.response50Time
                        this.rt95List = data.response95Time
                        this.echartsInit()
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            }
        },
        created() {
            this.getReportData()
        },
        filters: {
            numFilter(value) {
                // 截取当前数据到小数点后两位
                let realVal = parseFloat(value).toFixed(2)
                return realVal
            }
        }

    };
</script>

<style>
    .card-panel-text {
        line-height: 40px;
        /*color: rgba(255, 255, 255, 0.5);*/
        color: rgba(0, 0, 0, 0.6);
        font-size: 30px;
        margin-bottom: 0px;
    }

    .card-panel-text1 {
        line-height: 40px;
        /*color: rgba(255, 255, 255, 0.5);*/
        color: rgba(0, 0, 0, 0.6);
        font-size: 20px;
        margin-bottom: 0px;
    }

    .el-row {
        margin-bottom: 40px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    /*aside {*/
    /*    background: rgba(29, 48, 77, 0.51);*/
    /*}*/
</style>

