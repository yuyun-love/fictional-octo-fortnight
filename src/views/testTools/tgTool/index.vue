<template>
  <div class="scene">
    <h4>推广测试场景自动化操作</h4>
    <aside>
      <strong>使用说明：</strong><br>
      1.执行操作前请先点击广告！
      <br>
      2.生成广告点击数据需要选择设备，广告点击相关所有参数均为必填！
      <br>
      3.选择设备和场景，再输入相关信息后执行操作
      <br> <strong>注意事项：</strong><br>
      1.安卓/ios注册场景是请求客户端注册接口的真实注册，偶现注册失败是正常的
      <p style="color: #00c4ff" >2.频繁测试注册场景可选择【注册推入场景】（无需输入手机号），避免注册失败或者设备被限制注册的情况发生</p>
    </aside>
    <br>
    <el-form :inline="true" :model="tgFormInline" class="demo-form-inline">
      <el-form-item label="请选择用于执行操作的设备：">
        <el-select v-model="headerV" clearable
                   @change="scenechange" filterable placeholder="请选择设备">
          <el-option
              v-for="item in headerList"
              :key="item.name"
              :label="item.name"
              :value=[item.header,item.oaid_idfa,item.androidId_idfv]>
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="dialogFormVisible1 = true">添加设备</el-button><br>
      <el-form-item label="请选择执行的场景" prop="parent">
        <el-select v-model="tgScene" clearable
                   @change="scenechange" filterable placeholder="请选择场景">
          <el-option
              v-for="item in tgSceneList"
              :key="item.value"
              :label="item.value"
              :value=item.value>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否清除设备归因信息" prop="child" v-if="tgScene === '真实注册场景' || tgScene === '注册推入场景' || tgScene === '充值场景' || tgScene === '设备激活场景'" >
        <el-select v-model="tg_del" clearable
                 @change="scenechange" filterable placeholder="请选择">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <div>
      <el-form-item label="请选点击媒体" prop="child" v-if="tgScene === '生成点击数据'">
        <el-select v-model="tgMedia" clearable
                   @change="scenechange" filterable placeholder="请选择">
          <el-option label="头条" value="toutiao"></el-option>
          <el-option label="快手" value="kuaishou"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号id" prop="child" v-if="tgScene === '生成点击数据'">
        <el-input v-model="tg_gid" clearable placeholder=""/>
      </el-form-item>
      <el-form-item label="计划id" prop="child" v-if="tgScene === '生成点击数据'">
        <el-input v-model="tg_pid" clearable placeholder=""/>
      </el-form-item>
      <br>
      <el-form-item label="点击环境" prop="child" v-if="tgScene === '生成点击数据'">
        <el-select v-model="tgEnv" clearable
                   @change="scenechange" filterable placeholder="">
          <el-option label="test" value="test"></el-option>
          <el-option label="test1" value="test1"></el-option>
          <el-option label="test2" value="test2"></el-option>
          <el-option label="test3" value="test3"></el-option>
          <el-option label="test4" value="test4"></el-option>
          <el-option label="test5" value="test5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作用系统" prop="child" v-if="tgScene === '生成点击数据'">
        <el-select v-model="tgSystem" clearable
                   @change="scenechange" filterable placeholder="">
          <el-option label="新系统" value="new"></el-option>
          <el-option label="旧系统" value="old"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="点击时间" prop="child" v-if="tgScene === '生成点击数据'">
        <template>
          <div class="block" style="margin-left: -6px" >
            <el-date-picker
              v-model="tgFormInline.clickTime"
              type="datetime" style="width:220px"
              clearable
              placeholder="选择日期时间"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </template>
      </el-form-item>
      </div>
      <div>
      <el-form-item label="输入用于注册的手机号" prop="child" v-if="tgScene === '真实注册场景'" >
        <el-input v-model="tg_mobile" clearable placeholder="请输入手机号" type="number" oninput="if(value.length>11)value=value.slice(0,11)"/>
      </el-form-item>
      <el-form-item label="选择注册的性别" prop="child" v-if="tgScene === '真实注册场景' || tgScene === '注册推入场景'" >
        <el-select v-model="tg_sex" clearable
                 @change="scenechange" filterable placeholder="请选择性别">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      </div>
      <div>
      <el-form-item label="输入用于充值的uuid" prop="child" v-if="tgScene === '充值场景'">
        <el-input v-model="tg_uuid" clearable placeholder="请输入uuid"/>
      </el-form-item>
      <el-form-item label="输入充值金额（单位：分）" prop="child" v-if="tgScene === '充值场景'">
        <el-input v-model="tg_amount" clearable placeholder="请输入金额"/>
      </el-form-item>
      </div>
      <div>
      <el-form-item  label="选择激活时间" prop="child" v-if="tgScene === '修改激活时间'">
        <el-date-picker
          v-model="tgFormInline.activeTime"
          type="datetime" style="width:220px"
          clearable
          placeholder="选择日期时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      </div>
      <br>
      <el-button type="primary" :loading="loading" @click="onSubmitCreatTgScene">执行操作</el-button>

    <el-dialog
      title="添加设备"
      :close-on-click-modal="false"
      show="show"
      width="800px"
      :z-index="1000"
      :visible.sync="dialogFormVisible1"
      @close='closeDialog'
    >
      <div class="AddMenuDialog_Content">
        <el-form
          class="AddMenuDialog_Form"
          :model="headerForm"
          :rules="headerRules"
          label-width="100px"
          ref="headerForm"
          inline
        >
          <el-form-item label="描述" prop="name" style="width: 100%">
            <el-input v-model.trim="headerForm.name" placeholder="请输入描述"/>
          </el-form-item>
          <el-form-item label="设备号" prop="oaid_idfa">
            <el-input
              v-model.trim="headerForm.oaid_idfa"
              placeholder="设备号（oaid/idfa）"
            />
          </el-form-item>
          <el-form-item label="设备id" prop="androidId_idfv">
            <el-input
              v-model.trim="headerForm.androidId_idfv"
              placeholder="androidId/idfv"
            />
          </el-form-item>
          <el-form-item label="TO" prop="token">
            <el-input v-model.trim="headerForm.token" placeholder="设备token" />
          </el-form-item>
          <el-form-item label="AP" prop="ap">
            <el-input v-model.trim="headerForm.ap" placeholder="appcode，如1" />
          </el-form-item>
          <el-form-item label="AV" prop="av">
            <el-input v-model.trim="headerForm.av" placeholder="app版本号，如79999" />
          </el-form-item>
          <el-form-item label="PL" prop="pl">
            <el-input v-model.trim="headerForm.pl" placeholder="如android/iPhone" />
          </el-form-item>
          <el-form-item label="CH" prop="ch">
            <el-input v-model.trim="headerForm.ch" placeholder="渠道，如dev" />
          </el-form-item>
          <el-form-item label="CL" prop="cl">
            <el-input v-model.trim="headerForm.cl" placeholder="分身版本号，如1" />
          </el-form-item>
          <el-form-item label="CI" prop="ci">
            <el-input v-model.trim="headerForm.ci" placeholder="城市id，如303" />
          </el-form-item>
          <el-form-item label="LG" prop="lg">
            <el-input v-model.trim="headerForm.lg" placeholder="国际语言，如zh_cn" />
          </el-form-item>
        </el-form>
      </div>
      <div class="AddMenuDialog_footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button
          type="primary"
          form-type="submit"
          style="margin-left: 20px"
          :loading="loading"
          @click="onSubmitAddHeader('headerForm')"
          >确定
        </el-button>
      </div>
    </el-dialog>
    </el-form>

    <br>
    <h4>推广批量造数</h4>
    <aside>
      <strong>使用说明：</strong><br>
      1.查看素材报表需要先在
      <el-link href="http://admp.admin.internal.taqu.cn/#/tuiguang/extensionSystem/accountManagerList" type="primary"  :underline="false">线上管家配置详情</el-link>
      获取他趣总账户（自运营）的token进行配置[每半天需要更新一次]<br>
      2.选择截止时间，工具将在截止时间前一直执行造数操作，完成后可在投放后台报表处查询到数据
    </aside>
    <br>
    <el-form :inline="true" :model="tokenInline" class="demo-form-inline">
      <el-form-item label="输入线上配置的token：">
        <el-input v-model="tg_token" placeholder="请输入token"/>
      </el-form-item>
      <el-button type="primary"  :loading="loading" @click="onSubmitChangeToken">
         更改
      </el-button>
    </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">

      <el-form-item style="margin-left:-6px" label="执行结束时间">
        <template>
          <div class="block" style="margin-left: -6px" >
            <el-date-picker
              v-model="formInline.toTime"
              type="datetime" style="width:220px"
              clearable
              placeholder="选择日期时间"
              value-format="timestamp"
              :aria-disabled="!formInline.fromTime"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </template>
      </el-form-item>
       <el-button type="primary" :loading="loading" @click="onSubmitStartCreat">
         执行
       </el-button>
    </el-form>
    <br><br>
  </div>
</template>


<script>
import {
  addHeaderApi,
  getTgHeader, tgCreateScene,
  tgStartCreat, tgChangeToken

} from '@/api/testTool'
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    operateState: {
      type: Object,
      default: () => ({
        type: "add",
      }),
    },
  },
  data() {
    return {
      dialogFormVisible1: false,
      tgFormInline: {
        header: '',
        oaid_idfa: '',
        androidId_idfv: '',
        media: '',
        gid: '',
        pid: '',
        env: '',
        system: '',
        clickTime: +new Date(),
        scene: "",
        isDel:'',
        mobile: "",
        sex: "",
        uuid: "",
        amount:"",
        activeTime: +new Date(),
      },
      tokenInline:{
        token: ''
      },
      pickerOptions:{
        disabledDate: time => {
          // 时间选择器不可选择之前的时间
          return time.getTime() < Date.now() - 8.64e7  || time.getTime() > new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).getTime()
        }
      },
      tgMedia:'toutiao',
      tg_gid:'',
      tg_pid:'',
      tgEnv:'test',
      tgSystem:'new',
      formInline:{
        toTime: ''
      },
      tg_token: '',
      autoLoading: false,
      tg_del:'1',
      tg_mobile:'',
      tg_sex:'',
      tg_uuid:'',
      tg_amount:'',
      tgScene:'',
      tgSceneList: [
          {value:'生成点击数据'},
          {value:'设备激活场景'},
          {value:'真实注册场景'},
          {value: '注册推入场景'},
          {value:'充值场景'},
          {value:'修改激活时间'},],
      headerV: '',
      headerList: [],
      visible: this.show,
      loading: false,
      headerForm: {
        name: "",
        oaid_idfa: "",
        androidId_idfv: "",
        token: "",
        ap: "",
        av: "",
        pl: "",
        ch: "",
        cl: "",
        ci: "",
        lg: "",
      },
      headerRules: {
        name: [
            { required: true, message: '请输入描述名称', trigger: 'blur'  }
          ],
        oaid_idfa: [
            { required: true, message: '请输入设备号', trigger: 'blur' }
          ],
        token: [
            { required: true, message: '请输入设备token', trigger: 'blur' }
          ],
        ap: [
            { required: true, message: '请输入appcode', trigger: 'blur' }
          ],
        pl: [
            { required: true, message: '请输入平台名', trigger: 'blur' }
          ],
        ch: [
            { required: true, message: '请输入渠道', trigger: 'blur' }
          ],
        cl: [
            { required: true, message: '请输入分身版本号', trigger: 'blur' }
          ],
        av: [
            { required: true, message: '请输入app版本号', trigger: 'blur' }
          ],
        androidId_idfv: [
            { required: true, message: '请输入设备id', trigger: 'blur' }
          ]

      },
    };
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },

  methods: {

    getHeaderList() {
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
    onSubmitCreatTgScene() {
      const params = {
        'header': this.headerV[0],
        'oaid_idfa': this.headerV[1],
        'androidId_idfv': this.headerV[2],
        'media': this.tgMedia,
        'gid': this.tg_gid,
        'pid': this.tg_pid,
        'env': this.tgEnv,
        'system': this.tgSystem,
        'clickTime': this.tgFormInline.clickTime,
        'scene': this.tgScene,
        'isDel': this.tg_del,
        'mobile': this.tg_mobile,
        'sex': this.tg_sex,
        'uuid': this.tg_uuid,
        'amount':this.tg_amount,
        'activeTime': this.tgFormInline.activeTime,
      };
      // console.log(params);
      this.loading = true
      let self = this;
      tgCreateScene(params).then((res) => {
        let {msg, code, data} = res;
        this.loading = false;
        if (code == "20000" & msg == 'success') {
          this.$message({
            message: '操作成功，请到后台查看数据',
            type: 'success'
          });
        } else if(code == "20000" & msg == 'flase') {
          self.$message.error({
            message: data,
            type: 'success'
          })
        } else if(code == "99999" & msg == 'flase') {
          self.$message.error({
            message: data,
            type: 'success'
          })
        }
        else if(code == "99999" & data != '未选择场景' & data != '未选择设备') {
          self.$message.error({
            message: data.msg,
            type: 'success'
          })
        }
      })
      this.loading = false
    },
    onSubmitAddHeader(formName) {
      const headers = {
        'to': this.headerForm.token,
        'ap': this.headerForm.ap,
        'av': this.headerForm.av,
        'pl': this.headerForm.pl,
        'ch': this.headerForm.ch,
        'cl': this.headerForm.cl,
        'ci': this.headerForm.ci,
        'lg': this.headerForm.lg,
        'Testcase': "1"
      }
      header = JSON.stringify(headers)
      let header;
      const params = {
        'name': this.headerForm.name,
        'header': header,
        'oaid_idfa': this.headerForm.oaid_idfa,
        'androidId_idfv': this.headerForm.androidId_idfv
      };
      console.log('formName', formName)
      console.log( this.$refs[formName])
      this.loading = true
      this.$refs[formName].validate((valid) => {
          if (valid) {
            addHeaderApi(params).then((res) => {
        let {code, data} = res;
        this.loading = false;
        if (code == '20000') {
          this.$message({
            message: '创建成功，请刷新页面查看',
            type: 'success'
          });
          this.$nextTick(() => {
                if(this.$refs.headerForm){
                  this.$refs.headerForm.resetFields(); //提交表单后清空表单
                }
            })
          this.dialogFormVisible1 = false
          this.getHeaderList()
        } else if(code == '99999' & data == '配置字段与系统内存在重复，请检查') {
            this.$message.error({
              message: data,
              type: 'error',
              center: true
            })
        }
      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      this.loading = false
    },
    onSubmitChangeToken() {
      const params = {
        'token': this.tg_token
      };
      this.loading = true
      let self = this;
      tgChangeToken(params).then((res) => {
        let {code, data} = res;
        if (code == '20000') {
          this.$message({
            message: 'token配置成功',
            type: 'success'
          })
        } else {
          self.$message.error({
            message: data,
            type: 'error',
            center: true,
          })
        }
      })
      this.loading = false;
    },
    onSubmitStartCreat() {
      this.loading = true
      if(this.formInline.toTime === null) {
        this.formInline.toTime = ""
      }
      console.info(this.formInline.toTime)
      const params = {
        'toTime': this.formInline.toTime
      };
       tgStartCreat(params).then((res) => {
          this.loading = false
          let {code, data} = res;
          if (code == '20000') {
            this.$message({
            message: '已开始执行',
            type: 'success'
          });
          } else {
              this.$message.error({
                  message: data,
                  type: 'success'
              })
          }
      })
      this.loading = false;
    },

    closeDialog() {
      this.headerForm = {}
    },
    scenechange(e) {
      if (e.length > 0) {
        this.timeDisabled = true
        this.timeValue = [e[0] * 1000, e[1] * 1000]
        this.$forceUpdate()
        this.tg_gid= ""
        this.tg_pid= ""
        this.tg_mobile= ""
        this.tg_sex= ""
        this.tg_uuid= ""
        this.tg_amount= ""
      } else {
        this.timeDisabled = false
        this.timeValue = []
        this.$forceUpdate()
      }

    },


  },
  created() {
    this.getHeaderList();
  },

};
</script>

<style scoped>
.scene {
  padding: 20px;
}

.AddMenuDialog_Content {
  padding: 20px 40px;
}
.AddMenuDialog_footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

