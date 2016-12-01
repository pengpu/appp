 $(function(){     
     $.getJSON("json/title.json",function(data){
	     var cloTr=$(".divtable tr:hidden").clone();
	     cloTr.removeAttr("hidden");
	     cloTr.find(".chose").html("");
	     cloTr.children("td").eq(0).html("类型").css("width","80px");
	     data.forEach(function(item,index){
		    var a="";
		    if(index==0){
		      a=$("<a href='#' class='active3' id="+item.id+">"+item.realName+"</a>");	
		    }else{
		      a=$("<a href='#' id="+item.id+">"+item.realName+"</a>");	
		    }
		   cloTr.find(".chose").append(a);
	     });
	   $("table").append(cloTr);
	  });
	  
	$.getJSON("json/titleHard.json",function(data){
	 var cloTr=$(".divtable tr:hidden").clone();
	 cloTr.removeAttr("hidden");
	 cloTr.find(".chose").html("");
	 cloTr.children("td").eq(0).html("难易");
	 data.forEach(function(item,index){
		var a="";
		if(index==0){
		  a=$("<a href='#' class='active3' id="+item.id+">"+item.realName+"</a>");	
		}else{
		  a=$("<a href='#' id="+item.id+">"+item.realName+"</a>");	
		}
		cloTr.find(".chose").append(a);
	 });
	 $("table").append(cloTr);;
 });
	 
	$.getJSON("json/direcation.json",function(data){
		 var cloTr=$(".divtable tr:hidden").clone();
	     cloTr.removeAttr("hidden");
	     cloTr.find(".chose").html("");
	     cloTr.children("td").eq(0).html("方向");
	     data.forEach(function(item,index){
		 var a="";
		 if(index==0){
		  a=$("<a href='#' class='active3' id="+item.id+">"+item.name+"</a>");	
		 }else{
		  a=$("<a href='#' id="+item.id+">"+item.name+"</a>");	
		 }
		 cloTr.find(".chose").append(a);
	   });
	  $("table").append(cloTr);
	});  
	
	$.getJSON("json/knowledge.json",function(data){
		 var cloTr=$(".divtable tr:hidden").clone();
	     cloTr.removeAttr("hidden");
	     cloTr.find(".chose").html("");
	     cloTr.children("td").eq(0).html("知识点");
	     var a="";
	     a=$("<a href='#' class='active3' id='0'>全部</a>");
	     cloTr.find(".chose").append(a); 
	     data.forEach(function(item,index){
		 a=$("<a href='#' id="+item.id+">"+item.title+"</a>");
		cloTr.find(".chose").append(a);
	  })
	  $("table").append(cloTr);
	});
	//解绑所有的chose a的事件
     $(".chose").off("click");    
	//为每一个a添加点击事件，(加active3类)
    $(".tablea").on("click","a",function(){
		$(this).addClass("active3");
		$(this).siblings().removeClass("active3");
	//直接用这个绑了事件的a给后台发送4个id数据
	
     //拿到点击a标签的值
	var arr=$(".tablea").find("a").map(function(index,item){
       if($(item).filter(":visible").hasClass("active3")){
             return item;
       }
	}).get();
     //data里面的参数获取
	  var department="";
	  var topic="";
	  var subjectType="";
      var subjectLevel="";  
    //给需要往后台传递的参数拿值
     arr.forEach(function(item,index){
         switch(index){
           case 0:
             subjectType=$(item).attr("id");
             break;
           case 1:
             subjectLevel=$(item).attr("id");
             break;
           case 2:
             department=$(item).attr("id");
             break;
           case 3:
             topic=$(item).attr("id");
         }
     })
     var url="json/test.json";
     //有题干和无题干的处理
     var stem=$(".c_condition").find("input").val();
     if(stem==""){
	    $.ajax(url,{
             data:{
                  "subject.department.id":department,
	    	      "subject.topic.id":topic,
				  "subject.subjectType.id":subjectType,
				  "subject.subjectLevel.id":subjectLevel
             },
             success:function(data){
              showNum(data);
             },
             error:function(data){
             	console.log(data);
             }
	      });
     }else{
       $.ajax(url,{
           data:{
             	"subject.department.id":department,
	         	"subject.topic.id":topic,
		        "subject.subjectType.id":subjectType,
	    	    "subject.subjectLevel.id":subjectLevel,
	    	    "subject.stem":stem
           },
           success:function(data){
           	 showNum(data);
           }
         })
       }
	});
	 
    //因为点击搜索按钮和点击a标签效果一样，只是参数有了题干的内容而已，所以给搜索annual模拟一个点击a标签的事件
      $(".pl15").on("click",function(){
      	 $(".tablea").find("a").eq(0).trigger("click");
      })
	//点击显示答案和解析 
   $(".Catalogtitle").find("input:checkbox").on("click",function(){
          console.log(this);
          if($(this).prop("checked")){
			  $(".change").show();  
		  }else{
			  $(".change").hide();  
		  }
   })

   //跳转到别的页面
	$(".icon_add .icon_r").on("click",function(){		
		$(".right").load("loadhtml/addSubject.html");
	});  
});
    
    function showNum(data){
      /* data=JSON.parse(data);*/
       //设置总计的题数目
		console.log($(".Catalog_rightnei").siblings('.Catalog_rightnei').not('.Catalog_rightnei:hidden').remove());
	//	while(i<$('.Catalog_right').children())

       $(".Catalogtitle").find("em").html(data.length);
       //遍历得到
       data.forEach(function(item,index){
        var div=$(".Catalog_rightnei:hidden").clone();
        div.removeAttr("hidden");
        $(".Catalog_right").append(div);
          div.find(".Catalogtitwo").html("题号:"+item['id']+"&nbsp;&nbsp;题型:"+item['subjectType']['realName']+"&nbsp;&nbsp;难度:"+item['subjectLevel']['realName']+"&nbsp;&nbsp;上传人:"+item['user']+"&nbsp;&nbsp;来源:"+item['examPaper']+"&nbsp;&nbsp;上传时间:"+item['uploadTime']+"&nbsp;&nbsp;组卷次数：<em>"+item['id']+"</em>");
          var stem=$("<br><p>"+item['stem']+"</p><br>");
          div.find(".Catalogcontentup").html(stem);
          var id=item['subjectType']['id'];
          //根据题型的不同分开处理
          switch(id){
            case 1:
              var div2=$("<div class='change' style='display:none'></div>");
              item["choices"].forEach(function(item1,index){
              var div1=$("<div></div>");
              var input=$("<input type=radio name="+item['id']+">");
              var span=$("<span>"+item1['content']+"</span>");
              div1.append(input);
              div1.append(span);
              div.find(".Catalogcontentup").append(div1);
              div.find(".Catalogcontentup").append(div2);
              //获取正确答案
               if(item1['correct']){
                 var span=$("<br><strong>正确答案：</strong><span style='color:red; font-size:15px'>"+item['content']+"</span>");
                 div2.append(span);
               }
              })
              //获取解析
              var anl=$("<br><strong>题目解析：</strong><span style='color:red; font-size:15px'>"+item['analysis']+"</span>");
              div2.append(anl);
              //为每个a添加id，为了审查通过 审查不通过 删除做基础
              div.find("a").each(function(index,item2){
              	 $(item2).attr("id",item['id']);
              })
              break;
            case 2:
               var div2=$("<div class='change' style='display:none'></div>");
               var strong=$("<br><strong>正确答案：</strong>");
               div2.append(strong);
               item['choices'].forEach(function(item1,index){
               	  var div1=$("<div></div>");
                  var input=$("<input type='checkbox' name="+item['id']+">");
                  var span=$("<span>"+item1['content']+"</span>");
                  div1.append(input);
                  div1.append(span);
                  div.find(".Catalogcontentup").append(div1);
                  //取正确答案
                  if(item1['correct']){
                     var span=$("<span style='color:red; font-size:15px'>"+item1['content']+"&nbsp;&nbsp;"+"</span>");
                     div2.append(span);
                  }
               })
               //获取解析
                var span=$("<br><strong>题目解析：</strong><span style='color:red; font-size:15px'>"+item['analysis']+"&nbsp;&nbsp;"+"</span>");
                div2.append(span);
                div.find(".Catalogcontentup").append(div2);

                //为每个a添加id，为了审查通过 审查不通过 删除做基础
                div.find("a").each(function(index,item2){
                	$(item2).attr("id",item['id']);
                })
              break;
            case 3:
			  var strong=$("<strong>答案:</strong>");
              var textarea=$("<textarea></textarea>");
			   div.find(".Catalogcontentup").append(strong)
              div.find(".Catalogcontentup").append(textarea);
              var div2=$("<div class='change' style='display:none'></div>");
              var p=$("<br><strong>题目解析：</strong><p style='color:red; font-size:15px'>"+item['analysis']+"</p>");
              div2.append(p);
              div.find(".Catalogcontentup").append(div2); 

              //为每个a添加id，为了审查通过 审查不通过 删除做基础
              div.find("a").each(function(index,item2){
              	$(item2).attr("id",item['id']);
              })
              break;
          };
         //审查通过  审查不通过  删除题目  加入试卷
		    div.on("click","a",function(){
	           switch($(this).html()){
		            case  "审核通过":
				       $.ajax("js/shenhe.js",{
						      data:{
							    "subject.id":$(this).attr("id"),
		  						"subject.checkState":"通过"	   
						      },
							  success:function(data){
								 alert("审核通过！");  
							  }		
					    })
				       break;
			     case  "审核不通过":
           /*url=http://172.16.0.5:7777/test/exam/manager/checkSubject.action*/
				      $.ajax("js/shenhe.js",{
							 data:{
							    "subject.id":$(this).attr("id"),
		  						"subject.checkState":"通过"	   
						      },
							  success:function(data){
								 alert("审核不通过！");  
							  }	 
						  })
				       break;
				 case  "删除题目":
         /*url=http://172.16.0.5:7777/test/exam/manager/delSubject.action*/
				       $.ajax("js/shenhe.js",{
						     data:{ "subject.id":$(this).attr("id")
						      },
							 success:function(data){
							   alert("删除成功！")
							$(".right").load("loadhtml/allSubject1.html");
							 }
					  })
				       break;	 		 
	        }
        }) 
      })
	//	console.log($(".Catalog_rightnei").siblings('.Catalog_rightnei'));

	}