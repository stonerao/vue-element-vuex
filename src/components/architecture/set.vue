<template>
    <section class="add-inp">
        <div class="tree">
            <nav class='navbar'>
                <ul class='nav nav-stacked'>
                    <template v-for='item in menus'>
                      
                        <li role='presentation' >
                             <Tree :obj="item.children"></Tree>
                        </li>
                    </template>
                </ul>
            </nav>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
     <Tree></Tree>
    </section>
</template>
<script>
import Vue from 'vue' 
import Tree from './tree' 
let id = 1000;
export default {
    props: ['objData'],
    data() {
        return {
            bag: 'first-bag',
            colOne: '111',
            colTwo: "123213",
            arrsObjs: [],
            menus: [{
                text: '水果',
                expanded: false,
                children: [{
                    text: '苹果',
                    children: [{
                        text: '糖',
                    }, {
                        text: '面包'
                    }, {
                        text: '火腿'
                    }, {
                        text: '薯片'
                    }, {
                        text: '碎碎面',
                        children: [{
                            text: '糖',
                        }, {
                            text: '面包'
                        }, {
                            text: '火腿'
                        }, {
                            text: '薯片'
                        }, {
                            text: '碎碎面'
                        }]
                    }]
                }, {
                    text: '荔枝'
                }, {
                    text: '葡萄'
                }, {
                    text: '火龙果'
                }]
            }]

        }
    }, 
    created() {
        
         
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

        },
        toggleChildren: function (item) {
            item.expanded = !item.expanded;
        },

    }
    ,components:{
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

