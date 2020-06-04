<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title> <?php echo SITENAME; ?> </title>

        <!-- Popper.js -->
        <script src="<?php echo URL ?>/js/popper.min.js"></script>
        <!-- bootstrap
    -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
        <!-- daterangepicker -->
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>/css/daterangepicker.css" />
        <!-- Theme style -->
        <link href="<?php echo URL . '/css/adminlte.min.css'; ?>" rel="stylesheet" type="text/css" />
        <!-- Text Editor style -->
        <link href="<?php echo URL . '/css/summernote-bs4.min.css'; ?>" rel="stylesheet" type="text/css" />
        <!-- font awesome -->
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
        <link rel="stylesheet" href=<?php echo URL . '/css/styles.css'; ?> />
    </head>

    <body>
        <div class="main">
            <div class="admin-card admin">
                <div class="admin-card-wrapper">
                    <div class='admin-nav-wrapper'>
                        <div class="my-4 d-flex justify-content-center">
                            <a class="brand-link" href="<?php echo URL; ?>"><span
                                    class="text-secondary font-weight-light">Admin
                                    Panel</span></a>
                        </div>

                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                            data-accordion="false">
                            <li class="nav-item has-treeview">
                                <a class="nav-link admin-nav-tag" href="<?php echo URL . '/users/dashboard'; ?>">
                                    <i class="nav-icon fa fa-tachometer"></i>
                                    <p>Dashboard</p>
                                </a>
                            </li>
                            <li class="nav-item has-treeview">
                                <a class="nav-link admin-nav-tag" href="<?php echo URL . '/notes'; ?>">
                                    <i class="nav-icon fa fa-sticky-note"></i>
                                    <p>Notes</p>
                                </a>
                            </li>
                            <li class="nav-item has-treeview">
                                <a class="nav-link admin-nav-tag" href="<?php echo URL . '/notes/add'; ?>">
                                    <i class="nav-icon fa fa-plus"></i>
                                    <p>Add a note</p>
                                </a>
                            </li>
                            <li class="nav-item has-treeview menu-open">
                                <a href="#" class="nav-link admin-nav-tag">
                                    <i class="nav-icon fa fa-cog fa-fw"></i>
                                    <p>
                                        Settings
                                        <i class="fa fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview" style="display: block;">
                                    <li class="nav-item admin-nav-tag">
                                        <a href="<?php echo URL . '/users/profile'; ?>" class="nav-link">
                                            <i class="fa fa-user nav-icon"></i>
                                            <p>Profile</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="<?php echo URL . '/users/editUsers'; ?>"
                                            class="nav-link admin-nav-tag">
                                            <i class="fa fa-edit nav-icon"></i>
                                            <p>Edit Users</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="admin-content-wrapper">
                        <nav class="navbar navbar-expand">
                            <h3 class="navbar-nav">
                                <?php echo isset($_GET['url']) ? ucwords($_GET['url']) : 'Dashboard'; ?></h3>
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item mx-2">Welcome
                                    <?php echo isset($_SESSION['user_name']) ? $_SESSION['user_name'] : 'Guest'; ?>,
                                </li>
                                <li class="nav-item">
                                    <a class="btn btn-info btn-sm text-nowrap " href="<?php
if (isset($_SESSION['user_id'])) {echo URL . '/users/logout';} else {echo URL . '/users/login';}
;?>"><?php echo isset($_SESSION['user_id']) ? 'Sign out' : 'Login'; ?></a></li>
                            </ul>
                        </nav>