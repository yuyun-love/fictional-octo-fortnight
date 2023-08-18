<template>

    <div class="app-container">
        <aside>
            说明：1.先上传埋点接口的charles抓包文件（只支持har文件） ，然后手动填入埋点预期值 <br/>
            2.事件名称按照格式key:value格式输入，如果多个以逗号分割，如：key1:value1,key2:value2
        </aside>
        <div class="grid-content bg-purple">

        </div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action=""
                        :http-request="checkSetting1"
                        :auto-upload="false"
                        multiple>
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传har抓包文件</div>
                </el-upload>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px"
                         class="demo-dynamic">
                    <el-form-item
                            v-for="(domain, index) in dynamicValidateForm.domains"
                            :label="'埋点名称' + index"
                            :key="domain.key"
                            :prop="'domains.' + index + '.value'"
                            :inline="true">
                        <el-col :span="3.5">
                            <el-input v-model="domain.event_id" id="input2"></el-input>
                        </el-col>
                        <el-col :span="9.5">
                            <el-input v-model="domain.eventValue" id="input3">
                                <template slot="prepend">事件属性</template>
                            </el-input>
                        </el-col>
                        <el-col :span="0.7">
                            <el-button icon="el-icon-plus" type="primary" @click="addDomain" circle
                                       v-show="index==dynamicValidateForm.domains.length-1"></el-button>
                        </el-col>
                        <el-col :span="1">
                            <el-button icon="el-icon-minus" type="danger" circle @click.prevent="removeDomain(domain)"
                                       v-show="index!=dynamicValidateForm.domains.length"></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="checkSetting" :loading="autoLoading">提交</el-button>
<!--                        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!--        <el-button style="margin-left: 10px;" size="small" type="success" @click="checkSetting">检查配置</el-button>-->
        <el-table :data="resultList" style="width: 100%" v-show="vShowType==1" :row-style="setRowStyle"
                  :span-method="arraySpanMethod" border>
            <el-table-column prop="eventId" label="埋点名称" width="240"></el-table-column>
            <el-table-column prop="contentKey" label="事件key" width="240"></el-table-column>
            <el-table-column prop="contentValue" label="事件value" width="240"></el-table-column>
            <el-table-column prop="result" label="对比结果" :formatter="formatter"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {trackCheck} from '@/api/testTool'

    export default {
        name: 'CountQuality',
        data() {
            return {
                mailTxt: '',
                vShowType: 0,
                resultList: [],
                autoLoading: false,
                dynamicValidateForm: {
                    domains: [{
                        event_id: '',
                        eventValue: ''
                    }]
                }
            }
        },
        methods: {
            checkSetting1(params) {
                var FileExt = params.file.name.split('.')[1]
                var file_type = ['har'].indexOf(FileExt) === -1
                //拿到上传的文件的格式，限制上传的文件格式
                if (file_type) {
                    this.$message({
                        type: 'warning',
                        message: '请上传后缀名为har的文件'
                    })
                    return
                }
                const isLt2M = params.file.size / 1024 / 1024 < 10
                //限制上传的文件大小
                if (!isLt2M) {
                    this.$message.warning('上传的文件大小不能超过10MB')
                    return
                }
                var formdata = new FormData()
                formdata.append('file', params.file)
                formdata.append('trackExpectData', JSON.stringify(this.dynamicValidateForm.domains))

                this.autoLoading = true
                trackCheck(formdata).then((res) => {
                    this.autoLoading = false
                    let {code, message, data} = res;
                    this.getSpanArr(data)
                    if (code == '20000') {
                        this.vShowType = 1
                        this.resultList = data
                    } else {
                        this.$message.error({
                            message: message,
                            center: true,
                        })
                    }
                })
            },
            checkSetting() {
                this.$refs.upload.submit()

            },
            setRowStyle(row) {
                if (row.row.result == 0) {
                    // row.row.result='命中0次'
                    let styleJson = {
                        'color': 'red'
                    };
                    return styleJson
                } else {
                    // row.row.result='命中'+JSON.stringify(row.row.result)+'次'
                    let styleJson = {
                        'color': 'green'
                    };
                    return styleJson
                }
            },
            formatter(row) {
                if (row.result == 0) {
                    return '未命中'
                } else {
                    return '命中' + row.result.toString() + '次';
                }

            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    event_id: '',
                    eventValue: ''
                });
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
                        if (data[i].eventId === data[i - 1].eventId) {
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

        },
        watch: {
            data: {
                handler() {
                    if (!this.data) return;
                    this.getSpanArr(this.data);
                },
                deep: true,
                immediate: true
            }
        },

    }
</script>

<style>
    #input2 {
        min-height: 30px;
        margin: 0px;
        width: 200px;
    }

    #input3 {
        min-height: 30px;
        margin: 0px;
        width: 650px;
    }

    .el-row {
        margin-bottom: 40px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
</style>