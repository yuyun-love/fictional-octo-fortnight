<template>
    <div style="display:inline-block;">
        <label class="radio-label">国家: </label>
        <el-select v-model="countrycode" style="width:130px;">
            <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item"
            />
        </el-select>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: '中国'
            }
        },
        data() {
            return {
                options: this.GLOBAL.countryList
            }
        },
        computed:
            {
                countrycode: {
                    get() {
                        return this.value
                    }
                    ,
                    set(val) {
                        this.$emit('input', val)
                    }
                }
            }
    }
</script>
