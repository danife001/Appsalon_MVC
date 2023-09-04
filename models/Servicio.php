<?php

namespace Model;

class Servicio extends ActiveRecord{

    // base de datos
    protected static $tabla = 'servicios';
    protected static $columnasDB = ['id','nombre','precio'];

    public $id;
    public $nombre;
    public $precio;

    public function __construct($argc = [])
    {
        $this->id = $argc['id']?? null;
        $this->nombre = $argc['nombre'] ?? '';
        $this->precio= $argc['precio']?? '';
    }

    public function validar()
    {
        if(!$this->nombre){
            self::$alertas['error'][] = 'El nombre del servicio es obligatorio';
        }
        if(!is_numeric($this->precio)){
            self::$alertas['error'][] = 'El precio no es valido';
        }
        return self::$alertas;
    }
}