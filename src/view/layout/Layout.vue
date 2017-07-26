<template>
    <div class="app">
        <div id="header">
            <HeadSide></HeadSide>
        </div>
        <div id="box">
            <el-col :span="leftStatus?3:1" id="box-side" class="box-side-min">
                <SideBar @Toggle="ToggleShow"></SideBar>
            </el-col>
            <el-col :span="leftStatus?21:23" id="box-main">
                <app-main></app-main>
            </el-col>
        </div>
    </div>
</template>
<script>
import { Main, HeadSide, SideBar } from '@/view/layout/index.js'
export default {
    data() {
        return {
            leftStatus: true
        }
    },
    components: {
        'app-main': Main, HeadSide, SideBar
    },
    created() {
    },
    methods: {
        ToggleShow(status) {
            this.leftStatus = status;
        }
    }
}
</script>
