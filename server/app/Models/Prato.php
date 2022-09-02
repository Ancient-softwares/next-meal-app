<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prato extends Model
{
    use HasFactory;

    protected $table = 'tbPrato';

    protected $fillable = [
        'idPrato',
        'nomePrato',
        'valorPrato',
        'ingredientesPrato',
        'fotoPrato',
        'idTipoPrato',
        'idRestaurante'
    ];
}
