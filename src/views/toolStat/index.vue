<template>

    <div class="app-container">
        <div>
            <label class="radio-label">部门: </label>
            <el-select v-model="department" multiple reserve-keyword filterable clearable collapse-tags
                       :disabled="departmentDisabled" @change="departmentChange"
                       style="width:260px;">
                <el-option
                        v-for="item in departmentList"
                        :key="item"
                        :label="item"
                        :value="item"
                />
            </el-select>
            <label class="radio-label">用户: </label>
            <el-select v-model="username" multiple reserve-keyword filterable clearable collapse-tags
                       @change="userchange"
                       :disabled="userDisabled" style="width:250px;">
                <el-option key="selectAll1" label="全选" value="selectAll1" v-show="userList.length>0"></el-option>
                <el-option
                        v-for="item in userList"
                        :key="item"
                        :label="item"
                        :value="item"
                />
            </el-select>
            <label class="radio-label">工具: </label>
            <el-select v-model="toolname" multiple reserve-keyword filterable clearable collapse-tags
                       @change="toolchange"
                       :disabled="userDisabled" style="width:250px;">
                <el-option key="selectAll" label="全选" value="selectAll" v-show="toolList.length>0"></el-option>
                <el-option
                        v-for="item in toolList"
                        :key="item"
                        :label="item"
                        :value="item"
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
                    value-format="timestamp"
                    :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <el-button type="primary" style="margin:20px 0 0 25px;" :loading="autoLoading" @click="countToolUse">
                查询
            </el-button>
        </div>
        <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-people">
                        <svg-icon icon-class="dashboard" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            总提升效率
                        </div>
                        <div><font color="#cd5c5c" size="3">{{totalSaveTime}}h</font></div>

                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper icon-message">
                        <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            总执行次数
                        </div>
                        <div><font color="#cd5c5c" size="3">{{totalExecNum}}次</font></div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">计算公式：<br/>在时间范围内除用例统计与bug统计外的所有工具提升的效率总和
                        <br/>除以迭代数（时间范围内的月数*2）<br/>例如：时间范围为9.1~10.30，则value=工具提效总和/2(月数)*2(每个月迭代数量)<br/></div>
                    <div class="card-panel">
                        <div class="card-panel-icon-wrapper icon-money">
                            <svg-icon icon-class="icon" class-name="card-panel-icon"/>
                        </div>
                        <div class="card-panel-description">

                            <div class="card-panel-text">
                                迭代提效
                                <!--                            <template slot-scope="scope">-->
                                <!--                            <el-popover trigger="hover" placement="top">-->
                                <!--                                <p v-for="item in scope.row.userExec">{{ Object.keys(item)[0]}}:{{-->
                                <!--                                    Object.values(item)[0]}}</p>-->
                                <!--                                <div slot="reference" class="name-wrapper">-->
                                <!--                                    <el-tag size="medium">{{ scope.row.toolName }}</el-tag>-->
                                <!--                                </div>-->
                                <!--                            </el-popover>-->
                                <!--                        </template>-->
                            </div>
                            <div><font color="#cd5c5c" size="3">{{totalToolSaveTime}}h</font></div>
                        </div>
                    </div>
                </el-tooltip>
            </el-col>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>工具提升效率图</span>
                <div class="select_time">
                    <el-radio-group v-model="echartsType" @input="changeType">
                        <!--                        <el-radio-button label="日"></el-radio-button>-->
                        <el-radio-button label="月"></el-radio-button>
                        <el-radio-button label="周"></el-radio-button>
                    </el-radio-group>
                </div>

            </div>

            <div id="toolChart" style="height:400px;"></div>
        </el-card>
        <el-tabs v-model="activeName">
            <el-tab-pane label="工具使用统计" name="first">
                <!--                <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}"-->
                <!--                        style="padding-right:8px;margin-bottom:30px;">-->
                <div class="card-panel-text">
                    工具使用次数统计表（展开显示用户使用详情）
                </div>
                <el-table :data="execData" stripe border highlight-current-row v-loading="listLoading"
                          style="width: 100%;">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand"
                                     v-for="item in props.row.userExec">
                                <el-form-item v-for="(key,value) in item" :label="value">
                                    <span>{{ key}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column sortable show-overflow-tooltip prop="toolName" label="工具名称">

                    </el-table-column>

                    <el-table-column sortable show-overflow-tooltip prop="execNum" label="使用次数">

                    </el-table-column>
                    <el-table-column sortable show-overflow-tooltip prop="saveTime"
                                     label="节省时间(单位:h)"></el-table-column>
                    <el-table-column sortable show-overflow-tooltip prop="toolTime"
                                     label="工具后耗时(单位:s)"></el-table-column>
                    <el-table-column sortable show-overflow-tooltip prop="noToolTime"
                                     label="工具前耗时(单位:s)"></el-table-column>
                </el-table>
                <!--                </el-col>-->
            </el-tab-pane>
            <el-tab-pane label="工具配置" name="second">
                <el-row :gutter="8">
                    <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 20}" :xl="{span: 20}"
                            style="margin-bottom:30px;">
                        <div class="card-panel-text">
                            工具配置表
                        </div>
                        <el-table :data="toolConfigData" stripe border highlight-current-row style="width: 100%;">
                            <el-table-column type="index" width="50"></el-table-column>
                            <el-table-column v-for="item in tableConfigTittleList" sortable show-overflow-tooltip
                                             :prop="item.prop"
                                             :label="item.title">

                            </el-table-column>
                            <el-table-column label="Actions" align="center" width="200"
                                             class-name="small-padding fixed-width">
                                <template slot-scope="{row,$index}">
                                    <el-button type="primary" size="mini" @click="handleUpdate(row)">
                                        Edit
                                    </el-button>
                                    <el-button v-if="row.status!='deleted'" size="mini" type="danger"
                                               @click="handleDelete(row)">
                                        Delete
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 4}" :xl="{span: 4}"
                            style="margin-bottom:30px;">
                        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                                   @click="handleCreate">
                            Add
                        </el-button>

                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :model="temp" :rules="rules" label-position="left" label-width="200px"
                     style="width: 400px; margin-left:50px;">

                <el-form-item label="工具名称" prop="toolName">
                    <el-input v-model="temp.toolName"/>
                </el-form-item>
                <el-form-item label="api地址" prop="apiName">
                    <el-input v-model="temp.apiName" :disabled="apiNameDisable"/>
                </el-form-item>
                <el-form-item label="工具前耗时(单位S)" prop="noToolTime">
                    <el-input v-model="temp.noToolTime"/>
                </el-form-item>
                <el-form-item label="工具后耗时(单位S)" prop="toolTime">
                    <el-input v-model="temp.toolTime"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    Cancel
                </el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                    Confirm
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getAllUserList,
        getToolList,
        getToolConfig,
        getToolUseData,
        updateToolConfig,
        createToolConfig,
        deleteToolConfig,
    } from '@/api/toolStat'
    import {getUserName} from '@/utils/auth'
    // import {getUsers} from "../../api/qualityStat";

    const tableTittle = [{title: "工具名", prop: "toolName"}, {title: "使用次数", prop: "execNum"}, {
        title: "节省时间(单位:h)",
        prop: "saveTime"
    }]
    const tableConfigTittle = [{title: "工具名", prop: "toolName"}, {
        title: "工具后耗时(单位:s)",
        prop: "toolTime"
    }, {title: "工具前耗时(单位:s)", prop: "noToolTime"}]
    export default {
        name: 'CountQuality',
        data() {
            return {
                activeName: 'first',
                username: '',
                department: '',
                toolname: '',
                toolList: '',
                userList: '',
                totalSaveTime: '',
                totalToolSaveTime: '',
                totalExecNum: '',
                topExecToolName: '',
                topExecToolNum: 0,
                departmentList: this.GLOBAL.departmentList,
                timeValue: '',
                autoLoading: false,
                listLoading: false,
                departmentDisabled: false,
                userDisabled: false,
                tableTittleList: tableTittle,
                tableConfigTittleList: tableConfigTittle,
                execData: [],
                echartsType: '月',
                // client_id:this.Global.feishuConfig['client_id'],
                // client_secret:this.Global.feishuConfig['client_secret'],
                toolConfigData: [],
                xTittle: [],
                yValue: [],
                weekList: [],
                weekValueList: [],
                monthList: [],
                monthValueList: [],
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
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                temp: {},
                rules: {
                    toolName: [{required: true, message: 'toolName 必填', trigger: 'change'}],
                    apiName: [{required: true, message: 'apiName 必填', trigger: 'change'}],
                    toolTime: [{
                        type: "number",
                        required: true,
                        message: 'toolTime 必填且只能数字',
                        trigger: 'blur',
                        transform: (value) => Number(value)
                    }],
                    noToolTime: [{
                        type: "number",
                        required: true,
                        message: 'noToolTime 必填且只能数字',
                        trigger: 'blur',
                        transform: (value) => Number(value)
                    }]
                },
                apiNameDisable: true,
                selectAll: false,
                selectAll1: false,

            }
        },
        methods: {
            // 获取部门用户列表
            getDepartmentUsers() {
                let self = this;
                const params = {
                    'client_id': process.env.VUE_APP_CLIENT_ID,
                    'client_secret': process.env.VUE_APP_CLIENT_SECRET,
                    'departmentName': this.department,
                };
                getAllUserList(params).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.userList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            }
            ,
            // 获取工具列表
            getTools() {
                let self = this;
                getToolList().then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.toolList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            }
            ,
            //查询工具使用数据
            countToolUse() {
                const params = {
                    'departmentList': this.department,
                    'userList': this.username,
                    'toolList': this.toolname,
                    'time': this.timeValue,
                };
                this.autoLoading = true
                this.listLoading = true;
                getToolUseData(params).then(response => {
                    this.autoLoading = false
                    this.listLoading = false;
                    let {msg, code, data} = response;
                    if (code == '20000' && msg == 'success') {
                        this.execData = data.tableDetailData
                        this.totalSaveTime = data.totalData.totalSaveTime
                        this.totalToolSaveTime = data.totalData.totalToolSaveTime
                        this.totalExecNum = data.totalData.totalExecNum
                        this.totalSaveTimeNo = data.totalData.totalSaveTimeNo
                        this.totalExecNumNo = data.totalData.totalExecNumNo
                        // this.topExecToolName = Object.keys(data.totalData.topExecTool)[0]
                        // this.topExecToolNum = data.totalData.topExecTool[this.topExecToolName]
                        this.xTittle = data.chartData.monthList
                        this.yValue = data.chartData.monthValueList
                        this.weekList = data.chartData.weekList
                        this.weekValueList = data.chartData.weekValueList
                        this.monthList = data.chartData.monthList
                        this.monthValueList = data.chartData.monthValueList
                        this.echartsInit()
                        this.echartsType='月'
                        // this.vShowType = 1

                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }
                })
            }
            ,
            getToolConfig() {
                getToolConfig().then(response => {
                    let {msg, code, data} = response;
                    if (code == '20000' && msg == 'success') {
                        this.toolConfigData = data
                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }
                })
            }
            ,
            departmentChange() {
                this.getDepartmentUsers()
                // if (e.length > 0) {
                //     this.userDisabled = true
                //     this.$forceUpdate()
                // } else {
                //     this.userDisabled = false
                //     this.$forceUpdate()
                // }

            }
            ,

            // userChange(e) {
            //     if (e.length > 0) {
            //         this.departmentDisabled = true
            //
            //         this.$forceUpdate()
            //     } else {
            //         this.departmentDisabled = false
            //         this.$forceUpdate()
            //     }
            //
            // },
            echartsInit() {
                const options = {

                    tooltip: {
                        trigger: 'axis',
                        // axisPointer: {
                        //     type: 'shadow'
                        // }
                        formatter: function (params) {
                            let str = params[0].value + "<br />"+params[0].name;
                            return str
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xTittle,
                        axisTick: {
                            alignWithLabel: true
                        },
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {data: this.yValue, type: 'line', smooth: true}
                    ]
                }
                this.$echarts.init(document.getElementById('toolChart')).setOption(options)
            }
            ,
            handleCreate() {
                this.apiNameDisable = false
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            }
            ,
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp)
                        tempData['user'] = getUserName()
                        createToolConfig(tempData).then(response => {
                            let {msg, code} = response;
                            if (code == '20000' && msg == 'success') {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: 'Success',
                                    message: 'Update Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.getToolConfig()
                            } else {
                                this.$message.error({
                                    message: msg,
                                    center: true,
                                })
                            }
                        })
                    }
                })
            }
            ,
            handleUpdate(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            }
            ,
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp)
                        updateToolConfig(tempData).then(response => {
                            // console.info(response)
                            let {msg, code} = response;
                            if (code == '20000' && msg == 'success') {
                                // console.info('12322222')
                                // const index = this.toolConfigData.findIndex(v => v.id === this.temp.id)
                                // this.toolConfigData.splice(index, 1, this.temp)
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: 'Success',
                                    message: 'Update Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.getToolConfig()
                            } else {
                                this.$message.error({
                                    message: msg,
                                    center: true,
                                })
                            }
                        })
                    }
                })
            }
            ,
            handleDelete(row) {
                this.$confirm('确定删除这条配置?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.temp = Object.assign({}, row)
                    var apiName = this.temp.apiName
                    this.deleteData(apiName)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
            ,
            deleteData(apiName) {
                deleteToolConfig({'apiName': apiName}).then(response => {
                    let {msg, code} = response;
                    if (code == '20000' && msg == 'success') {
                        this.getToolConfig()
                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }
                })
            }
            ,
            changeSelect(value) {
                if (this.selectAll) {
                    this.selectAll = false
                    if (value.indexOf('selectAll') > -1) {
                        this.toolname = value.filter(p => p != 'selectAll')
                    } else {
                        this.toolname = []
                    }
                } else {
                    console.info(value.indexOf('selectAll'))
                    if (value.indexOf('selectAll') > -1) {
                        const optionsValue = []
                        this.toolList.forEach(item => {
                            optionsValue.push(item)
                        })
                        this.toolname = ['selectAll', ...optionsValue]
                        this.selectAll = true
                    } else {
                        if (value.length === this.toolList.length) {
                            const optionsValue = []
                            this.toolList.forEach(item => {
                                optionsValue.push(item)
                            })
                            this.toolname = ['selectAll', ...optionsValue]
                            this.selectAll = true
                        } else {
                            this.toolname = value
                        }
                    }
                }
            }
            ,
            changeSelect1(value) {
                if (this.selectAll1) {
                    this.selectAll1 = false
                    if (value.indexOf('selectAll1') > -1) {
                        this.username = value.filter(p => p != 'selectAll1')
                    } else {
                        this.username = []
                    }
                } else {
                    if (value.indexOf('selectAll1') > -1) {
                        const optionsValue = []
                        this.userList.forEach(item => {
                            optionsValue.push(item)
                        })
                        this.username = ['selectAll1', ...optionsValue]
                        this.selectAll1 = true
                    } else {
                        if (value.length === this.userList.length) {
                            const optionsValue = []
                            this.userList.forEach(item => {
                                optionsValue.push(item)
                            })
                            this.username = ['selectAll1', ...optionsValue]
                            this.selectAll1 = true
                        } else {
                            this.username = value
                        }
                    }
                }
            }
            ,
            toolchange(val) {
                this.changeSelect(val)
            }
            ,
            userchange(val) {
                this.changeSelect1(val)
            }
            ,
            changeType() {
                if (this.echartsType == '月') {
                    this.xTittle = this.monthList
                    this.yValue = this.monthValueList
                } else {
                    this.xTittle = this.weekList
                    this.yValue = this.weekValueList
                }


                this.echartsInit()
            }


        },
        created() {
            this.getDepartmentUsers();
            this.getTools();
            this.countToolUse();
            this.getToolConfig();

        }
        ,
        mounted() {
        }
    }

</script>
<style>
    .radio-label {
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 30px;

    }

    .el-select__tags {
        /*/ / height: 40 px;*/
        white-space: nowrap;
        overflow: hidden;
        flex-wrap: nowrap;
    }

    .el-select__tags-text {
        display: inline-block;
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .expand .el-icon {
        display: none;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .panel-group {
        margin-top: 18px;
    }

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

    .icon-people {
        color: #40c9c6;
    }

    .icon-message {
        color: #36a3f7;
    }

    .icon-money {
        color: #f4516c;
    }

    .icon-shopping {
        color: #34bfa3
    }

    .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 24px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 16px;
    }

    .card-panel-icon {
        float: left;
        font-size: 60px;
    }

    .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
    }

    .card-panel-text {
        line-height: 28px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
        margin-bottom: 18px;
    }


    @media (max-width: 550px) {
        .card-panel-description {
            display: none;
        }

        .card-panel-icon-wrapper {
            float: none !important;
            width: 100%;
            height: 100%;
            margin: 0 !important;
        }
    }

    .el-card {
        font-size: 20px;
        width: 100%;
        margin: 0px auto;
        border: none;
        background-color: #F0F8FF;
        overflow: hidden;
        color: #808080;
        -webkit-transition: .3s;
        transition: .3s;
    }

    .el-card__header {
        border-bottom: 2px solid #808080;
        box-sizing: border-box;
        padding: 10px 10px;
    }

    .toolChart {
        width: 100%;
        height: 400px;
        /* background:pink; */
    }

    .clearfix {
        position: relative;
    }

    .select_time {
        /*width: 210px;*/
        /* border-radius: 5px; */
        float: right;
        /*background: #1677df;*/
        left: 82%;
        top: 221%;
        position: absolute;
        z-index: 11;
    }

    /*.select_time span {*/
    /*    display: block;*/
    /*    width: 70px;*/
    /*    height: 35px;*/
    /*    float: left;*/
    /*    !* background: #4095e5; *!*/
    /*    text-align: center;*/
    /*    line-height: 35px;*/
    /*    color: #4c9bfd;*/
    /*}*/

    /*.select_time .active {*/
    /*    background-color: #4c9bfd;*/
    /*    color: #74f8fd;*/
    /*}*/


</style>