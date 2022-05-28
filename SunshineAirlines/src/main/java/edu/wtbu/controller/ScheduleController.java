package edu.wtbu.controller;


import edu.wtbu.service.ScheduleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;

@Controller
public class ScheduleController {

    @Resource
    private ScheduleService scheduleService;


    @ResponseBody
    @RequestMapping(value = "getSchedule")
    public Object getSchedule(String fromCity,String toCity,String startDate,String endDate){
        HashMap<String,Object> map = new HashMap<>();
        map.put("fromCity",fromCity);
        map.put("toCity",toCity);
        map.put("startDate",startDate+" 00:00:00");
        map.put("endDate",endDate+" 23:59:59");
        return scheduleService.getSchedule(map);
    }


    @ResponseBody
    @RequestMapping(value = "updateSchedule")
    public Object updateSchedule(String status,Integer scheduleId){
        HashMap<String,Object> map = new HashMap<>();
        map.put("status",status);
        map.put("scheduleId",scheduleId);
        return scheduleService.updateSchedule(map);
    }


    @ResponseBody
    @RequestMapping(value = "getTicketStatistics")
    public Object getTicketStatistics(String startDate,String endDate){
        String[] endDateStr = endDate.split("-");
        int year = Integer.parseInt(endDateStr[0]);
        int month = Integer.parseInt(endDateStr[1]);
        if(month < 12){
            month++;
            String monthStr = month < 10 ? "-0" + month : "-" +month;
            endDate = year + monthStr + "-01 00:00:00";
        }else{
            year++;
            endDate = year + "-01-01 00:00:00";
        }
        HashMap<String,Object> map = new HashMap<>();
        map.put("startDate",startDate+"-01 00:00:00");
        map.put("endDate",endDate);
        return scheduleService.getTicketStatistics(map);
    }
}
