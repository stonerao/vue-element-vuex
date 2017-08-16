<template>
    <div class="tree">
        <nav class='navbar'>
            <ul class='nav nav-stacked'>
                <template v-for='item in menus'>
                    <li role='presentation' v-if='!item.children'>
                        <a>{{item.text}}</a>
                    </li>
                    <li role='presentation' v-if='item.children'> 
                        <Tree :obj="item.children"></Tree>
                        <a v-on:click='toggleChildren(item)'>{{item.text}}
                            <span class='glyphicon' v-bind:class='{ "glyphicon-chevron-right": !item.expanded, "glyphicon-chevron-down": item.expanded }'></span>
                        </a>
                        <ul v-show='item.expanded' class="childs">
                            <li v-for='child in item.children'>
                                <a>{{child.text}}</a>
                            </li>
                        </ul>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>
<script>
import Vue from 'vue' 
import Tree from './tree1' 
let id = 1000;
export default {
    props: ['obj'],
    data() {
        return {
            bag: 'first-bag',
            colOne: '111',
            colTwo: "123213",
            arrsObjs: [],
            menus: this.obj

        }
    },
    render(h) {

    },
    created() {
        console.log(this.obj)
        // Vue.vueDragula.options('my-bag', {
        //     direction: 'vertical'
        // })
        // Vue.vueDragula.options('my-bag1', {
        //     direction: 'vertical'
        // })
        // Vue.vueDragula.eventBus.$on('drop', function (args) {
        //     console.log('drop: ' + args[0])
        // })
        // let obj = this.objData;
        // let arr = [];
        // let objFor = Data => {
        //     Data.forEach((x) => {
        //         if (x.children) {
        //             arr.push(x);
        //             objFor(x.children)
        //         } else {
        //             arr.push(x)
        //         }
        //     })
        //     this.arrsObjs = arr;
        // }
        // objFor(obj)
    },
    methods: {
        onClick() {

        }, toggleChildren: function (item) {
            console.log(item)
            item.expanded = !item.expanded;
        },
    } ,components:{
        Tree
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

