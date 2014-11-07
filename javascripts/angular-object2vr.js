angular.module('angular-object2vr', [])

  .provider('angularObject2vr', function(){
    this.$get = ['$rootScope', function($scope){

      $.fn.disableSelection = function() {
        return this
          .attr('unselectable', 'on')
          .css('user-select', 'none')
          .on('selectstart', false);
      };

      //TO_DO: перенести логику 3D сюда

      var publicMethods = {
        create: function(container, config){

        }
      };

      return publicMethods;
    }]
  })

  .directive("threedRotation", ['angularObject2vr', function(angularObject2vr) {
    return {
      restrict: "EAC",
      scope: {
        threedConfig: "="
      },
      link: function(scope, elements){
        var element = $(elements[0])[0];

        var obj = new object2vrPlayer(element);
        var skin = new object2vrSkin(obj);

        obj.readConfig(scope.threedConfig);

        var disableZomButtons = function (value){
          $('.zoom-control').removeClass('disabled');
          if(value == 0){
            $('.zoom-control.zoom-minus').addClass('disabled');
          }
          if(value == 40){
            $('.zoom-control.zoom-plus').addClass('disabled');
          }
        };

        var prevValue = 0;
        $( ".zoom-slider #slider-vertical" ).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 40,
          value: 0,
          step: 1,
          change: function(event, ui){
            var currentValue = ui.value,
              direction = -1;

            disableZomButtons(currentValue);

            if(prevValue > currentValue){
              direction = 1;
            }

            var difference = Math.abs(prevValue - currentValue);

            if(difference > 1){
              for(var step = 0; step < difference; step++){
                skin.player.changeFovLog(direction, true);
              }
            }else{
              skin.player.changeFovLog(direction, true);
            }
            prevValue = currentValue;
          }
        });
        skin.player.changeFovLog($("#slider-vertical").slider("value"), true);

        $('.zoom-control').click(function(){

          $(this).disableSelection();

          if(!$(this).hasClass('disabled')) {
            var zoomValueCurrent = parseInt($("#slider-vertical").slider("value"));

            disableZomButtons(zoomValueCurrent);

            var direction = -1;
            if ($(this).hasClass('zoom-minus')){
              direction = 1
            }

            zoomValueCurrent -= (direction);
            $("#slider-vertical").slider("value", zoomValueCurrent);
          }
        });
      }
    };
  }]);