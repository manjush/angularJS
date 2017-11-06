(function () {
    'use strict';

    angular
        .module('greenApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.emailId, vm.password, function (response) {
              if (response) {
                console.log(response);
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.emailId, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
              }

            });
        };
    }

})();
