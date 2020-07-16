<?php
require PRIVATE_PATH . '/views/inc/header.php';
?>

<div class='container'>
    <div class="row"></div>
    <h1>
        <?php echo $data['page_title'] ;?>
    </h1>
    <h3>
        <?php echo $data['error_msg'] ;?>
    </h3>
</div>
</div>

<?php require PRIVATE_PATH . '/views/inc/footer.php';?>