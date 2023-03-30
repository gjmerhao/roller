$(document).ready(function () {
    var p = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    $('#s_phone').on('input', function () {
        $.ajax({
            url: "http://localhost:3000/selectusers",//后台请求的数据
            dataType: "json",//数据格式 
            type: "post",//请求方式
            //data表示发送的数据
            data: JSON.stringify({
                s_phone: $('#s_phone').val(),
            }),
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {  //如果请求成功，返回数据。
                if ($('#s_phone').val().length == 11 && p.test($('#s_phone').val()) && data.length == 0) {
                    $('#phoneerror').addClass('show').removeClass('fade');
                    $('#phoneerror').text('该账号不存在，请前往注册');
                }
                else if ($('#s_phone').val().length == 11 &&!p.test($('#s_phone').val())) {
                    $('#phoneerror').addClass('show').removeClass('fade');
                    $('#phoneerror').text('请输入有效的学员的手机号');
                }
                else  if($('#s_phone').val().length == 11 && $('#s_phone').val() == data[0].s_phone){
                    console.log('yes');
                    $('#phoneerror').addClass('fade').removeClass('show');
                    $("#Houqu").click(function () {
                        var Num = "";
                        for (var i = 0; i < 6; i++) {
                            Num += Math.floor(Math.random() * 10);
                        }
                        document.getElementById("yzm"), innerText = Num;
                        $("#yzm").val(Num);
                    })
                }
                
            },
        })
    });
    $("#Houqu").click(function () {
        if($('#s_phone').val() == ''){
            $('#phoneerror').addClass('show').removeClass('fade');
            $('#phoneerror').text('请先输入手机号');
        }
        else if(!p.test($('#s_phone').val())){
            $('#phoneerror').addClass('show').removeClass('fade');
            $('#phoneerror').text('请输入有效的学员的手机号');
        }
        
    })
    $('#next2').click(function () {
        if ($("#yzm").val() == "") {
            $('#yzerror').removeClass('fade').addClass('show');
            $('#yzerror').text('请获取验证码');
        }
        else {
            $.ajax({
                url: "http://localhost:3000/updatepwa",//后台请求的数据
                dataType: "json",//数据格式 
                type: "post",//请求方式
                //data表示发送的数据
                data: JSON.stringify({
                    s_phone: $('#s_phone').val(),
                    password: $('#paw2').val(),
                }),
                contentType: 'application/json;charset=UTF-8',
                success: function (data) {  //如果请求成功，返回数据。
                    console.log("修改成功");
                    window.location.href = "http://127.0.0.1:5500/logIn/logIn.html";
                },
            })
        }
    })
})
