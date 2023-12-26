// Declare variables for getting the xml file for the XSL transformation (folio_xml) and to load the image in IIIF on the page in question (number).
let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let extension = ".xml";
let folio_xml = "../xml/" + tei_xml.concat(extension);
let page = document.getElementById("page");
let pageN = page.innerHTML;
let number = Number(pageN);

// Loading the IIIF manifest
var mirador = Mirador.viewer({
  "id": "my-mirador",
  "manifests": {
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
      provider: "Bodleian Library, University of Oxford"
    }
  },
  "window": {
    allowClose: false,
    allowWindowSideBar: true,
    allowTopMenuButton: false,
    allowMaximize: false,
    hideWindowTitle: true,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      annotations: false,
      search: false,
      layers: false,
    }
  },
  "workspaceControlPanel": {
    enabled: false,
  },
  "windows": [
    {
      loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
      canvasIndex: number,
      thumbnailNavigationPosition: 'off'
    }
  ]
});


// function to transform the text encoded in TEI with the xsl stylesheet "Frankenstein_text.xsl", this will apply the templates and output the text in the html <div id="text">
function documentLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("../xsl/Frankenstein_text.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }
  
// function to transform the metadate encoded in teiHeader with the xsl stylesheet "Frankenstein_meta.xsl", this will apply the templates and output the text in the html <div id="stats">
  function statsLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("../xsl/Frankenstein_meta.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("stats");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }

  // Initial document load
  documentLoader();
  statsLoader();
  // Event listener for sel1 change
  
    function selectHand(event) {
    var visibleMary = document.getElementsByClassName('#MWS');
    var visiblePercy = document.getElementsByClassName('#PBS');

    // Convert the HTMLCollection to an array for forEach compatibility
    var maryArray = Array.from(visibleMary);
    var percyArray = Array.from(visiblePercy);

    // Function to reset styles for all elements
    function resetStyles() {
        maryArray.forEach(el => el.style.backgroundColor = '');
        percyArray.forEach(el => el.style.backgroundColor = '');
    }

    resetStyles(); 

    if (event.target.value == 'both') {
        
    } else if (event.target.value == 'Mary') {
        maryArray.forEach(el => el.style.backgroundColor = 'lightblue'); 
        percyArray.forEach(el => el.style.backgroundColor = '#f8f5f0');
    } else if (event.target.value == 'Percy') {
        percyArray.forEach(el => el.style.backgroundColor = 'lightblue'); 
    }
}

// Attach the event listener to the dropdown
document.getElementById('sel-hand').addEventListener('change', selectHand);





// write another function that will toggle the display of the deletions by clicking on a button

function toggleDeletions() {
  
  var deletions = document.querySelectorAll('del, .deletedText, .overwrittenText');

  deletions.forEach(function(deletion) {
    if (deletion.style.display === 'none') {
      deletion.style.display = 'inline';
    } else {
      deletion.style.display = 'none';
    }
  });
}

// Add event listener to the button for toggling deletions
document.getElementById('toggleDeletionsButton').addEventListener('click', toggleDeletions);


 // EXTRA: write a function that will display the text as a reading text by clicking on a button or another dropdown list, meaning that all the deletions are removed and that the additions are shown inline (not in superscript)
 
var isReadersViewActive = false; 

var isReadersViewActive = false;

function toggleReadersView() {
    var deletions = document.querySelectorAll('del');
    var additions = document.querySelectorAll('add, .supraAdd');
    console.log('Toggle Reader\'s View:', isReadersViewActive);

    if (!isReadersViewActive) {
        
        deletions.forEach(function(del) {
            del.style.display = 'none';
        });
        additions.forEach(function(add) {
            add.style.display = 'inline';
            add.style.verticalAlign = 'baseline';
            add.style.position = 'static'; 
        });
        isReadersViewActive = true;
    } else {
        
        deletions.forEach(function(del) {
            del.style.display = ''; 
        });
        additions.forEach(function(add) {
            add.style.display = ''; 
            add.style.verticalAlign = ''; 
            add.style.position = ''; 
            
        });
        isReadersViewActive = false;
    }
}