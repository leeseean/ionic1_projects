
appMain.controller('popoverControl',function($scope, $ionicPopover) {

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.clickItem = function(){
        $scope.popover.hide();
    };
});