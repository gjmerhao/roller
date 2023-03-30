var courseid = window.location.search.split("=")[1];
console.log(courseid);
var userid = localStorage.getItem('id');
console.log(userid);
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/selectUser",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            userID: userid,
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            console.log(data);
            $('#s_name').val(data[0].s_name);
            $('#s_phone').val(data[0].s_phone);
            $('#s_address').val(data[0].s_address);
        },
    })
    $.ajax({
        url: "http://localhost:3000/selectcourses",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            courseID: courseid,
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            console.log(data);
            $('#course').val(data[0].courseName + ':' + data[0].courseType);
        },
    })
})
$(document).ready(function () {
    $('#pay').click(function () {
        $.ajax({
            url: "http://localhost:3000/payorder",//后台请求的数据
            dataType: "json",//数据格式 
            type: "post",//请求方式
            //data表示发送的数据
            data: JSON.stringify({
                courseID: courseid,
                userID: userid,
                time: $('#time option:selected').text(),
                day: $("#day").val(),
                state: "课程进行中",
            }),
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {  //如果请求成功，返回数据。
                $('#fades').addClass('d-none').removeClass('d-block');
                $('#zhifu').addClass('d-none').removeClass('d-block');
                $("#loadingToast").removeClass('fade').addClass('show');
                setTimeout(function(){
                    $("#loadingToast").removeClass('show').addClass('fade');
                    window.location.href = "http://127.0.0.1:5500/shop/Courses.html";
                }, 3000);
            },
        })
    })
})