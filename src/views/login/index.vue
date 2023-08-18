<template>
    <div id="login_container">
    </div>
</template>

<script>
    export default {
        name: "Test_des",
        data() {
            return {}
        },
        created() {
            // window.location.href = 'https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=' + this.GLOBAL.feishuConfig.client_id + '&redirect_uri=' + this.GLOBAL.feishuConfig.redirect_uri + '&response_type=code&state=state123456';
            window.location.href = 'https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=' + process.env.VUE_APP_CLIENT_ID + '&redirect_uri=' + process.env.VUE_APP_REDIRECT_URI + '&response_type=code&state=state123456';
            // window.location.href = 'https://passport.feishu.cn/suite/passport/oauth/authorize?client_id=cli_a2551c8efb78d00d&redirect_uri=http://0.0.0.0/middlepage&response_type=code&state=state123456';

        },
    }
</script>

<style scoped>

</style>