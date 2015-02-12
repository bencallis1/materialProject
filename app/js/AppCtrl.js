(function(){
'use strict';

  angular
      .module('app', ['ngMaterial', 'avatars'])
      .controller('AppCtrl', ['$scope', 'avatarsService', '$mdSidenav', '$mdBottomSheet', '$log', AvatarAppController ])
      .config(function($mdThemingProvider) {

        
        $mdThemingProvider.theme('default')
          .primaryColor('blue',{ 
               'default': '500', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
          .accentColor('brown');

      });
     
  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AvatarAppController($scope, avatarsService, $mdSidenav, $mdBottomSheet, $log ) {
    var allAvatars = [ ];

    $scope.selected      = null;
    $scope.avatars       = allAvatars;
    $scope.selectAvatar  = selectAvatar;
    $scope.toggleSidenav = toggleSideNav;
    $scope.showActions   = showActions;

    loadAvatars();

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Load all available avatars
     * @param menuId
     *
     */
    function loadAvatars() {
      avatarsService
        .loadAll()
        .then( function( avatars ) {
          allAvatars = avatars;

          $scope.avatars = [].concat(avatars);
          $scope.selected = avatars[0];
        });
    }

    /**
     * Hide or Show the sideNav area
     * @param menuId
     */
    function toggleSideNav( name ) {
      $mdSidenav(name).toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectAvatar ( avatar ) {
        $scope.selected = angular.isNumber(avatar) ? $scope.avatars[avatar] : avatar;
        $scope.toggleSidenav('left');
    }

    /**
     * Show the bottom sheet
     */
    function showActions($event) {

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          template: '<md-bottom-sheet class="md-list md-has-header">' +
                      '<md-subheader>Avatar Actions</md-subheader>' +
                        '<md-list>' +
                          '<md-item ng-repeat="item in vm.items">' +
                            '<md-button ng-click="vm.performAction(item)">{{item.name}}</md-button>' +
                          '</md-item>' +
                        '</md-list>' +
                      '</md-bottom-sheet>',
          bindToController : true,
          controllerAs: "vm",
          controller: [ '$mdBottomSheet', AvatarSheetController],
          targetEvent: $event
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function AvatarSheetController( $mdBottomSheet ) {
          this.items = [
            { name: 'Share', icon: 'share' },
            { name: 'Copy', icon: 'copy' },
            { name: 'Impersonate', icon: 'impersonate' },
            { name: 'Singalong', icon: 'singalong' },
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }



})();
