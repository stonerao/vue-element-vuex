<template>
    <div>
        <el-row :gutter="10" class="class-header">
            <el-col :span="4" class="class-titles">
                <span>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs marginleft5" @click="resh"/>刷新-共{{all_pagecount}}条记录
                </span>
            </el-col>
            <el-col :span="20">
                <div class="float-right">
                    <el-select v-model="val1" placeholder="一级分类" class="width125">
                        <el-option v-for="item in classList.obj1.items" :key="item.tc_id" :label="item.tc_name" :value="item.tc_id">
                        </el-option>
                    </el-select>
                    <el-select v-model="val2" placeholder="二级分类" class="width125">
                        <el-option v-for="item in classList.obj2.items" :key="item.tc_id" :label="item.tc_name" :value="item.tc_id">
                        </el-option>
                    </el-select>
                    <el-select v-model="val3" placeholder="三级分类" class="width125">
                        <el-option v-for="item in classList.obj3.items" :key="item.tc_id" :label="item.tc_name" :value="item.tc_id">
                        </el-option>
                    </el-select>
                    <el-select v-model="val4" placeholder="四级分类" class="width125">
                        <el-option v-for="item in classList.obj4.items" :key="item.tc_id" :label="item.tc_name" :value="item.tc_id">
                        </el-option>
                    </el-select>
                    <el-select v-model="val5" placeholder="五级分类" class="width125">
                        <el-option v-for="item in classList.obj5.items" :key="item.tc_id" :label="item.tc_name" :value="item.tc_id">
                        </el-option>
                    </el-select>
                    <el-input placeholder="搜索" icon="search" v-model="seach" :on-icon-click="handleIconClick" class="width125">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <div>
            <ul class="r-my-teaching">
                <router-link tag="li" :to="{path:'../shoping',query:{id:item.paper_id}}" v-for="item in items" :key="item.paper_id">
                    <div class="text-center">
                        <img src="../../assets/index/fenm.jpg" />
                    </div>
                    <div class="text-center r-my-teaching-title">{{item.paper_name}}</div>
                </router-link>
            </ul>
        </div>
        <div class="kd-page">
            <el-row>
                <el-col :span="0" style="padding-left:15px">
                    <!-- <el-button type="primary" size="mini">删除</el-button> -->
                </el-col>
                <el-col :span="24">
                    <el-pagination class="float-right" @size-change="SizeChange" @current-change="CurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="all_pagecount">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import store from '@/utils/teaching'
export default {
    props:['state'],
    data() {
        return { 
            val1: '',
            val2: '',
            val3: '',
            val4: '',
            val5: '',
            valId: 0,
            value: '',
            seach: '',
            currentPage: 1,//当前页数
            pageSize: 10,//当前页面数量
            pageSizes: [10, 20, 30],//每页显示个数选择器的选项设置	
            all_pagecount:5,
            classList: {
                obj1: {
                    items: [],
                    id: ''
                }, obj2: {
                    items: [],
                    id: ''
                }, obj3: {
                    items: [],
                    id: ''
                }, obj4: {
                    items: [],
                    id: ''
                }, obj5: {
                    items: [],
                    id: ''
                },
            }, 
            items:[],
            classId:0,
        }
    },
    methods: {
        dataAjax(id) {
            this.items = [];
            store.teachingList.call(this, id);
        },
        dataClassList(id, state) {
            store.teaching_classlist.call(this, id, state);
        },
        SizeChange(num) { 
            this.pageSize = num;
            this.dataAjax(this.classId);
        },
        CurrentChange(val) {
            this.currentPage = val;
            this.dataAjax();//翻页更新数据 
        },
        SelectionChange() {

        },
        onIconClick() {

        },
        handleIconClick() {
            //点击搜索 
            let list = this.classList;
            let arr = []; 
            for(let key in list){
                if(list[key].id!=''){
                    arr.push(list[key].id)
                }else{
                    break
                }
            }
            let id = arr[arr.length-1];
            this.classId = id;
            this.dataAjax(id)
        },
        resh(){
            // 刷新
            this.dataAjax()
        }
    },
    created() {
        this.dataClassList('', 1)
        this.dataAjax()
    },
    mounted() {
        console.log(this.state)
    },
    watch: {
        dateGo(val) {
            let date = Date.parse(val);
            this.date.go = date;
        },
        dataOver(val) {
            let date = Date.parse(val);
            this.date.over = date;
        },
        // 五级联动
        val1(val) {
            this.dataClassList(val, 2);
            this.val2 = '';
            this.classList.obj1.id = val;
            this.classList.obj2 = { items: [], id: '' };
            this.classList.obj3 = { items: [], id: '' };
            this.classList.obj4 = { items: [], id: '' };
            this.classList.obj5 = { items: [], id: '' };
        },
        val2(val) {
            this.dataClassList(val, 3);
            this.val3 = '';
            this.classList.obj2.id = val;
            this.classList.obj3 = { items: [], id: '' };
            this.classList.obj4 = { items: [], id: '' };
            this.classList.obj5 = { items: [], id: '' };
        },
        val3(val) {
            this.dataClassList(val, 4);
            this.val4 = '';
            this.classList.obj3.id = val;
            this.classList.obj4 = { items: [], id: '' };
            this.classList.obj5 = { items: [], id: '' };
        },
        val4(val) {
            this.val5 = '';
            this.classList.obj4.id = val;
            this.classList.obj5 = { items: [], id: '' };
            this.dataClassList(val, 5)
        },
        val5(val) {
            this.classList.obj5.id = val;
        }
    }
}
</script>
<style>
.margin-reset.el-button--default {
    margin-left: 0
}
</style>
