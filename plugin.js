# js
/**
 *
 * @param options  seconds　cssOptions
 */
$.fn.slide = function(options){
    var defaultOptions = {
        cssOptions:{
            "border":"3px solid white",
            "border-radius":"10px",
            "margin-left":"5px",
            "width":"10px",
            "height":"10px"
        }
    };
     options = options||{};
     options = $.extend(true,defaultOptions,options);
    var cur = $(this);
    var processImages = function(images){
        if(images&&!images instanceof  Array){
            throw  TypeError("json error");
            return;
        }
        if(images.length>0){
            cur.css("position","relative").css("overflow","hidden");
            cur.append('<div class="imgContent" style="width: '+100*images.length+"%"+'"></div>');
            var divs = $("<div style='text-align: center;position:absolute;bottom:20px;left:0px;right:0px;' class='clickButton'></div>");
            for(var i=0;i<images.length;i++){
                divs.append("<a href='javascript:void(0)' style='display:inline-block;'></a>");
                cur.find(".imgContent").append("<img src='"+images[i]+"' style='width:25%'  >");
            }
            divs.find(">a:eq(0)").css("background-color","white");
            cur.append(divs).data("img_index");
            divs.find(">a").css(options.cssOptions);
            var clickEvent = function(){
                clearInterval(flag);
                $(this).css("background-color","white").siblings().css("background-color","transparent");
                var index = $($(this).parent().find(">a")).index(this);
                var margin_left=-cur.width()*index;
                cur.find(">.imgContent>img:eq(0)").css("margin-left",margin_left+"px");
                cur.data("img_index",index);
                flag = setInterval(timeRun ,options.seconds||3000);
            };
            var timeRun =function(){
                cur.find(">.clickButton >a").off("click",clickEvent);
                var img_index = (cur.data("img_index")||0);
                if(++img_index==images.length){
                    img_index = 0;
                }
                var margin_left=-cur.width()*img_index;
                cur.find(">.imgContent>img:eq(0)").css("margin-left",margin_left+"px");
                cur.find(".clickButton>a").eq(img_index).css("background-color","white").siblings().css("background-color","transparent");
                cur.data("img_index",img_index);
                cur.find(">.clickButton >a").on("click",clickEvent);

            };
            var flag = setInterval(timeRun ,options.seconds||3000);
            cur.find(">.clickButton >a").on("click",clickEvent);

        }
    };
    var urlType = typeof options.url;
    /**
     * data url属性只能设置一个
     */
    if(options.url && options.data){
      throw  Error("the data or url can select one");
    }

    if(options.url){
        /**
         * url属性必须为字符串类型
         */
        if(urlType!='string')
        {
            throw TypeError("the url  of options must be string");
            return;
        }
        $.getJSON(options.url,{},function(json){
            processImages(json);
        });
    }
    /**
     * data 属性必须为数组
     * @type {string}
     */
    if(options.data){
        if(!options.data instanceof  Array){
            throw TypeError("the data  of options must be Array");
            return;
        }
        else{
            processImages(options.data);
        }
    }

};
