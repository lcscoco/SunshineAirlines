package edu.wtbu.dao;



import java.util.HashMap;
import java.util.List;

public interface UserDao {
    List<HashMap<String,Object>> findUserByEmail(String email);

    List<HashMap<String,Object>> findUserByEmailAndPassword(HashMap<String,Object> map);

    List<HashMap<String,Object>> findUserList(HashMap<String,Object> map);

    int findUserCount(HashMap<String,Object> map);

    int addUser(HashMap<String, Object> map);

    List<HashMap<String, Object>> findUserById(Integer userId);

    int updatePassword(HashMap<String, Object> map);
}
