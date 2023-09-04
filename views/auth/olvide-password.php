<h1 class="nombre-pagina">recuperar password</h1>
<p class="descripcion-pagina">Reestablece tu password escribiendo tu email</p>
<?php
    include_once __DIR__."/../templates/alertas.php";
    
?>
<form action="/olvide" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label><input type="email" id="email" placeholder="Ingresa tu email" name="email">
    </div>
    <input type="submit" class="boton" value="Enviar ">
</form>
<div class="acciones">
    <a href="/">¿ya tienes una cuenta? ingresa </a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crear una </a>
</div>