$(function(){
    $.ajax({
        url:"http://localhost:8080/SunshineAirlines/getCityNames",
        type:"post",
        data:"",
        success:function(msg){
            var obj=msg;
            if(obj.flag=="success"){
               var html="";
               for(var i=0;i<obj.data.length;i++){
                   html+="<option value='"+obj.data[i].CityName+"'>"+obj.data[i].CityName+"</option>";
               }
               $(".fromCity").html(html);
               $(".toCity").html(html);
            }
        }
    })
    $(".changeicon").click(function(){
        var fromCity=$(".fromCity").val();
        var toCity=$(".toCity").val();
        $(".fromCity").val(toCity);
        $(".toCity").val(fromCity);
    })
    $(".searchBtn").click(function(){
        seachList();
    })


})
function seachList(){
    var fromCity=$(".fromCity").val();
    var toCity=$(".toCity").val();
    var startDate=$(".startDate").val();
    var endDate=$(".endDate").val();
    $.ajax({
        url:"http://localhost:8080/SunshineAirlines/getSchedule",
        type:"post",
        data:"fromCity="+fromCity+"&toCity="+toCity+"&startDate="+startDate+"&endDate="+endDate,
        success:function(msg){
            var obj=msg;
            if(obj.flag=="success"){
                var html="";
                for(var i=0;i<obj.data.length;i++){
                    var status=obj.data[i].Status;
                    var buttonName="Confirm";
                    var newStatus=1;
                    if(status=="Confirmed"){
                        buttonName="Cancel";
                        newStatus=0;
                    }
                    html+="<tr class='tdcolor'>"+
                    "<td>"+obj.data[i].Date.substring(0,10)+"</td>"+
                    "<td>"+obj.data[i].Time.substring(0,5)+"</td>"+
                    "<td>"+obj.data[i].DepartCityName+"/"+obj.data[i].DepartureAirportIATA+"</td>"+
                    "<td>"+obj.data[i].ArriveCityName+"/"+obj.data[i].ArrivalAirportIATA+"</td>"+
                    "<td>"+obj.data[i].Name+"</td>"+
                    "<td>"+obj.data[i].EconomyPrice+"</td>"+
                    "<td>"+obj.data[i].FlightNumber+"</td>"+
                    "<td>"+obj.data[i].Gate+"</td>"+
                    "<td>"+status+"</td>"+
                    "<td><input type='button' value='"+buttonName+"' onClick='updateSchedule("+obj.data[i].ScheduleId+","+newStatus+")'/></td>"+
                    "</tr>";
                    $(".resultList").html(html);
                    $(".resultList tr:odd").addClass("tdcolor1");
                }
            }
        }
    })
}

function updateSchedule(scheduleId,newStatus){
    var newStatusName="Confirmed";
    if(newStatus==0){
        newStatusName="Canceled";
    }
    $.ajax({
        url:"http://localhost:8080/SunshineAirlines/updateSchedule",
        type:"post",
        data:"scheduleId="+scheduleId+"&status="+newStatusName,
        success:function(msg){
            var obj=msg;
            if(obj.flag=="success"){
                seachList();
            }
        }
    })
}