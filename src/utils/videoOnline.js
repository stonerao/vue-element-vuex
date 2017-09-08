import { api } from '@/api/videoOnline'
import { getToken, getClass } from '@/utils/auth'

export default {
  //发布直播--展示页面
  live_add() {
    this.$http(api.liveAdd, {
      params: {
        token: getToken()
      }
    }).then((res) => {
      this.addShowList = res.data.data
    })
  },
  //发布直播
  live_add_submit(data) {
    this.$http({
      url: api.liveAddSubmit,
      method: 'post',
      data: data
    }).then((res) => {
      if (res.data.code == 200) {
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.addOnline = 0;
        this.refreshList();
      } else {
        this.$message.error(res.data.data.error)
      }
    })
  },
  //直播列表
  video_list() {
    this.$http(api.videoList, {
      params: {
        token: getToken(),
        curpage: this.pageSize,
        keywords: this.searchTxt,
        page: this.currentPage,
        state: this.checkType
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.total = res.data.all_pagecount;
        let arr = res.data.data;
        for (let i = 0; i < res.data.data.length; i++) {
          if (arr[i].cancel_state == 1) {
            arr[i].cancel_state = 'false'
          } else {
            arr[i].cancel_state = 'true'
          }
        }
        this.videoList = arr;
      }
    })
  },
  //学校--禁用直播
  live_cancel(id, status) {
    this.$http(api.liveCancel, {
      params: {
        token: getToken(),
        live_id: id,
        cancel_status: status
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.refreshList();
      } else {
        this.$message.error(res.data.data.error);
        this.refreshList();
      }
    })
  },
  //直播间详情
  live_info(id) {
    this.$http(api.liveInfo, {
      params: {
        token: getToken(),
        live_id: id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.detail = res.data.data
        this.showDetail = 1;
      }
    })
  },
  //删除直播
  delete_live(id) {
    this.$http(api.deleteLive, {
      params: {
        token: getToken(),
        live_id: id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.refreshList();
      } else {
        this.$message.error(res.data.data.error);
      }
    })
  },
  //编辑直播
  edit_live(id) {
    this.$http(api.editLive, {
      params: {
        token: getToken(),
        live_id: id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.addShowList = res.data.data
        this.addOnline = 1;
        console.log(this.addShowList)
      }
    })
  },
  //编辑直播发布
  live_edit_submit(data) {
    this.$http({
      url: api.editLiveSubmit,
      method: 'post',
      data: data
    }).then((res) => {
      if (res.data.code == 200) {
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.addOnline = 0;
        this.refreshList();
      } else {
        this.$message.error(res.data.data.error)
      }
    })
  },
  //学校--关闭直播
  close_live(id) {
    this.$http(api.closeLive, {
      params: {
        token: getToken(),
        live_id: id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.$message({
          message: res.data.data,
          type: 'success'
        });
        this.refreshList();
      } else {
        this.$message.error(res.data.data.error)
      }
    })
  },

}
