<?php
require PRIVATE_PATH . '/views/inc/header.php';
require PRIVATE_PATH . '/views/users/dashboard.php';
?>

<div class="admin-card categories">
    <div class="admin-card-wrapper">
        <div class="nav-wrapper">
            <span>
                <h3><a href="#0">Categories</a></h3>
            </span>
        </div>
        <div class="card-content-wrapper">
            <div class="d-flex flex-row">
                <div class="col-md-4">
                    <h2> Default sorted by: <?php echo $data['title']; ?></h2>
                </div>
                <!-- SEARCH FORM -->
                <div class="col-md-4">
                    <form class="form-inline">
                        <div class="input-group input-group-sm">
                            <input class="form-control form-control-navbar" type="search" placeholder="Search"
                                aria-label="Search">
                            <div class="input-group-append">
                                <button class="btn btn-navbar" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-3"> <a href=" <?php echo URL . '/notes/add'; ?> " class="btn btn-primary">
                        <i class="fa fa-pencil"></i>Add a note </a> </div>
            </div>

            <div class="content-range">
                <div class="row">

                    <div class="col-md-4">
                        <!-- Primary tile -->
                        <div class="box box-solid bg-light-blue">
                            <div class="box-header">
                                <h2 class="box-title">
                                    <a href="<?php echo URL ?>/notes/php"><strong>Cat Name:PHP</strong></a>
                                </h2>
                                <h3 class="box-title">
                                    <a href="/">Note Title:blabla</a>
                                </h3>
                            </div>
                            <div class="box-body">
                                Latest: <code>Here is the created_at datetime</code>
                                <p>
                                    amber, microbrewery abbey hydrometer, brewpub ale lauter tun
                                    saccharification oxidized barrel.
                                    berliner weisse wort chiller adjunct hydrometer alcohol aau!
                                    sour/acidic sour/acidic chocolate malt ipa ipa hydrometer.
                                </p>
                            </div><!-- /.box-body -->
                        </div><!-- /.box -->
                    </div><!-- /.col -->

                    <div class="col-md-4">
                        <!-- Primary tile -->
                        <div class="box box-solid bg-light-blue">
                            <div class="box-header">
                                <h3 class="box-title">Cat Name:HTML/CSS</h3>
                            </div>
                            <div class="box-body">
                                Latest: <code>Here is the created_at datetime</code>
                                <p>
                                    amber, microbrewery abbey hydrometer, brewpub ale lauter tun
                                    saccharification oxidized barrel.
                                    berliner weisse wort chiller adjunct hydrometer alcohol aau!
                                    sour/acidic sour/acidic chocolate malt ipa ipa hydrometer.
                                </p>
                            </div><!-- /.box-body -->
                        </div><!-- /.box -->
                    </div><!-- /.col -->

                    <div class="col-md-4">
                        <!-- Primary tile -->
                        <div class="box box-solid bg-light-blue">
                            <div class="box-header">
                                <h3 class="box-title">Cat Name:Javascript </h3>
                            </div>
                            <div class="box-body">
                                Latest: <code>Here is the created_at datetime</code>
                                <p>
                                    amber, microbrewery abbey hydrometer, brewpub ale lauter tun
                                    saccharification oxidized barrel.
                                    berliner weisse wort chiller adjunct hydrometer alcohol aau!
                                    sour/acidic sour/acidic chocolate malt ipa ipa hydrometer.
                                </p>
                            </div><!-- /.box-body -->
                        </div><!-- /.box -->
                    </div><!-- /.col -->


                    <div class="col-md-4">
                        <!-- Primary tile -->
                        <div class="box box-solid bg-light-blue">
                            <div class="box-header">
                                <h3 class="box-title">Primary Tile</h3>
                            </div>
                            <div class="box-body">
                                Latest: <code>Here is the created_at datetime</code>
                                <p>
                                    amber, microbrewery abbey hydrometer, brewpub ale lauter tun
                                    saccharification oxidized barrel.
                                    berliner weisse wort chiller adjunct hydrometer alcohol aau!
                                    sour/acidic sour/acidic chocolate malt ipa ipa hydrometer.
                                </p>
                            </div><!-- /.box-body -->
                        </div><!-- /.box -->
                    </div><!-- /.col -->


                    <div class="col-md-4">
                        <!-- Primary tile -->
                        <div class="box box-solid bg-light-blue">
                            <div class="box-header">
                                <h3 class="box-title">Primary Tile</h3>
                            </div>
                            <div class="box-body">
                                Latest: <code>Here is the created_at datetime</code>
                                <p>
                                    amber, microbrewery abbey hydrometer, brewpub ale lauter tun
                                    saccharification oxidized barrel.
                                    berliner weisse wort chiller adjunct hydrometer alcohol aau!
                                    sour/acidic sour/acidic chocolate malt ipa ipa hydrometer.
                                </p>
                            </div><!-- /.box-body -->
                        </div><!-- /.box -->
                    </div><!-- /.col -->

                    <div class="col-md-4">
                        <!-- Primary tile -->
                        <div class="box box-solid bg-light-blue">
                            <div class="box-header">
                                <h3 class="box-title">Primary Tile</h3>
                            </div>
                            <div class="box-body">
                                Latest: <code>Here is the created_at datetime</code>
                                <p>
                                    amber, microbrewery abbey hydrometer, brewpub ale lauter tun
                                    saccharification oxidized barrel.
                                    berliner weisse wort chiller adjunct hydrometer alcohol aau!
                                    sour/acidic sour/acidic chocolate malt ipa ipa hydrometer.
                                </p>
                            </div><!-- /.box-body -->
                        </div><!-- /.box -->
                    </div><!-- /.col -->
                </div>

            </div>
        </div>
    </div>
</div>
<?php require PRIVATE_PATH . '/views/inc/footer.php';?>