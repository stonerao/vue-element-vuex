<template>
    <section class="add-inp">
        <button @click="datas">click</button>
        <ul id="demo">
            <item class="item" :model="item" @drop="drop" v-for="item in treeData"></item>
        </ul>
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
                    { name: 'hello' },
                    { name: 'wat' },
                    {
                        name: 'child folder',
                        children: [
                            {
                                name: 'child folder',
                                children: [
                                    { name: 'hello' },
                                    { name: 'wat' }
                                ]
                            },
                            { name: 'hello' },
                            { name: 'wat' },
                            {
                                name: 'child folder',
                                children: [
                                    { name: 'hello' },
                                    { name: 'wat' }
                                ]
                            }
                        ]
                    }
                ]
            }

        }
    },
    created() {
        console.log(this.objData)
        this.treeData = this.objData
    },
    methods: {
        toggle: function() {
            if (this.isFolder) {
                this.open = !this.open
            }
        },
        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
        },
        addChild: function() {
            this.model.children.push({
                name: 'new stuff'
            })
        },
        drop() {

        },
        datas() { 
        }

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
<style>
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

.item div {
    padding-left: 0.2em;
    line-height: 1.5em;
    list-style-type: dot;
}

.bold {
    font-weight: bold;
}
</style>

