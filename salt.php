<?php
//Load database connection
include('connect.php');

if(isset($_REQUEST["name"])){
	$name = $_REQUEST["name"];
    //Yes i'm not using prepared statements, yes I should be, yes i'm really dumb :^)
	$sql = "SELECT * FROM `salt` WHERE `salt_name` LIKE '$name'";

	$result = $con->query($sql) or die("oops: ". $con->error);

    $row_cnt = $result->num_rows;

    if ($row_cnt > 0){
        //Name is already in salt database, set salt level to 0 m8 you got lucky
        $row = $result->fetch_array();
        $saltid = $row[0];

        $sql = "UPDATE `actionbars`.`salt` SET `salt_level` = '0' WHERE `salt`.`salt_id` = $saltid;";
        $con->query($sql) or die("oops: ". $con->error);
        echo "Drop found for ".$name.". Salt counter set to 0!";
    }else{
        //Name isn't in salt database, but he was on the log => insert into salt databas with a 0 ranking. Welcome m8!
        $sql = "INSERT INTO `actionbars`.`salt` (`salt_id`, `salt_name`, `salt_level`) VALUES (NULL, '$name', '0');";
        $con->query($sql) or die("oops: ". $con->error);
        echo "New player found: ".$name.". Inserted with a salt counter of 0.";
    }  
}
?>