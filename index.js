
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));
const nume= 'Baciu Ciprian Ionut';


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
    .text(`This text is left aligned. ${nume}`);

doc.end();