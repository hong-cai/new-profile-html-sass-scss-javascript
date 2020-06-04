<?php
/**
 *
 * App Core Class
 * Creates URL & loads core controller
 * URL FORMAT - /controller/method/params
 */
class Core
{
    protected $currentController = 'Users';
    protected $currentMethod = 'index';
    protected $params = [];

    public function __construct()
    {
        $url = $this->getURL();
        // die(print_r($url));
        //Look into controllers for first value
        if (file_exists('../app/controllers/' . ucwords($url[0]) . '.php')) {
            // If exists, set as current controller
            $this->currentController = ucwords($url[0]);
            //Unset 0 Index
            unset($url[0]);
        }
        //Require the controller
        require_once '../app/controllers/' . $this->currentController . '.php';

        //Instantiate controller class
        $this->currentController = new $this->currentController;

        //Check for second part of url
        if (isset($url[1])) {
            //Check if method exists in currentController
            if (method_exists($this->currentController, $url[1])) {
                $this->currentMethod = $url[1];
                // echo $this->currentMethod;
                //Unset 1 Index
                unset($url[1]);
            }
            //PROBLEM: error reminder
            // else{
            //     $this->currentMethod=new Error();
            // }
        }
        //Get params:
        // die(print_r($url));
        $this->params = $url ? array_values($url) : [];
        // die(print_r($this->params === []));
        call_user_func_array([$this->currentController, $this->currentMethod], $this->params);
    }

    public function getURL()
    {
        if (isset($_GET['url'])) {
            //Strip the ending slash if there is one
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
    }
}

;