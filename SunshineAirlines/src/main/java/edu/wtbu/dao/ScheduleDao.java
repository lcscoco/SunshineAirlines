package edu.wtbu.dao;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.HashMap;
import java.util.List;

public interface ScheduleDao {
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    List<HashMap<String, Object>> getSchedule(HashMap<String, Object> map);

    List<HashMap<String, Object>> findScheduleById(int scheduleId);

    int updateSchedule(HashMap<String, Object> map);

    List<HashMap<String, Object>> getTicketStatistics(HashMap<String, Object> map);
}
