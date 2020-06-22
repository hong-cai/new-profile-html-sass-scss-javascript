<?php
class Notes extends Controller
{
    public function __construct()
    {
        $this->notesModel = $this->model('NotesModel');
    }

    public function index()
    {
        $notes = $this->notesModel->getNotes();
        // $notes="O.S.T.R &amp;quot;Track #12&amp;quot;";
        // print_r($notes);
        $data = [
            'title' => 'All notes',
            'notes' => $notes,

        ];
        if ($_SESSION['user_id']) {
            $this->view('notes/index', $data);
        } else {
            redirect('users/login');
        }
    }

    public function categories()
    {
        $data = $this->notesModel->getCategories();
        $this->view('notes/add', $data);
    }

    public function note($id = "")
    {
        if (isset($id)) {
            $note = $this->notesModel->getNoteById($id);
            $data = [
                'title' => $note->title,
                'id' => $id,
                'body' => $note->content,
                'category' => $note->category,
                'created_at' => $note->created_at,
            ];
            // die(print_r($data));
            $this->view('notes/note', $data);
        } elseif ($id === null) {
            redirect('notes');
        }

    }

    public function add()
    {
        // die(print_r($_POST));
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // die(print_r(htmlspecialchars($_POST['body'])));
            //Sanitize POST array
            // $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            $cats = $this->notesModel->getCategories();
            $data = [
                'title' => htmlspecialchars(trim($_POST['title'])),
                'body' => htmlspecialchars(trim($_POST['body'])),
                'category' => isset($_POST['category']) ? htmlspecialchars(trim($_POST['category'])) : 'Not Specified',
                'title_err' => '',
                'body_err' => '',
                'categories' => $cats,
            ];
            // die(print_r($data));
            if (empty($_POST['title'])) {
                $data['title_err'] = 'The title should not be empty';
            }
            if (empty($_POST['body'])) {
                $data['body_err'] = 'Fill the note content';
            }

            if (empty($data['title_err']) && empty($data['body_err'])) {
                // die(print_r($data['body']));
                //Store into database
                if ($this->notesModel->saveNote($data)) {
                    flash('post_message', 'Note Added successfully');
                    // die($data);
                    $this->view('notes/add', $data);
                } else {
                    echo 'something wrong';
                };
            }
            // die(print_r($data));
            //  else {
            //Load view with errors
            $this->view('notes/add', $data);
            // }
        } else {
            $cats = $this->notesModel->getCategories();
            $data = [
                'title' => '',
                'body' => '',
                'categories' => $cats,

            ];
            $this->view('notes/add', $data);
        }

    }

    public function edit($id)
    {
        // die($_SERVER['REQUEST_METHOD']);
        // die('here');
        // echo '<pre>';
        // print_r($_POST);
        // echo '</pre>';
        // die();
        if (isset($id)) {
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                // die(print_r($_POST));
                //Sanitize POST array
                // $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
                $data = [
                    'id' => $id,
                    'title' => htmlspecialchars(trim($_POST['title'])),
                    'body' => htmlspecialchars(trim($_POST['body'])),
                    'category' => htmlspecialchars(trim($_POST['category'])),
                    'title_err' => '',
                    'body_err' => '',
                ];
                if (empty($_POST['title'])) {
                    $data['title_err'] = 'The title should not be empty';
                }
                if (empty($_POST['body'])) {
                    $data['body_err'] = 'Fill the note body';
                }

                if (empty($data['title_err']) && empty($data['body_err'])) {
                    //Store into database
                    if ($this->notesModel->updateNote($data)) {
                        flash('post_message', 'Update successfully');
                        redirect('notes/index');
                    }

                } else {
                    //Load view with errors
                    $this->view('notes/edit', $data);
                }
            } else {
                // die('herererere');
                $note = $this->notesModel->getNoteById($id);
                $cats = $this->notesModel->getCategories();
                //Check if admin/default
                // if ($note->id != $_SESSION['user_id']) {
                //     redirect('notes/index');
                // }
                $data = [
                    'id' => $id,
                    'title' => $note->title,
                    'body' => $note->content,
                    'category' => $note->category,
                    'categories' => $cats,
                ];
                $this->view('notes/edit', $data);
            }
        } else {
            redirect('notes');
        }
    }

    public function delete($id)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if ($this->notesModel->deleteNote($id)) {
                flash('post_message', 'post deleted');
                redirect('notes/index');
            } else {
                die('something wrong');
            };
        } else {
            die('something wrong');
            redirect('notes');
        }
    }

    public function search()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {

            // die(print_r($_GET));
            // $this->noteModel->searchWords(){

            // }
        }
    }

};