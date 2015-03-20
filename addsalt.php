<?php
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