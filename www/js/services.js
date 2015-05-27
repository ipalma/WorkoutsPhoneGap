angular.module('starter.services', [])

.factory('Usuarios', function($http,$q){
        var urlfinal = "https://mcsdworkouts.azure-mobile.net/tables/Usuario";
        $http.defaults.headers.common={
            'X-ZUMO-APPLICATION': 'BMlnNNZFSyqAfuLEYbViWNZeNOZYwW22',
            'Access-Control-Allow-Origin': '*'
        }
        return {
            validarUsuario: function(usuario){
                var query = "?$filter=email eq '"+usuario.email+"' and password eq '"+usuario.password+"'";
                var request = $http({
                    url: urlfinal + query,
                    method: 'get'
                });
                return request.then(ok,err);
            },
            GetUsuario: function () {
                var miusuario = JSON.parse(localStorage.usuario);
                var query = "?$filter=id eq '" + miusuario.id + "'";
                var request = $http({
                    url: urlfinal + query,
                    method: 'get'
                });
                return request.then(ok, err);
            },
            Registrar:function(usuario){

                var request = $http.post(urlfinal, usuario)

                return request.then(ok,err);
            }
        }
        function ok(resp){
            return resp.data;
        }

        function err(resp){
            if(!angular.isObject(resp.data)||!resp.data.message){
                return ($q.reject("Error desconocido"));
            }
            return ($q.reject(resp.data.message));
        }
    })

    .factory('Rutinas', function($http, $q) {
        var url = "https://mcsdworkouts.azure-mobile.net/tables/rutinas";
        $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'BMlnNNZFSyqAfuLEYbViWNZeNOZYwW22',
            'Access-Control-Allow-Origin': '*'
        }

        return {
            getRutinas: function () {
                //var query="?$filter=id eq '"+ idRutina + "'";
                var request = $http(
                    {
                        url: url,     //+query,
                        method: 'get'

                    });
                return request.then(ok, err);
            },
            registrarrutina: function (rutina) {
                var request = $http(
                    {
                        url: url,
                        method: 'post',
                        data: rutina

                    });

                return request.then(ok, err);


            }
        }
    })
            .factory('Zonas', function ($http, $q) {
                var url = "https://mcsdworkouts.azure-mobile.net/tables/Zona_Entrenamiento";
                $http.defaults.headers.common = {
                    'X-ZUMO-APPLICATION': 'BMlnNNZFSyqAfuLEYbViWNZeNOZYwW22',
                    'Access-Control-Allow-Origin': '*'
                }

                return {
                    getRutinas: function () {
                        //var query="?$filter=id eq '"+ idRutina + "'";
                        var request = $http(
                            {
                                url: url,     //+query,
                                method: 'get'

                            });
                        return request.then(ok, err);
                    },
                    registrarZona: function (zona) {
                        var request = $http(
                            {
                                url: url,
                                method: 'post',
                                data: zona

                            });

                        return request.then(ok, err);


                    }
                }


        function ok(resp){
            return resp.data;
        }
        function err(resp){
            if(!angular.isObject(resp.data)|| !resp.data.message ){
                return($q.reject("Error desconocido"))
            }
            return ($q.reject(resp.data.message))
        }
    })


    .factory('Ejercicios', function($http, $q) {
        var url="https://mcsdworkouts.azure-mobile.net/tables/Ejercicios";
        $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'BMlnNNZFSyqAfuLEYbViWNZeNOZYwW22',
            'Access-Control-Allow-Origin': '*'
        }

        return {
            getEjercicios:function(){
                var request=$http(
                    {
                        url:url,
                        method:'get'

                    });
                return request.then(ok,err);
            },
            getEjerciciosPorZona:function(idZona){

                var query="?$filter=idZona eq '"+ idZona + "'";
                var request=$http(
                    {
                        url:url+query,
                        method:'get'

                    });
                return request.then(ok,err);
            },
            NuevaZona: function (ejercicio) {
                var request = $http(
                    {
                        url: url,
                        method: 'post',
                        data: ejercicio

                    });

                return request.then(ok, err);
            }
        }
        function ok(resp){

            return resp.data;
        }
        function err(resp){
            if(!angular.isObject(resp.data)|| !resp.data.message ){
                return($q.reject("Error desconocido"))
            }
            return ($q.reject(resp.data.message))
        }
    })



    .factory('camara', function($q){
        return{
            sacarFoto:function(){
                var deferred=$q.defer();
                // comprobamos si hay acceso a la camara
                if(navigator.camera)
                {
                    navigator.camera.getPicture(function(imagen){
                            deferred.resolve(imagen);
                        },
                        function (err)
                        {
                            deferred.reject(err.message);
                        },{quality:50, destinationType:navigator.camera.DestinationType.DATA_URL});

                }
                else
                {
                    deferred.reject({message:"no tengo acceso a la camara"});
                }
                return deferred.promise;
            },
            seleccionarFoto: function(foto) {
                var deferred=$q.defer();
                // comprobamos si hay acceso a la camara
                if(navigator.camera)
                {
                    navigator.camera.getPicture(function (foto) {
                            deferred.resolve(foto);
                        },
                        function (err) {
                            deferred.reject(err);
                        }, {
                            quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                        });
                }
                else
                {
                    deferred.reject({message:"no tengo acceso a la libreria de imagenes"});
                }
                return deferred.promise;
            }
        }
    })

    .factory('Ficheros',function(){

        var datos;
        var nombre;

        function escritura(filesystem)
        {
            filesystem.root.getFile(nombre,
                {create:true,exclusive:false}, escribirFichero,error);
        }
        function escribirFichero(ficheroEntrada)
        {
            ficheroEntrada.createWriter(ejecutarEscritura,error);
        }
        function ejecutarEscritura(writer)
        {
            writer.onwrite=function()
            {
                alert("Ya ta");
            }
            writer.write(datos);
        }

        function lectura(filesystem)
        {
            filesystem.root.getFile(nombre,{create:false,exclusive:false},leerFichero,error);
        }
        function leerFichero(fichero)
        {
            fichero.file(ejecutarLectura,error);

        }
        function ejecutarLectura(fichero)
        {
            var reader=new FileReader();

            reader.onloadend=function(evt)
            {
                alert(evt.target.result);
            }
            reader.readAsText(fichero);
        }

        function error(err)
        {
            alert(err.message);
        }


        return{

            leer:function(nom)
            {
                nombre=nom;
                window.requestFileSystem(LocalFileSystem.PERSISTENT,0,
                    lectura,error);
            },
            escribir:function(info,nom)
            {
                datos=info;
                nombre=nom;
                window.requestFileSystem(LocalFileSystem.PERSISTENT,0,
                    escritura,error);
            }

        }
    })
    .factory('Geolocalizacion',function($http,$q){
            var url="https://mcsdworkouts.azure-mobile.net/tables/zona_entrenamiento";
            $http.defaults.headers.common = {
            'X-ZUMO-APPLICATION': 'BMlnNNZFSyqAfuLEYbViWNZeNOZYwW22',
            'Access-Control-Allow-Origin': '*'
        };
        return{
            getPosicionActual: function(){

                var deferred = $q.defer();
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(
                        function(pos) {
                            var miPosicion = {
                                latitud: pos.coords.latitude,
                                longitud: pos.coords.longitude
                            };
                            deferred.resolve(miPosicion);
                        },
                        function(err){
                            deferred.reject(err);
                        }
                    );
                }else{
                    deferred.reject({message:'No se puede geolocalizar en este momento'})
                }
                return deferred.promise;
            },
            insertarPushpin: function(){

                    //var query="?$filter=id eq '"+ idZona + "'";
                    var request=$http(
                        {
                            url:url,//+query,
                            method:'get'

                        });
                    return request.then(ok,err);
            }
        };

        function ok(resp){

            return resp.data;
        }
        function err(resp){
            if(!angular.isObject(resp.data)|| !resp.data.message ){
                return($q.reject("Error desconocido"))
            }
            return ($q.reject(resp.data.message))
        }


    })


    .factory('Conexion', function() {
        return {
            getEstado:function(){
                try{
                    /*   var conn= navigator.connection.type;
                     if(conn===Connection.NONE || conn===Connection.UNKNOWN || conn=== Connection.CELL)
                     return false;*/
                    return true;
                }catch (e){
                    alert(e.toString());
                }
            }
        }
    })


.factory('PassParameters',function() {
        var foto="";
        var longitud=0;
        var latitud=0;

        return {
            getFoto: function () {
                return foto;

            },
            setFoto: function (value) {

                foto = value;

            },
            SetPosicion: function (lat, longi) {
                longitud=longi;
                latitud=lat;
            },
            GetPosicion: function () {
                var posicion={
                     longi:longitud,
                lat:latitud

                };

              return posicion;
            }

        };
    })

