/* Vagrant Echoes II — procedural score (WebAudio). Three tracks: title, explore, boss + sound effects. */
const VEaudio=(()=>{
let A,mg,mus,sx,pf,nb,step=0,nt=0,cur='title',pend='title',muted=localStorage.getItem('ve_mute')==='1';const last={};
const mf=n=>440*2**((n-69)/12),m=[0,3,7],M=[0,4,7];
const T={
 title:{bpm:58,roots:[45,41,38,40],ch:[m,M,m,M],pv:.03,bass:'x...............',arp:'0...1...2...1...',lt:'sine',lv:.13,hold:6,
  mel:['12 . . . . . . . 15 . . . 14 . . .','12 . . . . . . . 16 . . . 14 . . .','14 . . . . . . . 17 . . . 15 . . .','19 . . . . . . . 16 . . . 12 . . .']},
 explore:{bpm:96,roots:[45,41,38,40],ch:[m,M,m,M],pv:.022,bass:'x..x..x.x..x..x.',arp:'0.12.1.20.12.1.2',kick:'x.......x.......',snare:'....x.......x...',hat:'..x...x...x...x.',lt:'square',lv:.05,hold:2,
  mel:['. . . . 12 . 15 . 14 . . . 12 . . .','. . . . 12 . 16 . 14 . . . 9 . . .','. . . . 14 . 15 . 17 . 15 . 14 . . .','19 . . . 16 . . . 12 . . . 11 . . .']},
 boss:{bpm:148,roots:[38,39,38,36],ch:[m,M,m,M],pv:.026,boss:1,bass:'x.xxx.xxx.xxx.xx',arp:'0.2.1.3.0.2.1.3.',kick:'x...x...x...x.x.',snare:'....x.......x..x',hat:'x.x.x.x.x.x.x.xx',lt:'sawtooth',lv:.06,hold:1.6,
  mel:['12 . 12 . 13 . 12 . 15 . 12 . 10 . 12 .','12 . 12 . 14 . 12 . 16 . 14 . 12 . 11 .','12 . 12 . 13 . 12 . 15 . 17 . 18 . 17 .','12 . 12 . 15 . 12 . 16 . 15 . 12 . 7 .']}};
function osc(d,t,f,dur,type,v,o={}){const q=A.createOscillator(),g=A.createGain(),a=o.a||.005;q.type=type;q.frequency.setValueAtTime(f,t);if(o.sl)q.frequency.exponentialRampToValueAtTime(Math.max(20,f*o.sl),t+dur);if(o.det)q.detune.value=o.det;
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+dur);q.connect(g);g.connect(d);q.start(t);q.stop(t+dur+.05)}
function nz(d,t,dur,v,type,f,f2){const s=A.createBufferSource(),fl=A.createBiquadFilter(),g=A.createGain();s.buffer=nb;fl.type=type;fl.frequency.setValueAtTime(f,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+dur);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(fl);fl.connect(g);g.connect(d);s.start(t,Math.random());s.stop(t+dur+.02)}
function ps(s,t){const k=T[cur],bar=s>>4&3,st=s&15,r=k.roots[bar],ch=k.ch[bar],sd=60/k.bpm/4;
 if(st===0)ch.forEach((n,i)=>osc(pf,t,mf(r+12+n),sd*16,'sawtooth',k.pv,{a:sd*6,det:i*6-6}));
 if(k.bass[st]==='x')osc(mus,t,mf(r),sd*(k.boss?.9:1.7),k.boss?'sawtooth':'triangle',k.boss?.1:.2,{a:.004});
 const a=k.arp[st];if(a!=='.')osc(mus,t,mf(r+24+[ch[0],ch[1],ch[2],12][+a]),sd*1.8,'square',.025,{a:.003});
 if(k.kick){if(k.kick[st]==='x')osc(mus,t,150,.18,'sine',.5,{sl:.2});if(k.snare[st]==='x')nz(mus,t,.14,.22,'bandpass',1900);if(k.hat[st]==='x')nz(mus,t,.04,.07,'highpass',7500)}
 const n=k.mel[bar].split(' ')[st];if(n!=='.')osc(mus,t,mf(r+ +n),sd*k.hold,k.lt,k.lv,{a:.01})}
function sched(){if(!A||A.state!=='running')return;if(nt<A.currentTime)nt=A.currentTime+.05;
 while(nt<A.currentTime+.3){if((step&15)===0&&pend!==cur){cur=pend;step=0}ps(step,nt);nt+=60/T[cur].bpm/4;step++}}
function init(){if(A){if(A.state==='suspended')A.resume();return}
 A=new(window.AudioContext||window.webkitAudioContext)();mg=A.createGain();mg.gain.value=muted?0:.8;const cp=A.createDynamicsCompressor();mg.connect(cp);cp.connect(A.destination);
 mus=A.createGain();mus.gain.value=.6;sx=A.createGain();sx.gain.value=.85;pf=A.createBiquadFilter();pf.type='lowpass';pf.frequency.value=900;pf.connect(mus);
 const dl=A.createDelay(1),fb=A.createGain(),lp=A.createBiquadFilter(),wet=A.createGain();dl.delayTime.value=.37;fb.gain.value=.4;lp.frequency.value=1700;wet.gain.value=.4;dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(mg);
 mus.connect(mg);mus.connect(dl);sx.connect(mg);sx.connect(dl);nb=A.createBuffer(1,A.sampleRate,A.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 cur=pend;nt=A.currentTime+.1;setInterval(sched,60)}
const F={slash:t=>{nz(sx,t,.16,.35,'bandpass',900,3200);osc(sx,t,320,.12,'triangle',.12,{sl:.4})},
 hit:t=>{nz(sx,t,.09,.4,'lowpass',1800,300);osc(sx,t,220,.1,'square',.14,{sl:.3})},
 crit:t=>{F.hit(t);osc(sx,t,1320,.25,'sine',.16,{sl:1.5});osc(sx,t+.04,1760,.2,'sine',.1)},
 kill:t=>[440,330,220].forEach((f,i)=>osc(sx,t+i*.05,f,.12,'square',.09)),
 dash:t=>nz(sx,t,.22,.3,'bandpass',500,4500),
 hurt:t=>{osc(sx,t,200,.28,'sawtooth',.2,{sl:.3});nz(sx,t,.15,.3,'lowpass',900,200)},
 shoot:t=>osc(sx,t,700,.22,'square',.09,{sl:.3}),
 level:t=>[0,4,7,12,16].forEach((n,i)=>osc(sx,t+i*.08,mf(69+n),.3,'triangle',.18)),
 win:t=>[0,7,12].forEach((n,i)=>osc(sx,t+i*.1,mf(57+n),.8,'triangle',.2)),
 story:t=>[0,3,7,12].forEach((n,i)=>osc(sx,t+i*.12,mf(57+n),1.4,'sine',.18)),
 forge:t=>[0,.14].forEach(d=>{nz(sx,t+d,.1,.4,'bandpass',2600);osc(sx,t+d,1200,.18,'square',.07)}),
 ui:t=>osc(sx,t,660,.06,'square',.06),
 die:t=>{osc(sx,t,330,1.6,'sawtooth',.2,{sl:.12});nz(sx,t,.6,.3,'lowpass',1200,100)}};
function sfx(n){if(!A||A.state!=='running'||!F[n])return;const t=A.currentTime;if(last[n]&&t-last[n]<(n==='hurt'?.35:.04))return;last[n]=t;F[n](t)}
function track(n){pend=T[n]?n:'title'}
const b=document.createElement('button');b.id='mute';const lab=()=>b.textContent=muted?'♪ ✕':'♪';lab();
b.onclick=()=>{muted=!muted;localStorage.setItem('ve_mute',muted?1:0);if(mg)mg.gain.value=muted?0:.8;lab()};document.body.appendChild(b);
['pointerdown','keydown'].forEach(e=>addEventListener(e,init,{capture:true}));
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#menu button'))sfx('ui')});
document.addEventListener('visibilitychange',()=>{if(!A)return;document.hidden?A.suspend():A.resume()});
return{init,sfx,track}})();
