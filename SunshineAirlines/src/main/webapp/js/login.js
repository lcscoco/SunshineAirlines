$(document).ready(function(){

    var userStr=localStorage.getItem("user");
    try {
        var user=JSON.parse(userStr);
        var date=new Date(user.loginDate);
        date.setDate(date.getDate()+7);
        if(new Date()<date){
            jump(user);
        }
    } catch (error) {

    }

    $(".loginbutton").click(function(){
        var email=$(".email").val();
        var password=$(".password").val();
        var param="email="+email+"&password="+password;
        $.ajax({
            url:"http://localhost:8080/SunshineAirlines/login",
            type:"post",
            data:param,
            success:function(msg){
                var obj=msg;
                if(obj.flag=="success"){
                    var user=obj.data[0];
                    if($(".is7day").is(":checked")){
                        user.loginDate=new Date();
                    }
                    localStorage.setItem("user",JSON.stringify(user));
                    jump(user);
                }else{
                    $(".alertInfo").text(obj.data);
                }
            }
        })
    })
})
function jump(user){
    if(user.RoleId==1){
        location.href="ModifyPassword.html";
    }else if(user.RoleId==2){
        location.href="UserManagement.html";
    }
}