<template>
    <div>
        <div class="l_create_wrap">
            <el-row>
                <el-col :span="3">科目名称：</el-col>
                <el-col :span="21">
                    <el-col :span="5" style="margin-right: 20px;">
                        <el-input v-model="create.name" placeholder="请输入科目名称"></el-input>
                    </el-col>
                    <el-col :span="5" class="someAdd">
                        <el-input v-model="create.infoAdd" placeholder="例入：数学" disabled></el-input>
                    </el-col>   
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" style="color: #f7f7f7;">保存操作</el-col>
                <el-col :span="21">
                    <el-button type="primary" @click="submit">保存</el-button>
                    <el-button type="primary" v-if="whetherEdit" style="background: #e0e0e0;border-color: #e0e0e0;color: #5b5b5b" @click="editBack">取消</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import rec from '@/utils/l_axios1'

export default {
    props: ['whetherEdit','ROWDATA'],
    data() {
        return {
            create: {
                id: 0,
                name: '',
                infoAdd: '',
            },
        }
    },
    created() {
        if(this.whetherEdit){
            this.create.name = this.ROWDATA.name;
            this.create.id = this.ROWDATA.id;
        }
    },
    components: {
        
    },
    methods: {
        submit(){
            rec.subjectListAdd_s.call(this,this.create)
        },
        editBack(){
            this.$emit('COMEBACK');
        }
    },
    watch:{
        
    }
}
</script>