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

var indexFunctions = require("./index");

let data;

describe("Root Tests", async () => {
  let BulkDataForm = indexFunctions.bulkDataFormServices;

  it("should open the 'Bulk Data Form Website'", async () => {
    result = await BulkDataForm.open(driver);

    data = await result.driver.executeScript(`let data = {}
document.querySelectorAll("body > div > table.table.table-striped.table-responsive > tbody > tr").forEach(tr=>{
    const el = tr.querySelectorAll('td')[1];
    data[el.id] = el.innerText;
})
return data`);
    expect(result.title).to.equal("Bulk Form Data");
  });

  it("it should return the correct data for 6th row", async () => {
    result = await BulkDataForm.getValueOfNthRow(driver, 6);
    expect(data[result.id]).to.equal(result.data);
  });

  it("it should return the correct data for 62th row", async () => {
    result = await BulkDataForm.getValueOfNthRow(driver, 62);
    expect(data[result.id]).to.equal(result.data);
  });

  it("it should return the correct data for 23rd row", async () => {
    result = await BulkDataForm.getValueOfNthRow(driver, 23);
    expect(data[result.id]).to.equal(result.data);
  });

  it("it should fill the 56th input of the form with the data from the table", async () => {
    result = await BulkDataForm.fillTheForm(driver, 56);
    const value = await result.driver.executeScript(
      `return document.querySelector('#${result.id}').value`
    );
    expect(data[result.id.slice(3)]).to.equal(result.data);
    expect(data[result.id.slice(3)]).to.equal(value);
  });
  it("it should fill the 7th input of the form with the data from the table", async () => {
    result = await BulkDataForm.fillTheForm(driver, 7);
    const value = await result.driver.executeScript(
      `return document.querySelector('#${result.id}').value`
    );
    expect(data[result.id.slice(3)]).to.equal(result.data);
    expect(data[result.id.slice(3)]).to.equal(value);
  });
  it("it should fill the 39th input of the form with the data from the table", async () => {
    result = await BulkDataForm.fillTheForm(driver, 39);
    const value = await result.driver.executeScript(
      `return document.querySelector('#${result.id}').value`
    );
    expect(data[result.id.slice(3)]).to.equal(result.data);
    expect(data[result.id.slice(3)]).to.equal(value);
  });

  it("it should submit the form", async () => {
    result = await BulkDataForm.fillAllDataAndSubmit(driver);
    expect(
      await result.driver.findElement(By.xpath("/html")).getText()
    ).toMatchSnapshot();
  });
});
after(() => driver && driver.quit());
