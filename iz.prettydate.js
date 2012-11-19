
(function($) {
	$.fn["izprettydate"] = function(options){
		
		var Iz_PrettyDate=function(datestring){
			this.date	= new Date(datestring);
			
			this.alignDate	= function (){
				return new Iz_PrettyDate(this.date.toDateString());
			}
		}
		
		var formatString=function (now,date,formated){
			var dateDiff	= Math.abs(now.date-date.date)/1000;
			var dayDiff	= Math.abs(Math.round( (now.alignDate().date-date.alignDate().date)/(60*60*24*1000) ));

			///////////////////////////////
			// Insert date values
			formated=formated.replace('%i',Math.floor(dateDiff/60));
			formated=formated.replace('%h',Math.floor(dateDiff/3600));
			formated=formated.replace('%d',dayDiff);
			
			var h	= date.date.getHours();
			if(h<10){ h="0"+h;}
			formated=formated.replace('%H',h);

			var i	= date.date.getMinutes();
			if(i<10){ i="0"+i;}
			formated=formated.replace('%I',i);
			
			var d	= date.date.getDate();
			if(d<10){ d="0"+d;}
			formated=formated.replace('%D',d);

			var m	= date.date.getMonth()+1;
			if(m<10){ m="0"+m;}
			formated=formated.replace('%m',m);
			
			m	= $.fn.izprettydate.settings.localization.month[date.date.getMonth()];
			formated=formated.replace('%M',m);

			var y	= date.date.getFullYear();
			formated=formated.replace('%Y',y);
			
			return formated;
		}
		
		return this.each( function(){
			// Parse the current datetime
			var content	= $(this).html();
			var date	= new Iz_PrettyDate(content);
			var formated	= content;
			var settings	= $.fn.izprettydate.settings;
			var now		= new Iz_PrettyDate(settings.now); 
			var dateDiff	= Math.abs(now.date-date.date)/1000;
			settings	= (date.date<now.date)?settings.localization.past:settings.localization.future;
			
			var dayDiff	= Math.abs(Math.round( (now.alignDate().date-date.alignDate().date)/(60*60*24*1000) ));
			if(dateDiff<60){
				formated	= settings.now;
			}else if(dateDiff<60*60){
				formated	= settings.minute;
			}else if(dayDiff==1){
				formated	= settings.oneday;
			}else if(dateDiff<24*60*60){
				formated	= settings.hour;
			}else if(now.date.getFullYear()!=date.date.getFullYear()){
				// Different year
				formated	= settings.year;
			}else if(now.date.getMonth()!=date.date.getMonth()){
				// Different month
				formated	= settings.month;
			}else{
				// Same month
				formated=settings.day;
			}
			
			///////////////////////////////
			// Insert date values
			formated	= formatString(now,date,formated);
			var alt		= formatString(now,date,$.fn.izprettydate.settings.localization.formated);
			// Replace date
			$(this).html(formated).attr('title',alt);

		});
	};
	
	$.fn.izprettydate.settings = {
		now: new Date(),
		localization: {
			formated: '%Y-%m-%D %H:%I',
			past: {
				now: 'Just now',
				minute: '%i minutes ago',
				hour: '%h hours ago',
				oneday: 'Yestday at %H:%I',
				day: '%d days ago',
				month: '%M %D',
				year: '%M %Y'
			},
			future: {
				now: 'Very soon',
				minute: 'In %i minutes',
				hour: 'In %h hours',
				oneday: 'Tomorrow at %H:%I',
				day: 'In %d days',
				month: '%M %D',
				year: '%M %Y'
			},
			month: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
		}
	};

	$.izprettydate_loadLocale = function(locale,path,now){
		var locales	= ['sv'];
		for(var i=0;i<locales.length;i++){
			if(locales[i]==locale.substr(0,locales[i].length)){
				document.write('<script src="'+path+'iz.prettydate.'+locales[i]+'.js"></script>');
			}
		}
		if(now){
			$.fn.izprettydate.settings.now	= now;
		}
	};
	
})(jQuery);
