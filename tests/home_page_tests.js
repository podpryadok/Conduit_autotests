const puppeteer = require("puppeteer");
const expect = require("chai").expect;

const config = require("../lib/config");
const functions = require("../lib/helpers");
const utils = require("../lib/utils");

const home_page_objects = require("../page_objects/home_page_selectors");

let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({
    headless: config.isHeadLess,
    slowMo: config.slowMo,
    devtools: config.devtools,
    timeout: config.launchTimeout
  });
  page = await browser.newPage();
  await page.setDefaultTimeout(config.waitingTimeout);
  await page.setViewport({
    width: config.viewportWeiht,
    height: config.viewportHeight
  });
});

after(async () => {
  await browser.close();
});

/* Напишите автоматический сценарий/сценарии для проверки фильтрации записей по тегам на сайте https://demo.realworld.io.
Добавьте документацию, необходимую для работы с вашим проектом автоматизации.
Загрузите код проекта в публичный репозиторий на GitHub и поделитесь ссылкой на него */

describe('Home page: Valid tests', () =>{
    it('Open the home page', async () =>{
        await functions.loadUrl(page, config.baseURl);
        await functions.shouldExist(page, home_page_objects.home_page_banner);
        await functions.shouldExist(page, home_page_objects.taglist);
    });

    it("Click on the Dragon tag", async () =>{
        await functions.shouldExist(page, home_page_objects.taglist);
        await functions.click(page, home_page_objects.dragon_tag);
        await functions.shouldExist(page, home_page_objects.dragon_tab);
        await functions.waitForText(page, home_page_objects.dragon_tab, "dragons");
    });

    it("Count the number of items by tag", async () => {
        let items_count = await functions.getCount(page, home_page_objects.search_item);
        expect(10).to.equal(items_count);
    });

    it("Check if all items have the current tag", async () => {
        let items = new Array();
        for(let i = 0; i > await functions.getCount(page, home_page_objects.search_item); ++i)
        {
            items.push(`body > div > div > div > div.container.page > div > div.col-md-9 > article-list > article-preview:nth-child(${i})`);
        }
        
        await functions.shouldBeIncluded(page, items, home_page_objects.dragon_tag_in_item);
    });
});