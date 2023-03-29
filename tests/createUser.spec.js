const puppeteer = require("puppeteer");

describe('Creating users', () => {
	let browser;
	let page;
	let user;

	beforeAll(async () => {
		user = {
			"firstName": "test",
			"lastName": "test",
			"email": `${new Date().getTime()}@gmail.com`,
			"password": "1234",
			"description": "Test User"
		}
		browser = await puppeteer.launch({ headless: false }); // change headless to false to open chromium
		page = await browser.newPage();
		await page.goto('http://localhost:3000/create');
		await page.waitForSelector('#first-name');
		await page.focus('#first-name');
		await page.keyboard.type(user.firstName);
		await page.focus('#last-name');
		await page.keyboard.type(user.lastName);
		await page.focus('#email');
		await page.keyboard.type(user.email);
		await page.focus('#password');
		await page.keyboard.type(user.password);
		await page.focus('#description');
		await page.keyboard.type(user.description);
		await page.click('#submit-user');
		await page.waitForSelector('#main-page-link');
		await page.focus('#main-page-link');
		await page.click('#main-page-link');
	});

	it("create user and verify that he/she is in the table", async (done) => {
		await page.waitForSelector('table')

		const data = await page.$$eval('table tr td', tds => tds.map((td) => {
			return td.innerText.toString();
		}));


		expect(data[0]).toContain(user.firstName)
		expect(data[1]).toContain(user.lastName)
		expect(data[2]).toContain(user.email)
		expect(data[3]).toContain(user.description)
		done()
	});

	afterAll(() => browser.close());
});
