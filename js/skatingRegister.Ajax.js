$(document).ready(function () {
    $('#register').click(function () {
        var pattern = /^1[34578]\d{9}$/;
        var s_phone = $('#s_phone').val();
        var sj_phone = $('#s_parentPhone').val();
        if (s_phone == '') {
            $('.s_phonetip').text('请输入学员的手机号，将成为登录账号');
        }
        else if (!pattern.test(s_phone)) {
            $('.s_phonetip').text('请输入有效的学员的手机号');
        }
        else if (s_phone.length != 11) {
            $('.s_phonetip').text('请输入有效的学员的手机号');
        }
        else {
            $.ajax({
                url: "http://localhost:3000/selectLogin",//后台请求的数据
                dataType: "json",//数据格式 
                type: "post",//请求方式
                //data表示发送的数据
                data: JSON.stringify({
                    s_phone: $('#s_phone').val(),
                }),
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {  //如果请求成功，返回数据。
                    console.log(data.length);
                    if (data.length != 0) {
                        $('.s_phonetip').text('该手机号已注册过，请前往登录');
                    }
                    else{
                        $('.s_phonetip').text('');
                    }
                },
            })
            if (sj_phone == '') {
                $('.s_parentPhonetip').text('请输入家长的手机号');
            }
            else if (!pattern.test(sj_phone)) {
                $('.s_parentPhonetip').text('请输入有效的学员的手机号');
            }
            else if (sj_phone.length != 11) {
                $('.s_parentPhonetip').text('请输入有效的学员的手机号');
            }
            else {
                console.log('ok');
                $.ajax({
                    url: "http://localhost:3000/addstu",//后台请求的数据
                    dataType: "json",//数据格式 
                    type: "post",//请求方式
                    //data表示发送的数据
                    data: JSON.stringify({
                        s_name: $('#s_name').val(),
                        s_age: $('#s_age').val(),
                        s_phone: $('#s_phone').val(),
                        s_address: $('#s_address').val(),
                        s_parentName: $('#s_parentName').val(),
                        s_parentPhone: $('#s_parentPhone').val(),
                        password: $('#paw').val(),
                    }),
                    contentType: 'application/json;charset=UTF-8',
                    success: function (data) {  //如果请求成功，返回数据。
                        console.log("注册成功");
                        window.location.href="http://127.0.0.1:5500/logIn/logIn.html";
                    },
                })
            }
        }

    })
})
