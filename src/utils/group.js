import { api } from '@/api/group'
import { getToken } from '@/utils/auth'
const key = getToken();

export default {
  group_list(vm){
    vm.$http(api.groupList,{
      params:{
        token:key
      }
    }).then((res)=>{
      if(res.status==200){
        vm.list=res.data.group_list;
      }
    })
  },
  controller_list(){
    this.$http(api.controllerList,{
      params:{
        token:key
      }
    }).then((res)=>{
      if(res.status==200){
        this.ctrList=res.data.store_menu.nav;
      }
    })
  },
  add_group(){
    this.$http({
      url:api.addGroup,
      method:'post',
      data:{
        token:key,
        group_name:this.groupName,
        controller:this.groupCtrList
      }
    }).then((res)=>{
      if(res.status==200){
        if(res.data.status=='true'){
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.state=0;
        }else{
          this.$message({
            message: res.data.msg,
            type: 'warning'
          });
        }
      }else{
        this.$message.error('添加失败');
      }
    })
  },
  delete_group(vm,gid){
    vm.$http({
      url:api.deleteGroup,
      method:'post',
      data:{
        token:key,
        del_id:gid
      }
    }).then((res)=>{
      if(res.status==200){
        vm.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.group_list(vm);
      }else{
        vm.$message.error('删除失败!');
      }
    })
  },
  group_detail(vm,gid){
    vm.$http(api.groupDetail,{
      params:{
        token:key,
        gid:gid
      }
    }).then((res)=>{
      if(res.status==200){
        vm.groupName=res.data.group_info.gname;
        vm.groupCtrList=res.data.group_info.limits;
        if(typeof vm.groupCtrList=="string" ){
          vm.groupCtrList=vm.groupCtrList.split(",")
        }
      } else{
        this.$message.error('读取数据失败');
        vm.editShow=0;
      }
    })
  },
  edit_group(){
    this.$http({
      url:api.editGroup,
      method:'post',
      data:{
        token:key,
        gid:this.gid,
        group_name:this.groupName,
        controller:this.groupCtrList
      }
    }).then((res)=>{
      if(res.status==200){
        this.$message({
          type:'success',
          message:res.data.msg
        });
        this.editShow=0;
      }else{
        this.$message.error('修改失败')
      }
    })
  }
}
