<?php
require PRIVATE_PATH . '/views/inc/header.php';?>
<div class="page-header">
    <h2> <?php echo $data['title']; ?></h2>
    <?php flash('post_message');?>
    <!-- search form -->
    <div class="col-12 col-md-6">
        <form action="<?php echo URL . '/notes/search'; ?>" method="get" class="sidebar-form" id="search-form">
            <div class="input-group">
                <input type="text" name='q' class="form-control input-sm" placeholder="Search..." />
                <span class="input-group-btn">
                    <button type='submit' id='search-btn' class="btn btn-flat btn-info" disabled value="submit"><i
                            class="fa fa-search"></i></button>
                </span>
            </div>
        </form>
    </div>
    <div class="col-12 my-3">
        <input type="button" value="PHP" class="btn btn-primary btn-sm btn-round btn-success">
        <input type="button" value="Javascript" class="btn btn-primary  btn-sm btn-round btn-warning">
        <input type="button" value="Html/CSS" class="btn btn-primary  btn-sm btn-round btn-primary">
        <input type="button" value="Not specified" class="btn btn-sm btn-info btn-round">
    </div>
</div>

<div class="content-range">
    <?php
foreach ($data['notes'] as $note) {;?>
    <div class="col-11 note m-lg-2 p-2">
        <!-- Primary box -->
        <div class="box box-primary box-solid bg-light p-3">
            <div class="box-header" data-toggle="tooltip" title="Header tooltip">
                <h3 class="box-title">
                    <a href="<?php echo URL . '/notes/note/' . $note->id; ?>">
                        <strong>
                            <?php echo html_entity_decode($note->title); ?>
                        </strong>
                    </a>
                </h3>
                <div class="col-12">
                    <span class="col-6">
                        <small><b>Category:</b><?php echo html_entity_decode($note->category); ?></small></span>
                    <span class="col-6"> <small><b>Created:</b><?php echo $note->created_at; ?></small></span>
                </div>
            </div>
            <div class="box-body">
                <p>
                    <?php echo html_entity_decode($note->content); ?>
                </p>
            </div><!-- /.box-body -->
            <div class="box-footer">
            </div><!-- /.box-footer-->
            <div class="box-tools">
                <a role="button" class="btn btn-primary btn-sm text-light" data-widget="edit"
                    href="<?php echo URL . '/notes/edit/' . $note->id; ?>">Edit</a>


                <a class="btn btn-primary btn-sm text-light" data-widget="read-more" role="button"
                    href="<?php echo URL . '/notes/note/' . $note->id; ?>">Read More</a>
                <!-- Button trigger modal -->



            </div>
        </div><!-- /.box -->
    </div><!-- /.col -->
    <?php }
;
?>
</div>
</div>
<?php
require PRIVATE_PATH . '/views/inc/footer.php';?>