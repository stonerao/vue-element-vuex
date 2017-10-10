import {
  api
} from '@/api/index'
import {
  getToken
} from '@/utils/auth'

import {
  encodeUnicode
} from '@/utils/auth'
export default {
  Studentexamination_list() {
    this.$http(api.Studentexamination_list, {
      params: {
        token: getToken(),
        e_title: this.seach,
        page: this.page,
        curpage: this.curpage,
        type: this.shai_id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.t_data = res.data.data;
        this.all_pagecount = parseInt(res.data.page_total)
      }
    })
  },
  examination_info() {
    this.$http(api.examination_info, {
      params: {
        token: getToken(),
        e_id: this.e_id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.items = [];
        this.obj = res.data.data
        let data = res.data.data.question_list;
        this.timeM = parseInt(res.data.data.e_whenlong);
        for (var key in data) {
          for (var j in data[key]) {  
            if (data[key][j].q_type_id == '2') {
              data[key][j].answer = []
            } else if (data[key][j].q_type_id == '4') {
              data[key][j].answer = [];
              if (data[key][j].q_option) {
                data[key][j].q_option.forEach((x) => {
                  data[key][j].answer.push({
                    text: "",
                    index: x.index,
                    title: x.title
                  })
                })
              }
            } else {
              data[key][j].answer = ''
            }
            this.items.push(data[key][j]); 
          }
        }
        data = null;
      }
    })
  },
  pushAnswer(answer) {
    // 学生提交答案
    this.$http({
      method: "post",
      data: {
        token: getToken(),
        e_id: this.e_id,
        answer_list: encodeUnicode(JSON.stringify(answer))
      },
      url: api.pushAnswer
    }).then((res) => {
      if (res.data.code == 200) {
        this.answer = [];
        this.$router.push({
          path: "examination/index"
        })
        this.$notify({
          title: '成功',
          message: res.data.data,
          type: 'success'
        });

      } else {
        this.$notify.error({
          title: '错误',
          message: res.data.data.error
        });
      }
    })
  },
  mang_list() {
    this.$http(api.show_studentanswerlist, {
      params: {
        token: getToken(),
        e_id: this.id,
        page: this.page,
        curpage: this.curpage
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.page_total = parseInt(res.data.page_total);
        this.t_data = res.data.data;
      } else {

      }
    })
  },
  student_qe_list() {
    this.$http(api.student_answer_info, {
      params: {
        token: getToken(),
        exam_id: this.id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        let data = res.data.data;
        for (var key in data) {
          if (data[key].core != '0') {
            data[key]['answer_numbers'] = data[key].core;
          } else {
            data[key]['answer_numbers'] = "";
          }
          this.t_data.push(data[key]);
        }
        data = null;
      } else {

      }
    })
  },
  student_answer_grade() {

    this.$http({
      method: "post",
      url: api.student_answer_grade,
      data: {
        token: getToken(),
        obj: encodeUnicode(JSON.stringify(this.t_data)),
        exam_id: this.id
      }
    }).then((res) => {
      if (res.data.code == 200) {

        this.$emit("greadeQuit", true)
        this.$notify({
          title: '成功',
          message: res.data.data,
          type: 'success'
        });

      } else {
        this.$notify.error({
          title: '错误',
          message: res.data.data.error
        });
      }

    })
  },
  addline_examination(val, state, id) {
    let obj = {
      token: getToken(),
      lex_name: val,
    }
    if (state != 1 && id) {
      obj.lex_id = id
    }
    this.$http({
      method: 'post',
      url: state == 1 ? api.addline_examination : api.edit_line_examination,
      data: obj
    }).then((res) => {
      if (res.data.code == 200) {
        this.ajax();
        this.$notify({
          title: '成功',
          message: res.data.data,
          type: 'success'
        });

      } else {
        this.$notify.error({
          title: '错误',
          message: res.data.data.error
        });
      }
    })
  },
  line_examlist() {
    this.$http(api.line_examlist, {
      params: {
        token: getToken(),
        lex_name: this.search,
        page: this.page,
        curpage: this.curpage
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.toal = parseInt(res.data.page_total)
        this.t_data = res.data.data;
      }
    })
  },
  line_gradeslist() {
    this.$http(api.line_gradeslist, {
      params: {
        token: getToken(),
        le_student_name: this.search,
        page: this.page,
        curpage: this.curpage,
        lex_id: this.id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.toal = parseInt(res.data.page_total)
        this.t_data = res.data.data;
      }
    })
  },
  del_line_examination(id) {
    this.$http({
      method: 'post',
      data: {
        token: getToken(),
        del_id: id
      },
      url: api.del_line_examination
    }).then((res) => {
      if (res.data.code == 200) {
        this.ajax();
        this.$notify({
          title: '成功',
          message: res.data.data,
          type: 'success'
        });

      } else {
        this.$notify.error({
          title: '错误',
          message: res.data.data.error
        });
      }
    })
  },
  del_line_gradeslist(id) {
    this.$http({
      method: 'post',
      data: {
        token: getToken(),
        le_id: id
      },
      url: api.del_line_gradeslist
    }).then((res) => {
      if (res.data.code == 200) {
        this.$notify({
          title: '成功',
          message: res.data.data,
          type: 'success'
        });
        this.ajax();

      } else {
        this.$notify.error({
          title: '错误',
          message: res.data.data.error
        });
      }
    })
  },
  line_grades_static() {
    this.$http(api.line_grades_static, {
      params: {
        token: getToken(),
        lex_id: this.id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.t_data = res.data.data;
      }
    })
  },
  testpaper_statice() {
    this.$http(api.testpaper_statice, {
      params: {
        token: getToken(),
        t_id: this.id
      }
    }).then((res) => {
      if (res.data.code == 200) {
        this.t_data = res.data.data;
      } else {
        this.$notify.error({
          title: '错误',
          message: res.data.data.error
        });
      }
    })
  }
}
