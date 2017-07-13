//左侧侧边栏内容
var leflist=document.getElementById('leflist')
//右侧内容外侧盒子，in cont box
var inconbox=document.getElementsByClassName('inconbox')[0];
var inps=inconbox.getElementsByClassName('inps');
//右侧内容生成结构盒子 
var ic_box=document.getElementsByClassName('ic_box')[0]
//右侧内容中文件夹名称
var wen=ic_box.getElementsByClassName('wen')
//右侧内容上面包屑导航
var navul=document.getElementsByClassName('navul')[0]
//全选框
var allcheck=document.getElementsByClassName('kuan')[0];
//右上导航栏，面包屑导航
var navul=document.getElementsByClassName('navul')[0];
//总内容导航栏，下载....新建文件夹
var scHu1=document.getElementsByClassName('scHu1')[0];
//console.log(scHu1)
//新建按钮
var xijbtn=scHu1.getElementsByTagName('li')[5];
//删除按钮
var deleall=scHu1.getElementsByTagName('li')[4];
//重命名按钮
var cmmbtn=scHu1.getElementsByTagName('li')[3];
//提示输入框
var tool1=document.getElementsByClassName('tool1')[0];
var youj=document.getElementsByClassName('youj')[0];
var wenyouj=document.getElementsByClassName('youj')[1];
//统计文件中check框，判断全选用
var n=0;
//右侧内容：
//渲染左侧结构的函数,LF=left
LFlist(data)
//渲染右侧内容结构的函数
RTcont(data)
window.onhashchange=function(){
	//获取hash值找到父级
	var Data=getdata1(data)
	//通过hash值找到子级渲染到页面中
	//console.log(Data)
	setic_box(Data)
	//生成导航栏
	var arr=getdata2(data)
	navUl(arr)
	//设置双击点击事件，改变hash值
	bdlcilck()
	//面包屑导航点击事件
	NUliclick()
	var inps=inconbox.getElementsByClassName('inps');
	for (var i=0;i<inps.length;i++) {
		inps[i].checked=false;
	}
	//文件夹单一check按钮点击
	onecheck()
	//批量删除按钮
	daleAll()
	//新建按钮
	xinj()
	//重命名按钮
	cmm()
}
//文件夹双击点击事件
bdlcilck()
//左侧栏点击事件
lFcilck()
//右上面包屑导航
NUliclick()
//全选按钮
allch()
//文件夹每个都是未选中状态
for (var i=0;i<inps.length;i++) {
		inps.checked=false;
	}
//文件夹单一check按钮点击
onecheck()
//批量删除按钮
daleAll()
//新建按钮
xinj()
//重命名按钮
cmm()
//全局调用框选
boxSelect();