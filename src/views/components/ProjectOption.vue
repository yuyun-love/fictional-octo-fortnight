<template>
    <div style="display:inline-block;">
        <label class="radio-label">项目: </label>
        <el-select v-model="projectname" style="width:110px;">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
            />
        </el-select>
    </div>
</template>

<script>
        props: {
            value: {
                type: String,
                default: '海外'
            }
        },
        data() {
            return {
                options: this.GLOBAL.projectList
            }
        },
        computed: {
            projectname: {
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
