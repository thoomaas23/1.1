const fs = require('fs');
const { text } = require('pdfkit');
const PDFDocument = require("pdfkit-table");
// Create a document
const doc = new PDFDocument();
const nume_predator = 'Baciu Ciprian Ionut';
const nume_primire = 'Teodora Selea';
const numar_gestiune = '1012';
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate;
if (month >= 10) { currentDate = `${day}.${month}.${year}`; }
else { currentDate = `${day}.0${month}.${year}`; }
const data_incheiat_gestionare = `Incheiat astazi ${currentDate}.`;
const nota_1 = 'Primitorul are obligatia sa asigure paza si depozitarea in bune conditii a bunurilor primite in subgestiune;';
const nota_2 = 'Primitorul are obligatia sa anunte gestionarul in cazul constatarii aparitiei defectiunilor, sau in cazul pierderii sau furtului, in maxim 24 de ore de la constatarea incidentului;';
const nota_3 = 'Primitorul are obligatia de a pune la dispozitia proprietarului/gestinarului bunurile aflate in subgestiune la orice solicitare a acestuia invederea verificarii starii tehnice sau a inventarierii.';


// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

const tableArray = {

    headers: ["Semnatura1","Semnatura2"],
    rows: [
        ["Predator", "Primitor"],
        [`${nume_predator}`, `${nume_primire}`,],
        ["   ", "   ",],
    ],

};

doc.image('a.png', {
    fit: [150, 200],
    align: 'left',
    valign: 'left'
});
doc.moveDown(0.5);
doc.font('Times-Bold')
    .text('Proces verbal de predare-primire in subgestiune ', { width: 410, align: 'center' });
doc.moveDown(0.5);
doc.font('Times-Italic')
    .text('avand ca obiect folosinta mijloacelor fixe/obiectelor de inventar', { width: 410, align: 'center' });
doc.moveDown(2);
doc.fontSize(12);
doc.font('Times-Roman')
    .text(`Astfel, predatorul ${nume_predator} , gestionar al Gestiunii ${numar_gestiune} da iar primitorului ${nume_primire} primeste , cu dreptul de folosinta , bunurile evidentiate , dupa cum urmeaza :`);
//Adaugare tabel de gestiune ; 
doc.moveDown(14);
doc.font('Times-Roman')
    .text(`Prezentul proces verbal s-a incheiat in doua exemplare, originale, cate unul pentru fiecare parte.`);
doc.moveDown(0.5);
doc.font('Times-Roman')
    .text(`${data_incheiat_gestionare}`);
doc.moveDown(1);
doc.font('Times-Roman')
    .table(tableArray, {
        hideHeader: true,
        columnSpacing: 10,
        padding: 70,
        columnsSize: [250, 270],
        // {Function}
        
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {

            const { x, y, width, height } = rectCell;
            

            if (indexColumn === 0) {
                doc
                    .lineWidth(.5)
                    .moveTo(x, y)
                    .lineTo(x, y + height)
                    .stroke();
            }

            doc
                .lineWidth(.5)
                .moveTo(x + width, y)
                .lineTo(x + width, y + height)
                .stroke();
            doc
                .lineWidth(.5)
                .moveTo(x, y)
                .lineTo(x + width, y)
                .stroke();


            doc.fontSize(10).fillColor('#292929');

        }, // {Function}
        
    });
doc.font('Times-Italic')
    .text('Nota : ');
doc.font('Times-Italic')
    .text(`-     ${nota_1}`);
doc.font('Times-Italic')
    .text(`-     ${nota_2}`);
doc.font('Times-Italic')
    .text(`-     ${nota_3}`);
doc.end();
