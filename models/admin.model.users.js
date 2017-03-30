/**
 * Created by chancy on 2017/3/11.
 */

/**
 * 通过ID查找用户
 * @param id 用户ID
 * @param callback 查询完成回调函数
 */
exports.getUserById = function (id,callback) {
    if (!id) {
        return callback();
    }
    var sql = 'SELECT * FROM users WHERE id=' + id;
    global.connect.query(sql,callback);
};

/**
 * 根据用户名查询
 * @param uname 用户名
 * @param callback 执行完成回调函数
 */
exports.getUserByLoginName = function (uname, callback) {
    var sql = 'SELECT * FROM users WHERE uname="'+uname+'"';
    global.connect.query(sql,callback);
};

/**
 * 添加用户
 * @param uname 用户名
 * @param passwd 密码
 * @param callback 执行结束回调
 */
exports.newAndSave = function (uname,passwd,email,nickName,callback) {
    var sql = 'INSERT INTO users(uname,passwd,email,nick_name) VALUES (?,?,?,?)';
    var sql_params = [uname, passwd,email,nickName];
    global.connect.query(sql,sql_params,callback);
};
