angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $cordovaToast, LoginService, $localstorage, $stateParams, $ionicSideMenuDelegate, $ionicPopup, $cordovaDatePicker, $ionicHistory, $ionicPopover,$cordovaOauth ) {
  
  $scope.countryData = {};
  
  $scope.loginData={};
  $scope.loginData.username='';
  $scope.loginData.password='';
  
  $scope.newLogin ={};
  $scope.newLogin.country='United Kingdom';
  $scope.newLogin.name='';
  $scope.newLogin.surname='';
  $scope.newLogin.userName='';
  $scope.newLogin.password='';
  $scope.newLogin.confirmPassword='';
   
  $scope.oldLogin ={};
  $scope.oldLogin.country='';
  $scope.oldLogin.name='';
  $scope.oldLogin.surname='';
  $scope.oldLogin.userName='';
  $scope.oldLogin.password='';
  $scope.oldLogin.confirmPassword='';
  
  $scope.myPassword='';
    
	//for phone login
	var user; 
	
	//for FB login
	$scope.user={};
	$scope.user.gender='';
	$scope.user.name='';
	$scope.friends='';
	$scope.fbLoggedIn=true;
	
	$scope.countryToBrows='';
	$scope.changeUserDetailNotClicked=true;
	$scope.newLoginCountries=[
				{name:'Afghanistan'},
				{name:'Albania'},
				{name:'Algeria'},
				{name:'Andorra'},
				{name:'Angola'},
				{name:'Antigua & Deps'},
				{name:'Argentina'},
				{name:'Armenia'},
				{name:'Australia'},
				{name:'Austria'},
				{name:'Azerbaijan'},
				{name:'Bahamas'},
				{name:'Bahrain'},
				{name:'Bangladesh'},
				{name:'Barbados'},
				{name:'Belarus'},
				{name:'Belgium'},
				{name:'Belize'},
				{name:'Benin'},
				{name:'Bhutan'},
				{name:'Bolivia'},
				{name:'Bosnia Herzegovina'},
				{name:'Botswana'},
				{name:'Brazil'},
				{name:'Brunei'},
				{name:'Bulgaria'},
				{name:'Burkina'},
				{name:'Burundi'},
				{name:'Cambodia'},
				{name:'Cameroon'},
				{name:'Canada'},
				{name:'Cape Verde'},
				{name:'Central African Rep'},
				{name:'Chad'},
				{name:'Chile'},
				{name:'China'},
				{name:'Colombia'},
				{name:'Comoros'},
				{name:'Congo'},
				{name:'Congo - Democratic Rep'},
				{name:'Costa Rica'},
				{name:'Croatia'},
				{name:'Cuba'},
				{name:'Cyprus'},
				{name:'Czech Republic'},
				{name:'Denmark'},
				{name:'Djibouti'},
				{name:'Dominica'},
				{name:'Dominican Republic'},
				{name:'East Timor'},
				{name:'Ecuador'},
				{name:'Egypt'},
				{name:'El Salvador'},
				{name:'Equatorial Guinea'},
				{name:'Eritrea'},
				{name:'Estonia'},
				{name:'Ethiopia'},
				{name:'Fiji'},
				{name:'Finland'},
				{name:'France'},
				{name:'Gabon'},
				{name:'Gambia'},
				{name:'Georgia'},
				{name:'Germany'},
				{name:'Ghana'},
				{name:'Greece'},
				{name:'Grenada'},
				{name:'Guatemala'},
				{name:'Guinea'},
				{name:'Guinea-Bissau'},
				{name:'Guyana'},
				{name:'Haiti'},
				{name:'Honduras'},
				{name:'Hungary'},
				{name:'Iceland'},
				{name:'India'},
				{name:'Indonesia'},
				{name:'Iran'},
				{name:'Iraq'},
				{name:'Ireland - Republic'},
				{name:'Israel'},
				{name:'Italy'},
				{name:'Ivory Coast'},
				{name:'Jamaica'},
				{name:'Japan'},
				{name:'Jordan'},
				{name:'Kazakhstan'},
				{name:'Kenya'},
				{name:'Kiribati'},
				{name:'Korea North'},
				{name:'Korea South'},
				{name:'Kosovo'},
				{name:'Kuwait'},
				{name:'Kyrgyzstan'},
				{name:'Laos'},
				{name:'Latvia'},
				{name:'Lebanon'},
				{name:'Lesotho'},
				{name:'Liberia'},
				{name:'Libya'},
				{name:'Liechtenstein'},
				{name:'Lithuania'},
				{name:'Luxembourg'},
				{name:'Macedonia'},
				{name:'Madagascar'},
				{name:'Malawi'},
				{name:'Malaysia'},
				{name:'Maldives'},
				{name:'Mali'},
				{name:'Malta'},
				{name:'Marshall Islands'},
				{name:'Mauritania'},
				{name:'Mauritius'},
				{name:'Mexico'},
				{name:'Micronesia'},
				{name:'Moldova'},
				{name:'Monaco'},
				{name:'Mongolia'},
				{name:'Montenegro'},
				{name:'Morocco'},
				{name:'Mozambique'},
				{name:'Myanmar - Burma'},
				{name:'Namibia'},
				{name:'Nauru'},
				{name:'Nepal'},
				{name:'Netherlands'},
				{name:'New Zealand'},
				{name:'Nicaragua'},
				{name:'Niger'},
				{name:'Nigeria'},
				{name:'Norway'},
				{name:'Oman'},
				{name:'Pakistan'},
				{name:'Palau'},
				{name:'Panama'},
				{name:'Papua New Guinea'},
				{name:'Paraguay'},
				{name:'Peru'},
				{name:'Philippines'},
				{name:'Poland'},
				{name:'Portugal'},
				{name:'Qatar'},
				{name:'Romania'},
				{name:'Russian Federation'},
				{name:'Rwanda'},
				{name:'St Kitts & Nevis'},
				{name:'St Lucia'},
				{name:'Saint Vincent & the Grenadines'},
				{name:'Samoa'},
				{name:'San Marino'},
				{name:'Sao Tome & Principe'},
				{name:'Saudi Arabia'},
				{name:'Senegal'},
				{name:'Serbia'},
				{name:'Seychelles'},
				{name:'Sierra Leone'},
				{name:'Singapore'},
				{name:'Slovakia'},
				{name:'Slovenia'},
				{name:'Solomon Islands'},
				{name:'Somalia'},
				{name:'South Africa'},
				{name:'South Sudan'},
				{name:'Spain'},
				{name:'Sri Lanka'},
				{name:'Sudan'},
				{name:'Suriname'},
				{name:'Swaziland'},
				{name:'Sweden'},
				{name:'Switzerland'},
				{name:'Syria'},
				{name:'Taiwan'},
				{name:'Tajikistan'},
				{name:'Tanzania'},
				{name:'Thailand'},
				{name:'Togo'},
				{name:'Tonga'},
				{name:'Trinidad & Tobago'},
				{name:'Tunisia'},
				{name:'Turkey'},
				{name:'Turkmenistan'},
				{name:'Tuvalu'},
				{name:'Uganda'},
				{name:'Ukraine'},
				{name:'United Arab Emirates'},
				{name:'United Kingdom'},
				{name:'United States'},
				{name:'Uruguay'},
				{name:'Uzbekistan'},
				{name:'Vanuatu'},
				{name:'Vatican City'},
				{name:'Venezuela'},
				{name:'Vietnam'},
				{name:'Yemen'},
				{name:'Zambia'},
				{name:'Zimbabwe'}

	];
	
	
	var regionL;
	var countryL;
	
  
  $ionicPopover.fromTemplateUrl('templates/changeUserDetailPopover.html', {
    scope: $scope,
  }).then(function(popover) {
	
		$scope.popover = popover;
		$scope.changeUserPopover=$scope.popover;
	
	
  });
  
  $scope.menuToggle=function(){
		$ionicSideMenuDelegate.toggleLeft();
	}
	
  $scope.launchRegion= function(){
		$localstorage.get('name', 'Users');
		regionL=$localstorage.getObject('region');
		
		if(!(angular.equals({},regionL ))){
			$state.go('app.select-region', {location:regionL.location, within:regionL.within});
		}else{
			$state.go('app.select-region');
		}
	
  }
  $scope.hideMenu = function() {
	
		document.getElementById("side-menu").style.visibility="hidden";	
		$state.go('app.select-region');
	};
	
	$scope.goBack = function() {
	$ionicHistory.goBack();
	
	}
	
	$scope.hideOldUser= function(myPassword){
		$localstorage.get('name', 'Users');
		var user = $localstorage.getObject('user');
		if((user.password===myPassword)){
			$scope.changeUserPopover.hide();
			$scope.myPassword='';
			$scope.changeUserPopover='';
			document.getElementById("editUser").disabled=true;
				
				document.getElementById("newUser").style.display='none';
				document.getElementById("login").style.display='none';
				document.getElementById("loginBtn").style.display='none';			
				document.getElementById("oldUser").style.display='block';
				
			  $scope.oldLogin.country=user.country;
			  $scope.oldLogin.name=user.name;
			  $scope.oldLogin.surname=user.surname;
			  $scope.oldLogin.userName=user.userName;
			  $scope.oldLogin.password=user.password;
			  $scope.oldLogin.confirmPassword=user.confirmPassword;
				
			
		}else{
				$cordovaToast
					.show('Wrong Password, please try again.', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					}, 3000);
					 
					}, function (error) {
					  // error
					})
		
		}
		$scope.myPassword='';
	}
	$scope.hideLogin= function(){
			
		$scope.changeUserPopover=$scope.popover;
		$localstorage.get('name', 'Users');
		var user = $localstorage.getObject('user');
		if(angular.equals({},user)){
			document.getElementById("newUser").style.display='block';
			document.getElementById("login").style.display='none';	
			document.getElementById("loginBtn").style.display='none';
			document.getElementById("oldUser").style.display='none';
		}else{
			document.getElementById("login").style.display='block';	
			document.getElementById("loginBtn").style.display='block';
			document.getElementById("oldUser").style.display='none';
			document.getElementById("newUser").style.display='none';
			$cordovaToast
					.show('User '+user.userName+' already registered on Eventula.\nPlese continue login.', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					}, 5000);
					 
					}, function (error) {
					  // error
					})
		}
	}
	
	$scope.hideNewUser= function(){
		document.getElementById("newUser").style.display='none';	
		document.getElementById("login").style.display='block';
		document.getElementById("loginBtn").style.display='block';
		document.getElementById("oldUser").style.display='none';
		$scope.changeUserPopover=$scope.popover;
	}
	
	$scope.redirectCountry=function(){
		$localstorage.get('name', 'Users');
	
		countryL=$localstorage.getObject('country');
		
		// to avoid "$digest is already in progress" error
		 $timeout(function(){
			$state.go('app.country',{country:countryL.userCountry} );
			
		});
	}
	$scope.redirectSearch=function(){
		$state.go('app.search');
	}
	
	$scope.redirectVenue=function(){
		
		
		$localstorage.get('name', 'Users');
		countryL=$localstorage.getObject('country');
		regionL=$localstorage.getObject('region');
		
		if(!(angular.equals({},countryL))){
		$cordovaToast
					.show('Please select any specific region in "Select Region" to have precise result', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
						redirectCategory();
						
					}, 3000);
					 
					}, function (error) {
					  // error
					});
			
		}else if(!(angular.equals({},regionL))){
				
			$state.go('app.venue',{country:'',location:regionL.location,within:regionL.within, locality:regionL.locality, locationCountry:regionL.locationCountry});

		}
	}
	
	$scope.logoff=function(){
		$localstorage.get('name', 'Users');
		$localstorage.setObject('region', {});
		$localstorage.setObject('country', {});
		
		$state.go('app.login');
		document.addEventListener("deviceready", function () {
			$cordovaToast
					.show('Exiting Eventula...', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
						ionic.Platform.exitApp();
					}, 3000);
					 
					}, function (error) {
					  // error
					})
		},false	)		
			
	}
	
	
	$scope.doLogin = function() {
	
		$localstorage.get('name', 'Users');
		$localstorage.setObject('region', {});
		
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
		}else{
	
			$localstorage.get('name', 'Users');
			user = $localstorage.getObject('user');
			
			if(($scope.loginData.username==='')|| ($scope.loginData.password==='')){
				$cordovaToast
					.show('Please enter your credentials', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
			}else if((user.userName===$scope.loginData.username)&&(user.password===$scope.loginData.password)){
				
				$scope.countryToBrows=user.country;
				
				$localstorage.get('name', 'Users');
				$localstorage.setObject('region', {});
				$localstorage.setObject('country', {
				userCountry:user.country
				});
				countryL=$localstorage.getObject('country');
				$state.go('app.categories',{country:user.country});
				
				
			}else{
				$cordovaToast
					.show('Login Failed \nPlease check your credentials', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
			
			}
		}
	}
    	
    }
	
	$scope.createLogin= function(modified) {
	
	$localstorage.get('name', 'Users');
	$localstorage.setObject('region', {});
	var userModified =modified;
	
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
				}
			});
		}else{
			if(userModified==='false'){
				if(($scope.newLogin.name==='')|| ($scope.newLogin.surname==='') || ($scope.newLogin.userName==='') || ($scope.newLogin.password==='') || ($scope.newLogin.confirmPassword==='')){
					$cordovaToast
						.show('All data are mandatory. \nPlease input all required information', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						 
						}, 3000);
						 
						}, function (error) {
						  // error
						});
				}else{
					if($scope.newLogin.password!==$scope.newLogin.confirmPassword){
						$cordovaToast
						.show('Password does not match with Confirm Password. \nPlease try again', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						 
						}, 3000);
						 
						}, function (error) {
						  // error
						});
					}else{
						$scope.countryToBrows=$scope.newLogin.country;
						
						$localstorage.get('name', 'Users');
						 $localstorage.setObject('user', {
						country:$scope.newLogin.country,
						name: $scope.newLogin.name,
						surname: $scope.newLogin.surname,
						userName: $scope.newLogin.userName,
						password: $scope.newLogin.password,
						confirmPassword:$scope.newLogin.confirmPassword
					
						
					});
					$localstorage.setObject('country', {
							userCountry:$scope.newLogin.country
						});
				  
				  
				$scope.changeUserPopover=$scope.popover;				
			    $cordovaToast
						.show('Welcome ' + $scope.newLogin.name +' !!! \nYour user has now been created successfully.\nPlease continue login.', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						 
						}, 3000);
						 
						}, function (error) {
						  // error
						});
						$scope.hideNewUser();
						$scope.newLogin.country='';
					  $scope.newLogin.name='';
					  $scope.newLogin.surname='';
					  $scope.newLogin.userName='';
					  $scope.newLogin.password='';
					  $scope.newLogin.confirmPassword='';
					}
				}
				
			}else{
				
				if(($scope.oldLogin.name==='')|| ($scope.oldLogin.surname==='') || ($scope.oldLogin.userName==='') || ($scope.oldLogin.password==='') || ($scope.oldLogin.confirmPassword==='')){
					$cordovaToast
						.show('All data are mandatory. \nPlease input all required information', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						 
						}, 3000);
						 
						}, function (error) {
						  // error
						});
				}else{
					if($scope.oldLogin.password!==$scope.oldLogin.confirmPassword){
						$cordovaToast
						.show('Password does not match with Confirm Password. \nPlease try again', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						 
						}, 3000);
						 
						}, function (error) {
						  // error
						});
					}else{
						$scope.countryToBrows=$scope.oldLogin.country;
						
						$localstorage.get('name', 'Users');
						 $localstorage.setObject('user', {
						country:$scope.oldLogin.country,
						name: $scope.oldLogin.name,
						surname: $scope.oldLogin.surname,
						userName: $scope.oldLogin.userName,
						password: $scope.oldLogin.password,
						confirmPassword:$scope.oldLogin.confirmPassword
					
						
					});
					$localstorage.setObject('country', {
							userCountry:$scope.oldLogin.country
						});
				  
				  
				$scope.changeUserPopover=$scope.popover;
			   $cordovaToast
						.show('User ' + $scope.oldLogin.name +' detail has been updated successfully. \nPlease continue login.', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						}, 3000);
						 
						}, function (error) {
						  // error
						});
						$scope.hideNewUser();
						$scope.oldLogin.country='';
					  $scope.oldLogin.name='';
					  $scope.oldLogin.surname='';
					  $scope.oldLogin.userName='';
					  $scope.oldLogin.password='';
					  $scope.oldLogin.confirmPassword='';
					  
					  $scope.myPassword='';
					}
				}
			}
		}
	}
	
	$scope.fbLogin = function() {
	
	$localstorage.get('name', 'Users');
	$localstorage.setObject('region', {});
	
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
				}
			});
		}else{
		
		openFB.login(
			function(response) {
				if (response.status === 'connected') {
					if(!$scope.fbLoggedIn){
						$scope.fbLoggedIn=true;
						//$scope.getFBUserFriends();
						
					}else{
						getFBUser();
					}
				} else {
					$cordovaToast
					.show('Facebook login failed', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
				}
			},
			//{scope: 'email,publish_actions,user_location,user_hometown, user_friends'}
			{scope: 'email,publish_actions,user_location'});
		}
	}
	
	var getFBUser= function(){
		
		openFB.api({
				path: '/me',
				
				success: function (user) {
					if(user.location){
						$scope.user = user;
						$scope.countryToBrows=$scope.user.location.name;
						
						$localstorage.get('name', 'Users');
						$localstorage.setObject('country', {
						userCountry:$scope.user.location.name
						});
						
						$state.go('app.categories',{country:$scope.user.location.name});
					}else{
						$cordovaToast
						.show("No current location listed in your Timeline.\nPlease update your Facebook profile to continue login", 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						 
						}, 3000);
						 
						}, function (error) {
						  // error
						});
					}
				},
				error: function (error) {
					$cordovaToast
					.show("Error while retrieving your Facebook profile", 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
				}
			});
			
		
	}
	
	$scope.getFBUserFriends= function(){
		openFB.getLoginStatus(
			function(loginStatus){
			if (loginStatus.status === 'connected') {
				openFB.api({
						path: '/me/friends',
						
						success: function (user) {
							
							$scope.user = user;
							$scope.friends = user.data;
							$state.go('app.categories',{country:$scope.user.location.name});
						},
						error: function (error) {
							$cordovaToast
							.show("Error while retrieving your Facebook profile", 'long', 'center')
							.then(function(success) {
							  // success
							  $timeout(function() {
							 
							}, 3000);
							 
							}, function (error) {
							  // error
							});
						}
					});
			}else{
				$scope.fbLoggedIn=false;
				$scope.fbLogin();
				//$scope.getFBUserFriends();	
			}
		});	
		
	}
		
		
	
	$scope.redirectCategory=function(){
	
		$localstorage.get('name', 'Users');
		countryL=$localstorage.getObject('country');
		regionL=$localstorage.getObject('region');
		if(!(angular.equals({},countryL))){
			$state.go('app.categories',{country:countryL.userCountry,location:'',within:''});
		
		}else if(!(angular.equals({},regionL))){
			$state.go('app.categories',{country:'',location:regionL.location,within:regionL.within, locality:regionL.locality, locationCountry:regionL.locationCountry});
	
		}
	}
	
	$scope.redirectBrowse=function(){
		
		$localstorage.get('name', 'Users');
		countryL=$localstorage.getObject('country');
		regionL=$localstorage.getObject('region');
		
		if(!(angular.equals({},countryL))){
			$state.go('app.search-service',{browseSearch:'yes',catSel:'All...',country:countryL.userCountry,location:'',within:''});
			
		}else if(!(angular.equals({},regionL))){
				
			$state.go('app.search-service',{browseSearch:'yes',catSel:'All...',country:'',location:regionL.location,within:regionL.within, locality:regionL.locality, locationCountry:regionL.locationCountry});

		}
	}
	
	
	// GOOGLE login
	 $scope.googleLogin = function() {

        $cordovaOauth.google("897698087626-4ua6qe0ec6t20i37no52p06vfltncvm8.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            alert(JSON.stringify(result));
        }, function(error) {
            alert(error);
        });
    }

	
})

.controller('genralSearchCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $cordovaToast, LoginService, $localstorage, $stateParams, $ionicSideMenuDelegate, $ionicPopup, $cordovaDatePicker, $ionicHistory, $ionicPopover ) 
{
	
	$scope.countryToBrows=''
	$scope.countryRegion={};
	$scope.countryRegion.opt='country';
	
	$scope.eventVenue;
	
	$scope.regionLocation='';
	$scope.regionSelected='';
	$scope.regionLocality='';
	$scope.regionCountry='';

	$scope.countryRegionChange='xxx';
	$scope.searchCountry;
	$scope.searchVenue;
	$scope.dateFrom;
	$scope.dateTo;
	$scope.searchCategory={};
	$scope.searchCategory.opt='All';
	
	var date=new Date();
	var day = date.getDate();
	var dayTo = date.getDate()+1;
	var month=date.getMonth()+1;
	var year = date.getFullYear();
	if (dayTo.toString().length===1){
				dayTo='0'+dayTo;
			}
	if (day.toString().length===1){
				day='0'+day;
			}
	if (month.toString().length===1){
				month='0'+month;
			}
	$scope.dateFrom =day+"-"+month+"-"+year;
	$scope.dateSaerchFrom=year+""+month+""+day+"00";
	
	$scope.dateTo =dayTo+"-"+month+"-"+year;
	$scope.dateSaerchTo=year+""+month+""+dayTo+"00";
	
	if($stateParams.edit==='yes'){
		if(!(angular.equals({},$stateParams.country))){
			$scope.countryToBrows=$stateParams.country;
		}
		if(!(angular.equals({},$stateParams.location ))){
			$scope.regionLocation=$stateParams.location;
		}
		if(!(angular.equals({},$stateParams.within))){
			$scope.regionSelected=$stateParams.within;
		}
		if(!(angular.equals({},$stateParams.locality))){
			$scope.regionLocality=$stateParams.locality;
		}
		if(!(angular.equals({},$stateParams.locationCountry))){
			$scope.regionCountry=$stateParams.locationCountry;
		}
		
		if(!(angular.equals({},$stateParams.countryRegion))){
			
			$scope.countryRegion.opt=$stateParams.countryRegion;
		}
		if(!(angular.equals({},$stateParams.eventVenue ))){
			$scope.eventVenue=$stateParams.eventVenue;
		}
		if(!(angular.equals({},$stateParams.venue))){
			$scope.venue=$stateParams.venue;
		}
		if(!(angular.equals({},$stateParams.category))){
			$scope.searchCategory.opt=$stateParams.category;
		}
		if(!(angular.equals({},$stateParams.dateFrom ))){
			$scope.dateFrom=$stateParams.dateFrom;
			$scope.dateSaerchFrom=$stateParams.dateFrom.substring($stateParams.dateFrom.lastIndexOf("-")+1)+""+
									$stateParams.dateFrom.substring($stateParams.dateFrom.indexOf("-")+1,$stateParams.dateFrom.indexOf("-")+3)+""+
									$stateParams.dateFrom.substring(0,2)+"00";
		}
			
		
		if(!(angular.equals({},$stateParams.dateTo))){
			$scope.dateTo=$stateParams.dateTo;
			$scope.dateSaerchTo=$stateParams.dateTo.substring($stateParams.dateTo.lastIndexOf("-")+1)+""+
									$stateParams.dateTo.substring($stateParams.dateTo.indexOf("-")+1,$stateParams.dateTo.indexOf("-")+3)+""+
									$stateParams.dateTo.substring(0,2)+"00";
		}
		
		
		if(!(angular.equals({},$stateParams.edit))){
			$scope.edit=$stateParams.edit;
		}
		
	}else{
		$localstorage.get('name', 'Users');
		var countryL=$localstorage.getObject('country');
		var regionL=$localstorage.getObject('region');
		if(!(angular.equals({},countryL))){
			$scope.countryToBrows=countryL.userCountry;
		
		}else {
			$scope.countryToBrows='No country selected';
		}
		if(!(angular.equals({},regionL))){
			
			$scope.regionLocation=regionL.location;
			$scope.regionSelected=regionL.within;
			$scope.regionLocality=(regionL.locality)?regionL.locality:regionL.locationCountry;
			$scope.regionCountry=(regionL.locality)?regionL.locationCountry:'';
			
		}else{
			$scope.regionLocation='No region selected';
			$scope.regionSelected='';
			$scope.regionLocality='No region selected';
			$scope.regionCountry='';
			
		}
	}
	
	$scope.editCountry = function() {
		$state.go('app.country',{edit:'yes',
								country:$scope.countryToBrows,
								countryRegion:$scope.countryRegion.opt,
								eventVenue:$scope.eventVenue,
								venue:$scope.searchVenue,
								category:$scope.searchCategory.opt,
								dateFrom: $scope.dateFrom,
								dateTo:$scope.dateTo
				});
	}

	$scope.editRegion = function() {
		$state.go('app.select-region',{edit:'yes',
								location:$scope.regionLocation, 
								within:$scope.regionSelected,
								locality:$scope.regionLocality, 
								locationCountry:$scope.regionCountry, 
								countryRegion:$scope.countryRegion.opt,
								eventVenue:$scope.eventVenue,
								venue:$scope.searchVenue,
								category:$scope.searchCategory.opt,
								dateFrom: $scope.dateFrom,
								dateTo:$scope.dateTo
		});
	}
	
	$scope.resetSearch=function(){
		$scope.countryRegion={};
		$scope.eventVenue='';
		$scope.searchCountry='';
		$scope.searchVenue='';
		$scope.searchCategory={};
		$scope.dateFrom='';
		$scope.dateTo='';
	}
	
	
	$scope.openDatePickerFrom = function() {
    
	var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };

  document.addEventListener("deviceready", function () {

    $cordovaDatePicker.show(options).then(function(date){
    	var day = date.getDate();
		var month=date.getMonth()+1;
		var year = date.getFullYear();
		if (day.toString().length===1){
					day='0'+day;
				}
		if (month.toString().length===1){
					month='0'+month;
				}
		var dateString =day+"-"+month+"-"+year;
		$scope.dateSaerchFrom=year+""+month+""+day+"00";
		$scope.dateFrom=dateString;
		
		
    });

  }, false);
		
  }
  
  $scope.openDatePickerTo = function() {
    
	var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };

  document.addEventListener("deviceready", function () {

    $cordovaDatePicker.show(options).then(function(date){
    	var day = date.getDate();
		var month=date.getMonth()+1;
		var year = date.getFullYear();
		
		if (day.toString().length===1){
					day='0'+day;
				}
		if (month.toString().length===1){
					month='0'+month;
				}
		var dateString =day+"-"+month+"-"+year;		
		$scope.dateSaerchTo=year+""+month+""+day+"00";
		$scope.dateTo=dateString;
		
		
    });

  }, false);
		
  }
  
  $scope.doSearch=function(){
  if($scope.countryRegion.opt!==''){
	if($scope.countryRegion.opt==='country'){
		if($scope.countryToBrows==='' || $scope.countryToBrows==='No country selected'){
			$cordovaToast
					.show('Please select any country to continue...', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
		}else{
			$state.go('app.search-service',{genSearch:'yes',
										catSel:$scope.searchCategory.opt,
										country:$scope.countryToBrows,
										dateTo:$scope.dateSaerchTo,
										dateFrom: $scope.dateSaerchFrom,
										dateSearchFrom:$scope.dateFrom,
										dateSearchTo:$scope.dateTo,
										countryRegion:$scope.countryRegion.opt,
										eventVenue:$scope.eventVenue,
										venue:$scope.searchVenue
										});
			}
	}else if($scope.countryRegion.opt==='region'){
		if($scope.regionLocation==='' || $scope.regionLocation==='No region selected'){
			$cordovaToast
					.show('Please select any region to continue...', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
		}else{
			$state.go('app.search-service',{genSearch:'yes',
										catSel:$scope.searchCategory.opt,
										location:$scope.regionLocation,
										within:$scope.regionSelected,
										locality:$scope.regionLocality,
										locationCountry:$scope.regionCountry,
										dateTo:$scope.dateSaerchTo,
										dateFrom: $scope.dateSaerchFrom,
										dateSearchFrom:$scope.dateFrom,
										dateSearchTo:$scope.dateTo,
										countryRegion:$scope.countryRegion.opt,
										eventVenue:$scope.eventVenue,
										venue:$scope.searchVenue
										});
			}
		}
	}else{
		
		$cordovaToast
			.show('Please select Search By to continue...', 'long', 'center')
			.then(function(success) {
			  // success
			  $timeout(function() {
			 
			}, 3000);
			 
			}, function (error) {
			  // error
			});

	}
	
  }
  
})

.controller('venueCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $cordovaToast, $ionicHistory, $ionicPopover, $stateParams, $ionicLoading) {


	 $scope.searchBy;
	 $scope.country={};
	 $scope.country.selected='';
	 $scope.location={};
	 $scope.location.selected='';
	 $scope.location.within='';
	 $scope.filterByText='';
	 
	 $scope.venues=[];
	 $scope.positions=[];
	 
	 var pageNumber=1;
	 var totalPageCount=1;
	
	var errMsg='';	
	
	$ionicPopover.fromTemplateUrl('templates/venuePopover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
	
  });
    $scope.clearFilterText = function() {
		$scope.filterByText='';
	}
 
	$scope.launchVenueMap = function(){
		$scope.popover.hide();
		$state.go('app.locate-event',{searchType:'Venue',allVenues:$scope.venues,catSel:'At Venue',location:$stateParams.location,within:$stateParams.within, locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
	
	}
	var oArgs = {
				app_key: "Th8dPwrbjqBX5ctd",
				location: "", 
				within:"",
				
				page_size: 10,
				sort_order: "relevance",
				
				page_number:pageNumber
			};
			
	if(!(angular.equals({}, $stateParams.country))){
		$scope.country.selected=$stateParams.country;
		$scope.searchBy="Country: "+$stateParams.country;
		oArgs.location= $stateParams.country;
		errMsg='No venues found in '+$stateParams.country +'.\nPlease try another country'
	}
	if(!(angular.equals({}, $stateParams.location))){
		$scope.location.selected=$stateParams.location;
		$scope.location.within=$stateParams.within;
		oArgs.location= $stateParams.location;
		oArgs.within=$stateParams.within;
		errMsg='No venues found in '+$stateParams.locality +', '+$stateParams.locationCountry+'.\nPlease try another region'
		
		if((angular.equals({}, $stateParams.locality))){
			$stateParams.locality='';
		}
		if((angular.equals({}, $stateParams.locationCountry))){
				$stateParams.locationCountry='';
			}
		$scope.searchBy=	 "Region: " + [	$stateParams.locality||"",
									$stateParams.locationCountry||""].join(", ");
			
	}
				
	$scope.loadMore = function (){
	
		if(pageNumber <= totalPageCount){
			
			doSearch();
			pageNumber+=1;
			oArgs.page_number=pageNumber;
		}else{
			
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}	
		
	}
	
	var	doSearch = function(){
				
			EVDB.API.call("/venues/search", oArgs, function(oData) {
						
						var results=oData.venues;
						if(results!==null){
							var venueData= Object.keys(results.venue).map(function(k) { return results.venue[k] });
							
							$timeout(function() {
								$scope.$broadcast('scroll.infiniteScrollComplete');
								}, 1000); 
							
							//above map is same as below
							/*var result = [];
							var keys = Object.keys(events);
							keys.forEach(function(key){
								result.push(events[key]);
							*/	
							totalPageCount=oData.page_count;
							addResultToList(venueData);
						}else{
							$scope.$broadcast('scroll.infiniteScrollComplete');
							
							$cordovaToast
								.show(errMsg, 'long', 'center')
								.then(function(success) {
								  // success
								  $timeout(function() {
									redirectCategory();
								}, 3000);
								 
								}, function (error) {
								  // error
								});
						}
			
		});
	}
	
	var addResultToList = function(venueData){
		for(i=0;i<=venueData.length;i++){
			if(venueData[i].event_count!=='0'){
				$scope.venues.push(venueData[i]);
			}
		
			
		}
	}
	
	$scope.redirectCategory=function(){
		$localstorage.get('name', 'Users');
		var countryL=$localstorage.getObject('country');
		var regionL=$localstorage.getObject('region');
	
		if(!(angular.equals({},countryL))){
			$state.go('app.categories',{country:countryL.userCountry,location:'',within:''});
		
		}else if(!(angular.equals({},regionL))){
			$state.go('app.categories',{country:'',location:regionL.location,within:regionL.within, locality:regionL.locality, locationCountry:regionL.locationCountry});
	
		}
	}
	$scope.redirectSearch = function(venueId){
			if(!(angular.equals({}, $stateParams.country))){
		
				$state.go('app.search-service',{venueId:venueId,catSel:'At Venue',country:$stateParams.country});
				
			}else if(!(angular.equals({}, $stateParams.location))){
		
				$state.go('app.search-service',{venueId:venueId,catSel:'At Venue',location:$stateParams.location,within:$stateParams.within, locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
		}
	}
})

.controller('countryCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $cordovaToast, LoginService, $localstorage, $stateParams, $ionicSideMenuDelegate, $ionicPopup, $cordovaDatePicker, $ionicHistory, $ionicPopover ) 
{
	
	$scope.filterCountry='';
	var countries=[
				{countryName:'Afghanistan'},
				{countryName:'Albania'},
				{countryName:'Algeria'},
				{countryName:'Andorra'},
				{countryName:'Angola'},
				{countryName:'Antigua & Deps'},
				{countryName:'Argentina'},
				{countryName:'Armenia'},
				{countryName:'Australia'},
				{countryName:'Austria'},
				{countryName:'Azerbaijan'},
				{countryName:'Bahamas'},
				{countryName:'Bahrain'},
				{countryName:'Bangladesh'},
				{countryName:'Barbados'},
				{countryName:'Belarus'},
				{countryName:'Belgium'},
				{countryName:'Belize'},
				{countryName:'Benin'},
				{countryName:'Bhutan'},
				{countryName:'Bolivia'},
				{countryName:'Bosnia Herzegovina'},
				{countryName:'Botswana'},
				{countryName:'Brazil'},
				{countryName:'Brunei'},
				{countryName:'Bulgaria'},
				{countryName:'Burkina'},
				{countryName:'Burundi'},
				{countryName:'Cambodia'},
				{countryName:'Cameroon'},
				{countryName:'Canada'},
				{countryName:'Cape Verde'},
				{countryName:'Central African Rep'},
				{countryName:'Chad'},
				{countryName:'Chile'},
				{countryName:'China'},
				{countryName:'Colombia'},
				{countryName:'Comoros'},
				{countryName:'Congo'},
				{countryName:'Congo - Democratic Rep'},
				{countryName:'Costa Rica'},
				{countryName:'Croatia'},
				{countryName:'Cuba'},
				{countryName:'Cyprus'},
				{countryName:'Czech Republic'},
				{countryName:'Denmark'},
				{countryName:'Djibouti'},
				{countryName:'Dominica'},
				{countryName:'Dominican Republic'},
				{countryName:'East Timor'},
				{countryName:'Ecuador'},
				{countryName:'Egypt'},
				{countryName:'El Salvador'},
				{countryName:'Equatorial Guinea'},
				{countryName:'Eritrea'},
				{countryName:'Estonia'},
				{countryName:'Ethiopia'},
				{countryName:'Fiji'},
				{countryName:'Finland'},
				{countryName:'France'},
				{countryName:'Gabon'},
				{countryName:'Gambia'},
				{countryName:'Georgia'},
				{countryName:'Germany'},
				{countryName:'Ghana'},
				{countryName:'Greece'},
				{countryName:'Grenada'},
				{countryName:'Guatemala'},
				{countryName:'Guinea'},
				{countryName:'Guinea-Bissau'},
				{countryName:'Guyana'},
				{countryName:'Haiti'},
				{countryName:'Honduras'},
				{countryName:'Hungary'},
				{countryName:'Iceland'},
				{countryName:'India'},
				{countryName:'Indonesia'},
				{countryName:'Iran'},
				{countryName:'Iraq'},
				{countryName:'Ireland - Republic'},
				{countryName:'Israel'},
				{countryName:'Italy'},
				{countryName:'Ivory Coast'},
				{countryName:'Jamaica'},
				{countryName:'Japan'},
				{countryName:'Jordan'},
				{countryName:'Kazakhstan'},
				{countryName:'Kenya'},
				{countryName:'Kiribati'},
				{countryName:'Korea North'},
				{countryName:'Korea South'},
				{countryName:'Kosovo'},
				{countryName:'Kuwait'},
				{countryName:'Kyrgyzstan'},
				{countryName:'Laos'},
				{countryName:'Latvia'},
				{countryName:'Lebanon'},
				{countryName:'Lesotho'},
				{countryName:'Liberia'},
				{countryName:'Libya'},
				{countryName:'Liechtenstein'},
				{countryName:'Lithuania'},
				{countryName:'Luxembourg'},
				{countryName:'Macedonia'},
				{countryName:'Madagascar'},
				{countryName:'Malawi'},
				{countryName:'Malaysia'},
				{countryName:'Maldives'},
				{countryName:'Mali'},
				{countryName:'Malta'},
				{countryName:'Marshall Islands'},
				{countryName:'Mauritania'},
				{countryName:'Mauritius'},
				{countryName:'Mexico'},
				{countryName:'Micronesia'},
				{countryName:'Moldova'},
				{countryName:'Monaco'},
				{countryName:'Mongolia'},
				{countryName:'Montenegro'},
				{countryName:'Morocco'},
				{countryName:'Mozambique'},
				{countryName:'Myanmar - Burma'},
				{countryName:'Namibia'},
				{countryName:'Nauru'},
				{countryName:'Nepal'},
				{countryName:'Netherlands'},
				{countryName:'New Zealand'},
				{countryName:'Nicaragua'},
				{countryName:'Niger'},
				{countryName:'Nigeria'},
				{countryName:'Norway'},
				{countryName:'Oman'},
				{countryName:'Pakistan'},
				{countryName:'Palau'},
				{countryName:'Panama'},
				{countryName:'Papua New Guinea'},
				{countryName:'Paraguay'},
				{countryName:'Peru'},
				{countryName:'Philippines'},
				{countryName:'Poland'},
				{countryName:'Portugal'},
				{countryName:'Qatar'},
				{countryName:'Romania'},
				{countryName:'Russian Federation'},
				{countryName:'Rwanda'},
				{countryName:'St Kitts & Nevis'},
				{countryName:'St Lucia'},
				{countryName:'Saint Vincent & the Grenadines'},
				{countryName:'Samoa'},
				{countryName:'San Marino'},
				{countryName:'Sao Tome & Principe'},
				{countryName:'Saudi Arabia'},
				{countryName:'Senegal'},
				{countryName:'Serbia'},
				{countryName:'Seychelles'},
				{countryName:'Sierra Leone'},
				{countryName:'Singapore'},
				{countryName:'Slovakia'},
				{countryName:'Slovenia'},
				{countryName:'Solomon Islands'},
				{countryName:'Somalia'},
				{countryName:'South Africa'},
				{countryName:'South Sudan'},
				{countryName:'Spain'},
				{countryName:'Sri Lanka'},
				{countryName:'Sudan'},
				{countryName:'SuricountryName'},
				{countryName:'Swaziland'},
				{countryName:'Sweden'},
				{countryName:'Switzerland'},
				{countryName:'Syria'},
				{countryName:'Taiwan'},
				{countryName:'Tajikistan'},
				{countryName:'Tanzania'},
				{countryName:'Thailand'},
				{countryName:'Togo'},
				{countryName:'Tonga'},
				{countryName:'Trinidad & Tobago'},
				{countryName:'Tunisia'},
				{countryName:'Turkey'},
				{countryName:'Turkmenistan'},
				{countryName:'Tuvalu'},
				{countryName:'Uganda'},
				{countryName:'Ukraine'},
				{countryName:'United Arab Emirates'},
				{countryName:'United Kingdom'},
				{countryName:'United States'},
				{countryName:'Uruguay'},
				{countryName:'Uzbekistan'},
				{countryName:'Vanuatu'},
				{countryName:'Vatican City'},
				{countryName:'Venezuela'},
				{countryName:'Vietnam'},
				{countryName:'Yemen'},
				{countryName:'Zambia'},
				{countryName:'Zimbabwe'}
				
				
	];
	
	$scope.letterSelected='';
	$scope.countriesByLetter=[];
	
	$scope.countryToBrows='';
	
	$scope.countryRegion={};
	$scope.countryRegion.opt='';
	
	$scope.eventVenue;
	$scope.venue;
	
	$scope.regionLocation='';
	$scope.regionSelected='';	

	
	$scope.searchCountry;
	$scope.searchVenue;
	$scope.dateFrom;
	$scope.dateTo;
	$scope.searchCategory={};
	$scope.searchCategory.opt='';
	
	
	$localstorage.get('name', 'Users');
	var	countryLo=$localstorage.getObject('country');
	if(!(angular.equals({},countryLo))){
	
		if(countryLo.userCountry.indexOf(",")!==-1){
			
			$scope.letterSelected=countryLo.userCountry.substring(countryLo.userCountry.indexOf(",")+2,countryLo.userCountry.indexOf(",")+3);
		}else{
			$scope.letterSelected=countryLo.userCountry.substring(0, 1);
		}
	}else{
		$scope.letterSelected='A';
	}
	var keys = Object.keys(countries);
		keys.forEach(function(key){
			if(countries[key].countryName.substring(0, 1)===$scope.letterSelected){
				
				$scope.countriesByLetter.push(countries[key]);
			}
	
		});
	
	$ionicPopover.fromTemplateUrl('templates/countryPopover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
	
  });
  
  $scope.changeCountryLetter=function(letter){
	$scope.countriesByLetter=[];
	$scope.letterSelected=letter;					 
	var keys = Object.keys(countries);
		keys.forEach(function(key){
		if(countries[key].countryName.substring(0, 1)===$scope.letterSelected){
			$scope.countriesByLetter.push(countries[key]);
		}
	});
	$scope.popover.hide();
  }
  
	$scope.clearFilterCountry=function(){
		$scope.filterCountry='';
	}
	
	
	if(!(angular.equals({},$stateParams.country))){
		
		$scope.countryToBrows=$stateParams.country;
	}
	if(!(angular.equals({},$stateParams.locality ))){
		$scope.regionLocation=$stateParams.locality;
	}
	if(!(angular.equals({},$stateParams.within))){
		$scope.regionSelected=$stateParams.within;
	}
	
	if(!(angular.equals({},$stateParams.countryRegion))){
		
		$scope.countryRegion.opt=$stateParams.countryRegion;
	}
	if(!(angular.equals({},$stateParams.eventVenue ))){
		
		$scope.eventVenue=$stateParams.eventVenue;
	}
	if(!(angular.equals({},$stateParams.venue))){
		$scope.venue=$stateParams.venue;
	}
	if(!(angular.equals({},$stateParams.category))){
		$scope.searchCategory.opt=$stateParams.category;
	}
	if(!(angular.equals({},$stateParams.dateFrom ))){
		$scope.dateFrom=$stateParams.dateFrom;
	}
	if(!(angular.equals({},$stateParams.dateTo))){
		$scope.dateTo=$stateParams.dateTo;
	}
	
	
	if(!(angular.equals({},$stateParams.edit))){
		$scope.edit=$stateParams.edit;
	}
	
	$scope.countryRegionSelected=function(){
	}
	
	$scope.eventVenueSelected=function(option){
		$scope.eventVenue=option.type;
	
	}
	
  $scope.cancelCountry=function(){
	
	if($scope.edit==='yes'){
		$ionicHistory.goBack();
	}else{
	$localstorage.get('name', 'Users');
		countryL=$localstorage.getObject('country');
		regionL=$localstorage.getObject('region');
		if(!(angular.equals({},countryL))){
			$state.go('app.categories',{country:countryL.userCountry,location:'',within:''});
		
		}else if(!(angular.equals({},regionL))){
			$state.go('app.categories',{country:'',location:regionL.location,within:regionL.within, locality:regionL.locality, locationCountry:regionL.locationCountry});
	
		}
	}
  }
  
  $scope.selectCountry = function() {
	$scope.countryToBrows=$scope.countryData.country;		
    
	if($scope.edit==='yes'){
		if((angular.equals({},$scope.countryData))){
			$cordovaToast
					.show('Please select any country to continue...', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
					
		}else{
			$state.go('app.search',{edit:'yes',
								country:$scope.countryData.country,
								countryRegion:$scope.countryRegion.opt,
								eventVenue:$scope.eventVenue,
								venue:$scope.searchVenue,
								category:$scope.searchCategory.opt,
								dateFrom: $scope.dateFrom,
								dateTo:$scope.dateTo}
		
		
			);
		}
	}else{
		if((angular.equals({},$scope.countryData))){
			$cordovaToast
					.show('Please select any country to continue...', 'long', 'center')
					.then(function(success) {
					  // success
					  $timeout(function() {
					 
					}, 3000);
					 
					}, function (error) {
					  // error
					});
		}else{
			$localstorage.get('name', 'Users');
			$localstorage.setObject('region', {});
			$localstorage.setObject('country', {
					userCountry:$scope.countryData.country
					});
			$state.go('app.categories',{country:$scope.countryData.country,location:'', within:''});
		}
	}

	
  };

})

.controller('eventMapCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $cordovaToast, $ionicHistory, $ionicPopover, $stateParams) {

	$scope.mapShow={};
	$scope.mapShow.type="";
	
	$scope.searchType="Event";
	$scope.allVenues={};
	$scope.count=0;
	
	var findMe=false;
	var msg;
	var eventMap=null; 
	var initialPosition;
	var postCode="";
	var venueAdd="";
	
	if(!(angular.equals({},$stateParams.searchType))){
		$scope.searchType=$stateParams.searchType;
	}
	if(!(angular.equals({},$stateParams.allVenues))){
		$scope.allVenues=$stateParams.allVenues;
		
	}
		
	var divMap = document.getElementById("map_canvas1");
	
	document.addEventListener("deviceready", function() {
		  // Initialize the eventMap view
			 eventMap = plugin.google.maps.Map.getMap(divMap);
			
		
		  // Wait until the eventMap is ready status.
		  eventMap.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
		}, false);


	var onSuccess = function(location) {
		if(!(angular.equals({},$stateParams.postalCode))){
			postCode=$stateParams.postalCode;
		}
		if(!(angular.equals({},$stateParams.venueAddress))){
			venueAdd=$stateParams.venueAddress;
		}
			if(findMe){
				 msg = ["I am at:",
				"Latitude:" + location.latLng.lat,
				"Longitude:" + location.latLng.lng +"\n"].join("\n");
				
				initialPosition = new plugin.google.maps.LatLng(location.latLng.lat,location.latLng.lng);
				findMe=false;
				
				
			}else{
				msg=[$stateParams.venue,
				venueAdd,
				postCode].join("\n");
				
				initialPosition = new plugin.google.maps.LatLng($stateParams.lat,$stateParams.lng);
				
			}
			
			if($scope.searchType==='Event'){
				eventMap.clear();
				eventMap.setZoom(5);
				eventMap.setCenter(initialPosition);
				eventMap.setMapTypeId(plugin.google.maps.MapTypeId.ROADMAP);
				eventMap.setOptions({
					'controls': {
						'zoom': true,
						'myLocationButton': true
					}
					
				});

				eventMap.addMarker({
						'position': initialPosition,
						'title': msg,
						'draggable': false,
						'styles' : {
							'text-align': 'center',
							'color': 'red'
						  }
						}, function(marker) {
						marker.showInfoWindow();
					});	
			
				eventMap.animateCamera({
				  'target': initialPosition,
				  'tilt': 10,
				  'zoom': 10,
				  //'bearing': 140,
				  'duration': 5000
				});
			}else if($scope.searchType==='Venue'){
				var position;
				
				eventMap.clear();
				//eventMap.setZoom(5);
				
				eventMap.setMapTypeId(plugin.google.maps.MapTypeId.ROADMAP);
				eventMap.setOptions({
					'controls': {
						'zoom': true,
						'myLocationButton': true
					}
					
				});
				$scope.count=0;
				var venueKeyId='';
				for (var key in $scope.allVenues) {
					
				  if ($scope.allVenues.hasOwnProperty(key)) {
					if($scope.allVenues[key].latitude && $scope.allVenues[key].longitude){
						
						position=new plugin.google.maps.LatLng($scope.allVenues[key].latitude,$scope.allVenues[key].longitude)
						
						if(position){
							
							eventMap.addMarker({
								'position': position,
								'myMsg': $scope.allVenues[key].id,
								'title': $scope.allVenues[key].venue_name,
								'draggable': false,
								'snippet' :'Click to see '+$scope.allVenues[key].event_count+' upcoming event(s)',
								'styles' : {
									'text-align': 'center',
									'color': 'red'
								  }
								}, function(marker) {
								$scope.count=$scope.count+1;	
								//marker.showInfoWindow();
								
								marker.addEventListener(plugin.google.maps.event.INFO_CLICK, function() {
									venueKeyId=marker.get("myMsg");
									
									$state.go('app.search-service',{venues:$scope.allVenues,venueId:venueKeyId,catSel:'At Venue on Map',location:$stateParams.location,within:$stateParams.within, locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
							  });
							});	
						}
					}
					
				  }
				}
				/*$timeout(function() {
					$scope.count=$scope.count;
				});*/ 
				
					
					var pos=new plugin.google.maps.LatLng($stateParams.location.substring(0,$stateParams.location.indexOf(",")), $stateParams.location.substring($stateParams.location.indexOf(",")+1));
					
					eventMap.setZoom(7);
					eventMap.setCenter(pos);
				
			}
	};
	
	var onError = function(msg) {
	};

	function onMapReady() {
		
		eventMap.setDiv(divMap);
		eventMap.getMyLocation(onSuccess, onError);
		
	}
	
	$scope.$on('$ionicView.beforeEnter', function(){
		document.getElementById("side-menu").style.visibility="hidden";
	
	});
	
	$scope.$on('$ionicView.afterLeave', function(){
	document.getElementById("side-menu").style.visibility="visible";
	});
	
	$scope.goBack = function() {
	
		if($scope.searchType==='Venue'){
			$state.go('app.venue',{country:'',location:$stateParams.location, within:$stateParams.within,locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
		}else{
			$ionicHistory.goBack();
		}
	};
	
	$scope.changeMapType = function(type){
	
		var typeLocal="plugin.google.maps.MapTypeId."+type;
		
		eventMap.setMapTypeId(typeLocal);
	
	}
	function onBtnClicked(){
		findMe=true;
		eventMap.clear();
		eventMap.getMyLocation(onSuccess, onError);
		
	}
	
})

.controller('regionMapCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $cordovaToast, $ionicHistory, $ionicPopover, $stateParams, $ionicSideMenuDelegate, $localstorage, $ionicGesture) {

$scope.regionData={};
$scope.regionData.within='10';

	
	
	$scope.countryRegion={};
	$scope.countryRegion.opt='';
	
	$scope.eventVenue;
	$scope.venue;
	
	$scope.regionLocation='';
	$scope.regionSelected='';	

	
	$scope.searchCountry;
	$scope.searchVenue;
	$scope.dateFrom;
	$scope.dateTo;
	$scope.searchCategory={};
	$scope.searchCategory.opt='';

	$scope.loc={};
	
	var map=null; 
	var initialPosition;
	var newPosition='';
	var showCircle;
	var buildCircle;
	var intLat;
	var intLng;
	var newLat="";
	var newLng="";
	
	var result='';
	var request='';
	
	var markerObj;
	var markerClicked='';
	
	$scope.editRegion='';
	if(!(angular.equals({},$stateParams.edit))){
			$scope.editRegion=$stateParams.edit;
		}
	
	if(!(angular.equals({},$stateParams.location ))){
	
			$scope.regionLocation=$stateParams.location;
		}
		if(!(angular.equals({},$stateParams.within))){
			$scope.regionSelected=$stateParams.within;
		}
		if(!(angular.equals({},$stateParams.locality))){
			$scope.regionLocality=$stateParams.locality;
		}
		if(!(angular.equals({},$stateParams.locationCountry))){
			$scope.regionCountry=$stateParams.locationCountry;
		}
		
		if(!(angular.equals({},$stateParams.countryRegion))){
			
			$scope.countryRegion.opt=$stateParams.countryRegion;
		}
		if(!(angular.equals({},$stateParams.eventVenue ))){
			
			$scope.eventVenue=$stateParams.eventVenue;
		}
		if(!(angular.equals({},$stateParams.venue))){
			$scope.venue=$stateParams.venue;
		}
		if(!(angular.equals({},$stateParams.category))){
			$scope.searchCategory.opt=$stateParams.category;
		}
		if(!(angular.equals({},$stateParams.dateFrom ))){
			$scope.dateFrom=$stateParams.dateFrom;
		}
		if(!(angular.equals({},$stateParams.dateTo))){
			$scope.dateTo=$stateParams.dateTo;
		}
		
		
	$scope.goSearch = function() {
		$scope.editRegion='';
		$ionicHistory.goBack();
	}
	
	var div = document.getElementById("map_canvas");
	
	$scope.$watch(function(){
		return $ionicSideMenuDelegate.getOpenRatio();
		}, function(newValue, oldValue) {
		if (newValue === 0){
			$scope.hideLeft = true;
			document.getElementById("side-menu").style.visibility="hidden";
		} else{
		$scope.hideLeft = false;
		}
	});
	
	
	$scope.$on('$ionicView.afterLeave', function(){
	document.getElementById("side-menu").style.visibility="visible";
	
	});
	
	var reset=false;
			
	$scope.goBack = function() {
		document.getElementById("side-menu").style.visibility="visible";
		$ionicSideMenuDelegate.toggleLeft();
	};
  
	document.addEventListener("deviceready", function() {
		  // Initialize the map view
			 map = plugin.google.maps.Map.getMap(div);
			
		  // Wait until the map is ready status.
		  map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

		}, false);

	var onSuccess = function(location) {
	 
		$scope.address ='';
		var msg = ["I am at:",
		"Latitude:" + location.latLng.lat,
		"Longitude:" + location.latLng.lng +"\n",
		"Important: Long press and \ndrag to change the location."].join("\n");
		intLat=location.latLng.lat;
		intLng=location.latLng.lng;
	
			if(!(angular.equals({},$stateParams.location )) && !reset){	
				if($stateParams.location!=='No region selected'){
					initialPosition=new plugin.google.maps.LatLng($stateParams.location.substring(0,$stateParams.location.indexOf(",")), $stateParams.location.substring($stateParams.location.indexOf(",")+1));
					
					$scope.regionData.within= $stateParams.within;
					$timeout(function(){
						$scope.regionData.within= $stateParams.within;
					});
				}else{
					
					initialPosition = new plugin.google.maps.LatLng(location.latLng.lat,location.latLng.lng);
				}	
				
			} else{
				initialPosition = new plugin.google.maps.LatLng(location.latLng.lat,location.latLng.lng);
			}
			
			
			request = {
						  'position': initialPosition
						};
			
			var setRadius='';
				if($scope.regionData.within==='10'){
					setRadius='16080';
					
				}else if($scope.regionData.within==='50'){
					setRadius='80450';
					
				}else if($scope.regionData.within==='100'){
					setRadius='160900';
					
				}
				
			buildCircle={
				  'center': initialPosition,
				  'radius': setRadius,
				  'strokeColor' : '#4a708b',
				  'strokeWidth': 1,
				  'fillColor' : '#87ceeb'
				};
			map.clear();
			map.setZoom(5);			
			map.setMapTypeId(plugin.google.maps.MapTypeId.ROADMAP);
			map.setCenter(initialPosition);
			map.setOptions({
				'controls': {
					'zoom': true,
					'myLocationButton': true
				}
				
			});
			if(angular.equals({},$stateParams.location )){
				map.animateCamera({
				  'target': initialPosition,
				  'tilt': 10,
				  'zoom': 10,
				  //'bearing': 140,
				  'duration': 5000
				});
			}else{
				var setZoom='';
				if($scope.regionData.within==='10'){
					setZoom ='10';
					
				}else if($scope.regionData.within==='50'){
					setZoom ='7';
				}else if($scope.regionData.within==='100'){
					setZoom ='5';
				}
				map.animateCamera({
				  'target': initialPosition,
				  'tilt': 10,
				  'zoom': setZoom,
				  //'bearing': 140,
				  'duration': 5000
				});
				
				
			}	
			map.addMarker({
			'position': initialPosition,
			//'title': address,
			'draggable': true,
			'snippet' :'Long press and drag to change the location.',
			'styles' : {
				'text-align': 'center',
				'color': 'red'
			  }
			}, function(marker) {
			markerObj=marker;
			
			marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_START, function(marker) {
				markerClicked='';
				$scope.address='';
				marker.hideInfoWindow() ;
			});	
			
			marker.addEventListener(plugin.google.maps.event.MARKER_DRAG_END, function(marker) {
				marker.hideInfoWindow() ;
				
				marker.getPosition(function(latLng) {
				
					newLat=latLng.lat;
					newLng=latLng.lng;
					
					newPosition = new plugin.google.maps.LatLng(latLng.lat,latLng.lng);
					request = {
						  'position': newPosition
						}; 
					
				  showCircle.setCenter(newPosition);	
				  map.setCenter(newPosition);
					
					});
				  
				});
				
				
				 marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() {
					markerClicked='yes';
					$scope.address='Getting location info...';
					marker.setTitle('Getting location info...');
					marker.showInfoWindow();

					plugin.google.maps.Geocoder.geocode(request, function(results) {
					 marker.setTitle('Getting location info...');
					  if (results.length) {
						 result = results[0];
						 $scope.address = [
						  result.thoroughfare || "",
						  result.locality || "",
						  result.country||""].join("\n");
						marker.setTitle($scope.address);
						marker.showInfoWindow();	
						}
					});
					
				});
			  });

		  map.addCircle(buildCircle, function(circle) {
			showCircle = circle;
			circle.on(plugin.google.maps.event.OVERLAY_CLICK, function(overlay, latLng) {
				map.setCenter(newPosition);
				circle.setCenter(newPosition);
			 });
			});
		
	};
	
	var onError = function(msg) {
	};

	function onMapReady() {
		map.setDiv(div);
		map.getMyLocation(onSuccess, onError);
		
	}
	
	$scope.onBtnClicked=function(){
		reset=true;
		markerClicked='';
		map.clear();
		newPosition='';
		$scope.regionData.within='10';
		map.getMyLocation(onSuccess, onError);
	}

	$scope.zoomCircle=function (){
	
		if($scope.regionData.within==='10'){
			showCircle.setRadius(16090);
			map.setZoom(10);
			
		}else if($scope.regionData.within==='50'){
			showCircle.setRadius(80450);
			map.setZoom(7);
		}else if($scope.regionData.within==='100'){
			showCircle.setRadius(160900);
			map.setZoom(5);
		}
		if(newPosition!==""){
			map.setCenter(newPosition);
		}else{
			map.setCenter(initialPosition);
		}
	}	

	 $scope.selectRegion=function() {
	 
			if(newLat==="" && newLng===""){
				$scope.loc.lat=intLat;
				$scope.loc.lng=intLng;
			}else{
				$scope.loc.lat=newLat;
				$scope.loc.lng=newLng;
			
			}
			var latLng=$scope.loc.lat+","+$scope.loc.lng;
		if(!($stateParams.edit==='yes')){
			if(markerClicked===''){
				 
				 $cordovaToast
				.show("Click on the Marker for location info...", 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
				 
				}, 3000);
				 
				}, function (error) {
				  // error
				});
			}else if($scope.address==='Getting location info...' || $scope.address===''){
				$cordovaToast
				.show("Please wait, getting location info", 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
				 
				}, 3000);
				 
				}, function (error) {
				  // error
				});
			}else{
				$localstorage.get('name', 'Users');
				$localstorage.setObject('country',{});
				$localstorage.setObject('region', {
					location:latLng,
					within:$scope.regionData.within,
					locality:result.locality, 
					locationCountry:result.country
					});
				$state.go('app.categories',{country:'',location:latLng, within:$scope.regionData.within, locality:result.locality, locationCountry:result.country} );
			}
		} else if ($stateParams.edit==='yes'){
			if(markerClicked===''){
			 
			 $cordovaToast
			.show("Click on the Marker for location info...", 'long', 'center')
			.then(function(success) {
			  // success
			  $timeout(function() {
			 
			}, 3000);
			 
			}, function (error) {
			  // error
			});
		
		 
			}else if($scope.address==='Getting location info...' || $scope.address===''){
				$cordovaToast
				.show("Please wait, getting location info", 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
				 
				}, 3000);
				 
				}, function (error) {
				  // error
				});
			}else{
		
			$scope.editRegion='';
			$state.go('app.search',{edit:'yes',
									location:latLng, 
									within:$scope.regionData.within, 
									locality:result.locality, 
									locationCountry:result.country,
									countryRegion:$scope.countryRegion.opt,
									eventVenue:$scope.eventVenue,
									venue:$scope.searchVenue,
									category:$scope.searchCategory.opt,
									dateFrom: $scope.dateFrom,
									dateTo:$scope.dateTo
			});
		}
	  }
  }
  })
	
	

.controller('CategoryListCtrl', function($scope, $state, $ionicModal,$stateParams, $ionicLoading, $ionicPopover) {
 
 var initalHieght=Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
 if(initalHieght<650){
  document.getElementById('indexNav').style.height='91.5%';
  }
  var interstitialIsReady=false;
	
	
	/*document.addEventListener("deviceready", onReady, false);
		function onReady()
		{
			adbuddiz.setAndroidPublisherKey("d658b419-61d2-4d57-b280-518d4ac1c6a3");
      
			adbuddiz.cacheAds();
	  }*/

	
	//if app is in background
			   document.addEventListener("pause", function() {
			   
				interstitialIsReady = false;
			   } , false);
			   
		//if app is in foreground
			   document.addEventListener("resume", function() {
				  
				interstitialIsReady = true;
			   } , false);
			   
    var widt=0;
	var totalHght=0;
	var hght=0;
  
  // for admob
		   
		   // update the state when ad preloaded
			document.addEventListener('onAdLoaded', function(e){
				if(e.adType == 'interstitial') {
					interstitialIsReady = true;
				}
			});

			// when dismissed, preload one for next show
			document.addEventListener('onAdDismiss', function(e){
				if(e.adType == 'interstitial') {
					interstitialIsReady = false;
					AdMob.prepareInterstitial({
					   adId:admobid.interstitial, 
					   autoShow:false
					});
				}
			});
            setInterval(function(){
						if(interstitialIsReady) AdMob.showInterstitial();
					}, 4*60*1000);

					
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
					
				}else{	
					window.AdMob.createBanner({
					adId: adMobId, 
					position: AdMob.AD_POSITION.BOTTOM_CENTER, 
					adSize: 'SMART_BANNER',
					overlap:true, 
					autoShow: true });
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
  
	$scope.$on("$ionicView.beforeEnter", function() {
				
				new Photostack( document.getElementById( 'photostack-3' ), {
					callback : function( item ) {
						//console.log(item)
					}
				} );
		});
		
	$scope.category={};
	$scope.category.cat='';
	var moreCategory=$stateParams.moreCategory;
	

  $scope.categories = [
	{ title: 'Sports', id: 1 },
    { title: 'Music', id: 2 },
    { title: 'Film', id: 7 },
	{ title: 'Performing Arts', id: 4 },
    { title: 'Comedy', id: 5 },
    { title: 'Festivals', id: 6 },
	{ title: 'Holiday', id: 8 },
	{ title: 'Finance', id: 3 },
	{ title: 'Technology', id: 9 }
	
	
  ];
  
  var country="" ;
  var region="";
  var within="";
  var locality="";
  var locationCountry="";
  
  $scope.place='';
		if(!(angular.equals({}, $stateParams.country))){
				country=$stateParams.country;
				region="";
				$scope.place= $stateParams.country;
		}else if(!(angular.equals({}, $stateParams.location))){
				country="";
				region=$stateParams.location;
				within=$stateParams.within;
				if((angular.equals({}, $stateParams.locality))){
					$stateParams.locality='';
				}
				if((angular.equals({}, $stateParams.locationCountry))){
						$stateParams.locationCountry='';
				}
				locality=$stateParams.locality;	
				locationCountry=$stateParams.locationCountry;
				$scope.place=$stateParams.locality+", "+$stateParams.locationCountry;
		}
			
		
	
	$scope.redirect = function(catSelected){
	
		if(country!==""){
		
			$state.go('app.search-service',{genSearch:'no', catSel:catSelected,country:country,location:'',within:''}, {refresh: true});
		}else if(region!==""){
			$state.go('app.search-service',{genSearch:'no', catSel:catSelected,location:region,within:within,country:'',locality:locality,locationCountry:locationCountry}, {refresh: true});
		}
	}
	
		  $ionicPopover.fromTemplateUrl('templates/morePopover.html', {
			scope: $scope,
			}).then(function(popover) {
			$scope.morePopover = popover;
			
		  });
	
	$scope.selectMoreCategory = function() {
		$scope.morePopover.hide();
		if(country!==""){
			$state.go('app.more-category',{country:country,moreCategory:moreCategory,location:'',within:''});
		}else if(region!==""){
				$state.go('app.more-category',{moreCategory:moreCategory,location:region,within:within,country:'',locality:locality,locationCountry:locationCountry});
			}
		
	}
	
})

.controller('googleCtrl', function($scope, $state, $ionicModal,$stateParams, $ionicLoading, $ionicPopover) {
$scope.logged_in = false;
$scope.getMember = function(id) {
    console.log(id);
};
$scope.test = function(){
    $ionicPopup.alert({"title":"Clicked"});
}

$scope.call_google = function(){
    googleapi.authorize({
    client_id: '897698087626-4ua6qe0ec6t20i37no52p06vfltncvm8.apps.googleusercontent.com',
    //client_secret: 'CLIENT_SECRET',

    redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
    scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
    }).done(function(data) {
        accessToken=data.access_token;
        // $loginStatus.html('Access Token: ' + data.access_token);
        console.log(data.access_token);
        $scope.getDataProfile();
    });
};
$scope.getDataProfile = function(){
    var term=null;
    //  alert("getting user data="+accessToken);
    $http.get({
           url:'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+accessToken,
           type:'GET',
           data:term,
           dataType:'json',
           error:function(jqXHR,text_status,strError){
           },
           success:function(data)
           {
           var item;

           console.log(JSON.stringify(data));
           // Save the userprofile data in your localStorage.
           window.localStorage.gmailLogin="true";
           window.localStorage.gmailID=data.id;
           window.localStorage.gmailEmail=data.email;
           window.localStorage.gmailFirstName=data.given_name;
           window.localStorage.gmailLastName=data.family_name;
           window.localStorage.gmailProfilePicture=data.picture;
           window.localStorage.gmailGender=data.gender;
           window.localStorage.gmailName=data.name;
           $scope.email = data.email;
           $scope.name = data.name;
           }
        });
        //$scope.disconnectUser(); //This call can be done later.
};
$scope.disconnectUser = function() {
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token='+accessToken;

  // Perform an asynchronous GET request.
  $http.get({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      // Do something now that user is disconnected
      // The response is always undefined.
      accessToken=null;
      console.log(JSON.stringify(nullResponse));
      console.log("-----signed out..!!----"+accessToken);
    },
    error: function(e) {
      // Handle the error
      // console.log(e);
      // You could point users to manually disconnect if unsuccessful
      // https://plus.google.com/apps
    }
  });
};
})
