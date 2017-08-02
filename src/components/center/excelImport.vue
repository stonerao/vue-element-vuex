<template>
    <div class="t-impot">
        <section class="t-impot-head">
            <el-button type="primary" icon="plus" size="small">增加学生</el-button>
            <el-button type="primary" icon="plus" size="small">批量导入</el-button>
        </section>
        <div class="t-impot-box">
            <section class="t-impot-item">
                <div class="impot-item-title">
                    用TXT方式导入
                </div>
                <ul class="impot-item-list">
                    <li>
                        使用TXT文本作为模板文件，请注意格式要求，并且文件编码必须为UTF8
                    </li>
                    <li>
                        <a>下载使用Txt格式模板 </a> 请下载模板，并按照格式填写，填写完成后，上传文件即可完成导入
                    </li>
                </ul>
                <ol class="impot-item-les">
                    <li class="impot-item-lis">
                        <span class="impot-item-span">所属题库：</span>
                        <div>
                            <el-select v-model="value" placeholder="请选择" class="marginleft5">
                                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </li>
                    <li  class="impot-item-lis">
                        <span class="impot-item-span">数据文件：</span>
                        <div>
                            <input type="file"  class="marginleft5"/>
                        </div>
                    </li>
                    </li>
                    <li class="impot-item-btns">
                        <span class=" "></span>
                        <span>
                            <el-button type="primary">提交</el-button>
                            <el-button>取消</el-button>
                        </span>
                    </li>
                </ol>
            </section>
            <section class="t-impot-item">
                <div class="impot-item-title">
                    用EXCEL方式导入
                </div>
                <ul class="impot-item-list">
                    <li>
                        使用EXCEL文本作为模板文件，请注意格式要求，并且文件编码必须为UTF8
                    </li>
                    <li>
                        <a>下载使用EXCEL格式模板 </a> 请下载模板，并按照格式填写，填写完成后，上传文件即可完成导入
                    </li>
                </ul>
                <ol class="impot-item-les">
                    <li class="impot-item-lis">
                        <span class="impot-item-span">所属题库：</span>
                        <div>
                            <el-select v-model="value" placeholder="请选择" class="marginleft5">
                                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </li>
                    <li  class="impot-item-lis">
                        <span class="impot-item-span">数据文件：</span>
                        <div>
                            <input type="file"  class="marginleft5"/>
                        </div>
                    </li>
                    </li>
                    <li class="impot-item-btns">
                        <span class=" "></span>
                        <span>
                            <el-button type="primary">提交</el-button>
                            <el-button>取消</el-button>
                        </span>
                    </li>
                </ol>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bottomMsg: 'dssssssssssssssss',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: ''
        }
    }
}
</script> 
<style scoped>

</style>
