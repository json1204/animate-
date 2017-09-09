// id获取元素
function $ (ele) {
  return document.getElementById(ele)
}
// 1获取当前的样式
function getCurrentStyle (ele, attr) {
  // 兼容处理
  if (window.getComputedStyle) {//ie
    return window.getComputedStyle(ele, null)[attr]
  }else {
    return ele.getCurrentStyle[attr]
  }
}
// 缓动动画函数
function animate (ele, obj, callback) {
  clearInterval(ele.timer);
  ele.timer = setInterval(function () {
    // 假设法
    var bool = true;
    // width:400,
    for (var attr in obj) {
      if (attr == 'opacity') {
        var target = obj[attr] * 1000
        var current = parseFloat(getCurrentStyle(ele, attr)) * 1000
        var step = (target - current) / 10;
        current += target > current ? Math.ceil(step) : Math.floor(step)
        ele.style[attr] = current / 1000
      }else if (attr == 'zIndex') {
        var target = obj[attr]
        current = target
        ele.style[attr] = current
      }else {
        var target = obj[attr]
        var current = parseInt(getCurrentStyle(ele, attr))
        var step = (target - current) / 10
        // target > current 说明是正方向 target <current 是反方向
        current += target > current ? Math.ceil(step) : Math.floor(step)
        ele.style[attr] = current + 'px';
      }
      // 必须给他判断全部的属性是否到达指定的位置
      if (Math.abs(target - current) != Math.abs(step)) {
        bool = false;
      }
    }
    if (bool) {
      clearInterval(ele.timer)
      // console.log(1)
      callback && callback()
    }
  }, 200)
}
// 匀速动画
function animateYS (ele, obj) { // /getCurrentStyle(ele,attr)获取当前值与ele.offsetLeft的区别；
  clearInterval(ele.timer)
  ele.timer = setInterval(function () {
    for (var attr in obj) {
      var target = obj[attr]
      var current = parseInt(getCurrentStyle(ele, attr))
      var step = 40
      current += target > current ? step : -step
      ele.style[attr] = current + 'px'
      if (Math.abs(target - current) <= Math.abs(step)) {
        clearInterval(ele.timer)
        ele.style[attr] = target + 'px'
      }
    }
  }, 20)
}
function animateSL (ele, target) { // /getCurrentStyle(ele,attr)获取当前值与ele.offsetLeft的区别；
  clearInterval(ele.timer)
  ele.timer = setInterval(function () {
    // for(var attr in obj){
    // var target=obj[attr]
    // var current=parseInt(getCurrentStyle(ele,attr))
    var current = ele.offsetLeft
    var step = 40
    current += target > current ? step : -step
    ele.style.left = current + 'px'
    if (Math.abs(target - current) <= Math.abs(step)) {
      clearInterval(ele.timer)
      ele.style.left = target + 'px'
    }
  // }
  }, 20);
}

function animate11 (element, target) {
  // 先清除上一次的定时器
  clearInterval(element.timer);
  // 重新开启
  element.timer = setInterval(function () {
    // 1 获取当前值
    var current = element.offsetLeft;
    // 2 修改当前值
    var step = 40;
    // 2.2 根据方向计算下一步应该到达的位置
    step = target >= current ? step : -step;
    // 2.3 运算出下一步的位置
    current += step;
    // 3 重新设定
    element.style.left = current + 'px';
    // 4 满足条件停下来  --  如果当前值和目标值的距离，小于等于 步长，就该停下来
    if (Math.abs(target - current) <= Math.abs(step)) {
      // 4.1 清除计时器
      clearInterval(element.timer);
      // 4.2 为了保证到达目标位置，强制设定元素为目标位置
      element.style.left = target + 'px';
    }
  }, 20);
}
