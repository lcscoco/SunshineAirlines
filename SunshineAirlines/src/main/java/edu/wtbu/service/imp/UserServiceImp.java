package edu.wtbu.service.imp;

import edu.wtbu.dao.UserDao;
import edu.wtbu.pojo.Page;
import edu.wtbu.pojo.Result;
import edu.wtbu.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Resource
    private UserDao userDao;
    private Result result;

    @Override
    public Result login(HashMap<String, Object> map) {
        result = new Result("fail",null,null);
        List<HashMap<String, Object>> list = userDao.findUserByEmail(map.get("email").toString());
        if(list != null && list.size() > 0){
            list = userDao.findUserByEmailAndPassword(map);
            if(list != null && list.size() > 0){
                result.setFlag("success");
                result.setData(list);
            }else {
                result.setData("密码错误");
            }
        }else {
            result.setData("邮箱不存在");
        }
        return result;
    }

    @Override
    public Result userList(HashMap<String, Object> map) {
        List<HashMap<String, Object>> list = userDao.findUserList(map);
        int count = userDao.findUserCount(map);
        Page page = new Page(count,Integer.parseInt(map.get("startPage").toString()),Integer.parseInt(map.get("pageSize").toString()));
        return new Result("success",list,page);
    }

    @Override
    public Result addUser(HashMap<String, Object> map) {
        result = new Result("fail",null,null);
        List<HashMap<String, Object>> list = userDao.findUserByEmail(map.get("email").toString());
        if(list != null && list.size() > 0){
            result.setData("邮箱重复");
        }else {
            int add = userDao.addUser(map);
            if(add > 0){
                result.setFlag("success");
            }
        }
        return result;
    }

    @Override
    public Result updatePassword(HashMap<String, Object> map) {
        result = new Result("fail",null,null);
        List<HashMap<String, Object>> list = userDao.findUserById(Integer.parseInt(map.get("userId").toString()));
        if(list != null && list.size() > 0){
            int update = userDao.updatePassword(map);
            result.setFlag("success");
        }else{
            result.setFlag("用户信息不存在");
        }
        return result;
    }


}
