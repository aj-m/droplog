<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Yakcity</title>
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<link rel="shortcut icon" href="favicon.ico" />
</head>
<body>
	<div class="stats">
		<h2>Redditors</br>Clan</br>Drop-Log</h2>
		<div class='filters'>
			<p>Filters:</p>
			<ul>
				<li>No danie: <input type='checkbox' class='check' id='hideDanie'/></li>
			</ul>
		</div>
		<div class='message'>
			<p>Salt Ranking:</p>
				<ol>
		<?php
		include('connect.php');

		$sql = "SELECT * FROM `salt` ORDER BY `salt`.`salt_level`  DESC LIMIT 5";
		$result = $con->query($sql) or die("oops: ". $con->error);

		while($row = $result->fetch_array()){
	    	$saltname = $row[1];
	    	$saltrank = $row[2];
	    	if($saltrank == 1){
	    		echo "<li>$saltname - $saltrank day</li>";
	    	}else{
				echo "<li>$saltname - $saltrank days</li>";
	    	}
	    	
	    }

		?>
			</ol>
		</div>
	</div>
	<div class="loader"></div>
	<div class="wrapper"></div>
<!-- Javascript -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
<script src="js/moment.js"></script>
<script src="js/alog.js"></script>
  <script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-40503600-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>