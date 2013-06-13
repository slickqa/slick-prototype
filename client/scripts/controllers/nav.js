'use strict';
/**
 * User: jcorbett
 * Date: 5/31/13
 * Time: 2:00 PM
 */

angular.module('slickPrototypeApp')
    .controller('NavCtrl', ['$scope', 'NavigationService', function ($scope, nav) {
        $scope.show = nav.show;
        $scope.groups = nav.groups;
        $scope.slickHomeUrl = document.baseURI;

        $scope.addProject = function() {
            nav.groups()[0].links.push({name: 'A new project', link: 'projects/A+new+project'});
        }
    }]);
