$(function(){
//	js轮播图
	var index = 0;				
	function change() {
		index ++;
		if(index >5){
			index = 0;
		}
		//fadeTo() 方法将被选元素的不透明度逐渐地改变为指定的值(（褪色效果)。
		$(".banner .imgList li a img").fadeTo(0, 0.5).hide();
		$(".banner .imgList li a").eq(index).find('img').show().fadeTo(400, 1);
		$(".banner .indexList li").eq(index).addClass('cur').siblings('li').removeClass('cur');											
	}
	
	var timer = setInterval(change, 2000);
	$(".banner .imgList").hover(function(){		//鼠标移入悬停效果
		clearInterval(timer);
	},function(){
		timer = setInterval(change, 2000);
	});
	
	$(".banner .indexList li").mouseover(function() {
		index = $(this).index();
		$(this).addClass('cur').siblings('li').removeClass('cur');
		$(".banner  .imgList li a img").fadeTo(0, 0.5).hide();
		$(".banner  .imgList li a").eq(index).find('img').show().fadeTo(400, 1);
	});	
	
});
			