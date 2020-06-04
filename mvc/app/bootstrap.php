<?php
//Load constants
require_once 'config/initialize.php';
//Load Helpers
require_once 'helpers/url_helper.php';
require_once 'helpers/session_helper.php';

//Load libraries
// require_once 'lib/Core.php';
// require_once 'lib/Controller.php';
// require_once 'lib/Database.php';
// require_once 'lib/Session.php';

//Autoload Core libraries when there are a lot lib/*.php to load
spl_autoload_register('mvc_autoload');
function mvc_autoload($className)
{
    if (preg_match('/\A\w+\Z/', $className)) {
        require_once 'lib/' . $className . '.php';
    }
}