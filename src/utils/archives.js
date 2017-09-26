import {api} from '@/api/record'
import {getToken} from '@/utils/auth'
import {removeToken} from '@/utils/auth'
import {encodeUnicode} from '@/utils/auth'

export default {
    //查询
    recordCheck(code) {
        this.$http(api.recordCheck, {
            params: {
                token: getToken(),
                st_certificates_number: code
            }
        }).then((res) => {
            if (res.status === 200) {
                if(res.data.code!=400){
                    this.$notify({
                        message: res.data.data,
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                           this.l_query = false;
                           this.achivesAjax(code);
                        }
                    });
                }else{
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            }else{
                this.$notify.error({
                    message: res.data.data.error
                });
            }
        })
    },
    //查询结果
    recordResult(code) {
        this.$http(api.recordResult, {
            params: {
                token: getToken(),
                st_certificates_number: code
            }
        }).then((res) => {
            if (res.status === 200) {
                if(res.data.code!=400){
                   this.recordList = res.data.data;
                }else{
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            }else{
                this.$notify.error({
                    message: res.data.data.error
                });
            }
        })
    },
    //查看考试成绩
    achScoreList(obj) {
        this.$http(api.achScoreList, {
            params: {
                token: getToken(),
                st_certificates_number: obj.card,
                st_id: parseInt(obj.id)
            }
        }).then((res) => {
            if (res.status === 200) {
                if(res.data.code!=400){
                    this.ScoreDataList = [];
                    this.ScoreDataList = res.data.data;
                    // this.gradeListParams.curpage = res.data.data.page;
                    // this.gradeListParams.page_count = res.data.data.page_count;
                    // this.gradeListParams.total_num = parseInt(res.data.data.rows);
                }else{
                    this.$notify.error({
                        message: res.data.data.error
                    });
                }
            }else{
                this.$notify.error({
                    message: res.data.data.error
                });
            }
        })
    },
}