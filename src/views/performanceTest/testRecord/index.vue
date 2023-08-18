<template>

    <div class="app-container">

        <el-row :gutter="8">
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}"
                    style="margin-bottom:30px;">
                <el-table :data="recordList" stripe highlight-current-row style="width:1080;">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column
                            prop="scriptName"
                            label="脚本名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="runStartTime"
                            label="测试开始时间"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="runStopTime"
                            label="测试结束时间"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="runUser"
                            label="执行人"
                            width="180">
                    </el-table-column>
                    <el-table-column v-if="false"
                                     prop="runId"
                                     label="执行id"
                                     width="180">
                    </el-table-column>
                    <el-table-column label="Actions" align="center" width="200" class-name="small-padding fixed-width">
                        <template slot-scope="{row}">
<!--                            <router-link :to="'/performanceTest/viewReport/'+row.runId">-->
                                <el-button type="primary" size="mini" @click="viewReport(row)">
                                    查看报告
                                </el-button>
<!--                            </router-link>-->
                        </template>
                    </el-table-column>
<!--                    <el-table-column align="center" label="Actions" width="120">-->
<!--                        <template slot-scope="scope">-->
<!--                            <router-link :to="'/example/edit/'+scope.row.id">-->
<!--                                <el-button type="primary" size="small" icon="el-icon-edit">-->
<!--                                    Edit-->
<!--                                </el-button>-->
<!--                            </router-link>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {getRecordList} from '@/api/performanceTest'
    // import {getUsers} from "../../api/qualityStat";

    export default {
        name: 'runRecord',
        data() {
            return {
                recordList: [],
            }
        },
        methods: {
            // 获取脚本列表
            getRecords() {
                let self = this;
                getRecordList().then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.recordList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            viewReport(row) {
                console.info(row)
                const { href } = this.$router.resolve({
                    path: '/performanceTest/viewReport',
                    query:{runId:row.runId}
                });
                window.open(href, '_blank');
            },
        },
        created() {
            this.getRecords()
        }
        ,
        mounted() {
        }
    }

</script>
<style>
    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 22px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);
    }

</style>