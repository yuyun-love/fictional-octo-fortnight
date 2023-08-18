<template>
    <div style="display:inline-block;">
        <label class="radio-label">聊天室房主: </label>
        <el-select v-model="chathost" clearable  style="width:130px;">
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
                // default: '测试1'
            }
        },
        data() {
            return {
                options: this.GLOBAL.chathostlist,

            }
        },
        // methods: {
        //     handleFilter() {
        //         console.log('12312312312');
        //     },
        // },
        computed: {
            chathost: {
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
