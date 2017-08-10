<template>
    <section class="add-inp">
        <div class="add-inp-items">
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    所属部门：
                </div>
                <div class="add-inp-item-inp">
                    <el-select v-model="value10" multiple filterable allow-create placeholder="请选择文章标签">
                        <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    用户名：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="sex" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    姓名：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="sex" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    性别：
                </div>
                <div class="add-inp-item-inp">
                    <el-radio class="radio" v-model="sex" label="1">启用</el-radio>
                    <el-radio class="radio" v-model="sex" label="2">禁用</el-radio>
                </div>
                <div class="add-inp-item-addname margin-left"> </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    密码：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="sex" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    职位：
                </div>
                <div class="add-inp-item-inp">
                    <el-select v-model="value10" multiple filterable allow-create placeholder="请选择文章标签">
                        <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    联系电话：
                </div>
                <div class="add-inp-item-inp">
                    <el-input v-model="sex" placeholder=""></el-input>
                </div>
            </div>
            <div class="add-inp-item">
                <div class="add-inp-item-name">
                    角色：
                </div>
                <div class="add-inp-item-inp">
                    <p>
                        <el-radio class="radio" v-model="sex" label="1">启用</el-radio>
                    </p>
                    <p>
                        <el-radio class="radio" v-model="sex" label="2">禁用</el-radio>
                        <el-select v-model="sex" placeholder="请选择" >
                            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.label">
                            </el-option>
                        </el-select>
                    </p>
                </div>
            </div>
    
            <div class="add-inp-btn">
                <div class="add-inp-item-name">
                </div>
                <el-button type="primary">保存</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            options5: [{
                value: 'HTML',
                label: 'HTML'
            }, {
                value: 'CSS',
                label: 'CSS'
            }, {
                value: 'JavaScript',
                label: 'JavaScript'
            }],
            value10: [],
            sex: ''
        }
    }
}
</script>
