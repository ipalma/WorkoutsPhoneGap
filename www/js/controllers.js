angular.module('starter.controllers', [])
    .controller('RegistroCtrl', function($scope,$ionicLoading,$ionicPopup,$state, camara, Usuarios) {
        $scope.usuario={};
        $scope.camara={};
        $scope.RegistrarUsuario=function(){
            $ionicLoading.show(
                {
                    template:'Registrando Usuario'
                }
            );
            Usuarios.Registrar($scope.usuario).then(
                function(res){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Creado correctamente',
                        title:'Success'
                    })
                },
                function(err){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Error al registrar',
                        title: 'Error'
                    });
                });
        };
        $scope.seleccionarFoto=function(){
            $ionicLoading.show(
                {
                    template:'Accediendo a libreria'
                }
            );
            camara.seleccionarFoto($scope.camara).then(
                function(foto){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'seleccionado correctamente',
                        title:'Success'
                    })
                    $scope.usuario.foto="data:image/jpeg;base64, "+ foto;
                },
                function(err){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template:'Error al acceder a la libreria',
                        title: 'Error'
                    });
                });
        };
    })



    .controller("Ficheroscontroller", function($scope, Ficheros)
    {
        $scope.escribir=function()
        {
            Ficheros.escribir("Hola soy edu, ...","datos.dat");
        }
        $scope.leer=function()
        {
            Ficheros.leer("datos.dat");
        }

    })
    .controller('MapsCtrl', function ($scope, $ionicPlatform, Geolocalizacion, camara, Zonas, $state, PassParameters) {
        var pin;
        var center;
        var localizacion;
        var infobox;
        var pines;
        $scope.imagen = {data: ''};
        $scope.sacarFoto = function () {

            camara.sacarFoto().then(function (foto) {

                    $scope.imagen.data = "data:image/jpeg;base64, " + foto;

                    PassParameters.setFoto($scope.imagen.data);
                    $state.go('noLogin.NuevoEjercicio');




                },
                function (err) {
                    alert(err);
                })

        }
        $scope.mapaCargado=function(map){
            $scope.map=map;
            infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), {
                'visible': false,
                'htmlContent': '(sin informacion)',
                'offset': new Microsoft.Maps.Point(-14, 40)
            });

            var DisplayLoc=  function (){
                var defaultInfobox = new Microsoft.Maps.Infobox(center, null);
                map.entities.push(defaultInfobox)

            };
/*            var mostrarInfobox = function(e){
                var r = localizacion[e.target.id - 1];
                map.setView({'center': new Microsoft.Maps.Location(r.latitud, r.longitud)});
                infobox.setLocation(new Microsoft.Maps.Location(r.latitud, r.longitud));
                infobox.setOption({
                    visible: true
                });

            };*/
            Geolocalizacion.getPosicionActual().then(
                function(pos){
                    PassParameters.SetPosicion(pos.latitud, pos.longitud);
                    //alert("Posicion actual: "+pos.latitud+", "+pos.longitud);
                    $scope.map.setView({center: new Microsoft.Maps.Location(pos.latitud, pos.longitud), zoom: 25});
                    center = $scope.map.getTargetCenter();
                    pin = new Microsoft.Maps.Pushpin(center);
                    Microsoft.Maps.Events.addHandler(pin, 'mouseup', DisplayLoc);
                    map.entities.push(pin);


                },
                function(err){
                    alert(err.message);
                }

            );
            var InfoboxHandler = function(){
                $state.go('tab.ejercicios');
            };
            Geolocalizacion.insertarPushpin().then(
                function(pins){
                    for(var i = 0; i<pins.length; i++){
                        localizacion = {
                            id: pins[i].id,
                            latitud: pins[i].latitud,
                            longitud: pins[i].longitud,
                            nombre: pins[i].nombre,
                            descripcion: pins[i].descripcion,
                            foto: pins[i].foto
                        };
                        pines = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(localizacion.latitud, localizacion.longitud));
                        var infoOptions = {
                            title: pins[i].nombre,
                            description: '<div>'+'<div class="miimagenpeque"><img src="'+pins[i].foto+'" style="width: 80%"/></div><div class="iteminfobox">'+pins[i].descripcion+'</div></div>',
                            titleClickHandler: InfoboxHandler };

                        var info = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(localizacion.latitud, localizacion.longitud), infoOptions);
                        map.entities.push(info);
                        //a



                        $scope.map.entities.push(pines);
                    }

                }
            )

        };
    })

    /*.controller('RutinasCtrl', function($scope, Rutinas, Conexion) {
        $scope.rutinas=[];
        if(Conexion.getEstado()){
            Rutinas.getRutinas().then(function(res){
                    $scope.rutinas=res;
                    //Bbdd.guardarRutinas(res);
                },
                function(err){
                    alert(err);
                });
        }
        else
        {
            alert('No hay conexión');
        }
    })*/


    .controller('EjerciciosCtrl', function($scope, Ejercicios,Conexion) {
        $scope.ejercicios=[];
        if(Conexion.getEstado()){
            Ejercicios.getEjercicios().then(function (res) {
                    $scope.ejercicios=res;
                },
                function(err){
                    alert(err);
                });
        }
        else
        {
            alert('No hay conexión');
        }
        $scope.doRefresh = function () {
            Ejercicios.getEjercicios().then(function (res) {
                    $scope.ejercicios = res;
                },
                function (err) {
                    alert(err);
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    })
    .controller('NuevoEjercicio', function ($scope, $stateParams, $ionicLoading, $ionicPlatform, $ionicPopup, PassParameters, Geolocalizacion, Zonas, $state) {

        $scope.ejercicios={};
        $scope.registrar = function () {

            Geolocalizacion.getPosicionActual().then(function (pos) {
                    PassParameters.SetPosicion(pos.latitud, pos.longitud);
                },
            function(err)
            {
                alert(err.message);
            });
            /*$ionicLoading.show(
                {
                    template: 'Registrando Nueva Zona'
                }
             );*/
            var mifoto = PassParameters.getFoto();
            var miposicion= PassParameters.GetPosicion();
            var nuevazona={
                latitud: miposicion.lat,
                longitud: miposicion.longi,
                nombre: $scope.ejercicios.nombre,
                descripcion: $scope.ejercicios.descripcion,
                foto: mifoto
            };
            Zonas.registrarZona(nuevazona).then(
                function (res) {
                    /*$ionicLoading.hide();
                    $ionicPopup.alert({
                        template: 'Creado correctamente',
                        title: 'Success'
                     })*/
                    $state.go('tab.Mapa');
                },
                function (err) {
                    /*$ionicLoading.hide();
                    $ionicPopup.alert({
                        template: 'Error al registrar',
                        title: 'Error'
                     });*/
                });
        };


    })
    .controller("FotosController", function ($scope, camara, PassParameters, $state) {
        $scope.imagen = {data: ''};
        $scope.sacarFoto = function () {

            camara.sacarFoto().then(function (foto) {

                    $scope.imagen.data = "data:image/jpeg;base64, " + foto;
                    alert("foto tomada" + foto);
                    PassParameters.SetFoto($scope.imagen.data).then(function () {

                            $state.go('noLogin.NuevoEjercicio');
                        },

                        function (err) {
                            alert(err);
                        }
                    );


                },
                function (err) {
                    alert(err);
                })

        }
    })
    .controller('PerfilCtrl', function ($scope, Conexion, Usuarios) {
        $scope.usuario = {};
        if (Conexion.getEstado()) {
            Usuarios.GetUsuario().then(function (res) {
                    $scope.usuario = res[0];
                    if ($scope.usuario.genero == "M") {
                        $scope.usuario.genero = "Hombre";

                    }
                    else {
                        $scope.usuario.genero = "Mujer";
                    }
                },
                function (err) {
                    alert(err);
                });
        }
        else {
            alert('No hay conexión');
        }

    })


    .controller('LoginCtrl', function ($scope, $ionicLoading, $ionicPopup, $state, $ionicPlatform, Usuarios) {
        $scope.usuario = {};

        $scope.iniciarSession = function () {
            $ionicLoading.show({
                template: 'Validando cuenta de usuario'
            });
            Usuarios.validarUsuario($scope.usuario).then(
                function (res) {
                    $ionicLoading.hide();
                    if (res.length > 0) {
                        localStorage.usuario = JSON.stringify(res[0]);
                        $state.go("tab.rutinas");
                    } else {
                        $ionicPopup.alert({
                            template: 'Credenciales incorrectas',
                            title: '¡Error!'
                        });
                    }
                },
                function (err) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        template: 'Error al validar el usuario',
                        title: '¡Error!'
                    });
                });
        };
        $ionicPlatform.ready(function () {
            if (localStorage.usuario) {
                $scope.usuario = JSON.parse(localStorage.usuario);
                /*if (Conexion.getEstado()) {
                    $scope.iniciarSesion();
                }
                else {
                    $state.go("");
                }*/
            }
        });
});

