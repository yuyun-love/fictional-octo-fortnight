<template>

    <div class="app-container">
        <h2>用例统计</h2>
        <div>
            <label class="radio-label" ><font style="color:red">*</font>项目: </label>
            <el-select v-model="projectname" multiple reserve-keyword filterable  clearable collapse-tags
                       style="width:260px;"
                       @change="projectchange">
                <el-option
                        v-for="item in projecList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                />
            </el-select>
            <label class="radio-label">模块: </label>
            <el-select v-model="moudlename" multiple reserve-keyword filterable clearable collapse-tags
                       style="width:250px;"
                       @change="moudlechange">
                <el-option key="selectAll" label="全选" value="selectAll" v-show="moudleList.length>0"></el-option>
                <el-option
                        v-for="item in moudleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                />
            </el-select>
            <label class="radio-label">功能: </label>
            <el-select v-model="functionname" popper-append-to-body multiple reserve-keyword filterable clearable collapse-tags style="width:250px" @change="functionchange">
                <el-option
                        v-for="item in functionList"
                        :key="item.id"
                        :label="item.node_name"
                        :value="item.id"
                />
            </el-select>
            <label class="radio-label">节点: </label>
            <el-select v-model="nodename" multiple reserve-keyword filterable clearable collapse-tags
                       style="width:250px; ">
                <el-option
                        v-for="item in nodeList"
                        :key="item.id"
                        :label="item.node_name"
                        :value="item.id"
                />
            </el-select>
        </div>
        <div>
            <label class="radio-label">迭代: </label>
            <el-select v-model="iterationname" style="margin:20px 0 0 0; width:260px;" clearable
                       @change="iterationchange">
                <el-option
                        v-for="item in iterationList"
                        :key="item.name"
                        :label="item.name"
                        :value=[item.start_time,item.end_time]
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
                    :disabled="timeDisabled"
                    align="right"
                    value-format="timestamp"
                    :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <!--                        <label class="radio-label">用户: </label>-->
            <!--                        <el-select v-model="username" style="margin:20px 0 0 0; width:180px;" multiple filterable clearable-->
            <!--                                   collapse-tags>-->
            <!--                            <el-option-->
            <!--                                    v-for="item in userList"-->
            <!--                                    :key="item.execute_person"-->
            <!--                                    :label="item.execute_person"-->
            <!--                                    :value="item.execute_person"-->
            <!--                            />-->
            <!--                        </el-select>-->
            <label class="radio-label">统计指标: </label>
            <el-select v-model="typename" style="width:180px;">
                <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                />
            </el-select>
            <el-button type="primary" style="margin:20px 0 0 25px;" :loading="autoLoading" @click="countQuality">
                统计
            </el-button>
        </div>
        <el-table :data="caseCountDetail" highlight-current-row v-show="vShowType==1" :show-header=false
                  style="margin:20px 0 0 25px; width: 100%;" :row-class-name="setClassName">

            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item v-for="(value,key) in props.row.index3" :label="key">
                            <span style="white-space:pre-line" v-html="value"></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="index1">
            </el-table-column>
            <el-table-column
                    label="值"
                    prop="index2">
            </el-table-column>
        </el-table>
        <el-divider></el-divider>
        <h2>BUG统计</h2>
        <div>
            <label class="radio-label">项目: </label>
            <el-select v-model="jiraProjectName" multiple filterable collapse-tags style="width:190px;"
                       @change="jiraprojectchange">
                <el-option
                        v-for="item in jiraProjecList"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key"
                />
            </el-select>
            <label class="radio-label">概要搜索: </label>
            <el-input v-model="jiraInput" placeholder="请输入内容" style="width:225px;"></el-input>
            <label class="radio-label">报告人: </label>
            <el-select v-model="reporter" style="margin:20px 0 0 0; width:180px;" reserve-keyword multiple filterable
                       clearable
                       collapse-tags>
                <el-option
                        v-for="item in reporterList"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key"
                />
            </el-select>
        </div>
        <div>
            <label class="radio-label">Sprint: </label>
            <el-select v-model="sprint" style="margin:20px 0 0 0; width:180px;" multiple filterable clearable
                       collapse-tags>
                <el-option
                        v-for="item in sprintList"
                        :key="item.key"
                        :label="item.name"
                        :value="item.key"
                />
            </el-select>
            <label class="radio-label">创建时间: </label>
            <el-date-picker
                    v-model="bugCreateTime"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="timestamp"
                    :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
            <el-button type="primary" style="margin:20px 0 0 25px;" :loading="autoLoading1" @click="countJira">
                统计
            </el-button>
        </div>
        <el-table :data="bugCountTotal" style="width: 100%" v-show="vShowType1==1">
            <el-table-column prop="statType" label="类型" width="180"></el-table-column>
            <el-table-column prop="total" label="总数" width="180"></el-table-column>
            <el-table-column prop="add" label="本周新增"></el-table-column>
        </el-table>
        <el-tabs v-model="jiraTabName" v-show="vShowType1==1">
            <el-tab-pane label="解决结果统计" name="first">
                <el-table :data="bugCountReport" style="width: 100%" border v-show="vShowType1==1"
                          :span-method="arraySpanMethod">
                    <el-table-column prop="reporter" label="报告人" width="180"></el-table-column>
                    <el-table-column prop="bugResult" label="bug解决结果" width="180"></el-table-column>
                    <el-table-column prop="bugType" label="bug分类" width="220"></el-table-column>
                    <el-table-column prop="num" label="数量"></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="发现阶段统计" name="second">
                <el-table :data="bugCountFoundReport" style="width: 100%" border v-show="vShowType1==1"
                          :span-method="arraySpanMethod1">
                    <el-table-column prop="reporter" label="报告人" width="180"></el-table-column>
                    <el-table-column prop="bugFound" label="bug发现阶段" width="180"></el-table-column>
                    <el-table-column prop="bugIsCase" label="是否关联测试用例" width="220"></el-table-column>
                    <el-table-column prop="num" label="数量"></el-table-column>
                </el-table>
            </el-tab-pane>

        </el-tabs>
        <!--        <h3 v-show="vShowType1==1">按报告人统计</h3>-->
        <!--        <el-table :data="bugCountReport" style="width: 100%" border v-show="vShowType1==1"-->
        <!--                  :span-method="arraySpanMethod">-->
        <!--            <el-table-column prop="reporter" label="报告人" width="180"></el-table-column>-->
        <!--            <el-table-column prop="bugResult" label="bug解决结果" width="180"></el-table-column>-->
        <!--            <el-table-column prop="bugType" label="bug分类" width="220"></el-table-column>-->
        <!--            <el-table-column prop="num" label="数量"></el-table-column>-->
        <!--        </el-table>-->
    </div>
</template>

<script>
    import {
        getCaseProjects,
        getCaseMoudles,
        getCaseFunctions,
        getIterations,
        getUsers,
        getRepoters,
        getCaseNum,
        getJiraPro,
        getJiraNum,
        getSprints,
        getCaseNodes,
    } from '@/api/qualityStat'

    export default {
        name: 'CountQuality',
        data() {
            return {
                projecList: [],
                moudleList: [],
                moudlename: '',
                projectname: '',
                functionname: '',
                autoLoading: false,
                autoLoading1: false,
                tableTittleList: [''],
                caseCountDetail: [],
                functionList: [],
                nodename:'',
                nodeList: [],
                typename: '',
                typeList: [{
                    value: 'update',
                    label: '更新'
                }, {
                    value: 'add',
                    label: '新增'
                }, {
                    value: 'updateAndAdd',
                    label: '更新和新增'
                }],
                iterationname: '',
                iterationList: [],
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
                timeValue: [],
                timeDisabled: false,
                userList: [],
                username: '',
                vShowType: 0,
                vShowType1: 0,
                selectAll: false,
                jiraInput: '',
                jiraProjecList: [],
                jiraProjectName: '',
                bugCountTotal: [],
                bugCountReport: [],
                reporterList: [],
                reporter: '',
                sprintList: [],
                sprint: '',
                bugCreateTime: [],
                jiraTabName: 'first',
                bugCountFoundReport: [],
            }
        },
        methods: {
            // 获取项目列表
            getCaseProjectList() {
                let self = this;
                getCaseProjects().then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.projecList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            getCaseMoudleList(e) {
                let self = this;
                const params = {
                    'projectIdList': e,
                };
                getCaseMoudles(params).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.moudleList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            getCaseFunctionList(e) {
                let self = this;
                const params = {
                    'moudleIdList': e,
                };
                getCaseFunctions(params).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.functionList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            getCaseNodeList(e) {
                let self = this;
                const params = {
                    'functionIdList': e,
                };
                getCaseNodes(params).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.nodeList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            getIterationList() {
                let self = this;
                getIterations().then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.iterationList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            getUserList() {
                let self = this;
                getUsers().then((res) => {
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
            },
            getRepoterList() {
                let self = this;
                getRepoters().then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.reporterList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            getSprintList(e) {
                let self = this;
                const params = {
                    'viewId': e,
                };
                getSprints(params).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.sprintList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            projectchange(e) {
                this.getCaseMoudleList(e)
            },
            jiraprojectchange(e) {
                this.getSprintList(e)
            },
            moudlechange(val) {
                this.changeSelect(val)
                this.getCaseFunctionList(this.moudlename)

            },
            functionchange(val){
                this.getCaseNodeList(val)
            },
            setClassName({row, index}) {
                if (row.hasOwnProperty("index3")) {
                    return ''
                } else {
                    return 'expand'

                }

            },
            countQuality() {
                if (this.projectname.length < 1) {
                    this.$message.error({
                        message: '项目必选！',
                        center: true,
                    })
                } else {
                    const params = {
                        'projectList': this.projectname,
                        'moudleList': this.moudlename,
                        'functionList': this.functionname,
                        'nodeList': this.nodename,
                        'typename': this.typename,
                        'time': this.timeValue,
                        'user': this.username,
                    };
                    this.autoLoading = true
                    getCaseNum(params).then(response => {
                        this.autoLoading = false
                        let {msg, code, data} = response;
                        if (code == '20000' && msg == 'success') {
                            console.info(data)
                            this.vShowType = 1
                            this.caseCountDetail = data
                            // this.$forceUpdate()

                        } else {
                            this.$message.error({
                                message: msg,
                                center: true,
                            })
                        }
                    })

                }


            },
            countJira() {
                const params = {
                    'project': this.jiraProjectName,
                    'jiraInput': this.jiraInput,
                    'createTime': this.bugCreateTime,
                    'sprint': this.sprint,
                    'reporter': this.reporter,
                };
                // if (this.jiraProjectName.length < 1) {
                //     this.$message.error({
                //         message: '项目必选！',
                //         center: true,
                //     })
                // } else {
                // }
                this.autoLoading1 = true
                getJiraNum(params).then(response => {
                    this.autoLoading1 = false
                    let {msg, code, data} = response;
                    if (code == '20000' && msg == 'success') {
                        console.info(data)
                        this.vShowType1 = 1
                        this.getSpanArr(data.countReport)
                        this.getSpanArr1(data.countFound)
                        this.bugCountTotal = data.countTotal
                        this.bugCountReport = data.countReport
                        this.bugCountFoundReport = data.countFound


                        // this.$forceUpdate()

                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }
                })

            },
            iterationchange(e) {
                if (e.length > 0) {
                    this.timeDisabled = true
                    this.timeValue = [e[0] * 1000, e[1] * 1000]
                    this.$forceUpdate()
                } else {
                    this.timeDisabled = false
                    this.timeValue = []
                    this.$forceUpdate()
                }

            },
            changeSelect(value) {
                //  selectAll 为true 的时候，就走全选分支，全选后出现的情况就是取消权限
                if (this.selectAll) {
                    this.selectAll = false
                    if (value.indexOf('selectAll') > -1) {
                        this.moudlename = value.filter(p => p != 'selectAll')
                        console.info(this.moudlename)
                    } else {
                        this.moudlename = []
                        console.info(this.moudlename)
                    }
                } else {
                    //   是否点击了‘全选’选项
                    if (value.indexOf('selectAll') > -1) {
                        // 有‘全选’选项，则将‘全部’和其他值放置一块
                        const optionsValue = []
                        this.moudleList.forEach(item => {
                            optionsValue.push(item.id)
                        })
                        this.moudlename = ['selectAll', ...optionsValue]
                        this.selectAll = true
                    } else {
                        // 若是勾选选择的长度和提供的选项长度是一样的，则是 ‘全选’
                        if (value.length === this.moudleList.length) {
                            const optionsValue = []
                            this.moudleList.forEach(item => {
                                optionsValue.push(item.id)
                            })
                            this.moudlename = ['selectAll', ...optionsValue]
                            this.selectAll = true
                        } else {
                            //   都是单选
                            this.moudlename = value
                        }
                    }
                }
                // // 真实的勾选值
                // const realSelect = this.moudlename.filter(item => item != 'selectAll')
                // console.log('realSelect', realSelect)
            },
            // dataFilter(val){
            //     const optionsValue = []
            //     if(val!=''){
            //         this.moudleList.forEach(item => {
            //         if(item.name.indexOf(val) > -1){
            //             optionsValue.push(item.id)
            //         }
            //     })
            //     this.moudlename = optionsValue
            //     }
            // },
            getJiraProjectList() {
                let self = this;
                getJiraPro().then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.jiraProjecList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            arraySpanMethod1({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    const _row = this.spanArr1[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            getSpanArr(data) {
                this.spanArr = [];
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        // 如果是第一条记录（即索引是0的时候），向数组中加入１
                        this.spanArr.push(1);
                        this.pos = 0;
                    } else {
                        // console.log(data[i].id, data[i - 1].id)
                        if (data[i].reporter === data[i - 1].reporter) {
                            // 如果parent相等就累加，并且push 0  这里是根据一样的parent匹配
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            // 不相等push 1
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }
            },
            getSpanArr1(data) {
                this.spanArr1 = [];
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        // 如果是第一条记录（即索引是0的时候），向数组中加入１
                        this.spanArr1.push(1);
                        this.pos1 = 0;
                    } else {
                        // console.log(data[i].id, data[i - 1].id)
                        if (data[i].reporter === data[i - 1].reporter) {
                            // 如果parent相等就累加，并且push 0  这里是根据一样的parent匹配
                            this.spanArr1[this.pos1] += 1;
                            this.spanArr1.push(0);
                        } else {
                            // 不相等push 1
                            this.spanArr1.push(1);
                            this.pos1 = i;
                        }
                    }
                }
            },
        },
        created() {
            this.getCaseProjectList();
            this.getIterationList();
            this.getUserList();
            this.getJiraProjectList();
            this.getRepoterList();
        },
        watch: {
            data: {
                handler() {
                    if (!this.data) return;
                    this.getSpanArr(this.data);
                    this.getSpanArr1(this.data);
                },
                deep: true,
                immediate: true
            }
        },
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

</style>