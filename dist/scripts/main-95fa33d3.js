"use strict";angular.module("firstApp",["firebase"]),angular.module("firstApp").controller("MainCtrl",["$scope","$firebase",function(e,o){function n(o,n){n?(e.loggedIn=!0,console.log("User "+n.uid+" is logged in with "+n.provider,n),e.newUser.email=""):(e.loggedIn=!1,console.log("User is logged out"))}e.loggedIn=!1,e.login=function(){i.authWithPassword(e.newUser,n)},e.logout=function(){i.unauth(),e.newUser={email:"",password:""}},e.newUser={email:"",password:""};var i=new Firebase("https://glaring-inferno-5854.firebaseio.com/"),s=o(i),r=s.$asObject();r.$bindTo(e,"data"),i.onAuth(n)}]);