<?php
class About extends Controller
{
    public function __construct()
    {
        // echo URL;
    }

    public function index()
    {
        $data = [
            'title' => 'About page data title:',
        ];
        $this->view('about', $data);
    }

    public function about()
    {
        $data = [
            'title' => 'second parameter is <br/>about',
        ];
        $this->view('about', $data);
    }

};