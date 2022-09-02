const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://bulk-data-form-2.herokuapp.com/";

const bulkDataFormServices = {
  open: async (driver) => {
    await driver.get(baseUrl);
    const title = await driver.getTitle();
    // user needs to open the given URL in the driver and
    // then return the driver and title of the webpage as the object
    await driver.executeScript(`data = {}
document.querySelectorAll("body > div > table.table.table-striped.table-responsive > tbody > tr").forEach(tr=>{
    const el = tr.querySelectorAll('td');
    data[el[1].id] = el[1].innerText;
    data[el[1].id+'n1'] = el[2].innerText;
    data[el[1].id+'n2'] = el[3].innerText;
    
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
    const num1 = await driver
      .findElement(
        By.xpath("/html/body/div/table[2]/tbody/tr[" + n + "]/td[3]")
      )
      .getText();

    const num2 = await driver
      .findElement(
        By.xpath("/html/body/div/table[2]/tbody/tr[" + n + "]/td[4]")
      )
      .getText();

    return {
      id,
      num1,
      num2,
      data,
    };
  },

  fillTheForm: async (driver, n) => {
    await driver.get(baseUrl + "form.php");
    const data = await driver.executeScript(
      `return JSON.parse(localStorage['data'])`
    );
    const element = await driver.findElement(
      By.xpath("/html/body/div/form/div[" + n + "]/input[1]")
    );
    const id = await element.getAttribute("id");
    const n1 = data[id.slice(3) + "n1"];
    const n2 = data[id.slice(3) + "n2"];
    const token = data[id.slice(3)];
    const product = n1 * n2;
    const sum = parseInt(n1) + parseInt(n2);
    const min = Math.min(n1, n2);
    const max = Math.max(n1, n2);
    const avg = Math.floor((parseInt(n1) + parseInt(n2)) / 2);
    const diff = Math.abs(n1 - n2);
    const quotient = Math.floor(n1 / n2);
    const remainder = n1 % n2;

    await driver.findElement(By.id(`${id}`)).sendKeys(token);
    await driver.findElement(By.id(`${id}-product`)).sendKeys(product);
    await driver.findElement(By.id(`${id}-sum`)).sendKeys(sum);
    await driver.findElement(By.id(`${id}-min`)).sendKeys(min);
    await driver.findElement(By.id(`${id}-max`)).sendKeys(max);
    await driver.findElement(By.id(`${id}-average`)).sendKeys(avg);
    await driver.findElement(By.id(`${id}-diff`)).sendKeys(diff);
    await driver.findElement(By.id(`${id}-quotient`)).sendKeys(quotient);
    await driver.findElement(By.id(`${id}-remainder`)).sendKeys(remainder);

    return {
      id,
      token,
      product,
      sum,
      min,
      max,
      avg,
      diff,
      quotient,
      remainder,
      n1,
      n2,
      data: token,
      driver,
    };
  },

  fillAllDataAndSubmit: async (driver) => {
    await driver.executeScript(`data = JSON.parse(localStorage['data'])
document.querySelectorAll('input[type="text"]').forEach((inp=>{

   const str = inp.id.slice(3);
    document.getElementById(inp.id+'-product').value = data[str+'n1'] * data[str+'n2'];
    document.getElementById(inp.id+'-sum').value = parseInt(data[str+'n1']) + parseInt(data[str+'n2']);
    document.getElementById(inp.id+'-min').value = data[str+'n1'] < data[str+'n2']?data[str+'n1']:data[str+'n2'];
        document.getElementById(inp.id+'-max').value = data[str+'n1'] > data[str+'n2']?data[str+'n1']:data[str+'n2'];
        document.getElementById(inp.id+'-average').value = Math.floor((parseInt(data[str+'n1'])+parseInt(data[str+'n2']))/2);
    document.getElementById(inp.id+'-diff').value = Math.abs(data[str+'n1']-data[str+'n2']);
     document.getElementById(inp.id+'-quotient').value = Math.floor(data[str+'n1']/data[str+'n2']);
     document.getElementById(inp.id+'-remainder').value = data[str+'n1']%data[str+'n2'];

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
