/**
 * Created by chancy on 2017/4/26.
 * 请假Model
 */
exports.addFurloughData = function ($params, callback) {
    var sql = 'INSERT INTO furloughs(uid,uname,type,start_time,end_time,days,reason,create_time) VALUES(?,?,?,?,?,?,?,?)';
    var sql_params = [$params.uid,$params.uname,$params.type,$params.start_time,$params.end_time,$params.days,$params.reason,$params.create_time];
    global.connect.query(sql,sql_params,callback);
};

exports.getFurloughAllData = function (condition,callback) {
    var sql = `SELECT * FROM furloughs WHERE uid ${condition} order by create_time desc`;
    global.connect.query(sql,callback);
};

exports.getUserByUserId = function (uid,callback) {
    var sql = 'SELECT reality_name,avatar FROM users WHERE id='+uid+'';
    global.connect.query(sql,callback);
};

exports.auditFurloughData = function ($params,callback) {
    var sql = 'UPDATE furloughs SET active = "'+$params.active+'" WHERE id="'+$params.fid+'"';
    global.connect.query(sql,callback);
};

exports.queryCheckPendingData = function (callback) {
    var sql = 'SELECT * FROM furloughs WHERE active = 0';
    global.connect.query(sql,callback);
};
/**
 * 发票分页查询
 */
exports.queryInvoiceByPageNumber = function(condition,pageNum,callback){
    //0 5 10   1-1*5, 2-1*5, 3-1*5
    var sql = `SELECT * FROM furloughs where uid ${condition}  ORDER BY id DESC limit ${(pageNum-1)*5} ,5`;
    global.connect.query(sql,callback);
};