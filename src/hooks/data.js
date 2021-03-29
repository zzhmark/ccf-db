import create from "zustand";
import produce from "immer";
let dt = [
  [
    0.10087457300000001,
    0.103660306,
    0.036412768,
    0.050707568,
    0,
    0,
    0,
    0.121127531,
    0.151606599,
    0,
    0,
    0,
    0,
    0,
    0.091303136,
    0.059232028,
    0,
    0,
    0,
    0,
    0.097811635,
    0.156762793,
    0.256867941,
    0.10546339,
  ],
  [
    0.079821433,
    0.056521543,
    0.089761163,
    0.090443428,
    0,
    0,
    0,
    0.20440592300000002,
    0.20225067800000002,
    0,
    0,
    0,
    0,
    0,
    0.055143331,
    0,
    0,
    0,
    0,
    0,
    0.058145277999999995,
    0.121314824,
    0.30595071100000004,
    0.134620085,
  ],
  [
    0.046044445999999996,
    0,
    0.11493680699999999,
    0.117127712,
    0,
    0,
    0,
    0.20758760199999998,
    0.28385989300000003,
    0,
    0,
    0,
    0,
    0.127848937,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0.085481092,
    0.196511543,
    0.130723099,
  ],
  [
    0.023875563,
    0,
    0.067591994,
    0,
    0,
    0,
    0.08489914300000001,
    0.031710475,
    0.12722463,
    0,
    0.06040495,
    0.065796183,
    0,
    0.19571071199999998,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0.102725779,
  ],
  [
    0.065801049,
    0,
    0.086209284,
    0.07172312900000001,
    0,
    0,
    0.156615496,
    0.12333684199999999,
    0.25490068899999996,
    0,
    0.037316589,
    0.029361875,
    0,
    0.270831985,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0.128673315,
  ],
  [
    0.03112168,
    0,
    0.079049845,
    0.035622658,
    0,
    0,
    0.161409723,
    0.06670174200000001,
    0.162534932,
    0,
    0.029662202999999998,
    0.058073787,
    0,
    0.266977512,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0.103117763,
  ],
];

// fs.readFile("public/database/data.csv", "utf8", (err, data) => {
//   dt = parse(data, {
//     skip_empty_lines: true,
//     bom: true,
//     cast: true,
//   });
// });

let colid = [
  "629",
  "685",
  "718",
  "733",
  "741",
  "170",
  "218",
  "1020",
  "560581551",
  "1096",
  "1104",
  "255",
  "1113",
  "155",
  "362",
  "366",
  "149",
  "15",
  "181",
  "599",
  "907",
  "575",
  "930",
  "262",
];

// fs.readFile("public/database/colid.txt", "utf8", (err, data) => {
//   colid = parse(data, {
//     skip_empty_lines: true,
//     bom: true,
//   }).map((prop, key) => {
//     return prop[0];
//   });
// });

let rowid = ["993", "985", "322", "879", "22", "669"];

// fs.readFile("public/database/rowid.txt", "utf8", (err, data) => {
//   rowid = parse(data, {
//     skip_empty_lines: true,
//     bom: true,
//   }).map((prop, key) => {
//     return prop[0];
//   });
// });

let colname = [
  "VAL",
  "VM",
  "VPL",
  "VPM",
  "VPMpc",
  "LGd",
  "LP",
  "PO",
  "Eth",
  "AMd",
  "AMv",
  "AV",
  "IAD",
  "LD",
  "MD",
  "SMT",
  "PVT",
  "PT",
  "RE",
  "CM",
  "PCN",
  "CL",
  "PF",
  "RT",
];

// fs.readFile("public/database/colnames.txt", "utf8", (err, data) => {
//   colname = parse(data, {
//     skip_empty_lines: true,
//     bom: true,
//   }).map((prop, key) => {
//     return prop[0];
//   });
// });

let rowname = ["MOs", "MOp", "SSp", "RSPd", "PTLp", "VIS"];

// fs.readFile("public/database/rownames.txt", "utf8", (err, data) => {
//   rowname = parse(data, {
//     skip_empty_lines: true,
//     bom: true,
//   }).map((prop, key) => {
//     return prop[0];
//   });
// });

let colcoord = [
  [259.48323584508927, 176.1749244943992, 275.581942743417],
  [272.97295063997706, 199.69333378303176, 264.82620564149227],
  [273.09276255992586, 170.56042487212846, 306.6744916161256],
  [282.5360243962684, 165.89610685717543, 298.95549857549855],
  [294.49832312627586, 185.80395158938467, 253.71266375545852],
  [302.52109202613246, 128.9003158395708, 320.09765184992636],
  [298.9347202574851, 124.1279508909452, 289.46849791196536],
  [287.31447466932866, 154.0039805340654, 283.0049167644196],
  [303.2649041639128, 145.00099140779906, 279.37000922387665],
  [243.6163325245818, 177.10483973949687, 252.70281995661605],
  [243.31241178131177, 183.46240707631506, 260.7243456976087],
  [241.3726617083615, 154.55615656224177, 269.7796877345744],
  [246.38865051903113, 168.557785467128, 248.7569809234172],
  [264.2294015411354, 128.6413245766492, 284.7799593771158],
  [270.2631465566113, 156.544468128529, 246.03944326064288],
  [267.94197744131696, 196.85336856010568, 244.17541366358745],
  [256.2542033063665, 156.46222300386916, 232.32236977912336],
  [233.67462260301917, 179.29634162926698, 240.52607215793057],
  [252.16273419958037, 204.75698457687636, 235.81854662191742],
  [266.5667813575227, 178.26793869252424, 233.91833476605674],
  [273.41597850308034, 174.43020055053086, 255.24725130890053],
  [275.34037680407914, 143.85398841932417, 262.39598714496657],
  [300.44477421413757, 156.97127812350408, 256.81328488557403],
  [257.53064000690966, 171.21464199343583, 302.56670984455957],
];

// fs.readFile("public/database/colcoord.csv", "utf8", (err, data) => {
//   colcoord = parse(data, {
//     cast: true,
//     skip_empty_lines: true,
//     bom: true,
//   });
// });

let rowcoord = [
  [144.1589895049113, 84.14686923944589, 280.85106941283675],
  [171.8440637051024, 94.15351129510404, 314.17682713667153],
  [233.5219218473135, 96.28349099500295, 359.3202878237431],
  [297.0842299247068, 159.50694219369672, 304.8415449149646],
  [297.0842299247068, 159.50694219369672, 304.8415449149646],
  [297.0842299247068, 159.50694219369672, 304.8415449149646],
];

// fs.readFile("public/database/rowcoord.csv", "utf8", (err, data) => {
//   rowcoord = parse(data, {
//     cast: true,
//     skip_empty_lines: true,
//     bom: true,
//   });
// });

function matrix2list(dt) {
  let output = []
  for (let i in dt){
    for (let j in dt[i]){
      output.push([Number(j), Number(i), dt[i][j]])
    }
  }
  return output
}

const dt2 = matrix2list(dt);

const useData = create((set) => ({
  data: new Map([
    [
      "0",
      {
        id: "0",
        name: "test",
        visible: true,
        type: "relation matrix",
        mode: "ball",
        chart: {
          tooltip: {
            position: "top",
          },
          grid: {
            height: "50%",
            top: "10%",
          },
          xAxis: {
            type: "category",
            data: colname,
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: "category",
            data: rowname,
            splitArea: {
              show: true,
            },
          },
          visualMap: {
            min: dt2.map((v,i) => (v[2])).reduce((a,b) => (Math.min(a,b))),
            max: dt2.map((v,i) => (v[2])).reduce((a,b) => (Math.max(a,b))),
            calculable: true,
            orient: "horizontal",
            left: "center",
            bottom: "15%",
            inRange: {color: ['blue', 'white', 'red',]},
            
          },
          series: [
            {
              name: "Demo",
              type: "heatmap",
              data: dt2,
              label: {
                show: false,
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
          
        },
        viewer: {
          visible: dt.map((v, i) => v.map((v, i) => false)),
          matrix: dt,
          rowid: rowid,
          colid: colid,
          rowcoord: rowcoord,
          colcoord: colcoord,
          // transparent: dt.map((v, i) => v.map((v, i) => true)),
        },
      },
    ],
  ]),
  update: (id, fields, value) =>
    set(
      produce((state) => {
        fields
          .slice(0, -1)
          .reduce((pointer, field) => pointer[field], state.data.get(id))[
          fields.slice(-1)
        ] = value;
        return state;
      })
    ),
  del: (id) =>
    set(
      produce((state) => {
        state.data.delete(id);
        return state;
      })
    ),
  set: (id, element) =>
    set(
      produce((state) => {
        state.data.set(id, element);
        return state;
      })
    ),
}));

export default useData;
