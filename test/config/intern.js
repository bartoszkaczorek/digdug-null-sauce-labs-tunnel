/* global JSON */
define(['intern/dojo/text!./intern.json'], function (generatedJson) {
	"use strict";

	var config = JSON.parse(generatedJson);
	if (typeof config.excludeInstrumentation === 'string') {
		config.excludeInstrumentation = new RegExp(config.excludeInstrumentation);
	}

	return config;
});