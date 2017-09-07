<template>
    <div class="r-alert">
        <div class="r-exam">
            <p class="r-alert-title">
                开始考试
                <i class="r-over float-right" @click="over"></i>
            </p>
            <div>
                <ul class="r-alert-list">
                    <li><span>试卷名称：</span><span class="marginleft10">{{obj.e_title}}</span></li>
                    <li><span>考试时长：</span><span class="marginleft10">{{obj.e_whenlong}}分钟</span></li>
                    <li><span>卷面总分：</span><span class="marginleft10">{{obj.e_allsource}}</span></li> 
                    <li><button @click="submit">开始考试</button></li> 
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['obj'],
    data() {
        return {

        }
    },
    created(){
        console.log(this.obj)
    },
    methods:{
        over(){
            this.$emit("is_over",false)
        },
        submit(){
            // this.$emit("examgood",true)
            if(this.obj.e_id)
            this.$router.push({path:'/good_exam',query:{e_id:this.obj.e_id}})
        }
    }
}
</script>

<style>

</style>
