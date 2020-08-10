// Functions for write tests and catch errors
module.exports = {

  //Click on the page object
  click: async (page, selector) => {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  // Write text in the page object
  typeText: async (page, selector, text) => {
    try {
      await page.waitForSelector(selector);
      await page.type(selector, text);
    } catch (error) {
      throw new Error(`Could not type text into selector: ${selector}`);
    }
  },

  // load the URL
  loadUrl: async (page, url) => {
    await page.goto(url, { waitUntil: "networkidle0" });
  },

  // Get you the text from the page object
  getText: async (page, selector) => {
    try {
      await page.waitForSelector(selector);
      return page.$eval(selector, e => e.innerHTML);
    } catch (error) {
      throw new Error(`Cannot get text from selector: ${selector}`);
    }
  },

  // Get how many searched elements are on the page
  getCount: async (page, selector) => {
    try {
      await page.waitForSelector(selector);
      return page.$$eval(selector, items => items.length);
    } catch (error) {
      throw new Error(`Cannot get count of selector: ${selector}`);
    }
  },

  // Check the text in the page opjeckt
  waitForText: async (page, selector, text) => {
    try {
      await page.waitForSelector(selector);
      await page.waitForFunction(
        (selector, text) =>
          document.querySelector(selector).innerHTML.includes(text),
        {},
        selector,
        text
      );
    } catch (error) {
      throw new Error(`Text: ${text} not found for selector ${selector}`);
    }
  },

  // Press the key on the keyboard
  pressKey: async (page, key) => {
    try {
      await page.keyboard.press(key);
    } catch (error) {
      throw new Error(`Could not press key: ${key} on the keyboard`);
    }
  },

  // Check if the page object is exist
  shouldExist: async (page, selector) => {
    try {
      await page.waitForSelector(selector, { visible: true });
    } catch (error) {
      throw new Error(`Selector: ${selector} not exist`);
    }
  },
// Check if the page object is not exist
  shouldNotExist: async (page, selector) => {
    try {
      await page.waitForSelector(() => !document.querySelector(selector));
    } catch (error) {
      throw new Error(`Selector: ${selector} is visible, but should not`);
    }
  },

  // Check element in the item
  shouldBeIncluded: async (page, selectors, searched_object) => {
    try {
      for(item of selectors){ 
      await page.waitForSelector(`${item}${searched_object}`);
    } 
    }catch (error) {
      throw new Error(`Searched object: ${searched_object} is not found`);
    }
  }
};
