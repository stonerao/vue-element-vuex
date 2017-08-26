<template>
    <draggable class="item-template">  
        <div :class="{bold: isFolder}" @dblclick="changeType">
            <input v-model="model.label" placeholder="新增"></input>
            <span @click="changeType">新增下级</span>
            <span v-if="isFolder">+</span>
        </div>
        <div v-show="open" v-if="isFolder">
            <item class="item" v-for="model in model.children" :model="model">
            </item>
            <!-- <li class="add" @click="addChild">+</li> -->
        </div>
    </draggable>
</template>
<script>  
import Vue from 'vue'
import draggable from 'vuedraggable'
export default {
    name: 'item',
    props: {
        model: Object
    },
    data() {
        return {
            open: true
        }
    },
    render(h) {

    },
    created() {
        let _this = this;

    },
    computed: {
        isFolder: function() {
            return this.model.children &&
                this.model.children.length
        }
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
            } else {
                this.addChild()
            }
        },
        addChild: function() {
            this.model.children.push({
                name: ''
            })
        }
    },
    components: {
        draggable,
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

