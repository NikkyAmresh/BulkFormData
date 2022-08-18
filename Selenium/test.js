require("chromedriver");
const assert = require("assert");
const chai = require("chai");
const { jestSnapshotPlugin } = require("mocha-chai-jest-snapshot");
const expect = chai.expect;
chai.use(jestSnapshotPlugin());

const { Builder, Key, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const service = new chrome.ServiceBuilder("./chromedriver1eebc8c");
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

  it("it should open the 'File Upload' link and upload the file upload.jpg", async () => {
    result = await TheIntenetServices.uploadFile(driver);
    const link = await result.driver.getCurrentUrl();
    assert.equal(baseUrl + "upload", link, "Error getting the URL");
    expect(
      await result.driver.findElement(By.xpath("/html")).getText()
    ).toMatchSnapshot();
    const text = await result.driver
      .findElement(By.xpath('//*[@id="content"]/div/h3'))
      .getText();
    assert.equal("File Uploaded!", text, "Error Uploading the file");
  });

  it("it should open the link 'Checkboxes' and check and uncheck the 2 checkboxes respectively", async () => {
    result = await TheIntenetServices.changeCheckboxes(driver);

    const newUrl = await result.driver.getCurrentUrl();
    const newTitle = await result.driver.getTitle();

    const checkbox1 = await result.driver
      .findElement(By.xpath('//*[@id="checkboxes"]/input[1]'))
      .getAttribute("checked");
    const checkbox2 = await result.driver
      .findElement(By.xpath('//*[@id="checkboxes"]/input[2]'))
      .getAttribute("checked");

    assert.equal(baseUrl + "checkboxes", newUrl, "Error getting the new URL");
    assert.equal("The Internet", newTitle, "Error getting the Title");
    expect(checkbox1).toMatchSnapshot();
    expect(checkbox2).toMatchSnapshot();
    expect(
      await result.driver.findElement(By.xpath("/html")).getText()
    ).toMatchSnapshot();
  });
});
after(() => driver && driver.quit());
