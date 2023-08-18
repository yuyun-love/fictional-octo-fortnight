<template>
    <div style="display:inline-block;">
        <label class="radio-label">环境: </label>
        <el-select v-model="envname" style="width:130px;">
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
                default: '测试1'
            }
        },
        data() {
            return {
                options: this.GLOBAL.envList
            }
        },
        // methods: {
        //     handleFilter() {
        //         console.log('12312312312');
        //     },
        // },
        computed: {
            envname: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('input', val)
                }
            }
        }
    }
</script>
