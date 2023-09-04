<?php


namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController{
    public static function login(Router $router){
        $alertas = [];

        if($_SERVER['REQUEST_METHOD']==='POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth ->validarLogin();
            
            if(empty($alertas)){
                // comprobar que exista el usuario
                $usuario = Usuario::where('email',$auth->email);
                if($usuario){
                  if($usuario->comprobarPasswordAndVerificado($auth->password)){
                    session_start();

                    $_SESSION['id'] = $usuario->id;
                    $_SESSION['nombre'] = $usuario->nombre. " ". $usuario->apellido;
                    $_SESSION['email'] = $usuario->email;
                    $_SESSION['Login'] = true;  



                    if($usuario->admin ==="1"){
                        $_SESSION['admin'] = $usuario->admin?? null;

                        header('Location:/admin');
                    }else{
                        header('Location:/cita');
                    }
                    

                  }
                }else{
                    Usuario::setAlerta('error','usuario no encontrado');
                }   
            }

        }

        $alertas = Usuario::getAlertas();
        
        $router->render('auth/login',[
            'alertas' => $alertas
        ]);
    }
    public static function logout(){
        session_start();
        

        $_SESSION = [];
        header('Location:/');
    }
    public static function olvide(Router $router){
        $alertas =[];

        if($_SERVER['REQUEST_METHOD']==='POST'){
            $auth = new Usuario($_POST);
            $alertas = $auth->validarEmail();
            if(empty($alertas)){
                $usuario = Usuario::where('email',$auth->email);

                if($usuario&& $usuario-> confirmado === "1"){
                    $usuario->crearToken();
                    $usuario->guardar();
                    
                    // enviar el email
                    $email = new Email($usuario->email, $usuario->nombre,$usuario->token);
                    $email->enviarInstrucciones();

                    Usuario::setAlerta('exito','Revisa tu email');

                }else{
                    Usuario::setAlerta('error','El usuario no exite o no esta confirmado');
                }
            }
            $alertas = Usuario::getAlertas();

        }
        $router->render('auth/olvide-password',[
            'alertas'=> $alertas
        ]);
    }
    public static function recuperar(Router $router){
        $alertas= [];
        $error = false;

        $token = s($_GET['token']);
        // buscar usuario

        $usuario = Usuario::where('token',$token);

        if(empty($usuario)){
            Usuario::setAlerta('error','token no valido');
            $error=true;
        }
        if($_SERVER['REQUEST_METHOD']==='POST'){
            $password = new Usuario($_POST);
            $alertas = $password->validarPassword();
            if(empty($alertas)){
                $usuario->password = null;

                $usuario->password = $password->password;
                $usuario->hashPassword();
                $usuario->token = null;

                $resultado =$usuario->guardar(); 
                if($resultado){
                    header('Location:/');
                }
             
            }
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/recuperar-password',[
            'alertas'=>$alertas,
            'error'=>$error
        ]);
    }
    public static function crear(Router $router){
        $usuario = new Usuario;
        $alertas = [];
        
        if($_SERVER['REQUEST_METHOD']==='POST'){
            
            $usuario->sincronizar($_POST);      
            $alertas = $usuario->validarNuevaCuenta();

            // revisar que alerta este vacio
            if(empty($alertas)){
               $resultado =  $usuario -> existeUsuario();

               if($resultado->num_rows){
                 $alertas = Usuario::getAlertas();
               }else{
                // hachear password
                $usuario->hashPassword(); 

                // GENERAR UN TOKEN UNICO 
                $usuario->crearToken();

                $email= new Email($usuario->nombre, $usuario->email, $usuario->token);

                $email->enviarConfirmacion();

                // crear el usuario
                $resultado= $usuario->guardar();
                if($resultado){
                    header('Location:/mensaje');
                }

                // no esta regitrado
                //  debuguear($usuario);
               }
            }
        }
       
        $router->render('auth/crear-cuenta',[
            'usuario' => $usuario,
            'alertas' => $alertas

        ]);
    }
    public static function mensaje(Router $router){

        $router->render('auth/mensaje');
    }

    public static function confirmar(Router $router){
        $alertas =[];
        $token = s($_GET['token']);
        $usuario = Usuario::where('token',$token);

        if(empty($usuario)){
            Usuario::setAlerta('error','Token no valido');
        }else{
            $usuario->confirmado ="1";
            $usuario->token="";
            $usuario->guardar();
            Usuario::setAlerta('exito','usuario Confirmado');
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/confirmar-cuenta',[
            'alertas' => $alertas
        ]);
    }
}