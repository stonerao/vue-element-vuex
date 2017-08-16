<template>
    <section class="add-inp">
        <input v-model="newTodoText" v-on:keyup.enter="addNewTodo" placeholder="Add a todo">
        <ul>
            <li is="todo-item" v-for="(todo, index) in todos" v-bind:key="todo.id" v-bind:title="todo.title" v-on:remove="todos.splice(index, 1)"></li>
        </ul>
        <div class="wrapper">
            <div class="container" v-dragula="colOne" bag="first-bag">
                <!-- with click -->
                <div v-for="text in arrsObjs" @click="onClick">{{text.department_name}} [click me]</div>
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
Vue.component('todo-item', {
    template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
    props: ['title']
})

export default {
    props: ['objData'],
    data() {
        return {
            bag: 'first-bag',
            colOne: '111',
            colTwo: "123213",
            arrsObjs: [],
            newTodoText: '',
            todos: [
                {
                    id: 1,
                    title: 'Do the dishes',
                },
                {
                    id: 2,
                    title: 'Take out the trash',
                },
                {
                    id: 3,
                    title: 'Mow the lawn'
                }
            ],
            nextTodoId: 4
        }
    },
    render(h) {

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
            Data.forEach((x) => {
                if (x.children) {
                    arr.push(x);
                    objFor(x.children)
                } else {
                    arr.push(x)
                }
            })
            this.arrsObjs = arr;
        }
        objFor(obj)
    },
    methods: {
        onClick() {

        },
        addNewTodo: function () {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
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

