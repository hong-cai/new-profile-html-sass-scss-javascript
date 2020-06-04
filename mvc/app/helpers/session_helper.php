<?php
/**
 * Create session super globals
 * WARNING:I DON'T UNDERSTAND THIS PART COMPLETELY
 */
// $_SESSION['user'] = 'Sophie';
// unset($_SESSION['user']);
// session_destroy();
session_start();
// die(print_r($_SESSION));
//Flash message helper
//FORMAT EXAMPLE-flash('register_success','You are registered','text-left text-success alert alert-light mx-0');
//DISPLAY IN VIEW -  <?php echo flash('register_success');
function flash($name = '', $message = '', $class = 'text-left text-success alert alert-light mx-0')
{
    // die(print_r($_SESSION[$name]));
    // if (!empty($name)) {
    //     if (!empty($message) && empty($_SESSION[$name])) {
    //         if (!empty($_SESSION[$name])) {
    //             //Once redirect unset
    //             unset($_SESSION[$name]);
    //         }
    //         if (!empty($_SESSION[$name . '_class'])) {
    //             unset($_SESSION[$name . '_class']);
    //         }
    //         $_SESSION[$name] = $message; //QUESTION
    //         $_SESSION[$name . '_class'] = $class;
    //         // echo $_SESSION;
    //         // echo $_SESSION[$name];
    //         // echo $_SESSION[$name . '_class'];
    //     } elseif (empty($message) && !empty($_SESSION[$name])) {
    //         $class = !empty($_SESSION[$name . '_class']) ? $_SESSION[$name . '_class'] : '';
    //         echo '<div class="' . $class . '" id="msg-flash">' . $_SESSION[$name] . '</div>';
    //         unset($_SESSION[$name]);
    //         unset($_SESSION[$name . '_class']);
    //     }
    // }
    // $name='posted_message';
    // $message='updated successfully','posted added successfully';
    // $_SESSION['posted_message'],$_SESSION['error_message'];
    // $class='text-left text-danger alert alert-light mx-0';

    //('post_updated','post updated successfully')
    //('error_added','user created failed, please try again',)
    //('error_updated','profile updated failed please try again','text-left text-danger alert alert-light mx-0')

    if (!empty($name)) {
        //To register session:('post_added','post added successfully');
        //('added_failed','post added failed','text-left text-danger alert alert-light mx-0');
        if (!empty($message) && empty($_SESSION[$name])) {
            if (!empty($_SESSION[$name . '_class'])) {
                unset($_SESSION[$name . '_class']);
            }
            $_SESSION[$name] = $message;
            $_SESSION[$name . '_class'] = $class;
        }
        //To display message with registered session:
        // ('post_added')
        elseif (empty($message) && !empty($_SESSION[$name])) {
            $class = !empty($_SESSION[$name . '_class']) ? $_SESSION[$name . '_class'] : '';
            echo '<div class="' . $class . '" id="msg-flash">' . $_SESSION[$name] . '</div>';
            unset($_SESSION[$name]);
            unset($_SESSION[$name . '_class']);
        }
    }
}