<template>
  <div class="app-container" v-loading="loading" element-loading-text="生成数据中" element-loading-spinner="el-icon-loading">

      <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
      <h2>数据构造</h2>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
          <el-form-item label="项目" :rules="[{ required: true, message: '项目不能为空'}]">
            <el-select v-model="formInline.project" placeholder="项目" style="width:100px;" @change="updateTypeList">
              <el-option
                v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="测试环境" :rules="[{ required: true, message: '环境不能为空'}]">
            <el-select v-model="formInline.env" placeholder="先选择项目" style="width:150px;" @change="updateGiftList">
              <el-option
                v-for="item in envList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select ref="select" v-model="formInline.type"  placeholder="先选择项目" style="width:150px;" @change="updateGiftTypeList">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="送礼方式" v-show="showType==1">
            <el-select ref="select" v-model="formInline.mode"  placeholder="请选择" style="width:150px;" @change="showTemplate">
              <el-option
                v-for="item in giftTypeList"
                :key="item.name"
                :label="item.name"
                :value="item.params"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="业务场景" v-show="showType4==1">
            <el-select ref="select" v-model="formInline.scene" placeholder="请选择" style="width:150px;" @change="updateSceneTpyeList">
              <el-option
                v-for="item in sceneList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="收益类型" v-show="showType4==1">
            <el-select ref="select" v-model="formInline.sceneType" value-key="name" placeholder="先选择业务场景" style="width:200px;" @change="sceneTemplate" filterable>
              <el-option
                v-for="item in sceneTpyeList"
                :key="item.name"
                :label="item.name"
                :value=item
              />
            </el-select>
          </el-form-item>
          <el-form-item label="场景" v-show="showType7==1">
            <el-select ref="select" v-model="batchForm.batchValue" value-key="name" placeholder="请选择" style="width:200px;" @change="batchTemplate">
              <el-option
                v-for="item in batchList"
                :key="item.name"
                :label="item.name"
                :value=item.value
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="autoLoading" v-show="showType3">生成数据</el-button>
          </el-form-item>

        </div>
      </el-form>
      <el-card class="box-card" v-show="showType1==1">
        <div id="overview">
          <p class="p-style"><span> 基础配置 </span></p>
          <el-form ref="dataForm" :model="formInline.mode"  inline>
            <el-form-item
                v-for="item in formInline.mode"
                :label="item.name"
                :key="item.key"
                :prop="item.key">
              <el-input v-model="autoForm[item.key]" placeholder="可不填" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item>
              <label class="el-form-item__label">人数</label>
              <el-input-number v-model="num" :min="1" oninput="if(value<1)value=1" style="width: 130px"></el-input-number>
            </el-form-item>
            <div>
            <el-form-item label="选择礼物">
              <el-select ref="select" v-model="autoForm.gid" placeholder="请选择" style="width:200px;" filterable clearable>
              <el-option
                v-for="item in giftList"
                :key="item.gid"
                :label="item.title"
                :value="item.gid"
              />
              </el-select>
            </el-form-item>
            </div>
          </el-form>
        </div>

      </el-card>
      <el-card class="box-card" v-show="showType2==1">
        <div id="overview1">
          <p class="p-style"><span> 聊天室会场·海选赛风云值 </span></p>
          <el-form :model="formInline">
            <el-form-item>
              <el-radio v-model="formInline.radio" label="1">素人用户</el-radio>
              <el-radio v-model="formInline.radio" label="2">公会用户</el-radio>
            </el-form-item>
            <el-form-item label="人数">
              <el-input-number v-model="num" :min="1" :max="200" oninput="if(value<1)value=1" style="width: 130px"></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" v-show="showType5==1">
        <div id="overview2">
          <p class="p-style"><span> 基础配置 </span></p>
          <el-form ref="Form" :model="sceneForm">
            <el-form-item>
              <el-radio v-model="sceneForm.userType" label="1">自动建号</el-radio>
              <el-radio v-model="sceneForm.userType" label="2">指定用户</el-radio>
            </el-form-item>
            <div v-if="this.sceneForm.userType === '1'">
              <el-form-item>
                <el-tag>男</el-tag>
                <el-checkbox v-model="sceneForm.isVip1" label="会员" border style="margin:0 0 0 20px;"></el-checkbox>
                <el-checkbox v-model="sceneForm.isReal1" label="真人认证" border style="margin:0 0 0 20px;"></el-checkbox>
                <el-tag type="danger" style="margin:0 0 0 40px;">女</el-tag>
                <el-checkbox v-model="sceneForm.isVip2" label="会员" border style="margin:0 0 0 20px;"></el-checkbox>
                <el-checkbox v-model="sceneForm.isReal2" label="真人认证" border style="margin:0 0 0 20px;"></el-checkbox>
              </el-form-item>
            </div>
            <div v-if="this.sceneForm.userType === '2'">
              <el-form-item label="男用户uuid">
                <el-input v-model="sceneForm.boyUuid" placeholder="男用户uuid" style="width: 200px" clearable></el-input>
                <label class="radio-label" style="color: #606266; margin:0 10px 0 20px;">女用户uuid</label>
                <el-input v-model="sceneForm.girlUuid" placeholder="女用户uuid" style="width: 200px" clearable></el-input>
              </el-form-item>
            </div>
            <div v-if="this.sceneForm.isGift != -1">
              <el-form-item label="选择礼物&数量">
                <el-select ref="select" v-model="sceneForm.giftId" placeholder="请选择" style="width:200px;" filterable clearable>
                  <el-option
                    v-for="item in giftList"
                    :key="item.gid"
                    :label="item.title"
                    :value="item.gid"
                  />
                </el-select>
                <el-input-number v-model="sceneForm.giftNum" :min="1" oninput="if(value<1)value=1" style="width: 130px"></el-input-number>
              </el-form-item>
            </div>
            <el-form-item label="执行次数">
              <el-input-number v-model="sceneForm.times" :min="1" oninput="if(value<1)value=1" style="width: 130px"></el-input-number>
              <label class="radio-label" style="color: #606266; margin:0 10px 10px 20px;">收益日期</label>
              <el-date-picker
                  v-model="sceneForm.date" style="width:220px"
                  type="datetime"
                  clearable
                  placeholder="可不指定日期"
                  value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-show="showType6==1">
              <span slot="label">
                <span style="color: #00c4ff;">执行结果：</span>
              </span>
            </el-form-item>
            <json-viewer v-show="showType6==1" :value="sceneResult" :expand-depth="5" boxed sort></json-viewer>
          </el-form>
        </div>
      </el-card>
      <el-card class="box-card" v-show="showType8==1">
        <div id="overview3">
          <p class="p-style"><span> 基础配置 </span></p>
          <el-form :model="batchForm">
            <div v-if="this.batchForm.batchValue === '1' || this.batchForm.batchValue === '2'">
              <el-form-item label="性别">
                <el-checkbox-group v-model="batchForm.sexList">
                  <el-checkbox label="男"></el-checkbox>
                  <el-tooltip class="item" effect="dark" content="男女一起勾选，则分别创建相应数量的房间" placement="right-end">
                    <el-checkbox label="女"></el-checkbox>
                  </el-tooltip>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div v-if="this.batchForm.batchValue === '2'">
              <el-form-item label="类型">
                <el-select v-model="batchForm.chatroom_type" placeholder="请选择房间类型" style="width:180px;" multiple collapse-tags>
                  <el-option
                    v-for="item in chatroomTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div v-if="this.batchForm.batchValue === '3' || this.batchForm.batchValue === '4'">
              <el-form-item label="uuid" >
                <el-input v-model="batchForm.uuid" placeholder="主播or房主uuid，多个用英文,隔开" style="width: 300px" clearable></el-input>
              </el-form-item>
            </div>
            <el-form-item label="数量">
              <el-input-number v-model="batchForm.num" :min="1" :max="200" oninput="if(value<1)value=1" style="width: 130px"></el-input-number>
            </el-form-item>
            <div v-if="this.batchForm.batchValue === '1' || this.batchForm.batchValue === '2'">
              <el-form-item label="房间在线人数">
                <el-input-number v-model="batchForm.online" :min="0" :max="200" oninput="if(value<0)value=0" style="width: 130px"></el-input-number>
              </el-form-item>
              <el-form-item label="当前已创建数量：">
                <div style="font-size: 15px;color: #08ef0c">{{createdNum}}</div>
                <el-popover
                  placement="right-end"
                  width="200"
                  v-model="visible">
                  <p>关闭所有批量创建的房间？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="close">确定</el-button>
                  </div>
                  <el-button slot="reference" :loading="autoLoading" type="danger" round>关闭所有</el-button>
                </el-popover>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
  </div>
</template>

<script>
  import { giftTypeList,createData,giftList,ceremonyCreateData,hwsjGiftList,hwsjCreateData,revenueTypeList,runScene,batchList,runBatch,getCreatedCount,closeRoom } from '@/api/testTool'

  export default {
    data() {
      return {
        autoForm: {
          receiver_uuid: '',
          family_uuid: '',
          chat_uuid: '',
          host_uuid:'',
          gid: '',
        },
        num: 10,
        projectList: [{
          value: '1',
          label: '他趣'
          },
          {
            value: '2',
            label: '海外'
          }
        ],
        projectList2: [
          {
            value: '2',
            label: '海外'
          }
        ],
        chatroomTypeList: [
            {
            value: '1',
            label: '多人语聊'
          },
            {
            value: '10',
            label: '心动语音'
          },
            {
            value: '12',
            label: '听歌k歌'
          },
            {
            value: '14',
            label: '关系速配'
          },
            {
            value: '19',
            label: '主题派对'
          },
            {
            value: '11',
            label: '视频相亲'
          },
            {
            value: '13',
            label: '大屏直播'
          },
        ],
        giftList: [],  //礼物列表
        envList: [],  //环境列表
        typeList: [],  //类型
        giftTypeList: [],  //送礼方式列表
        sceneList: [],  //业务场景
        sceneTpyeList: [],  //场景对应的收益类型
        allTpyeList: {},  //所有收益类型
        batchList: [],  //批量构造场景列表
        showType: 0,  //送礼方式
        showType1: 0,  //常规榜单送礼card
        showType2: 0,  //年度盛典card
        showType3: 0,  //生成数据按钮
        showType4: 0,  //收益场景
        showType5: 0,  //收益场景card
        showType6: 0,  //收益场景执行结果
        showType7: 0,  //批量构造场景列表
        showType8: 0,  //批量构造场景card
        autoLoading: false,
        visible: false,
        formInline: {
          project: '',
          type: '',
          mode: [],
          radio: '1',
          env: '',
          scene: '',  //业务场景
          sceneType: {},  //收益类型
        },
        batchForm: {
          batchValue: '',  //批量场景
          sexList: [],  //批量场景用户性别
          chatroom_type: [], //聊天室房间类型
          uuid: '', //主播/房主uuid
          num: 10, //数量
          team: '0', //主播是否为公会
          online: 0, //房间在线人数
        },
        createdNum: 0, //已创建数量
        sceneForm: {
          userType: '1',  //用户类型
          boyUuid: '',  //男用户
          girlUuid: '',  //女用户
          sex1: '男',  //性别
          isVip1: '',  //会员
          isReal1: '',  //真人
          sex2: '女',  //性别
          isVip2: '',  //会员
          isReal2: '',  //真人
          times: 1,  //次数
          date: '',  //收益日期
          giftId: '',  //礼物id
          giftNum: 1,  //礼物数量
          isGift: -1,  //是否为送礼
          func: '',  //场景函数名称
        },
        sceneResult: {},
        loading: false,
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        let gift_type = ''
        if (this.formInline.mode.length) {
          gift_type = this.formInline.mode[0]['type']
        }
        const params = {
          'params': this.autoForm,
          'user_num': this.num,
          'rank_type': this.formInline.type,
          'gift_type': gift_type,
          'user_type': this.formInline.radio,
          'env': this.formInline.env
          };
        // 他趣聊天室年度盛典（区分接口用于能效统计）
        if (this.formInline.project === '1' && this.formInline.type === '1') {
            console.log('年度')
            ceremonyCreateData(params).then((res) => {
            this.loading = false
            let {msg} = res;
            if (msg === 'success') {
                this.$alert('生成成功！', '结果', {
                  confirmButtonText: '确定'
              })
            } else {
                this.$alert('生成失败：'+msg, '结果', {
                  confirmButtonText: '确定'
              })
            }
          })
          // 他趣常规送礼
        } else if (this.formInline.project === '1' && this.formInline.type === '2') {
            console.log('常规')
            createData(params).then((res) => {
            this.loading = false
            let {msg} = res;
            if (msg === 'success') {
                this.$alert('生成成功！', '结果', {
                  confirmButtonText: '确定'
              })
            } else {
                this.$alert('生成失败：'+msg, '结果', {
                  confirmButtonText: '确定'
              })
            }
          })
        // 海外送礼
        } else if (this.formInline.project === '2' && this.formInline.type === '2') {
            console.log('常规')
            hwsjCreateData(params).then((res) => {
            this.loading = false
            let {msg} = res;
            if (msg === 'success') {
                this.$alert('生成成功！', '结果', {
                  confirmButtonText: '确定'
              })
            } else {
                this.$alert('生成失败：'+msg, '结果', {
                  confirmButtonText: '确定'
              })
            }
          })
        // 收益场景
        } else if (this.formInline.type === '3') {
            console.log('收益场景')
            if (this.sceneForm.userType === '2') {
              if (! this.sceneForm.boyUuid || ! this.sceneForm.girlUuid) {
                this.loading = false
                this.$message.error({
                  message: '指定用户uuid不能为空！！！',
                  center: true,
                })
                return
              }
            }
            const data = this.sceneForm
            data['project'] = this.formInline.project
            data['env'] = this.formInline.env
            runScene(data).then((res) => {
            this.loading = false
            let {msg,data} = res;
            if (msg === 'success') {
                //返回JSON数据
                this.showType6 = 1
                this.sceneResult = data
            } else {
                this.$alert('生成失败：'+msg, '结果', {
                  confirmButtonText: '确定'
              })
            }
          })
          // 批量构造
        } else if (this.formInline.type === '4') {
            console.log('批量构造')
            if (this.batchForm.batchValue === '1' || this.batchForm.batchValue === '2') {
              console.log(this.batchForm.chatroom_type.length)
              if (! this.batchForm.sexList.length) {
                this.loading = false
                this.$message.error({
                  message: '主播/房主性别不能为空！！！',
                  center: true,
                })
                return
              }
            }
            if (this.batchForm.batchValue === '2') {
              console.log(this.batchForm.chatroom_type.length)
              if (! this.batchForm.chatroom_type.length) {
                this.loading = false
                this.$message.error({
                  message: '聊天室房间类型不能为空！！！',
                  center: true,
                })
                return
              }
            }
            if (this.batchForm.batchValue === '3' || this.batchForm.batchValue === '4') {
              if (! this.batchForm.uuid) {
                this.loading = false
                this.$message.error({
                  message: '主播/房主uuid不能为空！！！',
                  center: true,
                })
                return
              }
            }
            const data = this.batchForm
            data['project'] = this.formInline.project
            data['env'] = this.formInline.env
            runBatch(data).then((res) => {
              this.loading = false
              let {msg,data} = res;
              if (msg === 'success') {
                  this.$message.success({
                    message: '成功创建'+data+'个！',
                    center: true,
                })
                  this.createdNum += data
              } else {
                  this.$alert('创建失败：'+msg, '结果', {
                    confirmButtonText: '确定'
                })
              }
          })
        }
      },
      updateTypeList() {
        if (this.formInline.project === '1') {
          this.envList = [{
              value: '新测试环境',
              label: '新测试环境'
            },
            {
              value: '新测试环境1',
              label: '新测试环境1'
          },
            {
              value: '新测试环境2',
              label: '新测试环境2'
          },
            {
              value: '新测试环境3',
              label: '新测试环境3'
          },
            {
              value: '新测试环境4',
              label: '新测试环境4'
          },
            {
              value: '新测试环境5',
              label: '新测试环境5'
          }]
          this.typeList = [{
              value: '1',
              label: '年度盛典'
            },
            {
              value: '2',
              label: '常规榜单'
          },
            {
              value: '4',
              label: '批量构造'
          }]
        } else if (this.formInline.project === '2') {
          this.envList = [{
              value: '测试1',
              label: '测试1'
          },
            {
              value: '测试2',
              label: '测试2'
          },
            {
              value: '测试3',
              label: '测试3'
          }]
          this.typeList = [{
            value: '2',
            label: '常规榜单'
          },{
            value: '3',
            label: '收益场景'
          },
          ]
        }
        this.formInline.env = ''
        this.formInline.type = ''
        this.showType = 0
        this.showType1 = 0
        this.showType3 = 0
        this.showType4 = 0
        this.showType5 = 0
        this.showType6 = 0
        this.showType7 = 0
        this.showType8 = 0
        this.formInline.mode = []
        this.autoForm = {
            receiver_uuid: '',
            family_uuid: '',
            chat_uuid: '',
            host_uuid:'',
            gid: '',
        }
      },
      updateGiftTypeList() {
        if (this.formInline.type === '2') {
          const params = {
            'project': this.formInline.project,
            };
          this.formInline.mode = []
          this.showType2 = 0
          this.showType = 1
          this.showType3 = 1
          this.showType4 = 0
          this.showType5 = 0
          this.showType6 = 0
          this.showType7 = 0
          this.showType8 = 0
          giftTypeList(params).then((res) => {
            let {msg, data} = res;
            if (msg === 'success') {
                this.giftTypeList = data

            } else {
                this.$message.error({
                    message: msg,
                    center: true,
                })
            }})
          } else if (this.formInline.type === '1') {
              this.num = 10
              this.showType = 0
              this.showType1 = 0
              this.showType2 = 1
              this.showType3 = 1
              this.showType4 = 0
              this.showType5 = 0
              this.showType6 = 0
              this.showType7 = 0
              this.showType8 = 0
          } else if (this.formInline.type === '3') {
              this.formInline.scene = ''
              this.formInline.sceneType = ''
              this.showType = 0
              this.showType1 = 0
              this.showType2 = 0
              this.showType3 = 1
              this.showType4 = 1
              this.showType5 = 0
              this.showType6 = 0
              const params = {
                'project': this.formInline.project,
                };
              revenueTypeList(params).then((res) => {
              let {msg, data} = res;
              if (msg === 'success') {
                  this.sceneList = data.scene
                  this.allTpyeList = data.type
              } else {
                  this.$message.error({
                      message: msg,
                      center: true,
                  })
              }})
          } else if (this.formInline.type === '4') {
              this.batchForm.num = 10
              this.batchForm.batchValue = ''
              this.showType = 0
              this.showType1 = 0
              this.showType2 = 0
              this.showType3 = 1
              this.showType7 = 1

              const params = {
                'project': this.formInline.project,
                };
              batchList(params).then((res) => {
                let {msg, data} = res;
                if (msg === 'success') {
                    this.batchList = data
                } else {
                    this.$message.error({
                        message: msg,
                        center: true,
                    })
                }})
          }
      },
      updateSceneTpyeList() {
        if (this.formInline.scene) {
          this.sceneTpyeList = this.allTpyeList[this.formInline.scene]
          this.formInline.sceneType = {}
          this.showType5 = 0
          this.showType6 = 0
        }
      },
      sceneTemplate() {
        this.sceneForm.func = this.formInline.sceneType.func
        this.sceneForm.isGift = this.formInline.sceneType.is_gift
        this.showType6 = 0
        this.showType5 = 1
        if (this.sceneForm.isGift != -1) {
          this.updateGiftList()
        }
      },
      showTemplate() {
        if (this.formInline.mode.length) {
          this.num = 10
          this.showType1 = 1
          this.autoForm = {
            receiver_uuid: '',
            family_uuid: '',
            chat_uuid: '',
            host_uuid:'',
            gid: '',
          }
          this.updateGiftList()
      }},
      // 下拉框自动脱焦
      visibleChange(flag) {
        if (flag) {
          this.$refs.select.focus()
        } else {
          this.$refs.select.blur()
        }
      },
      updateGiftList() {
        if (this.formInline.mode.length || this.sceneForm.isGift != -1) {
          let scene
          if (this.formInline.type === '3') {
            //收益获取礼物
            scene = this.sceneForm.isGift
          } else {
            //榜单获取礼物
            scene = this.formInline.mode[0]['type']
          }
          const params = {
              'env': this.formInline.env,
              'scene': scene
              };
          if (this.formInline.project === '1') {
              giftList(params).then((res) => {
                  let {msg, data} = res;
                  if (msg === 'success') {
                      this.giftList = data

                  } else {
                      this.$message.info({
                          message: '礼物列表获取失败' + msg,
                          center: true,
                      })
                  }})
              } else {
              hwsjGiftList(params).then((res) => {
                  let {msg, data} = res;
                  if (msg === 'success') {
                      this.giftList = data

                  } else {
                      this.$message.info({
                          message: '礼物列表获取失败' + msg,
                          center: true,
                      })
                  }})
              }
          }
          this.autoForm.gid = ''
          this.sceneForm.giftId = ''
      },
      batchTemplate() {
        if (this.batchForm.batchValue) {
          this.batchForm.uuid = ''
          this.batchForm.num = 10
          this.batchForm.online = 0
          this.showType8 = 1
          if (this.batchForm.batchValue==='1' || this.batchForm.batchValue==='2') {
            const params = {
                'status': this.batchForm.batchValue,
            };
            getCreatedCount(params).then((res) => {
                  let {msg, data} = res;
                  if (msg === 'success') {
                      this.createdNum = data
                  }})
          }
      }},
      close(){
        const params = {
          'batchValue': this.batchForm.batchValue,
        }
        this.visible = false
        this.autoLoading = true
        closeRoom(params).then((res) => {
          let {msg} = res;
          this.autoLoading = false
          if (msg === 'success') {
              this.$message.success({
                  message: '关闭成功',
                  center: true,
              })
              this.createdNum = 0
          } else {
              this.$message.error({
                  message: '接口异常：' + msg,
                  center: true,
              })
          }
      })
      },
    }
  }
</script>
<style>
.p-style {
    padding: 3px 5px;
    font-size: 16px;
    border-radius: 0;
    border-left: 4px solid #409EFF;
    margin: 5px 5px 10px 5px;
}

</style>