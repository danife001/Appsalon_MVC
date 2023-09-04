<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">coloca tu nueva password a continuacion</p>
<?php
    include_once __DIR__."/../templates/alertas.php";
    
?>


<?php if($error) return null; ?>

<form method="POST" class="formulario">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="tu nuevo password">
    </div>
    <input type="submit" class="boton" value="Guardar nuevo password">


</form>

<div class="acciones">
    <a href="/">ya tienes cuenta ? iniciar Sesion </a>
    <a href="/crear-cuenta">aun no tienes cuenta ?</a>
</div>