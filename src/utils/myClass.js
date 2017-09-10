import {getToken} from '@/utils/auth'
import {getClass} from '@/utils/auth'
import {api} from '@/api/myClass'

export default {
  //班级列表
  class_list(){
    this.$http(api.classList,{
      params:{
        token:getToken(),
        page:this.currentPage,
        curpage:this.pageSize,
        ids:this.ids,
        keywords:this.keywords,
      }
    }).then((res)=>{ 
      if(res.data.code==200){
        this.total=res.data.all_pagecount;
        this.classList=res.data.data;
      }
    })
  },
  //获取某老师所处节点及向下所有节点的组织部门ID+老师ID+老师姓名
  under_list(){
    this.$http(api.underList,{
      params:{
        token:getToken()
      }
    }).then((res)=>{
      console.log(res)
      if(res.data.code==200){
        this.teacherList=res.data.data.teacher_list;
        this.isShow=res.data.data.is_show;
      }
    })
  },
  //班级详情
  class_detail(){
    this.$http(api.classDetail,{
      params:{
        token:getToken(),
        page:this.currentPage,
        curpage:this.pageSize,
        sex:this.sex,
        department_id:this.classId,
        keywords:this.stuName
      }
    }).then((res)=>{
      console.log(res)
      if(res.data.code==200){
        this.classInfo=res.data.data.common_info;
        this.listDetail=res.data.data.student_list;
        this.total=res.data.page_total;
      }
    })
  }
}
