<template>
    <section class="add-inp"> 

        <div id="demo" class="r-demos">
            <div class="r-demos-item">
                <div></div>
                <div>排序</div>
                <div>部门权限名称</div>
                <div>是否显示</div>
                <div>操作</div>
            </div>
        </div>
        <item class="item " :model="item" @drop="drop" v-for="item in treeData"></item>
    </section>
</template>
<script>
import Vue from 'vue'
import item from '@/components/architecture/item'

let id = 1000;
export default {
    props: ['objData'],
    data() {
        return {
            open: false,
            bag: 'first-bag',
            treeData: {
                name: 'My Tree',
                children: [ 
                ]
            }

        }
    },
    created() {
        console.log(this.objData)
        this.treeData = this.objData
    },
    methods: {
         

    }
    , components: {
        item
    }, computed: {
        isFolder: function() {
            return this.model.children &&
                this.model.children.length
        }
    }
}
</script>
<style lang="less">
.container div {
    cursor: move;
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    margin-bottom: 10px;
}

.item {
    cursor: pointer;
}
.item>div{
    margin-block-end:5px;
}
.r-demos-inp{
   
}
 
 
</style>

