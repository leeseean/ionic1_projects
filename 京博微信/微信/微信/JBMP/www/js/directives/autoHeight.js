/**
 * Created by Heycz on 2016/4/26.
 */
"use strict";
app.directive('autoHeight', ['$window', function ($window) {
    return {
        restrict: 'AC',
        link: function ($scope, $element, $attr) {
            var element = $($element);
            var top = element.offset().top;
            element.height($window.innerHeight - top - $attr.autoHeight);
        }
    }
}]);