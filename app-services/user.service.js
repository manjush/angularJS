(function () {
    'use strict';

    angular
        .module('greenApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','$q', 'urls'];
    function UserService($http,$q,urls) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.createUser = createUser;
        service.Update = Update;
        service.Delete = Delete;
        service.Create = Create;

        return service;

        function createUser(user) {
                console.log('Creating User Service +++++++++');
                var deferred = $q.defer();
                console.log('$q : '+$q);
                $http.post(urls.USER_SERVICE_API+'user/', user)
                    .then(
                        function (response) {

                            //loadAllUsers();
                           deferred.resolve(response.data);
                        },
                        function (errResponse) {
                           console.error('Error while creating new User : '+errResponse.data.errorMessage);
                           deferred.reject(errResponse);
                        }
                    );
                return deferred.promise;
            }

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

       function Create(user) {
         console.log('Creating User Create');
           return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
       }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
