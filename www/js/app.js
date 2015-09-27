// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


angular.module('starter', ['ionic' , 'ngCordova' , 'starter.controllers' , 'search.controller', 'login.services'])

.run(function($ionicPlatform, $localstorage, $cordovaToast, $timeout) {

  //Initialize OpenFB
  openFB.init({appId: '864104500304012'});
  
  //local storage
  $localstorage.set('name', 'Users');
  
  $ionicPlatform.ready(function() {
  
	var initalHieght=Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	var widt=0;
	var totalHght=0;
	var hght=0;
		  // for tablets
		if(initalHieght>650){
			document.addEventListener("deviceready", onDeviceReady, false);
			function onDeviceReady()
			{
				
					screen.lockOrientation('landscape');
					//adbuddiz.setAndroidPublisherKey("d658b419-61d2-4d57-b280-518d4ac1c6a3");
					//adbuddiz.cacheAds();
			}
			
			
			document.getElementById('indexNav').style.height='94%';
			
		}
		if(window.AdMob) {
			
			var adMobId = "";
				var admob_key2="";
				// Detect platform
				if ( /(android)/i.test(navigator.userAgent ) ) { // for android
					adMobId = "ca-app-pub-1146997360164478/6062292740";
					admob_key2= "ca-app-pub-1146997360164478/9155359949"; 
					
				} /*else if( /(ipod|iphone|ipad)/i.test(navigator.userAgent) ) { // for ios
					adMobId = "codeForIOS";     
				}*/
				
				

				// Create banner
				if(initalHieght>650){
					document.getElementById('indexNav').style.height='94%';
					 widt=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
					 totalHght=Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
					
					 if(totalHght>1000){
						
						hght=47;
						widt=1280;
						//widt=Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
						
					 }else{
						hght=(totalHght-totalHght*94/100)+3;
					}
					
					//setInterval(window.AdMob.showInterstitial, 3*60*1000);
					
					createCustomBanner();
					
				}
				
				// Create Interstitial
				AdMob.prepareInterstitial( {adId:admob_key2, autoShow: false} );
				
				
				
            }
			function createCustomBanner(){
				
				window.AdMob.createBanner({
						adId: adMobId, 
						position: AdMob.AD_POSITION.BOTTOM_CENTER, 
						adSize:'CUSTOM', 
						width:widt, 
						height:hght,
						overlap:true, 
						autoShow: true });
			}
			var totalHght=Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			window.addEventListener('orientationchange', doOnOrientationChange);
		
			function doOnOrientationChange()
			  {
				switch(window.orientation) 
				{  
				  case -90:
				  case 90:
					
						document.getElementById('indexNav').style.height='91%';
							
						if(document.getElementById('map_canvas')){
							document.getElementById('map_canvas').style.height='calc(100vh - 169px)';
						}
						if(document.getElementById('map_canvas1')){
							document.getElementById('map_canvas1').style.height='calc(100vh - 71px)';
						}
					
					break; 
				  default:
					
					 if(totalHght>1000){
					 		
						document.getElementById('indexNav').style.height='93%';
						if(document.getElementById('map_canvas')){
							document.getElementById('map_canvas').style.height='calc(100vh - 198px)';
						}
						if(document.getElementById('map_canvas1')){
							document.getElementById('map_canvas1').style.height='calc(100vh - 97px)';
						}
						
					 }else{
					document.getElementById('indexNav').style.height='91.5%';
					
					if(document.getElementById('map_canvas')){
						document.getElementById('map_canvas').style.height='calc(100vh - 179px)';
					}
					if(document.getElementById('map_canvas1')){
						document.getElementById('map_canvas1').style.height='calc(100vh - 89px)';
					}
				  
				  }
				  break;
				}
			  } 
			  
			  
			
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

	if(window.Connection) {
		if(navigator.connection.type == Connection.NONE) {
			$cordovaToast
				.show('No internet connection detected.\nPlease enable it from Settings on your device before continue...', 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
					ionic.Platform.exitApp();
				}, 5000);
				 
				}, function (error) {
				  // error
				})
			.then(function(result) {
				if(!result) {
					//result
				}
			});
		}
	}
	
  });
})



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
		controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.country', {
    url: "/country",
	params:{edit:{}, country:{},countryRegion:{},eventVenue:{},venue:{},category:{},dateFrom:{},dateTo:{}},
    views: {
      'menuContent': {
        templateUrl: "templates/country.html",
		controller: 'countryCtrl'
      }
    }
  })
  
  .state('app.search', {
    url: "/search",
	cache: false,
	params:{country:{}, location:{}, within:{}, locality:{}, locationCountry:{},edit:{}, countryRegion:{},eventVenue:{},venue:{},category:{},dateFrom:{},dateTo:{}},
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
		controller: 'genralSearchCtrl'
      }
    }
  })

  .state('app.venue', {
    url: "/venue",
	//cache: false,
	params:{country:{}, location:{}, within:{}, locality:{}, locationCountry:{},edit:{}, countryRegion:{},eventVenue:{},venue:{},category:{},dateFrom:{},dateTo:{}},
    views: {
      'menuContent': {
        templateUrl: "templates/venues.html",
		controller: 'venueCtrl'
      }
    }
  })
  
    .state('app.categories', {
      url: "/categories",
	  cache: false,
	  params:{ noData: {}, category:{}, country:{}, moreCategory:{},location:{}, within:{},locality:{}, locationCountry:{}},
      views: {
        'menuContent': {
          templateUrl: "templates/categories.html",
          controller: 'CategoryListCtrl'
        }
      }
    })
		
	.state('app.create-event', {
		url: "/create-event",
		views: {
		  'menuContent': {
			templateUrl: "templates/create-event.html"
		  }
		}
	})
	
	.state('app.more-category', {
		url: "/categories/more-category",
		params:{ noData: {}, category:{}, country:{}, moreCategory:{}, location:{}, within:{},locality:{}, locationCountry:{}},
		views: {
		  'menuContent': {
			templateUrl: "templates/more-category.html",
			controller: 'MoreCategoryCtrl'
		  }
		}
	})
	
	.state('app.search-service', {
		url: "/categories/search-service",
		//cache: false,
		params:{ catSel: {}, country:{}, location:{}, within:{},locality:{}, locationCountry:{},dateTo:{}, dateFrom:{}, genSearch:{}, countryRegion:{}, eventVenue:{}, venue:{},  
		dateFrom:{}, dateTo:{}, dateSearchFrom:{}, dateSearchTo:{},venueId:{}, moreCategory:{},browseSearch:{},venues:{}},
		views: {
		  'menuContent': {
			templateUrl: "templates/search-service.html",
			controller: 'SearchCtrl'
		  }
		}
	})
	
	.state('app.search-desc', {
		url: "/categories/search-desc",
		//cache: false,
		params:{ event: {}},
		views: {
		  'menuContent': {
			templateUrl: "templates/event-description.html",
			controller: 'SearchDescCtrl'
		  }
		}
	})
	
	.state('app.select-region', {
		url: "/select-region",
		params:{edit:{}, location:{}, within:{},locality:{}, locationCountry:{}, countryRegion:{},eventVenue:{},venue:{},category:{},dateFrom:{},dateTo:{}},
		cache: false,
		views: {
		  'menuContent': {
			templateUrl: "templates/region.html",
			controller: 'regionMapCtrl'
		  }
		}
	})
	
	.state('app.locate-event', {
		url: "/categories/locate-event",
		cache: false,
		params: {searchType:{}, venue:{}, venueAddress:{}, postalCode:{}, lat:{}, lng:{}, allVenues:{},catSel:{},location:{},within:{}, locality:{}, locationCountry:{}},
		views: {
		  'menuContent': {
			templateUrl: "templates/event-map.html",
			controller: 'eventMapCtrl'
		  }
		}
	})
	
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/categories');
  $urlRouterProvider.otherwise('/app/login');
});
