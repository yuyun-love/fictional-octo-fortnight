<template>
  <div class="app-container"  v-loading="loading" element-loading-text="处理中" element-loading-spinner="el-icon-loading">
    <aside>
      修改用户道具卡数量(前提用户得到过)，修改成功后展示用户道具卡明细
      <br>
      注：通过工具修改，后台道具日志不会记录行为信息
    </aside>
      <el-backtop :bottom="100" :visibility-height="50"></el-backtop>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div>
          <el-form-item label="环境">
            <el-select v-model="formInline.env"  placeholder="请选择" style="width:100px;">
              <el-option label="测试1" value="测试1">测试1</el-option>
              <el-option label="测试2" value="测试2">测试2</el-option>
              <el-option label="测试3" value="测试3">测试3</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="道具卡">
            <el-select v-model="formInline.props"  placeholder="不选默认全部道具卡" style="width:200px;" multiple collapse-tags clearable>
              <el-option label="私信卡" value="私信卡">私信卡</el-option>
              <el-option label="通话卡" value="通话卡">通话卡</el-option>
              <el-option label="搭讪卡" value="搭讪卡">搭讪卡</el-option>
              <el-option label="会员私信卡" value="会员私信卡">会员私信卡</el-option>
              <el-option label="会员通话卡" value="会员通话卡">会员通话卡</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number v-model="formInline.num" :min="0" oninput="if(value<0)value=0" style="width: 130px"></el-input-number>
          </el-form-item>
          <el-form-item label="UUID">
            <el-input v-model="formInline.uuid" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </el-form-item>
        </div>
      </el-form>
      <br>
      <el-table :data="result" style="width: 100%" v-show="showType==1">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="user_uuid" label="UUID"></el-table-column>
        <el-table-column prop="prop_uuid" label="道具卡"></el-table-column>
        <el-table-column prop="prop_num" label="数量"></el-table-column>
      </el-table>

  </div>
</template>

<script>
  import { updatePropCard } from '@/api/testTool'

  export default {
    data() {
      return {
        result: [],
        showType: 0,
        autoLoading: false,
        formInline: {
          env: '测试3',
          props: [],
          num: 0,
          uuid: ''
        },
        loading: false,
      }
    },
    methods: {
      onSubmit() {
        const params = {
          'env': this.formInline.env,
          'props': this.formInline.props,
          'num': this.formInline.num,
          'uuid': this.formInline.uuid
          };
        this.showType = 0
        this.loading = true
        updatePropCard(params).then((res) => {
          let {msg, data} = res;
          this.loading = false;
          if (msg === 'success') {
              this.result = data
              this.showType = 1
          } else {
              this.$message.error({
                  message: msg,
                  center: true,
              })
          }
      })
      },
    }
  }
</script>
<style>


</style>