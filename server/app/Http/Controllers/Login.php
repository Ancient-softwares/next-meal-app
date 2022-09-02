<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class Login extends Controller
{
    private $cliente;

    public function __construct() {
        $this->cliente = new Cliente(); 
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $login = $request->session()->get('login');

        if (isset($login)) {
            return redirect()->route('home');
        } else {
            return view('login');
        }
    }

    public function authenticate(Request $request)
    {
        $cliente = $this->cliente->where('nomeCliente', '=', $request->login);

        if ($cliente) 
        {
            if (password_verify($request->senha, $cliente->senhaCliente)) 
            {
                $request->session()->put('login', $request->login);
                $request->session()->put('idCliente', $request->idCliente);

                return redirect()->route('home');
            } else {
                return redirect()->route('login')->with('error', 'Senha incorreta!');
            }
        }
    }

    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->session()->flush();

        return redirect('/');
    }
}
