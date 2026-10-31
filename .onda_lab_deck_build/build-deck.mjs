import fs from 'node:fs/promises';
import path from 'node:path';
import { PresentationFile, FileBlob } from 'file:///C:/Users/JORS%20SOLARTE/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const template='C:/Users/JORS SOLARTE/OneDrive/semestre-2-206/proyecto_ondas/Plantilla PPT Universidad del Cauca.pptx';
const build='C:/Users/JORS SOLARTE/OneDrive/semestre-2-206/Ondas/.onda_lab_deck_build';
await fs.mkdir(build,{recursive:true});
const presentation=await PresentationFile.importPptx(await FileBlob.load(template));
const inspected=await presentation.inspect({select:'$.slides[*]',include:['id','index','layout','title','elements.id','elements.kind','elements.name','elements.text','elements.position','elements.style','notes.text']});
const slides=inspected.records;
const byIndex=i=>presentation.resolve(slides.find(s=>s.index===i).id);
const replaceNamed=(index,needle,value)=>{
 const record=slides.find(s=>s.index===index);
 const element=(record.elements??[]).find(e=>e.text?.includes(needle));
 if(!element) throw new Error(`Missing template placeholder ${needle} on slide ${index+1}`);
 presentation.resolve(element.id).text=value;
};
replaceNamed(1,'[Título]','ONDA LAB\nLaboratorio de ondas');
const content=[
 ['Título Título','Problema y objetivo',[
  'Una cuerda transmite energía; su rapidez depende de la tensión y la masa por longitud.',
  'ONDA LAB permite variar T, μ, f, A y L y observar el efecto en tiempo real.',
  'Objetivo: relacionar parámetros, movimiento transversal y resultados calculados.',
  'Alcance: simulación local, calculadora física y gráficas; sin backend.'
 ].join('\n')],
 ['Título Título','Modelo físico de la cuerda',[
  'Rapidez: v = √(T/μ)     Longitud de onda: λ = v/f',
  'Frecuencia angular: ω = 2πf     Número de onda: k = 2π/λ',
  'Progresiva: y(x,t) = A sin(kx − ωt)',
  'Cuerda fija: λₙ = 2L/n     fₙ = nv/(2L)',
  'Supuesto: cuerda uniforme, tensión constante y pequeñas deformaciones.'
 ].join('\n')],
 ['Título Título','Onda progresiva',[
  'y(x,t) = A sin(kx − ωt)',
  'La fase kx − ωt avanza hacia la derecha.',
  'Las partículas oscilan verticalmente; no viajan junto con la onda.',
  'Canvas dibuja cuerda, partículas, equilibrio y sentido de propagación.',
  'La rapidez se calcula con T y μ; A cambia el desplazamiento.'
 ].join('\n')],
 ['Título Título','Onda estacionaria',[
  'Los dos extremos fijos son nodos.',
  'El armónico n tiene n vientres y n−1 nodos interiores.',
  'λₙ = 2L/n     fₙ = nv/(2L)',
  'y(x,t) = 2A sin(kₙx) cos(ωₙt)',
  'A es la amplitud de cada onda viajera; el antinodo alcanza 2A.'
 ].join('\n')],
 ['Título Título','Laboratorio de parámetros',[
  'Entradas: tensión T (N), densidad μ (kg/m), frecuencia f (Hz), amplitud A (m) y longitud L (m).',
  'Resultados en vivo: v, λ, ω, k y período P.',
  'Deslizadores y campos numéricos están sincronizados y limitados a rangos físicos.',
  'En el modelo ideal, cambiar A no altera v.',
  'Caso de referencia: T=50 N, μ=0.008 kg/m, f=5 Hz, L=2 m.'
 ].join('\n')],
 ['Título Título','Implementación y análisis',[
  'Angular standalone organiza las vistas; servicios separan física, estado, animación y gráficas.',
  'Canvas + requestAnimationFrame anima el perfil y las partículas.',
  'Chart.js presenta y(x), y(t), v(T), v(μ) y f(n).',
  'Cuatro pruebas unitarias validan fórmulas, armónicos y extremos fijos.'
 ].join('\n')]
];
for(let i=0;i<content.length;i++){
 const record=slides.find(s=>s.index===i+2);
 const title=record.elements.find(e=>e.text?.startsWith('Título Título'));
 const body=record.elements.find(e=>e.text?.includes('Descripción en fuente'));
 if(!title||!body) throw new Error(`Missing content placeholders on slide ${i+3}`);
 presentation.resolve(title.id).text=content[i][1];
 presentation.resolve(body.id).text=content[i][2];
}
const r9=slides.find(s=>s.index===8);
const body9=r9.elements.find(e=>e.text?.includes('Descripción en fuente'));
const visual9=r9.elements.find(e=>e.text?.includes('FOTOGRAFÍA'));
if(!body9||!visual9) throw new Error('Missing result slide placeholders');
const resultBody=presentation.resolve(body9.id);
resultBody.text='Progresiva · T=50 N, μ=0.008 kg/m, f=5 Hz, A=0.12 m, L=2 m\nv = 79.0569 m/s\nλ = 15.8114 m\nω = 31.4159 rad/s\nk = 0.3974 rad/m · P = 0.2000 s\nEstacionaria n=1: λ₁=4 m · f₁=19.7642 Hz';
resultBody.text.style={fontSize:37.33,typeface:'Libre Franklin',color:'#143393',alignment:'left',wrap:'square',autoFit:'shrinkText'};
presentation.resolve(visual9.id).text='';
const L=2,A=.12,k=Math.PI/L,categories=[],values=[];
for(let i=0;i<=10;i++){const x=L*i/10;categories.push(x.toFixed(1));values.push(2*A*Math.sin(k*x));}
byIndex(8).charts.add('line',{
 position:{left:28,top:90,width:594,height:535},
 title:'Primer armónico · amplitud máxima',
 titlePlacement:'aboveChart',
 titleTextStyle:{fontSize:23,bold:true,fill:'#143393'},
 categories,
 series:[{name:'y(x)',values,line:{style:'solid',fill:'#143393',width:3},marker:{symbol:'circle',size:5,fill:'#143393'}}],
 lineOptions:{smooth:true},hasLegend:false,
 chartFill:'#ffffff',chartLine:{style:'solid',fill:'#ffffff',width:1},plotAreaFill:'#ffffff',plotAreaLine:{style:'solid',fill:'#ffffff',width:1},
 xAxis:{title:'Posición x (m)',textStyle:{fill:'#143393',fontSize:16},majorGridlines:{style:'solid',fill:'#d7deec',width:1}},
 yAxis:{title:'Desplazamiento y (m)',min:-.26,max:.26,majorUnit:.13,textStyle:{fill:'#143393',fontSize:16},majorGridlines:{style:'solid',fill:'#d7deec',width:1}}
});
for(const i of [0,9]) presentation.slides.items[i].shapes.add({geometry:'rect',name:'template-background-anchor',position:{left:1278,top:718,width:1,height:1},fill:'none',line:{style:'solid',fill:'none',width:0}});
const draft=path.join(build,'ONDA_LAB_draft.pptx');
await (await PresentationFile.exportPptx(presentation)).save(draft);
for(let i=0;i<presentation.slides.items.length;i++){
 const blob=await presentation.export({slide:presentation.slides.items[i],format:'png',scale:1});
 await fs.writeFile(path.join(build,`draft-slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
}
const montage=await presentation.export({format:'webp',montage:true,scale:.5});
await fs.writeFile(path.join(build,'draft-montage.webp'),new Uint8Array(await montage.arrayBuffer()));
const check=await presentation.inspect({select:'$.slides[*]',include:['id','index','title','elements.text']});
await fs.writeFile(path.join(build,'draft-inspect.ndjson'),check.ndjson??JSON.stringify(check,null,2));
console.log(JSON.stringify({draft,slideCount:presentation.slides.items.length,inspect:check.ndjson},null,2));
