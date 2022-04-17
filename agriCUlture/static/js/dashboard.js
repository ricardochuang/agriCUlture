// before loading
window.onload = function(){
    //get Time
    setInterval(function(){
        var date = new Date();
        var year = date.getFullYear();
        var mon_no = date.getMonth();
        var day = date.getDate();
        var date_no = date.getDay();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        var date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (h >= 0 && h <= 9) {
            h = "0" + h;
        }
        if (m >= 0 && m <= 9) {
            m = "0" + m;
        }
        if (s >= 0 && s <= 9) {
            s = "0" + s;
        }
        var d = document.getElementById('showTime');
        var dateShow = month[mon_no]+'/' + day + '/' + year + ' ' + date[date_no] + ' ' + h + ':' + m+':' + s;
        d.innerHTML =  dateShow;
        }
    ,1000)
//set default date value as today
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    todayDoc = document.getElementById('date')
    todayDoc.value = today;
    todayDoc.setAttribute("max", today);
}

