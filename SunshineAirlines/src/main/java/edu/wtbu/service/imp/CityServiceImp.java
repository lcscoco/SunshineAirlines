package edu.wtbu.service.imp;

import edu.wtbu.dao.CityDao;
import edu.wtbu.pojo.Result;
import edu.wtbu.service.CityService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
public class CityServiceImp implements CityService {


    @Resource
    private CityDao cityDao;

    @Override
    public Result getCityNames() {
        return new Result("success",cityDao.getCityNames(),null);
    }
}
