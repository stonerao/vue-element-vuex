"use strict"
import Cookies from 'js-cookie'
export default {
    setSessionKye(name, val) {
        sessionStorage.setItem(name, JSON.stringify(val))
        return val
    },
    getSessionKye(name) {
        let _city = JSON.parse(sessionStorage.getItem(name))
        return _city
    },
    setSession(val) {
        sessionStorage.setItem('LOGINKEY', JSON.stringify(val))
        return val
    },
    getSession() {
        let _city = JSON.parse(sessionStorage.getItem('LOGINKEY'))
        return _city
    },
    getLocation() {
        let _city = JSON.parse(localStorage.getItem('LOGINKEY'))
        return _city
    },
    setLocation(val) {
        localStorage.setItem('LOGINKEY', JSON.stringify(val))
        return val
    },
    getLocal() {
        //获取key
        let _city = JSON.parse(sessionStorage.getItem('login_key'))
        return _city
    },
    setLocal(name, val) {
        //设置key
        localStorage.setItem(name, JSON.stringify(val))
        return val
    },
    getCookieAdmin() {
        return Cookies.get('admin-login')
    },
    setCookieAdmin(val) {
        
        return Cookies.set('admin-login', val)
    },
    setCookie(name,val) { 
        return Cookies.set(name,val)
    }, 
    getCookie(name) {
        return Cookies.get(name)
    },
    is_phone(phone) {
        if ((/^1[34578]\d{9}$/.test(phone))) {
            return true;
        } else {
            return false;
        }
    },
    is_name(name) {
        if ((/^[a-zA-z]\w{3,15}$/.test(name))) {
            return true;
        } else {
            return false;
        }
    },
    is_pwd(val) {
        const code = /^[a-zA-Z\d_]{6,}$/;
        if (code.test(val)) {
            return true
        } else {
            return false
        }
    },
    encodeUnicode(str) {
        //转为unicode 编码  
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return "\\u" + res.join("\\u");
    },
    // 解码  
    decodeUnicode(str) {
        str = str.replace(/\\/g, "%");
        return unescape(str);
    },
    getRequest(str) {
        let url = ''
        if (str) {
            url = str
        } else {
            url = location.href;
        }
        let theRequest = new Object();
        let href = url.split('?')[0]
        if (url.indexOf("?") != -1) {
            str = url.substr(url.indexOf("?") + 1);
            let strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
            }
        }
        return {
            href: href,
            parms: theRequest
        };
    },
    sroll(hasmore, curpage, fun) {
        window.onscroll = function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop; //离上方的距离
            var h = window.innerHeight || document.documentElement.clientHeight ||
                document.body.clientHeight; //可见宽度
            if (t >= document.documentElement.scrollHeight - h) {
                new fun()
            }
        }
    },
    getCode() {
        // 生成二维码 
        let code = ""
        var codeLength = 4;//验证码的长度  
        // var checkCode = document.getElementById("code");
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数  
        for (var i = 0; i < codeLength; i++) {//循环操作  
            var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）  
            code += random[index];//根据索引取得随机数加到code上  
        }
        return code;
    },
    // getCookie(name) {
    //     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    //     if (arr = document.cookie.match(reg)) {
    //         return unescape(arr[2]);
    //     }
    //     else {
    //         return null;
    //     }
    // }
}