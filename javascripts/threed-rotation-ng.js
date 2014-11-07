angular.module("threed-rotation-ng", []).directive("threedRotation", function($rootScope) {
  return {
    restrict: "EAC",
    scope: {
      threedImages: "="
    },
    link: function(scope, elements){
      var element = $(elements[0]),
          elId = element.attr('id');

      var obj = new object2vrPlayer(elId);

      console.log(obj);
    }
  };
});