<?php
include('connect.php');

if(isset($_REQUEST["name"])){
	$name = $_REQUEST["name"];

	$sql = "SELECT * FROM `salt` WHERE `salt_name` LIKE '$name'";

	$result = $con->query($sql) or die("oops: ". $con->error);

    $row_cnt = $result->num_rows;

    if ($row_cnt > 0){
        //update
        $row = $result->fetch_array();
        $saltid = $row[0];

        $sql = "UPDATE `actionbars`.`salt` SET `salt_level` = '0' WHERE `salt`.`salt_id` = $saltid;";
        $con->query($sql) or die("oops: ". $con->error);
        echo "Drop found for ".$name.". Salt counter set to 0!";
    }else{
        //insert
        $sql = "INSERT INTO `actionbars`.`salt` (`salt_id`, `salt_name`, `salt_level`) VALUES (NULL, '$name', '0');";
        $con->query($sql) or die("oops: ". $con->error);
        echo "New player found: ".$name.". Inserted with a salt counter of 0.";
    }  
}
?>