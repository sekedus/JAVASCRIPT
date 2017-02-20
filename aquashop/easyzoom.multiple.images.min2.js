/*
 * 	Easy Zoom 1.0 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/jquery-plugin-easy-image-zoom
 *
 *	Copyright (c) 2011 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 *	Modified for Multiple Images by : http://www.loadsomecode.com/2013/10/jquery-plugin-modified-image-magnifier.html
 *
 */
 
 /*

 Required markup sample

 <a href="large.jpg"><img src="small.jpg" alt=""></a>

 */

!function(a){a.fn.easyZoom=function(b){function u(c,d){x(),t=d;var h=d.href;e=new Image,e.onload=function(){f=!0},e.src=h,a(e).error(function(){g=!1});var i=a('<div id="'+b.id+'">'+b.preload+"</div>");b.append?i.appendTo(b.parent):i.prependTo(b.parent),a("#"+b.id).html("").append(b.preload),g?f?w(c):v(c):y()}function v(a){f?(w(a),clearTimeout(h)):h=setTimeout(function(){v(a)},200)}function w(c){s=!0,i=0,m=0,j=0,n=0,k=0,o=0,l=0,p=0,q=0,r=0,a(e).css({position:"absolute",top:"0",left:"0"}),a("#"+b.id).html("").append(e),i=a(t.children[0]).width(),m=a(t.children[0]).height(),j=a("#"+b.id).width(),n=a("#"+b.id).height(),k=a(e).width(),o=a(e).height(),l=k-j,p=o-n,q=l/i,r=p/m,z(c)}function x(){s=!1,f=!1,g=!0,a("#"+b.id).remove()}function y(){a("#"+b.id).html(b.error)}function z(c){if(s){var d=t.children[0],g=a(d).offset(),h=c.pageX-g.left,i=c.pageY-g.top,j=h*q,k=i*r;if(j=j>l?l:j,k=k>p?p:k,l<0&&p<0){var m=(n-o)/2;a(e).css({position:"relative",top:m,display:"block",margin:"0 auto"})}else a(e).css({left:j*-1,top:k*-1})}f||a("#"+b.id).html("").append("Memuat...")}var d,h,i,j,k,l,m,n,o,p,q,r,t,c={id:"easy_zoom",parent:"body",append:!0,preload:"Memuat...",error:"Terjadi masalah saat memuat gambar."},e=new Image,f=!1,g=!0,s=!1,b=a.extend(c,b);this.each(function(){d=this;var b=this.tagName.toLowerCase();"a"==b&&a(this).css("cursor","crosshair").click(function(){x()}).mouseover(function(a){u(a,this)}).mouseout(function(){x()}).mousemove(function(a){z(a)})})}}(jQuery);
