angular.module("spritespin-ng", []).directive("spriteSpin", function($rootScope) {
  return {
    restrict: "EAC",
    scope: {
      spinImages: "=",
      spinConfigAdditional: "=",
      spriteSpin: "="
    },
    link: function(scope, elements){
      var spin = $(elements[0]),
          api,
          spinContainer = spin.parent();

      var prepareSpin = function(images){
        var frames = [];

        for(var item in images){
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
            loop: false,
            frameTime: '100',
            onInit: function(e){
              $(e.target).append('<div class="preload"></div>');
              if(scope.spriteSpin) {
                scope.spriteSpin.spinReady = false;
              }
            },
            onLoad: function(e){
              $('.preload', $(e.target)).remove();
              if(scope.spriteSpin) {
                scope.$apply(function(){
                  scope.spriteSpin.spinReady = true;
                });
              }
            }
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
          api = spin.spritespin("api");
        }
      };

      $('.spin-ico', spinContainer).click(function(){
        if(api) {
          api.toggleAnimation();
        }
      });

      scope.$watch('spinImages', function(newVal){
        if(newVal){
          prepareSpin(newVal);
        }
      });
    }
  };
});