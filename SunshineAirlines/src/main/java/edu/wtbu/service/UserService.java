package edu.wtbu.service;

import edu.wtbu.pojo.Result;

import java.util.HashMap;


public interface UserService {

    Result login(HashMap<String,Object> map);

    Result userList(HashMap<String,Object> map);

    Result addUser(HashMap<String, Object> map);

    Result updatePassword(HashMap<String, Object> map);
}
