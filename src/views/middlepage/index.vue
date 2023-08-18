<template>
    <div></div>
</template>

<script>
    export default {
        created(){
            if(this.$route.query.code){
                console.info(this.$route.query.code)
                this.$store.dispatch("user/login",this.$route.query.code).then(
                    ()=>{this.$router.push({path:"/"});})
            }else{
                this.$router.push({path:"/api/getToken"});
            }
        }
    }
</script>

<style scoped>

</style>