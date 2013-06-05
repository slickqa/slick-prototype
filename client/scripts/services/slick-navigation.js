'use strict';
/**
 * User: jcorbett
 * Date: 5/30/13
 * Time: 1:27 PM
 */

// nav.group('Products').add('A Product', 'products/A+Product', 100)

angular.module('slickServicesModule')
  .service('NavigationService', function() {
      var _show = false;
      var _groups = [
          {name: "Products",
           links: [
               {name: "A Product", link: "products/A+Product"},
               {name: "Second Product", link: "products/Second+Product"},
               {name: "Third Product", link: "products/Third+Product"}
           ]},
          {name: "Reports",
           links: [
            {name: "Testrun Summary", link: "reports/test+run+summary"},
            {name: "Test Plan Summary (TPS)", link: "reports/tps"},
            {name: "Testrun Group", link: "reports/test+run+group"}
           ]}
      ];

        return {
            show: function() {
                return _show;
            },
            toggleShow: function() {
                if(_show) {
                    _show = false;
                } else {
                    _show = true;
                }
                console.log("Show is now: " + _show);
            },
            groups: function() {
                return _groups;
            },

            addgroup: function(group) {
                _groups.append(group);
            }
        }
    });