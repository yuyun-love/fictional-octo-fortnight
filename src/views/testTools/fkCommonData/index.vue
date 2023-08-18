<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="通用造数据场景" name="first">
        <div class="app-container" v-loading="loading" element-loading-text="生成数据中"
             element-loading-spinner="el-icon-loading">
          <aside>
            说明：造数场景目前只支持他趣app，其他app账号暂未接入
            工具不满足使用需求可以找超斌提需求修改
          </aside>
          <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
          <h2>数据构造</h2>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <div>
              <el-form-item label="造数场景" :rules="[{ required: true, message: '场景不能为空'}]">
                <el-select v-model="formInline.project" multiple reserve-keyword filterable clearable collapse-tags
                           placeholder="选择场景" style="width:160px;"
                           @change="updateTypeList">
                  <el-option
                      v-for="item in projectList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="autoLoading">生成数据</el-button>
              </el-form-item>
            </div>
          </el-form>
          <el-card class="box-card" v-show="showType1==1">
            <div>
              <p class="p-style"><span> 发送私信 </span></p>
              <el-form ref="dataForm" :model="commonFormInline.mobile" inline>
                <el-form-item label="发送方手机号">
                  <el-input v-model="commonFormInline.mobile" placeholder="多个手机号用,隔开"></el-input>
                </el-form-item>
                <el-form-item>
                  <label class="el-form-item__label">随机发送人数</label>
                  <el-input-number v-model="commonFormInline.mobile_num" :min="0"
                                   style="width: 130px"></el-input-number>
                </el-form-item>
                <el-form-item label="关注（关注后不付费，不关注需要保证账号有充足趣币）">
                  <el-checkbox v-model="commonFormInline.msg_type" label="互相关注" border
                             style="margin:0 0 20px 30px;"></el-checkbox>
                </el-form-item>
                <div>
                  <el-form-item label="接收方uuid">
                    <el-input v-model="commonFormInline.receiver_uuid" placeholder="多个手机号用,隔开"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">随机接收人数</label>
                    <el-input-number v-model="commonFormInline.user_num" :min="0"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="发送文本">
                    <el-input v-model="commonFormInline.content" placeholder="请输入发送文本，可为空"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">发送次数（最大100）</label>
                    <el-input-number v-model="commonFormInline.num" :min="1" :max="100"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType2==2">
            <div>
              <p class="p-style"><span> 发送家族消息 </span></p>
              <el-form ref="dataForm" :model="commonFormInline.mobile" inline>
                <el-form-item label="发送方手机号">
                  <el-input v-model="commonFormInline.mobile" placeholder="多个手机号用,隔开"></el-input>
                </el-form-item>
                <el-form-item>
                  <label class="el-form-item__label">随机发送人数</label>
                  <el-input-number v-model="commonFormInline.mobile_num" :min="1" oninput="if(value<1)value=1"
                                   style="width: 130px"></el-input-number>
                </el-form-item>
                <div>
                  <el-form-item label="发送文本">
                    <el-input v-model="commonFormInline.content" placeholder="请输入发送文本，可为空"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">发送次数</label>
                    <el-input-number v-model="commonFormInline.num" :min="1" oninput="if(value<1)value=1"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType3==3">
            <div>
              <p class="p-style"><span> 添加关注 </span></p>
              <el-form ref="dataForm" :model="commonFormInline.mobile" inline>
                <el-form-item label="关注人手机号">
                  <el-input v-model="commonFormInline.mobile" placeholder="输入手机号"></el-input>
                </el-form-item>
                <div>
                  <el-form-item label="被关注人uuid">
                    <el-input v-model="commonFormInline.receiver_uuid" placeholder="请输入发送文本，可为空"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">随机关注人数</label>
                    <el-input-number v-model="commonFormInline.num" :min="1" oninput="if(value<1)value=1"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType4==4">
            <div>
              <p class="p-style"><span> 私信送礼 </span></p>
              <el-form ref="dataForm" :model="commonFormInline.mobile" inline>
                <el-form-item label="送礼人手机号">
                  <el-input v-model="commonFormInline.mobile" placeholder="输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="选择礼物">
                  <el-select ref="select" v-model="autoForm.gid" placeholder="送礼物需心动等级，心动等级0只能送礼物点亮" style="width:400px;" filterable>
                    <el-option
                        v-for="item in msg_giftList"
                        :key="item.gid"
                        :label="item.title"
                        :value="item.gid"
                    />
                  </el-select>
                </el-form-item>
                <div>
                  <el-form-item label="接收人uuid">
                    <el-input v-model="commonFormInline.receiver_uuid" placeholder="请输入发送文本，可为空"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">送礼次数</label>
                    <el-input-number v-model="commonFormInline.num" :min="1" oninput="if(value<1)value=1"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType5==5">
            <div>
              <p class="p-style"><span> 家族送礼 </span></p>
              <el-form ref="dataForm" :model="commonFormInline.mobile" inline>
                <el-form-item label="送礼人手机号">
                  <el-input v-model="commonFormInline.mobile" placeholder="输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="家族uuid">
                  <el-input v-model="commonFormInline.family_uuid" placeholder="输入家族uuid"></el-input>
                </el-form-item>
                <el-form-item label="选择礼物">
                  <el-select ref="select" v-model="autoForm.gid" placeholder="请选择" style="width:200px;" filterable>
                    <el-option
                        v-for="item in family_giftList"
                        :key="item.gid"
                        :label="item.title"
                        :value="item.gid"
                    />
                  </el-select>
                </el-form-item>
                <div>
                  <el-form-item label="接收人uuid">
                    <el-input v-model="commonFormInline.receiver_uuid" placeholder="请输入发送文本，可为空"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">送礼次数</label>
                    <el-input-number v-model="commonFormInline.num" :min="1" oninput="if(value<1)value=1"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType6==6">
            <div>
              <p class="p-style"><span> 直播间送礼 </span></p>
              <el-form ref="dataForm" :model="commonFormInline.mobile" inline>
                <el-form-item label="送礼人手机号">
                  <el-input v-model="commonFormInline.mobile" placeholder="输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="选择礼物">
                  <el-select ref="select" v-model="autoForm.gid" placeholder="请选择" style="width:200px;" filterable>
                    <el-option
                        v-for="item in liveGiftList"
                        :key="item.gid"
                        :label="item.title"
                        :value="item.gid"
                    />
                  </el-select>
                </el-form-item>
                <div>
                  <el-form-item label="直播间uuid">
                    <el-input v-model="commonFormInline.receiver_uuid" placeholder="直播间uuid"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">送礼次数</label>
                    <el-input-number v-model="commonFormInline.num" :min="1" oninput="if(value<1)value=1"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType7==7">
            <div>
              <p class="p-style"><span> 聊天室送礼 </span></p>
              <el-form ref="dataForm" :model="commonFormInline.mobile" inline>
                <el-form-item label="送礼人手机号">
                  <el-input v-model="commonFormInline.mobile" placeholder="输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="选择礼物">
                  <el-select ref="select" v-model="autoForm.gid" placeholder="请选择" style="width:200px;" filterable>
                    <el-option
                        v-for="item in chatGiftList"
                        :key="item.gid"
                        :label="item.title"
                        :value="item.gid"
                    />
                  </el-select>
                </el-form-item>
                <div>
                  <el-form-item label="聊天室uuid">
                    <el-input v-model="commonFormInline.receiver_uuid" placeholder="聊天室uuid"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <label class="el-form-item__label">送礼次数</label>
                    <el-input-number v-model="commonFormInline.num" :min="1" oninput="if(value<1)value=1"
                                     style="width: 130px"></el-input-number>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType8==8">
            <div id="overview">
              <p class="p-style"><span> 他趣首充状态标记 </span></p>
              <el-form ref="dataForm" inline>
                <div>
                  <el-form-item label="需要标记的uuid">
                    <el-input v-model="sign.uuid" placeholder="请输入需要标记的uuid：多个用,隔开 " style="width:300px;"></el-input>
                  </el-form-item>
                  <el-form-item label="需要标记的状态">
                    <el-select ref="select" v-model="sign.ck" placeholder="请选择需要标记的状态" style="width:200px;" filterable>
                      <el-option
                          v-for="item in sign_choice"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </div>
              </el-form>
            </div>

          </el-card>
          <el-card class="box-card" v-show="showType9==9">
              <div>
                <p class="p-style"><span> 真人认证 </span></p>
                <el-form ref="dataForm" :rules="rules" :model="formInlineHwsj" inline>
                      <el-form-item label="项目" :rules="[{ required: true, message: '项目不能为空'}]">
                        <el-select ref="select" v-model="formInlineHwsj.hwsj_project" placeholder="项目" style="width:100px;" filterable @change="updateReal">
                          <el-option
                            v-for="item in projectList1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="海外社交测试环境"  :rules="[{ required: true, message: '环境不能为空'}]" v-show="showHwsjType==1">
                          <el-select ref="select" v-model="formInlineHwsj.hwsj_env" placeholder="选择环境"  style="width:200px;" filterable >
                              <el-option
                                      v-for="item in envListHwsj"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"
                              />
                          </el-select>
                      </el-form-item>
                      <el-form-item label="用户Uuid" required>
                          <el-input v-model="formInlineHwsj.hwsj_user_uuid"  placeholder="输入用户uuid"></el-input>
                      </el-form-item>

                      <el-form-item label="真实姓名" required v-show="show_real_name==1">
                          <el-input v-model="formInlineHwsj.hwsj_real_name"  placeholder="测试"></el-input>
                      </el-form-item>

                      <el-form-item label="真人头像" required v-show="show_real_photo==1">
                          <el-input v-model="formInlineHwsj.hwsj_real_photo"  placeholder="cn.taqu.test_iOS_avatar_115_1687243420576_10874_0.jpg"></el-input>
                      </el-form-item>

                      <el-form-item label="身份证号" required v-show="show_identity_no==1">
                          <el-input v-model="formInlineHwsj.hwsj_identity_no"  placeholder="110103199604033000"></el-input>
                      </el-form-item>

                      <el-form-item label="提现账号" required v-show="show_reward_account==1">
                          <el-input v-model="formInlineHwsj.hwsj_reward_account"  placeholder="1436805666"></el-input>
                      </el-form-item>

                  </el-form>

              </div>
          </el-card>

        </div>
      </el-tab-pane>
      <el-tab-pane label="通用接口造数据工具" name="second">
        <div class="app-container" v-loading="loading" element-loading-text="生成数据中"
             element-loading-spinner="el-icon-loading">
          <aside>
            说明：
          </aside>
          <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
          <h2>造数接口构造</h2>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-select v-model="autoForm_api_1" multiple reserve-keyword filterable clearable collapse-tags
                       placeholder="请选择" @change="updeteShowTypeList">
              <el-option
                  v-for="item in sceneList"
                  :key="item.scene"
                  :label="item.scene"
                  :value="item.params.id">
              </el-option>
            </el-select>

            <el-dialog title="编辑场景" :visible.sync="dialogVisible">
              <aside>
                说明：请求data可以使用$img_url来代替图片地址，使用$randon来替代随机数,$ticket_id来替换ticket_id,$json来替换参数中json字符串;场景名称前缀需要添加应用名称来区分场景举例：他趣修改昵称、配配修改昵称
              </aside>
              <el-form :model="form_api" :rules="rules" ref="form" style="margin-bottom: 20px" :inline="true">
                <el-form-item label="应用" style="margin-bottom: 20px" required>
                </el-form-item>
                <el-select v-model="form_api.app" clearable
                           filterable>
                  <el-option
                      v-for="item in appList"
                      :key="item.value"
                      :label="item.value"
                      :value=item.value>
                  </el-option>
                </el-select>
                <div>
                  <el-form-item label="场景名称:" prop="name">
                    <el-input class="input" v-model="form_api.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="造数据请求url:" prop="url" style="margin-bottom: 20px">
                    <el-input class="input" id="input1" v-model="form_api.url" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="造数据请求data:" prop="data" style="margin-bottom: 20px">
                    <el-input type="textarea" class="input" id="input1" v-model="form_api.data"
                              autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="参数中含有json数据:" style="margin-bottom: 20px">
                    <el-input type="textarea" class="input" id="input1" v-model="form_api.json"
                              autocomplete="off"></el-input>
                  </el-form-item>
                </div>

              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="debugCreatScene('form')">调 试</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitEditScene('form')">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="primary" @click="onSubmitCreatScene">批量造数据</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">添加场景</el-button>
            <el-button type="primary" @click="editScene">编辑</el-button>
            <el-dialog title="添加场景" :visible.sync="dialogFormVisible">
              <aside>
                说明：请求data可以使用$img_url来代替图片地址，使用$randon来替代随机数,$ticket_id来替换ticket_id,$json来替换参数中json字符串;场景名称前缀需要添加应用名称来区分场景举例：他趣修改昵称、配配修改昵称
              </aside>
              <el-row>
                <el-row>
                  <el-form-item label="应用" style="margin-bottom: 20px" required>
                  </el-form-item>
                  <el-select v-model="appListModel" clearable
                             filterable>
                    <el-option
                        v-for="item in appList"
                        :key="item.value"
                        :label="item.value"
                        :value=item.value>
                    </el-option>
                  </el-select>
                  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px"
                           class="demo-dynamic">
                    <el-form-item
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :label="'场景' + index"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                    >
                      <el-row>
                        <el-form-item label="场景名称:" prop="data" style="margin-bottom: 20px">
                          <el-input id="input1" v-model="domain.name" autocomplete="off" style="width: 100%"></el-input>
                        </el-form-item>
                      </el-row>
                      <el-row>
                        <el-form-item label="url:" prop="data" style="margin-bottom: 20px">
                          <el-input id="input1" v-model="domain.url" autocomplete="off" style="width: 200%"></el-input>
                        </el-form-item>
                      </el-row>
                      <el-row :span="1.5">
                        <el-form-item label="data:" prop="url" style="margin-bottom: 20px">
                          <el-input id="input1" v-model="domain.data" autocomplete="off" style="width: 200%"></el-input>
                        </el-form-item>
                      </el-row>

                      <el-row :span="9.5">
                        <el-form-item label="json:" style="margin-bottom: 20px">
                          <el-input id="input1" v-model="domain.json" autocomplete="off" style="width: 200%"></el-input>
                        </el-form-item>
                      </el-row>

                      <el-col :span="0.7">
                        <el-button icon="el-icon-plus" type="primary" @click="addDomain" circle
                                   v-show="index==dynamicValidateForm.domains.length-1"></el-button>
                      </el-col>
                      <el-col :span="1">
                        <el-button icon="el-icon-minus" type="danger" circle @click.prevent="removeDomain(domain)"
                                   v-show="index!=dynamicValidateForm.domains.length"></el-button>
                      </el-col>
                    </el-form-item>
                  </el-form>
                </el-row>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="debugCreatScene('dynamicValidateForm')">调 试</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitAddScene('dynamicValidateForm')">确 定</el-button>
              </div>
            </el-dialog>
            <el-card class="box-card">
              <div>
                <p class="p-style"><span> 基础配置 </span></p>
                <el-form-item>
                  <label class="el-form-item__label">请求次数</label>
                  <el-input-number v-model="form_api.num" :min="1" :max="10"
                                   style="width: 130px"></el-input-number>
                </el-form-item>
              </div>

            </el-card>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
    addScene,
    commonCreatData, creatSceneData, debugSceneData, editSceneApi,
    getGiftList, getScene, getScenebyid,
} from '@/api/testTool'

export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          name: '',
          url: '',
          data: '',
          json: ''
        }]
      },
      autoForm_api_1: [],
      activeName: "first",
      checked1: "",
      showType_api: 0,
      rules: {
        name: [
          {required: true, message: '请输入场景名称', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择应用', trigger: 'blur'}
        ],
        data: [
          {required: true, message: '请填写请求data', trigger: 'blur'}
        ],
        url: [
          {required: true, message: '请填写请求url', trigger: 'blur'}
        ],
        hwsj_env: [
          {required: true, message: '环境不能为空', trigger: 'blur'}
        ],
        hwsj_user_uuid: [
          {required: true, message: '用户Uuid不能为空', trigger: 'blur'}
        ]
      },
      form_api: {
        name: '',
        url: '',
        data: '',
        json: '',
        app: '',
        num: '',
      },
      add_form: {
        name: '',
        url: '',
        data: '',
        json: '',
        app: '',
      },
      appList: [
        {value: 'taqu'},
        {value: 'peipei'},
        {value: 'haiwai'},
      ],
      isReload: true,
      dialogVisible: false,
      sceneList: [],
      scenceData: [],
      dialogFormVisible1: false,
      dialogFormVisible: false,
      form: {
        scene: '',
        url: '',
        data: '',
        json: '',
      },
      appListModel: 'taqu',
      creatScene: '',
      giftFormInline: {
        mobile: '',
        receiver_uuid: ''
      },
      autoForm: {
        receiver_uuid: '',
        family_uuid: '',
        chat_uuid: '',
        host_uuid: '',
        gid: '',
      },
      autoForm_api: {
        receiver_uuid: '',
        family_uuid: '',
        chat_uuid: '',
        host_uuid: '',
        gid: '',
        num: '',
      },
      commonFormInline: {
        msg_type: true,
        mobile: '',
        mobile_num: '',
        receiver_uuid: '',
        num: '',
        content: '',
        user_num: '',
        family_uuid: '',
      },
      // 标记需要的参数
      sign: {
        uuid: '',
        ck: '',
      },
      // 标记的选项
      sign_choice: [{
        value: '0',
        label: '非首充'
      }, {
        value: '1',
        label: '首充'
      }],
      num: 10,

      formInlineHwsj: {
          hwsj_project: '',
          hwsj_env: '',
          hwsj_user_uuid:'',
          hwsj_real_name:'测试',
          hwsj_real_photo:'cn.taqu.test_iOS_avatar_115_1687243420576_10874_0.jpg',
          hwsj_identity_no:'110103199604033000',
          hwsj_reward_account:'1436805666',
        },
      envListHwsj: [
            {
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
          },
          ],
      projectList: [{
        value: '1',
        label: '发送私信'
      },
        {
          value: '2',
          label: '发送家族消息'
        },
        {
          value: '3',
          label: '添加关注'
        },
        {
          value: '4',
          label: '私信送礼'
        },
        {
          value: '5',
          label: '家族送礼'
        },
        {
          value: '6',
          label: '直播间送礼'
        },
        {
          value: '7',
          label: '聊天室送礼'
        },
        {
          value: '8',
          label: '他趣首充状态标记'
        },
        {
          value: '9',
          label: '一键真人认证'
        }
      ],
      projectList1: [{
          value: '1',
          label: '他趣'
          },
          {
            value: '2',
            label: '海外'
          }
      ],
      msg_giftList: [],
      family_giftList: [],
      liveGiftList: [],
      chatGiftList: [],
      envList: [],
      typeList: [],
      giftTypeList: [],
      showType: 0,
      showType1: 0,
      showType2: 0,
      showType3: 0,
      showType4: 0,
      showType5: 0,
      showType6: 0,
      showType7: 0,
      showType8: 0,
      showType9: 0,
      showHwsjType: 0,
      show_real_name: 0,
      show_real_photo: 0,
      show_identity_no: 0,
      show_reward_account: 0,
      autoLoading: false,
      visible: false,
      formInline: {
        project: '',
        type: '',
        mode: [],
        radio: '1',
        env: '',
      },
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      const params = {
        'type': this.formInline.project,
        'mobile': this.commonFormInline.mobile,
        'receiver_uuid': this.commonFormInline.receiver_uuid,
        'num': this.commonFormInline.num,
        'content': this.commonFormInline.content,
        'user_num': this.commonFormInline.user_num,
        'mobile_num': this.commonFormInline.mobile_num,
        'gift_gid': this.autoForm.gid,
        'family_uuid': this.commonFormInline.family_uuid,
        'uuid': this.sign.uuid,
        'ck': this.sign.ck,
        'hwsj_user_uuid': this.formInlineHwsj.hwsj_user_uuid,
        'hwsj_real_name': this.formInlineHwsj.hwsj_real_name,
        'hwsj_real_photo': this.formInlineHwsj.hwsj_real_photo,
        'hwsj_identity_no': this.formInlineHwsj.hwsj_identity_no,
        'hwsj_reward_account': this.formInlineHwsj.hwsj_reward_account,
        'hwsj_env': this.formInlineHwsj.hwsj_env,
        'msg_type': this.commonFormInline.msg_type
      };
      commonCreatData(params).then((res) => {
        let {msg,} = res;
        this.loading = false
        if (msg === 'success') {
          this.$alert('生成成功！', '结果', {
            confirmButtonText: '确定'
          })
        } else {
          this.$alert('生成失败：' + msg, '结果', {
            confirmButtonText: '确定'
          })
        }
      })
    }
    ,
    updateReal() {
       if (this.formInlineHwsj.hwsj_project.includes("2")) {
        console.log(this.formInlineHwsj.hwsj_project)
         this.showHwsjType = 1
         this.show_real_name = 0
         this.show_real_photo = 0
         this.show_identity_no = 0
         this.show_reward_account = 0
      }else {
         this.showHwsjType = 0
         this.show_real_name = 1
         this.show_real_photo = 1
         this.show_identity_no = 1
         this.show_reward_account = 1
         this.formInlineHwsj.hwsj_env = ''
      }
    },
    updateTypeList() {
      console.log(this.formInline.project[0])

      if (this.formInline.project.includes("1")) {
        console.log(this.formInline.project)
        this.num = 10
        this.showType1 = 1
      } else {
        this.showType1 = 0
      }
      if (this.formInline.project.includes("2")) {
        this.showType2 = 2
      } else {
        this.showType2 = 0
      }
      if (this.formInline.project.includes("3")) {
        this.showType3 = 3
      } else {
        this.showType3 = 0
      }
      if (this.formInline.project.includes("4")) {
        this.showType4 = 4
        const params = {
          'env': "测试环境",
          'scene': "5"
        };
        getGiftList(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
            this.msg_giftList = data

          } else {
            this.$message.info({
              message: '礼物列表获取失败' + msg,
              center: true,
            })
          }
        })
      } else {
        this.showType4 = 0
      }
      if (this.formInline.project.includes("5")) {
        this.showType5 = 5
        const params = {
          'env': "测试环境",
          'scene': "6"
        };
        getGiftList(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
            this.family_giftList = data

          } else {
            this.$message.info({
              message: '礼物列表获取失败' + msg,
              center: true,
            })
          }
        })
      } else {
        this.showType5 = 0
      }
      if (this.formInline.project.includes("6")) {
        this.showType6 = 6
        const params = {
          'env': "测试环境",
          'scene': "1"
        };
        getGiftList(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
            this.liveGiftList = data

          } else {
            this.$message.info({
              message: '礼物列表获取失败' + msg,
              center: true,
            })
          }
        })
      } else {
        this.showType6 = 0
      }
      if (this.formInline.project.includes("7")) {
        this.showType7 = 7
        const params = {
          'env': "测试环境",
          'scene': "2"
        };
        getGiftList(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
            this.chatGiftList = data

          } else {
            this.$message.info({
              message: '礼物列表获取失败' + msg,
              center: true,
            })
          }
        })
      } else {
        this.showType7 = 0
      }
      if (this.formInline.project.includes('8')) {
        this.showType8 = 8
      } else {
        this.showType8 = 0
      }
      if (this.formInline.project.includes("9")) {
        this.showType9 = 9
        const params = {
          'env': "测试环境",
          'scene': "9"
        };
        hwsjRealpersonAuthentication(params).then((res) => {
          let {msg, data} = res;
          if (msg === 'success') {
            this.msg_giftList = data

          } else {
            this.$message.info({
              message: '生成失败' + msg,
              center: true,
            })
          }
        })
      } else {
        this.showType9 = 0
      }
    },
    getSceneList() {
      let self = this;
      getScene().then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          self.sceneList = data
        } else {
          self.$message.error({
            message: data,
            center: true,
          })
        }
      })
    },
    editScene() {
      console.log(this.autoForm_api_1)
       const params = {"id":this.autoForm_api_1[0]};
            getScenebyid(params).then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          this.form_api.app = data.app
          this.form_api.name =data.scene
          this.form_api.url = data.url
          this.form_api.data = data.data
          this.form_api.json = data.json
          this.form_api.id = this.autoForm_api_1[0]
          this.$message({
            message: '获取成功',
            type: 'success'
          });
        } else {
          self.$message.error({
            message: data,
            center: true,
          })
        }
      })
      this.dialogVisible = true
    },
    onSubmitCreatScene() {
      const params = {
        'num': this.form_api.num,
        'app': this.autoForm_api.app,
        'url': this.autoForm_api[1],
        'data': this.autoForm_api[2],
        'myjson': this.autoForm_api[4],
        'name': this.autoForm_api_1[0],
        'id': this.autoForm_api_1,
      };
      console.log(params)
      let self = this;
      creatSceneData(params).then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          this.$message({
            message: '创建成功，请到后台查看',
            type: 'success'
          });
        } else {
          self.$message.error({
            message: data,
            center: true,
          })
        }
      })
    },
    onSubmitEditScene() {
      let self = this;
      const params = {
        'app': this.form_api.app,
        'url': this.form_api.url,
        'data': this.form_api.data,
        'json': this.form_api.json,
        'name': this.form_api.name,
        'id': this.form_api.id,
      };
      editSceneApi(params).then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          this.$alert('编辑成功！', '结果', {
            confirmButtonText: '确定',
          })
          this.dialogVisible = false
          this.autoForm_api = []
          this.getSceneList()
          this.reload()
        } else {
          self.$message.error({
            message: data,
            center: true,
          })
        }
      })
    },
    debugCreatScene(formName) {
      const params = {
        'app': this.appListModel,
        'num': 1,
        'datalist':this.dynamicValidateForm.domains
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          debugSceneData(params).then((res) => {
            let {code, data} = res;
            if (code == '20000') {
              this.$message({
                message: '创建成功，请到后台查看',
                type: 'success'
              });
            } else {
              self.$message.error({
                message: data,
                center: true,
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onSubmitAddScene(formName) {

      const params = {
        'app': this.appListModel,
        'num': 1,
        'num_config': this.checked1,
        'datalist':this.dynamicValidateForm.domains
      };
      console.log(params)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addScene(params).then((res) => {
            let {code, data} = res;
            if (code == '20000') {
              this.$message({
                message: '创建成功，请刷新页面查看',
                type: 'success'
              });
              this.dialogFormVisible = false
              this.getSceneList();
              this.tqGetSceneList();
            } else {
              self.$message.error({
                message: data,
                center: true,
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    updeteShowTypeList() {
      this.showType_api = this.autoForm_api_1[6]
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        name: '',
        url: '',
        data: '',
        json: ''
      });
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== 0) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
  },

  created() {
    this.getSceneList()
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