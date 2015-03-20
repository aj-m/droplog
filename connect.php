<?php
//Credentials
$host = "localhost";
$username = "poop";
$password = "poop";
$db_name = "actionbars";

//Create mysqli connection to database
$con = new mysqli($host, $username, $password, $db_name);
if($con->connect_errno){
echo "Failed connection. Error: " . $con->connect_error;
}
?>