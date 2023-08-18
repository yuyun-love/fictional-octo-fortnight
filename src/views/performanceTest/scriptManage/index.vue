<template>

    <div class="app-container">

        <el-row :gutter="8">
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}"
                    style="margin-bottom:30px;">
                <!--                <div class="card-panel-text">-->
                <!--                    脚本管理-->
                <!--                </div>-->
                <el-table :data="scriptList" stripe
                          highlight-current-row style="width:100%;"
                          row-key="scriptName"
                          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
<!--                    <el-table-column type="index"  width="50"></el-table-column>-->
                    <el-table-column
                            prop="scriptName"
                            label="脚本名称"
                            width="300">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="scriptPath"-->
                    <!--                            label="脚本路径"-->
                    <!--                            width="700">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="200">
                        <template slot-scope="{row}">
                            <el-button v-if="row.status=='stoped' || row.status=='running'"  :type="row.status === 'stoped' ? 'info' : 'success'" size="mini" plain round
                                       :style="row.status == 'running' ?
                            { opacity: changeOpcity }: { opacity: 1 }">{{row.status}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="Actions" align="center"  class-name="small-padding fixed-width">
                        <template slot-scope="{row}">
                            <el-button type="primary" v-if="row.status=='stoped' || row.status=='running'"  size="mini" @click="handleRun(row)">
                                run
                            </el-button>
                            <el-button v-if="row.status=='stoped' || row.status=='running'" size="mini" type="danger"
                                       @click="stopTest(row)">
                                stop
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>


        </el-row>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="200px"
                     style="width: 400px; margin-left:50px;">
                <el-form-item label="并发用户数" prop="userNum">
                    <el-input v-model="temp.userNum"/>
                </el-form-item>
                <el-form-item label="运行时长" prop="runTime">
                    <el-input v-model="temp.runTime"/>
                </el-form-item>
<!--                <el-form-item label="每秒启动用户数" prop="spawnRate">-->
<!--                    <el-input v-model="temp.spawnRate"/>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="测试host" prop="host">-->
<!--                    <el-input v-model="temp.host"/>-->
<!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    Cancel
                </el-button>
                <el-button type="primary" @click="dialogStatus==='run'?runTest():stopTest()">
                    StartTest
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {getScriptList, startTest, stopTest} from '@/api/performanceTest'
    import {getUserName} from '@/utils/auth'
    // import {getUsers} from "../../api/qualityStat";

    const tableTittle = [{title: "脚本名", prop: "scriptName"}, {title: "脚本路径", prop: "scriptPath"}]

    export default {
        name: 'scriptManage',
        data() {
            return {
                scriptname: '',
                scriptList: [],
                tableTittleList: tableTittle,
                dialogStatus: '',
                // 控制绿灯闪烁
                changeOpcity: 1,
                flag: 1,
                // 控制红灯闪烁
                changeOpcity1: 1,
                flag1: 1,
                textMap: {
                    run: 'Run',
                    stop: 'Stop'
                },
                dialogFormVisible: false,
                temp: {},
                rules: {
                    userNum: [{
                        type: "number",
                        required: true,
                        message: '并发用户数必填且只能数字',
                        trigger: 'blur',
                        transform: (value) => Number(value)
                    }],
                    // spawnRate: [{
                    //     type: "number",
                    //     required: true,
                    //     message: '每秒启动用户数必填且只能数字',
                    //     trigger: 'blur',
                    //     transform: (value) => Number(value)
                    // }],
                    // host: [{
                    //     required: true,
                    //     message: 'host必填',
                    //     trigger: 'blur',
                    // }],
                },


            }
        },
        methods: {
            // 按钮闪烁
            controlLight() {

                setInterval(() => {
                    if (this.flag) {
                        this.$nextTick(() => {
                            this.changeOpcity = this.changeOpcity - 0.1;
                        });
                    } else {
                        this.$nextTick(() => {
                            this.changeOpcity = this.changeOpcity + 0.1;
                        });
                    }
                    if (this.changeOpcity < 0.3) {
                        this.flag = 0;
                    } else if (this.changeOpcity > 0.99) {
                        this.flag = 1;
                    }
                }, 50);
            },
            // 获取脚本列表
            getScripts() {
                let self = this;
                getScriptList().then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.scriptList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            handleRun(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.dialogStatus = 'run'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            runTest() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp)
                        startTest(tempData).then(response => {
                            let {msg, code} = response;
                            if (code == '20000' && msg == 'success') {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: 'Success',
                                    message: 'Update Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.getScripts()
                                // this.sleep(1000)
                                window.open('http://10.73.155.108:8089/')
                            } else {
                                this.$message.error({
                                    message: msg,
                                    center: true,
                                })
                            }
                        })
                    }
                })
            },
            stopTest(row) {
                if (row.status == 'stoped') {
                    this.$message.error({
                        message: '脚本未运行，无法停止',
                        center: true,
                    });
                } else {
                    this.$confirm('确定停止测试?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        stopTest(row).then(response => {
                            let {msg, code} = response;
                            if (code == '20000' && msg == 'success') {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: 'Success',
                                    message: 'stop Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.getScripts()
                            } else {
                                this.$message.error({
                                    message: msg,
                                    center: true,
                                })
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消停止'
                        });
                    });
                }

            }


        },
        created() {
            this.getScripts()
        }
        ,
        mounted() {

            this.controlLight();
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