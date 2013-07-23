// Javascript for printing OpenSprinkler homepage
// Firmware v1.8
// All content is published under:
// Creative Commons Attribution ShareAlike 3.0 License
// Sep 2012, Rayshobby.net

function w(s) {document.writeln(s);}
function link(s) {window.location=s;}
function linkn(s){window.open(s, '_blank');}
// input rain delay value
function setrd(form,idx) {var h=prompt("Enter hours to delay","0");if(h!=null){form.elements[idx].value=h;form.submit()};}
function imgstr(s) {return "<img src=\"http://rayshobby.net/images/icons/svc_"+s+".png\" height=20 align=absmiddle>&nbsp;";}
function datestr(t) {var _t=tz-48; return (new Date(t)).toUTCString()+((_t>=0)?"+":"-")+(Math.abs(_t)/4>>0)+":"+((Math.abs(_t)%4)*15/10>>0)+((Math.abs(_t)%4)*15%10);}
// print menu links
w("<button style=\"height:44\" onclick=link(\"/\")>"+imgstr("reset")+"刷新</button>");
w("<button style=\"height:44\" onclick=link(\"/vo\")>"+imgstr("options")+"选项</button>");
w("<button style=\"height:44\" onclick=link(\"/vs\")>"+imgstr("edit")+"工作站</button>");
w("<button style=\"height:44\" onclick=link(\"/vp\")>"+imgstr("cal")+"程序</button>");
w("<button style=\"height:44\" onclick=linkn(\"http://igoogle.wunderground.com/cgi-bin/findweather/getForecast?query="+loc+"\")>"+imgstr("weather")+"天气</button><p></p>");
// print device information
if(ver>=100) w("<b>固件版本</b>: "+(ver/100>>0)+"."+((ver/10>>0)%10)+"."+(ver%10)+"<br>");
else w("<b>固件版本</b>: "+(ver/10>>0)+"."+(ver%10)+"<br>");
w("<b>设备时间</b>: "+datestr(devt*1000)+"<hr>");
w("<script type=\"text/javascript\" src=\"http://rayshobby.net/scripts/java/svc1.8/"+((mm)?"manualmode.js":"progmode.js")+"\"></script>");
//这里的javascript的路径需要修改

// print status and other information
w("<br><b>工作状况</b>: "+(en?("on").fontcolor("green"):("OFF").fontcolor("red")));
w("<br><b>下雨延时</b>: "+(rd?("ON").fontcolor("red")+" (till "+datestr(rdst*1000)+")":("off").fontcolor("black")));
w("<br><b>雨水传感器</b>: "+(urs?(rs?("Rain Detected").fontcolor("red"):("no rain").fontcolor("green")):"<font color=gray>n/a</font>"));
w("<br><b>水位</b>: <font color="+((wl==100)?"green":"red")+">"+wl+"\%</font>");
var lrsid=lrun[0],lrpid=lrun[1],lrdur=lrun[2],lret=lrun[3];
var pname="P"+lrpid;
if(lrpid==255||lrpid==99) pname="Manual Mode";
if(lrpid==254||lrpid==98) pname="Run-once Program";
dstr=(new Date(lret*1000)).toUTCString().replace(" GMT","");
if(lrpid!=0) w("<br><b>Log</b>: "+(snames[lrsid]+" ran "+pname+" for "+(lrdur/60>>0)+"m"+(lrdur%60)+"s @ "+dstr).fontcolor("gray"));
else w("<br><b>Log</b>: <font color=gray>n/a</font>");
w("<hr>");
// print html form
w("<form name=hf action=cv method=get><p>密码:<input type=password "+(ipas?"disabled":"")+" size=10 id=pwd name=pw></p>");
w("<input type=hidden name=en><input type=hidden name=rd value=0><input type=hidden name=rbt value=0><input type=hidden name=mm value=0></form>");
w("<button style=\"height:36\" onclick=\"hf.elements[1].value="+(1-en)+";hf.submit();\">"+imgstr(en?"stop":"start")+(en?"停止工作":"开启工作")+"</button>");
w("<button style=\"height:36\" onclick=\"hf.elements[4].value="+(1-mm)+";hf.submit();\">"+imgstr(mm?"auto":"manual")+(mm?"手动关闭":"手动开启")+"</button>");
w("<button style=\"height:36\" onclick=\"setrd(hf,2)\">"+imgstr("rain")+"下雨延时</button>");
w("<button style=\"height:36\" onclick=\"hf.elements[3].value=1;hf.submit();\">"+imgstr("reboot")+"重启</button>");
w("<p></p><hr><br>");
