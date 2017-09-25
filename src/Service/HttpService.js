import {target} from '../Config/Backend';

class HttpService{
    static _DEFAULT={
        url:window.location.pathname,
        async:true,
        type:'GET',
        data:{},
        dataType:'json',
        success:function(data){},
        error:function(){}
    };

    static formatParams(data){
        var arr=[];
        for(var name in data){
            arr.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
        }
        return arr.join('&');
    }

     filter(str) { //特殊字符转义
        str += ''; //隐式转换
        str = str.replace(/%/g, '%25');
        str = str.replace(/\+/g, '%2B');
        str = str.replace(/ /g, '%20');
        str = str.replace(/\//g, '%2F');
        str = str.replace(/\?/g, '%3F');
        str = str.replace(/&/g, '%26');
        str = str.replace(/\=/g, '%3D');
        str = str.replace(/#/g, '%23');
        return str;
    }

    static ajax(config){
        config=Object.assign({},this._DEFAULT,config);
        let xhr = new XMLHttpRequest();
        let data=this.formatParams(config.data);
        config.type=config.type.toUpperCase();
       try{
           if(config.type==='GET'){
               let url = config.url+'?'+data+'&'+new Date().getTime();
               xhr.open(config.type,url,config.async);
               xhr.send(null);

           }else{
               xhr.open(config.type,config.url,config.async);
               xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
               xhr.send(data);
           }
       }
       catch(e){
           console.log(e);
       }

       if (config.async) {
            xhr.addEventListener('readystatechange', httpEnd, false);
         } else {
            httpEnd();
         }

         xhr.end = function () {
            xhr.removeEventListener('readystatechange', httpEnd, false);
        }

    function httpEnd(){
        if(xhr.readyState===4){
            let head=xhr.getAllResponseHeaders();
            let response = xhr.responseText;

            if (/application\/json/.test(head) || config.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response)) {
                response = JSON.parse(response);
            }

            if(xhr.status>=200&&xhr.status<300){
                config.success&&config.success(response,config,xhr);
            }else{
                config.error&&config.error(config,xhr);
            }




        }
    }
    return xhr;//这句话没加导致this.get老是undefined

}

    static get(url,data,success,error){
        var setting = {
            url: target + url, //默认ajax请求地址
            type: 'GET', //请求的方式
            data: data, //发给服务器的数据
            success: success || function () { }, //请求成功执行方法
            error: error || function () { } //请求失败执行方法
        };
        return this.ajax(setting);

    }

    static post(url,data,success,error){
        var setting = {
            url: target + url, //默认ajax请求地址
            type: 'POST', //请求的方式
            data: data, //发给服务器的数据
            success: success || function () { }, //请求成功执行方法
            error: error || function () { } //请求失败执行方法
        };
        return this.ajax(setting);
    }

    static jsonp(config) {    
        var params = this.formatParams(config.data);
        var Scrip=document.createElement('script');
        Scrip.src = config.url + "?" + params + '&jsoncallback=' + config.success;
        
        document.body.appendChild(Scrip);
    }


    static uploadFile(cfg) {
        var config = cfg || {};
        var xhr;
        var fileObj = config.file; // js 获取文件对象
        var url = config.url; // 接收上传文件的后台地址
        var form = new FormData(); // FormData 对象
        form.append(config.name, fileObj); // 文件对象
        xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
        xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    var res = JSON.parse(xhr.responseText);
                    console.log(res);
                    config.success && config.success(res);
                } else {
                    config.fail && config.fail(status);
                }
            }
        };
        xhr.send(form); //开始上传，发送form数据
    }

}



export default HttpService;