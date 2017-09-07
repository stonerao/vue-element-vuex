<template>
    <div>
        <!-- 增加组织部门按钮 -->
        <div v-if="rTreeGrid">   
            <el-button type="primary" icon="plus" size="small" style="margin-bottom: 10px;" @click="r_add_derpart">添加组织部门</el-button>
        </div>
        <div v-if="tableShow" :style="{width:tableWidth}" class='autoTbale' v-loading="loading">
            <table class="table table-bordered" id='hl-tree-table'>
                <thead>
                    <tr>
                        <th v-for="(column,index) in cloneColumns">
                            <label v-if="column.type === 'selection'">
                                <el-checkbox v-model="checks" @click.native="handleCheckAll"></el-checkbox>
                            </label>
                            <label v-else>
                                {{ renderHeader(column, index) }}
                            </label>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in initItems" v-show="show(item)" :class="{'child-tr':item.parent}">
                        <td v-for="(column,snum) in columns" :style=tdWidth(column.width)>
                            <label v-if="column.type === 'selection'&&lTreeGrid">
                                <input type="checkbox" :value="item.id" v-model="checkGroup" class="colums1">
                            </label>
                            <div v-if="column.type === 'input'">
                                <!-- 分类名称 -->
                                <el-input v-model="item.category_name" placeholder="请输入分类名称" style="width: 200px;" @change="materTypeEdi(item.id,item.category_name,item.sort)"></el-input>
                            </div>
                            <div v-if="column.type === 'switch'&&lTreeGrid">
                                <!-- 切换按钮 -->
                                <el-switch v-model="item.status" on-color="#13ce66" off-color="#ff4949" @change="whetherShow(item.id,item.status)"></el-switch>
                            </div>
                            <div v-if="column.type === 'switch'&&rTreeGrid">
                                <!-- 切换按钮 -->
                                <el-switch v-model="item._status" on-color="#13ce66" off-color="#ff4949" @change="whetherShow(item.id,item._status)"></el-switch>
                            </div>
                            <div v-if="column.type === 'action'">
                                <!-- 操作按钮 -->
                                <el-button :type="action.type" size="small" @click.native="RowClick(item,$event,index,action.text)" v-for='action in (column.actions)' :key='column.text'>{{action.text}}</el-button>
                            </div>
                            <label v-if="!column.type">
                                <span @click="toggle(index,item)" v-if='snum==1'>
                                    <i v-html='item.spaceHtml'></i>
                                    <i v-if="item.children" :class="{'el-icon-caret-bottom':!item.expanded,'el-icon-caret-top':item.expanded }"></i>
                                    <i v-else class="ms-tree-space"></i>
                                </span> 
                                <el-input v-model="item.sort"  type="number" placeholder="请输入序号" class="orderInput" @change="materTypeEdi(item.id,item.category_name,item.sort)"></el-input>
                                <div v-if="column.add" class="addNews" @click="createNewRow(item,index)"> 
                                    <i class="el-icon-plus"></i> <span>新增下级</span>
                                </div>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="l_mater_footer" v-if="lTreeGrid">
                <el-row :span="24">
                    <el-col :span="6">
                        <div class="footer_search">
                            <el-button type="primary" size="mini" @click.native="DeleteMater_All">删除</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!-- 素材管理的弹窗 -->
            <div class="myDialog" v-if="lTreeGrid">
                <div class="ownDailog" v-if="Dailog">
                    <div class="close_btn">
                        <i class="el-icon-close" @click="Close_mask"></i>
                    </div>
                    <div class="content">
                        <el-row :span="24">
                            <el-col :span="4" style="text-align-last: auto;text-align: left;line-height: 36px;">分类名称：</el-col>
                            <el-col :span="20">
                                <el-col :span="15">
                                    <el-input v-model="createNewData.name" placeholder="请输入分类名称"></el-input>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="4" style="text-align-last: auto;text-align: left;line-height: 36px;">分类排序：</el-col>
                            <el-col :span="20">
                                <el-col :span="15">
                                    <el-input v-model="createNewData.sort" type="number" placeholder="请输入分类序号"></el-input>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="4" style="text-align-last: auto;text-align: left;line-height: 36px;">是否显示：</el-col>
                            <el-col :span="20">
                                <el-radio-group v-model="createNewData.show" style="margin-top: 9px;">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="2">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="text-align: center;">
                            <el-button type="primary" @click.native="creatSubmit">保存</el-button>
                            <el-button @click.native="Close_mask">取消</el-button>
                        </el-row>
                    </div>
                </div>
                <div class="dialog_mask" v-if="Dailog" @click="Close_mask"></div>
            </div>
        </div>
        <!-- 增加组织部门 -->
        <div v-if="addDepart">
            <ADDDEPART :DerpartID="DerpartID" @DEPARTCANCEL="DEPARTCANCEL"></ADDDEPART>
        </div>
    </div>
</template>
<script>
    import info from '@/utils/l_axios'
    import tree from '@/utils/treeGrid'
    import ADDDEPART from '@/components/architecture/addDepart.vue'
    export default {
        name: 'treeGrid',
        props: {
            columns: Array,   //列表头--数据
            items: {    //tree---数据
                type: Array,
                default: function () {
                    return [];
                }
            },
            lTreeGrid: Boolean,
            rTreeGrid: Boolean,
        },
        data() {
            return {
                initItems: [], //处理后数据数组
                cloneColumns: [], //处理后的表头数据
                checkGroup: [], //复选框数组
                checks: false, //全选
                screenWidth: document.body.clientWidth, //自适应宽
                tdsWidth: 0, //td总宽
                timer: false, //控制监听时长
                dataLength: 0, //树形数据长度
                loading: false,
                LoadChild: false,
                childrenData: [],
                selectString: '',
                createNewData: {
                    id: 0,
                    name: '',
                    sort: '',
                    show: 1,
                },
                Dailog: false,
                checkGroupHelp: true,
                tableShow: true,  
                addDepart: false,
                distinguish: false,  //组织部门-区分‘新增下级’&‘添加’
                DerpartID: 0,
            }
        },
        create(){
            console.log(this.lTreeGrid)
        },
        computed: {
            tableWidth() {
                return this.tdsWidth > this.screenWidth && this.screenWidth > 0 ? this.screenWidth + 'px' : '100%'
            }
        },
        watch: {
            screenWidth(val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    setTimeout(() => {
                        this.timer = false
                    }, 400)
                }
            },
            items() { 
                // console.log('监听执行！')
                if (this.items) {
                    this.dataLength = this.Length(this.items)
                    this.initData(this.deepCopy(this.items), 1, null);
                    this.checkGroup = this.renderCheck(this.items)
                    if (this.checkGroup.length == this.dataLength) {
                        this.checks = true
                    } else {
                        this.checks = false
                    }
                }
            },
            columns: {
                handler() {
                    this.cloneColumns = this.makeColumns();
                },
                deep: true
            },
            checkGroup(data) {
                // this.dataLength = this.initItems.length;
                this.checkAllGroupChange(data)
            },
            checks() {
                this.handleCheckAll()
            }
        },
        mounted() {
            if (this.items) {
                this.dataLength = this.Length(this.items);
                this.initData(this.deepCopy(this.items), 1, null);
                this.cloneColumns = this.makeColumns();
                this.checkGroup = this.renderCheck(this.items);
                if (this.checkGroup.length == this.dataLength) {
                    this.checks = true
                } else {
                    this.checks = false
                }
            }
            // 绑定onresize事件 监听屏幕变化设置宽
            this.$nextTick(() => {
                this.screenWidth = document.body.clientWidth
            })
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    this.screenWidth = window.screenWidth
                })()
            }
        },
        components: {
            ADDDEPART
        },
        methods: {
            DEPARTCANCEL(){  //组织部门添加组织部门-取消
                this.DerpartID = 0;
                this.distinguish = false;
                this.rTreeGrid = true;
                this.tableShow = true;
                this.addDepart = false;
            },
            r_add_derpart(){  //组织部门添加组织部门
                this.DerpartID = 0;
                this.distinguish = true;
                this.rTreeGrid = false;
                this.tableShow = false;
                this.addDepart = true;
            },
            creatSubmit(){  //新增提交！
                if(this.lTreeGrid){
                    info.materTypeEdit_add.call(this,this.createNewData);
                }else if(this.rTreeGrid){
                    tree.materTypeEdit_add.call(this,this.createNewData);
                }
            },
            Close_mask(){  //关闭弹窗
                if(this.lTreeGrid){
                    this.createNewData = {
                        id: 0,
                        name: '',
                        sort: '',
                        show: 1,
                    }
                    this.Dailog = false;
                }else if(this.rTreeGrid){

                }
            },
            DeleteMater_All(){  //勾选删除
                if(this.lTreeGrid){
                    info.materTypeEdit_del.call(this,this.selectString);
                }else if(this.rTreeGrid){
                    tree.materTypeEdit_del.call(this,this.selectString);
                }
            },
            whetherShow(id,status){  //切换按钮
                if(this.lTreeGrid){
                    info.materTypeEdit_show.call(this,id,status);
                }else if(this.rTreeGrid){
                    tree.materTypeEdit_show.call(this,id,status);
                }
            },
            materTypeEdi(id,name,sort){  //编辑数据
                if(this.lTreeGrid){
                    info.materTypeEdit.call(this,id,name,sort);
                }else if(this.rTreeGrid){
                    tree.materTypeEdit.call(this,id,name,sort);
                }
            },
            createNewRow(item,index){  //新增下级
                if(this.lTreeGrid){  //L的身份证
                    this.createNewData = {
                        id: 0,
                        name: '',
                        sort: '',
                        show: 1,
                    }
                    this.createNewData.id = item.id;
                    this.createNewData.index = index;
                    this.createNewData.item = item;
                    this.Dailog = true;
                }else if(this.rTreeGrid){
                    this.DerpartID = item.id;
                    this.distinguish = false;
                    this.rTreeGrid = false;
                    this.tableShow = false;
                    this.addDepart = true;
                }
            },
            // 设置td宽度
            tdWidth(val) {
                if (val) return {
                    'min-width': val + 'px'
                }
            },
            // 点击某一行事件
            RowClick(data, event, index, text) {  //单独删除数据
                let result = this.makeData(data)
                this.$emit('on-row-click', result, event, index, text);
                // console.log(data.id);
                if(this.lTreeGrid){
                    info.materTypeEdit_del.call(this,data.id);
                }else if(this.rTreeGrid){
                    tree.materTypeEdit_del.call(this,data.id);
                }
            },
            // 点击事件 返回数据处理
            makeData(data) {
                const t = typeof(data);
                let o;
                if (t === 'array') {
                    o = [];
                } else if (t === 'object') {
                    o = {};
                } else {
                    return data;
                }

                if (t === 'array') {
                    for (let i = 0; i < data.length; i++) {
                        o.push(this.makeData(data[i]));
                    }
                } else if (t === 'object') {
                    for (let i in data) {
                        if (i != 'spaceHtml' && i != 'parent' && i != 'level' && i != 'expanded' && i != 'isShow' && i !=
                            'load') {
                            o[i] = this.makeData(data[i]);
                        }
                    }
                }
                return o;
            },
            // 处理表头数据
            makeColumns() {
                let columns = this.deepCopy(this.columns);
                this.tdsWidth = 0
                columns.forEach((column, index) => {
                    column._index = index;
                    column._width = column.width ? column.width : '';
                    column._sortType = 'normal';
                    this.tdsWidth += column.width ? parseFloat(column.width) : 0;
                });
                return columns;
            },
            // 数据处理 增加自定义属性监听
            initData(items, level, parent) {
                this.initItems = []
                let spaceHtml = "";
                for (var i = 1; i < level; i++) {  //第一次进函数时不得执行！
                    spaceHtml += "<i class='ms-tree-space'></i>"
                }
                // console.log(items);  //初始数据
                items.forEach((item, index) => {
                    item = Object.assign({}, item, {   //ES6深度拷贝并添加新字段！
                        "parent": parent,
                        "level": level,
                        "spaceHtml": spaceHtml
                    });
                    // console.log(item);  //字段添加且赋值
                    // console.log(item.expanded);  //初始不存在的
                    if ((typeof item.expanded) == "undefined") {
                        item = Object.assign({}, item, {
                            "expanded": false          //小三角图标---->false为“折叠”，true就“展开”！
                        });
                    }
                    if ((typeof item.show) == "undefined") {   
                        item = Object.assign({}, item, {
                            "isShow": false           //行，显示与否？
                        });
                    }
                    // console.log(item);    //处理的数据A
                    item = Object.assign({}, item, {
                        "load": (item.expanded ? true : false)
                    });
                    this.initItems.push(item);
                    if (item.children && item.expanded) {  //如果有子集children数据，就进入children，且把上一层处理的数据作为下一层的父元素！（递归）
                        this.initData(item.children, level + 1, item);  
                    }
                })
            },
            //  隐藏显示
            show(item) {
                return ((item.level == 1) || (item.parent && item.parent.expanded && item.isShow));
            },
            toggle(index, item) {
                // console.log(item);
                let level = item.level + 1;
                let spaceHtml = "";
                this.LoadChild = true;
                this.childrenData = [];
                for (var i = 1; i < level; i++) {  //前面的空格间隙！多一级就多一个空隙html
                    spaceHtml += "<i class='ms-tree-space'></i>"
                }
                if(this.childrenData.length == 0){
                    this.loading = false;
                }
                if (item.children) {  //如果存在子元素-----加载数据！！！！！！
                    if (item.expanded) {  //true---->如果三角形是展开的---->就通过下面的关闭！
                        item.expanded = !item.expanded;
                        this.close(index, item);
                        this.loading = false;
                    } else {  //如果未展开行！
                        item.expanded = !item.expanded;
                        if (item.load) {  //true---->未加载(如果有数据就直接打开，不加载数据了！)
                            this.open(index, item);
                            this.loading = false;
                        } else {  //没数据进入这里加载;
                            item.load = true;
                            this.loading = true;
                            //测试加载数据并请求接口
                            if(this.lTreeGrid){
                                info.materType.call(this,item.id);
                            }else if(this.rTreeGrid){
                                tree.materType.call(this,item.id);
                            }
                            setTimeout((x)=> {
                                // console.log(this.childrenData);
                                if(this.childrenData.length > 0){
                                    item.children = [];
                                    item.children = this.childrenData;  //后执行了！
                                }
                                item.children.forEach((child, childIndex) => {  //展开时加载数据！
                                    this.initItems.splice((index + childIndex + 1), 0, child);   //下标为index + childIndex + 1处添加item.children数据！
                                    //设置监听属性
                                    this.$set(this.initItems[index + childIndex + 1], 'parent', item);
                                    this.$set(this.initItems[index + childIndex + 1], 'level', level);
                                    this.$set(this.initItems[index + childIndex + 1], 'spaceHtml', spaceHtml);
                                    this.$set(this.initItems[index + childIndex + 1], 'isShow', true);
                                    this.$set(this.initItems[index + childIndex + 1], 'expanded', false);    //false为“小三角”--“未展开”状态！
                                });
                                this.loading = false;
                                this.checkBoxRefresh();   //刷新checkbox个数
                            },200);
                        }
                    }
                }
            },
            reloadChildren(index, item){  //新增后重新加载数据
                this.Dailog = false;
                item.load = false;
                // item.expanded = false;
                this.toggle(index, item);
            },
            open(index, item) {  //递归展开行数据！
                if (item.children) {
                    item.children.forEach((child, childIndex) => {
                        child.isShow = true;
                        if (child.children && child.expanded) {
                            this.open(index + childIndex + 1, child);
                        }
                    })
                }
            },
            close(index, item) {   //递归关闭行！
                if (item.children) {
                    item.children.forEach((child, childIndex) => {
                        child.isShow = false;
                        if (child.children) {
                            this.close(index + childIndex + 1, child);
                        }
                    })
                }
            },
            //checkbox 全选 选择事件
            handleCheckAll() {
                // this.checks = !this.checks;
                if (this.checks) {
                    this.checkGroup = this.getArray(this.checkGroup.concat(this.All(this.initItems)))
                    // console.log(this.checkGroup);
                } else {
                    if(this.checkGroupHelp){
                        this.checkGroup = [];
                    }
                }
                // this.$emit('on-selection-change', this.checkGroup)
            },
            // 数组去重
            getArray(a) {
                var hash = {},
                    len = a.length,
                    result = [];
                for (var i = 0; i < len; i++) {
                    if (!hash[a[i]]) {
                        hash[a[i]] = true;
                        result.push(a[i]);
                    }
                }
                return result;
            },
            checkAllGroupChange(data) {  //勾选删除数据
                // console.log(data.length)
                // console.log(this.dataLength)
                if (this.dataLength > 0 && data.length === this.dataLength) {
                    this.checks = true;
                    this.checkGroupHelp = true;
                } else {
                    this.checks = false;
                    this.checkGroupHelp = false;
                }
                this.$emit('on-selection-change', this.checkGroup)
                this.selectString = this.checkGroup;
                // console.log(this.selectString);
            },
            All(data) {
                let arr = []
                data.forEach((item) => {
                    arr.push(item.id)
                    if (item.children && item.children.length > 0) {
                        arr = arr.concat(this.All(item.children));
                    }
                })
                return arr
            },
            // 返回树形数据长度
            Length(data) {
                let length = data.length
                data.forEach((child) => {
                    if (child.children) {
                        length += this.Length(child.children)
                    }
                })
                return length;
            },
            // 返回表头
            renderHeader(column, $index) {
                if ('renderHeader' in this.columns[$index]) {
                    return this.columns[$index].renderHeader(column, $index);
                } else {
                    return column.title || '';
                }
            },

            // 返回内容
            renderBody(row, column, index) {
                return row[column.key]
            },
            // 默认选中
            renderCheck(data) {
                let arr = []
                data.forEach((item) => {
                    if (item._checked) {
                        arr.push(item.id)
                    }
                    if (item.children && item.children.length > 0) {
                        arr = arr.concat(this.renderCheck(item.children));
                    }
                })
                return arr
            },
            // 深度拷贝函数
            deepCopy(data) {
                var t = this.type(data),
                    o, i, ni;
                if (t === 'array') {
                    o = [];
                } else if (t === 'object') {
                    o = {};
                } else {
                    return data;
                }
                if (t === 'array') {
                    for (i = 0, ni = data.length; i < ni; i++) {
                        o.push(this.deepCopy(data[i]));
                    }
                    return o;
                } else if (t === 'object') {
                    for (i in data) {
                        o[i] = this.deepCopy(data[i]);
                    }
                    return o;
                }

            },
            type(obj) {
                var toString = Object.prototype.toString;
                var map = {
                    '[object Boolean]': 'boolean',
                    '[object Number]': 'number',
                    '[object String]': 'string',
                    '[object Function]': 'function',
                    '[object Array]': 'array',
                    '[object Date]': 'date',
                    '[object RegExp]': 'regExp',
                    '[object Undefined]': 'undefined',
                    '[object Null]': 'null',
                    '[object Object]': 'object'
                };
                return map[toString.call(obj)];
            },
            checkBoxRefresh(){  //修复checkbox的bug
                // console.log(this.initItems);
                if (this.initItems) {
                    this.dataLength = this.initItems.length;
                    if (this.checkGroup.length == this.dataLength) {
                        this.checks = true
                    } else {
                        this.checks = false
                    }
                }
            }
        },
        beforeDestroy() {
            window.onresize = null
        }
    }
</script>
<style>
    
</style>
