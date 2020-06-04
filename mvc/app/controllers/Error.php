<?php
class Error extends Controller
{
    public function __construct()
    {
        // echo 'inside Error class';
    }
    public function index()
    {
        $data = [
            'page_title' => 'Error',
            'error_msg'=>'error according to code'
        ];
        $this->view('pages/error', $data);
    }
}
;
