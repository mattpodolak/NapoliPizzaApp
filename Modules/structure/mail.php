<?php
    // catch
    $json = file_get_contents("php://input");
    $jsonIterator = new RecursiveIteratorIterator(
        new RecursiveArrayIterator(json_decode($json, TRUE)),
        RecursiveIteratorIterator::SELF_FIRST);
    
    foreach ($jsonIterator as $key => $val) {
        if(is_array($val)) {
            print_r "$key:\n";
        } else {
            print_r "$key => $val\n";
        }
    }

	//ini_set("SMTP", "aspmx.l.google.com");
	//ini_set("sendmail_from", "napolipizzabarrie@gmail.com");
    //$message = "testytesttest";
	//$sender = "From: napolipizzabarrie@gmail.com";
	//mail("napolipizzabarrie@gmail.com", "NAPOLIPIZZA", $message, $sender);
?>