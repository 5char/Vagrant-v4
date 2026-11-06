/* Vagrant Echoes II — procedural pixel-art engine. Renders the world at low resolution, upscales with nearest-neighbour. */
const VEart=(()=>{
const PAL={h:'#3a2418',H:'#6b4229',s:'#e3aa7f',S:'#b57850',e:'#0d0b14',m:'#7d8aa2',M:'#d8e1ee',n:'#465068',l:'#8c5732',L:'#54301c',r:'#c8333c',R:'#7a1722',g:'#f2c650',G:'#a87a22',w:'#262b40',W:'#434b6b',v:'#6a7396',x:'#ff3b30',X:'#ffb8a0',i:'#1a1d2c',I:'#363c54',j:'#5b6585',o:'#ff7a2e',O:'#ffc860',p:'#9a5cf0',P:'#d9b8ff',u:'#4aa3ff'};
const mk=(w,h)=>{const k=document.createElement('canvas');k.width=w;k.height=h;return k};
const dkc={};function dk(hex,f){const q=hex+f;if(dkc[q])return dkc[q];const n=parseInt(hex.slice(1),16);return dkc[q]='#'+[n>>16&255,n>>8&255,n&255].map(v=>Math.round(v*f).toString(16).padStart(2,'0')).join('')}
// half-grid → mirrored sprite; right half is shaded for a lit-from-left look
function grid(rows,flip=1,sh=.82){const hw=Math.max(...rows.map(r=>r.length)),w=flip?hw*2-1:hw,k=mk(w,rows.length),x=k.getContext('2d');
 rows.forEach((r,y)=>{r=r.padEnd(hw,flip?r.slice(-1):'.');for(let i=0;i<hw;i++){const c=PAL[r[i]];if(!c)continue;x.fillStyle=c;x.fillRect(i,y,1,1);if(flip&&i<hw-1){x.fillStyle=dk(c,sh);x.fillRect(w-1-i,y,1,1)}}});return k}
function outl(k,c='#07060d'){const w=k.width,h=k.height,o=mk(w+2,h+2),x=o.getContext('2d'),d=k.getContext('2d').getImageData(0,0,w,h).data;x.fillStyle=c;
 for(let y=0;y<h;y++)for(let i=0;i<w;i++)if(d[(y*w+i)*4+3]>0)for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]])x.fillRect(i+1+a,y+1+b,1,1);x.drawImage(k,1,1);return o}
function flash(k){if(k._f)return k._f;const o=mk(k.width,k.height),x=o.getContext('2d');x.drawImage(k,0,0);x.globalCompositeOperation='source-atop';x.fillStyle='#fff';x.fillRect(0,0,k.width,k.height);return k._f=o}

/* ---------- sprites ---------- */
const HT=['...hhhh','..hhHHH','.hhHHhh','.hhhhhh','.hhssss','.hssesS','.hsssSS','..sSSSs','..rrrRr','.mMMrRr','mMMmnll','mMmnlLl','mnnllgG','sSnLLLL','sSnlllL','.mnLLGL','.mmlllL','..nLLLL'];
const LA=['..LLL...LLL..','..LLL...LLL..','..LLL....LL..','.nnnn...nnn..'],LB=['..LLL...LLL..','..LLL...LLL..','..LL....LLL..','.nnn...nnnn..'];
function hero(back,fr){const k=mk(13,22),x=k.getContext('2d');let t=HT;if(back)t=HT.map(r=>r.replace(/[sSe]/g,'h').replace(/l/g,'r').replace(/L/g,'R').replace(/g/g,'G'));x.drawImage(grid(t),0,0);x.drawImage(grid(fr?LB:LA,0),0,18);return outl(k)}
const WR=['....iii','..iiIII','.iIIjjj','.iIjjjj','.iIxjww','.iIjjww','..iIwwW','.iIIwWW','iIjjwWv','iIjwwWv','iIjwWvo','iIjwwvO','.iIwwWv','.iIwwWw','..iwwWw','..iIwWw','...iwWw','...iiww','....iiw','.....ii'];
const BS=['.............ii','...........iiII','.........iiIIjj','........iIIjjjj','........iIjjjjj','........iIjiiii','........iIjixxx','........iIjiiii','.........iIjjjj','..iiiii..iiIIII','.iIIjjjiiIIjvvv','iIjjvvvIIjvvvvv','iIjvvwwIjvvIIII','iIjvwwIjvvIiiii','iIjvwIjvvIiiooo','iIjvIjvvIiiooOO','.iIIjvvIiiooOOO','..iIjvIiioOOOOO','..iIjIiiooOOOOO','..iIjIIiooOOOOO','..iIjvvIiioOOOO','..iIjvvvIiiooOO','..iIjIIIIiiiioo','..iIjIiiiIIIIII','.iIIjIi.iiIIjjj','.iIjjIi..iIjvvv','.iIjjIi..iIjvvv','.iIjIIi..iIjvvv','.iIIIi...iIjIII','..iiii...iIjIii','..iIjj...iIjvvv','.iIjjjj..iiIjjj','.iiiiii..iiiiii'];
const SP={hf:[0,1].map(f=>hero(0,f)),hb:[0,1].map(f=>hero(1,f)),wr:outl(grid(WR)),bs:outl(grid(BS)),gem:grid(['..p','.pP','pPP','pPP','pPP','.pp','..p'])};
const PIL=(()=>{const k=mk(20,60),x=k.getContext('2d'),f=(c,a,b,w,h)=>{x.fillStyle=c;x.fillRect(a,b,w,h)};
 f('#2b3246',4,6,12,50);f('#3c4660',5,6,4,50);f('#556080',5,6,2,50);f('#1b2030',13,6,3,50);
 for(let y=10;y<56;y+=7){f('#1b2030',4,y,12,1);f('#4a5572',5,y+1,2,1)}
 f('#2b3246',2,0,16,6);f('#4a5572',2,0,16,1);f('#1b2030',2,5,16,1);f('#3c4660',3,1,6,4);
 f('#2b3246',2,54,16,6);f('#4a5572',2,54,16,1);f('#1b2030',2,59,16,1);return outl(k)})();

/* ---------- floor tiles (32x16 iso diamonds, optional brick face on near edges) ---------- */
const TC={};
function tile(v,e){const key=v*4+e;if(TC[key])return TC[key];const k=mk(32,e?31:16),x=k.getContext('2d');let s=v*7919+e*104729+13;const R=()=>(s=s*16807%2147483647)/2147483647;
 const B=[[34,41,56],[39,47,64],[30,36,50],[36,43,60]][v],px=(X,Y,c)=>{x.fillStyle=c;x.fillRect(X,Y,1,1)};
 for(let y=0;y<16;y++){const hw=2*(y<8?y+1:16-y);for(let X=16-hw;X<16+hw;X++){let d=(R()*9|0)-4;const L=X-(16-hw)<2,Rr=15+hw-X<2;
  if(L)d+=y<8?14:-2;if(Rr)d+=y<8?0:-14;if(!L&&!Rr&&((X>>1)+(y>>1))%4===0&&R()<.5)d-=6;px(X,y,`rgb(${B[0]+d},${B[1]+d},${B[2]+d+3})`)}}
 if(v===2){let cx=12+R()*8|0,cy=4+R()*6|0;for(let i=0;i<9;i++){px(cx,cy,'#10141e');cx+=R()<.5?1:0;cy+=1}}
 if(v===3){[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>px(16+a,8+b,a||b?'#8e1f26':'#ff5040'));px(16,5,'#6a1a22');px(16,11,'#6a1a22')}
 const face=(X,y0,dark)=>{for(let yy=0;yy<14;yy++){const m=yy%5===4,c=m?'#0c0f18':(((X>>2)+(yy/5|0))%2?(dark?'#171c2a':'#232a3c'):(dark?'#121622':'#1c2232'));px(X,y0+yy,c)}};
 if(e&1)for(let X=16;X<32;X++)face(X,16-((X-16)>>1),1);
 if(e&2)for(let X=0;X<16;X++)face(X,9+(X>>1),0);
 return TC[key]=k}

/* ---------- background (dithered night sky, moon, cathedral skyline, airships) ---------- */
function makeBg(w,h){const k=mk(w,h),x=k.getContext('2d'),id=x.createImageData(w,h),d=id.data;let s=7;const R=()=>(s=s*16807%2147483647)/2147483647;
 const S=[[16,20,56],[26,36,92],[44,56,124],[88,66,134],[146,74,126],[200,88,104],[236,126,98]],B=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
 for(let y=0;y<h;y++){const t=Math.pow(y/h,.95)*(S.length-1)*.98;for(let X=0;X<w;X++){const i=Math.max(0,Math.min(6,Math.round(t+(B[y&3][X&3]/16-.5)*.95))),o=(y*w+X)*4;d[o]=S[i][0];d[o+1]=S[i][1];d[o+2]=S[i][2];d[o+3]=255}}
 x.putImageData(id,0,0);const rc=(c,a,b,ww,hh)=>{x.fillStyle=c;x.fillRect(a|0,b|0,ww,hh)};
 for(let i=0;i<110;i++)rc(R()<.3?'#fff':R()<.5?'#cfd8ff':'#6f7ab5',R()*w,R()*h*.5,1,1);
 const mx=w*.74,my=h*.2,mr=Math.max(10,h*.075);for(let r=mr*2.4;r>mr;r-=mr*.4){x.fillStyle='rgba(190,200,255,.05)';x.beginPath();x.arc(mx,my,r,0,7);x.fill()}
 const disc=(cx,cy,r,c)=>{rc(c,0,0,0,0);x.fillStyle=c;for(let yy=-r;yy<=r;yy++){const hw=Math.sqrt(r*r-yy*yy)|0;x.fillRect(cx-hw|0,cy+yy|0,hw*2+1,1)}};
 disc(mx,my,mr|0,'#efe6c4');disc(mx-mr*.3,my-mr*.2,mr*.28|0,'#d3c9a0');disc(mx+mr*.35,my+mr*.35,mr*.2|0,'#d3c9a0');disc(mx+mr*.1,my-mr*.5,mr*.14|0,'#d9d0ae');
 for(let i=0;i<7;i++){const cy=h*.12+R()*h*.4,cx=R()*w,l=30+R()*60;rc('rgba(12,16,44,.75)',cx,cy,l,2);rc('rgba(12,16,44,.55)',cx+8,cy+2,l*.6,1)}
 const ships=[[.18,.22],[.5,.3],[.64,.12]];ships.forEach(([a,b],i)=>{const X=w*a|0,Y=h*b|0;rc('#090c22',X,Y,14,3);rc('#090c22',X+2,Y-1,10,1);rc('#090c22',X+2,Y+3,10,1);rc('#090c22',X-2,Y-2,3,2);rc('#ffb85a',X+5,Y+1,1,1);rc('#ffb85a',X+8,Y+1,1,1)});
 const layer=(col,base,hmin,hmax,wmin,wmax,win)=>{let X=-6;while(X<w){const bw=wmin+R()*(wmax-wmin)|0,bh=hmin+R()*(hmax-hmin)|0;rc(col,X,base-bh,bw,bh+h);const rh=bw*1.6|0;for(let y=0;y<rh;y++){const ww=Math.max(0,bw-(y*bw/rh)*1|0);x.fillStyle=col;x.fillRect(X+((bw-ww)>>1),base-bh-rh+y,ww,1)}
   rc(col,X+(bw>>1),base-bh-rh-4,1,5);if(win)for(let j=0;j<bh/6;j++)if(R()<.45)rc('#ffb04e',X+2+R()*(bw-4),base-bh+4+j*6,1,2);X+=bw+(R()*6|0)-2}};
 layer('#232c62',h*.6,h*.1,h*.26,8,16,0);layer('#171e4a',h*.67,h*.08,h*.2,9,18,1);
 const cx=w*.3|0,cb=h*.76|0;rc('#080b1c',cx-40,cb-h*.22,80,h);[-34,-20,20,34].forEach(o=>{rc('#080b1c',cx+o-4,cb-h*.42,8,h);for(let y=0;y<24;y++)rc('#080b1c',cx+o-4+(y>>3),cb-h*.42-24+y,8-(y>>2),1)});
 disc(cx,cb-h*.12|0,9,'#1a1030');disc(cx,cb-h*.12|0,5,'#c8333c');for(let y=0;y<30;y++)rc('#080b1c',cx-10+(y>>2),cb-h*.22-30+y,20-(y>>1),1);
 for(let i=0;i<14;i++)rc('#ffb04e',cx-36+R()*72,cb-h*.2+R()*h*.18,1,3);layer('#070a18',h*.84,h*.06,h*.14,10,22,0);
 const g=x.createLinearGradient(0,h*.55,0,h);g.addColorStop(0,'rgba(200,50,60,0)');g.addColorStop(1,'rgba(160,30,50,.28)');x.fillStyle=g;x.fillRect(0,h*.55,w,h);return k}

/* ---------- UI icons ---------- */
function icons(){const mkI=(rows,flip)=>{const g=grid(rows,flip,1),o=mk((g.width+2)*4,(g.height+2)*4),x=o.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(outl(g),0,0,o.width,o.height);return o.toDataURL()};
 const set=(id,u)=>{const e=document.getElementById(id);if(e)e.style.backgroundImage=`url(${u})`};
 set('attack',mkI(['.........MM','........MMm','.......MMm.','......MMm..','.....MMm...','.g..MMm....','..gMMm.....','...gg......','..lgg......','.ll.g......','ll.........'],0));
 set('dash',mkI(['..........','.u..u.....','..u..u....','...u..u...','....u..u..','...u..u...','..u..u....','.u..u.....'],0));
 set('invbtn',mkI(['..ll','.llL','lLLg','lLLL','lLlL','lLLL','.LLL'],1))}

/* ---------- renderer ---------- */
const K=16/90;let lo,lx,bgc,Z=3,bw=0,bh=0,lastT=0,prev={x:0,y:0},pcd=0,sw={t:-9,f:0,dur:.4,k:'sword',reach:55};
const PILS=(()=>{const a=[],add=(x,y)=>a.push({x,y,t:a.length%2===0});for(let t=-450;t<=450;t+=180){add(-450,t);if(t>-450)add(t,-450)}add(450,-450);add(-450,450);add(450,450);return a})();
const sv=a=>{const c=Math.cos(a),s=Math.sin(a),l=Math.hypot(c-s,(c+s)/2)||1;return[(c-s)/l,(c+s)/2/l]};
function draw(c,W,H,st){const now=performance.now()/1000,dt=Math.min(.05,now-lastT);lastT=now;
 Z=Math.max(2,Math.round(H/210));const w=Math.ceil(W/Z),h=Math.ceil(H/Z);
 if(w!==bw||h!==bh){bw=w;bh=h;lo=mk(w,h);lx=lo.getContext('2d');bgc=makeBg(w,h)}
 lx.imageSmoothingEnabled=false;lx.globalAlpha=1;lx.globalCompositeOperation='source-over';lx.drawImage(bgc,0,0);
 st.S==='title'||!st.p?title(now,w,h):world(now,dt,w,h,st);
 c.save();c.imageSmoothingEnabled=false;c.fillStyle='#05070c';c.fillRect(0,0,W,H);const sh=st.shake||0;c.drawImage(lo,(Math.random()-.5)*sh,(Math.random()-.5)*sh,w*Z,h*Z);
 const v=c.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.8);v.addColorStop(0,'#0000');v.addColorStop(1,'#02040abb');c.fillStyle=v;c.fillRect(0,0,W,H);
 const bo=st.S!=='title'&&st.enemies.find(e=>e.boss);if(bo){const bwd=Math.min(340,W*.4),bx=(W-bwd)/2,by=Math.max(34,H*.09);c.fillStyle='#05070f';c.fillRect(bx-3,by-3,bwd+6,14);c.fillStyle='#2a0f14';c.fillRect(bx,by,bwd,8);
  const f=Math.max(0,bo.hp/bo.max)*bwd;c.fillStyle='#c8333c';c.fillRect(bx,by,f,8);c.fillStyle='#ff6a5a';c.fillRect(bx,by,f,3);c.fillStyle='#e6c27a';c.font='bold 11px monospace';c.textAlign='center';c.fillText('THE IRON WARDEN',W/2,by-7)}
 c.restore()}
function title(now,w,h){const x=lx,y0=h*.62|0,hs=SP.hb[0];x.fillStyle='#090b1a';x.fillRect(0,y0,w*.42,h);x.fillStyle='#2b3350';x.fillRect(0,y0,w*.42,1);x.fillStyle='#161b30';for(let i=0;i<30;i++)x.fillRect((i*37)%(w*.4|0),y0+3+(i*11)%20,5+i%4,2);
 x.drawImage(hs,0,0,hs.width,hs.height,w*.16|0,y0-hs.height*3,hs.width*3,hs.height*3);
 for(let i=0;i<44;i++){const X=(i*53+now*(5+i%4*3))%w,Y=h-((now*(9+i%5*3)+i*37)%h);x.fillStyle=i%3?'#ff7a2e':'#ffd070';x.fillRect(X|0,Y|0,1,1)}}
function world(now,dt,w,h,st){const p=st.p,x=lx,ox=Math.round(w/2-(p.x-p.y)*K),oy=Math.round(h*.52-(p.x+p.y)*K/2),sc=(a,b)=>[Math.round(ox+(a-b)*K),Math.round(oy+(a+b)*K/2)];
 for(let i=-5;i<5;i++)for(let j=-5;j<5;j++){const[X,Y]=sc(i*90,j*90);if(X<-20||X>w+20||Y<-20||Y>h+20)continue;const q=((i*73856093)^(j*19349663))>>>0,qq=q%13;x.drawImage(tile(qq===0?3:qq<4?2:qq%2,(i===4?1:0)|(j===4?2:0)),X-16,Y)}
 const E=[],lights=[],sh=(X,Y,r)=>{x.fillStyle='rgba(0,0,0,.38)';x.fillRect(X-r,Y-1,r*2,3);x.fillRect(X-r+2,Y-2,r*2-4,1);x.fillRect(X-r+2,Y+2,r*2-4,1)};
 PILS.forEach((q,n)=>E.push({d:q.x+q.y,f:()=>{const[X,Y]=sc(q.x,q.y);x.drawImage(PIL,X-11,Y-60);if(q.t){const fl=Math.sin(now*13+n*3)>0?1:0,fy=Y-40;x.fillStyle='#1b2030';x.fillRect(X-2,fy+4,5,2);x.fillStyle='#c8441a';x.fillRect(X-1,fy,3,4);x.fillStyle='#ff8a2a';x.fillRect(X-1,fy-1-fl,2,4);x.fillStyle='#ffd070';x.fillRect(X,fy-2-fl,1,3);lights.push([X,fy,46,'255,130,40',.3])}}}));
 const mv=Math.hypot(p.x-prev.x,p.y-prev.y)>.4;prev={x:p.x,y:p.y};const fr=mv?Math.floor(now*7)%2:0;
 if(st.cd>pcd+.02)sw={t:now,f:p.face,dur:Math.max(.2,st.w.speed*.7),k:st.w.kind,reach:st.w.reach};pcd=st.cd;
 const s=(now-sw.t)/sw.dur,swing=s>=0&&s<1,ease=1-Math.pow(1-Math.min(1,s),2);
 E.push({d:p.x+p.y+.1,f:()=>{const[X,Y]=sc(p.x,p.y),[fx,fy]=sv(p.face),back=fy<-.05,right=fx>=0,spr=(back?SP.hb:SP.hf)[fr],by=mv&&fr?1:0;
  if(p.inv>.1&&Math.floor(now*20)%2)x.globalAlpha=.45;sh(X,Y,7);x.save();x.translate(X,Y-spr.height+1-by);if(!right){x.scale(-1,1)}x.drawImage(spr,-spr.width/2|0,0);x.restore();
  const hx=X+(right?4:-4),hy=Y-11-by,wk=st.w.kind,ang=swing?sw.f-1.3+2.6*ease:p.face+.9,wl={sword:15,daggers:9,axe:14,greatsword:20}[wk]||14;
  const bl=(a,L,off)=>{const[dx,dy]=sv(a);for(let i=0;i<L;i++){const px=Math.round(hx+dx*i+off),py=Math.round(hy+dy*i);let col=i<3?'#7a1722':'#e6eefb';if(wk==='axe')col=i<L-4?'#8c5732':'#b9c8e0';if(wk==='greatsword'&&i>=3)col=i%5===4?'#fff':'#b9c8e0';
   x.fillStyle=col;x.fillRect(px,py,1,1);if(wk==='greatsword'&&i>=3)x.fillRect(px+1,py,1,1);if(wk==='axe'&&i>=L-4){x.fillRect(px+1,py,1,2);x.fillRect(px-1,py-1,1,2)}if(i===3&&wk!=='axe'){x.fillStyle='#f2c650';x.fillRect(px-1,py,3,1)}}};
  bl(ang,wl,0);if(wk==='daggers')bl(ang+.45,wl,-1);x.globalAlpha=1;
  if(swing){const N=16;for(let n=0;n<N;n++){const a=sw.f-1.3+2.6*ease*(n/N),r=(sw.reach+10)*.9,[tx,ty]=sc(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r);x.fillStyle=n>N*.7?'#fff':n>N*.35?'#f2c8c0':'#b0303a';x.fillRect(tx,ty-9,n>N*.5?2:1,n>N*.5&&(wk==='axe'||wk==='greatsword')?3:2)}}
  lights.push([X,Y-10,50,'120,150,210',.12])}});
 for(const e of st.enemies)E.push({d:e.x+e.y,f:()=>{const[X,Y]=sc(e.x,e.y),b=e.boss;let sp=b?SP.bs:SP.wr;if(e.hit>0)sp=flash(sp);const bob=b?0:Math.round(Math.sin(e.phase*1.3)*1.5)+3;sh(X,Y,b?15:7);x.drawImage(sp,X-(sp.width>>1),Y-sp.height-bob+1);
  lights.push(b?[X,Y-18,40,'255,110,30',.32]:[X,Y-15-bob,12,'255,40,30',.35]);if(!b&&e.hp<e.max){x.fillStyle='#05070f';x.fillRect(X-8,Y-sp.height-bob-4,16,3);x.fillStyle='#c8333c';x.fillRect(X-7,Y-sp.height-bob-3,14*e.hp/e.max,1)}}});
 for(const d of st.drops){d.t=(d.t||0)+dt;if(d.t>1.6)continue;E.push({d:d.x+d.y,f:()=>{const[X,Y]=sc(d.x,d.y),yy=Y-4-Math.min(d.t*10,7)-Math.round(Math.sin(now*6+d.x)*1);x.globalAlpha=Math.min(1,(1.6-d.t)*2);x.drawImage(SP.gem,X-2,yy-6);x.globalAlpha=1;lights.push([X,yy-3,14,'160,100,240',.3])}})}
 E.sort((a,b)=>a.d-b.d).forEach(o=>o.f());
 for(const f of st.fx){const[X,Y]=sc(f.x,f.y),a=Math.max(0,f.life/(f.max||.8));x.globalAlpha=Math.min(1,a*1.5);
  if(f.projectile){x.fillStyle='#ff7a2e';x.fillRect(X-2,Y-9,5,3);x.fillRect(X-1,Y-10,3,5);x.fillStyle='#fff0c0';x.fillRect(X,Y-8,1,1);lights.push([X,Y-8,16,'255,120,40',.4])}else{x.fillStyle=f.color;const z=a>.5?2:1;x.fillRect(X,Y-8,z,z)}}x.globalAlpha=1;
 x.globalCompositeOperation='lighter';for(const[X,Y,r,col,al]of lights){const g=x.createRadialGradient(X,Y,0,X,Y,r);g.addColorStop(0,`rgba(${col},${al})`);g.addColorStop(1,`rgba(${col},0)`);x.fillStyle=g;x.fillRect(X-r,Y-r,r*2,r*2)}x.globalCompositeOperation='source-over'}
if(typeof document!=='undefined')setTimeout(icons,0);
return{draw}})();
