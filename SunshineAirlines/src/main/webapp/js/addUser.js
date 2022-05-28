$(function(){
    $(".submit").click(function(){
        var email=$(".email").val();
        var roleId=2;
        if($(".roleUser").prop("checked")){
            roleId=1;
        }
        var gender="F";
        if($(".genderMale").prop("checked")){
            gender="M";
        }
        var firstName=$(".firstName").val();
        var lastName=$(".lastName").val();
        var dateOfBirth=$(".dateOfBirth").val();
        var phone=$(".phone").val();
        var address=$(".address").val();
        var photo=$(".photo").attr("src");
        photo=encodeURIComponent(photo);
        $.ajax({
            url:"http://localhost:8080/SunshineAirlines/addUser",
            type:"post",
            data:"email="+email+"&firstName="+firstName+"&lastName="+lastName+"&gender="+gender+
                "&dateOfBirth="+dateOfBirth+"&phone="+phone+"&photo="+photo+"&address="+address+"&roleId="+roleId,
            success:function(msg){
                var obj=msg;
                if(obj.flag=="success"){
                    location.href="UserManagement.html";
                }else{
                    alert(obj.data);
                }
            }
        })
    })
    $(".cancel").click(function(){
        location.href="UserManagement.html";
    })
    $(".upload-input").change(function(){
        var file=this.files[0];
        var fileReader=new FileReader();
        fileReader.onload=function(event){
            var imgUrl=event.target.result;
            $(".photo").attr("src",imgUrl);
        }
        fileReader.readAsDataURL(file);
    })
})