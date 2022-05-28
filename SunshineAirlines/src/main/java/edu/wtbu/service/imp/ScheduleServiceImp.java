package edu.wtbu.service.imp;

import edu.wtbu.dao.ScheduleDao;
import edu.wtbu.pojo.Result;
import edu.wtbu.service.ScheduleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class ScheduleServiceImp implements ScheduleService {

    @Resource
    private ScheduleDao scheduleDao;

    @Override
    public Result getSchedule(HashMap<String, Object> map) {
        List<HashMap<String,Object>> list = scheduleDao.getSchedule(map);
        for (HashMap<String,Object> hashMap : list ) {
            Date date = (Date)hashMap.get("Date");
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateStr = simpleDateFormat.format(date);
            hashMap.put("Date",dateStr);
        }
        return new Result("success",list,null);
    }

    @Override
    public Result updateSchedule(HashMap<String, Object> map) {
        Result result = new Result("fail",null,null);
        List<HashMap<String,Object>> list = scheduleDao.findScheduleById(Integer.parseInt(map.get("scheduleId").toString()));
        if(list != null && list.size() > 0){
            int update = scheduleDao.updateSchedule(map);
            if(update > 0){
                result.setFlag("success");
            }
        }else {
            result.setData("航班计划不存在");
        }
        return result;
    }

    @Override
    public Result getTicketStatistics(HashMap<String, Object> map) {
        List<HashMap<String,Object>> list = scheduleDao.getTicketStatistics(map);
        if(list != null && list.size() > 0){
            for (HashMap<String,Object> Hashmap : list) {
                String year = Hashmap.get("Year").toString();
                int month = Integer.parseInt(Hashmap.get("Month").toString());
                String dateStr = year + (month < 10 ? "-0" + month : "-" + month);
                Hashmap.remove("Year");
                Hashmap.put("Month",dateStr);
            }
        }
        return new Result("success",list,null);
    }
}
