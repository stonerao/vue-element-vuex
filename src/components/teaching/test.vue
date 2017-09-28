<template>
    <div class="r-alert" v-show="alert">
        <div class="r-alert-content">
            <div class="r-alert-title">
                某某教材
                <i class="r-over float-right" @click="clickIsAlaer"></i>
            </div>
            <pre v-html="datas[page].zc_content" class="r-box-wen" s >
                    
                </pre>
            <div class="kd-page r-pages">
                <el-row> 
                    <el-col :span="24">
                        <el-pagination class="float-right"  @current-change="handleCurrentChange" :current-page="1" :page-sizes="[1]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="datas.length">
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['status', 'datas'],
    data() {
        return {
            alert: this.status || false,
            page:0
        }
    },
    methods: {
        clickIsAlaer() {
            this.$emit('isAlertClick', false)
        },
        handleCurrentChange(val){
            this.page=val-1;

        }
    },
    watch: {
        status(val) {
            this.alert = val
        }
    },
    created() {
        // setInterval(()=>{
        //     console.log(this.status)
        // },2000)
        console.log(this.datas)
    }
}
</script>

<style>
.r-box-wen {
    padding: 20px 20px 50px 20px;
    
}
.r-pages{
    position: absolute;
    bottom:5px;
    widows:100%;
    left:10px;
    right:10px;
}
pre{  height:70%; overflow: auto; overflow-x:hidden}    
</style>

