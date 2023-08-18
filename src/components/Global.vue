<template>
</template>

<script>
    // const projectList = ['海外','他趣','配配']
    const projectList = [{
        value: '海外',
        label: '海外'
    }, {
        value: '海外金融',
        label: '海外金融',
    }
        , {
            value: '他趣',
            label: '他趣',
            // disabled: true
        }, {
            value: '配配',
            label: '配配'
        }]
    const hwTableList = [{title: "环境", prop: "env"}, {title: "电话号码", prop: "phone"}, {
        title: "昵称",
        prop: "nickname"
    }, {title: "金币", prop: "coinNum"}, {title: "钻石", prop: "diamondNum"},{title: "性别", prop: "gender"}, {title: "国家", prop: "countryName"}, {title: "uuid", prop: "uuid"}, {
        title: "是否会员",
        prop: "isVip"
    }, {title: "有效开房天数", prop: "validOpenPartyDays"},
    {title: "有效上麦时长", prop: "validOnMikeDuration"},
    {title: "创建时间", prop: "create_time"}]
    const ppTableList = [{title: "电话号码", prop: "phone"}, {title: "性别", prop: "gender"}, {
        title: "uuid",
        prop: "uuid"
    }, {title: "昵称", prop: "nickname"}, {title: "创建时间", prop: "create_time"}]
    const fcashTableList = [{title: "电话号码", prop: "phone"}, {title: "创建时间", prop: "create_time"}, {
        title: "环境",
        prop: "env"
    }]
    const tqTableList = [{title: "电话号码", prop: "phone"}, {title: "uuid", prop: "uuid"}, {
        title: "聊主类型",
        prop: "call_host"
    }, {title: "聊天室房主类型", prop: "chat"}, {title: "主播类型", prop: "host"}, {title: "家族Uuid", prop: "familyUuid"}, {title: "创建时间", prop: "create_time"}]
    // const hwTableList=[{title: "环境",prop: "env",width: "4%"},{title: "电话号码",prop: "phone",width: "12%"},{title: "性别",prop: "gender",width: "4%"},{title: "国家",prop: "countryName",width: "12%"},{title: "uuid",prop: "uuid",width: "12%"},{title: "是否会员",prop: "isVip",width: "4%"},{title: "是否真人认证",prop: "isReal",width: "5%"},{title: "创建时间",prop: "create_time",width: "16%"},]
    // const ppTableList=[{title: "电话号码",prop: "phone",width: "12%"},{title: "性别",prop: "gender",width: "4%"},{title: "uuid",prop: "uuid",width: "12%"},{title: "昵称",prop: "nickname",width: "5%"},{title: "创建时间",prop: "create_time",width: "16%"},]
    const countryList = ["🇨🇳 中国 (86)", "🇧🇷 巴西 (55)", "🇨🇦 加拿大 (1)", "🇮🇳 印度 (91)", "🇮🇩 印度尼西亚 (62)", "🇯🇵 日本 (81)", "🇵🇭 菲律宾 (63)", "🇺🇦 乌克兰 (380)", "🇺🇸 美国 (1)", "🇲🇽 墨西哥 (52)", "🇨🇴 哥伦比亚 (57)"]
    const envList = [{
        value: '测试1',
        label: '测试1'
    }, {
        value: '测试2',
        label: '测试2',
    }
        , {
            value: '测试3',
            label: '测试3',
        }]
    const envListMx = [{
        value: '正常包',
        label: '正常包'
    }, {
        value: '墨西哥包',
        label: '墨西哥包',
    }]
    const callhostlist = ['聊主', '公会聊主']
    const chathostlist = ['聊天室房主', '公会聊天室房主']
    const hostlist = ['主播', '公会主播']
    const departmentList = ['他趣测试组', '公共测试组','测试开发组', '海外测试组']
    const projectListLength = projectList.length

    function getRandProject() {
        var tem = Math.round(Math.random() * projectListLength)
        return projectList[tem]
    }

    // //线上飞书应用配置
    // const feishuConfig = {
    //     "client_id": "cli_a2551c8efb78d00d",
    //     "client_secret": "1FF9HPoXmb5s6Rt479cOHfC4OJlX3pLK",
    //     "redirect_uri": "http://qa.test.internal.taqu.cn/middlepage"
    // }

    // // 测试飞书应用配置
    // const feishuConfig = {
    //     "client_id": "cli_a2551c8efb78d00d",
    //     "client_secret": "1FF9HPoXmb5s6Rt479cOHfC4OJlX3pLK",
    //     "redirect_uri": "http://qa.test.internal.taqu.cn/middlepage"
    // }

    // 测试飞书应用配置
    // const feishuConfig = {
    //     "client_id": "cli_a26648bbf1f8d00d",
    //     "client_secret": "56eQmG2MF1ksiSvVJieqicY6JfmXkh3i",
    //     "redirect_uri": "http://127.0.0.1/middlepage"
    // }
    // 大数据应用列表
    const appcodeList = [{
      value: 'taqu',
      label: '他趣'
    },
      {
        value: 'hwsj',
        label: '海外社交'
      }
    ]
    const hwSystemList={'s1':'用户中心','s2':'sns服务中心','s3':'IM服务系统','s4':'RTC服务系统','s5':'商品系统','s6':'交易系统',
        's7':'活动系统','s8':'推荐系统','s9':'通知系统','s10':'智能控制中心','s11':'内容审核系统','s12':'统计报表系统','s13':'工会系统'
        ,'s14':'通用运营管理', 's15':'支付网关','s16':'业务基础组件','s21':'图片系统','s23':'家族业务系统', 's24':'数据同步服务'
        ,'s25':'聊天室业务系统', 's26':'风控系统','s27':'私信系统','s29':'游戏系统','s30':'游戏联运平台','s31':'任务中心',
        's32':'个人中心', 's35':'资源下载管理服务'}

    export default {
        projectList,
        projectListLength,
        getRandProject,
        countryList,
        envList,
        hwTableList,
        ppTableList,
        fcashTableList,
        tqTableList,
        departmentList,
        callhostlist,
        chathostlist,
        hostlist,
        envListMx,
        // feishuConfig,
        appcodeList,
        hwSystemList
    }
</script>

<style scoped>

</style>