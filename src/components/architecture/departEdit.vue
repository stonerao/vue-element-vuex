<template>
    <div>
        <!-- 创建素材 -->
        <div class="l_create_wrap">
            <el-row>
                <el-col :span="3">部门名称：</el-col>
                <el-col :span="21">
                    <el-col :span="4">
                        <el-input v-model="className" placeholder="请输入内容"></el-input>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">班主任选择：</el-col>
                <el-col :span="21" class="confContent">
                    <el-col :span="4">
                        <el-select v-model="selectVal.teacher" placeholder="请选择老师" style="width: 100%">
                            <el-option v-for="item in teacherList" :key="item.teacher_id" :label="item.teacher_name" :value="item.teacher_id"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row v-if="whetherShow">
                <el-col :span="3">所属部门：</el-col>
                <el-col :span="21">
                    <el-col :span="4">
                        <el-select v-model="selectVal.grade" placeholder="请选择年级" style="width: 100%">
                            <el-option v-for="item in gradeList" :key="item.department_id" :label="item.department_name" :value="item.department_id"></el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" style="color: #f7f7f7;">保存操作</el-col>
                <el-col :span="21">
                    <el-button type="primary" @click.native="departSave">保存</el-button>
                    <el-button type="primary" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b" @click.native="departCancel(0)">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import info from '@/utils/treeGrid'

export default {
    props: ['DepartID'],
    data() {
        return {
               teacherList: [],
               gradeList: [],
               selectVal:{
                    teacher: '',
                    grade: ''
               },
               className: '',
               whetherShow: true,
        }
    },
    created() {
        info.departEditInit.call(this,this.DepartID);
    },
    components: {
        
    },
    methods: {
        departCancel(index){
            this.teacherList = [];
            this.gradeList = [];
            this.$emit('DepartEditBack',index);
        },
        departSave(){
            info.departEdit.call(this,this.className,this.selectVal);
        },
    },
    watch:{
        
    }
}
</script>
 
<style scoped>

</style>
