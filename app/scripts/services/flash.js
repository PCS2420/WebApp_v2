"use strict";
angular.module('webAppV2App')
.factory("flash", function($rootScope) {
  var queue = [];
  var currentElement = null;

	$rootScope.$on("$stateChangeSuccess", function() {
		currentElement = queue.shift() || null;
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
			return currentElement !== null;
		},
		shiftQueue: function() {
			currentElement = queue.shift() || null;
		}
	};
});
