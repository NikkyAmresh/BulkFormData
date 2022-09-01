const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://bulk-data-form.herokuapp.com/";

const bulkDataFormServices = {
  open: async (driver) => {
    await driver.get(baseUrl);
    const title = await driver.getTitle();
    // user needs to open the given URL in the driver and
    // then return the driver and title of the webpage as the object
    await driver.executeScript(`let data = {}
document.querySelectorAll("body > div > table.table.table-striped.table-responsive > tbody > tr").forEach(tr=>{
    const el = tr.querySelectorAll('td')[1];
    data[el.id] = el.innerText;
    
})
localStorage['data'] = JSON.stringify(data)`);
    return { title, driver };
  },
  getValueOfNthRow: async (driver, n) => {
    const id = await driver
      .findElement(
        By.xpath("/html/body/div/table[2]/tbody/tr[" + n + "]/td[1]")
      )
      .getText();
    const data = await driver
      .findElement(
        By.xpath("/html/body/div/table[2]/tbody/tr[" + n + "]/td[2]")
      )
      .getText();

    return {
      id,
      data,
    };
  },

  fillTheForm: async (driver, n) => {
    await driver.get(baseUrl + "form.php");
    const data = await driver.executeScript(
      `return JSON.parse(localStorage['data'])`
    );
    const element = await driver.findElement(
      By.xpath("/html/body/div/form/div[" + n + "]/input")
    );
    const id = await element.getAttribute("id");
    await element.sendKeys(data[id.slice(3)]);
    return { id, data: data[id.slice(3)], driver };
  },

  fillAllDataAndSubmit: async (driver) => {
    await driver.executeScript(`let data = JSON.parse(localStorage['data'])
document.querySelectorAll('input[type="text"]').forEach((inp=>{
   const str = inp.id.slice(3);
    inp.value = data[str];
}))`);
    await driver.findElement(By.xpath("/html/body/div/form/button")).click();
    return {
      driver,
    };
  },
};

module.exports = {
  bulkDataFormServices,
};
