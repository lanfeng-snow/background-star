var canvas = document.getElementById("canvas"); //获取canvas 画布
var ctx = canvas.getContext("2d"); //指定二维绘图
var balls = []; //存放小球的数组
var bigBall = []; //存放大球范围内的小球
var X, Y; //记录鼠标的位置

function ball() { //设置小球的参数
	this.ballX = Math.floor(Math.random() * canvas.width); //X坐标
	this.ballY = Math.floor(Math.random() * canvas.height); //Y坐标
	this.speedX = Math.floor(Math.random() * 2) == 0 ? -Math.floor(Math.random() * 2) + 0.5 : Math.floor(Math.random() * 2) + 0.5; //X移动速度
	this.speedY = Math.floor(Math.random() * 2) == 0 ? -Math.floor(Math.random() * 2) + 0.5 : Math.floor(Math.random() * 2) + 0.5; //Y移动速度
	this.radius = Math.floor(Math.random() * 1.5) + 1; //小球的半径
}

ball.prototype.draw = function() { //小球的绘制函数
	ctx.beginPath(); //beginPath() 方法在一个画布中开始子路径的一个新的集合。
	ctx.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2) //arc(x,y,r,sAngle起始角,eAngle结束角,counterclockwise顺逆时针可选); 
	ctx.closePath(); //closePath() 方法创建从当前点到开始点的路径。
	ctx.fillStyle = "rgb(102,27,155)"; //FillStyle 属性设置或返回用于填充绘画的颜色、渐变或模式。
	ctx.fill(); //fill() 方法填充当前的图像（路径）。默认颜色是黑色。
}

ball.prototype.speed = function() { //小球新的位置计算函数
    this.ballX += this.speedX; //X新坐标
    this.ballY += this.speedY; //Y新坐标
}

for (var i = 0; i < 1000; i++) { //初始化创建小球
    var Ball = new ball(); //添加小球
    balls.push(Ball); //存入数组
}

canvas.onmousemove = function(event) { //鼠标移动触发 记录鼠标位置
    var e = event || window.event;
    X = e.clientX;
    Y = e.clientY;
}

function goBack() { //碰撞检测
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].ballX < 0 || balls[i].ballX > canvas.width) { //当小球的位置在最左或者右 速度方向改变
            balls[i].speedX *= -1;
        }
        if (balls[i].ballY < 0 || balls[i].ballY > canvas.height) { //当小球的位置在最上或者下 速度方向改变
            balls[i].speedY *= -1;
        }
    }
}

function line() { //小球连线函数
    for (var j = 0; j < bigBall.length; j++) {
        for (var k = 0; k < bigBall.length; k++) {
            var disX = Math.abs(bigBall[j].ballX - bigBall[k].ballX); //小球之间的X距离
            var disY = Math.abs(bigBall[j].ballY - bigBall[k].ballY); //小球之间的Y距离
            if (Math.sqrt(disX * disX + disY * disY) < 100) { //  当小球距离小于100时
                ctx.beginPath();
                ctx.moveTo(bigBall[j].ballX, bigBall[j].ballY);
                ctx.lineTo(bigBall[k].ballX, bigBall[k].ballY);
                ctx.closePath();
                ctx.strokeStyle = "rgb(142,65,196)";
                ctx.stroke();
            }
        }
    }
}

var timer = setInterval(function() { //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    ctx.clearRect(0, 0, 1920, 1080); //clearRect() 方法清空给定矩形内的指定像素。
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw(); //绘制小球
        balls[i].speed(); //调用函数 产生新位置
        var subX = Math.abs(X - balls[i].ballX); //计算鼠标X到小球X的距离
        var subY = Math.abs(Y - balls[i].ballY); //计算鼠标Y到小球Y的距离
        if (Math.sqrt(subX * subX + subY * subY) < 200) { //如果小球和鼠标的距离小于200 
            bigBall.push(balls[i]); //  存放进数组
        }
    }
    goBack(); //碰撞检测 
    line(); //绘制连线
    bigBall = []; //清空大球数组
}, 50);
