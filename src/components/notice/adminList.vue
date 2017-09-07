<template>
    <div>
        <el-row>
            <el-col :span='15'> 
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh" />刷新-共1条记录
                </span>
            </el-col>
            <el-col :span="9">
                <div class="float-right"> 
                    <el-input placeholder="请输入试卷名称" icon="search" v-model="seach" :on-icon-click="seachClick" class="width150">
                    </el-input>
                </div>
            </el-col>
        </el-row> 
    </div>
</template>
<script>
export default{
    props:['state'],
    data(){
        return{
            seach:"",
            page:1,
            curpage:10,
        }
    },
    methods:{
        seachClick(){
            // 搜索
        }
    },
    created(){

    },
    mounted(){

    },
    watch:{
        
    }
}
</script>
