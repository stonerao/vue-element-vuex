import { api } from '@/api/videoOther'
import { getToken, getClass } from '@/utils/auth'

export default {
  live_list() {
    let isClass = getClass();
    if (isClass == 3) {
      this.$http(api.stuLiveList, {
        params: {
          token: getToken(),
          curpage: this.pageSize,
          keywords: this.searchTxt,
          page: this.currentPage,
          state: this.checkType
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.total = parseInt(res.data.page_total);
          this.videoList = res.data.data;
        }
      })
    } else {
      this.$http(api.teaLiveList, {
        params: {
          token: getToken(),
          curpage: this.pageSize,
          keywords: this.searchTxt,
          page: this.currentPage,
          state: this.checkType
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.total = parseInt(res.data.page_total);
          this.videoList = res.data.data;
        }
      })
    }
  },
  //直播间详情
  live_info(id) {
    let isClass = getClass();
    if (isClass == 3) {
      this.$http(api.stuLiveDetail, {
        params: {
          token: getToken(),
          live_id: id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.detail = res.data.data;
          this.showDetail = 1;
        }
      })
    } else {
      this.$http(api.teaLiveDetail, {
        params: {
          token: getToken(),
          live_id: id
        }
      }).then((res) => {
        if (res.data.code == 200) {
          this.detail = res.data.data;
          this.showDetail = 1;
        }
      })
    }
  },
  stu_video_list() {
    this.$http(api.stuVideoList, {
      params: {
        token: getToken(),
        curpage: this.pageSize,
        keywords: this.searchTxt,
        page: this.currentPage
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.videoList = res.data.data.video_list;
        this.total = parseInt(res.data.data.page.page_total)
      }
    })
  },

}
