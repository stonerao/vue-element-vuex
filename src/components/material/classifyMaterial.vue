<template>
    <div>
        <div class="l_mater_header">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-button type="primary" icon="plus" size="small" style="margin-right: 12px;" @click.native="create_Classify">增加分类</el-button>
                    <img src="../../assets/index/shuaxin.png" class="icon-img-xs" />刷新-共{{materialParams.total_num}}条记录
                </el-col>
                <el-col :span="18" class="mater_search clearfloat">
                    <el-col :span="5">
                        <el-input placeholder="输入名称" style="" v-model="filterValue">
                            <el-button slot="append" icon="search" @click.native="marterial_filter"></el-button>
                        </el-input>
                    </el-col>
                </el-col>
            </el-row>
        </div>
        <div class="l_mater_table">
            <el-table ref="multipleTable" :data="conferManaList" border tooltip-effect="dark" style="width: 100%" @selection-change="select_Change">
                <el-table-column type="selection" width="48"></el-table-column>
                <el-table-column label="排序" prop="order"></el-table-column>
                <el-table-column label="分类名称">
                     <template scope="scope">
                        <!--  <div>{{scope.row.time_s}}</div>
                         <div>{{scope.row.time_e}}</div> -->
                     </template>
                </el-table-column>
                <el-table-column label="是否显示">
                    <template scope="scope">
                        <el-switch v-model="scope.row.share" on-color="#13ce66" off-color="#ff4949" @change="whether_show(scope.row.id,scope.row.share)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="primary" size="mini" icon="edit" @click.native="editConfer(scope.row.id)">编辑</el-button>
                        <el-button type="primary" size="mini" icon="delete" @click.native="deleteOne(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="l_mater_footer">
            <el-row :span="24">
                <el-col :span="6">
                    <div class="footer_search">
                        <el-button type="primary" size="mini" @click.native="delete_all">删除</el-button>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="kd-page">
                        <el-row>
                            <el-col :span="24">
                                <el-pagination class="float-right" :current-page="materialParams.curpage" :page-sizes="[15, 20, 25, 30]" :page-size="materialParams.page_count" layout="total, sizes, prev, pager, next, jumper" :total="materialParams.total_num" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                                </el-pagination>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import info from '@/utils/l_axios'

export default {
    props: ['MATERIALCLASSIFY'],
    data() {
        return {
            materialParams: {   //翻页
                hasmore: true,
                curpage: 1,//当前页数
                one_pagenum: 10,
                page_count: 1,//总页数
                total_num: 0
            },
            filterValue: '',  //搜索数据
        }
    },
    created() {
        
    },
    components: {
        
    },
    methods: {
        create_Classify(){  //增加分类

        },
        marterial_filter(){  //数据查询

        },
        delete_all(){  //删除所有数据

        }
    },
    watch: {

    }
}
</script>
 
<style>

</style>
