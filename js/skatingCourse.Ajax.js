//获取课程信息
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/selectcourse",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            courseID: "",
            courseName: "",
            courseType: "",
            course_pic: "",
            courseIntroduction: "",
            price: "",
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            for (var i = 0; i < data.length; i++) {
                d_course = data[i];
                var str_course = "";
                str_course += '<div class="col-lg-4 col-md-6 col-12 mb-5 showhover">'
                    + '<div class="card border-0 shadow " >'
                    + '<img class="courses-card-img img-fluid " src="' + d_course.course_pic + '">'
                    + '<h5 class="p-3 courses-card-text font-weight-bold text-size" style="width:27%;">' + d_course.price + '元</h5>'
                    + '<div class="px-3 text">'
                    + '<p style="color: #818182;">' + d_course.courseName + '<span class="font-weight-bold px-3">·</span>一小时</p>'
                    + '<h5 class="font-weight-bold py-1">' + d_course.courseType + '</h5>'
                    + '<h6 class="card-subtitle pt-2 pb-3">' + d_course.courseIntroduction + '</h6>'
                    + '<button class="btn btn-danger mt-2" >立即预定</button>'
                    +'<a href="http://127.0.0.1:5500/shop/reserve.html?='+d_course.courseID+'" class="card-link stretched-link"></a>'
                    + '</div>'
                    + '</div>'
                    + '</div>';
                $("#course").append(str_course);
            }
        },
    })
})