angular.module("spritespin-ng", []).directive("spriteSpin", function($rootScope) {
  return {
    restrict: "EAC",
    scope: {
      spinImages: "=",
      spinConfigAdditional: "="
    },
    link: function(scope, elements){

      var spin = $(elements[0]);

      var frames = [];
      for(var item in scope.spinImages){
        frames.push($rootScope.domain + scope.spinImages[item].original);
      }

      if(frames.length > 0) {

        var spinConfig = {
          source: frames,
          width: spin.width(),
          height: spin.height(),
          sense: -1,
          frames: frames.length,
          animate: true,
          behavior: 'move',
          loop: false
        };

        for(var confItemIndex in scope.spinConfigAdditional){
          var confItem = scope.spinConfigAdditional[confItemIndex];

          if(confItemIndex == 'disableAnimation'){
            spinConfig.animate = false;
          }else{
            spinConfig[confItemIndex] = confItem;
          }
        }

        spin.spritespin(spinConfig);
        var api = spin.spritespin("api");
      }
    }
  };
});