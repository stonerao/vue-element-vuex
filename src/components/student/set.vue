<template>
    <div>
        <div>
            <el-button type="primary" icon="plus" size="small">增加学生</el-button>
            <el-button type="primary" icon="plus" size="small">批量导入</el-button>
        </div>
        <section class="add-inp">
            <div class="add-inp-items">
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        姓名：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_name" placeholder=""></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div>
                </div>
    
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        性别：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-radio class="radio" v-model="obj.st_sex" label="1">保密</el-radio>
                        <el-radio class="radio" v-model="obj.st_sex" label="2">男</el-radio>
                        <el-radio class="radio" v-model="obj.st_sex" label="3">女</el-radio>
                    </div>
                    <div class="add-inp-item-addname margin-left"> </div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        联系电话：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_phone" placeholder=""></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：1858366666</div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        出生年月日：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-date-picker v-model="obj.st_birthday" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="add-inp-item-addname margin-left"></div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        户口所在地（贯籍）:
                    </div>
                    <div class="add-inp-item-inp add-inp-time">
                        <div>
                            <el-select v-model="province_id" placeholder="省">
                                <el-option v-for="item in area.province" :key="item.area_name" :label="item.area_name" :value="item.area_id">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-select v-model="city_id" placeholder="市">
                                <el-option v-for="item in area.city" :key="item.area_name" :label="item.area_name" :value="item.area_id">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-select v-model="area_id" placeholder="区">
                                <el-option v-for="item in area.area" :key="item.area_name" :label="item.area_name" :value="item.area_id">
                                </el-option>
                            </el-select>
                        </div>
    
                    </div>
                    <!-- <div class="add-inp-item-addname margin-left">如：13800000000</div> -->
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        家庭住址：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_address" type="text"></el-input>
                    </div>
                    <!-- <div class="add-inp-item-addname margin-left">如：13800000000</div> -->
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        民族：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_familyname" type="text"></el-input>
                    </div>
                    <!-- <div class="add-inp-item-addname margin-left">如：13800000000</div> -->
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        政治面貌：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_political" type="text"></el-input>
                    </div>
                    <!-- <div class="add-inp-item-addname margin-left">如：13800000000</div> -->
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        家长列表：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-input v-model="parents[0].name" placeholder="姓名"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="parents[0].rala" placeholder="关系"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="parents[0].mobile" placeholder="电话" type="number"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-input v-model="parents[1].name" placeholder="姓名"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="parents[1].rala" placeholder="关系"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="parents[1].mobile" placeholder="电话" type="number"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-input v-model="parents[2].name" placeholder="姓名"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="parents[2].rala" placeholder="关系"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="parents[2].mobile" placeholder="电话" type="number"></el-input>
                            </el-col>
                        </el-row>
    
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
    
                <!--  -->
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        用户名：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.member_name" type="text"></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        密码：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.password" type="password"></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                <div class="add-inp-item ">
                    <div class="add-inp-item-name">
                        证件类型：
                    </div>
                    <div class="add-inp-item-inp add-inp-time">
                        <div>
                            <el-select v-model="obj.st_certificates" placeholder="请选择">
                                <el-option v-for="item in certificates" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        证件号：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_certificates_number" type="text"></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                <!--  -->
                <div class="add-inp-item ">
                    <div class="add-inp-item-name">
                        年级/班级：
                    </div>
                    <div class="add-inp-item-inp  ">
                        <el-row :gutter="6">
                            <el-col :span="12">
                                <el-select v-model="grade_id" placeholder="请选择年级" class="float:left">
                                    <el-option v-for="item in gradeForm" :key="item.department_name" :label="item.department_name" :value="item.department_id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-select v-model="class_id" placeholder="请选择班级" class="float:left">
                                    <el-option v-for="item in classForm" :key="item.department_name" :label="item.department_name" :value="item.department_id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
    
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div> 
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        账号状态：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-radio class="radio" v-model="obj.st_status" label="1">在校</el-radio>
                        <el-radio class="radio" v-model="obj.st_status" label="2">毕业</el-radio>
                        <el-radio class="radio" v-model="obj.st_status" label="3">休学</el-radio>
                        <el-radio class="radio" v-model="obj.st_status" label="4">开除</el-radio>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
    
                <div class="add-inp-btn">
                    <div class="add-inp-item-name">
                    </div>
                    <el-button type="primary" @click="submit">保存</el-button>
                    <el-button @click="quit">取消</el-button>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import utils from '@/utils/utils'
import uitlsFun from '@/utils'
import store from '@/utils/teacher'
export default {
    /* 
        state 1是添加 2是编辑
        goState 进来时的状态值
    */
    props: ['state', "dataObj", "goState","id"],
    data() {
        return {
            t_data: [],
            sex: "1",
            t_input: '',
            certificates: [
                { name: "身份证", id: "1" },
                { name: "学生证", id: "2" }
            ],
            value1: '',
            search: "",
            input: '',
            obj: {
                st_name: "",//学生名册
                st_sex: "",//性别
                st_phone: "",//联系电话
                st_birthday: "",//出生日期
                st_provinceid: "",//籍贯（省级ID）
                st_cityid: "",//籍贯（市级ID）
                st_areaid: "",//籍贯（地区ID）
                st_address: "",//详细地址
                st_familyname: "",//名族
                st_political: "",//政治面貌
                st_parent: "",//家长，3位家长信息
                st_certificates: "",//证件类型（0：无，1：身份证，2：学生证）
                st_certificates_number: "",//证件号码
                st_grade: "",//年级
                st_class: "",//班级
                st_status: "",//就读状态（1：在校，2：毕业，3：休学，4：开除）
                member_name: "",//user
                password: "",//password
            },//当前所有页面数据
            area: {
                province: [],//省
                city: [],//市
                area: [],//区 
            },
            province_id: '',//省
            city_id: '',//市
            area_id: '',//区
            parents: [ //家长列表
                {
                    name: '',
                    rela: "",
                    mobile: ""
                }, {
                    name: '',
                    rela: "",
                    mobile: ""
                }, {
                    name: '',
                    rela: "",
                    mobile: ""
                },
            ],
            gradeForm: [],//年纪数据
            grade_id: '',//年级id
            classForm: [],//
            class_id: ''
        }
    },
    methods: {
        handleRemove(file, fileList) {
            // 上传图片
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            // 上传图片
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        getArea(state, id) {
            if (state == 1) {
                // 获取省
                utils.area_list.call(this)
            } else if (state == 2) {
                // 获取市
                utils.area_list.call(this, 2, id)
            } else if (state == 3) {
                // 获取区
                utils.area_list.call(this, 3, id)
            }
        },
        area_list() {

        },
        quit() {
            this.$emit("SetQuti", this.goState)
        },
        submit() {
            // 保存
            // 家长信息  
            this.obj.st_parent = uitlsFun.encodeUnicode(JSON.stringify(this.parents))
            this.obj.st_birthday = Date.parse(this.obj.st_birthday);
            store.addStundet.call(this, this.obj, this.state)
            
        }
    },
    created() { 
        if (this.state == 1) {

        } else if (this.state == 2) {
            if (this.dataObj) {
                let obj = this.obj;
                let dataObj = this.dataObj; 
                obj.st_id = dataObj.st_id; 
                obj.st_name = dataObj.st_name ? dataObj.st_name : '';//学生名册
                obj.st_sex = dataObj.st_sex ? dataObj.st_sex : '';//性别
                obj.st_phone = dataObj.st_phone ? dataObj.st_phone : '';//联系电话 
                obj.st_birthday = dataObj.st_birthday ? new Date(parseInt(dataObj.st_birthday)*1000) : '';//出生日期 
                obj.st_provinceid = dataObj.st_provinceid ? dataObj.st_provinceid : '';//籍贯（省级ID）
                obj.st_cityid = dataObj.st_cityid ? dataObj.st_cityid : '';//籍贯（市级ID）
                obj.st_areaid = dataObj.st_areaid ? dataObj.st_areaid : '';//籍贯（地区ID）
                obj.st_address = dataObj.st_address ? dataObj.st_address : '';//详细地址
                obj.st_familyname = dataObj.st_familyname ? dataObj.st_familyname : '';//名族
                obj.st_political = dataObj.st_political ? dataObj.st_political : '';//政治面貌 
                this.parents = dataObj.st_parent ? JSON.parse(dataObj.st_parent) : {};
                obj.st_parent = this.parents;//家长，3位家长信息
                obj.st_certificates = dataObj.st_certificates ? dataObj.st_certificates : '';//证件类型（0：无，1：身份证，2：学生证）
                obj.st_certificates_number = dataObj.st_certificates_number ? dataObj.st_certificates_number : '';//证件号码
                obj.st_grade = dataObj.st_grade ? dataObj.st_grade : '';//年级
                obj.st_class = dataObj.st_class ? dataObj.st_class : '';//班级
                obj.st_status = dataObj.st_status ? dataObj.st_status : '';//就读状态（1：在校，2：毕业，3：休学，4：开除） 
 
            }
        }
        // 年纪
        store.grade_list.call(this);
 


    },
    mounted() {
        //加载省份\
       
        this.getArea(1)
    },
    watch: {
        province_id(val) {
            // 如果选择当前省份
            if (this.obj.st_provinceid == val) {
                return;
            }
            // 赋值
            this.obj.st_provinceid = val;
            // 加载市区 并且清除市区选项
            this.area.city = [];
            this.area.area = [];
            this.city_id = "";
            this.area_id = "";
            // 加载市 
            this.getArea(2, val)
        },
        city_id(val) {
            if (this.obj.st_cityid == val) {
                return;
            }
            this.obj.st_cityid = val
            this.area_id = "";
            this.area.area = [];
            this.getArea(3, val)
        },
        area_id(val) {
            this.obj.st_areaid = val;
        },
        grade_id(val) {
            // 年纪联动改变
            this.obj.st_grade = val;
            store.class_list.call(this, val);

        },
        class_id(val) {
            // 年纪联动改变
            this.obj.st_class = val;
        }
    }

}
</script>
