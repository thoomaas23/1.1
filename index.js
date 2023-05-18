
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument();
const nume_primire = 'Baciu Ciprian Ionut';
const nume_predator = 'Teodora Selea';
const numar_gestiune = '1012';
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate ; 
if (month >= 10 ){currentDate = `${day}.${month}.${year}`;}
else {currentDate = `${day}.0${month}.${year}`;}
const data_incheiat_gestionare  = `Încheiat astazi ${currentDate}.`;
const nota_1 = 'Primitorul are obligația să asigure paza și depozitarea în bune condiții a bunurilor primite în subgestiune;';
const nota_2 = 'Primitorul are obligația să anunțe gestionarul în cazul constatării apariției defecțiunilor, sau în cazul pierderii sau furtului, în maxim 24 de ore de la constatarea incidentului;';
const nota_3 = 'Primitorul are obligația de a pune la dispoziția proprietarului/gestinarului bunurile aflate în subgestiune la orice solicitare a acestuia învederea verificării stării tehnice sau a inventarierii.';
// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));



doc.image('a.png', {
  fit: [150, 200],
  align: 'left',
  valign: 'left'
});
doc.moveDown(0.5);
doc.font('Times-Bold')
    .text('Proces verbal de predare-primire în subgestiune ' , {  width: 410,align: 'center'});
doc.moveDown(0.5);
doc.font('Times-Italic')
    .text('avand ca obiect folosinta mijloacelor fixe/obiectelor de inventar' , {  width: 410,align: 'center'});
doc.moveDown(2);
doc.font('Times-Roman')
    .text(`This text is left aligned. ${data_incheiat_gestionare}`);

doc.end();