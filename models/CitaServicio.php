<?php

namespace Model;

class CitaServicio extends ActiveRecord{
    protected static $tabla = 'citasservicios';
    protected static $columnasDB =['id','citaId','servicioId'];

    public $id;
    public $citaId;
    public $servicioId;

    public function __construct($argc =[])
    {
        $this->id = $argc['id'] ?? null;
        $this->citaId = $argc['citaId'] ?? '';
        $this->servicioId = $argc['servicioId'] ?? '';    
    }
}