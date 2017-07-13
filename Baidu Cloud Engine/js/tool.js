//左侧侧边栏结构生成，渲染数组
function LFlist(data){
	var str='';
	for (var k in data) {
		if (k!='maxId') {
			str+=`<li path="${data[k].path}">
				<a href="javascript:;" class="clearfix">
					<b></b>
					<span>${data[k].name}</span>
				</a>
			</li>`
		}
	}
	leflist.innerHTML=str;
}
//右侧正文内容生成， 渲染数组
function RTcont(data){
	//console.log(1)
	var str='';
	for (var k in data) {
		if (k!='maxId') {
			str+=`<dl class='wen' path="${data[k].path}">
						<dt class='jian'><img src="img/wenjianjia.png"/></dt>
						<dd><input type="checkbox" name="" class="inps" value="" /></dd>
						<dd class='jia'><span>${data[k].name}</span></dd>
					</dl>`
		}
	}
	ic_box.innerHTML=str;
	//布局转换
	turn();
}
//右侧页面中输入文件夹双击改变hash值事件
function bdlcilck(){
	for (var i=0;i<wen.length; i++) {
		wen[i].ondblclick=function(){
			//console.log(this.getAttribute('path'))
			var path=this.getAttribute('path').split('_').join('/');
			//console.log(path)
			location.hash='h='+path
			//全选设置
			allcheck.checked=false;
			n=0;
			
		}
	}
}
//通过hash值得改变，找到点击的是哪一个
function getdata1(data){
	var hash=location.hash
	if (hash) {
		var arr=hash.substr(1).split('=')[1].split('/')
		var Data=data
		for (var i=1;i<arr.length;i++) {
			Data=Data[arr[i]]
		}
		return Data
		
	}else{
		return data
	}
}
function setic_box(data){
	//重新获取in cont box 里面的内容
	var ic_box=document.getElementsByClassName('ic_box')[0]
	//console.log(data.child)
	if (data.child) {
		var obj=data.child
	} else{
		var obj=data
	}
	var str='';
	for (var k in obj) {
		if (k!='maxId') {
			str+=`<dl class='wen' path="${obj[k].path}">
						<dt class='jian'><img src="img/wenjianjia.png"/></dt>
						<dd><input type="checkbox" name="" class="inps" value="" /></dd>
						<dd class='jia'><span>${obj[k].name}</span></dd>
					</dl>`
		}
	}
	//布局转换
	turn();
	ic_box.innerHTML=str;
}
//导航栏内容从hash值中找寻
function getdata2(data){
	var hash=location.hash
	var arr1=[]
	if (hash) {
		var arr=hash.substr(1).split('=')[1].split('/')
		var Data=data
		fn()
		function fn(){
			if (arr.length>2) {
				for (var i=1;i<arr.length;i++) {
					Data=Data[arr[i]]
				}
				arr1.unshift(Data)
				arr.splice(arr.length-2,2)
				Data=data
				fn()
			}else{
				for (var i=1;i<arr.length;i++) {
					Data=Data[arr[i]]
				}
				arr1.unshift(Data)
			}
		}
		return arr1
	}else{
		return arr1=[]
	}
}
//面包屑导航渲染到页面中
function navUl(arr){
	var str='';
	if (arr.length!=0) {
		for (var i=0;i<arr.length;i++) {
			str+=`<li path="${arr[i].path}" class="clearfix"><a href="javascript:;">${arr[i].name}</a></li>`
		}
		navul.innerHTML=str;
		var lis=navul.getElementsByTagName('li')
		if (lis.length>1) {
			for (var i=1;i<lis.length;i++) {
				var as=lis[i].getElementsByTagName('a')[0]
				var ems=document.createElement('em')
				lis[i].insertBefore(ems,as)
			}
		}
	}
}
//左侧信息栏点击事件
function lFcilck(){
	var lflis=leflist.getElementsByTagName('li')
	for (var i=0;i<lflis.length;i++) {
		lflis[i].onclick=function(){
			var path=this.getAttribute('path').split('_').join('/')
			//console.log(path)
			location.hash='h='+path
			for (var i=0;i<lflis.length;i++) {
				lflis[i].style.background='';
			}
			this.style.background='#e1e8ed';
		}
	}
}
//右上面包屑导航点击事件
function NUliclick(){
	var nulis=navul.getElementsByTagName('li')
	for (var i=0;i<nulis.length;i++) {
		nulis[i].onclick=function(){
			var path=this.getAttribute('path').split('_').join('/')
			location.hash='h='+path
		}
	}
	//全选设置
	allcheck.checked=false;
	n=0;
	
}
//全选按钮点击事件
function allch(){
		allcheck.onclick=function(){
		for (var i=0;i<inps.length;i++) {
			if (this.checked) {
					inps[i].checked=true;
					n=inps.length
				
			} else{
					inps[i].checked=false;
					n=0
			}
		}
	}
}
//单一文件夹点击选中check
function onecheck(){
	for (var i=0;i<inps.length;i++) {
		inps[i].onclick=function(){
			if (this.checked) {
				n++
				
			} else{
				n--
			}
			pdcheck()
		}	
	}	
}
//判断全选函数 方便后面调用
function pdcheck(){
	if (n==inps.length&&inps.length!=0) {
			allcheck.checked=true;
	} else{
			allcheck.checked=false;
	}
}
//批量删除函数
function daleAll(){
	var deleall=scHu1.getElementsByTagName('li')[4];
	deleall.onclick=function(){
		for (var i=0;i<inps.length;i++) {
			if (inps[i].checked) {
				var wdt=inps[i].parentNode.parentNode;
				var path=wdt.getAttribute('path')
				var arr=path.split('_')
				var Data=data
				var s=arr[arr.length-1]
				//删除数据
				if (arr.length>2) {
					arr.splice(arr.length-2,2)
					for (var j=1;j<arr.length;j++) {
						Data=Data[arr[j]]
					}
					delete Data.child[s]
					Data.child.maxId--
				}else{
					delete data[s];
					data.maxId--
				}
				//内容中删除文件夹
				ic_box.removeChild(wdt)
				i--;
				n--;
				//重新渲染左侧侧边栏
				LFlist(data)
				//左侧侧边栏点击事件
				lFcilck()
				//判断全选
				pdcheck()
			}
		}
	}
}
//新建文件夹
function xinj(){
	//新建按钮
	var xijbtn=scHu1.getElementsByTagName('li')[5];
	//提示输入框
	var tool1=document.getElementsByClassName('tool1')[0]
	//输入框text
	var tooltxt=document.getElementById('tooltxt')
	xijbtn.onoff=true;
	xijbtn.onclick=function(){
		//重命名开关
		cmmbtn.onoff=false;
		if (this.onoff) {
			tooltxt.value='';
			var hqhash=location.hash
			if (hqhash) {
				var hash = location.hash.substr(1).split("=")[1]
				var arr = hash.split('/');
				var Data = data;
				for(var i = 1; i < arr.length; i++) {
					Data = Data[arr[i]];
				}
				Data.child.maxId++;
				var newPath = Data.path + '_child_' + Number(Data.child.maxId - 1);
				Data.child[Data.child.maxId - 1] = {
					path: newPath,
						name: '新建文件夹',
						child: {
							maxId: 0
						}
				}
			} else{
				data.maxId++;
				var newPath = "data_" + Number(data.maxId - 1);
				data[data.maxId - 1] = {
					path: newPath,
					name: '新建文件夹',
					child: {
						maxId: 0
					}
				}
			}
			this.onoff=false;
			var dlw=document.createElement('dl');
			//dlw.style.className='wen';
			dlw.innerHTML+=`
				<dt class='jian'><img src="img/wenjianjia.png"/></dt>
				<dd><input type="checkbox" name="" class="inps" value="" /></dd>
				<dd class='jia'>新建文件夹</dd>`;
			tool1.style.display='block'
			dlw.setAttribute('class','wen');
			dlw.setAttribute('path',''+newPath+'');
			ic_box.appendChild(dlw);
			var jiax=ic_box.getElementsByClassName('jia')
			tool1.style.left=jiax[jiax.length - 1].offsetLeft-16+'px';
			tool1.style.top=jiax[jiax.length - 1].offsetTop+'px';
			//对按钮函数
			right(tool1,jiax,xijbtn)
			//叉按钮函数
			mista(tool1,xijbtn)
			//重新渲染左侧侧边栏
			LFlist(data)
			//左侧栏点击事件
			lFcilck()
			//判断全选
			pdcheck()
			//布局转换
			turn();
			
		}
	}
}
//命名：对按钮函数
function right(tool1,jiax,xijbtn){
	//span 对
	var spdui=tool1.getElementsByTagName('span')[0];
	spdui.onclick=function(){
			if (tooltxt.value) {
				var path = wen[wen.length - 1].getAttribute('path');
				var arr = path.split('_');
				var Data = data;
				for(var i = 1; i < arr.length; i++) {
					Data = Data[arr[i]];
				}
				jiax[jiax.length - 1].innerHTML = tooltxt.value
				Data.name=tooltxt.value
				//console.log(Data)
				tool1.style.display='none'
				xijbtn.onoff=true;
				//重命名开关
				cmmbtn.onoff=true;
				//重新渲染左侧侧边栏
				LFlist(data)
			}else{
				
				alert('请输入内容')
			}
	}
}
//命名：错按钮函数
function mista(tool1,xijbtn){
	//span 错
	var spcuo=tool1.getElementsByTagName('span')[1]
	spcuo.onclick=function(){
		var lastwen=wen[wen.length-1]
		var laspath=lastwen.getAttribute('path')
		var arr=laspath.split('_');
		var Data=data;
		var s=arr[arr.length-1];
		if (arr.length>2) {
			arr.splice(arr.length-2,2);
			for (var i=1;i<arr.length;i++) {
				Data=Data[arr[i]];
			}
			delete Data.child[s];
			Data.child.maxId--;
		} else{
			delete data[s];
			data.maxId--;
		}
		ic_box.removeChild(lastwen)
		tool1.style.display='none';
		//重新渲染左侧侧边栏
		LFlist(data)
		xijbtn.onoff=true;
		//重命名开关
		cmmbtn.onoff=true;
	}
}
//重命名
function cmm(){
	//重命名按钮
	var cmmbtn=scHu1.getElementsByTagName('li')[3];
	//提示输入框
	var tool1=document.getElementsByClassName('tool1')[0]
	//输入框text
	var tooltxt=document.getElementById('tooltxt')
	//span 对
	var spdui=tool1.getElementsByTagName('span')[0];
	//span 错
	var spcuo=tool1.getElementsByTagName('span')[1]
	cmmbtn.onoff=true;
	cmmbtn.onclick=function (){
		//新建开关
		xijbtn.onoff=false;
		tooltxt.value='';
		if (this.onoff) {
			var num=0;
			for (var i=0;i<inps.length;i++) {
				if (inps[i].checked) {
					num++;
				}
			}
			if (num==1) {
				for (var i=0;i<inps.length;i++) {
					if (inps[i].checked) {
						tool1.style.left=inps[i].offsetLeft-16+'px';
						tool1.style.top=inps[i].offsetTop+'px';
						var cmmwj=inps[i].parentNode.parentNode
						var cmdd=inps[i].parentNode.nextElementSibling
						tool1.style.display='block'
						this.onoff=false;
						//对点击
						spdui.onclick=function(){
							if (tooltxt.value) {
								var path = cmmwj.getAttribute('path');
								var arr = path.split('_');
								var Data = data;
								for(var i = 1; i < arr.length; i++) {
									Data = Data[arr[i]];
								}
								cmdd.innerHTML = tooltxt.value
								Data.name=tooltxt.value
								tool1.style.display='none'
								//重新渲染左侧侧边栏
								LFlist(data)
								//左侧栏点击事件
								lFcilck()
								//判断全选
								pdcheck()
								cmmbtn.onoff=true;
								//新建开关
								xijbtn.onoff=true;
								for (var i=0;i<inps.length;i++) {
									inps[i].checked=false
								}
							}else{
								alert('请输入内容')
							}
						}
						//错点击
						spcuo.onclick=function(){
							for (var i=0;i<inps.length;i++) {
									inps[i].checked=false
								}
							//新建开关
							xijbtn.onoff=true;
							tool1.style.display='none'
						}
					}
				}
			}else{
				alert('请选择单一文件')
			}
				
		}
			
	}
}
//右键
document.oncontextmenu = function(ev){
	//显示右键菜单
	if (ev.target.className=='ic_box') {
		//阻止默认右键菜单
		ev.preventDefault();
		var maxL = inconbox.clientWidth-youj.offsetWidth;
		var maxT = inconbox.clientHeight-youj.offsetHeight;
		//右边超过最大值，等于最大值
		var dx=ev.clientX-inconbox.offsetLeft;
		var dy=ev.clientY-inconbox.offsetTop;
		var l = dx>maxL?maxL:dx;
		//下边超过最大值，鼠标位置-菜单高度
		var t = dy>maxT?maxT:dy;
		youj.style.left=(l+2)+'px';
		youj.style.top=t+'px';
		youj.style.display='block';
		wenyouj.style.display='none';
		//右键菜单栏中新建点击事件
		yj_xinj()
	}
	//console.log(ev.target)
	if (ev.target.parentNode.parentNode.className=='wen') {
		//阻止默认右键菜单
		ev.preventDefault();
		//console.log(wenyouj)
		var maxL = inconbox.clientWidth-wenyouj.offsetWidth;
		var maxT = inconbox.clientHeight-wenyouj.offsetHeight;
		//右边超过最大值，等于最大值
		var dx=ev.clientX-inconbox.offsetLeft;
		var dy=ev.clientY-inconbox.offsetTop;
		var l = dx>maxL?maxL:dx;
		//下边超过最大值，鼠标位置-菜单高度
		var t = dy>maxT?maxT:dy;
		wenyouj.style.left=(l+2)+'px';
		wenyouj.style.top=t+'px';
		youj.style.display='none';
		wenyouj.style.display='block';
		//ul中打开按钮
		wyj_open()
		//ul中删除按钮
		delewen()
//		//ul中重命名按钮
		cmmwen()
//		for (var i=0;i<wen.length;i++) {
//			wen[i].firstElementChild.nextElementSibling.children[0];
//			wen[i].checked=false;
//		}
	}
}
document.onclick=function(ev){
	if (ev.target.parentNode!==youj){
		youj.style.display='none';
		wenyouj.style.display='none';
	}
}
//右键菜单栏中新建点击事件
function yj_xinj(){
	var lis=youj.getElementsByTagName('li')[0]
	lis.onclick=function(){
		xijbtn.onclick()
		youj.style.display='none';
	}
}
//wen 右键菜打开按钮
function wyj_open(){
	var oplis=wenyouj.getElementsByTagName('li')[0]
	for(var i=0;i<wen.length;i++){
	//var mior=wenyouj.getBoundingClientRect().right;
		if(wenyouj.offsetLeft>=wen[i].offsetLeft&&wenyouj.offsetLeft<=wen[i].getBoundingClientRect().right){
			var obj=wen[i]
			oplis.onclick=function (){
				obj.ondblclick()
				getdata1(data)
				setic_box(data)
			}
		}
	}
}
////wen 右键菜删除按钮
function delewen(){
	var delelis=wenyouj.getElementsByTagName('li')[1]
	for(var i=0;i<wen.length;i++){
		if(wenyouj.offsetLeft>=wen[i].offsetLeft&&wenyouj.offsetLeft<=wen[i].getBoundingClientRect().right){
			//找到input按钮
			var obj=wen[i].firstElementChild.nextElementSibling.children[0]
			//console.log(obj)
			delelis.onclick=function (){
				obj.checked=true;
				deleall.onclick()
			}
		}
	}
}
//wen 右侧重命名按钮
function cmmwen(){
	var cmmlis=wenyouj.getElementsByTagName('li')[2]
	for(var i=0;i<wen.length;i++){
		if(wenyouj.offsetLeft>=wen[i].offsetLeft&&wenyouj.offsetLeft<=wen[i].getBoundingClientRect().right){
			//找到input按钮
				var obj=wen[i].firstElementChild.nextElementSibling.children[0]
				//console.log(obj)
			cmmlis.onclick=function (){
				obj.checked=true;
				cmmbtn.onclick()
			}
		}
	}
}
//框选
function boxSelect(){
	//inconbox 指右侧最大的盒子
	//ic_box 放文件夹的盒子
	var wen=ic_box.getElementsByClassName('wen');
	var boxSelect=inconbox.getElementsByClassName('boxSelect')[0];//是选框
	var left=inconbox.getBoundingClientRect().left;
	var top=inconbox.getBoundingClientRect().top;
	var right=inconbox.getBoundingClientRect().right;
	var bottom=inconbox.getBoundingClientRect().bottom;
	var arr=[];
	inconbox.onmousedown=function (ev){
		var l1 = ev.clientX-inconbox.getBoundingClientRect().left;
		var t1 = ev.clientY-inconbox.getBoundingClientRect().top;
		boxSelect.style.display='block';
		document.onmousemove=function (ev){
			ev.preventDefault();
			if (ev.clientX<right && ev.clientX>left && ev.clientY<bottom && ev.clientY>top) {
					var l2 = ev.clientX-inconbox.getBoundingClientRect().left;
					var t2 = ev.clientY-inconbox.getBoundingClientRect().top;
					var w = Math.abs(l1-l2);
					var h = Math.abs(t1-t2);
					var l = l1>l2?l2:l1;
					var t = t1>t2?t2:t1;
					boxSelect.style.width = w+'px';
					boxSelect.style.height = h+'px';
					boxSelect.style.left = l+'px';
					boxSelect.style.top = t+'px';
					for(var i=0;i<arr.length;i++){
						if (arr[i].children[1].firstElementChild.checked) {//选中
							n--;
							arr[i].children[1].firstElementChild.checked=false;//未选中
							arr[i].style.background = '';
						}
					}
					arr = [];
					//每次都是当前被选中的
					for(var i=0;i<wen.length;i++){
						if(duang(boxSelect,wen[i])){
							if (!wen[i].children[1].firstElementChild.checked) {//未选中
								wen[i].style.background='#f5f8fa';
								n++;
								wen[i].children[1].firstElementChild.checked=true;
								arr.push(wen[i]);
							} else{
								arr.push(wen[i]);
							}
						}
					}
					//判断全选
					pdcheck()
					//拖拽
					for (var i=0;i<wen.length;i++) {
						wen[i].onmousedown = function(ev){
						ev.cancelBubble = true;
						//在选中的文件上按下，arr里有this
						if(arr.includes(this)){
							//按下坐标
							//console.log(this)
							var nT = ev.clientY-ic_box.getBoundingClientRect().top;
							var nL = ev.clientX-ic_box.getBoundingClientRect().left;
							//循环每个选中的li，记录按下点到选中li原点的距离
							for(var i=0;i<arr.length;i++){
								var pos = arr[i].getBoundingClientRect();
								var liT = pos.top-ic_box.getBoundingClientRect().top;
								var liL = pos.left-ic_box.getBoundingClientRect().left;
								arr[i].disY = nT-liT;
								arr[i].disX = nL-liL;
							}
							document.onmousemove = function(ev){
								for (var i=0;i<arr.length;i++) {
									arr[i].style.opacity=0.5;
								}
								//移动时当前鼠标坐标
								var dT = ev.clientY-ic_box.getBoundingClientRect().top;
								var dL = ev.clientX-ic_box.getBoundingClientRect().left;
								//让每个li都保持刚才的距离
								for(var i=0;i<arr.length;i++){
									var t = dT-arr[i].disY;
									var l = dL-arr[i].disX;
									arr[i].style.top = t+'px';
									arr[i].style.left = l+'px';
								}	
							}
							document.onmouseup = function(ev){
								var arr1=[];
								document.onmousemove = document.onmouseup = null;
								for (var i=0;i<arr.length;i++) {
									if (arr[i].offsetTop>arr[i].y || arr.length==wen.length) {
										arr[i].style.top=arr[i].y+'px';
										arr[i].style.left=arr[i].x+'px';
										arr[i].style.opacity=1;
									} else{
										var t=ev.clientY-ic_box.getBoundingClientRect().top;
										for (var i=0;i<wen.length;i++) {
											arr1.push(wen[i]);
										}
										for (var i=0;i<arr.length;i++) {
											if (arr1.includes(arr[i])) {
												var s=arr1.indexOf(arr[i]);
												arr1.splice(s,1);
											}
										}
										for (var i=0;i<arr1.length;i++) {
											var t1=arr1[i].offsetTop+arr1[i].clientHeight;
											var t2=arr1[i].offsetTop;
											if (t<t1 &&t>t2) {
												var path=arr1[i].getAttribute('path');
												var Data=data;
												var arr2=path.split('_');
												for (var i=1;i<arr2.length;i++) {
													Data=Data[arr2[i]];
												}
												Data.child.maxId+=arr.length;
												for (var i=0;i<arr.length;i++) {
													var newPath=Data.path+'_child_'+Number(Data.child.maxId-(i+1));
													var Data1=data;
													var arr3=arr[i].getAttribute('path').split('_');
													for (var j=1;j<arr3.length;j++) {
														Data1=Data1[arr3[j]];
														Data1.path=newPath;
													}
													Data.child[Data.child.maxId-(i+1)]=Data1;
												}
												for (var i=0;i<arr.length;i++) {
													var path1=arr[i].getAttribute('path');
													var arr4=path1.split('_');
													var Data2=data;
													var s=arr4[arr4.length-1];
													if (arr4.length>2) {
														arr4.splice(arr4.length-2,2);
														for (var j=1;j<arr4.length;j++) {
															Data2=Data2[arr4[j]];
														}
														delete Data2.child[s];
														Data2.child.maxId--;
													} else{
														delete data[s];
														data.maxId--;
													}
													ic_box.removeChild(arr[i]);
													n--;
												}
												//设置双击点击事件，改变hash值
												bdlcilck()
												var inps=inconbox.getElementsByClassName('inps');
												for (var i=0;i<inps.length;i++) {
													inps[i].checked=false;
													n=0;
												}
												//文件夹单一check按钮点击
												onecheck()
												//批量删除按钮
												daleAll()
												//左侧栏点击事件
												lFcilck()
												//判断全选
												pdcheck()
											}
										}
									}
								}
							}
						}
					}
				}
			}
		};
		document.onmouseup = function(){
			boxSelect.style.cssText = '';
			document.onmousemove = document.onmouseup = null;
		}
	}
}
//布局转换
function turn(){
	var wen=ic_box.getElementsByTagName('wen');
	for(var i=0;i<wen.length;i++){
		wen[i].style.left = wen[i].offsetLeft+'px';
		wen[i].style.top = wen[i].offsetTop+'px';
		//记录位置
		wen[i].x = wen[i].offsetLeft;
		wen[i].y = wen[i].offsetTop;
		setTimeout(function(i){
			wen[i].style.position = 'absolute';
		},0,i)
	}
};
//检测碰撞
function duang(obj1,obj2){
	var pos1 = obj1.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	if(pos1.right<pos2.left || pos1.bottom<pos2.top || pos1.left>pos2.right || pos1.top>pos2.bottom){
		return false;
	}else{
		return true;
	}
}
