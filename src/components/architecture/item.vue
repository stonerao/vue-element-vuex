<template>
    <div class="item-template">   
        <!-- <div :class="{bold: isFolder}" @dblclick="changeType">
            <span></span>
            <input type="checkbox"/><span v-if="isFolder" @click="changeType">+</span>
            <input v-model="model.label" placeholder="新增" class="r-demos-inp" :class="!isFolder?'marginleft15':''"></input>
            <span>新增下级</span> 
        </div>
        <div v-show="open" v-if="isFolder" class="r-demos-elment">
            <item class="item" v-for="model in model.children" :model="model">
            </item> 
        </div> -->
    </div>
</template>
<script>   
export default {
    // name: 'item',
    // props: {
    //     model: Object
    // },
    // data() {
    //     return {
    //         open: true
    //     }
    // },
    // render(h) {

    // },
    // created() {
    //     let _this = this;

    // },
    // computed: {
    //     isFolder: function() {
    //         return this.model.children &&
    //             this.model.children.length
    //     }
    // },
    // methods: {
    //     toggle: function() {
    //         if (this.isFolder) {
    //             this.open = !this.open
    //         }
    //     },
    //     changeType: function() {
    //         if (!this.isFolder) { 
    //             Vue.set(this.model, 'children', [])
    //             this.addChild()
    //             this.open = true
    //         } else {
    //             this.addChild()
    //         }
    //     },
    //     addChild: function() {
    //         this.model.children.push({
    //             name: ''
    //         })
    //     }
    // },
    // components: {
    //     draggable,
    // }
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

