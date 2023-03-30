$(document).ready(function () {
    var userid = localStorage.getItem('id');
    //获取个人信息
    $.ajax({
        url: "http://localhost:3000/selectme",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            s_id: userid,
            s_name: "",
            s_phone: "",
            s_age: "",
            s_parentPhone: "",
            s_parentName: "",
            s_address: "",
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            console.log(data);
            $('.username').text(data[0].s_name);
            $('#s_name').val(data[0].s_name);
            $('#s_phone').val(data[0].s_phone);
            $('#s_age').val(data[0].s_age);
            $('#s_parentPhone').val(data[0].s_parentPhone);
            $('#s_parentName').val(data[0].s_parentName);
            $('#s_address').val(data[0].s_address);
        },
    })
    //修改个人信息
    $('#update').click(function () {
        $.ajax({
            url: "http://localhost:3000/updateme",//后台请求的数据
            dataType: "json",//数据格式 
            type: "post",//请求方式
            //data表示发送的数据
            data: JSON.stringify({
                s_id: userid,
                s_parentPhone: $('#s_parentPhone').val(),
                s_address: $('#s_address').val(),
            }),
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {  //如果请求成功，返回数据。
                console.log("修改成功");
                $('#loadingToast').addClass('show').removeClass('fade');
                setTimeout(function () {
                    $('#loadingToast').addClass('fade').removeClass('show');
                }, 2000);
            },
        })
    })
    //获取个人订单情况
    $.ajax({
        url: "http://localhost:3000/selectorder",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            s_id: userid,
            c_id: "",
            course_pic: "",
            courseName: "",
            price: "",
            orderID: "",
            state: "",
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            console.log(data.length);
            if (data.length == 0) {
                var str_orderno = "";
                str_orderno += '<div class="shadow m-4 py-2">'
                    + '<div class="m-md-4 m-1">'
                    + '<h3 class="text-center"style="color:#c0c4c8">暂无订单记录</h3>'
                    + '</div>'
                    + '</div>';
                $("#order").append(str_orderno);
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    d_order = data[i];

                    console.log(timeStamp2String(Date.parse(d_order.paytime)));
                    var str_order = "";
                    str_order += '<div class="shadow m-4 py-2">'
                        + '<div class="m-md-4 m-1">'
                        + '<div class="border-bottom row m-1 pb-3">'
                        + '<div class="col-xl-3 col-lg-6"><img src="' + d_order.course_pic + '" class=" img-fluid">'
                        + '</div>'
                        + '<div class="col-md-6 col-6 mt-2">'
                        + '<h5>' + d_order.courseName + '</h5>'
                        + '<p>支付金额:<span class="m-md-2 m-1" style="color:#ff6464 ; font-size: 18px;">' + d_order.price + '元</span></p>'
                        + '<p>支付时间:<span class="m-md-2 m-1">' + timeStamp2String(Date.parse(d_order.orderTime)) + '</span></p>'
                        + '</div>'
                        + '<div class="mt-3 col-xl-3 d-md-block d-none text-right"><a class="btn btn-danger">查看详情</a></div>'
                        + '<div class="mt-1  col-12 d-md-none d-block text-right"><a class="btn btn-danger">查看详情</a>'
                        + '</div>'
                        + '</div>'
                        + '<p>订单编号:' + d_order.orderID + '_N<span style="float: right;color:#ff6464">' + d_order.coursestate + '</span>'
                        + '</div>'
                        + '</div>';
                    $("#order").append(str_order);
                    console.log(str_order);
                }
            }
        },
    })
    $('.out').click(function () {
        localStorage.clear();
        window.location.href = "http://127.0.0.1:5500/home/index.html";
    })
})
//时间转换
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}