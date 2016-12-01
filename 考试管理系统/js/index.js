 $(function(){
	   //让所有的都隐藏
	  $(".baseUI>li>ul").slideUp();
	  //解绑所有的事件
	  $(".baseUI>li").off("click");
	  $(".baseUI>li").on("click",function(){
		   if($(this).children("ul").css("display")=="none"){
			  //让所有的都隐藏
			  $(".baseUI>li>ul").slideUp();
			  $(this).children("ul").stop().slideDown(500);  
			 }
		  }); 
	  //刚进入页面先让其中的一个显示
	  $(".baseUI>li>ul:eq(0)").slideDown(500);
	  $(".baseUI>li>ul").on("click","li",function(){
		  //设置点击时的li状态
		  $(".baseUI li").removeClass("current");
		  $(this).addClass("current");
		  var url=$(this).attr("url");
		  $(".right").load(url);
	  });
  })                  
	   $(document).ready(function(){
		   $(".baseUI>li>ul>li:eq(0)").trigger("click");
	   })