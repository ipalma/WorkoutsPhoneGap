/**
 * Created by Isaac on 05/03/2015.
 */
angular.module('directivas',[])
.directive('mapa',function(){
        return{
            restrict: 'E',
            scope:{
                onCreate: '&'
            },
            link:function($scope,$element,$attr){
                function initialize(){
                    var locInicial = new Microsoft.Maps.Location(40.416944, -3.703611);
                    var mapOptions = {
                        'credentials': 'At-fEBxDkMLxJxvjA7O1G4101m14bUi2zPD2n_dshiJeR9Y12Gl9g7cwNaB6rfms',
                        'center':locInicial,
                        'enableClickableLogo': false,
                        'enableSearchLogo': false,
                        'showMapTypeSelector':false,
                        'disableBirdEye': true,
                        'mapTypeId': Microsoft.Maps.MapTypeId.birdseye,
                        'zoom': 14
                    };
                    var map = new Microsoft.Maps.Map($element[0],mapOptions);
                    $scope.onCreate({map:map});
                }
                    initialize();
            }
        }
    });