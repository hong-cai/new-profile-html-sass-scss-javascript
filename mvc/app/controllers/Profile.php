<?php
class Profile extends Controller
{
    public function __construct()
    {
        $this->userModel = $this->model('UserModel');
        $this->notesModel = $this->model('NotesModel');
        $this->notesModel = $this->model('ProfileModel');
    }

    public function index()
    {

        $page_names = $this->ProfileModel->getPagesNames();
        // $countCats = $this->ProfileModel->countCat();
        // $countUsers = $this->ProfileModel->countUsers();
        $data = [
            'page_names' => $page_names,
            'user_name' => 'Sophie',
        ];

        $data = [
            'countNotes' => array_values($countNotes)[0],
            'countCats' => array_values($countCats)[0],
            'countUsers' => array_values($countUsers)[0],
        ];
        $this->view('profile/index', $data);
    }

    public function displayPagesNames()
    {
        $data = $this->notesModel->getPagesNames();
        $this->view('profile/index', $data);
    }

}