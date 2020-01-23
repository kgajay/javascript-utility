var DateFormatter = {
	monthsShort : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

	getProperDateFormat : function(dateString) {
		var datesArray = dateString.split('-');
		var date = datesArray[0];
		var month = datesArray[1];
		var year =  datesArray[2].length == 4 ? datesArray[2] : "20"+datesArray[2];
		year = parseInt(year);
		var dateFormat;
		var numericMonth;
    if(isNaN(month)) {
		  jQuery.each(DateFormatter.monthsShort, function(key, value) {
		  	if(value.toLowerCase() == month.toLowerCase()) {
		  		numericMonth = key;
		  		return;
		  	}
		  });
    } else {
      numericMonth = month - 1;
    }

		dateFormat = new Date(year, numericMonth, date);
		return dateFormat;
	},
  
  getDateFromTime : function(time) {
    var date = time.split(' ');
    return date[0];
  },

  arrangeDayMonthYear : function(date) {
    var arrangedDate = date.split('-');
    var yearSplit = arrangedDate[0].split(''); 
    arrangedDate = arrangedDate[2] + '-' + arrangedDate[1] + '-' + yearSplit[2] + yearSplit[3];
    return arrangedDate;
  },
  
  getMonthIntegerToString : function(date) {
    var arrangedDate = date.split('-');
    var monthString; 
    jQuery.each(DateFormatter.monthsShort, function(key, value) {
			if(key+1 == arrangedDate[1]) {
				monthString = value;
				return;
			}
		});
    arrangedDate = arrangedDate[0] + '-' + monthString + '-' + arrangedDate[2];
    return arrangedDate; 
  }
};

