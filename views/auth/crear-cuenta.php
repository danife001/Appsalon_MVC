<h1 class="nombre-pagina">crear cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear una cuenta</p>
<?php
    include_once __DIR__."/../templates/alertas.php";
    
?>
<form action="/crear-cuenta" class="formulario" method="POST">
    <div class="campo">
        <label for="nombre">Nombre</label><input type="text" id="nombre" placeholder="ingrese su nombre" name="nombre" value="<?php echo s($usuario->nombre)  ?>">
    </div>
    <div class="campo">
    <label for="apellido">Apellido</label><input type="text" id="apellido" placeholder="ingrese su apellido" name="apellido" value="<?php echo s($usuario->apellido)  ?>">
    </div>
    <div class="campo">
    <label for="telefono">Telefono</label><input type="tel" id="telefono" placeholder="ingrese su telefono" name="telefono" value="<?php echo s($usuario->telefono)  ?>">
    </div>
    <div class="campo">
    <label for="email">Email</label><input type="email" id="email" placeholder="ingrese su email" name="email" value="<?php echo s($usuario->email)  ?>">
    </div>
    <div class="campo">
    <label for="password">password</label><input type="password" id="password" placeholder="ingrese su password" name="password" >
    </div>

    <input type="submit" value="Crear Cuenta" class="boton">
</form>
<div class="acciones">
    <a href="/">¿ya tienes una cuenta? ingresa </a>
    <a href="/olvide">¿Ovidaste tu password? </a>
</div>