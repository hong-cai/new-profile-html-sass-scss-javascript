<?php
/**
 *  file of useful functions that help through out application
 *
 */

function redirect($page)
{
    header('location:' . URL . '/' . $page);
}
;