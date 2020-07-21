<?php
class Dashboard extends Controller
{
    public function __construct()
    {
        echo 'in dashboard';
    }
    public function index()
    {
        // $data = $_GET['url'];
        // $data = ['username' => 'sophie', 'status' => 'admin'];
        $this->view('users/dashboard');
    }

}

;