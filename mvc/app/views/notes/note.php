<?php
require PRIVATE_PATH . '/views/inc/header.php';?>
<div class="admin-content-wrapper">
    <div class="page-header">
        <!-- search form -->
        <div class="col-12 col-md-6">
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control input-sm" placeholder="Search..." />
                    <span class="input-group-btn">
                        <button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i
                                class="fa fa-search"></i></button>
                    </span>
                </div>
            </form>
        </div>
    </div>

    <div class="content-range">
        <div class="row">
            <div class="col-11 note m-lg-2 p-2">
                <!-- Primary box -->
                <div class="box box-primary box-solid bg-light p-3">
                    <div class="box-header" data-toggle="tooltip" title="Header tooltip">
                        <h3 class="box-title">
                            <a href="<?php echo URL . '/notes/note/' . $note->id; ?>">
                                <strong>
                                    <?php echo $data['title']; ?>
                                </strong>
                            </a>
                        </h3>
                        <div class="col-12">
                            <span>
                                <small><b>Category:</b><?php echo $data['category']; ?></small></span>
                            <span> <small><b>Created:</b><?php echo $data['created_at']; ?></small></span>
                        </div>
                    </div>
                    <div class="box-body">
                        <p>
                            <?php echo html_entity_decode($data['body']); ?>
                        </p>
                    </div><!-- /.box-body -->
                    <div class="box-footer">
                    </div><!-- /.box-footer-->
                    <div class="box-tools">
                        <button class="btn btn-primary btn-sm" data-widget="edit"><a
                                href="<?php echo URL . '/notes/edit/' . $data['id']; ?>">Edit</a></button>


                        <button type="submit" class="btn btn-primary btn-sm" data-widget="delete" data-toggle="modal"
                            data-target="#myModal" data-toggle="modal" data-target="#modal-warning">delete</button>


                        <!-- Modal -->
                        <div class="delete-modal-wrapper">
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="false"
                                aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal"
                                                aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div class="modal-body">
                                            This note will be deleted?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary btn-sm"
                                                data-dismiss="modal">No</button>
                                            <form class="d-inline"
                                                action="<?php echo URL . '/notes/delete/' . $data['id']; ?>"
                                                method="post">
                                                <input value="Delete" type="submit" class="btn btn-danger btn-sm" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div><!-- /.box -->
            </div><!-- /.col -->
        </div>
    </div>
</div>
<?php
require PRIVATE_PATH . '/views/inc/footer.php';?>