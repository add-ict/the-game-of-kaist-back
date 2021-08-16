const XLSX = require('xlsx');
const workbook = XLSX.readFile('./src/functions/assets/비시즌 (0815).xlsx')
let ws1 = workbook.Sheets['비시즌-비조건'];
const mapData={};
for (let i=3;i<=33;i++) {
    const data = {};
    data.position = ws1['A' + i].v;
    data.name = ws1['B' + i]?.v;
    data.cause = ws1['C' + i]?.v;
    data.conditional = false;
    data.conds = undefined;
    data.desc = ws1['D' + i]?.v;
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
        data.affection.G ||= data.value[j].G;
        data.affection.R ||= data.value[j].R;
        data.affection.H ||= data.value[j].H;
        data.affection.B ||= data.value[j].B;
    }
    mapData[data.position]=data
}
ws1 = workbook.Sheets['비시즌-조건'];
for (let i=3;i<=20;i+=2) {
    const data = {};
    data.position = ws1['A' + i].v;
    data.name = undefined;
    data.cause = ws1['B' + i]?.v;
    data.conditional = true;
    data.desc = [ws1['D' + i]?.v,ws1['D' + (i+1)]?.v];
    data.value = [[
        {
            G: ws1['F' + i] ? ws1['F' + i].v : 0,
            R: ws1['G' + i] ? ws1['G' + i].v : 0,
            H: ws1['H' + i] ? ws1['H' + i].v : 0,
            B: ws1['I' + i] ? ws1['I' + i].v : 0
        },
        {
            G: ws1['J' + i] ? ws1['J' + i].v : 0,
            R: ws1['K' + i] ? ws1['K' + i].v : 0,
            H: ws1['L' + i] ? ws1['L' + i].v : 0,
            B: ws1['M' + i] ? ws1['M' + i].v : 0
        },
        {
            G: ws1['N' + i] ? ws1['N' + i].v : 0,
            R: ws1['O' + i] ? ws1['O' + i].v : 0,
            H: ws1['P' + i] ? ws1['P' + i].v : 0,
            B: ws1['Q' + i] ? ws1['Q' + i].v : 0
        },
    ], [
            {
                G: ws1['F' + (i+1)] ? ws1['F' + (i+1)].v : 0,
                R: ws1['G' + (i+1)] ? ws1['G' + (i+1)].v : 0,
                H: ws1['H' + (i+1)] ? ws1['H' + (i+1)].v : 0,
                B: ws1['I' + (i+1)] ? ws1['I' + (i+1)].v : 0
            },
            {
                G: ws1['J' + (i+1)] ? ws1['J' + (i+1)].v : 0,
                R: ws1['K' + (i+1)] ? ws1['K' + (i+1)].v : 0,
                H: ws1['L' + (i+1)] ? ws1['L' + (i+1)].v : 0,
                B: ws1['M' + (i+1)] ? ws1['M' + (i+1)].v : 0
            },
            {
                G: ws1['N' + (i+1)] ? ws1['N' + (i+1)].v : 0,
                R: ws1['O' + (i+1)] ? ws1['O' + (i+1)].v : 0,
                H: ws1['P' + (i+1)] ? ws1['P' + (i+1)].v : 0,
                B: ws1['Q' + (i+1)] ? ws1['Q' + (i+1)].v : 0
            },
        ]]
    data.conds=[ws1['C' + i].v,ws1['C' + (i+1)].v]
    data.affection = {G: false, R: false, H: false, B: false};
    for (let j = 0; j < 3; j++) {
        data.affection.G ||= data.value[0][j].G || data.value[1][j].G;
        data.affection.R ||= data.value[0][j].R || data.value[1][j].R;
        data.affection.H ||= data.value[0][j].H || data.value[1][j].H;
        data.affection.B ||= data.value[0][j].B || data.value[1][j].B;
    }
    mapData[data.position]=data
}
const fs = require('fs');
let buf="const mapData = {\n";
for (let i=0;i<40;i++) {
    buf+=""+i+":"+JSON.stringify(mapData[i])+",\n"
}
fs.writeFileSync('./src/functions/assets/mapData.js',buf+"};\nexport default mapData;")