<template>
    <div class="r-dialog r-aasdad" @click="over">
        <div class="r-conf-view">
            <p class="r-dialog-head">
                <span class="r-dialog-title">添加成员</span>
            </p>
            <div class="r-zuyuan-confier">

                <div class="el-transfer-panel" titles="" buttontexts="" filterplaceholder="" leftdefaultchecked="" rightdefaultchecked="" value="1,4,3,10,13,7">
                    <!-- 列表1 -->
                    <p class="el-transfer-panel__header">组织列表</p>
                    <div class="el-transfer-panel__body r-transfer-panel__body">
                        <el-tree :data="sdata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>

                </div>

                <div class="el-transfer-panel" titles="" buttontexts="" filterplaceholder="" leftdefaultchecked="" rightdefaultchecked="" value="1,4,3,10,13,7">
                    <!-- 列表1 -->
                    <p class="el-transfer-panel__header">人员列表
                        <el-checkbox v-model="is_all" class="float-right" style="margin-right:10px">全选</el-checkbox>
                    </p>
                    <div class="el-transfer-panel__body r-transfer-panel__body">
                        <!---->
                        <div class="el-checkbox-group el-transfer-panel__list">
                            <span v-if="t_data.length==0" class='el-checkbox el-transfer-panel__item'>暂无数据</span>
                            <el-checkbox-group v-model="check_id">
                                <label class="el-checkbox el-transfer-panel__item" v-for="(item,index) in t_data" :key="index">
                                    <!-- <span class="el-checkbox__input">
                                                                                        <span class="el-checkbox__inner"></span><input type="checkbox" class="el-checkbox__original" value="2"></span>
                                                                                    <span class="el-checkbox__label">
                                                                                        <span>{{item.teacher_name}}</span>
                                                                                       
                                                                                    </span> -->
                                    <el-checkbox :label="item">{{item.teacher_name}}</el-checkbox>
                                </label>
                            </el-checkbox-group>
                        </div>
                        <p class="el-transfer-panel__empty" style="display: none;">无匹配数据</p>
                        <p class="el-transfer-panel__empty" style="display: none;">无数据</p>
                    </div>
                    <p class="el-transfer-panel__footer">
                        <label class="el-checkbox float-right" style="margin-top:5px;margin-right:15px">
                            <el-button size="mini" @click="submit_item">确定</el-button>
                        </label>
                    </p>
                </div>

                <div class="el-transfer-panel" titles="" buttontexts="" filterplaceholder="" leftdefaultchecked="" rightdefaultchecked="" value="1,4,3,10,13,7">
                    <!-- 列表1 -->
                    <p class="el-transfer-panel__header">已选人员列表
                        <!-- <el-checkbox v-model="is_all_check" class="float-right" style="margin-right:10px">全选</el-checkbox> -->
                    </p>
                    <div class="el-transfer-panel__body r-transfer-panel__body">
                        <!---->
                        <div class="el-checkbox-group el-transfer-panel__list">
                            <el-checkbox-group v-model="check_all_id">
                                <label class="el-checkbox el-transfer-panel__item" v-for="(item,index) in check_all" :key="index">
                                    <!-- <span class="el-checkbox__input">
                                                                                        <span class="el-checkbox__inner"></span><input type="checkbox" class="el-checkbox__original" value="2"></span>
                                                                                    <span class="el-checkbox__label">
                                                                                        <span>{{item.teacher_name}}</span>
                                                                                       
                                                                                    </span> -->
                                    <el-checkbox :label="item">{{item.teacher_name}}</el-checkbox>
                                    <el-button size="mini" @click="quit_all(index,true)" class="float-right" style="margin-right:10px;margin-top:3px;">x</el-button>
                                </label>
                            </el-checkbox-group>
                        </div>
                        <p class="el-transfer-panel__empty" style="display: none;">无匹配数据</p>
                        <p class="el-transfer-panel__empty" style="display: none;">无数据</p>
                    </div>
                    <p class="el-transfer-panel__footer">
                        <label class="el-checkbox float-right" style="margin-top:5px;margin-right:15px">
                            <el-button size="mini" @click="quit_all">删除</el-button>
                            <el-button size="mini" @click="submit_all">确定</el-button>
                        </label>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import info from '@/utils/l_axios'
import store from '@/utils/architecture'
export default {
    data() {
        return {
            sdata: [{
                label: '一级 1',
                children: [{
                    
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            department_id: '',
            t_data: [],
            check_id: [],
            check_all: [],
            check_all_id: [],
            is_all: false,
            is_all_check: false

        }
    },
    methods: {

        handleNodeClick(data) { 
            // this.department_id = data.department_id;
            this.list(data.department_id)
        },
        list(id) {
            this.$http('Admin/Meeting/get_member_list', {
                params: {
                    token: getToken(),
                    department_id: id
                }
            }).then((res) => {
                if (res.data.code == 200) {
                    this.t_data = res.data.data;
                    this.is_all=false;
                }
            })
        },
        submit_item() {
            // 选择 到列表
            this.check_id.forEach((x) => { 
                if (this.check_all.indexOf(x) === -1) {
                    this.check_all.push(x);
                }
            })
        },
        quit_all(index,state) {
            //删除所选
            if(!state){ 
                this.check_all_id.forEach((x) => {
                    let index = this.check_all.indexOf(x);
                if (index !== -1) {
                    this.check_all.splice(index,1);
                }
            })
            this.check_all_id = [];
            }else{
                 this.check_all.splice(index,1);
            }
        },
        submit_all() {
            // 提交
            this.$emit("data",this.check_all);
            this.$emit("view_over")
        },
        over(e){
            if(e.target.className.indexOf("r-dialog")!==-1){
                this.$emit("view_over")
            }
       
        }
    },
    created() {
        store.department_list.call(this);

    },
    watch: {
        check_id(data) { 
        },
        check_all_id(data) { 
            data.length!=this.check_all.length?this.is_all_check=false:'';
        },
        is_all(data) {
            if (data) {
                this.check_id = [];
                this.check_id = this.t_data
            } else {
                this.check_id = [];
            }
        },
        is_all_check(data) {
            if (data) {
                this.check_all_id = [];
                this.check_all_id = this.check_all
            } else {
                this.check_all_id = [];
            }
        },
        check_all(data){ 
        }
    }
}
</script>

<style lang="less">
.r-conf-view {
    position: fixed;
    height: 600px;
    width: 1000px;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.r-zuyuan-confier {
    >div {
        width: 30%;
        margin-left: 2%;
    }
}

.el-transfer-panel__body.r-transfer-panel__body {
    height: 452px;
    overflow-y: auto;
    .el-transfer-panel__list {
        height: 452px;
        overflow-y: auto;
    }
}
</style>
