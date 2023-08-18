<template>

    <div class="app-container">
        <aside>
            说明：左边上传渠道配置文件 ，右边邮件黏贴邮件渠道部分内容
        </aside>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-upload
                            class="upload-demo"
                            drag
                            ref="upload"
                            action=""
                            :http-request="checkSetting1"
                            :auto-upload="false"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em> <br/>只能上传txt文件</div>
                        <div class="el-upload__tip" slot="tip"></div>
                    </el-upload>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-input
                            type="textarea"
                            :rows="8"
                            placeholder="把邮件上的打包内容复制进来"
                            v-model="mailTxt">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="checkSetting">检查配置</el-button>
        <el-table :data="resultList" style="width: 100%" v-show="vShowType==1" :row-style="setRowStyle">
            <el-table-column prop="index1" label="类型" width="180"></el-table-column>
            <el-table-column prop="index2" label="对比结果" width="180">
                <!--                <template align="center" slot-scope="scope">-->
                <!--                    <span :style="{color:scope.row.index2/success ==2?'red':''}">{{scope.row.index2}}</span>-->
                <!--                </template>-->
            </el-table-column>
            <el-table-column prop="index3" label="缺失包"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {
        checkChannelSet,

    } from '@/api/testTool'

    export default {
        name: 'CountQuality',
        data() {
            return {
                mailTxt: '',
                vShowType: 0,
                resultList: []
            }
        },
        methods: {
            checkSetting1(params) {
                var FileExt = params.file.name.split('.')[1]
                var file_type = ['txt'].indexOf(FileExt) === -1
                //拿到上传的文件的格式，限制上传的文件格式
                if (file_type) {
                    this.$message({
                        type: 'warning',
                        message: '请上传后缀名为txt的文件'
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
                formdata.append('mailTxt', this.mailTxt)
                checkChannelSet(formdata).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        this.vShowType = 1
                        this.resultList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            checkSetting() {
                this.$refs.upload.submit()

            },
            setRowStyle(row) {
                if (row.row.index2 == 'fail') {
                    let styleJson = {
                        'color':'red'
                    };
                    return styleJson
                }else{
                    let styleJson = {
                        'color':'green'
                    };
                    return styleJson
                }
            },

        },

    }
</script>

<style>


</style>