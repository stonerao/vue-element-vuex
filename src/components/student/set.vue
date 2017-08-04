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
                        出生年月日：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-date-picker v-model="obj.st_birthday" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="add-inp-item-addname margin-left">登录密码</div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        户口所在地（贯籍）:
                    </div>
                    <div class="add-inp-item-inp add-inp-time">
                        <div>
                            <el-select v-model="obj.st_provinceid" placeholder="省">
                                <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-select v-model="obj.st_cityid" placeholder="市">
                                <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <el-select v-model="obj.st_areaid" placeholder="区">
                                <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
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
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        民族：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_familyname" type="text"></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        政治面貌：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="obj.st_political" type="text"></el-input>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                <div class="add-inp-item">
                    <div class="add-inp-item-name">
                        家长列表：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-input v-model="input" placeholder="姓名"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="input" placeholder="关系"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="input" placeholder="电话"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-input v-model="input" placeholder="姓名"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="input" placeholder="关系"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="input" placeholder="电话"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-input v-model="input" placeholder="姓名"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="input" placeholder="关系"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="input" placeholder="电话"></el-input>
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
                <div class="add-inp-item" v-if="obj.st_certificates==1||obj.st_certificates==2">
                    <div class="add-inp-item-name">
                        证件号：
                    </div>
                    <div class="add-inp-item-inp">
                        <el-input v-model="t_input" type="password"></el-input>
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
                                <el-select v-model="obj.st_class" placeholder="请选择年级" class="float:left">
                                    <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-select v-model="obj.st_grade" placeholder="请选择班级" class="float:left">
                                    <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
    
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div>
                 
                <!-- <div class="add-inp-item ">
                    <div class="add-inp-item-name">
                        虚拟班：
                    </div>
                    <div class="add-inp-item-inp add-inp-time">
                        <div>
                            <el-select v-model="search" placeholder="请选择">
                                <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div> -->
                <!-- <div class="add-inp-item ">
                    <div class="add-inp-item-name">
                        学生照片：
                    </div>
                    <div class="add-inp-item-inp add-inp-time">
                        <div>
                            <el-select v-model="search" placeholder="请选择">
                                <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="add-inp-item-addname margin-left">如：13800000000</div>
                </div> -->
    
                 
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
                    <el-button type="primary">保存</el-button>
                    <el-button>取消</el-button>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    /* 
        state 1是添加 2是编辑
    */
    props: ['state'],
    data() {
        return {
            t_data: [],
            sex: "1",
            t_input: '',
            certificates: [
                { name: "无", id: "0" },
                { name: "身份证", id: "1" },
                { name: "学生证", id: "2" }
            ],
            value1: '',
            search: "",
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
                st_parent: "",//家长，两位家长信息
                st_certificates: "",//证件类型（0：无，1：身份证，2：学生证）
                st_certificates_number: "",//证件号码
                st_grade: "",//班级
                st_class: "",//年级
                st_status: "",//就读状态（1：在校，2：毕业，3：休学，4：开除）
                member_name: "",//user
                password: "",//password
            },//当前所有页面数据
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
    },
    created() {
        if (this.state == 1) {

        } else if (this.state == 2) {

        }

    }
}
</script>
