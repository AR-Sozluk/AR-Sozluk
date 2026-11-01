'use strict';
const $ = id => document.getElementById(id);
let words = [];
let running = false;
let currentWord = null;
let busy = false;
let reloadRequired = false;
const setStatus = message => { $('scan-status').textContent = message; };
const safeMessage = message => { $('startup').textContent = message; };
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));

async function setup() {
  try {
    const response = await fetch('data/words.json');
    if (!response.ok) throw new Error('Kelimeler okunamıyor.');
    words = await response.json();
    if (!Array.isArray(words) || words.length !== 2 || words[0].id !== 'elma' || words[0].targetIndex !== 0 || words[1].id !== 'agac' || words[1].targetIndex !== 1) throw new Error('Kelime ve hedef sırası hatalı: Elma 0, Ağaç 1 olmalıdır.');
    const target = await fetch('assets/targets/sozluk.mind', {cache:'no-store'});
    if (!target.ok || (await target.arrayBuffer()).byteLength < 1024) {
      throw new Error('AR hedef dosyası eksik veya bozuk. assets/targets/sozluk.mind dosyasını tekrar yükleyin.');
    }
    await Promise.all(['elma','agac'].map(async id => {
      const res=await fetch(`assets/models/${id}.glb`);
      const data=await res.arrayBuffer();
      if(!res.ok || data.byteLength<12 || new DataView(data).getUint32(0,true)!==0x46546c67) throw new Error(id+' 3D modeli okunamıyor.');
    }));
    if (!window.AFRAME || !window.AFRAME.components['mindar-image']) throw new Error('AR kütüphanesi indirilemedi. İnternet bağlantısını kontrol edin.');
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('Kamera için HTTPS bağlantısı gerekir. Siteyi GitHub Pages üzerinde açın.');
    $('start').disabled=false; safeMessage('Hazır! İsterseniz kamerayı başlatabilirsiniz.');
  } catch(error) { safeMessage(error.message + ' (Dosyaları doğrudan açmak yerine web sitesinden kullanın.)'); }
}
function showWord(index){
  if(!running)return;
  const word=words.find(w=>w.targetIndex===index);if(!word)return;
  currentWord=word;$('word-panel').classList.remove('hidden');$('word-title').textContent=word.title;
  $('word-definition').textContent=word.definition;$('word-example').textContent=word.example;
  $('quiz').classList.add('hidden');$('feedback').textContent='';setStatus(word.title+' bulundu! 3D nesneye bak.');
}
function clearWord(index){
  if(currentWord && currentWord.targetIndex===index){setStatus('Görsel kayboldu. Kamerayı renkli resme tekrar doğrult.');}
}
function registerTargets(){
  [['target-elma',0],['target-agac',1]].forEach(([id,index])=>{
    $(id).addEventListener('targetFound',()=>showWord(index));
    $(id).addEventListener('targetLost',()=>clearWord(index));
  });
}
async function start(){
  if(busy||running)return;busy=true;$('start').disabled=true;
  try {
    $('intro').classList.add('hidden');$('ar-section').classList.remove('hidden');
    await delay(100);
    const scene=$('scene');
    if(!scene.hasLoaded){await new Promise((resolve,reject)=>{const t=setTimeout(()=>reject(new Error('3D sahne yüklenemedi.')),20000);scene.addEventListener('loaded',()=>{clearTimeout(t);resolve();},{once:true});});}
    const system=scene.systems['mindar-image-system'];
    if(!system)throw new Error('Görsel tanıma sistemi başlatılamadı.');
    setStatus('Kamera hazırlanıyor. İzin sorulursa izin verin…');
    await new Promise((resolve,reject)=>{
      const cleanup=()=>{clearTimeout(timer);scene.removeEventListener('arReady',ready);scene.removeEventListener('arError',failed);};
      const ready=()=>{cleanup();resolve();};
      const failed=()=>{cleanup();reject(new Error('Kamera izni verilmedi veya kamera başka uygulamada kullanılıyor.'));};
      const timer=setTimeout(()=>{reloadRequired=true;cleanup();reject(new Error('Kamera hazırlığı zaman aşımına uğradı. Sayfayı yenileyin.'));},90000);
      scene.addEventListener('arReady',ready);scene.addEventListener('arError',failed);
      try{
        system.start();
        const video=system.video;
        video.addEventListener('loadedmetadata',event=>{
          if(reloadRequired){event.stopImmediatePropagation();video.srcObject?.getTracks().forEach(track=>track.stop());video.srcObject=null;video.remove();}
        },{capture:true,once:true});
      }catch(error){cleanup();reject(error);}
    });
    running=true;setStatus('Kamerayı Elma veya Ağaç sayfasındaki renkli resme göster.');
  }catch(e){releaseCamera();$('ar-section').classList.add('hidden');$('intro').classList.remove('hidden');safeMessage('Kamera açılamadı: '+(e?.message||'Bilinmeyen hata')+' İzinleri ve HTTPS bağlantısını kontrol edin.');}
  finally{busy=false;$('start').disabled=reloadRequired;}
}
function releaseCamera(){
  const system=$('scene').systems?.['mindar-image-system'];
  if(!system)return;
  system.controller?.stopProcessVideo();
  system.controller?.dispose();
  system.controller?.worker?.terminate();
  system.video?.srcObject?.getTracks().forEach(track=>track.stop());
  if(system.video){system.video.pause();system.video.srcObject=null;system.video.remove();system.video=null;}
  system.ui?.hideLoading();system.ui?.hideScanning();system.ui?.hideCompatibility();
  running=false;
}
async function stop(){
  if(busy)return;busy=true;
  try {releaseCamera();}catch(e){console.warn('Kamera durdurma:',e);}finally{
    $('ar-section').classList.add('hidden');$('word-panel').classList.add('hidden');$('intro').classList.remove('hidden');safeMessage('Kamera durduruldu. Yeniden başlatabilirsiniz.');$('start').disabled=false;busy=false;currentWord=null;
  }
}
$('start').addEventListener('click',start);$('stop').addEventListener('click',stop);
$('quiz-open').addEventListener('click',()=>{
  if(!currentWord)return;
  $('quiz').classList.remove('hidden');$('quiz-question').textContent=currentWord.question;
  const choices=$('choices');choices.replaceChildren();$('feedback').textContent='';
  currentWord.choices.forEach((choice,i)=>{
    const button=document.createElement('button');button.textContent=choice;
    button.addEventListener('click',()=>{
      $('feedback').textContent=i===currentWord.correct?'Tebrikler! Doğru cevap.':'Tekrar deneyebilirsin.';
      if(i===currentWord.correct)choices.querySelectorAll('button').forEach(b=>b.disabled=true);
    });choices.append(button);
  });
});
window.addEventListener('load',()=>{registerTargets();setup();});
window.addEventListener('pagehide',releaseCamera);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running)stop();});
