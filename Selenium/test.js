require("chromedriver");
const assert = require("assert");
const chai = require("chai");
const { jestSnapshotPlugin } = require("mocha-chai-jest-snapshot");
const expect = chai.expect;
chai.use(jestSnapshotPlugin());

const { Builder, Key, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
// const service = new chrome.ServiceBuilder("./chromedriver1eebc8c");
const firefox = require("selenium-webdriver/firefox");

const screen = {
  width: 640,
  height: 480,
};

let driver;

before(async function () {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .addArguments("--headless")
        .addArguments("--no-sandbox")
        .addArguments("--disable-dev-shm-usage")
        .windowSize(screen)
    )
    // .setChromeService(service)
    .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
    .build();
});

const baseUrl = "https://the-internet.herokuapp.com/";

var indexFunctions = require("./index");

describe("Root Tests", async () => {
  let TheIntenetServices = indexFunctions.TheIntenetServices;

  it("should open the 'The Internet Website'", async () => {
    result = await TheIntenetServices.open(driver);
    assert.equal("The Internet", result.title, "Error getting the title");
    expect(
      await result.driver.findElement(By.xpath("/html")).getText()
    ).toMatchSnapshot();
  });

  it("it should open the 'Basic Auth' link and authenticate using credentials", async () => {
    result = await TheIntenetServices.basicAuth(driver);
    const link = await result.driver.getCurrentUrl();
    assert.equal(baseUrl + "basic_auth", link, "Error getting the URL");
    const text = await result.driver
      .findElement(By.xpath('//*[@id="content"]/div/p'))
      .getText();
    assert.equal(
      "Congratulations! You must have the proper credentials.",
      text,
      "Error authenticating"
    );
    expect(
      await result.driver.findElement(By.xpath("/html")).getText()
    ).toMatchSnapshot();
  });

  it("it should open the link 'Sortable Data Tables' and sort the first table by column 'Website'", async () => {
    result = await TheIntenetServices.clickOnSortableTableLink(driver);

    const newUrl = await result.driver.getCurrentUrl();
    const newTitle = await result.driver.getTitle();

    assert.equal(baseUrl + "tables", newUrl, "Error getting the new URL");
    assert.equal("The Internet", newTitle, "Error getting the Title");
    expect(result.tableText).toMatchSnapshot();
    expect(
      await result.driver.findElement(By.xpath("/html")).getText()
    ).toMatchSnapshot();
  });
});

after(() => driver && driver.quit());
