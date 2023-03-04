
var url = "http://localhost:8080/foo_admin_war_exploded/"
$(".loginbtn").click(function(){
	if($("#userName").val()!=""&&$("#userPwd").val()!=""){
		$.ajax({
		    url:url+"/wechat/api/pcUser/login",
			data:{
				"pcUserEmail":$("#userName").val(),
				"pcUserPwd":$("#userPwd").val()
			},
			type: "POST",
			dataType: "json",
		    success: function(res){
			  if(res.code==0){
				 $.session.set('pcUserEmail',res.data.pcUserEmail);
				 $.session.set('pcUserTocken',res.data.pcUserTocken);
				 $.session.set('pcUserNum',res.data.pcUserNum);
				 $(".md-close").click();
				 $(".userState_0").css("display","none");
				 $(".userState_1").css("display","block");
				 $("#userInfo").text(res.data.pcUserEmail+"（"+res.data.pcUserNum+"次）")
			  }else{
				  Dreamer.error(res.msg, 1000,true);
			  }
		    }
		})
	}else{
		Dreamer.error("请补全数据", 1000,true);
	}
})
$(".registerbtn").click(function(){
	if($("#pwdrev").val()!=""&&$("#pwd").val()!=""&&$("#email").val()!=""){
		if($("#pwdrev").val()==$("#pwd").val()){
			$.ajax({
			    url:url+"/wechat/api/pcUser/add",
				data:{
					"pcUserEmail":$("#email").val(),
					"pcUserPwd":$("#pwd").val()
				},
				type: "POST",
				dataType: "json",
			    success: function(res){
			      debugger
				  if(res.code==0){
					 $.session.set('pcUserEmail',res.data.pcUserEmail);
					 $.session.set('pcUserTocken',res.data.pcUserTocken);
					 $.session.set('pcUserNum',res.data.pcUserNum);
					 $(".md-close").click();
					 $(".userState_0").css("display","none");
					 $(".userState_1").css("display","block");
					 $("#userInfo").text(res.data.pcUserEmail+"（"+res.data.pcUserNum+"次）")
				  }else{
					  Dreamer.error(res.msg, 1000,true);
				  }
			    }
			})
		}else{
			Dreamer.error("两次输入的密码不一致！", 1000,true);
		}
	}else{
		Dreamer.error("请补全数据！", 1000,true);
	}
})

$("#getVideo").click(function(){
	if($.session.get('pcUserTocken')==undefined){
		$("#login").click()
	}else{
		if($("#urlpath").val()!=""){
			var closeMsg = Dreamer.loading("加载中，请稍后");
			$.ajax({
			    url:url+"/wechat/api/DeWatermarkApi",
				data:{
					"paramUrl":$("#urlpath").val(),
					"tocken":$.session.get('pcUserTocken')
				},
				type: "get",
				dataType: "json",
			    success: function(res){
				  closeMsg();
			      debugger
				  if(res.status!=101){
					  Dreamer.error(res.msg, 2000,true);
				  }else{
					  $.session.set('pcUserNum',$.session.get("pcUserNum")-1);
					  $("#userInfo").text($.session.get("pcUserEmail")+"（"+$.session.get("pcUserNum")+"次）")
					  
					  if(res.data.down!=undefined){
						$("#video").attr("src",res.data.down)
						$("#urldown").attr("href",res.data.down)
						$("#mscdown").val(res.data.down)
						$("#downVideoDiv").click()
					  }else{
						for(var i=0;i<res.data.images.length;i++){
							html="<img width='300px' src='"+res.data.images[i]+"' />"
							$(".jq22-container").append(html)
						}
						 $("#downImageDiv").click()
					  }
				  }
			    }
			})
		}else{
			 Dreamer.error("请填入视频地址", 1000,true);
		}
	}
})