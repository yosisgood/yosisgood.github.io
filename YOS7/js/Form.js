/*创建窗口*/
$(document).ready(function(e) {
    CreateBar()
	siteTimeBar();
	setIcon();
	setIconClick();
});

//自动适应更改窗口
$(window).resize(function(){
   siteBarSize();
});
window.onresize=function(){siteBarSize();};

window.setInterval("siteTimeBar()",1000);

//设置拖拽效果
function Drag()
{
	$(".form").easydrag();
	$(".form").setHandler("title");
	$(".form").mousedown(function(){
	$(".form").css("z-index","100");
	$(this).css("z-index","1000");
	});
}

//创建任务栏
function CreateBar()
{
	$(".footBar").before("<div class=\"footBarbg\"></div>");
	$(".footBar").append("<div class=\"timebar\"></div>");
	siteBarSize();
}


//设置任务栏样式
function siteBarSize()
{
	var h = $(document).height();
	$(".footBar").css("top",h-42+"px");
	$(".footBarbg").css("top",h-41+"px");
}



//设置Cbar的hover样式
function setCbar()
{
	$(".footBar>.cbar").hover(function(){
		var num=$(".footBar>.cbar").index(this);
		$(".cbarbg").eq(num).addClass("cbarbg2");
		},
		function(){
		var num=$(".footBar>.cbar").index(this);
		$(".cbarbg").eq(num).removeClass("cbarbg2");
		}	
	);
}


//创建时间面板
function siteTimeBar()
{
	var d=new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	var h = d.getHours();
	var m = d.getMinutes(); 
	var s = d.getSeconds();
	var timestr=h+":"+m+":"+s+"<br>"+vYear+"/"+vMon+"/"+vDay;
	$(".timebar").html(timestr);
}

//创建图标样式
function setIcon()
{
	var count=$(".icons>ul>li").length;
	var h=0;
	for(var i=0;i<count;i++)
	{
		$(".icons>ul>li").eq(i).append("<div class=\"iconbg\"></div><div class=\"iconbor\"></div>");
		
		h = $(".icons>ul>li>a").eq(i).height();
		$(".icons>ul>li>.iconbg").eq(i).height(h);
		$(".icons>ul>li").eq(i).height(h)
		$(".icons>ul>li>.iconbor").eq(i).height(h-1);

	}
	
	
	$(".icons>ul>li").hover(
	function(){
		var num=$(".icons>ul>li").index(this);
		$(".icons>ul>li>.iconbg").eq(num).show();
		$(".icons>ul>li>.iconbor").eq(num).show();
		},
	function(){
		var num=$(".icons>ul>li").index(this);
		$(".icons>ul>li>.iconbg").eq(num).hide();
		$(".icons>ul>li>.iconbor").eq(num).hide();
		}
	)
}

//设置图标的点击事件
function setIconClick()
{
	$(".icons>ul>li>a").click(function(){
		var d=new Date();
		var randomID="id_"+d.getDate()+d.getHours()+d.getMinutes()+d.getMilliseconds()+Math.floor(Math.random()*100);
		var barID="bar"+randomID;
		var formID="form"+randomID;
		
		var num=$(".icons>ul>li>a").index(this);
		var imgurl=$(".icons>ul>li>a>img").eq(num).attr("src");
		var dataid=$(".icons>ul>li>a>img").eq(num).attr("data-id");
		var name=$(".icons>ul>li>a>span").eq(num).html();
		var linkurl=$(".icons>ul>li>a>span").eq(num).attr("data-link");
		$(".footBar").append("<div id=\""+barID+"\" data-id=\""+formID+"\" class=\"cbar\"><div class=\"cbarbg\"></div><div class=\"cbarbody\"><img src=\""+imgurl+"\"><span>"+name+"</span></div></div>");
		SiteBarClick()
		AddForm(formID,barID,name,imgurl,linkurl);
		setCbar();
		Drag();
	});
}


//打开一个窗体
function AddForm(formID,barID,name,imgurl,linkurl)
{
	$("body").append("<div class=\"form\" id=\""+formID+"\" data-id=\""+barID+"\"><div class='header'><div class='title'><img src='"+imgurl+"'><span>"+name+"</span></div><div class='btns'><a class='hide' href='javascript:void(0)'></a><a class='bigest' href='javascript:void(0)'></a><a class='close' href='javascript:void(0)'></a></div></div><iframe src='"+linkurl+"'></iframe></div>");
	SetFromSize();
	Close();
	hide();
	bigest();
}

//设置窗体大小
function SetFromSize()
{
	var num=$(".form").length;
	for(var i=0;i<num;i++)
	{
		$(".title").eq(i).width($(".header").eq(i).width()-115);
		$(".form>iframe").eq(i).width($(".form").eq(i).width()-10);
		$(".form>iframe").eq(i).height($(".form").eq(i).height()-36);
	}
}

function ResetForm(formid)
{
	$("#"+formid).css("top","50px");
	$("#"+formid).css("left","200px");
	$("#"+formid).css("width","650px");
	$("#"+formid).css("height","400px");
	$("#"+formid).css("z-index","1000");
}

//关闭窗体
function Close()
{
	$(".close").click(function(){
		var barid=$(this).parent().parent().parent(".form").attr("data-id");
		var formid=$(this).parent().parent().parent(".form").attr("id");
		$("#"+barid).remove();
		$("#"+formid).fadeOut(500,function(){$("#"+formid).remove();});
		

	});
}

//隐藏到任务栏
function hide()
{
	$(".hide").click(function(){
		var formid=$(this).parent().parent().parent(".form").attr("id");
		$("#"+formid).hide(500);
		$("#"+formid).css("z-index","100");
	});
}

//最大化或取消最大化
function bigest()
{
	$(".bigest").click(function(){
		var formid=$(this).parent().parent().parent(".form").attr("id");
		if($("#"+formid).width()!=$(document).width()-2)//-2 修正边框的2px
		{
			$("#"+formid).width($(document).width());
			$("#"+formid).height($(document).height()-42);
			$("#"+formid).css("left","0px");
			$("#"+formid).css("top","0px");
			SetFromSize();
		}
		else
		{
			ResetForm(formid);
			SetFromSize();
		}
	});
}

//显示窗口
function SiteBarClick()
{
	$(".cbar").eq($(".cbar").length-1).click(function(){
		var formid=$(this).attr("data-id");
		if($("#"+formid).css("z-index")=="1000")
		{
			$("#"+formid).hide(500,function(){$("#"+formid).css("z-index","100");});
		}
		else
		{
			$(".form").css("z-index","100");
			$("#"+formid).show(500,function(){$("#"+formid).css("z-index","1000");});

		}
	});
}