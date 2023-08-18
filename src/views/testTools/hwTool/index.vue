<template>
  <div
    class="app-container"
    v-loading="loading"
    element-loading-text="loading"
    element-loading-spinner="el-icon-loading"
  >
    <aside>说明<br>
      聊天室上麦造数：房间必须开播，且上麦模式为自动上麦模式(暂且只能支持正常情况下用户上麦，不要操作踢人下麦操作)，上麦时长输入时间的方式，时间到了，会下麦<br>
      聊天室抽奖工具：输入手机号，对应的抽奖id和次数，点击按钮，返回对应奖品的概率值</aside>

    <el-form  ref="form" :model="hwForm" :rules="rules" inline >
      <el-form-item prop="envname">
        <label class="radio-label">环境: </label>
        <el-select v-model="hwForm.envname" style="width: 90px; margin: 5px">
          <el-option
            v-for="item in envOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="scene">
        <label class="radio-label">业务场景: </label>
        <el-select v-model="hwForm.senceType" style="width: 150px; margin:5px" >
          <el-option
            v-for="item in scene"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item     v-show="hwForm.senceType==1" prop="phone"  >
        <label class="radio-label">手机号:</label>
        <el-select
          v-model="hwForm.countrycode"
          style="width: 70px; margin: 5px"
          disabled
        ></el-select>
        <el-input
          v-model="hwForm.phone"
          style="width: 150px; margin: 5px"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="lotteryId"  v-show="hwForm.senceType==1">
        <label class="radio-label">抽奖id:</label>
        <el-input
          v-model="hwForm.lotteryId"
          style="width: 100px; margin: 5px"
          placeholder="输入抽奖id"
        ></el-input>
      </el-form-item>
      <el-form-item prop="number"    v-show="hwForm.senceType==1">
        <label class="radio-label">抽奖次数:</label>
        <el-input
          v-model="hwForm.number"
          placeholder=""
          style="width: 60px; margin: 5px"
          :min="2"
          :max="1000"
        ></el-input>
      </el-form-item>
      <el-button   v-show="hwForm.senceType==1"
        type="primary"
        style="margin: 5px 0 20px 20px"
        :loading="loading"
        @click="lottery1"
        >确认</el-button>
      <el-form-item    v-show="hwForm.senceType==2" prop="partyId" >
        <label class="radio-label">房间id:</label>
        <el-input
          v-model="hwForm.partyId"
          style="width: 100px; margin: 5px"
          placeholder="输入房间id"
        ></el-input>
      </el-form-item>

      <el-form-item  v-show="hwForm.senceType==2" prop="num" >
        <label class="radio-label">上麦人数:</label>
        <el-input
          v-model="hwForm.num"
          style="width: 100px; margin: 5px"
          :min="1"
        ></el-input>
      </el-form-item>

      <el-form-item  v-show="hwForm.senceType==2" prop="minute" >
        <label class="radio-label">上麦时长(单位是分钟):</label>
        <el-input
          v-model="hwForm.minute"
          style="width: 100px; margin: 5px"
          placeholder="输入整数"
          :min="1"
        ></el-input>
      </el-form-item>

      <el-button  v-show="hwForm.senceType==2"
        type="primary"
        style="margin: 5px 0 20px 20px"
        :loading="loading"
        @click="onMic"
        >确认</el-button>

    </el-form>

    <el-table style="width: 50%" :data="testTest"  :row-style="{height:'35px'}"  v-show="hwForm.senceType==1">
      <el-table-column prop="drawName" label="奖品" width="130" />
      <el-table-column prop="probability" label="概率" width="80" />
      <el-table-column prop="times" label="抽中次数" width="80" />
      <el-table-column prop="number" label="抽奖总次数" width="100" />
    </el-table>


  </div>
</template>

<script>
import {lottery, mic} from "@/api/testTool";


export default {
  name: "index",
  data() {
    return {
      envOptions: this.GLOBAL.envList,
      hwForm:{
        envname: "测试1",
        senceType:"",
        countrycode: 86,
        phone: "",
        lotteryId: "",
        number: 2,
        partyId:"",
        num:"1",
        minute:"1",
      },
      scene:[
        {
          value:1,
          label:"聊天室抽奖工具"
        },{
          value: 2,
          label: "聊天室上麦人数"
        }
      ],
      chatParty:{
      },
      model: {
      },
      testTest: [],
      rules: {
        phone: [{ validator:(rule, value, callback) => {
          if(this.hwForm.senceType==1 && !value){
            callback(new Error('手机号不能为空'));
          }else callback();
      }}],
        lotteryId: [{ validator:(rule, value, callback) => {
          if(this.hwForm.senceType==1 && !value){
            callback(new Error('抽奖id不能为空'));
          }else callback();
      }}],

        partyId: [{ validator:(rule, value, callback) => {
          if(this.hwForm.senceType==2 && !value){
            callback(new Error('partyId不能为空'));
          }else callback();
      }}],
        num: [{ validator:(rule, value, callback) => {
          if(this.hwForm.senceType==2 && !value){
            callback(new Error('上麦人数不能为空'));
          }else callback();
      }}],
      },
      loading: false,
    };
  },

  methods: {
    lottery1() {
      const params = {
        env: this.hwForm.envname,
        phone: this.hwForm.phone,
        lotteryId: this.hwForm.lotteryId,
        number: this.hwForm.number,
      };
      console.info(params);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.testTest = []
          lottery(params).then((response) => {
            let { code, data, msg } = response;
            this.loading = false;
            console.log(valid);
            if (code == "20000" && typeof data != "string") {
              this.$message.success({
                message: msg,
              });
              let obj = data || {};
              let obj1 = Object.keys(obj);
              let objList = [];
              obj1.forEach((item) => {
                objList.push({
                  drawName: obj[item].drawName,
                  probability: obj[item].probability,
                  times:obj[item].times,
                  number: params.number,
                });
              });
              this.testTest = objList;
            } else {
              this.$message.error({
                message: data,
                center: true,
              });
            }
          }).finally(()=>this.loading = false);
        }
      });
    },
    onMic(){
      const param = {
        env: this.hwForm.envname,
        partyId: this.hwForm.partyId,
        num: this.hwForm.num,
        minute: this.hwForm.minute,
      };
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          mic(param).then((response) => {
            let { code,  msg, data } = response;
            console.log(valid);
            if (code == "20000" ) {
              this.$message.success({
                message: data,
              });
            } else {
              this.$message.error({
                message: msg,
                center: true,
              });
            }
          }).finally(()=>this.loading = false);
        }
      });
    },
  },
};
</script>

<style scoped>
.el-table__body tr{
height:52px;
}

</style>