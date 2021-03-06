$.fn.extend({ChatSocket: function(opciones) {
					var ChatSocket=this;
				    //aquí podemos cambiar el idioma de todo
                    var idChat=$(ChatSocket).attr('id');
                    //alert(idChat); idChat es el div donde esta la conversación del chat

					defaults = {
		                  ws,
                          Room:"",
                          pass:"1234",
                          lblTitulChat:"  Chat ",
                          lblCampoEntrada:"Menssage",
                          lblEnviar:"Send",
                          textoAyuda:"Develoteca",
                          Nombre:"Anónimo",
                          
                          urlImg:"http://placehold.it/50/55C1E7/fff&text=U",
                          btnEntrar:"btnEntrar",
                          btnEnviar:"btnEnviar",
                          lblBtnEnviar:"Enviar",
                          lblTxtEntrar:"txtEntrar",
                          lblTxtEnviar:"txtMensaje",
                          lblBtnEntrar:"Enter",
                          idDialogo:"DialogoEntrada",
                          classChat:"",
                          idOnline:"ListaOnline",
                          lblUsuariosOnline:"Users joined",
                        lblEntradaNombre:"Name:",
                        panelColor:"info"
        			}
					
                     var opciones = $.extend({}, defaults, opciones);
		
                     var ws;
                     var Room=opciones.Room;
                     var pass=opciones.pass;
                     var lblTitulChat=opciones.lblTitulChat;
                     var lblCampoEntrada=opciones.lblCampoEntrada;
                     var lblEnviar=opciones.lblBtnEnviar;
                     var textoAyuda=opciones.textoAyuda;
                     var Nombre=opciones.Nombre;
                     
                     var urlImg=opciones.urlImg;
                     var btnEntrar=opciones.btnEntrar;
                     var btnEnviar=opciones.btnEnviar;
                     var lblBtnEnviar=opciones.lblBtnEnviar;
                     var lblTxtEntrar=opciones.lblTxtEntrar;
                     var lblTxtEnviar=opciones.lblTxtEnviar;
                     var lblBtnEntrar=opciones.lblBtnEntrar;
                     var idDialogo=opciones.idDialogo;
                     var classChat=opciones.classChat;
                     var idOnline=opciones.idOnline;
                     var lblUsuariosOnline=opciones.lblUsuariosOnline;
                     var lblEntradaNombre=opciones.lblEntradaNombre;
                     var panelColor=opciones.panelColor;


                    //idOnline viene a ser listaOnline
                    //no le veo utilidad.
                    if( $('#'+idOnline).length==0 )
                    {
                     idOnline=idChat+"listaOnline";
                        alert(idOnline);
                        $('#'+idChat).append('<br/><div id="'+idOnline+'"></div>');
                        
                    }
    
    
            //esta funcion se ejcuta solo una vez y a través de ajax
            //se actualizan
            function IniciarConexion(){
                    contador=0;
                    conex='{"setID":"'+Room+'","passwd":"'+pass+'"}';
                    ws= new WebSocket("ws://achex.ca:4010");
                    ws.onopen= function(){ ws.send(conex); }


                    //este es un listener que espera algun mensaje y lo muestra
                    //en las dos partes
                    ws.onmessage= function(Mensajes){
                        if(contador!=2){
                        contador=contador+1;


                                var MensajesObtenidos=Mensajes.data;

                                    //alert(MensajesObtenidos)
                                    // es info que nos manda el servidor;
                                var obj = jQuery.parseJSON(MensajesObtenidos);


                                AgregarItem(obj);

                                if(obj.sID!=null){

                                    //aquí se esta añadiendo a los usuarios conectados en su panel
                                    //el obj.sID es el id del usuario a conectar.
                                if( $('#'+obj.sID).length==0 )
                                {

                                  $('#listaOnline').append('<li class="list-group-item" id="'+obj.sID+'"><span class="label label-success">&#9679;</span> - '+obj.Nombre+'</li>');

                                }

                            }
                        }else{

                        }
                }
                ws.onclose= function(){
                    alert("Conexión cerrada");
                }
          }
           IniciarConexion();

        //mostrar interfaz, mostrar conectados y
          function iniciarChat(){
            Nombre='admin';
            $('#'+idDialogo).hide();
              $('#'+idOnline).show();
              
            CrearChat();  
            UsuarioOnline();
            getOnline();
          }
            iniciarChat();
           //es para iniciar toda la intefaz y algunos componentes de queines estan online, etc.
          function CrearEntrada(){
          $('#'+idChat).append('<div id="'+idDialogo+'" class="'+classChat+'" id="InputNombre"><div class="panel-footer" style="margin-top:100px;"><div class="input-group"><input id="'+lblTxtEntrar+'" type="text" class="form-control input-sm" placeholder="'+lblEntradaNombre+'"><span class="input-group-btn"><button id="'+btnEntrar+'" class="btn btn-success btn-sm" >'+lblBtnEntrar+'</button></span></div></div></div>');
         $('#'+idOnline).append(' <div class="panel panel-'+panelColor+'"><div class="panel-heading"><span class="glyphicon glyphicon-user"></span> '+lblUsuariosOnline+'</div><div class="panel-body"><ul class="list-group" id="listaOnline"></ul></div><div class="panel-footer"><div class="input-group"><div><a href="http://develoteca.com">by develoteca.com</a></div></span></div></div></div>');
              $("#"+lblTxtEntrar).keyup(function (e) {if (e.keyCode == 13) { iniciarChat(); }});
              $("#"+btnEntrar).click(function(){
              iniciarChat();
              });
        }


            //eliminar mensaje de nombre y agregar intefaz de chat
          function CrearChat(){
             $('#'+idChat ).append( '<div class="'+classChat+'"><div class="panel panel-'+panelColor+'"><div class="panel-heading"><span class="glyphicon glyphicon-comment"></span>'+" "+lblTitulChat+'<div class="btn-group pull-right"></div></div><div class="panel-body"><ul class="chatpluginchat"></ul></div><div class="panel-footer"><div class="input-group"><input id="'+lblTxtEnviar+'" type="text" class="form-control input-sm" placeholder="'+lblCampoEntrada+'" /><span class="input-group-btn"><button  class="btn btn-warning btn-sm" id="'+btnEnviar+'">'+lblEnviar+'</button></span></div></div></div></div><li class="left clearfix itemtemplate" style="display:none"><span class="chat-img pull-left"><img src="'+urlImg+'" alt="User Avatar" class="img-circle" id="Foto"/></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font" id="Nombre">Nombre</strong><small class="pull-right text-muted"><span class="glyphicon glyphicon-asterisk"></span><span id="Tiempo">12 mins ago</span></small></div> <p id="Contenido">Contenido</p></div></li>');
              
    $("#"+lblTxtEnviar).keyup(function (e) {if (e.keyCode == 13) { EnviarMensaje();}});
    $("#"+btnEnviar).click(function () {EnviarMensaje();});
              
        }

    //convertir contenido para aceptar urls

    function autolink(str, attributes)
    {
        attributes = attributes || {};
        var attrs = "";
        for(name in attributes)
            attrs += " "+ name +'="'+ attributes[name] +'"';

        var reg = new RegExp("(\\s?)((http|https|ftp)://[^\\s<]+[^\\s<\.)])", "gim");
        str = str.toString().replace(reg, "$1<a target='_blank' href='$2'"+ attrs +">$2</a>");

        return str;
    }

        function EnviarMensaje(){



            var contenidoWithlinks=autolink($('#'+lblTxtEnviar).val());

           ws.send('{"to":"'+Room+'","Nombre":"'+Nombre+'","Contenido":"'+contenidoWithlinks+'"}');
        $("#"+lblTxtEnviar).val('');
          
        };
        function UsuarioOnline(){
           ws.send('{"to":"'+Room+'","Nombre":"'+Nombre+'"}');
        }


    //agregar nombre, contenido y fecha.
        function AgregarItem(Obj){
            
            if((Obj.Contenido!=null)&&(Obj.Nombre!=null)){
                
            $( ".itemtemplate" ).clone().appendTo( ".chatpluginchat" );
            $('.chatpluginchat .itemtemplate').show(10);
            $('.chatpluginchat .itemtemplate #Nombre').html(Obj.Nombre);


            $('.chatpluginchat .itemtemplate #Contenido').html(Obj.Contenido);
             
             var formattedDate = new Date();
             var d = formattedDate.getUTCDate();
             var m =  formattedDate.getMonth();
             var y = formattedDate.getFullYear();
             var h= formattedDate.getHours();
             var min= formattedDate.getMinutes();
            
            Fecha=d+"/"+m+"/"+y+" "+h+":"+min;
            
            $('.chatpluginchat .itemtemplate #Tiempo').html(Fecha);
            $('.chatpluginchat .itemtemplate').removeClass("itemtemplate");
            }
        }

    //obtener un nuevo usuario cada 3 segundos.
    function getOnline() {
                setInterval(UsuarioOnline, 3000);
            }
           
         
         CrearEntrada();
    // Fin
    
	}
});