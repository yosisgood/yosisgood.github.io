function time() {
    var timer = new Date();
    var hour = timer.getHours();
    var min = timer.getMinutes();
    if (hour < 10) {
        hour = "0" + hour + ":";
    } else {
        hour = hour + ":";
    }
    if (min < 10) {
        min = "0" + min + "";
    } else {
        min = min + "";
    }
    document.querySelector(".time").innerHTML = hour + '' + min;
    setTimeout(time, 1000);
}
function helloFloat() {
    // 获得元素
    var hello = document.getElementById('hello')
    var image = document.getElementById('image')
    // 获得时间对象
    var gettime = new Date();
    var hours = gettime.getHours();
    var str1 = "Good morning! 尊敬的用户！"
    var str2 = "Good afternoon! 尊敬的用户！"
    var str3 = "Good night! 尊敬的用户！"
    // 判断
    if (hours > 6 && hours <= 11) {
        hello.innerHTML = str1;
        image.src = "images/day.png"
        switchBtn.className = 'fa fa-sun-o'
    } else if (hours > 11 && hours <= 20) {
        hello.innerHTML = str2
        if (hours >= 17) {
            image.src = "images/afternoon.png"
        } else {
            image.src = "images/day.png"
        }
        switchBtn.className = 'fa fa-sun-o'
    } else {
        hello.innerHTML = str3
        image.src = "images/night.png"
        switchBtn.className = 'fa fa-moon-o'
        switchBtn.style.color = 'rgba(32,33,36,.25)'
    }
}
// 输入框
let search = document.getElementById('search')
let bg = document.getElementById('bg')
let value = document.getElementById('search').value
let poem = document.getElementById('poem')
// value = "Search"
search.onfocus = function () {
    if (search.value == 'Search') {
        search.value = ''
        // 背景高斯模糊
        bg.style.WebkitFilter = "blur(6px)";
        // 背景放大
        bg.style.transform = "scale(1.05)";
        // 修改诗歌的类名
        poem.className = 'poem'
    }
}
search.onblur = function () {
    if (search.value == '') {
        search.value = 'Search'
        bg.style.WebkitFilter = "blur(0px)";
        bg.style.transform = "scale(1)";
        poem.className = 'hide'
    }
}
//输入框 结束
// 页面开关灯
var switchBtn = document.getElementById('switchBtn');
var timer = new Date();
var hours = timer.getHours();
var flag = true;//默认是 true白天点击黑夜
if (hours > 6 && hours <= 20) {
    flag = false;
}
switchBtn.onclick = function () {
    flag = !flag;
    if (flag) {
        image.src = "images/night.png"
        switchBtn.className = 'fa fa-moon-o'
        switchBtn.style.color = 'rgba(32,33,36,.25)'
    } else {
        if (hours > 6 && hours <= 11) {
            image.src = "背景图.png"
        } else {
            if (hours >= 17) {
                image.src = "背景图.png"
            } else {
                image.src = "背景图.png"
            }
        }
        switchBtn.className = 'fa fa-sun-o'
        switchBtn.style.color = 'rgba(255,207,72,.75)'
    }
}
// 页面开关灯 结束
