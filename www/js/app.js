// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','directivas'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
       url: "/tab",
       abstract: true,
       templateUrl: "templates/tabs.html"
   })

  .state('noLogin', {
      url: '/noLogin',
      abstract: true,
      templateUrl: "templates/noLoginTemplate.html"
  })

  // Each tab has its own nav history stack:

  .state('noLogin.login', {
    url: '/login',
    views: {
      'loginView': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
      .state('noLogin.Registro', {
          url: '/Registro',
          views: {
              'loginView': {
                  templateUrl: 'templates/Registro.html',
                  controller: 'RegistroCtrl'
              }
          }
      })

      .state('tab.Mapa', {
          url: '/Mapa',
          views: {
            'tab-mapa':{
                templateUrl: 'templates/mapa.html',
                controller: 'MapsCtrl'
            }
          }
      })
      .state('tab.rutinas', {
          url: '/rutinas',
          views: {
              'tab-rutinas': {
                  templateUrl: 'templates/rutinas.html',
                  controller: 'RutinasCtrl'
              }
          }
      })
      .state('noLogin.NuevoEjercicio', {
          url: '/NuevoEjercicio',
          views: {
              'loginView': {
                  templateUrl: 'templates/NuevoEjercicio.html',
                  controller: 'NuevoEjercicio'
              }
          }
      })
      .state('tab.perfil', {
          url: '/perfil',
          views: {
              'tab-perfil': {
                  templateUrl: 'templates/perfil.html',
                  controller: 'PerfilCtrl'
              }
          }
      })
      .state('tab.ejercicios', {
          url: '/ejercicios',
          views: {
              'tab-ejercicios': {
                  templateUrl: 'templates/Ejercicios.html',
                  controller: 'EjerciciosCtrl'
              }
          }
      });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/noLogin/login');

});
