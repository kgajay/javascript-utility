var PopUP = {
	callbackSet : false,
	
	/* following command to show popup and close popup */
	openPopup : function() {
		PopUP.alignCenter();
		jQuery('#popupBg').fadeIn();
		jQuery('#popup-div').fadeIn();
		if(PopUP.callbackSet){
			PopUP.onLoadCallback();
		}
	},

	/* function to close pop up*/
	closePopup : function() {
		jQuery('#popupBg').fadeOut();
		jQuery('#popup-div').fadeOut();
	},
	/* function to close pop up*/

	/**align at center**/
	alignCenter : function() {
		var popup_width = jQuery("#popup-div").width();
		var popup_height = jQuery("#popup-div").height();
		var left_margin = (screen.width/2)-(popup_width/2);
		var top_margin = (screen.height/2)-(popup_height/2) - 100;
		jQuery("#popup-div").css('left',left_margin);
		jQuery("#popup-div").css('top',top_margin);
	},

	bindEvents : function(){
		jQuery('#popupBg').click(function(){
			PopUP.closePopup();
		});

		jQuery('#popup-div').on("click", ".close-popup", function () {
			PopUP.closePopup();
		});

		//Detect escape key and close popup
		jQuery(document).keyup(function(e) {
			if (e.keyCode == 27) {  
				PopUP.closePopup();
			}
		});
	},

	executeCallbackOnLoad : function(func){
		PopUP.callbackSet = true;
		PopUP.onLoadCallback = func ;
	},
	onLoadCallback : {},

};

		


/* following command to show popup and close popup
jQuery('#show-popup').click(function(){
	PopUP.alignCenter();
	jQuery('#popupBg').fadeIn();
	jQuery('#popup-div').fadeIn();
});

jQuery('#popupBg').click(function(){
	PopUP.closePopup();
});
*/


