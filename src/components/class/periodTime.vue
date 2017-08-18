<template>
    <div>
        <!-- 排课时间段选择组件 -->
        <div class="inline-block" style="width: 100%;">
            <el-time-picker is-range v-model="when" placeholder="选择时间" style="width: 100%;"></el-time-picker>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'

export default {
    props: ['EachTime'],
    data() {
        return {
           when: [], 
        }
    },
    created() {

    },
    components: {
        
    },
    methods: {
        
    },
    watch:{
        when(val){
            this.$emit("EachTime",val);
        }
    }
}
</script>
 
<style scoped>
    .el-time-panel{
       width: 100%!important; 
    }
</style>
