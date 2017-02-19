/*
 *  Easy Zoom 1.0 - jQuery plugin
 * written by Alen Grakalic 
 * http://cssglobe.com/jquery-plugin-easy-image-zoom
 *
 * Copyright (c) 2011 Alen Grakalic (http://cssglobe.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Built for jQuery library
 * http://jquery.com
 *
 * Modified for Multiple Images by : http://www.loadsomecode.com/2013/10/jquery-plugin-modified-image-magnifier.html
 *
 */

 /*

 Required markup sample

 <a href="large.jpg"><img src="small.jpg" alt=""></a>

 */

(function($) {
   
 $.fn.easyZoom = function(options){

  var defaults = { 
   id: 'easy_zoom',
   parent: 'body',
   append: true,
   preload: 'Memuat...',
   error: 'Terjadi masalah saat memuat gambar.'
  };
  
  var obj;
  var img = new Image();
  var loaded = false;
  var found = true;
  var timeout;
  var w1,w2,w3,w4,h1,h2,h3,h4,rw,rh;
  var over = false;
  //new code 
  var hoveredLink;
  
  var options = $.extend(defaults, options); 
  
  this.each(function(){
    
   obj = this; 
   // works only for anchors
   var tagName = this.tagName.toLowerCase();
   if(tagName == 'a'){    
    /* - commented out this code because the img var only stores the image of the last <a> link element
    var href = $(this).attr('href');   
    img.src = href + '?' + (new Date()).getTime() + ' =' + (new Date()).getTime();
    $(img).error(function(){ found = false; })            
    img.onload = function(){          
     loaded = true; 
     img.onload=function(){};
    }; 
    */
    $(this)
     .css('cursor','crosshair')
     //.click(function(e){ e.preventDefault(); })
     .click(function(){ hide(); })
     .mouseover(function(e){ start(e, this); })
     .mouseout(function(){ hide(); })  
     .mousemove(function(e){ move(e); })   
   };
   
  });
  
  function start(e, imgLink){
   hide(); 
   
   /* begin new code */
   //assign mouseovered image link to global var hoveredLink
   hoveredLink = imgLink;
   //load the zoom image (big image) for the mouseovered image link
   var href = imgLink.href;
   img = new Image(); 
   img.onload = function(){          
    loaded = true; 
   };      
   img.src = href;
   $(img).error(function(){ found = false; })               
   /* end new code */
   
   var zoom = $('<div id="'+ options.id +'">'+ options.preload +'</div>');
   if(options.append) { zoom.appendTo(options.parent) } else { zoom.prependTo(options.parent) };
   $('#'+ options.id).html('').append(options.preload);
   if(!found){
    error();
   } else {
    if(loaded){
     show(e);
    } else {
     loop(e);
    };    
   };   
  };
  
  function loop(e){
   if(loaded){
    show(e);
    clearTimeout(timeout);
   } else {
    timeout = setTimeout(function(){loop(e)},200);
   };
  };
  
  function show(e){
   over = true;
   w1 = 0; h1 = 0; w2 = 0; h2 = 0; w3 = 0; h3 = 0; w4 = 0; h4 = 0; rw = 0; rh = 0;
   $(img).css({'position':'absolute','top':'0','left':'0'});
   //put the big image in the popup DIV
   $('#'+ options.id).html('').append(img);  
   /* - commented out and replaced this code because $('img', obj) wrongly gets the last small image in the page
   w1 = $('img', obj).width();
   h1 = $('img', obj).height();
   */
   
   /* begin new code */
   /* use children[0] to get the thumb image because firstElementChild returns null in IE10 and
   firstChild returns a text node in Chrome. children is a collection of just the child nodes that are elements */   
   //get small image properties
   w1 = $(hoveredLink.children[0]).width();
   h1 = $(hoveredLink.children[0]).height(); 
   /* end new code */
   
   //get popup zoom DIV properties
   w2 = $('#'+ options.id).width();
   h2 = $('#'+ options.id).height();

   //get big image properties
   w3 = $(img).width();
   h3 = $(img).height(); 

   //get difference between big image properties and  DIV (of big image) properties
   w4 = w3 - w2;
   h4 = h3 - h2; 

   //get ratio of w4 and h4 against small image properties
   rw = w4/w1;
   rh = h4/h1;
      
   move(e);
  };
  
  function hide(){
   over = false;
   /* begin new code */
   loaded = false;
   found = true;
   /* end new code */
   $('#'+ options.id).remove();
  };
  
  function error(){
   $('#'+ options.id).html(options.error);
  };
  
  function move(e){
   if(over){    
    // target image movement
    //var p = $('img',obj).offset();
    
    //replaced code above with new code below to get the correct thumb image (small image link) 
    /* begin new code */
    /* use children[0] to get the thumb image because firstElementChild returns null in IE10 and
    firstChild returns a text node in Chrome. children is a collection of just the child nodes that are elements */
    var thumbImg = hoveredLink.children[0];   
    var p = $(thumbImg).offset(); //get the 'top' and 'left' coordinates of the small image
    /* end new code */
    
    //pageX returns the mouse position relative to the LEFT edge of the document
    //pl = difference between the mouse position and LEFT coordinate of the small image
    var pl = e.pageX - p.left;
    
    //pageY returns the mouse position relative to the TOP edge of the document
    //pt = difference between the mouse position and TOP coordinate of the small image
    var pt = e.pageY - p.top; 
    
    //rw is the RATIO of the big image width against the width of the zoom DIV (of big image)
    //xl = the new LEFT coordinate of the big image
    var xl = pl*rw;
    
    //rh is the RATIO of the big image height against the height of the zoom DIV (of big image)
    //xt = the new TOP coordinate of the big image
    var xt = pt*rh;
    
    xl = (xl>w4) ? w4 : xl;
    xt = (xt>h4) ? h4 : xt; 
    
    //if big image is smaller than popup DIV container, center the image in the DIV
    //else, do the image magnifier scroll
    if (w4 < 0 && h4 < 0) {
     //top property of big image = (Div height - big image height) / 2
     var topVal = (h2-h3)/2;
     $(img).css({'position':'relative', 'top':topVal, 'display':'block', 'margin':'0 auto'});
    } else {     
     //$('#'+ options.id + ' img').css({'left':xl*(-1),'top':xt*(-1)});   --> original code replaced with the one below
     $(img).css({'left':xl*(-1),'top':xt*(-1)});
    }
   };
   /* begin new code */
   //check if big image was loaded (is available)
   if (!loaded) {
    $('#'+ options.id).html('').append("Big image is not available");
   };
   /* end new code */   
  };
 
 };

})(jQuery);
