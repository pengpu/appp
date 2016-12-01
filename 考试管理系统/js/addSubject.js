 $(function(){
   $.getJSON("json/titleHard.json",function(data){
	data.forEach(function(item,index){
		     if(index>0){
			   var option=$("<option id="+item.id+">"+item.realName+"</option>");	 
			   $("select[name='level']").append(option);
			} 	
	    }); 
   });
  $.getJSON("json/direcation.json",function(data){
	data.forEach(function(item,index){
		    if(index>0){
			    var option=$("<option id="+item.id+">"+item.name+"</option>"); 
			    $("select[name='department']").append(option);
			    option.on("click",function(){			    			
			    $.getJSON("json/knowledge.json",function(data){
				   $("select[name='topics']").children().remove();
                   data.forEach(function(item1){					    var option1=$("<option id="+item1.id+">"+item1.title+"</option>");
					  if(item.id==item1.department.id){	 			
                         $("select[name='topics']").append(option1);
					   }
					 })					 
			      });				 
		       });			 
			}
	  }); 
       //模拟点击事件,要放在forEach外面，防止加载的时候出错	
		$("select:eq(1) option:eq(0)").trigger("click");	 
 });
	 //radio		 
	 $("option[value='radio']").click(function(){
         $(".Problem_chapterAnswer").hide();
		 $(".Answeroptions").show();		 
 		 $(".Answeroptions input[name='answer']").attr("type","radio");
	}); 
	//checkbox
	$("option[value='checkbox']").click(function(){
		 $(".Problem_chapterAnswer").hide();
		 $(".Answeroptions").show();		
	     $(".Answeroptions input[name='answer']").attr("type","checkbox");
	 })
	 //chapter
	 $("option[value='chapter']").click(function(){
		 $(".Problem_chapterAnswer").show();
		 $(".Answeroptions").hide();
		var style={
		   width:"95%",
		   height:"250px",
		   border:"1px solid rgb(171,173,179)"	
		}
		
		$(".Problemcontent [name='answer']").css(style);
	})  
	//返回allSubject.html
	$(".deletetitle").click(function(){
      $(".right").load("loadhtml/allSubject.html"); 
	 });
	 //点击提交
	 $("#btn1").on("click",function(){
		   var type=$(".Attributecontent_left option:selected").attr("id");		  
		   var department=$(".Attributecontent_left select[name='department'] option:selected").attr("id");
		   var level=$(".Attributecontent_left select[name='level'] option:selected").attr("id");
		   var topics=$(".Attributecontent_left select[name='topics'] option:selected").attr("id");
		   var stem=$(".Problem textarea[name='stem']").val();
		   var choiceContents=[];
		   $("textarea[name='content']").each(function(i,item){
			    choiceContents[i]=$(item).val();   
		   });
		   var choiceCorrects=[];
		   $("input[name='answer']").each(function(i,item){
			    choiceCorrects[i]= $(item).prop("checked");//prop选中被选中的一项
		   })
		   var answer=$(".Problem_chapterAnswer textarea[name='answer']").val();
		   var analysis=$(".Problem textarea[name='analysis']").val();
		   $.ajax({
		   	/*url=http://172.16.0.5:7777/test/exam/manager/saveSubject.action*/
		       url:"js/shenhe.js",
			   method:"get",
			   traditional:true, 
			   data:{
			       "subject.department.id":department,
				"subject.topic.id":topics,
				"subject.subjectType.id":type,
				"subject.subjectLevel.id":level,
				"subject.stem":stem,
				"subject.analysis":analysis,
				"choiceContent":choiceContents,
				"choiceCorrect":choiceCorrects
			   },			  
			   success:function(data){
			       alert("保存成功！");
			   } ,
			   error:function(data){
				 console.log(data);   
			   }
	        }) 
	    }); 
	$("#btn2").off("click");
	$("#btn2").on("click",function(){ 
		  $(".right").load("loadhtml/allSubject1.html");
	});
})