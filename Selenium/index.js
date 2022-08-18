const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://the-internet.herokuapp.com/";

const TheIntenetServices = {
  open: async (driver) => {
    await driver.get(baseUrl);
    const title = await driver.getTitle();
    // user needs to open the given URL in the driver and
    // then return the driver and title of the webpage as the object
    return { title, driver };
  },
  uploadFile: async (driver) => {
    // user needs to open the given URL in the driver and
    // click on the link "File Upload". wait until page is fully loaded and upload the file 'upload.jpg' and submit it
    // then return the driver
    await driver.get(baseUrl);
    await driver
      .findElement(By.xpath("//a[contains(text(),'File Upload')]"))
      .click();
    await driver
      .findElement(By.id("file-upload"))
      .sendKeys(process.cwd() + "/upload.jpg");
    await driver.findElement(By.id("file-submit")).click();

    return {
      driver,
    };
  },

  changeCheckboxes: async (driver) => {
    await driver.get(baseUrl);
    await driver
      .findElement(By.xpath("//a[contains(text(),'Checkboxes')]"))
      .click();
    await driver
      .findElement(By.xpath('//*[@id="checkboxes"]/input[1]'))
      .click();
    await driver
      .findElement(By.xpath('//*[@id="checkboxes"]/input[2]'))
      .click();

    // open the homepage and click on the "Checkboxes" link
    // check the first checkbox and the uncheck the second checkbox
    // return the driver
    return {
      driver,
    };
  },
};

module.exports = {
  TheIntenetServices,
};
