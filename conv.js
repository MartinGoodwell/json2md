var fs = require("fs");
console.log("\n *START* \n");
var content = fs.readFileSync("D:/github/2/ruxit.com/src/jekyllsource/pages/azure-monitoring.json");

var parsedJson = JSON.parse(content);
//console.log(parsedJson.frontmatter.title);
//console.log(parsedJson.entries.length);

var markupResult = '';

var handleEntry = function(elem, index, array) {
  if (!elem.layouttype) {
    console.log("section " + elem.id + ": no layouttype");
    return;
  }
  
  switch(elem.layouttype) {
    case '00-feature-herosection':
    case '20-headline-3columns-equal':
    case '21-headline-2columns-equal':
    case '80-signup':    
      handleSection(elem);
      break;
    
      
  }
  markupResult += '\n\n';

}

var handleSection = function(elem) {
  markupResult += '{% section %}\n';
  
  handleHeadline(elem);
  handleSubheadline(elem);
  handleImage(elem);
  handleColumns(elem);
  handleSignup(elem);
  
  markupResult += '{% endsection %}\n';
}

var handleHeadline = function(elem) {
  if (elem.headline) {
    markupResult += '# ' + elem.headline + '\n';
  }
}

var handleSubheadline = function(elem) {
  if (elem.subheadline) {
    markupResult += elem.subheadline;
  }
}

var handleImage = function(elem) {
  if (elem.image) {
    var imageElem = elem.image;
    markupResult += '![' + imageElem.attributes.alt+ '](' + imageElem.src + ')\n';
  }
}

var handleColumns = function(elem) {
  if (elem.columns) {
    elem.columns.forEach(handleColumn);
  }
}

var handleColumn = function(column, index, array) {
  markupResult += '{% column %}\n';
  if (column.type == 'text') {
    handleTextColumn(column);
  } else if (column.type == 'image') {
    handleImage(column);
  } else {
    console.log('unknown column type: ' + column.type);
  }
  markupResult += '{% endcolumn %}\n';
}

var handleTextColumn = function(column) {
  if (column.paragraphs) {
    column.paragraphs.forEach(handleTextColumnPara);
  }
}

var handleTextColumnPara = function(para, index, array) {
  if (para.type == 'image') {
    handleImage(para.entries[0]);
  } else if (para.type == 'lead'){
    markupResult += '### ' + para.entries[0] + '\n';
  } else {
    markupResult += para.entries[0] + '\n';
  }
}

var handleImageColumn = function(column) {
  
}

var handleSignup = function(elem) {
  if (elem.cta) {
    markupResult += '{% snippet cta.html %}\n';
  }
}

var handleSignup = function(elem) {
  if (elem.cta) {
    markupResult += '{% snippet cta.html %}\n';
  }
}

parsedJson.entries.forEach(handleEntry);
console.log(markupResult);

//console.log("Output Content : \n"+ JSON.stringify(content,null,2));
console.log("\n *EXIT* \n");

fs.writeFile("d:/output/azure.md", markupResult, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
 
//var parsedJSON = require('D:/github/dynatrace.com_en/_content/ruxit/technologies/docker.md');
//console.log(JSON.stringify(parsedJSON,null,2));