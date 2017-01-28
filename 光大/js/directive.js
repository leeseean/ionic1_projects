/**
 * Created by Administrator on 2016/3/9 0009.
 */
app.directive('scaleinput', [ '$timeout', '$rootScope',
    function($timeout, $rootScope) {
        'use strict';

        return {
            restrict : 'A, E',
            require: '^ngModel',
            scope:{
                ngModel:'='
            },
            link : function(scope, element, attrs, ngModel) {
                var el=angular.element(element);
                if(attrs.must){
                    el.prepend('<div class="textViewNormal">'+attrs.tag+'<span style="color: #999;float: right;padding-right: 10px;font-size: 14px">必填</span></div>');
                }else{
                    el.prepend('<div class="textViewNormal">'+attrs.tag+'</div>');
                }

                var input =el.find('input');
                var span =el.find('span');
                if(attrs.type){
                    input.attr('type',attrs.type);
                }
                if(attrs.maxlength){
                    input.attr('maxlength',attrs.maxlength);
                }
                if(attrs.value!=''){
                    var textView =el.find('div');
                    textView.addClass('textViewWidthText');
                    input.addClass('inputWidthText');
                    textView.removeClass('textViewNormal');
                    input.removeClass('inputNormal');
                    span.addClass('hide');
                }
            },
            controller : function($scope, $attrs, $element,$rootScope) {
                $scope.change =function(item){
                    $rootScope.$broadcast('changeValue');
                    var el =angular.element($element);
                    var textView =el.find('div');
                    var input =el.find('input');
                    var span =el.find('span');
                    if(item.ngModel!=''){
                        if(!textView.hasClass('textViewWidthText')){
                            textView.addClass('textViewWidthText');
                            input.addClass('inputWidthText');
                            textView.removeClass('textViewNormal');
                            input.removeClass('inputNormal');
                            span.addClass('hide');
                        }
                    }else{
                        if(textView.hasClass('textViewWidthText')){
                            textView.removeClass('textViewWidthText');
                            input.removeClass('inputWidthText');
                            textView.addClass('textViewNormal');
                            input.addClass('inputNormal');
                            span.removeClass('hide');
                        }
                    }
                };
                $scope.blur =function(){
                    if($attrs.phone){
                     $rootScope.$broadcast('checkPhone');
                    }
                }
                if($attrs.readonly){
                    angular.element($element).find('input').attr('readOnly','true');
                }
            },
            template: '<input ng-change="change(this)" ng-blur="blur()" class="inputNormal" ng-model="ngModel"/>'
        };

    }
]).directive('back',['$rootScope',function($rootScope){
    'use strict';

    return {
        restrict : 'A, E',
        controller:function($scope,$attrs,$element){
            $scope.commonBack =function(){
                $rootScope.$broadcast('backButton');
            }
        },
        template:'<button class="button button-icon ion-ios-arrow-back" ng-click="commonBack()"/></button>'
    }
}]);