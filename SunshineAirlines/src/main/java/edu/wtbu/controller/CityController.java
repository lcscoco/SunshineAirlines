package edu.wtbu.controller;

import edu.wtbu.service.CityService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;

@Controller
public class CityController {

    @Resource
    private CityService cityService;

    @ResponseBody
    @RequestMapping(value = "getCityNames")
    public Object getCityNames(){
        return cityService.getCityNames();
    }
}
