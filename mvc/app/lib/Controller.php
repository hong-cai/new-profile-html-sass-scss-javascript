<?php
/**
 *
 * Base Controller
 * Loads the models and views
 */
class Controller
{
    //Load model
    public function model($model) //$model here: class About/Contact/Notes

    {
        //Require model file
        require_once '../app/models/' . $model . '.php';
        //Instantiate model
        return new $model();
    }

    public function view($view, $data = [])
    {
        //Check if view file exists
        if (file_exists('../app/views/' . $view . '.php')) {
            require_once '../app/views/' . $view . '.php';
            // redirect($view);
        } else {
            redirect('pages/index');
        }
    }
}
;