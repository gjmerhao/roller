//获取教练信息
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/selectcoach",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            c_name: "",
            c_introduction: "",
            c_pic: "",
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            for (var i = 1; i < data.length; i++) {
                d_coach = data[i];
                var str = "";
                str += '<div class="col-lg-3 col-md-6"data-toggle="modal" data-target="#wechat-coach">'
                    + '<div class="card mb-3 border-0 shadow showhover">'
                    + '<img src="' + d_coach.c_pic + '" class="p-2 img-fluid " style="background-color: #dfebff;">'
                    + '<div class="card-body text-center card-height">'
                    + '<h5 class="card-title" style="color:#ff6464;">' + d_coach.c_name + '</h5>'
                    + '<p class="card-text text-left" style="font-size:14px">'
                    + d_coach.c_introduction
                    + '</p>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $("#coach").append(str);
            }


        },
    })
})





