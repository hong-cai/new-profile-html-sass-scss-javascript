<?php
require PRIVATE_PATH . '/views/inc/header.php';
// $thispage = URL . 'users/profile';
// if ($_SERVER['PHP_SELF'] !== $thispage) {
//     redirect('users/missing');
//     exit;
// };
?>
<div class="content-range">
    <!-- Create a user -->
    <div class="row d-flex justify-content-center">
        <form action="<?php echo URL; ?>/users/profile" method="post"
            class="border px-5 py-4 col-md-9 col-lg-7 col-xl-6">
            <div class="title text-center text-uppercase my-3">
                <h2> <?php echo $data['page_title']; ?>
                </h2>
            </div>
            <div class="form-group row">
                <label for="inputPassword" class="col-sm-4 col-form-label">User Name</label>
                <div class="col-sm-8">
                    <input type="text"
                        class="form-control <?php echo (!empty($data['name_err'])) ? 'is-invalid' : ''; ?>" name="name"
                        value="<?php echo $data['user_name']; ?>" />
                    <span class="invalid-feedback"><?php echo $data['name_err']; ?></span>
                </div>
            </div>

            <div class="form-group row">
                <label for="password" class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-8">
                    <input type="email"
                        class="form-control <?php echo (!empty($data['email_err'])) ? 'is-invalid' : ''; ?>"
                        name="email" value="<?php echo $data['user_email']; ?>">
                    <span class="invalid-feedback"><?php echo $data['email_err']; ?></span>
                </div>
            </div>

            <div class="form-group row">
                <label for="password" class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                    <input type="password"
                        class="form-control <?php echo (!empty($data['password_err'])) ? 'is-invalid' : ''; ?>"
                        name="password" value="<?php echo $data['user_password']; ?>">
                    <span class="invalid-feedback"><?php echo $data['password_err']; ?></span>
                </div>
            </div>

            <div class="form-group row">
                <label for="confirmPassword" class="col-sm-4 col-form-label">Confirm Password</label>
                <div class="col-sm-8">
                    <input type="password"
                        class="form-control <?php echo (!empty($data['passconfirm_err'])) ? 'is-invalid' : ''; ?>"
                        name="confirm_password">
                    <span class="invalid-feedback"><?php echo $data['passconfirm_err']; ?></span>
                </div>
            </div>
            <div class="form-group row">
                <input type="submit" name="edit-profile" value="Confirm" class="btn btn-outline-primary" />
            </div>
        </form>
    </div>
</div>

</div>
<?php
require PRIVATE_PATH . '/views/inc/footer.php';
?>