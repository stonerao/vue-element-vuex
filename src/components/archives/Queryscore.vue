<template>
    <div>
        <div class="l_achives_header">
            <el-row style="border-bottom: 1px solid #1998e4;padding-bottom: 5px;">
                <el-col :span="3" class="item_l" style="padding: 10px 0px 10px 0px;">姓名：<span style="color: #1998e4">{{PERSONINFO.name}}</span></el-col>
                <el-col :span="4" style="padding: 10px 0px">身份证号：<span style="color: #1998e4">{{PERSONINFO.idcard}}</span></el-col>
                <el-col :span="4" style="padding: 10px 0px">所在学校：<span style="color: #1998e4">{{PERSONINFO.schoolname}}</span></el-col>
                <el-col :span="13" class="item_l" style="text-align: right;"><el-button type="primary" @click.native="scoreListBack">返回</el-button></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs" @click="scoreRefresh"/>刷新-共{{ScoreDataList.all_num}}条记录
                </el-col>
            </el-row>
            <el-table ref="multipleTable" :data="ScoreDataList" style="width: 100%">
                <el-table-column label="考试名称" prop="exam_name"></el-table-column>
                <el-table-column label="科目" prop="subject_name"></el-table-column>
                <el-table-column label="考试成绩" prop="exam_cores"></el-table-column>
                <el-table-column label="排名">
                    <template scope="scope">
                        <div>第<span style="color: red;font-weight: bold" v-html="scope.row.exam_grades"></span>名</div>
                    </template>
                </el-table-column>
                <el-table-column label="考试性质" prop="exam_from"></el-table-column>
                <el-table-column label="考试时间" prop="exam_time"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import info from '@/utils/archives'

export default {
    props:['SCOREDATA','PERSONINFO'],
    data() {
        return {
            ScoreDataList: [],
        }
    },
    created() {
        this.scoreRefresh();
    },
    components: {
        
    },
    methods: {
        scoreRefresh(){
            this.ScoreDataList = [];
            info.achScoreList.call(this,this.SCOREDATA);
        },
        scoreListBack(){
            this.$emit('scoreORshelfBack',1);
        },
    }
}
</script>
 
<style scoped>

</style>
