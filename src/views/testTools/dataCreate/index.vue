<template>

  <div class="app-container">
    <aside>
      说明：点击按钮后，开始批量造数据(会在后台生成10条待审核数据)，返回成功后可在后台查看对应审核数据
    </aside>
<!--    <el-row style="margin-bottom: 10px">-->
<!--      他趣批量造数据场景：-->
<!--      <el-button type="primary" :loading="tq_headLoading" @click="autosethead">他趣批量改头像</el-button>-->
<!--      <el-button type="primary" :loading="AccountCoverLoading" @click="autoAddAccountCoverNewV2">他趣批量修改真人相册</el-button>-->
<!--      <el-button type="primary" :loading="IntroductionLoading" @click="autoSetIntroduction">他趣批量修改自我介绍</el-button>-->
<!--      <el-button type="primary" :loading="RoomCoverLoading" @click="autoRoomCover">他趣批量修改主播封面</el-button>-->
<!--      <el-button type="success" @click="goPage">审核平台跳转</el-button>-->
<!--    </el-row>-->
<!--    <el-row style="margin-bottom: 10px">-->
<!--      配配批量造数据场景：-->
<!--      <el-button type="primary" :loading="PeipeiSetBagLoading" @click="autoPeipeiSetBag">配配批量修改主页背景</el-button>-->
<!--      <el-button type="primary" :loading="peipeiSetIntroductionLoading" @click="autoPeipeiSetIntroduction">配配批量修改自我介绍-->
<!--      </el-button>-->
<!--    </el-row>-->
<!--    <el-row style="margin-bottom: 10px">-->
<!--      海外批量造数据场景：-->
<!--      <el-button type="primary" :loading="headLoading" @click="autoCreateHead">海外批量改头像</el-button>-->
<!--      <el-button type="primary" :loading="charLoading" @click="autosetchar">海外批量改聊天室头像</el-button>-->
<!--      <el-button type="success" @click="goHaiwaiPage">海外审核平台跳转</el-button>-->
<!--    </el-row>-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账号相关操作： uuid">
        <el-input v-model="formInline.uuid" placeholder="多个uuid用,隔开"></el-input>
      </el-form-item>
      <el-form-item label="增加魅力值">
        <el-input v-model="formInline.score" placeholder="请输入增加魅力值"></el-input>
      </el-form-item>
      <el-form-item label="修改趣豆">
        <el-input v-model="formInline.bean" placeholder="请输入修改趣豆数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="giftFormInline" class="demo-form-inline">
      <el-form-item label="通用造数据场景：">
        <el-select v-model="creatScene" clearable
                   @change="scenechange" filterable placeholder="请选择">
          <el-option
              v-for="item in sceneList"
              :key="item.scene"
              :label="item.scene"
              :value=[item.url,item.data,item.app,item.json]>
          </el-option>
        </el-select>
        <el-button type="primary" @click="onSubmitCreatScene">批量造数据</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">添加场景</el-button>
        <el-dialog title="添加场景" :visible.sync="dialogFormVisible">
          <aside>
      说明：请求data可以使用$img_url来代替图片地址，使用$randon来替代随机数,$ticket_id来替换ticket_id,$json来替换参数中json字符串;场景名称前缀需要添加应用名称来区分场景举例：他趣修改昵称、配配修改昵称
    </aside>
          <el-form :model="form" :rules="rules" ref="form" style="margin-bottom: 20px" :inline="true">
              <el-form-item label="应用" style="margin-bottom: 20px" required >
              </el-form-item>
                      <el-select v-model="appListModel"  clearable
                   @change="scenechange" filterable>
          <el-option
              v-for="item in appList"
              :key="item.value"
              :label="item.value"
              :value=item.value>
          </el-option>
        </el-select>
            <el-form-item label="场景名称:" prop="name">
              <el-input v-model="form.name"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="造数据请求url:" prop="url" style="margin-bottom: 20px">
              <el-input id="input1" v-model="form.url"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="造数据请求data:" prop="data" style="margin-bottom: 20px">
              <el-input id="input1" v-model="form.data" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="参数中含有json数据:" style="margin-bottom: 20px">
              <el-input id="input1" v-model="form.json" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="debugCreatScene('form')">调 试</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddScene('form')">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="giftFormInline" class="demo-form-inline">
      <el-form-item label="推送中台回归场景构建:">
        <el-button type="primary" :loading="createPushLoading" @click="autoPush">创建推送计划</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="giftFormInline" class="demo-form-inline">
      <el-form-item label="海外推送中台回归场景构建:">
        <el-button type="primary" :loading="createHwPushLoading" @click="autoHwPush">创建海外推送计划</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="giftFormInline" class="demo-form-inline">
      <el-form-item label="推广造数据场景：">
        <el-select v-model="headerV" clearable
                   @change="scenechange" filterable placeholder="请选择header" style="margin-bottom: 10px">
          <el-option
              v-for="item in headerList"
              :key="item.name"
              :label="item.name"
              :value=[item.header,item.oaid_idfa,item.androidId_idfv]>
          </el-option>
        </el-select>
        <el-button type="primary" @click="dialogFormVisible1 = true">添加header</el-button>
        <el-row style="margin-bottom: 10px">
        <el-select v-model="tgScene" clearable
                   @change="scenechange" filterable placeholder="请选择场景" >
          <el-option
              v-for="item in tgSceneList"
              :key="item.value"
              :label="item.value"
              :value=item.value>
          </el-option>
        </el-select>
        </el-row>
        <el-input v-model="tg_mobile" placeholder="请输入手机号" ></el-input>
        <el-button type="primary" @click="onSubmitCreatTgScene">开始造数据</el-button>
        <el-dialog title="添加header" :visible.sync="dialogFormVisible1">
          <aside>
      说明：请求data可以使用$img_url来代替图片地址，使用$randon来替代随机数,$ticket_id来替换ticket_id,$json来替换参数中json字符串;场景名称前缀需要添加应用名称来区分场景举例：他趣修改昵称、配配修改昵称
    </aside>
          <el-form :model="headerForm" :rules="headerRules" ref="headerForm" style="margin-bottom: 20px" :inline="true">
            <el-form-item label="header名称:" prop="name">
              <el-input v-model="headerForm.name"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="header:" prop="header" style="margin-bottom: 20px">
              <el-input id="input1" v-model="headerForm.header"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="oaid_idfa:" style="margin-bottom: 20px">
              <el-input id="input1" v-model="headerForm.oaid_idfa"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="androidId_idfv:" style="margin-bottom: 20px">
              <el-input id="input1" v-model="headerForm.androidId_idfv"  autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitAddHeader('headerForm')">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="peopleGroupType" class="demo-form-inline">
      <el-form-item label="他趣系统牵线人群造数据：数量">
        <el-input v-model="peopleGroupType.num" placeholder="必填：数量"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="peopleGroupType.sex"  placeholder="必选" style="width:100px;">
          <el-option label="男" value="1">男</el-option>
          <el-option label="女" value="2">女</el-option>
        </el-select>
      </el-form-item>
      <label class="el-form-item__label" >人群标签: </label>
       <el-select v-model="tgGroupType" clearable
                   @change="scenechange" filterable placeholder="必选：人群标签" >
          <el-option
              v-for="item in groupTypeList"
              :key="item.value"
              :label="item.value"
              :value=item.value  v-show="peopleGroupType.sex==2">
          </el-option>
          <el-option
              v-for="item in groupTypeList1"
              :key="item.value"
              :label="item.value"
              :value=item.value  v-show="peopleGroupType.sex==1">
          </el-option>
       </el-select>
      <el-form-item label="修改标签内容" v-show="tgGroupType=='自定义'">
        <el-input v-model="peopleGroupType.doc" placeholder="选填：标签内容json串格式" style="width:300px;" v-show="tgGroupType=='自定义'"></el-input>
      </el-form-item>

      <el-form-item label="坐标" v-show="tgGroupType !='自定义'">
        <el-input v-model="peopleGroupType.location" placeholder="选填：24.57592,118.09729" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="TqGroupTypeLoading"  @click="createGroupType">确定</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="hwGroupType" class="demo-form-inline">
      <el-form-item label="海外系统牵线人群造数据：数量">
        <el-input v-model="hwGroupType.num" placeholder="必填：数量"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="hwGroupType.sex"  placeholder="必选" style="width:100px;">
          <el-option label="男" value="1">男</el-option>
          <el-option label="女" value="2">女</el-option>
        </el-select>
      </el-form-item>
      <label class="el-form-item__label"  >人群标签: </label>
       <el-select v-model="hwGroup" clearable
                   @change="scenechange" filterable placeholder="必选：人群标签" >
          <el-option
              v-for="item in groupTypeList2"
              :key="item.value"
              :label="item.value"
              :value=item.value  v-show="hwGroupType.sex==2">
          </el-option>
          <el-option
              v-for="item in groupTypeList1"
              :key="item.value"
              :label="item.value"
              :value=item.value  v-show="hwGroupType.sex==1">
          </el-option>
       </el-select>
      <el-form-item label="修改标签内容" v-show="hwGroup=='自定义'">
        <el-input v-model="hwGroupType.doc" placeholder="选填：标签内容json串格式" style="width:300px;" v-show="hwGroup=='自定义'"></el-input>
      </el-form-item>

      <CountryCodeOption v-model="countrycode" />
      <el-form-item>
        <el-button type="primary" :loading="HwGroupTypeLoading" @click="createHwGroupType">确定</el-button>
      </el-form-item>
    </el-form>
     <el-button type="primary" :loading="tq_filterAccountLoading" @click="filterTqAccountScene">批量创建他趣牵线过滤用户</el-button>
  </div>

</template>

<script>
import CountryCodeOption from "@/views/components/CountryCodeOption";
import {
  autoEditName,
  autoCreateHead,
  autosetchar,
  autosetprofile,
  autosethead,
  autosetHomeCover,
  autoAddPosts,
  autoSetIntroduction,
  autoAddAccountCoverNewV2,
  autoPeipeiSetName,
  autoPeipeiSetBag, setAccount,
  sendPrivateMsg,
  sendGroupMsg,
  sendGiftMsg,
  hostSendGift,
  chatSendGift,
  teamSendGift,
  SendMomentPictureMsg,
  autoRoomCover,
  peipeiSetIntroduction,
  getScene,
  creatSceneData, addScene, tqGetScene, autoPushPlan, autoHwPushPlan,getTgHeader, addHeaderApi, tgCreateScene,

  accountGroupType,
  hw_groupType_accounts,
  filterTqAccount

} from '@/api/testTool'

export default {

  name: 'CountQuality',
  components: {CountryCodeOption},
  data() {
    return {
        rules: {
          name: [
            { required: true, message: '请输入场景名称', trigger: 'blur'  }
          ],
          region: [
            { required: true, message: '请选择应用', trigger: 'blur' }
          ],
          data: [
            { required: true, message: '请填写请求data', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请填写请求url', trigger: 'blur' }
          ]
        },
      headerRules: {
          name: [
            { required: true, message: '请输入场景名称', trigger: 'blur'  }
          ],
          header: [
            { required: true, message: '请选择应用', trigger: 'blur' }
          ]
        },


      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible:false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      form: {
        scene: '',
        url: '',
        data: '',
        json:'',
      },
      headerForm: {
        name: '',
        header: '',
        oaid_idfa: '',
        androidId_idfv: '',
      },
      formLabelWidth: '120px',
      mailTxt: '',
      nameLoading: false,
      headLoading: false,
      charLoading: false,
      profileLoading: false,
      tq_headLoading: false,
      HomeCoverLoading: false,
      AddPostsLoading: false,
      AccountCoverLoading: false,
      IntroductionLoading: false,
      PeipeiSetNameLoading: false,
      PeipeiSetBagLoading: false,
      TqGroupTypeLoading: false,
      HwGroupTypeLoading: false,
      PeipeiSendMomentPictureMsgLoading: false,
      peipeiSetIntroductionLoading: false,
      RoomCoverLoading: false,
      createPushLoading:false,
      sendPrivateMsgLoading: false,
      sendGroupMsgLoading: false,
      tq_filterAccountLoading:false,
      vShowType: 0,
      vShowEnv1: 1,
      appListModel:'taqu',
      resultList: [],
      sceneList: [],
      tqSceneList: [],
      tg_mobile:'',
      tgSceneList: [
          {value:'注册'},
        {value:'ios设备注册'},
      {value:'安卓设备充值场景'},
        {value:'IOS设备充值场景'},
        {value:'多次充值场景'}],
      input: '',
      appList:[
        {value:'taqu'},
        {value:'peipei'},
        {value:'haiwai'},
      ],
      creatScene: '',
      headerV: '',
      headerList: [],
      tgScene:'',
      tqcreatScene:'',
      formInline: {
        uuid: '',
        score: '',
        bean: ''
      },
      sendPrivateMsgFormInline: {
        mobile: '',
        receiver_uuid: '',
        num: '',
        content: ''
      },
      sendGroupMsgFormInline: {
        mobile: '',
        at_uuid: '',
        num: '',
        content: ''
      },
      giftFormInline: {
        mobile: '',
        receiver_uuid: ''
      },
      hostGiftFormInline: {
        mobile: '',
        chat_uuid: ''
      },
      chatGiftFormInline: {
        mobile: '',
        chat_uuid: ''
      },
      chatGiftTeamInline:
      {
        mobile: '',
      },
      groupTypeList: [
          {value:'自定义'},
          {value:'A淘汰女'},
        {value:'B筛选女'},
      {value:'C成长女'},
        {value:'D优质女'},
        {value:'E存量清洗女'}],
      groupTypeList1: [
          {value:'自定义'},
           {value:'1饼男'},
        {value:'2筛选男'},
      {value:'3沉默付费男'},
        {value:'4底部付费男'},
        {value:'5腰部付费男'},
        {value:'6头部付费男'}],
       groupTypeList2: [
           {value:'自定义'},
          {value:'A淘汰女'},
        {value:'B筛选女'},
      {value:'C成长女'},
        {value:'D优质女'},
        {value:'E存量清洗女'},
        {value:'F底部女'}],
      "tgGroupType": '',
      "hwGroup": '',
      countrycode: '🇨🇳 中国(86)',
      vShowCountry: 1,
      hwGroupType:
      {
        sex: '',
        num: '',
        doc: ''
      },
      peopleGroupType:
      {
        sex: '',
        num: '',
        location: '',
        doc: '',
      },
    }
  },
  methods: {
    autoPush() {
      this.createPushLoading = true
      autoPushPlan().then(response => {
        this.createPushLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量创建推送计划成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoHwPush() {
      this.createHwPushLoading = true
      autoHwPushPlan().then(response => {
        this.createHwPushLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量创建推送计划成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoEditName() {
      this.nameLoading = true
      autoEditName().then(response => {
        this.nameLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改昵称成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoCreateHead() {
      this.headLoading = true
      autoCreateHead().then(response => {
        this.headLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改头像成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autosetchar() {
      this.charLoading = true
      autosetchar().then(response => {
        this.charLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改聊天室头像成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autosetprofile() {
      this.profileLoading = true
      autosetprofile().then(response => {
        this.profileLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改个人简介成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autosethead() {
      this.tq_headLoading = true
      autosethead().then(response => {
        this.tq_headLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改头像成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autosetHomeCover() {
      this.HomeCoverLoading = true
      autosetHomeCover().then(response => {
        this.HomeCoverLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改个人封面成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoAddPosts() {
      this.AddPostsLoading = true
      autoAddPosts().then(response => {
        this.AddPostsLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量发帖子成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoAddAccountCoverNewV2() {
      this.AccountCoverLoading = true
      autoAddAccountCoverNewV2().then(response => {
        this.AccountCoverLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改真人相册成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoSetIntroduction() {
      this.IntroductionLoading = true
      autoSetIntroduction().then(response => {
        this.IntroductionLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改自我介绍成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoRoomCover() {
      this.RoomCoverLoading = true
      autoRoomCover().then(response => {
        this.RoomCoverLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '批量修改主播封面成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoPeipeiSetName() {
      this.PeipeiSetNameLoading = true
      autoPeipeiSetName().then(response => {
        this.PeipeiSetNameLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '配配批量修改名称成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoPeipeiSetBag() {
      this.PeipeiSetBagLoading = true
      autoPeipeiSetBag().then(response => {
        this.PeipeiSetBagLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '配配批量修改主页背景成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoPeipeiSendMomentPictureMsg() {
      this.PeipeiSendMomentPictureMsgLoading = true
      SendMomentPictureMsg().then(response => {
        this.PeipeiSendMomentPictureMsgLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '配配批量修改主页背景成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    autoPeipeiSetIntroduction() {
      this.peipeiSetIntroductionLoading = true
      peipeiSetIntroduction().then(response => {
        this.peipeiSetIntroductionLoading = false
        let {msg, code} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: '配配批量修改主页背景成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    goPage() {
      window.open("http://admin.hb.test.k8s.taqu.cn/#/checkadmin/checkList/onlineCheck", '_blank');
    },
    goHaiwaiPage() {
      window.open("http://hb-admin.test.fcash-yd.com/#/review/checkList/onlineCheck", '_blank');
    },
    onSubmit() {
      const params = {
        'uuid': this.formInline.uuid,
        'score': this.formInline.score,
        'bean': this.formInline.bean,
      };
      this.result = ''
      this.loading = true
      console.log(params);
      setAccount(params).then((res) => {
        let {msg,} = res;
        this.loading = false;
        if (msg === 'success') {
          this.$message({
            message: '添加成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    onSubmitSendPrivateMsg() {
      if (this.sendPrivateMsgFormInline.mobile.length < 1 || this.sendPrivateMsgFormInline.receiver_uuid.length < 1) {
        this.$message.error({
          message: '手机号、接收方uuid必填',
          center: true,
        })
      } else {
        const params = {
          'mobile': this.sendPrivateMsgFormInline.mobile,
          'receiver_uuid': this.sendPrivateMsgFormInline.receiver_uuid,
          'num': this.sendPrivateMsgFormInline.num,
          'content':this.sendPrivateMsgFormInline.content
        };
        this.result = ''
        this.sendPrivateMsgLoading = true
        console.log(params);
        sendPrivateMsg(params).then((res) => {
          let {msg,} = res;
          this.sendPrivateMsgLoading = false;
          if (msg === 'success') {
            this.$message({
              message: '发送成功，请到客户端查看',
              type: 'success'
            });
          } else {
            this.$message.error({
              message: msg,
              center: true,
            })
          }
        })
      }
    },
    onSubmitsendGroupMsg() {
      if (this.sendGroupMsgFormInline.mobile.length < 1) {
        this.$message.error({
          message: '手机号必填',
          center: true,
        })
      } else{
        const params = {
          'mobile': this.sendGroupMsgFormInline.mobile,
          'at_uuid': this.sendGroupMsgFormInline.at_uuid,
          'num': this.sendGroupMsgFormInline.num,
          'content':this.sendGroupMsgFormInline.content
        };
        this.result = ''
        this.sendGroupMsgLoading = true
        console.log(params);
        sendGroupMsg(params).then((res) => {
          let {msg,} = res;
          this.sendGroupMsgLoading = false;
          if (msg === 'success') {
            this.$message({
              message: '发送成功，请到客户端查看',
              type: 'success'
            });
          } else {
            this.$message.error({
              message: msg,
              center: true,
            })
          }
        })
      }
    },
    onSubmitGift() {
      const params = {
        'mobile': this.giftFormInline.mobile,
        'receiver_uuid': this.giftFormInline.receiver_uuid,
      };
      this.result = ''
      this.loading = true
      console.log(params);
      sendGiftMsg(params).then((res) => {
        let {msg,} = res;
        this.loading = false;
        if (msg === 'success') {
          this.$message({
            message: '赠送成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    onSubmitHostGift() {
      const params = {
        'mobile': this.hostGiftFormInline.mobile,
        'chat_uuid': this.hostGiftFormInline.chat_uuid,
      };
      this.result = ''
      this.loading = true
      console.log(params);
      hostSendGift(params).then((res) => {
        let {msg,} = res;
        this.loading = false;
        if (msg === 'success') {
          this.$message({
            message: '赠送成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    onSubmitChatGift() {
      const params = {
        'mobile': this.chatGiftFormInline.mobile,
        'chat_uuid': this.chatGiftFormInline.chat_uuid,
      };
      this.result = ''
      this.loading = true
      console.log(params);
      chatSendGift(params).then((res) => {
        let {msg,} = res;
        this.loading = false;
        if (msg === 'success') {
          this.$message({
            message: '赠送成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    onSubmitTeamGift() {
      const params = {
        'mobile': this.chatGiftTeamInline.mobile,
      };
      this.result = ''
      this.loading = true
      // console.log(params);
      teamSendGift(params).then((res) => {
        let {msg,} = res;
        this.loading = false;
        if (msg === 'success') {
          this.$message({
            message: '赠送成功，请到后台查看',
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    getHeadrList() {
      let self = this;
      getTgHeader().then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          self.headerList = data
          console.log(self.headerList)
        } else {
          self.$message.error({
            message: data,
            center: true,
          })
        }
      })
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
    tqGetSceneList() {
      let self = this;
      tqGetScene().then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          self.tqSceneList = data
        } else {
          self.$message.error({
            message: data,
            center: true,
          })
        }
      })
    },
    onSubmitCreatScene() {
      const params = {
        'app': this.creatScene[2],
        'url': this.creatScene[0],
        'data': this.creatScene[1],
        'myjson': this.creatScene[3],
        'num':10,
      };
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
    onSubmitCreatTgScene() {
      const params = {
        'header': this.headerV[0],
        'oaid_idfa': this.headerV[1],
        'androidId_idfv': this.headerV[2],
        'scene': this.tgScene,
        'mobile': this.tg_mobile
      };
      // console.log(params);
      let self = this;
      tgCreateScene(params).then((res) => {
        let {code, data} = res;
        if (code == "20000" & data != '账号已注册，请重新输入') {
          this.$message({
            message: '创建成功，请到后台查看数据',
            type: 'success'
          });
        } else if(code == "20000" & data == '账号已注册，请重新输入') {
          self.$message.error({
            message: data,
            type: 'success'
          })
        }
      })
    },
    debugCreatScene(formName) {
      const params = {
        'app': this.appListModel,
        'scene': this.form.scene,
        'url': this.form.url,
        'data': this.form.data,
        'num':1,
        'myjson':this.form.json,
      };
      this.$refs[formName].validate((valid) => {
          if (valid) {
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    onSubmitAddHeader(formName) {

      const params = {
        'name': this.headerForm.name,
        'header': this.headerForm.header,
        'oaid_idfa': this.headerForm.oaid_idfa,
        'androidId_idfv': this.headerForm.androidId_idfv
      };
      this.$refs[formName].validate((valid) => {
          if (valid) {
            addHeaderApi(params).then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          this.$message({
            message: '创建成功，请刷新页面查看',
            type: 'success'
          });
           this.dialogFormVisible1 = false
          this.getHeadrList();
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
    createGroupType() {
      const params = {
        'sex': this.peopleGroupType.sex,
        'num': this.peopleGroupType.num,
        'group_type': this.tgGroupType,
        'doc': this.peopleGroupType.doc,
        'location': this.peopleGroupType.location
      };
      this.result = ''
      this.TqGroupTypeLoading = true
      console.log(params);
      accountGroupType(params).then((res) => {
      this.TqGroupTypeLoading = false
        let {msg,} = res;
        let {data,} = res;
        // this.loading = false;
        if (msg === 'success') {
          this.$message({
            message: data,
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    createHwGroupType() {
      const params = {
        'sex': this.hwGroupType.sex,
        'num': this.hwGroupType.num,
        'group_type': this.hwGroup,
        'countryCode': this.countrycode,
        'doc': this.hwGroupType.doc
      };
      this.result = ''
      this.HwGroupTypeLoading = true
      console.log(params);
      hw_groupType_accounts(params).then((res) => {
      this.HwGroupTypeLoading = false
        let {msg,} = res;
        let {data,} = res;
        // this.loading = false;
        if (msg === 'success') {
          this.$message({
            message: data,
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    scenechange(e) {
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
    onSubmitAddScene(formName) {

      const params = {
        'app': this.appListModel,
        'scene': this.form.name,
        'url': this.form.url,
        'data': this.form.data,
        'num':1,
        'myjson':this.form.json,
      };
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
    onSubmitTqCreatScene() {
      const params = {
        'app': this.tqcreatScene[2],
        'url': this.tqcreatScene[0],
        'data': this.tqcreatScene[1]
      };
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

  filterTqAccountScene() {
      this.tq_filterAccountLoading = true
      filterTqAccount().then(response => {
        this.tq_filterAccountLoading = false
        let {msg, code} = response;
        let {data,} = response;
        if (code == '20000' && msg == 'success') {
          this.$message({
            message: data,
            type: 'success'
          });
        } else {
          this.$message.error({
            message: msg,
            center: true,
          })
        }
      })
    },
    },
  created() {
    this.getSceneList();
    this.getHeadrList();
  },

}
</script>

<style>
#input1 {
    min-height: 30px;
    margin: 0px;
    width: 666px;
}
</style>