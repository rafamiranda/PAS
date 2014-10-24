angular.module('pasApp.controllers', [])

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
            
            // Called to navigate to the main app
            $scope.startApp = function() {
                $state.go('tab.register');
            };
            $scope.next = function() {
                $ionicSlideBoxDelegate.next();
            };
            $scope.previous = function() {
                $ionicSlideBoxDelegate.previous();
            };
            
            // Called each time the slide changes
            $scope.slideChanged = function(index) {
                $scope.slideIndex = index;
            };
})


.controller('RegisterCtrl', function($scope, $localstorage, $state) {
            
            $scope.toIntro = function(){
                $state.go('tab.intro');
            }
            
            $scope.user = {};
            if($localstorage) {
            var user = $localstorage.getObject('User');
            console.log(user);
            $scope.user = user;
            }
            
            
            $scope.registerUser = function() {
            if(!$scope.user) {
            //error
            return;
            }

            console.log($scope.user);
            
            if(!$localstorage) {
            //error
            return;
            }
            
            $localstorage.setObject('User', {
                                    name: $scope.user.name,
                                    lastname: $scope.user.lastname,
                                    email: $scope.user.email,
                                    address: $scope.user.address,
                                    });
            
            var user = $localstorage.getObject('User');
            console.log(user);
            
            }
            
            })

.controller('DiagnosisCtrl', function($scope, $http, $localstorage) {
            
            $scope.formData = {};
            $scope.fields = {};
            // entity to edit
            $scope.entity = {
            name: 'Max',
            country: 2,
            licenceAgreement: true,
            description: 'I use AngularJS'
            };
            

            
            // fields description of entity
            var questions = [
                             {
                             name: 'question1',
                             title: 'Teve febre nos últimos 5 dias?',
                             type: {
                             view: 'select',
                             options: [
                                       {id: 0, name: 'Sim'},
                                       {id: 1, name: 'Não'},
                                       {id: 2, name: 'Não sei'}
                                       ]
                             }
                             },
                             {
                             name: 'question2',
                             title: 'Esteve fora de São Gonçalo ultimamente?',
                             type: {
                             view: 'select',
                             options: [
                                       {id: 0, name: 'Sim'},
                                       {id: 1, name: 'Não'},
                                       {id: 2, name: 'Não sei'}
                                       ]
                             }
                             },
                             {
                             name: 'question3',
                             title: 'Possui alguma picada de mosquito visível?',
                             type: {
                             view: 'select',
                             options: [
                                       {id: 0, name: 'Sim'},
                                       {id: 1, name: 'Não'},
                                       {id: 2, name: 'Não sei'}
                                       ]
                             }
                             },
                             {
                             name: 'question4',
                             title: 'Sentiu dor de cabeça ultimamente?',
                             type: {
                             view: 'select',
                             options: [
                                       {id: 0, name: 'Sim'},
                                       {id: 1, name: 'Não'},
                                       {id: 2, name: 'Não sei'}
                                       ]
                             }
                             }
                             ];
            
            $http.get('http://echo.jsontest.com/Question1/Question1Text/Question2/Question2Text/Question3/Question3Text/Question4/Question4Text').then(function(resp) {
                    console.log('Success', resp);
                    //var questions = resp.data;
                    $scope.fields = questions;
                    //console.log(questions);
                                                                                                                                                       
                                                                                                                                                       
                    // For JSON responses, resp.data contains the result
                    }, function(err) {
                    console.error('ERR', err);
                    // err.status will contain the status code
                    $scope.fields = questions;
                    })
            
            $scope.sendDiagnose = function() {
                $localstorage.setObject('Diagnosis', {
                                    name: entity[field.name],
                                    lastname: $scope.user.lastname,
                                    email: $scope.user.email,
                                    address: $scope.user.address,
                                    });
            
                var diagnosis = $localstorage.getObject('Diagnosis');
                console.log(diagnosis);
            }
})

.controller('MapCtrl', function($scope, $ionicLoading, $compile)  {
            
            
            function initialize() {
            var myLatlng = new google.maps.LatLng(-22.8246453,-43.0489646);
            
            var mapOptions = {
            center: myLatlng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            
            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>TODOs</a></div>";
            var compiled = $compile(contentString)($scope);
            
            var infowindow = new google.maps.InfoWindow({
                                                        content: compiled[0]
                                                        });
            
            var marker = new google.maps.Marker({
                                                position: myLatlng,
                                                map: map,
                                                title: 'Prefeitura Municipal de São Gonçalo'
                                                });
            
            google.maps.event.addListener(marker, 'click', function() {
                                          infowindow.open(map,marker);
                                          });
            
            $scope.map = map;
            }
            
            $scope.centerOnMe = function() {
            if(!$scope.map) {
            return;
            }
            
            $scope.loading = $ionicLoading.show({
                                                content: 'Getting current location...',
                                                showBackdrop: false
                                                });
            var myLatlng;
            navigator.geolocation.getCurrentPosition(function(pos) {
                                                     myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                                                     $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                                                     
                                                     //$scope.loading.hide();
                                                     $ionicLoading.hide();
                                                     
                                                     }, function(error) {
                                                     alert('Unable to get location: ' + error.message);
                                                     });
            };
            
            $scope.clickTest = function() {
            alert('Pegar geolocalização pelo endereço do cadastro\rPensar em outra coisa..cd.')
            };
            
            google.maps.event.addDomListener(window, 'load', initialize);
            
            initialize();
            
            })

.controller('FriendsCtrl', function($scope, Friends) {
            $scope.friends = Friends.all();
            })

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
            $scope.friend = Friends.get($stateParams.friendId);
            });