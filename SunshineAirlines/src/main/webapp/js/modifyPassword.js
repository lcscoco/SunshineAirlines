$(function(){
    var userStr=localStorage.getItem("user");
    var user=JSON.parse(userStr);
    var email=user.Email;
    var name=user.FirstName+" "+user.LastName;
    $(".email").val(email);
    $(".name").val(name);


    $(".submit").click(function(){
        var newPassword=$(".newPassword").val();
        var newPasswordAgain=$(".newPasswordAgain").val();
        if(newPassword.length>16||newPassword.length<8){
            alert("请输入符合要求的密码");
            return;
        }
        if(newPassword!=newPasswordAgain){
            alert("两次密码输入不一致，请重新输入");
            return;
        }
        var userId=user.UserId;
        $.ajax({
            url:"http://localhost:8080/SunshineAirlines/updatePassword",
            type:"post",
            data:"userId="+userId+"&password="+newPassword,
            success:function(msg){
                var obj=msg;
                if(obj.flag=="success"){
                    localStorage.setItem("user","");
                    location.href="Login.html";
                }
            }
        })
    })
    $(".cancel").click(function(){
        $(".newPassword").val("");
        $(".newPasswordAgain").val("");
    })

})