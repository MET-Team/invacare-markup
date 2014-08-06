angular.module("stickyfloat-ng", []).directive("stickyFloat", function() {
  return {
    restrict: "EAC",
    link: function(scope, elements){

      var sidebar = $(elements[0]),
          sidebarHeight = sidebar.height(),
          scrollTop = 0;

      compareSidebar();

      $(document).on('scroll', function(){
        scrollTop = $('body').scrollTop();
        if(!sidebar.hasClass('stick')) compareSidebar();
      });

      $(window).on('resize', function(){
        compareSidebar();
      });

      function compareSidebar(){
        var winHeight = $(window).height();

        if(winHeight <= sidebarHeight){
          sidebar.addClass('stick');
        }else{
          sidebar.removeClass('stick').removeAttr('style');
        }
      };
    }
  };
});