<template>
    <div class="app">
        <div id="header">
            <HeadSide></HeadSide>
        </div>
        <div id="box">
            <el-col :span="3" id="box-side" class="box-side-min">
                <SideBar></SideBar>
            </el-col>
            <el-col :span="21" id="box-main">
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

        }
    },
    components: {
        'app-main': Main, HeadSide, SideBar
    },
    created() { 
    }
}
</script>
