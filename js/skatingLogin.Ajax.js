$(document).ready(function () {
    $('#login').click(function () {
        var paw = $('#password').val();
        var phone = $('#s_phone').val();
        var pattern = /^1[34578]\d{9}$/;
        if (phone == '') {
            $('#error').addClass('show').removeClass('fade');
            $('#error').text('请输入账号');
        }
        else if (paw == '') {
            $('#error').addClass('show').removeClass('fade');
            $('#error').text('请输入密码');
        }
        else if (!pattern.test(phone)) {
            $('#error').addClass('show').removeClass('fade');
            $('#error').text('请输入有效账号');
        }
        else {
            $.ajax({
                url: "http://localhost:3000/selectLogin",//后台请求的数据
                dataType: "json",//数据格式 
                type: "post",//请求方式
                //data表示发送的数据
                data: JSON.stringify({
                    s_phone: $('#s_phone').val(),
                    password: $('#paw').val(),
                    s_id:"",
                }),
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {  //如果请求成功，返回数据。
                    //console.log(data.length);
                    //console.log(data[0].password);
                    //console.log(paw);
                    if (data.length == 0) {
                        $('#error').addClass('show').removeClass('fade');
                        $('#error').text('账号不存在，请注册');
                    }

                    else if ($.md5(paw) != data[0].password) {
                        $('#error').removeClass('fade').addClass('show');
                        $('#error').text('密码不正确，请重新输入');
                    }
                    else {
                        console.log('登录');
                        localStorage.setItem('id',data[0].id);
                       // window.history.go(-1);
                       window.location.href="http://127.0.0.1:5500/shop/Courses.html";
                    }
                },
            })
        }

    })
})