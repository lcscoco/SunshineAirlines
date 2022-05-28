var searchObj={}
$(document).ready(function(){
    findUserList(1,"",0);
    $("#show").click(function(){
        var name=$(".userName").val();
        var roleId=$(".roleId").val();
        findUserList(1,name,roleId);
    })
    $(".NUM .pages").change(function(){
        findUserList(parseInt($(this).val()),searchObj.name,searchObj.roleId);
    })
    $(".fa-step-backward").click(function(){
        if(searchObj.startPage==1){
            alert("当前已经是第一页")
        }else{
            findUserList(1,searchObj.name,searchObj.roleId);
        }
    })
    $(".fa-chevron-left").click(function(){
        if(searchObj.startPage==1){
            alert("当前已经是第一页")
        }else{
            findUserList(searchObj.startPage-1,searchObj.name,searchObj.roleId);
        }
    })
    $(".fa-chevron-right").click(function(){
        if(searchObj.startPage==searchObj.pages){
            alert("当前已经是最后一页")
        }else{
            findUserList(searchObj.startPage+1,searchObj.name,searchObj.roleId);
        }
    })
    $(".fa-step-forward").click(function(){
        if(searchObj.startPage==searchObj.pages){
            alert("当前已经是最后一页")
        }else{
            findUserList(searchObj.pages,searchObj.name,searchObj.roleId);
        }
    })

})
function findUserList(startPage,name,roleId){
    searchObj.roleId=roleId;
    searchObj.name=name;
    searchObj.startPage=startPage;
    // roleId=param1&name=param2&startPage=param3&pageSize=param4
    $.ajax({
        url:"http://localhost:8080/SunshineAirlines/userList",
        data:"roleId="+roleId+"&name="+name+"&startPage="+startPage+"&pageSize=10",
        type:"post",
        success:function(msg){
            var obj=msg;
            if(obj.flag=="success"){
                var html="";
                var user=obj.data;
                for(var i=0;i<user.length;i++){
                    var gender=user[i].Gender=="M"?"Male":"Female";
                    var roleId=user[i].RoleId=="1"?"Office User":"Administrator";
                    html+="<tr>"+
                        "<td>"+user[i].Email+"</td>"+
                        "<td>"+user[i].FirstName+" "+user[i].LastName+"</td>"+
                        "<td>"+gender+"</td>"+
                        "<td>"+user[i].DateOfBirth+"</td>"+
                        "<td>"+user[i].Phone+"</td>"+
                        "<td>"+roleId+"</td>"+
                        "<td><input class='editUser' style='width: 80px;  font-size: 16px;' type='button' value='Edit'/></td>"+
                        "</tr>"
                }
                $(".formclass tbody").html(html);
                $(".formclass tbody tr:odd").addClass("tdcolor");
                $(".formclass tbody tr:even").addClass("tdcolor1");
                var total=obj.page.total;
                $(".totals").text(total);
                searchObj.pages=parseInt(total/10);
                if(total%10!=0){
                    searchObj.pages++;
                }
                $(".totalpage .pages").text(searchObj.pages);
                var optionhtml="";
                for(var i=1;i<=searchObj.pages;i++){
                    if(searchObj.startPage==i){
                        optionhtml+="<option  value='"+i+"' selected>"+i+"</option>"
                    }else{
                        optionhtml+="<option  value='"+i+"'>"+i+"</option>"
                    }
                }
                $(".NUM .pages").html(optionhtml);
            }
        }
    })
}