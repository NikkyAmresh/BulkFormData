const { Key, By } = require("selenium-webdriver");

const baseUrl = "https://the-internet.herokuapp.com/";

const TheIntenetServices = {
  open: async (driver) => {
    // user needs to open the given URL in the driver and
    // then return the driver and title of the webpage as the object
    return { title, driver };
  },
  uploadFile: async (driver) => {
    // user needs to open the given URL in the driver and
    // click on the link "File Upload". wait until page is fully loaded and upload the file 'upload.jpg' and submit it
    // then return the driver

    return {
      driver,
    };
  },

  changeCheckboxes: async (driver) => {
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
