const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://bulk-data-form-2.herokuapp.com/";

const bulkDataFormServices = {
  open: async (driver) => {
    await driver.get(baseUrl);
    const title = await driver.getTitle();
    // user needs to open the given URL in the driver and
    // then return the driver and title of the webpage as the object

    return { title, driver };
  },
  getValueOfNthRow: async (driver, n) => {
    // Get the value of the nth row of the table and return id,token,num1,num2 and id as object

    return {
      id,
      num1,
      num2,
      token,
    };
  },

  fillTheForm: async (driver, n) => {
    // open the path "form.php"
    // fill the nth section of the form with required data
    // return the following data as object
    /*  {
      id: "id of token input element",
      product: "product of num1 and num2",
      sum: "sum of num1 and num2",
      min: "min of num1 and num2",
      max: "max of num1 and num2",
      avg: "avg of num1 and num2",
      diff: "diff of num1 and num2",
      quotient: "quotient of num1 and num2",
      remainder: "remainder of num1 and num2",
      n1: "num1",
      n2: "num2",
      token,
      driver
    }
    */

    return {
      id,
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
      token,
      driver,
    };
  },

  fillAllDataAndSubmit: async (driver) => {
    // fill all data in the form and submit it
    return {
      driver,
    };
  },
};

module.exports = {
  bulkDataFormServices,
};
