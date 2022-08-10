const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://the-internet.herokuapp.com/";

const TheIntenetServices = {
  open: async (driver) => {
    // user needs to open the given URL in the driver and
    // then return the driver and title of the webpage as the object
    return { title, driver };
  },
  basicAuth: async (driver) => {
    // user needs to open the given URL in the driver and
    // then enter the username and password as 'admin'
    // and then return driver object
    return {
      driver,
    };
  },

  clickOnSortableTableLink: async (driver) => {
    // open the homepage and click on the sortable table like
    // sort the first table by the 'Web Site' column and return table text and the driver object
    return {
      tableText,
      driver,
    };
  },
};

module.exports = {
  TheIntenetServices,
};
