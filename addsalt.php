<?php
/*
This shit runs every day at 23:59 as a task on the webserver. All it does is +1 to everyone in the salt database.
*/
include('connect.php');

$sql = "SELECT * FROM `salt`";
$result = $con->query($sql) or die("oops: ". $con->error);

while($row = $result->fetch_array()){
    $saltid = $row[0];
    $saltname = $row[1];
    $saltrank = $row[2];
    $newrank = $saltrank + 1;
    $sql = "UPDATE `actionbars`.`salt` SET `salt_level` = '$newrank' WHERE `salt`.`salt_id` = $saltid;";
    $con->query($sql) or die("oops: ". $con->error);
    echo "Added  +1 to ". $saltname."</br>";
}
?>