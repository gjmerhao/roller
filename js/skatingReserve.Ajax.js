//获取教练信息-->预定页面
$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/selectcoach",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            c_pic: "",
            c_name: "",
            c_phone: "",
            c_introduction: "",
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            for (var i = 0; i < data.length; i++) {
                d_coachs = data[i];
                var str_coachs = "";
                str_coachs += '<div class="border shadow px-3  mb-3 rounded-lg">'
                    + '<div class="row border-bottom">'
                    + '<img class="col-4 py-2" style="width: 20%;border-radius:50%" src="' + d_coachs.c_pic + '">'
                    + '<div class="pt-4">'
                    + '<h5 class="font-weight-bold pt-2">' + d_coachs.c_name + '</h5>'
                    + '<p class="font-weight-bold" style="font-size:14px;">联系方式:' + d_coachs.c_phone + '</p>'
                    + '</div>'
                    + '</div>'
                    + '<h6 class=" font-weight-bold mt-2">简介：</h6>'
                    + '<p>' + d_coachs.c_introduction + '</p>'
                    + '</div>',
                    $("#coachs").append(str_coachs);
            }
        },
    })
})

//获取点击进入预约的课程信息
$(document).ready(function () {
    var courseid = window.location.search.split("=")[1];
    console.log(courseid);
    $.ajax({
        url: "http://localhost:3000/selectcourses",//后台请求的数据
        dataType: "json",//数据格式 
        type: "post",//请求方式
        //data表示发送的数据
        data: JSON.stringify({
            courseID: courseid,
            courseName: "",
            courseType: "",
            course_pic: "",
            price: "",
        }),
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {  //如果请求成功，返回数据。
            d_courses = data[0];
            var coachprice = d_courses.price - 5;
            var str_courses = "";
            str_courses += '<img class="img-fluid shadow mt-3" src="' + d_courses.course_pic + '">'
                + '<div class="pl-4  pt-3">'
                + '<h3 style="color:#ff6464 ;">' + d_courses.courseName + '</h3>'
                + '<h5 class="mt-2">类型：' + d_courses.courseType + '</h5>'
                + '<h5 class="mt-2 "><i class="bi bi-circle-fill mr-2"style="font-size:10px"></i>教学费用:￥' + coachprice + '<span class="ml-3 "><i class="bi bi-circle-fill mr-2"style="font-size:10px"></i>场地费:￥5</span></h5>'
                + '<h5 style="color:#ff6464 ;"class="mt-4">总计:￥' + d_courses.price + '</h5>'
                + '<a class="btn btn-danger mt-4"href = "http://127.0.0.1:5500/shop/message.html?=' + d_courses.courseID + '"id="checklogin">立即预定</a>'
                + '</div>'
                + '<div class=" col-lg-10 pl-4 mt-3 mb-5">'
                + '<p class="pt-3" style="font-size: 20px;">课程声明</p>'
                + '<p class=" pb-3 border-top-0 pl-4">'
                + '1、课时安排：周一至周日，上午：9:00am-12:00am（共三节课），下午：2:00pm-5:00pm(共三节课) ，晚上：7:00pm-9:00(共两节课)。'
                + '</br>2、如果教练一旦确定的课程安排，则不可以临时改变课程安排，如教练因临时更改课程造成了损失，由教练来承担。学员在上课时间的前一天均可联系官方取消课程预约，逾期不能退款。'
                + '</br>3、教练教学期间不能额外收取学员的费用。'
                + '</br>4、上课期间出现安全隐患，均有官方承担。'
                + '</br>5、上课地点，均是教练上门服务，就近地点教学，若是学员找好场地教学，可退还场地费用。'
                + '</p>'
                + '</div>',
                $('#courses').html(str_courses);
            console.log(str_courses);
            console.log(data);

        },
    })

    /*$('checklogin').click(function () {
        if (userId == 'null') {
            $('#fade').addClass('d-block').removeClass('d-none');
            $('#empty').addClass('d-block').removeClass('d-none');
        }
        else {

        }
    })*/
})
