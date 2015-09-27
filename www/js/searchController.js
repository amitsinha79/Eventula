angular.module('search.controller',['ui.unique','ui.jq'])
//'ui.unique' module added from /ui-utils-0.2.3/ui-utils.js - referenced in index.html

.controller('MoreCategoryCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, $state, $ionicLoading) {
	
	$scope.data={};
	$scope.data.found='';
	$scope.category={};
	$scope.category.cat='';
	$scope.country={};
	$scope.country.selected='';
	$scope.location={};
	$scope.location.selected='';
	$scope.location.within='';
	
	$scope.moreCategs=[];
	$scope.searchBy;
	
	var locality='';
	var locationCountry='';
	
	var catSelect='';
	if(!(angular.equals({}, $stateParams.country))){
		$scope.country.selected=$stateParams.country;
		$scope.searchBy="Country: "+$stateParams.country;
	}
	if(!(angular.equals({}, $stateParams.location))){
		$scope.location.selected=$stateParams.location;
		$scope.location.within=$stateParams.within;
		if((angular.equals({}, $stateParams.locality))){
			$stateParams.locality='';
		}
		if((angular.equals({}, $stateParams.locationCountry))){
				$stateParams.locationCountry='';
			}
		locality=$stateParams.locality;	
		locationCountry=$stateParams.locationCountry;	
		
		$scope.searchBy=	 "Region: " + [	$stateParams.locality||"",
									$stateParams.locationCountry||""].join(", ");
			
	}
			
		  $scope.redirect = function(catSelected,country,location,within){
		 
		  if(!(angular.equals({}, $stateParams.country))){
				$scope.category.cat=catSelected;
				$state.go('app.search-service',{moreCategory:'yes', catSel:catSelected,country:country,location:'',within:''});
			}else if(!(angular.equals({}, $stateParams.location))){
				$scope.category.cat=catSelected;
				$state.go('app.search-service',{moreCategory:'yes', catSel:catSelected,country:'',location:location,within:within,locality:locality,locationCountry:locationCountry});
			}
			
		}
		$scope.category.cat=$stateParams.category;
		
		
		var moreCategory=[];
	moreCategory.category="";
	moreCategory.result="";
	var region="";
	var within="";
	var country="" ;
	var locality="";
	var locationCountry="";
  
	var oArgs="";
	
		var moreCategories = [
			{ title: 'Art Galleries & Exhibits', id: 1 },
			{ title: 'Business & Networking', id: 2 },
			{ title: 'Politics', id: 3 },
			{ title: 'Education', id: 4 },
			{ title: 'Kids & Family', id: 5 },
			{ title: 'Fundraising & Charity', id: 6 },
			{ title: 'Health & Wellness', id: 7 },
			{ title: 'Nightlife & Singles', id: 8 },
			{ title: 'Literary & Books', id: 9 },
			{ title: 'Museums & Attractions', id: 10 },
			{ title: 'Neighborhood', id: 11 },
			{ title: 'Organizations & Meetups', id: 12 },
			{ title: 'Outdoors & Recreation', id: 13 },
			{ title: 'Politics & Activism', id: 14 },
			{ title: 'Religion & Spirituality', id: 15 },
			{ title: 'Sales & Retail', id: 16 },
			{ title: 'Science', id: 17 },
			{ title: 'Food & Wine', id: 18 },
			{ title: 'University & Alumni', id: 19 },
			{ title: 'Other & Miscellaneous', id: 20 }
		  ];
		  
		var d= new Date();
		var currYear=d.getFullYear();
		var currMon = d.getMonth()+1;
			if (currMon.toString().length===1){
				currMon='0'+currMon;
			}
		var currDate= d.getDate();
			if (currDate.toString().length===1){
				currDate='0'+currDate;
			}
		var currFullDate=currYear+""+currMon+""+currDate+"00";
		
		var d2=new Date();
		d2.setFullYear(d2.getFullYear()+2);
		var futureYear=d2.getFullYear();
		var futureMon = d2.getMonth()+1;
			if (futureMon.toString().length===1){
				futureMon="0"+futureMon;
			}
		var futureDate= d2.getDate();
			if (futureDate.toString().length===1){
				futureDate="0"+futureDate;
			}
		var futureFullDate=futureYear+""+futureMon+""+futureDate+"00";
		
			if(!(angular.equals({}, $stateParams.country))){
				country=$stateParams.country;
				region="";
			}else if(!(angular.equals({}, $stateParams.location))){
				country="";
				region=$stateParams.location;
				within=$stateParams.within;
				locality=$stateParams.locality;	
				locationCountry=$stateParams.locationCountry;
			}
			
		if(country!==""){	
			oArgs = {
				app_key: "Th8dPwrbjqBX5ctd",
				q: '',
				location: country, 
				"date": currFullDate+"-"+futureFullDate, 
				count_only:true
				};
		}else if(region!==""){
			oArgs = {
				app_key: "Th8dPwrbjqBX5ctd",
				q: '',
				location: region, 
				within: within,
				"date": currFullDate+"-"+futureFullDate, 
				count_only:true
				};
		}
		
			$scope.loading = $ionicLoading.show({
				  content: 'Getting more categories...',
				  showBackdrop: false
				});
				
				 
				var keys = Object.keys(moreCategories);
				
				if(angular.equals({},$stateParams.moreCategory)||$stateParams.moreCategory.length===0 ){
					keys.forEach(function(key){
							
					oArgs.q=moreCategories[key].title;
					EVDB.API.call("/events/search", oArgs, function(oData) {
							moreCategory.push({'category': moreCategories[key].title, 'result':oData.total_items});
							
					});
					});
					
					 $timeout(function() {
						if(!(angular.equals({},moreCategory))){
							
							$scope.moreCategs=moreCategory;	
						} 
						$ionicLoading.hide();
						
					},8000);
					
				}else{
					$scope.moreCategs=$stateParams.moreCategory;
					$ionicLoading.hide();
				
			}
			
			$scope.backToCategory = function() {
				if(country!==""){	
					$state.go('app.categories',{country:country,moreCategory:moreCategory,location:'', within:''});
				}else if(region!==""){
					$state.go('app.categories',{country:'',moreCategory:moreCategory,location:region, within:within,locality:locality,locationCountry:locationCountry});
				}		
			}
		
})
.controller('SearchDescCtrl', function($scope, $stateParams,$state,$ionicHistory, $window,  $cordovaToast, $ionicPopover, $timeout) {
	$scope.event=$stateParams.event;
	$scope.mySaying={
		text:''
	};
	
	var desc="";
	$scope.imgURL='';
	var image='';
	
	if($scope.event.description){
		desc =$scope.event.description;
		$scope.event.description=desc.replace(/href/g,'xxxx');
	 
	}
	
	
	$scope.goToUrl = function(url) {
		
		window.open(url,'_system');
	};
	
	$ionicPopover.fromTemplateUrl('templates/fbPopover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
	
  });
	
	/*$ionicPopover.fromTemplateUrl('templates/googlePopover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.googlePopover = popover;
	
  });*/
  
	$scope.initialize =function (venue,venueAddress,postalCode, lat, lng) {
	  $state.go('app.locate-event',{venue:venue,venueAddress:venueAddress,postalCode:postalCode,lat:lat, lng:lng});
		}
	if($scope.event.image){
		image=($scope.event.image.medium.url);
	}else{
		image='http://s1.evcdn.com/store/skin/no_image/categories/128x128/other.jpg';
	}
	
	$scope.addEventDetail=function(){
		
		$scope.mySaying.text=$scope.mySaying.text+'\n'+$scope.event.title+'\n'+ $scope.event.city_name +'\n'+ $scope.event.start_time ;
		
	
	}
	$scope.addEventImage=function(){
		$timeout(function(){
			$scope.imgURL=image;
		});
		/*document.getElementById("eventImage").style.visibility='visible';
		document.getElementById("eventImage2").style.visibility='visible';
		document.getElementById("noImage").style.visibility='hidden';
		document.getElementById("noImage2").style.visibility='hidden';
		*/
	}
	
	$scope.removeEventImage=function(){
		$timeout(function(){
			$scope.imgURL='';
		});
		/*document.getElementById("eventImage").style.visibility='hidden';
		document.getElementById("eventImage2").style.visibility='hidden';
		document.getElementById("noImage").style.visibility='visible';
		document.getElementById("noImage2").style.visibility='visible';
		*/
	}
	
	var feedFB= function(mySaying){
	
		$scope.mySaying.text=mySaying;
	
		openFB.api(
				{
					method: 'POST',
					path: '/me/feed',
					params: {
						picture: $scope.imgURL,
						message: $scope.mySaying.text
						//+'\n'+$scope.event.title+'\n'+ $scope.event.city_name +'\n'+ $scope.event.start_time +'\n'+$scope.event.description.replace(/<\/?[^>]+>/gi, '') //.replace(/<\/?[^>]+>/gi, '') to replace all HTML tags
					},
					
					success: function () {
						$cordovaToast
						.show('Your comment is now shared on Facebook', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
						 
						}, 4000);
						 
						}, function (error) {
						  // error
						});
					},
					error: function () {
						$cordovaToast
						.show('An error occurred while sharing this event on Facebook', 'long', 'center')
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
	
	$scope.fbLogin = function(mySaying) {
	if(mySaying!==''){
		openFB.getLoginStatus(
			function(loginStatus){
			if (loginStatus.status === 'connected') {
				feedFB(mySaying);
				$cordovaToast
						.show('Your saying is now being posted...', 'long', 'center')
						.then(function(success) {
						  // success
						  $timeout(function() {
							$scope.popover.hide();
						}, 3000);
						 
						}, function (error) {
						  // error
						});
				$scope.popover.hide();
			}else{
				$scope.popover.hide();
				goFBLogin(mySaying);
			}
			
			});
		}else{
			$cordovaToast
				.show('Please enter your comments to post', 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
				 
				}, 3000);
				 
				}, function (error) {
				  // error
				});
		}
	}
	
	var goFBLogin = function(mySaying) {
    openFB.login(
        function(response) {
            if (response.status === 'connected') {
    			
				feedFB(mySaying);
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
        {scope: 'email,publish_actions'});
		
		
	}

	
	$scope.backToSearchResult =function(){
		$ionicHistory.goBack();
	}
})
.controller('SearchCtrl', function($scope, $stateParams, $ionicModal, $timeout, $state, $window, $ionicLoading, $ionicPopup, $compile, $cordovaToast,$ionicSideMenuDelegate, $ionicPopover) {
		//adbuddiz.showAd(); 
		var categorySelected;
		
		$scope.attribute='city_name';
		$scope.searchBy;
		
		$scope.events=[];
		$scope.event={};
		
		$scope.filterCityData={};
		$scope.filterTitleData={};
		$scope.category={};
		$scope.category.cat='';
	
		$scope.generalSearch='';
		$scope.moreCategory='';
		
		var filterUsed=false;
		var clearFilters=false;
		
		var pageNumber=1;
		var totalPageCount=1;
		
		var currFullDate='';
		var futureFullDate='';
		var dateRange='';
		
		$scope.goToUrl = function(url) {
			
			window.open(url,'_system');
		};
		
		$scope.menuToggle=function(){
			$ionicSideMenuDelegate.toggleLeft();
		}
	
		$ionicPopover.fromTemplateUrl('templates/sortFilterPopover.html', {
		scope: $scope,
		  }).then(function(popover) {
			$scope.popover = popover;
			
		  });
		  
	
		if(!(angular.equals({}, $stateParams.moreCategory))){
			$scope.moreCategory=$stateParams.moreCategory;
		}
		  
		if(!(angular.equals({}, $stateParams.genSearch))){
			$scope.generalSearch=$stateParams.genSearch;
			currFullDate=$stateParams.dateFrom;
			futureFullDate=$stateParams.dateTo;
			
			
		}else{	
			var d= new Date();
			var currYear=d.getFullYear();
			var currMon = d.getMonth()+1;
				if (currMon.toString().length===1){
					currMon='0'+currMon;
				}
			var currDate= d.getDate();
				if (currDate.toString().length===1){
					currDate='0'+currDate;
				}
			currFullDate=currYear+""+currMon+""+currDate+"00";
			
			var d2=new Date();
			d2.setFullYear(d2.getFullYear()+2);
			var futureYear=d2.getFullYear();
			var futureMon = d2.getMonth()+1;
				if (futureMon.toString().length===1){
					futureMon="0"+futureMon;
				}
			var futureDate= d2.getDate();
				if (futureDate.toString().length===1){
					futureDate="0"+futureDate;
				}
			futureFullDate=futureYear+""+futureMon+""+futureDate+"00";
			
		}
		dateRange=currFullDate+"-"+futureFullDate;
		
		var oArgs = {
				app_key: "Th8dPwrbjqBX5ctd",
				q: '',
				location: "", 
				within:"",
				date: dateRange, 
				page_size: 10,
				sort_order: "popularity",
				page_number:pageNumber
			};
			
		if(!(angular.equals({}, $stateParams.country))){	
			$scope.searchBy="Country: "+$stateParams.country;
		}else if(!(angular.equals({}, $stateParams.location))){
			if((angular.equals({}, $stateParams.locality))){
				$stateParams.locality='';
			}
			if((angular.equals({}, $stateParams.locationCountry))){
				$stateParams.locationCountry='';
			}
			$scope.searchBy=	 "Region: " + [	$stateParams.locality||"",
									$stateParams.locationCountry||""].join(", ");
		}
		
		
		$scope.backToMoreCategory = function() {
				if(!(angular.equals({}, $stateParams.country))){	
					$state.go('app.more-category',{country:$stateParams.country,location:'', within:''});
				}else if(!(angular.equals({}, $stateParams.location))){
					$state.go('app.more-category',{country:'',location:$stateParams.location, within:$stateParams.within,locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
				}		
			}
			
		$scope.backToCategory = function() {
				if(!(angular.equals({}, $stateParams.country))){	
					$state.go('app.categories',{country:$stateParams.country,location:'', within:''});
				}else if(!(angular.equals({}, $stateParams.location))){
					$state.go('app.categories',{country:'',location:$stateParams.location, within:$stateParams.within,locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
				}		
			}
		
		$scope.backToSearch=function(){
			$state.go('app.search',{edit:'yes',
									country:$stateParams.country,
									location:$stateParams.location, 
									within:$stateParams.within, 
									locality:$stateParams.locality, 
									locationCountry:$stateParams.locationCountry,
									countryRegion:$stateParams.countryRegion,
									eventVenue:$stateParams.eventVenue,
									venue:$stateParams.venue,
									category:$stateParams.catSel,
									dateFrom: $stateParams.dateSearchFrom,
									dateTo:$stateParams.dateSearchTo
			});
			
		}
		$scope.backToVenue=function(){
			
				if(!(angular.equals({}, $stateParams.country))){	
					$state.go('app.venue',{country:$stateParams.country,location:'', within:''});
				}else if(!(angular.equals({}, $stateParams.location))){
					$state.go('app.venue',{country:'',location:$stateParams.location, within:$stateParams.within,locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
				}
		}
		$scope.backToVenueMap=function(){
			$state.go('app.locate-event',{searchType:'Venue',allVenues:$stateParams.venues,catSel:'At Venue on Map',location:$stateParams.location,within:$stateParams.within, locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
		}
	$scope.showDescription=function(event){
		$state.go('app.search-desc',{event:event});
	
	};
	
	$scope.closeDescription = function() {
		$scope.descriptionmodal.hide();
	};
	  
	
	
	var	doSearch = function(){
		if((!(angular.equals({}, $stateParams.catSel))) ){
			categorySelected=$stateParams.catSel;
			$scope.category.cat=categorySelected;
			if($stateParams.catSel==='At Venue'){
				categorySelected='All';
				$scope.category.cat='At Venue';
			}
		}
		
		
		oArgs.q= categorySelected;
		if(!(angular.equals({}, $stateParams.country))){
			oArgs.location= $stateParams.country;
		}else if(!(angular.equals({}, $stateParams.location))){
			oArgs.location= $stateParams.location;
			oArgs.within=$stateParams.within;
		}
		if(!(angular.equals({}, $stateParams.venueId))){
			oArgs.location= $stateParams.venueId;
			oArgs.within='';
			oArgs.q='';
		}
		EVDB.API.call("/events/search", oArgs, function(oData) {
		var results=oData.events;
		var eventData=[];
		if(results!==null){
		
			if(oData.total_items==='1'){
				eventData.push(results.event);
				addResultToList(eventData);
			}else{
			
				eventData= Object.keys(results.event).map(function(k) { return results.event[k] });
				//above map is same as below
				/*var eventData = [];
				var keys = Object.keys(results.event);
				keys.forEach(function(key){
					eventData.push(results.event[key]);
				});	
				*/	
				totalPageCount=oData.page_count;
				addResultToList(eventData);
			}
			$timeout(function() {
					$scope.$broadcast('scroll.infiniteScrollComplete');
					}, 1000); 
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
			
			$cordovaToast
				.show('No upcoming events found for '+categorySelected +'.\nPlease try another category/region/country', 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
				  if($stateParams.genSearch==='no' || $stateParams.browseSearch==='yes'){
				  
						$state.go('app.categories',{noData:'yes',category:categorySelected,country:$stateParams.country,location:$stateParams.location, within:$stateParams.within,locality:$stateParams.locality,locationCountry:$stateParams.locationCountry}); 
					
					}else if($stateParams.moreCategory==='yes'){
					
						$state.go('app.more-category',{noData:'yes',country:$stateParams.country,location:$stateParams.location, within:$stateParams.within,locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
					
					}else if($stateParams.catSel==='At Venue'){
						$state.go('app.venue',{country:$stateParams.country,location:$stateParams.location, within:$stateParams.within,locality:$stateParams.locality, locationCountry:$stateParams.locationCountry});
					
					}else if($stateParams.genSearch==='yes'){
						
						$state.go('app.search',{edit:'yes',
									country:$stateParams.country,
									location:$stateParams.location, 
									within:$stateParams.within, 
									locality:$stateParams.locality, 
									locationCountry:$stateParams.locationCountry,
									countryRegion:$stateParams.countryRegion,
									eventVenue:$stateParams.eventVenue,
									venue:$stateParams.venue,
									category:$stateParams.catSel,
									dateFrom: $stateParams.dateSearchFrom,
									dateTo:$stateParams.dateSearchTo
						});
					}
				}, 4000);
				 
				}, function (error) {
				  // error
				});
			
		}
		
		});
	}
	
	var addResultToList = function(eventData){
	
		for(i=0;i<=eventData.length;i++){
			if(eventData[i]){
				$scope.events.push(eventData[i]);
				
			}
			
		}
		
	}
	
	 $scope.show = function() {
		$ionicLoading.show({
		  duration: 3000,
		  noBackdrop: true,
		  template: '<ion-footer-bar><ion-spinner icon="lines"/></ion-footer-bar>'
		});
	 }
	 
	 $scope.hide = function(){
		$ionicLoading.hide();
	}
	 
	$scope.loadMore = function (){
	
		if(!filterUsed){
			
			if(pageNumber <= totalPageCount){
				
				doSearch();
				pageNumber+=1;
				oArgs.page_number=pageNumber;
			}else{
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}	
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
			if(clearFilters){
				filterUsed=false;
			}
			
		}
	}
	
	//$scope.sortBy={opt:'start_time'};
	$scope.sortBy={opt:''};
	
	$scope.filterByText='';
	
	$ionicModal.fromTemplateUrl('templates/search-filters.html', {
		scope: $scope
	  }).then(function(searchmodal) {
		$scope.searchmodal = searchmodal;
	  });

	  $scope.closeSearchFilters = function() {
		$scope.searchmodal.hide();
	  };

	  $scope.selectSearchFilters = function() {
		$scope.popover.hide();
		if($scope.events.length>0){
			$scope.searchmodal.show();
		}else{
			$cordovaToast
				.show('Events being loaded, please wait...', 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
				 
				}, 3000);
				 
				}, function (error) {
				  // error
				});
		}
	  };
	
	
	$ionicModal.fromTemplateUrl('templates/search-sort.html', {
		scope: $scope
	  }).then(function(searchSortModal) {
		$scope.searchSortModal = searchSortModal;
	  });

	  $scope.closeSearchSort = function() {
		$scope.searchSortModal.hide();
	  };

	  $scope.selectSearchSort = function() {
		$scope.popover.hide();
		if($scope.events.length>0){
			$scope.searchSortModal.show();
		}else{
			$cordovaToast
				.show('Events being loaded, please wait...', 'long', 'center')
				.then(function(success) {
				  // success
				  $timeout(function() {
				 
				}, 3000);
				 
				}, function (error) {
				  // error
				});
			}
	  };
	  
	  $scope.changeSearchSort = function(){
	  
		$scope.searchSortModal.hide();
	  }	
		
	  $scope.clearAllSort = function(){
		$scope.sortBy.opt='';
	  }	
		
		
	  $scope.changeSearchFilters = function(attribute) {
			$scope.filterByText='';
			var filterCityData=$scope.filterCityData;
			var filterTitleData=$scope.filterTitleData;
			
			var filterCity = [];
			var filterTitle = [];
			
			for(city in filterCityData){
				if(filterCityData[city]===true){
					filterCity.push(city);	
				}
			}
			
			for(title in filterTitleData){
				if(filterTitleData[title]===true){
					filterTitle.push(title);	
				}
			}
			
			
		
			$scope.filterBy = function(event) {
				if(attribute==='city_name' && filterCity.length>0){
					filterUsed=true;
					return (filterCity.indexOf(event.city_name) !== -1);
					
				}else if(attribute==='title' && filterTitle.length>0){
					filterUsed=true;
					return (filterTitle.indexOf(event.title) !== -1);
				}else{
					$scope.filterCityData={};
					$scope.filterTitleData={};
					$scope.filterBy ={};
				}
				
			};
			
		$scope.closeSearchFilters();
	  };
	  
	  
	  $scope.clearFilterText = function() {
		$scope.filterByText='';
	}
		
	  $scope.clearAllFilters = function() {
		$scope.filterByText='';
		$scope.filterCityData={};
		$scope.filterTitleData={};
		$scope.filterBy ={};
		clearFilters=true;
		
	  };
	  
    })