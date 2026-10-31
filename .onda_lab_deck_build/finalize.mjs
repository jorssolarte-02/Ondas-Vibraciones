import path from 'node:path';
import { pathToFileURL } from 'node:url';
const SKILL_DIR='C:/Users/JORS SOLARTE/.codex/plugins/cache/openai-primary-runtime/presentations/26.1029.11837/skills/presentations';
const workspaceDir='C:/Users/JORS SOLARTE/OneDrive/semestre-2-206/Ondas';
const stagingDir=path.join(workspaceDir,'.codex-finalizer');
const FINAL_PPTX=path.join(workspaceDir,'ONDA_LAB_Sustentacion.pptx');
const template='C:/Users/JORS SOLARTE/OneDrive/semestre-2-206/proyecto_ondas/Plantilla PPT Universidad del Cauca.pptx';
const {finalizePresentation}=await import(pathToFileURL(path.join(SKILL_DIR,'container_tools/artifact_tool_utils.mjs')).href);
const result=await finalizePresentation({
 explicitTotalSlideCount:10,
 requiredNativeChartOwnerSlides:[9],
 requiredNativeTableOwnerSlides:[],
 requiredTemplateReferenceSlides:[1,2,3,4,5,6,7,8,9,10],
 minimumTemplateCoverageRatio:1.0,
 sourceTemplatePath:template,
 workspaceDir,
 candidatePath:path.join(stagingDir,'candidate.pptx'),
 finalPath:FINAL_PPTX,
 pythonExecutable:'C:/Users/JORS SOLARTE/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',
 integrityValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(SKILL_DIR,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
 fontPolicy:{basis:'reference',families:['Libre Franklin','Libre Franklin Medium','Arial'],referencePath:template,referenceSha256:'ea68d792bc0b708397872b80c043b9a1b03767afc25a66f5bf263272a251a277'},
 verifyArtifactToolImport:true,
 receiptPath:path.join(stagingDir,'ONDA_LAB_Sustentacion.validation.json')
});
console.log(JSON.stringify(result,null,2));
