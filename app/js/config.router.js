/**
 * Config for the router
 */
angular.module('app')
  
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('/home');

          $stateProvider
              .state('app.home', {
                url: "/home",
                templateUrl: 'tpl/home.html'

              })    
              .state('app', {
                  url: '/app',  
                  abstract: true,
                  templateUrl: 'tpl/app.html'
              })
              .state('resume', {
                  url: '/resume',  
                  templateUrl: 'tpl/resume.html'
              })
              .state('works', {
                  url: '/works',  
                  templateUrl: 'tpl/works.html'
              })
              .state('parallax', {
                  url: '/parallax',  
                  templateUrl: 'tpl/parallax.html'
              })
              .state('portfolio', {
                  url: '/portfolio',  
                  templateUrl: 'tpl/portfolio.html'
              })
              .state('VC', {
                  url: '/VC',  
                  templateUrl: 'tpl/VC.html'
              })
              .state('home.blog', {
                  url: '/blog',  
                  templateUrl: 'tpl/blog.html'
              })
              .state('about', {
                  url: '/about',  
                  templateUrl: 'tpl/about.html'
              })
              .state('contact', {
                  url: '/contact',  
                  templateUrl: 'tpl/contact.html'
              })
             
              .state('app.dashboard-v1', { //Parent.dashboard (child)
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })
              
              
             
      }
    ]
  );