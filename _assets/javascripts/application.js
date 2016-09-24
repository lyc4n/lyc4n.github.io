//= require_tree ./vendor
//

$(function(){

  Linklistify = function(elemSelector, linksSelector, block){
    this.links = $(linksSelector)
    this.elem  = $(elemSelector)
    this.listHtml = $("<ul class='linklistify'></ul>")

    if(this.links.length > 0 && this.elem.length > 0){
      this.initialize(block)
    }
  }

  Linklistify.prototype.initialize = function(block){
    var that =  this
    this.links.each(function(){
      text    = $(this).text()
      pageUrl = $(this).attr("id")
      that.listHtml.append("<li><a href='#" + pageUrl +"' title='" + text + "'>" + text + "</a></li>")
    })
    this.elem.html(this.listHtml)
    block(this.listHtml)
  }

  var l = new Linklistify(".cheatsheet-content-list", ".cheatsheet-body h2", function(listHtml){
    $(".page-content h1").insertBefore(listHtml)
    listHtml.css({"margin-bottom" : "110px", "margin-top" : "-55px"})
  })
})
