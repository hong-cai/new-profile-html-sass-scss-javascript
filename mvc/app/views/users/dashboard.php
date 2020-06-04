<?php
require PRIVATE_PATH . '/views/inc/header.php';
?>

<div class="content-range">
    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <!-- /.col -->
                <div class="col-md-4 col-sm-6 col-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-success"><i class="fa fa-flag" aria-hidden="true"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">
                                <h3> <a href="<?php echo URL . '/notes/categories'; ?>">number of
                                        notes</a>
                                </h3>
                            </span>
                            <span class="info-box-number">
                                <h2> <strong> <?php echo $data['countNotes']; ?> </strong></h2>
                            </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    <!-- /.info-box -->
                </div>
                <!-- /.col -->
                <div class="col-md-4 col-sm-6 col-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-success"><i class="fa fa-flag" aria-hidden="true"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">
                                <h3> <a href="<?php echo URL . '/notes/categories'; ?>">no of
                                        categories</a> </h3>
                            </span>
                            <span class="info-box-number">
                                <h2> <strong> <?php echo $data['countCats']; ?> </strong></h2>
                            </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    <!-- /.info-box -->
                </div>
                <!-- /.col -->
                <div class="col-md-4 col-sm-6 col-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-success"><i class="fa fa-flag" aria-hidden="true"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">no of users </span>
                            <span class="info-box-number">
                                <h2> <strong> <?php echo $data['countUsers']; ?> </strong></h2>
                            </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    <!-- /.info-box -->
                </div>
            </div>
        </div>
    </section>
    <div class="row">
        <!-- AREA CHART -->
        <div class="col-md-6">
            <div class="card">
                <div class="card-header border-0">
                    <div class="d-flex justify-content-between">
                        <h3 class="card-title">Daily Notes County</h3>
                        <a href="javascript:void(0);">View Report</a>
                    </div>
                </div>
                <div class="card-body">
                    <div class="d-flex">
                        <p class="d-flex flex-column">
                            <span class="text-bold text-lg">820</span>
                            <span>Visitors Over Time</span>
                        </p>
                        <p class="ml-auto d-flex flex-column text-right">
                            <span class="text-success">
                                <i class="fas fa-arrow-up"></i> 12.5%
                            </span>
                            <span class="text-muted">Since last week</span>
                        </p>
                    </div>
                    <!-- /.d-flex -->

                    <div class="position-relative mb-4">
                        <canvas id="visitors-chart" height="200"></canvas>
                    </div>

                    <div class="d-flex flex-row justify-content-end">
                        <span class="mr-2">
                            <i class="fas fa-square text-primary"></i> This Week
                        </span>

                        <span>
                            <i class="fas fa-square text-gray"></i> Last Week
                        </span>
                    </div>
                </div>
            </div>
            <!-- /.card -->
        </div>
        <!-- DONUT CHART -->
        <div class="col-md-6">
            <div class="card">
                <div class="card-header border-0">
                    <h3 class="card-title">Categories</h3>

                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse"><i
                                class="fa fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-tool" data-card-widget="remove"><i
                                class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="card-body">
                    <canvas id="donutChart"
                        style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
        <!-- /.card -->
    </div>

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
<?php
require PRIVATE_PATH . '/views/inc/footer.php';?>