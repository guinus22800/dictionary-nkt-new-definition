var processData = (function () {
  
  var createJsonElement = function() {
    var title = $('.' + config.titleElement).val();
    var nbDef = $('.' + config.numberDefinitions).val();
    var nbLinks = $('.' + config.numberLinks).val();


    var obj = new Object();
    obj.title = title;
    obj.definitions = [];

    if (config.numberOfLinks > 0){
      obj.links = [];
    }

    for(var i =0; i<config.numberOfDefinitions; i++) {
      var def =  $('.' + config.definition + (i+1)).val();
      for(var j =0; j<config.numberOfLinks; j++) {
        titleLink = $('.' + config.nameLink + (j+1)).val()
        console.log(def)
        if (def.indexOf('{') > -1) {
        def = def.replace('{'+ (j+1) +'}', '{{' + titleLink + '}}')
        }
      }
      obj.definitions[i] = def;
    }

    for(var j =0; j<config.numberOfLinks; j++) {

      var link = new Object();
      link.title = $('.' + config.nameLink + (j+1)).val();
      link.link = $('.' + config.link + (j+1)).val();
  
      obj.links[j] = link;
    }

    var jsonString= JSON.stringify(obj,null,2);
    $('.' + config.jsonElement).text(jsonString);
  }

  var copyJsonElement = function() {
    
    /* Get the text field */
    var copyText = document.getElementById("json");

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("Copy");

    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);    
  }

  var addNewDefinition = function() {
    
    config.numberOfDefinitions += 1;
    var numberDefinitions = config.numberOfDefinitions;

    var template = '<li>'
    template += '<div><textarea class="o-textarea o-textarea__input  js-definition-' + numberDefinitions + '" type="text" placeholder="Definition ' + numberDefinitions + '"></textarea></div>'
    template += '</li>'    

    $('.js-list-definition').append(template)
  }

  var suppLastDefinition = function() {
    
    config.numberOfDefinitions -= 1;

    $('.js-list-definition li:last-child').remove();
  }

  var addNewLink = function() {
    
    config.numberOfLinks += 1;
    var numberOfLinks = config.numberOfLinks;  

    var template = '<li><span><input class= "o-text-input o-text-input__other  js-name-link-'+ numberOfLinks +'" placeholder="Name link '+ numberOfLinks +'" type="text"></span><span><input class= "o-text-input o-text-input__other  js-link-'+ numberOfLinks +'" placeholder="Link '+ numberOfLinks +'" type="text"></span></li>'
    
    $('.js-list-links').append(template)
  }

  var suppLastLink = function() {
    
    config.numberOfLinks -= 1;

    $('.js-list-links li:last-child').remove();
  }



  /**
   * Return the functions we wish to make public (see public functions above)
   */
  return {
    createJsonElement: createJsonElement,
    copyJsonElement:  copyJsonElement,
    addNewDefinition:  addNewDefinition,
    addNewLink:       addNewLink,
    suppLastDefinition:   suppLastDefinition,
    suppLastLink:       suppLastLink,
  }

})();