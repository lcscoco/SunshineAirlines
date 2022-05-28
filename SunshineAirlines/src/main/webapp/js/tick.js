$(function(){
    var now=new Date();
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var monthStr=month<10?"0"+month:month;
    var maxDate=year+"-"+monthStr;
    $(".startDate").prop("max",maxDate);
    $(".endDate").prop("max",maxDate);

    $(".endDate").change(function(){
        var startDate=$(".startDate").val();
        var endDate=$(".endDate").val();
        if(startDate==""){
            $(".startDate").prop("max",endDate);
        }else{
            if(new Date(startDate+"-01 00:00:00")>new Date(endDate+"-01 00:00:00")){
                alert("统计开始时间，必须早于结束时间");
            }else{
                $(".startDate").prop("max",endDate);
            }
        }
    })

    $(".stat").click(function(){
        var startDate=$(".startDate").val();
        var endDate=$(".endDate").val();
        $.ajax({
            url:"http://localhost:8080/SunshineAirlines/getTicketStatistics",
            type:"post",
            data:"startDate="+startDate+"&endDate="+endDate,
            success:function(msg){
                var obj=msg;
                if(obj.flag=="success"){
                   var html="";
                   for(var i=0;i<obj.data.length;i++){
                       html+="<tr class='tdcolor'>"+
                       "<td>"+obj.data[i].Month+"</td>"+
                       "<td>"+obj.data[i].FlightsAmount+"</td>"+
                       "<td>"+obj.data[i].TicketsAmount+"</td>"+
                       "<td>"+obj.data[i].TicketsRevenue+".00</td>"+            
                       "</tr>";
                   }
                   $(".resultList").html(html);
                   $(".resultList tr:odd").addClass("tdcolor1");
                }
            }
        })
    })
})