/**
 * Facebook Feed Dialog (no SDK and cookie method)
 * Dependancies:
 * Modernizr.touch
 */
var FB = {
	feedDialog: function(share_obj) {

		var feed_url = "https://www.facebook.com/dialog/feed",

			fb_panel_options = {
				app_id: share_obj.app_id,
				display: "popup",
				link: share_obj.link || null,
				picture: share_obj.picture || null,
				name: share_obj.name || null,
				caption: share_obj.caption || null,
				description: share_obj.description || null,
				redirect_uri: share_obj.base_url + share_obj.redirect_uri
			};

		var share_url = this.constructShareURL(feed_url, fb_panel_options);

		var dialog_width = 575,
			dialog_height = 293,
			panel_params = "width=" + dialog_width + ",height=" + dialog_height + ",";

		panel_params += "left=" + ((screen.width / 2) - (dialog_width / 2)) + ",";
		panel_params += "top=" + ((screen.height / 2) - (dialog_height / 2));

		this.dialog = window.open(share_url, "", panel_params);
	},
	constructShareURL: function(feed_url, fb_panel_options) {

		var query_join = true,
			option;

		for (var param in fb_panel_options) {

			if (fb_panel_options[param] === null) {
				continue;
			}

			feed_url += query_join ? "?" : "&";
			query_join = false;

			option = fb_panel_options[param];
			
			if (param !== "redirect_uri") {
				option = encodeURIComponent(option);
			}
			
			feed_url += param + "=" + option;
		}

		return feed_url;
	}
};

// Usage example 
(function(FB){

	// Trigger Facebook feed dialog
	FB.feedDialog({
		app_id: 722936844394336,
		base_url: window.location.protocol + "//" + window.location.host + '/',
		name: "All Things Hair",
		caption: "It's All About the Accessories by Eva",
		description: "Great hairstyles tailored for you. Check out ALL THINGS HAIR’s latest tips and tricks created by our top vloggers.",
		link: "http://www.youtube.com/user/AllThingsHairCA/ath?lang=en-ca&x=tile%3A%5B324%5D",
		picture: "http://img.youtube.com/vi/cAYKi4TEPbQ/0.jpg",
		redirect_uri: 'close_window.html'
	});

}(FB));
