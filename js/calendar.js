/**
 * Created by Administrator on 2016/12/29.
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var now = Date.parse(new Date().format("yyyy-MM-dd").replace('-', '/'));
var alldate = [];

function loadtime(data) {
    alldate = data;
}


/**
 * 开始时间的最小时间
 *
 */
var startMinDate = function() {
        return alldate[0];
    }
    /**
     * 开始时间的最大时间，如果选了结束时间，开始时间不大于结束时间
     */
var startMaxDate = function() {
        var etime = $("#endTime")[0].value;
        if (etime == '' || etime == undefined) {
            etime = alldate[alldate.length - 1];
        }
        return etime;
    }
    /**
     * 结束时间的最小时间,如果选了开始时间，结束时间不小于开始时间
     */
var endMinDate = function() {
    var stime = $("#startTime")[0].value;
    if (stime == '' || stime == undefined) {
        stime = alldate[0];
    }
    return stime;
}

/**
 * 结束时间的最大时间
 */
var endMaxDate = function() {
        return alldate[alldate.length - 1];
    }
    /**
     *转换日期
     * @param datestr
     * @returns {Date}
     */
function getDate(datestr) {
    var temp = datestr.split("-");
    var date = new Date(temp[0], temp[1], temp[2]);
    return date;
}

/*************************
 * 计算两个日期时间段内所有日期
 *
 * @param value1
 *            开始日期 YYYY-MM-DD
 * @param value2
 *            结束日期
 * return 日期数组
 */
function dataScope(value1, value2) {
    var getDate = function(str) {
        var tempDate = new Date();
        var list = str.split("-");
        tempDate.setFullYear(list[0]);
        tempDate.setMonth(list[1] - 1);
        tempDate.setDate(list[2]);
        return tempDate;
    }
    var date1 = getDate(value1);
    var date2 = getDate(value2);
    if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }
    date1.setDate(date1.getDate() + 1);
    var dateArr = [];
    var i = 0;
    if (value1 == value2) {
        dateArr[0] = value1;
        return dateArr;
    }
    while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
            .getDate())) {
        var dayStr = date1.getDate().toString();
        if (dayStr.length == 1) {
            dayStr = "0" + dayStr;
        }
        dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + dayStr;
        i++;
        date1.setDate(date1.getDate() + 1);
    }
    return dateArr;
}
/**
 * 禁用日期
 */
var delDate = function() {
    var del = [];
    var all = [];
    all = dataScope(alldate[0], alldate[alldate.length - 1])
    for (var i = 0; i < all.length; i++) {
        if (alldate.indexOf(all[i]) == -1) {
            del.push(all[i])
        };
    }
    return del;
}