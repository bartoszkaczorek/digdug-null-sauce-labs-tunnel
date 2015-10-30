var Promise = require('dojo/Promise');
var Tunnel = require('digdug/Tunnel');
var util = require('digdug/util');
var urlUtil = require('url');
var request = require('request');

function success() {
	return Promise.resolve();
}

function NullSauceTunnel() {
	Tunnel.apply(this, arguments);
}

var _super = Tunnel.prototype;
NullSauceTunnel.prototype = util.mixin(Object.create(_super), /** @lends module:digdug/NullTunnel */ {
	auth: '',
	isDownloaded: true,
	download: success,
	start: function () {
		this.isRunning = true;
		return success();
	},
	stop: function () {
		this.isRunning = false;
		return success();
	},
	sendJobState: function (jobId, data) {
		var url = urlUtil.parse(this.restUrl || 'https://saucelabs.com/rest/v1/');
		url.auth = this.username + ':' + this.accessKey;
		url.pathname += this.username + '/jobs/' + jobId;

		var payload = JSON.stringify({
			build: data.buildId,
			'custom-data': data.extra,
			name: data.name,
			passed: data.success,
			public: data.visibility,
			tags: data.tags
		});

		var result = new Promise.Deferred();
		
		request({
			body: payload,
			headers: {
				"accept":"application/json"
			},
			auth : {
				"username" : this.username,
				"password" : this.accessKey
			},
			method : "PUT",
			proxy: this.proxy,
			url : urlUtil.format(url)
			
		}, function (error, response, body) {
			response.data = body;
			result.resolve(response);
		});
		
		return result.promise.then(function (response) {
			if (response.data) {
				var data = JSON.parse(response.data);

				if (data.error) {
					throw new Error(data.error);
				}

				if (response.statusCode !== 200) {
					throw new Error('Server reported ' + response.statusCode + ' with: ' + response.data);
				}
			}
			else {
				throw new Error('Server reported ' + response.statusCode + ' with no other data.');
			}
		});
	}
});

module.exports = NullSauceTunnel;
