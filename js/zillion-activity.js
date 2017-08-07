$(function () {
    // 跳转中奖纪录
        $('#win-record').on('click', function() {
            var anchor = $(this).attr('data-anchor');
            $('body,html').stop().animate({
                scrollTop: $(anchor).offset().top-50
            }, 400);
            return false;
        })
        // 选择VIP
        $("#zillion-winPrice-wd .zill-sel-vip a").click(function(){
            $(this).addClass("on").siblings().removeClass("on");
        })
// 格子位置
var step_num = 0;
//骰子数字
var dice_num = 0;
    $("#closeBtn,#noPrice-btn").on("click", function () {
        $(this).parent().parent().parent().fadeOut(50);
    })
    // 获奖信息调用
    scrollLeft();
    // 第一次点击掷筛骰子
    $("#throwDice").click(function(){
        var diceIcon = $("#diceIcon");
        var chars = parseInt((6*Math.random())+1);//取1-6的随机数
        dice_num = chars;
        step_num += dice_num;
        console.log(dice_num);
        console.log(step_num);
        $(this).fadeOut().siblings("#diceIcon").fadeIn(500);
        // 骰子动画
        diceroll(diceIcon,dice_num);
        // 点击投骰子
        setTimeout(diceShow,3000);
        // kubaoMove("#userKu-icon",6);
        // 调用库宝移动动画
        setTimeout(_kubaoMove(step_num),3500);
        if(step_num >21){
            step_num = parseInt(0);
        }
        else if(step_num == 4){
            step_num = 7;
        }else if(step_num == 14){
            step_num = 15;
        }
    })
    findDimensions();
    window.onresize = findDimensions;
})
/*成交动态栏*/
        function scrollLeft() {
            var speed = 20;
            var scroll_begin = document.getElementById("scroll-start");
            var scroll_end = document.getElementById("scroll-end");
            var scroll_box = document.getElementById("scroll-box"); 
            scroll_end.innerHTML = scroll_begin.innerHTML;
            function Marquee() {
               if(scroll_box.scrollLeft >=1800){
                   scroll_box.scrollLeft = 0;
               }
                if (scroll_end.offsetWidth <= scroll_box.scrollLeft) {
                    scroll_box.scrollLeft -= scroll_begin.offsetWidth;
                }
                else
                    scroll_box.scrollLeft++;
            }
            setInterval(Marquee, speed);
        }
        scrollLeft();
// 点击投骰子按钮消失后显示
function diceShow(){
    $("#throwDice").fadeIn();
    $("#diceIcon").fadeOut();
}
//创建函数，用于返回一个无参数函数
function _kubaoMove(step){
       return function(){
             kubaoMove(step);
       }
}
// 骰子动画
function diceroll(dice,num){
	dice.attr("class","dice-icon");//清除上次动画后的点数
	// dice.css('cursor','default');
	dice.animate({marginLeft: '+2px'}, 100,function(){
		dice.addClass("dice_aimt");
	}).delay(200).animate({marginTop:'-50px',marginLeft:'-70px'},200,function(){
        dice.removeClass("dice_aimt").addClass("dice_aims");
    }).animate({marginTop:'-10px',marginLeft:'-30px'},200,function(){
        dice.removeClass("dice_aimt").addClass("dice_aims");
    }).animate({marginTop:'-70px',marginLeft:'-50px'},200,function(){
        dice.removeClass("dice_aimt").addClass("dice_aims");
    }).animate({marginTop:'-30px',marginLeft:'-120px'},200,function(){
		dice.removeClass("dice_aimt").addClass("dice_aims");
	}).delay(200).animate({opacity: 'show',},600,function(){
		dice.removeClass("dice_aims").addClass("dice_aime");
	}).delay(100).animate({marginLeft:'-45px',marginTop:'0px'},100,function(){
		dice.removeClass("dice_aime").addClass("dice_aim"+num);
	});
}
    var winWidth = 0;
	var winHeight = 0;

	function findDimensions() //函数：获取尺寸
	{
    //获取窗口宽度
	if(window.innerWidth)
		winWidth = window.innerWidth;
	else if((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	//获取窗口高度
	if(window.innerHeight)
		winHeight = window.innerHeight;
	else if((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
	//通过深入Document内部对body进行检测，获取窗口大小
	if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
		winHeight = parseInt(document.documentElement.clientHeight);
		winWidth = parseInt(document.documentElement.clientWidth);
	}
}
//调用函数，获取数值
function kubaoMove(step) {
    var grid_li = $(".go-grid-game li");
    var grid_num = $(".go-grid-game li").eq(step-1);
    var spareX = ((winWidth - 1200)/2) - 5;
        if(winWidth<1200){
            $("#kuBao-icon").animate({
            top: grid_num.offset().top - 100,
            left: grid_num.offset().left -5  
            }, 800)
            if(step>21){
                initiaStep();
            }else if(step == 4){
                // 前进
                if(winWidth<1200){
                    $("#kuBao-icon").animate({
                        top: grid_li.eq(6).offset().top - 100,
                        left: grid_li.eq(6).offset().left - 5
                    }, 800)
                }else{
                    $("#kuBao-icon").animate({
                        top: grid_li.eq(6).offset().top - 100,
                        left: grid_li.eq(6).offset().left - spareX
                    }, 800)
                }
                $("#zillion-noPrice").delay(1200).fadeIn(50);
                step = 7;
            }else if(step == 14){
                if(winWidth<1200){
                    $("#kuBao-icon").animate({
                    top: grid_li.eq(14).offset().top - 100,
                    left: grid_li.eq(14).offset().left - 5
                }, 800)
                }else{
                    $("#kuBao-icon").animate({
                        top: grid_li.eq(14).offset().top - 100,
                        left: grid_li.eq(14).offset().left - spareX
                    }, 800)
                }
                $("#zillion-noPrice").delay(1200).fadeIn(50);
                step = 15;
            }
    }else{
            $("#kuBao-icon").animate({
                top: grid_num.offset().top - 100,
                left: grid_num.offset().left - spareX
            }, 800)
            if(step>21){
                initiaStep();
            }else if(step == 4){
                 step = 7;

                // 前进
                if(winWidth<1200){
                    $("#kuBao-icon").animate({
                        top: grid_li.eq(6).offset().top - 100,
                        left: grid_li.eq(6).offset().left - 5
                    }, 800)
                }else{
                    $("#kuBao-icon").animate({
                        top: grid_li.eq(6).offset().top - 100,
                        left: grid_li.eq(6).offset().left - spareX
                    }, 800)
                }
                $("#zillion-noPrice").delay(1200).fadeIn(50);
            }else if(step == 14){
                if(winWidth<1200){
                    $("#kuBao-icon").animate({
                    top: grid_li.eq(14).offset().top - 100,
                    left: grid_li.eq(14).offset().left - 5
                }, 800)
                }else{
                    $("#kuBao-icon").animate({
                        top: grid_li.eq(14).offset().top - 100,
                        left: grid_li.eq(14).offset().left - spareX
                    }, 800)
                }
                $("#zillion-noPrice").delay(1200).fadeIn(50);
                step = 15;
            }
    }
        console.log(step);
    $("#startPoint").animate({
        left:110
    },1000)
    // switch循环判断走到哪一个格子
    switch(step)
        {
            default:
                initiaStep();
                step = 0;
            break;
            // 没有奖品的格子
            case 1:case 3:case 5:case 7:case 9:case 11:case 13:case 15:case 17:case 19:
                $("#zillion-noPrice").delay(1200).fadeIn(50);
            break;
            // vip格子
            case 2:
                $("#zillion-winPrice-wd").delay(1200).fadeIn(50);
                $("#vipPrice-info").text("VIP 3天")
            break;
            // 再骰一次
            case 8:
                $("#zillion-diceAgain").delay(1200).fadeIn(50);
            break;
            case 10:
                $("#zillion-winThing-wd").delay(1200).fadeIn(50);
                $("#winThing-info").text("kindle一台");
            break;
            case 16:
                $("#zillion-winPrice-wd").delay(1200).fadeIn(50);
                $("#vipPrice-info").text("VIP 1年")
            break;
            case 18:
                $("#zillion-winPrice-wd").delay(1200).fadeIn(50);
                $("#vipPrice-info").text("VIP 1个月")
            break;
            // 库币的格子
             case 6:
             case 12:
                $("#zillion-Coin-wd").delay(1200).fadeIn(50);
            break;
            // case 4:
            //     // 前进
            //      if(winWidth<1200){
            //         $("#kuBao-icon").animate({
            //             top: grid_li.eq(6).offset().top - 100,
            //             left: grid_li.eq(6).offset().left - 5
            //         }, 800)
            //     }else{
            //         $("#kuBao-icon").animate({
            //             top: grid_li.eq(6).offset().top - 100,
            //             left: grid_li.eq(6).offset().left - spareX
            //         }, 800)
            //     }
            //     $("#zillion-noPrice").delay(1200).fadeIn(50);
            // break;
            // kindle
            case 14:
                // // 前进一格
                // if(winWidth<1200){
                //     $("#kuBao-icon").animate({
                //     top: grid_li.eq(14).offset().top - 100,
                //     left: grid_li.eq(14).offset().left - 5
                // }, 800)
                // }else{
                //     $("#kuBao-icon").animate({
                //         top: grid_li.eq(14).offset().top - 100,
                //         left: grid_li.eq(14).offset().left - spareX
                //     }, 800)
                // }
                // $("#zillion-noPrice").delay(1200).fadeIn(50);
            break;
            // 帆布袋
            case 20:
                $("#zillion-winSack-wd").delay(1200).fadeIn(50);
            break;
            // 实物的格子
            case 21:
                $("#winThing-info").text("iPad Pro");
                $("#zillion-winThing-wd").delay(1200).fadeIn(50);
            break;
        }
}
    // 恢复初始
    function initiaStep(){
        $("#startPoint").animate({
        left:165
        },500)
        $("#kuBao-icon").animate({
            top: 337,
            left: 63 
        }, 800)
        step_num = 0
    }
// 判断格子位置