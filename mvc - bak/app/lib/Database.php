<?php
/**
 * PDO Database Class
 * Connect to database
 * Create prepared statements
 * Bind values
 * Return rows and results
 */

class Database
{
    //REMIND:if don't wanna directly use DATABASE config, set:
    //private $host=DB_HOST;
    //private $type=DB_TYPE;
    //private $user=DB_USER;
    //private $pass=DB_PASS;
    //private $name=DB_NAME;
    private $dbh;

    public function __construct()
    {
        $dsn = DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME;
        // echo $dsn;
        // echo 'here in the Database';
        $options = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_PERSISTENT => true,
        );
        try {
            $this->dbh = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $error) {
            $this->error = $error->getMessage();
            echo $this->error;
        }
    }

    /**
     * insert
     *
     * @param [string] $table The name the $data to be inserted
     * @param [string] $data Associative array
     * @return void
     */
    public function insert($table, $data)
    {
        $sth = $this->dbh->prepare("INSERT INTO $table (`name`,`email`,`password`,`status`) VALUES (:name,:email,:password,:status)");
        $insert = $sth->execute(
            array(
                ':name' => $data['username'],
                ':email' => $data['email'],
                ':password' => $data['password'],
                ':status' => $data['status'],
            )
        );
        return $insert;
    }

    /**
     * update
     *
     * @param [type] $table The name the $data to be inserted
     * @param [type] $data Associative array
     * @param [type] $where The WHERE query part
     * @return void
     */
    public function update($table, $data, $where)
    {

    }

    /**
     * Prepare statement with query
     */
    public function query($sql)
    {
        $this->stmt = $this->dbh->prepare($sql);
    }

    /**
     * QUESTION:Bind the values
     *
     * @param [type] $param string
     * @param [type] $value string
     * @param [type] $type The WHERE query part
     * @return void
     */
    public function bind($param, $value, $type = null)
    {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        $this->stmt->bindValue($param, $value, $type);
    }

    /**
     * Execute the prepared statement
     */
    public function execute()
    {
        return $this->stmt->execute();
    }

    /**
     * Get result set as array of objects
     */
    public function resultSet()
    {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function resultSingle()
    {
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_OBJ);
    }

    /**
     * count rows which will be affected by sql
     *
     * @return void
     */
    public function rowCount()
    {
        return $this->stmt->rowCount();
    }

    /**
     * count rows
     *
     * @return void
     */
    public function fetchColumn()
    {
        return $this->stmt->fetchColumn();
    }
}
;