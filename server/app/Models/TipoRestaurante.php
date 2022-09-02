<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoRestaurante extends Model
{
    use HasFactory;

    protected $table = "tbTipoRestaurante";

    protected $fillable = [
        'idTipoRestaurante',
        'tipoRestaurante'
    ];
}
