const config = {
	verbose: true,
	preset: 'jest-puppeteer',
	testMatch: ['**/tests/*.js?(x)'],
	setupFilesAfterEnv: ['./jest.setup.js']
};

module.exports = config;
