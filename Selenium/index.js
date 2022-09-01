const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://bulk-data-form.herokuapp.com/";

const bulkDataFormServices = {
  open: async (driver) => {
    // open the base URL and return the title and driver object
    return { title, driver };
  },
  getValueOfNthRow: async (driver, n) => {
    // return the value of the nth row for table element id and text as data
    return {
      id,
      data,
    };
  },

  fillTheForm: async (driver, n) => {
    // open the driver to the path "/form.php"
    // fill the nth input field with the correct data and return the input field id, data and driver object
    return { id, data, driver };
  },

  fillAllDataAndSubmit: async (driver) => {
    // fill all the input fields with the correct data and submit the form and return the driver object
    return {
      driver,
    };
  },
};

module.exports = {
  bulkDataFormServices,
};
