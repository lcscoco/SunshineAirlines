package edu.wtbu.controller;

import edu.wtbu.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;

@Controller
public class UserController {

    @Resource
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "login")
    public Object login(String email,String password){
        HashMap<String,Object> map = new HashMap<>();
        map.put("email",email);
        map.put("password",password);
        return userService.login(map);
    }

    @ResponseBody
    @RequestMapping(value = "userList")
    public Object userList(Integer roleId,String name,Integer startPage,Integer pageSize){
        HashMap<String,Object> map = new HashMap<>();
        startPage = (startPage-1)*10;
        map.put("roleId",roleId);
        map.put("name",name);
        map.put("startPage",startPage);
        map.put("pageSize",pageSize);
        return userService.userList(map);
    }

    @ResponseBody
    @RequestMapping(value = "addUser")
    public Object addUser(String email,String firstName,String lastName,String gender,String dateOfBirth,String photo,
                            String phone,String address,Integer roleId){
        HashMap<String,Object> map = new HashMap<>();
        map.put("email",email);
        map.put("firstName",firstName);
        map.put("lastName",lastName);
        map.put("gender",gender);
        map.put("email",email);
        map.put("dateOfBirth",dateOfBirth);
        map.put("photo",photo);
        map.put("phone",phone);
        map.put("address",address);
        map.put("roleId",roleId);
        String password = email.split("@")[0];
        password = password.length()>6?password.substring(0,6):password;
        map.put("password",password);
        return userService.addUser(map);
    }

    @ResponseBody
    @RequestMapping(value = "updatePassword")
    public Object updatePassword(Integer userId,String password){
        HashMap<String,Object> map = new HashMap<>();
        map.put("userId",userId);
        map.put("password",password);
        return userService.updatePassword(map);
    }
}
