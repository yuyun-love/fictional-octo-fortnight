<template>
    <div class="app-container">
        <div style="height:70px">
            <el-row>
                <!--            <ProjectOption v-model="projectname" @change="testchange"/>-->
                <label class="radio-label">项目: </label>
                <el-select v-model="projectname" style="width:110px;" @change="projectchange">
                    <el-option
                            v-for="item in projectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                    />
                </el-select>
                <label class="radio-label" v-show="vShowEnv==1">环境: </label>
                <el-select v-model="envname" style="width:110px;" v-show="vShowEnv1==1">
                    <el-option
                            v-for="item in envOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                    />
                </el-select>
                <!--            <EnvOption v-model="envname"/>-->
                <CountryCodeOption v-model="countrycode" v-show="vShowCountry==1"/>
                <el-checkbox v-model="isVip" label="会员" border
                             style="margin:0 0 20px 20px;" v-show="vShowVip==1"></el-checkbox>
                <el-tooltip class="item" effect="dark" content="真人认证因腾讯自动鉴别服务时间较久（4-5秒），会比较慢" placement="right-start">
                    <el-checkbox v-model="isReal" label="真人认证" border
                                 style="margin:0 0 20px 20px;" v-show="vShowReal==1"></el-checkbox></el-tooltip>
                <CallHostOption v-model="callhost" v-show="vShowCall==1"/>
                <ChatHostOption v-model="chathost" v-show="vShowChat==1"/>
                <HostOption v-model="host" v-show="vShowHost==1"/>
                <label class="radio-label"  v-show="projectname=='海外'">金币: </label>
                <el-input v-model="coinNum"  placeholder="金币数" v-show="projectname=='海外'" style="width: 90px" ></el-input>
                <label class="radio-label"  v-show="projectname=='海外'" >钻石: </label>
                <el-input v-model="diamondNum"  placeholder="钻石数" v-show="projectname=='海外'" style="width: 90px" min="0" max="10000"></el-input>
                </el-row>
                </div>
        <div style="height:70px">
            <el-row style="height:70px">
                <el-checkbox v-model="isGuilder" label="公会长" border
                             style="margin:0 0 20px 30px;" v-show="vIsGuilder==1"></el-checkbox>
                <el-checkbox v-model="isChatPartyHost" label="聊天室主播" border
                             style="margin:0 0 20px 30px;" v-show="vIsChatPartyHost==1"></el-checkbox>
                <label class="radio-label"  v-show="projectname=='海外'" >有效开房天数: </label>
                <el-tooltip class="item" effect="dark" content="单位：天" placement="right-start">
                    <el-input v-model="validOpenPartyDays"  placeholder="有效开房天数" v-show="projectname=='海外'" type="number" style="width: 135px" min="0" max="10000"></el-input></el-tooltip>
                <label class="radio-label"  v-show="projectname=='海外'" >有效上麦时长: </label>
                <el-tooltip class="item" effect="dark" content="单位：秒" placement="right-start">
                    <el-input v-model="validOnMikeDuration"  placeholder="有效上麦时长" v-show="projectname=='海外'" type="number" style="width: 135px" min="0" max="10000"></el-input></el-tooltip>
            </el-row>
        </div>
        <div style="height:70px">
            <el-row>
                <label class="radio-label" v-show="vShowGender==1">性别: </label>
                <el-radio-group v-model="gender" style="margin:-4px 0px 0px 0px;" v-show="vShowGender1==1">
                    <el-radio-button label="男"></el-radio-button>
                    <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
                <label class="radio-label" v-show="vShowChat==1">家族uuid: </label>
                <el-input v-model="familyId" style="width:200px;" placeholder="请输入家族uuid" v-show="vShowChat==1"></el-input>
<!--                <el-checkbox v-model="isFamily" label="创建家族" border-->
<!--                             style="margin:0 0 20px 20px;" v-show="vShowChat==1"></el-checkbox>-->
                <label class="radio-label">数量: </label>
                <el-input-number v-model="num" style="width:130px;" :min="1" :max="1000" label="描述文字"></el-input-number>
                <el-button type="primary" style="margin:0 0 20px 20px;" :loading="autoLoading"
                               @click="autoCreateAccount">
                        开始创建
                </el-button>
            </el-row>
        </div>
        <div>
            <el-row style="margin-bottom:1px;" v-for="(itm, idx) in dataList" :key="idx" >
              <label class="radio-label" v-show="projectname=='海外'">奖励类型: </label>
              <el-select v-model="itm.dressingType" v-show="projectname=='海外'" style="width:100px;height:70px" :data-idx="idx" @change="DressingType($event, idx)">
                  <el-option
                          v-for="item in dressingOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :disabled="item.disabled"
                  />
              </el-select>

              <label class="radio-label" v-show="projectname=='海外'">奖励id: </label>
              <el-select v-model="itm.dressingUuid" v-show="projectname=='海外'" style="width:100px;height:70px" >
                  <el-option
                          v-for="item in idList"
                          :key="item"
                          :label="item"
                          :value="item"
                  />
              </el-select>

              <label class="radio-label" v-show="projectname=='海外'">有效天数: </label>
              <el-input v-model="itm.validPeriod"  v-show="projectname=='海外'" style="width:100px;height:70px" :disabled="itm.forever"></el-input>
              <el-checkbox v-model="itm.forever" v-show="projectname=='海外'" label="永久" border style="margin:0 0 20px 20px;" ></el-checkbox>

              <el-button type="primary" icon="el-icon-plus" v-show="projectname=='海外'" circle style="margin-left: 20px" v-if="idx == dataList.length -1" @click="add"></el-button>
              <el-button type="primary" icon="el-icon-minus" v-show="projectname=='海外'" circle style="margin-left: 20px" v-if="dataList.length > 1 && idx != dataList.length " @click="reduce(idx)"></el-button>

            </el-row>
        </div>

        <el-table :data="accountsList.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column v-for="item in tableTittleList" :show-overflow-tooltip="true" :prop="item.prop"
                             :width="item.width" :label="item.title" sortable show-overflow-tooltip>
            </el-table-column>
            <el-popover  >
              <el-button slot="reference"></el-button>
            </el-popover>


        </el-table>
        <div class="block" style="margin-top:15px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[1,5,10,20,30]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="accountsList.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    // options components

    // import ProjectOption from '../components/ProjectOption'
    import CountryCodeOption from '../components/CountryCodeOption'
    // import EnvOption from '../components/EnvOption'
    import {autoCreateAccounts, getAccounts, getlistRewardId} from '@/api/testTool'
    // import CallHost from "@/views/components/CallHostOption";
    import CallHostOption from "@/views/components/CallHostOption";
    import ChatHostOption from "@/views/components/ChatHostOption";
    import HostOption from "@/views/components/HostOption";
    import {getCaseProjects} from "@/api/qualityStat";

    export default {
        name: 'AutoCreateRole',
        components: {HostOption, ChatHostOption, CallHostOption, CountryCodeOption},
        props: {
            value: {
                type: String,
                default: '海外'
            }
        },
        data() {
            return {
                projectname: '海外',
                countrycode: '🇨🇳 中国(86)',
                envname: '测试1',
                isVip: true,
                isReal: false,
                num: 1,
                isGuilder: false,
                isChatPartyHost: false,
                autoLoading: false,
                accountsList: [],
                tableTittleList: this.GLOBAL.hwTableList,
                listLoading: true,
                gender: '男',
                projectOptions: this.GLOBAL.projectList,
                envOptions: this.GLOBAL.envList,
                callhost: '',
                chathost: '',
                host: '',
                familyId:'',
                isFamily:'',
                vShowEnv: 1,
                vShowEnv1: 1,
                vShowCountry: 1,
                vShowVip: 1,
                vShowReal: 1,
                vShowCall: 0,
                vShowChat: 0,
                vShowGender: 1,
                vShowGender1: 1,
                vShowHost: 0,
                currentPage: 1,
                pageSize: 30,
                coinNum: 0,
                diamondNum: 0,
                dataList: [
                  {
                    dressingType: null,
                    dressingUuid: null,
                    forever: null,
                    validPeriod: null
                  }
                ],
                dressingOptions: [
                  {
                    label: '座驾',
                    value: 1
                  },
                  {
                    label: '头像框',
                    value: 2
                  },
                  {
                    label: '称号',
                    value: 3
                  },
                  {
                    label: '勋章',
                    value: 4
                  },
                  // {
                  //   value: '礼物',
                  //   key: 5
                  // },
                  {
                    label: '聊天室背景',
                    value: 6
                  }
                ],
              idList:[],
              vIsGuilder: 1,
              validOpenPartyDays: 0,
              validOnMikeDuration: 0,
              vIsChatPartyHost: 1
            }
        },

        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            },
            autoCreateAccount() {
                const params = {
                    'project': this.projectname,
                    'countryCode': this.countrycode,
                    'env': this.envname,
                    'isVip': this.isVip,
                    'isReal': this.isReal,
                    'isGuilder': this.isGuilder,
                    'validOpenPartyDays': this.validOpenPartyDays,
                    'validOnMikeDuration': this.validOnMikeDuration,
                    'isChatPartyHost': this.isChatPartyHost,
                    'num': this.num,
                    'gender': this.gender,
                    'callhost': this.callhost,
                    'chathost': this.chathost,
                    'host': this.host,
                    'familyId':this.familyId,
                    'isFamily':this.isFamily,
                    'coinNum':this.coinNum,
                    'diamondNum':this.diamondNum,
                    'rewardList':JSON.stringify(this.dataList)

                };
                this.autoLoading = true
                console.log()
                autoCreateAccounts(params).then(response => {
                    this.autoLoading = false
                    let {msg, code} = response;
                    if (code == '20000' && msg == 'success') {
                        this.$message({
                            message: '自动创建账号成功',
                            type: 'success'
                        });
                        this.getProjectList();
                    } else {
                        this.$message.error({
                            message: msg,
                            center: true,
                        })
                    }
                    // this.list = response.data

                })
            },
            // 获取项目列表
            getProjectList() {
                this.listLoading = true;
                let self = this;
                const params = {
                    'project': this.projectname
                };
                getAccounts(params).then((res) => {
                    self.listLoading = false;
                    let {code, data} = res;
                    if (code == '20000') {
                        if (this.projectname == '海外') {
                            self.tableTittleList = this.GLOBAL.hwTableList
                        } else if (this.projectname == '配配') {
                            self.tableTittleList = this.GLOBAL.ppTableList
                        } else if (this.projectname == '海外金融') {
                            self.tableTittleList = this.GLOBAL.fcashTableList
                        } else if (this.projectname == '他趣') {
                            self.tableTittleList = this.GLOBAL.tqTableList
                        }
                        self.accountsList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },
            projectchange() {
                if (this.projectname == '海外金融') {
                    this.envOptions = this.GLOBAL.envListMx,
                        this.envname = '正常包',
                        this.vShowEnv = 1,
                        this.vShowEnv1 = 1,
                        this.vShowCountry = 0,
                        this.vShowVip = 0,
                        this.vShowReal = 0,
                        this.vShowCall = 0,
                        this.vShowChat = 0,
                        this.vShowGender = 0,
                        this.vShowGender1 = 0,
                        this.vShowHost = 0
                        this.vIsGuilder = 0,
                        this.vIsChatPartyHost = 0
                }
                if (this.projectname == '海外') {
                    this.envOptions = this.GLOBAL.envList,
                        this.envname = '测试1',
                        this.vShowEnv = 1,
                        this.vShowEnv1 = 1,
                        this.vShowCountry = 1,
                        this.vShowVip = 1,
                        this.vShowReal = 1,
                        this.vShowGender = 1,
                        this.vShowGender1 = 1,
                        this.vShowCall = 0,
                        this.vShowChat = 0,
                        this.vShowHost = 0,
                        this.vIsGuilder = 1,
                        this.vIsChatPartyHost = 1
                }
                
                if (this.projectname == '配配') {
                    this.envOptions = this.GLOBAL.envList,
                        this.envname = '测试1',
                        this.vShowEnv = 1,
                        this.vShowEnv1 = 1,
                        this.vShowCountry = 1,
                        this.vShowVip = 1,
                        this.vShowReal = 1,
                        this.vShowGender = 1,
                        this.vShowGender1 = 1,
                        this.vShowCall = 0,
                        this.vShowChat = 0,
                        this.vShowHost = 0,
                        this.vIsGuilder = 0,
                        this.vIsChatPartyHost = 0
                }
                if (this.projectname == '他趣') {
                    this.vShowEnv = 0,
                        this.vShowEnv1 = 0,
                        this.vShowCountry = 0,
                        this.vShowVip = 0,
                        this.vShowReal = 0,
                        this.vShowGender = 0,
                        this.vShowGender1 = 0,
                        this.vShowCall = 1,
                        this.vShowChat = 1,
                        this.vShowHost = 1,
                        this.vIsGuilder = 0,
                        this.vIsChatPartyHost = 0
                }
                this.getProjectList();
            },
          //获取奖励id
            getlistRewardId(e) {
              console.info(e)
                let self = this;
                const params = {
                    'dressingOptions': e,
                    'env':this.envname
                };
                getlistRewardId(params).then((res) => {
                    let {code, data} = res;
                    if (code == '20000') {
                        self.idList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })

            },

            add() {
              this.dataList.push({
                dressingType: null,
                dressingUuid: null,
                forever: null,
                validPeriod: null
              })
              this.idList.push([
                {
                  value: 2,
                  label: 'id2'
                }
              ])
            },

          reduce(idx) {
            this.dataList.splice(idx, 1)
            this.idList.splice(idx, 1)

          },

          DressingType(e, idx) {
              console.log(e, idx)
              this.getlistRewardId(e)
           },


        },
        mounted() {
           this.getProjectList();
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

    .el-row {
        margin-bottom: 20px;

    }
    :last-child {
        margin-bottom: 0;
    }
</style>
