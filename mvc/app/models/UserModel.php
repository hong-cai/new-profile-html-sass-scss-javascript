<?php
class UserModel
{
    private $db;
    public function __construct()
    {
        $this->db = new Database;
    }
    public function createUser($data)
    {
        return $this->db->insert('users', $data);
    }
    public function findUserByEmail($email)
    {
        $this->db->query('SELECT email FROM users WHERE email=:email');
        $this->db->bind(':email', $email);
        $this->db->execute();
        $rowCount = $this->db->rowCount();
        // die(var_dump($rowCount));
        if ($rowCount > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function loginUser($email, $password)
    {
        $this->db->query('SELECT * FROM users WHERE email=:email');
        $this->db->bind(':email', $email);
        $row = $this->db->resultSingle();
        $hashed_password = $row->password;
        if (password_verify($password, $hashed_password)) {
            return $row;
        } else {
            return false;
        }

    }

    public function getUsers()
    {
        $this->db->query('SELECT * FROM users');
        return $result = $this->db->resultSet();
    }

    public function getUserInfo($id)
    {
        $this->db->query('SELECT * FROM users WHERE id=:id');
        $this->db->bind(':id', $id);
        if ($this->db->resultSingle()) {
            return $row = $this->db->resultSingle();
        } else {
            echo 'something wrong';
        }
    }

    public function updateUser($data)
    {
        $this->db->query('UPDATE `users` SET `email` = :email, `password` = :password,`name`=:name,`updated_at`= NOW() WHERE `id`=:id');
        $this->db->bind(':id', htmlspecialchars($data['user_id']));
        $this->db->bind(':email', htmlspecialchars($data['user_email']));
        $this->db->bind(':name', htmlspecialchars($data['user_name']));
        $this->db->bind(':password', password_hash($data['user_password'], PASSWORD_DEFAULT));
        return $this->db->execute() ? true : false;
    }

}
;