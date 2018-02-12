var globalVariables = {}

$(document).ready(function () {

  processData.addNewLink();
  processData.addNewDefinition();
  
  $('.' + config.buttonGeneration ).click(function() {
    console.log('call generation json function');
    processData.createJsonElement();
  });

  $('.' + config.buttonCopyJson ).click(function() {
    console.log('Element copied');
    processData.copyJsonElement();
  });


  $('.js-button-def-add').click(function() {
    processData.addNewDefinition();
  });

  $('.js-button-def-del').click(function() {
    if (config.numberOfDefinitions > 1) {
      processData.suppLastDefinition();
    }
  });

  $('.js-button-link-add').click(function() {
    processData.addNewLink();
  });

  $('.js-button-link-del').click(function() {
    if (config.numberOfLinks > 0) {
      processData.suppLastLink();
    }
  });

  

})

