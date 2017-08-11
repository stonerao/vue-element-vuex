<template>
    <section class="add-inp">
        <div class="add-inp-items">
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    用户名：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="obj.member_name" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    姓名：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="obj.user_name" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    性别：
                </div>
                <div class="add-inp-item-inp">
                    <el-radio class="radio" v-model="obj.user_sex" label="1">保密</el-radio>
                    <el-radio class="radio" v-model="obj.user_sex" label="2">男</el-radio>
                    <el-radio class="radio" v-model="obj.user_sex" label="3">女</el-radio>
                </div>
                <div class="add-inp-item-addname margin-left"> </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    密码：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="obj.password" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    职位：
                </div>
                <div class="add-inp-item-inp">
                    <el-select v-model="obj.position_id" multiple filterable allow-create placeholder="请选择文章标签">
                        <el-option v-for="item in options" :key="item.position_id" :label="item.position_name" :value="item.position_id">
                        </el-option>
                    </el-select>
                </div>
                <!-- <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div> -->
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    联系电话：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="obj.user_phone" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    角色：
                </div>
                <div class="add-inp-item-inp">
                    <el-checkbox-group v-model="group_check">
                        <p>
                            <el-checkbox class="radio" label="1">老师</el-checkbox>
                        </p>
                        <p>
                            <el-checkbox class="radio" label="2">管理员</el-checkbox> 
                        </p>
                        <p>
                            <el-select v-if="is_option_list" v-model="obj.gpermission_id" multiple filterable allow-create placeholder="请选择" size="small">
                                <el-option v-for="item in option_list" :key="item.gid" :label="item.gname" :value="item.gid">
                                </el-option>
                            </el-select>
                        </p>
                    </el-checkbox-group>
                </div>
            </div>
    
            <div class="add-inp-btn">
                <div class="add-inp-item-name">
                </div>
                <el-button type="primary" @click="submit">保存</el-button>
                <el-button @click="quit">取消</el-button>
            </div>
        </div>
    </section>
</template>
<script> 
import store from '@/utils/architecture'
export default {
    props: ['state','dataObj'],//1是编辑 2是添加
    data() {
        return {
            options: [],
            value10: [],
            sex: '',
            department_id:'',//department_id 
            obj: {
                member_name: '',
                password: '',
                member_role: [],
                user_name: '',
                user_sex: '',
                user_phone: '',
                position_id: [],
                gpermission_id: [],
                avatar: '',
                token: '',
            },
            group_check: [],
            group_list: [],
            option_list: [],
            is_option_list: false,//是否选择权限组列表
        }
    },
    created() {
        if (this.state == 1) {
            let dataObj = this.dataObj;
            this.department_id = dataObj.department_id;
            this.obj.member_role = dataObj.member_role.split(",")
            this.group_check = this.obj.member_role;
            this.obj.position_id = dataObj.position_id;
            this.obj.teacher_id = dataObj.teacher_id;
            this.obj.user_phone = dataObj.teacher_phone;
            this.obj.user_sex = dataObj.teacher_sex;
            this.obj.user_name = dataObj.username; 
        } else {
        }
        store.getPosition.call(this)
        // 权限组列表
        store.get_group_list.call(this)
    },
    methods: {
        submit() {
            //确定
            if (this.state == 1) {

            } else {
                store.addPositionUser.call(this, this.obj);
            }
        },
        quit(){
            //取消
            this.$emit('QUITQROUP',0);
        }
    },
    watch: {
        group_check(val) {
            this.obj.member_role = val;
            if (val.indexOf('2') !== -1) {
                this.is_option_list = true;
            } else {
                this.is_option_list = false;
            }
        }
    }
}
</script>
