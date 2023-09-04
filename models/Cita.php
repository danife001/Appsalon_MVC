<?php


namespace Model;

class Cita extends ActiveRecord{

    protected static $tabla ='citas';
    protected static $columnasDB = ['id','fecha','hora','usuarioId'];

    public $id;
    public $fecha;
    public $hora;
    public $usuarioId;

    public function __construct($argc = [])     
    {   
        $this->id = $argc['id'] ?? null;
        $this->fecha= $argc['fecha'] ?? '';
        $this->hora = $argc['hora'] ?? '';
        $this->usuarioId = $argc['usuarioId'] ?? '';
    }
}