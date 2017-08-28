<template>
    <div class="add-inp">
        <!-- create questions -->
        <div class="r-add-created">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="试卷标题">
                    <el-input v-model="form.title" class="width200"></el-input>
                </el-form-item>
                <el-form-item label="试卷描述">
                    <el-input v-model="form.name" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="是否自动生成">
                    <el-switch v-model="isQuestion" on-color="#13ce66" off-color="#ff4949" >
                    </el-switch>
                </el-form-item>
                <el-form-item label="自动生成试卷" v-if="isQuestion">
                     <el-row>
                         <el-col :span='24' v-for="item in questionItems" :key="item.type_id">
                             <span>{{item.type_name}}：共<el-input class="width60 margin5" v-model="item.total" size="mini"></el-input>,</span>
                             <span>每道<el-input class="width60 margin5" v-model="item.every" size="mini"></el-input>分,</span> 
                              
                         </el-col>
                     </el-row> 
                </el-form-item>
                <el-form-item label="选择题目" v-if="!isQuestion">
                    <!-- 选择题库 -->
                     <el-row>
                         <el-col :span='24'>
                            <el-button >添加试题</el-button>
                         </el-col>
                         <el-col>

                         </el-col>
                     </el-row> 
                </el-form-item> 
                <el-form-item label="是否共享">
                    <el-switch v-model="form.delivery" on-color="#13ce66" off-color="#ff4949" >
                    </el-switch>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>
<script>
import store from '@/utils/questions'   
export default {
    data() {
        return {
            form: {
                title: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            isQuestion:true,//是否自动生成试卷
            questionItems:[]
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },
    created() {

        store.create_question_type.call(this)
    },
    mounted() {

    },
    watch: {

    }
}
</script>
