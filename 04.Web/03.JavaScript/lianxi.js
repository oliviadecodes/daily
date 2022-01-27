var p = document.createElement('p');
p.innerHTML = "这是一个p";
document.body.appendChild(p);

var changeColor = function(){
	var div = document.getElementById("d1");
	div.style.backgroundColor = "black";
	div.style.color = "white";
}

var al = function(){
	alert("这是alert");
} 


d1.addEventListener('mousedown', al);//鼠标按下就触发
d1.addEventListener('mouseup', al);//鼠标按下后放开会触发
d1.addEventListener('mousewheel', al);//鼠标滚轮触发
d1.addEventListener('mouseover', al);//覆盖
d1.addEventListener('mouseenter', al);//进入
d1.addEventListener('mouseleave', al);//离开

//document.body.onclick = changeColor;
//document.body.onclick = al;
// document.body.addEventListener('click', changeColor);
// document.body.addEventListener('click', al);