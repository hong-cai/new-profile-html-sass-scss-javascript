    <?php
require PRIVATE_PATH . '/views/inc/header.php';
?>
    <div class="row justify-content-center overflow-auto">
        <!-- left column -->
        <!-- <div class="col-md-12"> -->
        <!-- jquery validation -->
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Create An Account</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form role="form" id="reg-form" action="<?php echo URL; ?>/users/register" method='post'>
                <div class="card-body">
                    <div class="form-group">
                        <label for="reg-username">Username:<sup>*<sup> </label>
                        <input type="input" name="username"
                            class="form-control <?php echo (!empty($data['name_err'])) ? 'is-invalid' : ''; ?>"
                            id="reg-username" placeholder="John Doe" value="<?php echo $data['username']; ?>">
                    </div>
                    <div class="form-group">
                        <label for="reg-email">Email:<sup>*<sup></label>
                        <input type="input" name="email"
                            class="form-control <?php echo (!empty($data['email_err'])) ? 'is-invalid' : ''; ?>"
                            id="reg-email" placeholder="Enter email" value="<?php echo $data['email']; ?>">
                        <span class="invalid-feedback"> <?php echo $data['email_err']; ?> </span>
                    </div>
                    <div class="form-group">
                        <label for="reg-pass">Password:<sup>*<sup></label>
                        <input type="password" name="password"
                            class="form-control <?php echo (!empty($data['password_err'])) ? 'is-invalid' : ''; ?>"
                            id="reg-pass" placeholder="Password" value="<?php echo $data['password']; ?>">
                        <span class="invalid-feedback"> <?php echo $data['password_err']; ?> </span>
                    </div>
                    <div class="form-group">
                        <label for="reg-confirmpass">Confirm Password:<sup>*<sup></label>
                        <input type="password" name="confirm_password"
                            class="form-control <?php echo (!empty($data['passconfirm_err'])) ? 'is-invalid' : ''; ?>"
                            id="reg-confirmpass" placeholder="Confirm Password">
                        <span class="invalid-feedback" value="<?php echo $data['confirm_password']; ?>">
                            <?php echo $data['passconfirm_err']; ?> </span>
                    </div>
                    <div class="form-group mb-0">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" name="terms" class="custom-control-input" id="reg-check">
                            <label class="custom-control-label" for="reg-check">I agree to the <a href="#">terms
                                    of service</a>.</label>
                        </div>
                    </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                    <button type="submit" class="btn btn-primary" value="register">Register</button>
                    <a href=" <?php echo URL; ?>/users/login">
                        Have an account?<b>Login</b></a>
                </div>
            </form>
            <!-- /.card -->
        </div>
        <!-- /.row -->
    </div>
    </div>
    <?php
require PRIVATE_PATH . '/views/inc/footer.php';
?>
    ;