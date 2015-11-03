define(['module',
	'intern!bdd',
	'intern/chai!expect'], function (module, bdd, expect) {
	'use strict';

	bdd.describe(module.id, function () {

		bdd.describe('When adding two numbers', function () {
			var result = null;

			bdd.before(function () {
				result = 2 + 3;
			});

			bdd.it('Then result should contain sum of them', function () {
				expect(result).to.equal(5);
			});
		});

		bdd.describe('When multiplying two numbers', function () {
			var result = null;

			bdd.before(function () {
				result = 4 * 5;
			});

			bdd.it('Then result should contain product of them', function () {
				expect(result).to.equal(20);
			});
		});

	});
});