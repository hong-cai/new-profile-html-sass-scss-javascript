<?php
require PRIVATE_PATH . '/views/inc/header.php';
?>
<div class="admin-content-wrapper">
    <!-- left column -->
    <div class="card card-primary col-6 p-0 mx-auto">
        <?php echo flash('register_success'); ?>
        <?php echo flash('profile_update_success'); ?>
        <div class="card-header">
            <h3 class="card-title">Login</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form role="form" id="login-form" action="<?php echo URL; ?>/users/login" method="post" class="w-100">
            <div class="card-body">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="input" name="email"
                        class="form-control <?php echo (!empty($data['email_err'])) ? 'is-invalid' : ''; ?>" id="email"
                        placeholder="Enter email" value="<?php echo $data['email']; ?>">
                    <span class="invalid-feedback"><?php echo $data['email_err']; ?></span>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password"
                        class="form-control <?php echo (!empty($data['password_err'])) ? 'is-invalid' : ''; ?>"
                        id="password" placeholder="Password" value="<?php echo $data['password']; ?>">
                    <span class="invalid-feedback"><?php echo $data['password_err']; ?></span>
                </div>
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
                <button type="submit" class="btn btn-primary" value="login">Login</button>
                <a href=" <?php echo URL; ?>/users/register">Create an account</a>
            </div>
        </form>
    </div>
</div>
<!-- /.card -->
</div>
<!--/conent-wrapper-->

<?php
require PRIVATE_PATH . '/views/inc/footer.php';
?>
;