<template>
   <section class="add-inp">
                        <div class="add-inp-items">
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    姓名：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" placeholder=""></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">填写真实姓名，以便联系称呼</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    性别：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-radio class="radio" v-model="sex" label="1">男</el-radio>
                                    <el-radio class="radio" v-model="sex" label="2">女</el-radio>
                                </div>
                                <div class="add-inp-item-addname margin-left"> </div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    出生年月日：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
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
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div>
                                        <el-select v-model="search" placeholder="请选择">
                                            <el-option v-for="item in t_data" :key="item.name" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
    
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    家庭住址：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    民族：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    政治面貌：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    家长列表：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-table :data="tableData" style="width: 100%">
                                        <el-table-column prop="date" label="日期">
                                        </el-table-column>
                                        <el-table-column prop="name" label="姓名">
                                        </el-table-column>
                                        <el-table-column prop="address" label="地址">
                                        </el-table-column>
                                    </el-table>
                                    <!-- <div style="width:100%;margin-top:10px;">
                                            <el-button>默认按钮</el-button>
                                        </div> -->
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
    
                            <!--  -->
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    用户名：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="text"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    密码：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="password"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item ">
                                <div class="add-inp-item-name">
                                    证件类型：
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
                            </div>
                            <div class="add-inp-item">
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
                                    年纪：
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
                            </div>
                            <div class="add-inp-item ">
                                <div class="add-inp-item-name">
                                    班级：
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
                            </div>
                            <div class="add-inp-item ">
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
                            </div>
                            <div class="add-inp-item ">
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
                            </div>
    
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    学生简介：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-input v-model="t_input" type="textarea"></el-input>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    学生照片：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                                <div class="add-inp-item-addname margin-left">如：13800000000</div>
                            </div>
                            <div class="add-inp-item">
                                <div class="add-inp-item-name">
                                    账号状态：
                                </div>
                                <div class="add-inp-item-inp">
                                    <el-radio class="radio" v-model="sex" label="1">冻结</el-radio>
                                    <el-radio class="radio" v-model="sex" label="1">冻结</el-radio>
                                    <el-radio class="radio" v-model="sex" label="1">冻结</el-radio>
                                    <el-radio class="radio" v-model="sex" label="2">女</el-radio>
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
</template>
<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>
