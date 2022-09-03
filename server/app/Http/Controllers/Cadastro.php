<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class Cadastro extends Controller
{
    private $cliente;

    public function __construct() 
    {
        $this->cliente = new Cliente(); 
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $senha = $request->senha;
        $senha = password_hash($senha, PASSWORD_DEFAULT);

        $telefone = $request->telefone;
        $telefone = preg_replace('/[^A-Za-z0-9\-]/', '', $telefone);
        $telefone = str_replace('-', '', $telefone);

        $cpf = $request->cpf;
        $cpf = preg_replace('/[^A-Za-z0-9\-]/', '', $cpf);
        $cpf = str_replace(['.', '-'], '', $cpf);



        $cep = $request->cep;
        $cep = str_replace('-', '', $cep);

        $cadastro = $this->cliente->create([
            'nomeCliente' => $request->nome,
            'cpfCliente' => $cpf,
            'cepCliente' => $cep,
            'telCliente' => $telefone,
            'celCliente' => $request->celular,
            'fotoCliente' => $request->foto,
            'ruaCliente' => $request->rua,    
            'numCliente' => $request->numero,
            'bairroCliente' => $request->bairro,
            'cidadeCliente' => $request->cidade,
            'estadoCliente' => $request->estado,
            'complementoCliente' => $request->complemento,
            'emailCliente' => $request->email,
            'senhaCliente' => $senha,
        ]);
    }
}
