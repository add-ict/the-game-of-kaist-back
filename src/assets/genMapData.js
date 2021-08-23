const XLSX = require('xlsx');
const workbook = XLSX.readFile('./src/assets/0823.xlsx')
//const workbook = XLSX.readFile('./0818.xlsx')
const ws2 = workbook.Sheets[workbook.SheetNames[0]]; //eng
const ws1 = workbook.Sheets[workbook.SheetNames[1]]; //kor
const mapData={};
for (let i=3;i<=42;i++) {
    const data = {};
    data.position = ws1['A' + i].v;
    data.name = [ws1['B' + i]?.v,ws2['B' + i]?.v];
    data.cause = [ws1['C' + i]?.v,ws2['C' + i]?.v,];
    data.desc = [ws1['D' + i]?.v,ws2['D' + i]?.v,];
    data.value = [
        {
            G: ws1['E' + i] ? ws1['E' + i].v : 0,
            R: ws1['F' + i] ? ws1['F' + i].v : 0,
            H: ws1['G' + i] ? ws1['G' + i].v : 0,
            B: ws1['H' + i] ? ws1['H' + i].v : 0
        },
        {
            G: ws1['I' + i] ? ws1['I' + i].v : 0,
            R: ws1['J' + i] ? ws1['J' + i].v : 0,
            H: ws1['K' + i] ? ws1['K' + i].v : 0,
            B: ws1['L' + i] ? ws1['L' + i].v : 0
        },
        {
            G: ws1['M' + i] ? ws1['M' + i].v : 0,
            R: ws1['N' + i] ? ws1['N' + i].v : 0,
            H: ws1['O' + i] ? ws1['O' + i].v : 0,
            B: ws1['P' + i] ? ws1['P' + i].v : 0
        },
    ];
    data.affection = {G: false, R: false, H: false, B: false};
    for (let j = 0; j < 3; j++) {
        if (data.value[j].G) data.affection.G = true;
        if (data.value[j].R) data.affection.R = true;
        if (data.value[j].H) data.affection.H = true;
        if (data.value[j].B) data.affection.B = true;
    }
    if (data.position===20) data.affection = {G: true, R: true, H: true, B: true};
    mapData[data.position]=data;
}
const fs = require('fs');
let buf="const mapData = {\n";
for (let i=0;i<40;i++) {
    buf+=""+i+":"+JSON.stringify(mapData[i])+",\n"
}
fs.writeFileSync('./src/assets/mapData.js',buf+"};\nexport default mapData;")
//fs.writeFileSync('./mapData.js',buf+"};\nexport default mapData;")