<?php
class Profile extends Controller
{
    public function __construct()
    {
        $this->userModel = $this->model('UserModel');
        $this->notesModel = $this->model('NotesModel');
    }

    public function index()
    {
        if (isset($_SESSION['user_id'])) {
            $countNotes = $this->notesModel->countNum();
            $countCats = $this->notesModel->countCat();
            $countUsers = $this->notesModel->countUsers();

            // die(print_r(array_values($countNotes)[0]));
            $data = [
                'page_title' => 'about',
            ];
            $this->view('profile/index', $data);
        } else {
            redirect('profile/index');
        }
    }

    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') { //WARNING: $data POSTED
            //REMIND:Sanitize POST data
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            // Process form
            $data = [
                'username' => trim($_POST['username']),
                'email' => trim($_POST['email']),
                'password' => trim($_POST['password']),
                'confirm_password' => trim($_POST['confirm_password']),
                'name_err' => '',
                'email_err' => '',
                'password_err' => '',
                'passconfirm_err' => '',
            ];

            // Validate Email
            if (empty($_POST['email'])) {
                $data['email_err'] = 'Please fill your email';
            } else {
                if ($this->userModel->findUserByEmail($_POST['email'])) {
                    $data['email_err'] = 'Email is already taken';
                    // die(print_r($_POST['email_err']));
                }
            }
            // Validate username
            if (empty($_POST['username'])) {
                $data['name_err'] = 'Please fill your username';
            }
            // Validate password
            if (empty($_POST['password'])) {
                $data['password_err'] = 'Please fill your password';
            } else {
                if (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{6,20}$/', $_POST['password'])) {
                    $data['password_err'] = 'The password should be between 6-20 characters including one number,one letter and one symbol';
                }
            }
            if (empty($_POST['confirm_password'])) {
                $data['passconfirm_err'] = 'Please repeat your password';
            } elseif ($data['password'] != $data['confirm_password']) {
                $data['passconfirm_err'] = 'Passwords do not match';
            }
            // die(print_r($data));
            //Make sure errors are empty
            if (empty($data['name_err']) && empty($data['email_err']) && empty($data['password_err']) && empty($data['passconfirm_err'])) {
                //Validated
                //Hash password
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                //Identify role
                $data['status'] = 'default';
                // $this->userModel->createUser($data);
                if ($this->userModel->createUser($data)) {
                    flash('register_success', 'registered and please log in');
                    redirect('users/login');
                } else {
                    die('something wrong'); //REMIND:NEED TO EDIT
                }
            }
            //Load view with errors
            $this->view('users/register', $data);
        } else { //WARNING: EMPTY REGISTER FORM
            //Init data
            $data = ['username' => '',
                'email' => '',
                'password' => '',
                'confirm_password' => '',
                'name_err' => '',
                'email_err' => '',
                'password_err' => '',
                'passconfirm_err' => '',
            ];
            //Load view
            $this->view('users/register', $data);
        }
    }

    public function login()
    {
        if (isset($_SESSION['user_id'])) {
            $this->logout();
        }
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            //REMIND:Sanitize POST data
            // echo 'POSTED';
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            // die(print_r($_POST));
            // Process form
            $data = [
                'email' => $_POST['email'],
                'password' => $_POST['password'],
                'email_err' => '',
                'password_err' => '',
            ];

            if (empty($_POST['email'])) {
                $data['email_err'] = 'Please fill in your email';
            } else {
                if ($this->userModel->findUserByEmail($data['email'])) {
                    //User found, continue identify password
                    if (!empty($_POST['password'])) {
                        if (!$this->userModel->loginUser($_POST['email'], $_POST['password'])) {
                            $data['password_err'] = 'Password do not match';
                        }
                    }
                } else {
                    //User not found
                    $data['email_err'] = 'No user found';
                }
            }

            if (empty($_POST['password'])) {
                $data['password_err'] = 'Please fill in your password';
            }

            if (empty($data['email_err']) && empty($data['password_err'])) {
                // die('pass');
                $loggedInUser = $this->userModel->loginUser($_POST['email'], $_POST['password']);
                if ($loggedInUser) {
                    //Create Session
                    // var_dump($this->createUserSession($loggedIUuser));
                    $this->createUserSession($loggedInUser);
                    //Redirect to Dashboard with username
                    // redirect('users/dashboard');
                    // die(print_r($loggedInUser));
                    redirect('users/dashboard');
                }
            }

            //Load view
            $this->view('users/login', $data);
        } else {
            // echo 'load empty form';
            //Load empty form
            //Init data
            $data = [
                'email' => '',
                'password' => '',
                'email_err' => '',
                'password_err' => '',
            ];
            //Load view
            $this->view('users/login', $data);
        }
    }

    public function createUserSession($user)
    {
        $_SESSION['user_id'] = $user->id;
        $_SESSION['user_name'] = $user->name;
        $_SESSION['user_email'] = $user->email;
        $_SESSION['user_role'] = $user->status;
    }

    public function logout()
    {
        unset($_SESSION);
        session_destroy();
        redirect('users/login');
    }

    public function isLoggedIn()
    {
        if (isset($_SESSION['user_id'])) {
            return true;
        } else {
            return false;
        }
    }

    public function editUsers()
    {
        $userList = $this->userModel->getUsers();
        $data = [
            'users' => $userList,
        ];
        // die(print_r($data));
        $this->view('users/editUsers', $data);
    }

    public function profile()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $data = [
                'page_title' => 'edit your Profile',
                'user_id' => trim($_SESSION['user_id']),
                'user_email' => trim($_POST['email']),
                'user_name' => trim($_POST['name']),
                'user_password' => trim($_POST['password']),
                'confirm_password' => trim($_POST['confirm_password']),
                'name_err' => '',
                'email_err' => '',
                'password_err' => '',
                'passconfirm_err' => '',
            ];

            // Validate name
            if (empty(trim($_POST['name']))) {
                $data['name_err'] = 'name should not be empty';
            };
            // Validate email
            if (empty(trim($_POST['email']))) {
                $data['email_err'] = 'email should not be empty';
            };
            // Validate password
            if (empty(trim($_POST['password']))) {
                $data['password_err'] = 'password should not be empty';
            } else {
                if (!preg_match('/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{6,20}$/', trim($_POST['password']))) {
                    $data['password_err'] = 'The password should be between 6-20 characters including one number,one letter and one symbol';
                }
            }
            // validate confirmed password
            if (empty(trim($_POST['confirm_password']))) {
                $data['passconfirm_err'] = 'Please repeat your password';
            } elseif ($data['user_password'] != $data['confirm_password']) {
                $data['passconfirm_err'] = 'Passwords do not match';
            }

            // update profile data
            if (empty($data['name_err']) && empty($data['email_err']) && empty($data['password_err']) && empty($data['passconfirm_err'])) {
                // die('here');
                if ($this->userModel->updateUser($data)) {
                    flash('profile_update_success', 'profile updated successfully,please login');
                    redirect('users/login');
                } else {
                    flash('profile_update_failed', 'database error please try again', 'text-left text-danger alert alert-light mx-0');
                    $this->view('users/profile', $data);
                }
                ;
            } else {
                flash('input_error', 'please check the following errors');
                $this->view('users/profile', $data);
            }

        } else {
            if (isset($_SESSION['user_id'])) {
                $userInfo = $this->userModel->getUserInfo($_SESSION['user_id']);
                $data = [
                    'page_title' => 'edit your Profile',
                    'user_id' => htmlspecialchars_decode($userInfo->id),
                    'user_name' => htmlspecialchars_decode($userInfo->name),
                    'user_email' => htmlspecialchars_decode($userInfo->email),
                    'user_password' => htmlspecialchars_decode($userInfo->password),
                ];
                $this->view('users/profile', $data);
            } else {
                redirect('users/login');
            }
        }

    }

/* ------For input able/disabled block------ */
    public function editSave()
    {
        // echo 'in editSave<br>';
        // print_r($_POST);
        // die();

        if (isset($_POST['id'], $_POST['name'], $_POST['email'], $_POST['password'], $_POST['status'])) {
            // echo '$id: ' . $_POST['id'] . '<br>';
            $data = array();
            $data['id'] = $_POST['id'];
            $data['name'] = $_POST['name'];
            $data['email'] = $_POST['email'];
            $data['role'] = $_POST['role'];
            $data['password'] = password_hash($_POST['password'], PASSWORD_DEFAULT);
            // print_r($data);
            // die();
            $result = $this->model->editUser($data);
            echo json_encode($result);
        }
    }

/* ------For span/input switch block------ */
    public function editData()
    {
        // echo 'in editData<br>';
        // print_r($_POST);
        // die();

        if (($_POST['action'] == 'edit') && !empty($_POST['id'])) {
            // echo $_POST['action'];
            //update data to database
            $userData = array(
                'id' => $_POST['id'],
                'name' => $_POST['name'],
                'email' => $_POST['email'],
                'role' => $_POST['role'],
                'password' => Hash::create('md5', $_POST['password'], HASH_KEY),
            );
            // print_r($userData);
            $result = $this->model->editUser($userData);
            echo json_encode($result);
            // print_r($result);
        }
    }

    public function delete($id)
    {
        // echo 'in delete controller<br>';
        // echo $id;
        // die();
        $this->model->deleteUser($id);
    }
}