<template>
    <div class="r-alert"  v-show="alert">
        <div class="r-alert-content">
            <div class="r-alert-title">
                某某教材
                <i class="r-over float-right" @click="clickIsAlaer"></i>
            </div>
            <div v-html="datas">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['status','datas'],
    data() {
        return {
            alert: this.status || false,
        }
    },
    methods: {
        clickIsAlaer() {
            this.$emit('isAlertClick', false)
        }
    },
    watch:{
        status(val){  
            this.alert = val
        }
    },
    created(){
        // setInterval(()=>{
        //     console.log(this.status)
        // },2000)
        console.log(this.datas)
    }
}
</script>

<style>

</style>

