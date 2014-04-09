var rssurl = "data/significant_month.atom";

$.ajax({
				url:rssurl,
				dataType:'xml',
				type:'GET',
				success:function(xml) {

					var doc = $(xml).find('feed').each(function() {
						 var title = $(this).find("title"); 
						// // var des = $(this).find("description").text();
						// // var link = $(this).find("link").text();
						// // var $des = $('<div class="linkitem"></div>').html(des);
						// // var $link = $('<a></a>').attr('href',link).attr('target','_blank').html(title);
						// // var pubDate = new Date($(this).find("pubDate").text()); 
						// // var day = pubDate.getDate();
						// // var month = pubDate.getMonth() + 1;
						// // var year = pubDate.getFullYear();
						// // var date = day + '/' + month + '/' + year;
						// // var $date = $('<div class="date"></div>').text(date)	
						// // var wrapper = "<li class='single-feed'>";
						// // $(".feed-container").append($(wrapper).append($link,$date,$des));					
						// var hi = "hi"
						 console.log(title[0]);
					})

					
					// console.log(doc[0].childNodes);

				},
				error:function() {
					alert("I am sorry, But I can't fetch that feed");
				}
			});

