const puppeteer = require("puppeteer");
const expect = require("chai").expect;

const config = require("../lib/config");
const functions = require("../lib/helpers");
const utils = require("../lib/utils");

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

