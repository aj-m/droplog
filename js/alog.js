$(document).ready(function() {
	var parseRSS = function(paramsObj) {
		var base = "https://ajax.googleapis.com/ajax/services/feed/load",
			params = "?v=1.0&num=" + paramsObj.count + "&callback=?&q=" + paramsObj.url,
			url = base + params;
		$.ajax({
			url: url,
			dataType: "json",
			success: function(data) {
				paramsObj.callback(data.responseData.feed.entries);
			}
		});
	};

	var names = ["Danie", "DoSlayer", "Chet_Faker", "Based_Breezy", "Dyn_Asty", "PantsuOnHead",
		"Joe_Senpai", "Kilts", "Leslie_Meow", "Huntah", "Reapers", "Qtto", "Vikings_Call", "Maylee_bro",
		"NattyNomaly", "Michael7050", "Villem", "Sneakygamer", "Pryo", "Sir Xanorth", "Shadow Gold", "Fosta",
		"Soya", "Sleepy_Borat", "Kook", "Irondangart", "Smark", "CalculaTHOR", "Tentacruelty", "Royal_Huff"
	];
	var bosspets = ["Queen Black Dragon scale", "Giant Feather", "Auburn lock", "Decaying tooth", "Severed hoof", "Blood-soaked feather", "Rotten fang",
		"Volcanic shard", "King black dragon scale", "Kalphite egg", "Kalphite claw", "Corporeal bone", "Ribs of chaos", "Corrupted Ascension signet", "Shrivelled dagannoth claw",
		"dagannoth egg", "dagannoth scale", "Ancient artefact", "Ancient summoning stone", "Araxyte egg", "Vitalis"
	];
	var extraclass = "";

	getLogs(names, function() {
		console.log('Callback fired: Sort divs, add boss pet highlights and update salt counter.');
		sortDivs();
		addHighlight();
		countSalt();
	});

	$("#hideDanie").click(function() {
		if ($('#hideDanie').is(":checked")) {
			hideDanie();
		} else {
			showDanie();
		}
	});

	function getLogs(names, cb) {
		var count = 0;
		var arrayLength = names.length;
		for (var i = 0; i < arrayLength; i++) {
			var name = names[i];
			console.log('Started RSS fetching for: ' + name);
			parseRSS({
				url: "http://services.runescape.com/m=adventurers-log/rssfeed?searchName=" + name,
				count: 10,
				callback: function(posts) {
					count++;
					console.log(count);
					for (var ic = 0; ic < posts.length; ic++) {
						var obj = posts[ic];
						var title = obj.title;
						var name = obj.link.substring(obj.link.indexOf("=", 32) + 1, obj.link.indexOf("&"));
						name = name.replace("%A0", " ");
						console.log('Parsed RSS nr.' + ic + ' log for: ' + name + '.');
						var date = moment(obj.publishedDate).format("DD/MM/YYYY");

						if (title.indexOf("found") > -1 && title.indexOf("dragon helm") < 0 && title.indexOf("dark") < 0 && title.indexOf("triskelion") < 0 && title.indexOf("dragon boots") < 0 && title.indexOf("Daemonheim's") < 0) {
							$('.wrapper').append("<div class='entry " + extraclass + "'><img src='http://services.runescape.com/m=avatar-rs/c=OVcilJfXfnM/" + name + "/chat.png' alt=''/><div class='header'><h3>" + obj.title + "</h3></div><div class='info'>By <div class='name'>" + name + "</div> on <div class='date'>" + date + "</div></div></div>");
						}
					}
					console.log('-------------------------');
					if (count == arrayLength) {
						cb();
					}
				}
			});
		}
	}

	//sorting - http://stackoverflow.com/questions/5641440/order-divs-based-on-dates-inside-a-span-element
	function sortDivs() {
		var amd = [],
			tDate, tElem;

		$('.entry').each(function(i, elem) {
			var aDate = $(this).find('.date').text().split('/');
			$(this).data('date', aDate[2] + aDate[1] + aDate[0]);
		});

		amd = $('.entry').map(function() {
			return $(this).data('date');
		}).get();

		function compareNumbers(a, b) {
			return a - b;
		}

		amd.sort();

		while (amd.length) {
			tDate = amd.pop();
			tElem = $('.entry').filter(function() {
				return $(this).data('date') == tDate;
			}).detach();
			$('.wrapper').append(tElem);
		}
		$('.loader').delay(800).fadeOut();
		$('.wrapper').delay(1000).fadeIn();
	}

	function addHighlight() {
		var arrLength = bosspets.length;
		$('.entry').each(function(i, elem) {
			var title = $(elem).find('.header h3').text();
			var name = $(elem).find('.name').text();
			for (var i = 0; i < arrLength; i++) {
				if (title.indexOf(bosspets[i]) > -1 && name.indexOf("Based Breezy") > -1) {
					$(elem).addClass('canada');
				} else if (title.indexOf(bosspets[i]) > -1) {
					$(elem).addClass('highlight');
				} else if (title.indexOf("fang") > -1) {
					$(elem).addClass('fang');
				} else if (title.indexOf("Seismic") > -1) {
					$(elem).addClass('seismic');
				}
			}
		});
	}

	function hideDanie() {
		$('.entry').each(function(i, elem) {
			if ($(elem).find('.name').text() == "Danie") {
				$(elem).hide();
			}
		});
	}

	function showDanie() {
		$('.entry').each(function(i, elem) {
			if ($(elem).find('.name').text() == "Danie") {
				$(elem).show();
			}
		});
	}

	function countSalt() {
		var luckyBastards = [];
		$('.entry').each(function(i, elem) {
			luckyBastards.push(
				$(elem).find('.name').text()
			);
		});

		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		}

		var uniqueBastards = luckyBastards.filter(onlyUnique);

		var arrayLength = uniqueBastards.length;
		for (var i = 0; i < arrayLength; i++) {
			var name = uniqueBastards[i];
			$.ajax({
				type: 'post',
				data: {
					name: name
				},
				url: '../salt.php',
				success: function(data) {
					console.log(data);
				}
			});
		}
	}

	$(document).on('click', '.entry', function() {
		var name = $(this).find('.name').text();
		if (name == "Danie") {
			$('body').append('<img class="salt" src="img/salt.png"/>');
		}
	});
});