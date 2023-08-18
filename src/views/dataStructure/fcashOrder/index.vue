<template>
    <div class="app-container">
        <div>
            <el-row>
            <el-button type="primary" style="margin:0 0 20px 20px;" :loading="autoLoading"
                       @click="autoCreateOrder">
                开始创建
            </el-button>
            </el-row>
        </div>

        <el-table :data="orderList"  style="width: 100%;">
            <el-table-column prop="orderPhone" label="电话" width="180"></el-table-column>
            <el-table-column prop="orderNo" label="订单号" width="180"></el-table-column>
            <el-table-column prop="orderType" label="订单类型" width="180"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="createUser" label="操作人" width="180"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    // options components
    import {autoCreateOrders,getOrders} from '@/api/testTool'
    import {getUserName} from "../../../utils/auth";

    export default {
        data() {
            return {
                pageSize: 30,
                orderList: [],
                autoLoading: false
            }
        },

        methods: {
            autoCreateOrder() {
                const params = {
                    'username': getUserName()
                };
                this.autoLoading = true
                autoCreateOrders(params).then(response => {
                    this.autoLoading = false
                    let {msg, code} = response;
                    if (code == '20000' && msg == 'success') {
                        this.$message({
                            message: '自动创建订单成功',
                            type: 'success'
                        });
                        this.getOrderList();
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
            getOrderList() {
                getOrders().then((res) => {
                    let {code, data} = res;
                    if (code == 20000) {
                        this.orderList = data
                    } else {
                        self.$message.error({
                            message: data,
                            center: true,
                        })
                    }
                })
            },

        },
        mounted() {
            this.getOrderList();
        }
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
