import {
  api
} from '@/api/index'
export default {
  area_list(state = 1, id) {
    typeof state != 'number' ? state = parseInt(state) : '';
    switch (state) {
      case 1:
        this.$http(api.areaList).then((res) => {
          this.area.province = res.data.data.area_list;
        })
        break;
      case 2:
        this.$http(api.areaList, {
          params: {
            area_id: id
          }
        }).then((res) => {
          this.area.city = res.data.data.area_list;
        })
        break;
      case 3:
        this.$http(api.areaList, {
          params: {
            area_id: id
          }
        }).then((res) => {
          this.area.area = res.data.data.area_list;
        })
        break;
    }
    // 省

    // 市
    // 区
  }
}
