<template>
    <section class="add-inp">
        <div class="wrapper">
            <div class="container" v-dragula="colOne" bag="first-bag">
                <!-- with click -->
                <div v-for="text in arrsObjs" @click="onClick"  >{{text.department_name}} [click me]</div>
            </div>
            <div class="container" v-dragula="colTwo" :bag="bag">
                <div v-for="text in 5">{{text}}</div>
            </div>
        </div>
    </section>
</template>
<script>
import Vue from 'vue'
import VueDragula from 'vue-dragula'
Vue.use(VueDragula);
export default {
    props: ['objData'],
    data() {
        return {
            bag: 'first-bag',
            colOne: '111',
            colTwo: "123213",
            arrsObjs:[]
        }
    },
    render(){

    },
    created() {
        Vue.vueDragula.options('my-bag', {
            direction: 'vertical'
        })
        Vue.vueDragula.options('my-bag1', {
            direction: 'vertical'
        })
        Vue.vueDragula.eventBus.$on('drop', function (args) {
            console.log('drop: ' + args[0])
        })
        let obj = this.objData;
        let arr = [];
        let objFor = Data => {
            Data.forEach((x)=>{ 
                if(x.children){
                    arr.push(x);
                    objFor(x.children)
                }else{
                    arr.push(x)
                }
            }) 
            this.arrsObjs = arr;
        }
        objFor(obj)
    },
    methods: {
        onClick() {

        }
    }
}
</script>
<style>
.container div {
    cursor: move;
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    margin-bottom: 10px;
}
</style>

