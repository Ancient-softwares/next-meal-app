<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'tbCliente';

    protected $fillable = [
        'idCliente',
        'nomeCliente',
        'cpfCliente',
        'emailCliente',
        'senhaCliente',
        'telCliente',
        'celCliente',
        'cepCliente',
        'fotoCliente',
        'ruaCliente',
        'numCliente',
        'bairroCliente',
        'cidadeCliente',
        'estadoCliente',
        'complementoCliente',
    ];
}
