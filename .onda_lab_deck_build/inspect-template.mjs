import fs from 'node:fs/promises';
import path from 'node:path';
import { PresentationFile, FileBlob } from 'file:///C:/Users/JORS%20SOLARTE/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs';
const input='C:/Users/JORS SOLARTE/OneDrive/semestre-2-206/proyecto_ondas/Plantilla PPT Universidad del Cauca.pptx';
const out='C:/Users/JORS SOLARTE/OneDrive/semestre-2-206/Ondas/.onda_lab_deck_build/template_review';
await fs.mkdir(out,{recursive:true});
const p=await PresentationFile.importPptx(await FileBlob.load(input));
const info=await p.inspect({select:'$.slides[*]',include:['id','index','layout','title','elements.id','elements.kind','elements.name','elements.text','elements.position','elements.style','elements.alt','notes.text']});
await fs.writeFile(path.join(out,'template-inspect.ndjson'),info.ndjson??JSON.stringify(info,null,2));
console.log('slideCount',p.slides.items.length);
console.log(info.ndjson??JSON.stringify(info,null,2));
for(let i=0;i<p.slides.items.length;i++){
 const blob=await p.export({slide:p.slides.items[i],format:'png',scale:1});
 await fs.writeFile(path.join(out,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
}
const montage=await p.export({format:'webp',montage:true,scale:.5});
await fs.writeFile(path.join(out,'montage.webp'),new Uint8Array(await montage.arrayBuffer()));
