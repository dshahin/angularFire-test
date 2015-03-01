/* global Firebase */

'use strict';

angular.module('firstApp')
    .controller('MainCtrl', function($scope, $firebase) {
        // now we can use $firebase to synchronize data between clients and the server!


        $scope.login = function() {
            ref.authWithPassword({
                    email: $scope.newUser.email,
                    password: $scope.newUser.password
                },

                authHandler);

        }

        $scope.logout = function() {
            ref.unauth();

        }




        // Create a callback which logs the current auth state
        function authHandler(error, authData) {

            if (authData) {

                if (error) {
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            toastr.error("The specified user account email is invalid.");
                            break;
                        case "INVALID_PASSWORD":
                            toastr.error("The specified user account password is incorrect.");
                            break;
                        case "INVALID_USER":
                            toastr.error("The specified user account does not exist.");
                            break;
                        default:
                            toastr.error("Error logging user in:", error);
                    }
                }

                console.log("User " + authData.uid + " is logged in with " + authData.provider, authData);
                toastr.success("User " + authData.uid + " is logged in with " + authData.provider, 'Authentication');
                $scope.loggedIn = true;
                $scope.status = 'logged in';
                setTimeout(function(){
                  $scope.$apply();
                }, 0);
            } else {
                $scope.loggedIn = false;
                toastr.warning("User is logged out");
                $scope.status = 'logged out';
            }
            //$scope.newUser = {email:'',password:''};

        }

        var ref = new Firebase('https://glaring-inferno-5854.firebaseio.com/');
        var authData = ref.getAuth();
        var sync = $firebase(ref);

        var syncObject = sync.$asObject();

        syncObject.$bindTo($scope, "data");

        ref.onAuth(authHandler);




    });
