(function () {
    'use strict';

    angular
        .module('greenApp')
        .controller('RegisterController', RegisterController).directive('equals', function() {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
});

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;
        var self = this;
            self.user = {};
            self.users=[];

            self.submit = submit;

            self.createUser = createUser;


            self.successMessage = '';
            self.errorMessage = '';
            self.done = false;

            self.onlyIntegers = /^\d+$/;
            self.onlyNumbers = /^\d+([,.]\d+)?$/;

            function submit() {
                console.log('Submitting');
                if (self.user.id === undefined || self.user.id === null) {
                    console.log('Saving New User', self.user);
                    createUser(self.user);
                } else {
                    updateUser(self.user, self.user.id);
                    console.log('User updated with id ', self.user.id);
                }
            }

            function createUser(user) {
                console.log('About to create user');
                vm.dataLoading = true;
                UserService.createUser(vm.user)
                    .then(
                        function (response) {
                            console.log('User created successfully #####');
                            //self.successMessage = 'User created successfully';
                            //self.errorMessage='';
                            //self.done = true;
                            //self.user={};
                            //$rootScope.myForm.$setPristine();
                            FlashService.Success('Registration successful', true);
                            $location.path('/login');
                        },
                        function (errResponse) {
                            console.error('Error while creating User #####');
                            FlashService.Error('Registration not successful :'+ errResponse.data.errorMessage, false);
                            self.errorMessage = 'Error while creating User: ' + errResponse.data.errorMessage;
                            self.successMessage='';
                        }
                    );
            }














        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
