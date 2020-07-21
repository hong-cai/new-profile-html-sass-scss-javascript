<?php
require PRIVATE_PATH . '/views/inc/header.php';
?>
<div class="content-range">
    <!-- Main content -->
    <div class="col-6">
        <?php flash('post_message');?>
        <h1>Add a new note: </h1>
    </div>
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="card card-outline card-info">
                    <!-- /.card-header -->
                    <div class="card-body pad">
                        <form action="<?php echo URL . '/notes/add'; ?>" method="post">
                            <div class="form-group form-inline">
                                <label class="mx-2" for="note-title">Title:</label>
                                <input type="text" value="<?php echo $data['title']; ?>"
                                    class="form-control flex-fill <?php echo (!empty($data['title_err'])) ? 'is-invalid' : ''; ?>"
                                    name="title" placeholder="title..." id="note-title" />
                                <span class="invalid-feedback"><?php echo $data['title_err']; ?></span>
                            </div>
                            <div class="form-group form-inline">
                                <label class="mx-2" for="note-title">Category:</label>
                                <select id="cat-select" class="form-control mx-2" name="category">
                                    <option selected disabled> Choose... </option>
                                    <?php foreach ($data['categories'] as $cat) {;?>
                                    <option value="<?php echo $cat->category; ?>">
                                        <?php echo $cat->category; ?>
                                    </option>
                                    <?php }
;?>
                                </select>
                                <input type="text" class="form-control mx-2" placeholder="category" id="add-category" />
                                <button type="button" class="btn btn-info float-right"
                                    onclick="addCategory(this.value)"> Add
                                </button>
                            </div>
                            <div class="mb-3">
                                <textarea name="body" value="<?php echo $data['body']; ?>"
                                    class="textarea <?php echo !empty($data['body_err']) ? 'is-invalid' : ''; ?>"
                                    placeholder="Place some text here"
                                    style="width: 100%; height: 400px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                                <span class="invalid-feedback"><?php echo $data['body_err']; ?></span>
                            </div>

                    </div>
                    <div class="card-footer clearfix">
                        <button type="submit" class="btn btn-info float-right" value='add-note'><i
                                class="fa fa-plus"></i>
                            Add
                            note</button>
                    </div>
                    </form>
                </div>
            </div>
            <!-- /.col-->
        </div>
        <!-- ./row -->
    </section>
    <!-- /.content -->
</div>
</div>

<?php require PRIVATE_PATH . '/views/inc/footer.php';?>