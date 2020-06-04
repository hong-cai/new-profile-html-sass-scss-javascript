<?php
class NotesModel
{
    private $db;
    public function __construct()
    {
        $this->db = new Database;
    }

    public function getNotes()
    {
        $this->db->query('SELECT * FROM `notes` ORDER BY created_at DESC');
        return $result = $this->db->resultSet();
    }

    public function getNoteById($id)
    {
        $this->db->query('SELECT * FROM `notes` WHERE id=:id');
        $this->db->bind(':id', $id);
        return $result = $this->db->resultSingle();
    }

    public function getCategories()
    {
        $this->db->query("SELECT DISTINCT category FROM `notes`WHERE category IS NOT NULL
        AND TRIM(category) <> ''");

        $result = $this->db->resultSet();
        return $result;
    }

    public function sortedByCat()
    {
        $this->db->query('SELECT * FROM notes');
    }

    public function updateNote($data)
    {
        $this->db->query('UPDATE `notes` SET `category` = :category, `content` = :content, `title` = :title,`updated_at`= NOW() WHERE `id`=:id');
        //Bind values
        $this->db->bind(':id', $data['id']);
        $this->db->bind(':category', $data['category']);
        $this->db->bind(':content', $data['body']);
        $this->db->bind(':title', $data['title']);

        //Execute query
        return $this->db->execute() ? true : false;
    }

    public function saveNote($data)
    {
        $this->db->query('INSERT INTO notes(category,content,title) VALUES (:category,:content,:title)');
        $this->db->bind(':category', $data['category']);
        $this->db->bind(':title', $data['title']);
        $this->db->bind(':content', $data['body']);
        if ($this->db->execute()) {
            return true;
        } else {return false;}
    }

    public function deleteNote($id)
    {
        $this->db->query('DELETE FROM `notes` WHERE id = :id');
        $this->db->bind(':id', $id);
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function countNum()
    {
        $this->db->query('SELECT COUNT(id) FROM `notes`;');
        return $result = get_object_vars($this->db->resultSingle());
    }

    public function countCat()
    {
        $this->db->query('SELECT COUNT(distinct category) FROM `notes`;');
        return $result = get_object_vars($this->db->resultSingle());
    }

    public function countUsers()
    {
        $this->db->query('SELECT COUNT(id) FROM `users`;');
        return $result = get_object_vars($this->db->resultSingle());
    }
}