<template>
    <div>
        <!-- 创建素材 -->
        <div class="l_create_wrap">
            <el-row>
                <el-col :span="3">部门名称：</el-col>
                <el-col :span="21">
                    <el-col :span="5" style="margin-right: 20px;">
                        <el-input v-model="create.name" placeholder="请输入部门名称"></el-input>
                    </el-col>
                    <el-col :span="5" class="someAdd">
                        <el-input placeholder="备注信息文字" disabled></el-input>
                    </el-col>   
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">特殊部门标记：</el-col>
                <el-col :span="21">
                    <el-radio-group v-model="create.tag">
                        <el-radio :label="1" v-if="whetherShow.normal">无</el-radio>
                        <el-radio :label="2" v-if="whetherShow.grade">年级</el-radio>
                        <el-radio :label="3" v-if="whetherShow.virtual">虚拟班</el-radio>
                        <el-select v-model="teacherID" placeholder="请选择" v-if="whetherShow.virtual" :disabled="disable">
                            <el-option v-for="item in Toptions" :key="item.teacher_id" :label="item.teacher_name" :value="item.teacher_id"></el-option>
                        </el-select>
                        <el-radio :label="4" v-if="whetherShow.entity">实体班</el-radio>
                        <el-select v-model="teacherID" placeholder="请选择" v-if="whetherShow.entity" :disabled="disable">
                            <el-option v-for="item in Toptions" :key="item.teacher_id" :label="item.teacher_name" :value="item.teacher_id"></el-option>
                        </el-select>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">部门介绍：</el-col>
                <el-col :span="21" class="confContent">
                    <el-col :span="10">
                        <textarea v-model="create.intro" style="width: 100%;max-width: 1000px;min-width: 1000px;max-height: 250px;min-height: 200px;max-height: 250px;"></textarea>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">状态：</el-col>
                <el-col :span="21">
                    <el-radio-group v-model="create.status">
                        <el-radio :label="0">启用</el-radio>
                        <el-radio :label="1">禁用</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" style="color: #f7f7f7;">保存操作</el-col>
                <el-col :span="21">
                    <el-button type="primary" @click.native="submit">保存</el-button>
                    <el-button type="primary" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b" @click.native="cancelCreate">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import tree from '@/utils/treeGrid'

export default {
    props: ['DerpartID','DIST'],
    data() {
        return {
            create: {
                id: this.DerpartID,
                name: '',
                tag: 1,
                intro: '',
                status: 0,
            },
            whetherShow: {
                grade: false,
                virtual: false,
                entity: false,
                normal: false,
                teacher: false,
            },
            Toptions:[],
            teacherID: '',
            disable: true,   
        }
    },
    created() {
        tree.commonDepart_handle.call(this,this.DerpartID)
    },
    components: {
        
    },
    methods: {
        submit(){
            if(this.DIST){
                tree.commonDepart_add.call(this,this.create,this.teacherID);
            }
        },
        cancelCreate(){
            this.$emit('DEPARTCANCEL',false);
        },
        addSuccess(){  //添加成功刷新数据
            this.$emit('DEPARTCANCEL',true);
        }
    },
    watch:{
        ['create.tag'](val){
            if(val == 3 || val == 4){
                this.disable = false;
            }else{
                this.disable = true;
            }
        }
    }
}
</script>
 
<style scoped>

</style>
