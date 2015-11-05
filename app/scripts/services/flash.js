app.factory("flash", function($rootScope) {
  var queue = [];
  var currentElement = null;

	$rootScope.$on("$stateChangeSuccess", function() {
		currentElement = queue.shift() || undefined;
	});

	return {
		setAlert: function(obj) {
			queue.push(obj);
		},
		getMessage: function() {
			return currentElement.msg;
		},
		getType: function() {
			return currentElement.type;
		},
		hasAlert: function() {
			return currentElement !== undefined;
		}
	};
});