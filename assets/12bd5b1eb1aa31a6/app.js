(function(){var link=document.getElementById('catalog-style');
function start(){if(link)link.media='all';(function(){
  var cfg=JSON.parse(document.getElementById('config').textContent);
  if(cfg.detailBase&&!window.__CATALOG_ROWS__)throw new Error('筛选索引加载失败');
  var rows=window.__CATALOG_ROWS__||JSON.parse(document.getElementById('data').textContent);
  rows.forEach(function(r){r._mechanisms=r._mechanisms||window.__trialMechanismFor(r);r.mechanism=(r._mechanisms.displayEntries||r._mechanisms.entries).map(function(e){return e.chemotherapy?(e.role==='对照组'?'对照组化疗：':'化疗方案：')+e.name:e.name+'：'+e.type+' · '+e.targets.join(' / ');}).join('；');});
  var detailRequests=Object.create(null),detailRenderPending=false,searchReady=!cfg.searchSrc,searchRequest=null;
  function detailReady(r){return !cfg.detailBase||!!r._detailsLoaded;}
  function loadVisibleDetails(visible){
    if(!cfg.detailBase)return;
    var chunks=[];visible.forEach(function(r){if(!detailReady(r)&&!detailRequests[r._chunk]&&chunks.indexOf(r._chunk)<0)chunks.push(r._chunk);});
    chunks.forEach(function(chunk){
      detailRequests[chunk]=fetch(cfg.detailBase+chunk+'.json').then(function(response){if(!response.ok)throw new Error('详情加载失败');return response.json();}).then(function(items){
        items.forEach(function(item){var row=knownRows[item.id];if(row){Object.assign(row,item);row._detailsLoaded=true;delete row._detailError;}});
      }).catch(function(){rows.forEach(function(r){if(r._chunk===chunk)r._detailError=true;});}).then(function(){
        if(!detailRenderPending){detailRenderPending=true;setTimeout(function(){detailRenderPending=false;render();},0);}
      });
    });
  }
  function loadSearch(){
    if(searchReady)return Promise.resolve();
    if(!searchRequest)searchRequest=fetch(cfg.searchSrc).then(function(response){if(!response.ok)throw new Error('检索资料加载失败');return response.json();}).then(function(items){
      items.forEach(function(item){var row=knownRows[item.id];if(row){row._search=item.text;row._sort=item.sort;}});searchReady=true;
    }).catch(function(){searchRequest=null;throw new Error('检索资料加载失败，请重试');});
    return searchRequest;
  }
  function loadingCell(r,label){
    var td=document.createElement('td');td.className='detail-loading';td.setAttribute('data-label',label);td.textContent=r._detailError?'详情暂未加载。':'正在加载详情…';
    if(r._detailError){var retry=document.createElement('button');retry.textContent='重试';retry.onclick=function(){delete detailRequests[r._chunk];rows.forEach(function(item){if(item._chunk===r._chunk)delete item._detailError;});render();};td.appendChild(retry);}
    return td;
  }
  // Index actual intervention pairs once; never combine targets across drugs.
  var mechanismIndex=Object.create(null),emptyMechanismMask=new Uint8Array(rows.length);
  function mechanismKey(type,target){return JSON.stringify([type||'',target||'']);}
  function mechanismMask(type,target){return mechanismIndex[mechanismKey(type,target)]||emptyMechanismMask;}
  rows.forEach(function(r,index){r._mechanisms.entries.forEach(function(e){
    var pairs=[['',''],[e.type,'']];e.targets.forEach(function(t){pairs.push(['',t],[e.type,t]);if(t==='KRAS（多亚型）')pairs.push(['','RAS（多亚型）'],[e.type,'RAS（多亚型）']);});
    pairs.forEach(function(pair){var key=mechanismKey(pair[0],pair[1]);if(!mechanismIndex[key])mechanismIndex[key]=new Uint8Array(rows.length);mechanismIndex[key][index]=1;});
  });});
  function evidenceAfter(k){return k==='id';}
  function addColumnHead(f){
    var th=document.createElement('th'); th.textContent=f[1];
    th.onclick=function(){asc=(sortKey===f[0])?!asc:true;sortKey=f[0];page=0;render();};
    th.dataset.k=f[0]; th.scope='col';th.tabIndex=0;th.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();th.click();}};head.appendChild(th);
    if(evidenceAfter(f[0])){
      var eh=document.createElement('th'); eh.textContent='胰腺癌证据'; eh.dataset.k='pdac_evidence';
      eh.title='有中国中心的在前。有新药的排在只有熟悉化疗的前面。新药按它自己已经公布的胰腺癌数据排：有人体数字的在前，总生存拉开越多越靠前。搭配的老化疗不拿来抬高名次。';
      eh.onclick=function(){asc=(sortKey==='pdac_evidence')?!asc:false;sortKey='pdac_evidence';page=0;render();};
      eh.scope='col';eh.tabIndex=0;eh.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();eh.click();}};head.appendChild(eh);
    }
  }
  function evidenceCell(r){
    if(!detailReady(r))return loadingCell(r,'胰腺癌证据');
    var td=document.createElement('td'); td.className='pdac_evidence';
    td.dataset.label='胰腺癌证据';
    var info=window.__drugEvidenceFor?window.__drugEvidenceFor(r):null;
    if(!info){td.classList.add('ev-miss');td.textContent='证据文件没载入';return td;}
    if(!info.inScope||!info.prose){td.classList.add('ev-miss');td.textContent='暂无胰腺癌专属证据摘要，请查看登记中的瘤种和研究队列。';return td;}
    var parts=info.parts&&info.parts.length?info.parts:[{k:"",v:info.prose}];
    function fillNums(node, text){
      var re=/(\d+(?:\.\d+)?(?:\s*对\s*\d+(?:\.\d+)?)?\s*(?:个月|%)|\d+\s*人)/g, last=0, m;
      while((m=re.exec(text))){
        if(m.index>last)node.appendChild(document.createTextNode(text.slice(last,m.index)));
        var b=document.createElement('b');b.textContent=m[0];node.appendChild(b);
        last=m.index+m[0].length;
      }
      if(last<text.length)node.appendChild(document.createTextNode(text.slice(last)));
    }
    parts.forEach(function(part){
      var block=document.createElement('div');
      var kind=part.k==='方案'?' ev-plan':(part.k==='为什么可能有用'?' ev-why':(part.k==='已有数字'?' ev-got':(part.k==='常见方案效果'?' ev-ref':'')));
      block.className='ev-row'+kind;
      var text=part.v||'';
      if(part.k==='常见方案效果'){
        var fold=document.createElement('details');fold.className='ev-fold';
        var sum=document.createElement('summary');sum.className='ev-k';sum.textContent='常见方案效果';fold.appendChild(sum);
        var groups=[{h:'一线',c:'l1',lines:[]},{h:'二线，以及吉西他滨之后',c:'l2',lines:[]},{h:'术后',c:'l3',lines:[]}];
        text.split('\n').forEach(function(line){
          if(!line)return;
          if(/^日本术后|^术后/.test(line))groups[2].lines.push(line);
          else if(/^二线|^吉西他滨/.test(line))groups[1].lines.push(line);
          else groups[0].lines.push(line);
        });
        groups.forEach(function(g){
          if(!g.lines.length)return;
          var box=document.createElement('div');box.className='ev-ref-group';
          var h=document.createElement('div');h.className='ev-ref-h '+g.c;h.textContent=g.h;box.appendChild(h);
          g.lines.forEach(function(line){
            var row=document.createElement('div');row.className='ev-ref-line';
            fillNums(row, line);
            box.appendChild(row);
          });
          fold.appendChild(box);
        });
        block.appendChild(fold);
      }else if(part.k==='研究背景与限制'){
        var context=document.createElement('details');context.className='ev-background';var title=document.createElement('summary');title.textContent=part.k;context.appendChild(title);var copy=document.createElement('div');copy.textContent=text;context.appendChild(copy);block.appendChild(context);
      }else{
        if(part.k){var label=document.createElement('div');label.className='ev-k';label.textContent=part.k;block.appendChild(label);}
        var body=document.createElement('div');
        if(part.k==='已有数字')fillNums(body, text);
        else body.textContent=text;
        block.appendChild(body);
      }
      td.appendChild(block);
    });
    var links=[],seen={};
    (info.sources||[]).forEach(function(it){if(/^https?:\/\//.test(it.url||'')){seen['reviewed|'+it.url]=true;links.push(it);}});
    (info.cards||[]).forEach(function(c){(c.items||[]).forEach(function(it){if(!/^https?:\/\//.test(it.url||''))return;var key=c.id+'|'+it.url;if(seen[key])return;seen[key]=true;links.push({label:c.name+' · '+(it.source||'资料来源'),url:it.url});});});
    if(links.length){var sources=document.createElement('details');sources.className='source-fold';var summary=document.createElement('summary');summary.textContent='资料来源（'+links.length+'）';sources.appendChild(summary);var note=document.createElement('p');note.textContent='按药物列出的研究资料，可能来自其他人群或用法；本项条件以编号链接的登记为准。';sources.appendChild(note);links.forEach(function(it){var a=document.createElement('a');a.href=it.url;a.target='_blank';a.rel='noopener';a.textContent=it.label;sources.appendChild(a);});td.appendChild(sources);}
    return td;
  }
  var FAMILY_KEYS={}; (cfg.familyOnlyKeys||['verdict','reason','score']).forEach(function(k){FAMILY_KEYS[k]=true;});
  var FAMILY_PREF='pancreatic-trials-show-family-v1';
  var showFamily=cfg.familyToggle?localStorage.getItem(FAMILY_PREF)!=='0':!!cfg.family;
  var PAGE=100, page=0, sortKey=cfg.family?null:'pdac_evidence', asc=!!cfg.family, filters={};
  // Local preferences are keyed by registry ID, independent of catalog updates.
  // Keep IDs absent from this snapshot too, so they can reappear in later updates.
  var WATCH_KEY='pancreatic-trials-watchlist-v1', watchEntries=Object.create(null), watchedOnly=false;
  var watchError='', watchNotice='', watchUnreadable=false, originalWatchText='';
  var knownRows=Object.create(null);rows.forEach(function(r,i){r._i=i;knownRows[r.id]=r;});
  function parseWatchlist(text){
    var doc=JSON.parse(text);
    if(!doc||doc.format!=='pancreatic-trials-watchlist'||doc.version!==1||!Array.isArray(doc.entries)||doc.entries.length>10000)
      throw new Error('请选择本页面导出的关注 JSON 文件');
    var entries=Object.create(null);
    doc.entries.forEach(function(e){
      if(!e||typeof e.id!=='string'||!/^(?:NCT\d{8}|CTR\d{8}|ChiCTR[-A-Za-z0-9]{6,30})$/.test(e.id))
        throw new Error('文件含无效的临床登记编号，未导入');
      entries[e.id]={id:e.id,title:typeof e.title==='string'?e.title.slice(0,500):'',
        url:typeof e.url==='string'&&/^https?:\/\//i.test(e.url)?e.url.slice(0,2048):'',
        source:typeof e.source==='string'?e.source.slice(0,100):'',
        addedAt:typeof e.addedAt==='string'&&e.addedAt.length<80&&!isNaN(Date.parse(e.addedAt))?e.addedAt:new Date().toISOString()};
    });
    return entries;
  }
  function watchDocument(entries){
    return {format:'pancreatic-trials-watchlist',version:1,exportedAt:new Date().toISOString(),
      entries:Object.keys(entries).sort().map(function(id){return entries[id];})};
  }
  try{
    originalWatchText=localStorage.getItem(WATCH_KEY)||'';
    if(originalWatchText)watchEntries=parseWatchlist(originalWatchText);
  }catch(e){
    watchUnreadable=!!originalWatchText;
    watchError=watchUnreadable?'原有关注记录无法读取，已保留。请导出备份后导入有效文件。':'本机保存不可用；关注仅在本页临时保留，请导出备份。';
  }
  function persistWatchlist(){
    if(watchUnreadable){watchError='原有关注记录无法读取，未覆盖；请先导出备份并导入有效文件。';return;}
    try{localStorage.setItem(WATCH_KEY,JSON.stringify(watchDocument(watchEntries)));watchError='';}
    catch(e){watchError='本机保存失败；当前页面的关注仍保留，请导出备份。';}
  }
  function isWatched(r){return !!watchEntries[r.id];}
  function watchEntry(r,addedAt){return {id:r.id,title:r.title_zh||r.title||'',url:r.url||'',source:r.source||'',addedAt:addedAt||new Date().toISOString()};}
  function watchSummary(){
    var ids=Object.keys(watchEntries), missing=ids.filter(function(id){return !knownRows[id];}).length;
    var status=document.getElementById('watch-status');
    status.textContent='已关注 '+ids.length+' 条'+(missing?'（'+missing+' 条暂不在本库，仍保留）':'')+(watchNotice?' · '+watchNotice:'')+(watchError?' · '+watchError:'');
    status.classList.toggle('watch-error',!!watchError);
    document.getElementById('export-watchlist').disabled=!ids.length&&!watchUnreadable;
  }
  document.getElementById('export-watchlist').onclick=function(){
    var text=watchUnreadable?originalWatchText:JSON.stringify(watchDocument(watchEntries),null,2);
    var blob=new Blob([text],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=(watchUnreadable?'关注记录原始备份-':'关注临床-')+new Date().toISOString().slice(0,10)+'.json';
    document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);
  };
  var watchFile=document.getElementById('watchlist-file');
  document.getElementById('import-watchlist').onclick=function(){watchFile.click();};
  watchFile.onchange=async function(){
    var file=watchFile.files[0];watchFile.value='';if(!file)return;
    try{
      if(file.size>2*1024*1024)throw new Error('关注文件过大，请选择本页面导出的 JSON 文件');
      var imported=parseWatchlist(await file.text()),added=0;
      Object.keys(imported).forEach(function(id){
        if(watchEntries[id])return;
        var e=imported[id];watchEntries[id]=knownRows[id]?watchEntry(knownRows[id],e.addedAt):e;added++;
      });
      watchUnreadable=false;persistWatchlist();watchNotice='导入新增 '+added+' 条（重复项已合并）';
    }catch(e){watchNotice=e.message||'导入失败，原有关注未更改';}
    page=0;render();
  };
  window.addEventListener('storage',function(e){
    if(e.key!==WATCH_KEY&&e.key!==null)return;
    try{originalWatchText=e.newValue||'';watchEntries=originalWatchText?parseWatchlist(originalWatchText):Object.create(null);watchError='';watchUnreadable=false;watchNotice='';render();}
    catch(err){watchError='另一页面的关注记录无法读取，当前关注仍保留。';watchSummary();}
  });
  var labels={}; cfg.fields.forEach(function(f){labels[f[0]]=f[1];});
  var vRank={}; cfg.verdictOrder.forEach(function(v,i){vRank[v]=i;});
  document.getElementById('sub').textContent='更新于 '+cfg.asOf+' · 共 '+rows.length+' 条登记';
  var bar=document.getElementById('bar'), count=document.getElementById('count'), barAnchor=document.getElementById('bar-end');
  function vals(r,k){var v=String(r[k]==null?'':r[k]);return cfg.multi.indexOf(k)>=0?v.split('、').filter(Boolean):[v];}
  function krasLabel(v){return v.replace(/^不收 /,'原文明示排除 ');}
  var barFields=cfg.filters.filter(function(k){return k!=='mechanism'&&k!=='kras'&&k!=='center_mix'&&k!=='phase';});
  barFields.forEach(function(k){
    var seen={}; rows.forEach(function(r){vals(r,k).forEach(function(v){if(v)seen[v]=(seen[v]||0)+1;});});
    var opts=Object.keys(seen).filter(function(v){return k!=='setting'||v!=='一线'&&v!=='二线及以上';}).sort(function(a,b){
      if(k==='verdict')return (vRank[a]||9)-(vRank[b]||9);return seen[b]-seen[a];});
    var filterLabel=k==='setting'?'治疗情境':k==='kras'?'KRAS 原文要求':labels[k];
    var s=document.createElement('select'); s.setAttribute('aria-label',filterLabel);
    s.appendChild(new Option('全部',''));
    opts.forEach(function(o){s.appendChild(new Option((k==='kras'?krasLabel(o):o)+'（'+seen[o]+'）',o));});
    s.onchange=function(){filters[k]=s.value;page=0;render();};
    var label=document.createElement('label');label.className='quick-filter';var title=document.createElement('span');title.textContent=filterLabel;label.appendChild(title);label.appendChild(s);bar.insertBefore(label,barAnchor);
  });
  var selByKey={}; Array.prototype.forEach.call(bar.querySelectorAll('.quick-filter select'),function(s,i){selByKey[barFields[i]]=s;});
  var chips=document.getElementById('chips'), cnOpen=false;
  var cnBtn=document.createElement('button'); cnBtn.className='chip'; cnBtn.textContent='只看国内在招（招募中/尚未招募）';
  cnBtn.onclick=function(){cnOpen=!cnOpen;cnBtn.classList.toggle('on',cnOpen);page=0;render();};
  chips.appendChild(cnBtn);
  var watchBtn=document.createElement('button');watchBtn.id='watched-only';watchBtn.className='chip';watchBtn.textContent='★ 只看关注';
  watchBtn.onclick=function(){watchedOnly=!watchedOnly;page=0;render();};
  var hideUnfit=false;   // 家庭版专用: "不适用"只是筛选条件, 库里照样收 (2026-10-03); 文案由 config 给, 通用版不带
  var unfitBtn=null;
  if(cfg.unfitLabel){
    unfitBtn=document.createElement('button'); unfitBtn.className='chip'; unfitBtn.textContent=cfg.unfitLabel;
    unfitBtn.onclick=function(){hideUnfit=!hideUnfit;unfitBtn.classList.toggle('on',hideUnfit);page=0;render();};
    chips.appendChild(unfitBtn);
    if(cfg.familyToggle&&!showFamily)unfitBtn.hidden=true;
  }
  var pancOnly=false, PANC=/胰腺|胰|pancrea|\bPDAC\b/i;
  var pancBtn=document.createElement('button'); pancBtn.className='chip'; pancBtn.textContent='只看胰腺癌试验（题目写明胰腺）';
  pancBtn.onclick=function(){pancOnly=!pancOnly;pancBtn.classList.toggle('on',pancOnly);page=0;render();};
  chips.appendChild(pancBtn);
  chips.appendChild(watchBtn);
  var callOnly=false, hospitalView=false;
  var callBtn=null;
  if(cfg.showCallList){
    callBtn=document.createElement('button'); callBtn.className='chip'; callBtn.textContent='📞 可打电话短名单';
    callBtn.title='国内在招、有登记中心、且判定不是不适用；电话仅家庭版可见';
    callBtn.onclick=function(){callOnly=!callOnly;page=0;render();};chips.appendChild(callBtn);
  }
  function redactContactText(text){
    return String(text||'')
      .replace(/[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}/g,'')
      .replace(/(?<!\d)(?:\+?\d[\d\-\s()]{6,}\d|\d{3,4}[-\s]?\d{7,8}|\d{11})(?!\d)/g,'')
      .replace(/[，,]{2,}/g,'，').replace(/[；;]{2,}/g,'；')
      .replace(/[：:]\s*[，,；;]/g,'：').replace(/\s+/g,' ')
      .replace(/^[，,；;：:\s]+|[，,；;：:\s]+$/g,'');
  }
  function contactDisplay(text){
    if(cfg.contactDetails&&!(cfg.familyToggle&&!showFamily)) return text||'';
    return redactContactText(text);
  }
  var modes=document.getElementById('view-modes');
  if(cfg.nedTip){document.getElementById('ned-tip').hidden=false;}
  if(cfg.familyToggle){
    var famBtn=document.createElement('button');famBtn.className='chip';famBtn.id='family-toggle';
    famBtn.textContent=showFamily?'显示对父亲判定：开':'显示对父亲判定：关';
    famBtn.title='关闭后隐藏判定/理由/匹配分，仅改变本页显示；分享请使用通用版文件，家庭版仍含个人信息';
    famBtn.onclick=function(){
      showFamily=!showFamily;
      try{localStorage.setItem(FAMILY_PREF,showFamily?'1':'0');}catch(e){}
      famBtn.textContent=showFamily?'显示对父亲判定：开':'显示对父亲判定：关';
      while(head.children.length)head.removeChild(head.lastChild);
      head.appendChild(watchHead);
      cfg.fields.forEach(function(f){if(showField(f[0]))addColumnHead(f);});
      if(!showFamily){hideUnfit=false;callOnly=false;}
      page=0;render();
    };
    document.getElementById('view-modes').appendChild(famBtn);
  }
  if(cfg.defaultRecommend){cnOpen=true;hideUnfit=showFamily;}
  var adv=document.getElementById('advanced-filters');
  if(adv){adv.open=false;}
  var recBtn=document.createElement('button');recBtn.className='chip';recBtn.textContent='推荐视图';
  recBtn.title='国内在招 + 隐藏不适用（家庭版默认）';
  recBtn.onclick=function(){resetFilters();cnOpen=true;if(cfg.unfitLabel&&showFamily)hideUnfit=true;callOnly=false;hospitalView=false;watchedOnly=false;if(adv)adv.open=false;page=0;render();};
  var allBtn=document.createElement('button');allBtn.className='chip';allBtn.textContent='看全部';
  allBtn.onclick=function(){resetFilters();render();};
  var hospViewBtn=document.createElement('button');hospViewBtn.className='chip';hospViewBtn.textContent='按医院聚合';
  hospViewBtn.onclick=function(){hospitalView=!hospitalView;page=0;render();};
  modes.appendChild(recBtn);modes.appendChild(allBtn);modes.appendChild(hospViewBtn);
  document.querySelector('.jump-results').onclick=function(){if(hospitalView){hospitalView=false;render();}};
  var centerFilter='', centerPanel=document.getElementById('center-filters');
  var familyCenters=!!(cfg.family||cfg.familyToggle),provinceFilter='',cityFilter='';
  document.getElementById('family-center-tip').hidden=!familyCenters;
  document.getElementById('hospital-picker').hidden=!familyCenters;
  var provinceAliases={},cityAliases={},cityProvinces={};
  function regionKey(v){return String(v||'').toLowerCase().replace(/municipality|province|autonomous region/g,'').replace(/[\s,'’_\-]/g,'');}
  ['北京市:Beijing','上海市:Shanghai','天津市:Tianjin','重庆市:Chongqing','河北省:Hebei','山西省:Shanxi','辽宁省:Liaoning','吉林省:Jilin','黑龙江省:Heilongjiang','江苏省:Jiangsu','浙江省:Zhejiang','安徽省:Anhui','福建省:Fujian','江西省:Jiangxi','山东省:Shandong','河南省:Henan','湖北省:Hubei','湖南省:Hunan','广东省:Guangdong','海南省:Hainan','四川省:Sichuan','贵州省:Guizhou','云南省:Yunnan','陕西省:Shaanxi','甘肃省:Gansu','青海省:Qinghai','内蒙古自治区:Inner Mongolia:Neimenggu','广西壮族自治区:Guangxi','宁夏回族自治区:Ningxia','新疆维吾尔自治区:Xinjiang','西藏自治区:Tibet:Xizang','香港特别行政区:Hong Kong:HKSAR:香港','澳门特别行政区:Macau:Macao:澳门','台湾省:Taiwan:台湾'].forEach(function(line){var a=line.split(':');a.concat([a[0].replace(/壮族自治区|回族自治区|维吾尔自治区|特别行政区|自治区|省|市/g,'')]).forEach(function(v){provinceAliases[regionKey(v)]=a[0];});});
  ['北京:Beijing:北京市','上海:Shanghai:上海市','天津:Tianjin:天津市','重庆:Chongqing:重庆市','广州:Guangzhou:广东省','深圳:Shenzhen:广东省','珠海:Zhuhai:广东省','佛山:Foshan:广东省','东莞:Dongguan:广东省','惠州:Huizhou:广东省','汕头:Shantou:广东省','中山:Zhongshan:广东省','梅州:Meizhou:广东省','湛江:Zhanjiang:广东省','韶关:Shaoguan:广东省','江门:Jiangmen:广东省','清远:Qingyuan:广东省','南京:Nanjing:江苏省','苏州:Suzhou:江苏省','无锡:Wuxi:江苏省','南通:Nantong:江苏省','常州:Changzhou:江苏省','徐州:Xuzhou:江苏省','扬州:Yangzhou:江苏省','盐城:Yancheng:江苏省','镇江:Zhenjiang:江苏省','连云港:Lianyungang:江苏省','淮安:Huaian:江苏省','宿迁:Suqian:江苏省','杭州:Hangzhou:浙江省','宁波:Ningbo:浙江省','温州:Wenzhou:浙江省','金华:Jinhua:浙江省','绍兴:Shaoxing:浙江省','湖州:Huzhou:浙江省','丽水:Lishui:浙江省','衢州:Quzhou:浙江省','福州:Fuzhou:福建省','厦门:Xiamen:福建省','泉州:Quanzhou:福建省','漳州:Zhangzhou:福建省','合肥:Hefei:安徽省','蚌埠:Bengbu:安徽省','芜湖:Wuhu:安徽省','阜阳:Fuyang:安徽省','南昌:Nanchang:江西省','赣州:Ganzhou:江西省','济南:Jinan:山东省','青岛:Qingdao:山东省','烟台:Yantai:山东省','潍坊:Weifang:山东省','淄博:Zibo:山东省','临沂:Linyi:山东省','济宁:Jining:山东省','菏泽:Heze:山东省','聊城:Liaocheng:山东省','滨州:Binzhou:山东省','枣庄:Zaozhuang:山东省','泰安:Taian:山东省','郑州:Zhengzhou:河南省','洛阳:Luoyang:河南省','南阳:Nanyang:河南省','新乡:Xinxiang:河南省','安阳:Anyang:河南省','开封:Kaifeng:河南省','平顶山:Pingdingshan:河南省','武汉:Wuhan:湖北省','宜昌:Yichang:湖北省','襄阳:Xiangyang:湖北省','荆州:Jingzhou:湖北省','十堰:Shiyan:湖北省','长沙:Changsha:湖南省','衡阳:Hengyang:湖南省','株洲:Zhuzhou:湖南省','岳阳:Yueyang:湖南省','常德:Changde:湖南省','永州:Yongzhou:湖南省','成都:Chengdu:四川省','绵阳:Mianyang:四川省','德阳:Deyang:四川省','南充:Nanchong:四川省','泸州:Luzhou:四川省','宜宾:Yibin:四川省','内江:Neijiang:四川省','遂宁:Suining:四川省','自贡:Zigong:四川省','沈阳:Shenyang:辽宁省','大连:Dalian:辽宁省','抚顺:Fushun:辽宁省','阜新:Fuxin:辽宁省','长春:Changchun:吉林省','吉林:Jilin City:吉林省','通化:Tonghua:吉林省','哈尔滨:Harbin:黑龙江省','大庆:Daqing:黑龙江省','佳木斯:Jiamusi:黑龙江省','石家庄:Shijiazhuang:河北省','保定:Baoding:河北省','廊坊:Langfang:河北省','唐山:Tangshan:河北省','沧州:Cangzhou:河北省','秦皇岛:Qinhuangdao:河北省','承德:Chengde:河北省','太原:Taiyuan:山西省','大同:Datong:山西省','长治:Changzhi:山西省','西安:Xian:陕西省','宝鸡:Baoji:陕西省','汉中:Hanzhong:陕西省','兰州:Lanzhou:甘肃省','武威:Wuwei:甘肃省','西宁:Xining:青海省','银川:Yinchuan:宁夏回族自治区','昆明:Kunming:云南省','贵阳:Guiyang:贵州省','遵义:Zunyi:贵州省','南宁:Nanning:广西壮族自治区','桂林:Guilin:广西壮族自治区','柳州:Liuzhou:广西壮族自治区','贵港:Guigang:广西壮族自治区','河池:Hechi:广西壮族自治区','海口:Haikou:海南省','琼海:Qionghai:海南省','呼和浩特:Hohhot:内蒙古自治区','包头:Baotou:内蒙古自治区','赤峰:Chifeng:内蒙古自治区','台北:Taipei:台湾省','新北:New Taipei City:台湾省','台中:Taichung:台湾省','台南:Tainan:台湾省','高雄:Kaohsiung:台湾省','桃园:Taoyuan:台湾省','新竹:Hsinchu:台湾省','彰化:Changhua:台湾省','嘉义:Chiayi City:台湾省'].forEach(function(line){var a=line.split(':'),name=a[0]+'市';[a[0],name,a[1],a[1]+' City'].forEach(function(v){cityAliases[regionKey(v)]=name;});cityProvinces[name]=a[2];});
  var regionCache=new WeakMap();
  function regionOf(s){
    if(regionCache.has(s))return regionCache.get(s);
    var pk=regionKey(s.province),ck=regionKey(s.city),province=provinceAliases[pk]||'',city=cityAliases[ck]||'';
    if(!province&&city&&['suzhou','fuzhou','taizhou','yulin'].indexOf(ck)<0)province=cityProvinces[city]||'';
    if(!province)province=provinceAliases[regionKey(s.country)]||'';
    if(ck==='suzhou')city=province==='安徽省'?'宿州市':province==='江苏省'?'苏州市':'';
    if(ck==='fuzhou')city=province==='江西省'?'抚州市':province==='福建省'?'福州市':'';
    if(ck==='taizhou')city=province==='江苏省'?'泰州市':province==='浙江省'?'台州市':'';
    if(ck==='yulin')city=province==='陕西省'?'榆林市':province==='广西壮族自治区'?'玉林市':'';
    if(/^(北京市|上海市|天津市|重庆市)$/.test(province))city=province;
    if(!city&&s.city&&!/^(?:china|na|unknown|none|please select)$/i.test(s.city)&&!provinceAliases[ck])city=String(s.city).trim();
    if(province==='香港特别行政区'||province==='澳门特别行政区')city=province==='香港特别行政区'?'香港':'澳门';
    var region={province:province,city:city};regionCache.set(s,region);return region;
  }
  function siteMatches(s,province,city,hospital){var g=regionOf(s);return (!province||g.province===province)&&(!city||g.city===city)&&(!hospital||(s.hospital||s.name)===hospital);}
  function regionMatches(r){return (r.center_sites||[]).some(function(s){return siteMatches(s,provinceFilter,cityFilter,hospitalFilter);});}
  var provinceSelect=document.getElementById('center-province'),citySelect=document.getElementById('center-city'),regions={};
  rows.forEach(function(r){(r.center_sites||[]).forEach(function(s){var g=regionOf(s);if(g.province){if(!regions[g.province])regions[g.province]={};if(g.city)regions[g.province][g.city]=true;}});});
  provinceSelect.add(new Option('全部省份／地区',''));Object.keys(regions).sort(function(a,b){return a.localeCompare(b,'zh');}).forEach(function(p){provinceSelect.add(new Option(p,p));});
  function updateCities(){citySelect.textContent='';citySelect.add(new Option(provinceFilter?'全部城市':'先选择省份／地区',''));citySelect.disabled=!provinceFilter;Object.keys(regions[provinceFilter]||{}).sort(function(a,b){return a.localeCompare(b,'zh');}).forEach(function(c){citySelect.add(new Option(c,c));});citySelect.value=cityFilter;document.getElementById('clear-region').hidden=!provinceFilter&&!cityFilter;}
  provinceSelect.onchange=function(){provinceFilter=provinceSelect.value;cityFilter='';updateCities();page=0;render();};citySelect.onchange=function(){cityFilter=citySelect.value;page=0;render();};
  document.getElementById('clear-region').onclick=function(){provinceFilter='';cityFilter='';provinceSelect.value='';updateCities();page=0;render();};updateCities();

  function centerMatches(r,value){
    var sites=r.center_sites||[];
    if(value==='other')return sites.some(function(s){return s.group==='非头部';});
    if(value==='head')return r.center_mix==='已知大陆中心仅头部';
    if(value==='unknown')return r.center_mix==='中心信息待核实'||sites.some(function(s){return s.group==='待核实';});
    if(value==='hmt')return sites.some(function(s){return s.group==='港澳台';});
    return true;
  }
  [['','全部']].concat(familyCenters?[['other','有非头部中心'],['head','已知大陆中心仅头部']]:[]).concat([['unknown','中心信息待核实'],['hmt','有港澳台中心']]).forEach(function(option){
    var b=document.createElement('button');b.className='chip';b.dataset.centerFilter=option[0];b.appendChild(document.createTextNode(option[1]));
    if(option[0]){var total=document.createElement('span');total.className='chip-count';total.textContent=rows.filter(function(r){return centerMatches(r,option[0]);}).length;b.appendChild(total);}
    b.onclick=function(){centerFilter=centerFilter===option[0]?'':option[0];page=0;render();};centerPanel.appendChild(b);
  });
  var hospitalFilter='', hospitalPanel=document.getElementById('head-hospital-list');
  function hospitalMatches(r,value){return !value||(r.center_sites||[]).some(function(s){return (s.hospital||s.name)===value;});}
  document.getElementById('head-hospital-summary').textContent='按头部医院筛选（'+(cfg.headHospitals||[]).length+' 家）';
  (familyCenters?cfg.headHospitals||[]:[]).forEach(function(name){
    var b=document.createElement('button');b.className='chip hospital-chip';b.dataset.hospital=name;b.appendChild(document.createTextNode(name));
    var total=document.createElement('span');total.className='chip-count';total.textContent=rows.filter(function(r){return hospitalMatches(r,name);}).length;b.appendChild(total);
    b.onclick=function(){hospitalFilter=hospitalFilter===name?'':name;page=0;render();};hospitalPanel.appendChild(b);
  });
  document.getElementById('clear-hospital').onclick=function(){hospitalFilter='';page=0;render();};
  var designFilters={}, designPanel=document.getElementById('design-filters');
  function designMatches(r,key,value){
    if(!value)return true;
    if(key==='phase')return (r.phase_tags||[]).indexOf(value)>=0;
    if(key==='trial_kind')return r.trial_kind===value;
    var lines=vals(r,'lines');
    if(lines.indexOf(value)>=0)return true;
    if(value==='一线')return lines.indexOf('不限线数')>=0;
    if(value==='二线'||value==='三线及以上')return lines.indexOf('不限线数')>=0||lines.indexOf('二线及以上')>=0;
    return false;
  }
  [['lines','治疗线数',['一线','二线','三线及以上','经治（线数未明确）','不限线数','未明确']],
   ['phase','临床分期',['一期','二期','三期','四期','早期一期','不适用','未明确']],
   ['trial_kind','IIT 标识',['IIT（原文明确）','未明确']]].forEach(function(spec){
    var group=document.createElement('div');group.className='scope-group';var label=document.createElement('span');label.className='scope-label';label.textContent=spec[1];group.appendChild(label);
    var options=document.createElement('div');options.className='scope-options';options.setAttribute('role','group');options.setAttribute('aria-label',spec[1]);
    [''].concat(spec[2]).forEach(function(value){
      var b=document.createElement('button');b.className='scope-option';b.dataset.designKey=spec[0];b.dataset.designValue=value;b.appendChild(document.createTextNode(value||'全部'));
      if(value){var total=document.createElement('span');total.className='chip-count';total.textContent=rows.filter(function(r){return designMatches(r,spec[0],value);}).length;b.appendChild(total);}
      b.onclick=function(){designFilters[spec[0]]=designFilters[spec[0]]===value?'':value;page=0;render();};options.appendChild(b);
    });group.appendChild(options);designPanel.appendChild(group);
  });
  var mechanismType='',mechanismTarget='';
  var mechanismPanel=document.getElementById('mechanism-chips'),mechanismsExpanded={type:false,target:false},expandMechanisms=document.getElementById('expand-mechanisms');
  var typeNames=[],targetNames=[];
  rows.forEach(function(r){r._mechanisms.entries.forEach(function(e){if(typeNames.indexOf(e.type)<0)typeNames.push(e.type);e.targets.forEach(function(t){if(targetNames.indexOf(t)<0)targetNames.push(t);});});});
  var typeOrder=['化疗 / 化疗递送','免疫检查点单抗','放疗','ADC 抗体偶联药','RAS 直接抑制','RAS 蛋白降解','T 细胞衔接双抗','CAR-T 细胞','TCR-T 细胞','CAR-NK 细胞','NK 细胞','TIL 细胞','双靶点抗体','免疫融合蛋白','肿瘤疫苗','溶瘤病毒','DNA 修复抑制剂','信号通路抑制剂','抗血管生成','机制待细分'];
  var targetOrder=['RAS（多亚型）','KRAS G12D','KRAS G12C','KRAS G12V','CLDN18.2','间皮素','TROP2','HER2','EGFR','HER3','CCR8','组织因子 TF','B7-H3','c-Met','CEACAM5','Nectin-4','CDH17','FRα','PD-1','PD-L1','CTLA-4','CD3','VEGF','PRMT5','MAT2A','PARP','PARG','POLQ','MEK','ERK','靶点待核实','未单列靶点'];
  var mechanismLabels={'间皮素':'MSLN（间皮素）','RAS（多亚型）':'RAS／KRAS（多亚型）'};
  var mechanismAliases={'间皮素':'mesothelin msln 间皮素','TROP2':'trop-2','HER2':'ERBB2','HER3':'ERBB3','B7-H3':'CD276','c-Met':'MET','FRα':'FOLR1 叶酸受体','TCR-T 细胞':'TCRT','化疗 / 化疗递送':'化疗 chemotherapy','免疫检查点单抗':'免疫 immunotherapy','放疗':'放射 radiation'};
  function ordered(list,order){return list.sort(function(a,b){var ai=order.indexOf(a),bi=order.indexOf(b);return (ai<0?999:ai)-(bi<0?999:bi)||a.localeCompare(b,'zh');});}
  function makeMechanismGroup(names,dimension,container){
    [''].concat(names).forEach(function(value,index){var b=document.createElement('button');b.className='chip mechanism-chip';b.dataset.dimension=dimension;b.dataset.value=value;b.dataset.index=index;var name=document.createElement('span');name.className='chip-name';name.textContent=mechanismLabels[value]||value||'全部';b.dataset.search=((mechanismLabels[value]||value)+' '+(mechanismAliases[value]||'')).toLowerCase();b.appendChild(name);var n=document.createElement('span');n.className='chip-count';b.appendChild(n);
      b.onclick=function(){if(dimension==='type')mechanismType=mechanismType===value?'':value;else mechanismTarget=mechanismTarget===value?'':value;page=0;render();};container.appendChild(b);
    });
  }
  makeMechanismGroup(ordered(typeNames,typeOrder),'type',document.getElementById('mechanism-types'));
  makeMechanismGroup(ordered(targetNames,targetOrder),'target',document.getElementById('mechanism-targets'));
  function updateMechanisms(){
    document.getElementById('mechanism-selection').textContent=[mechanismType,mechanismLabels[mechanismTarget]||mechanismTarget].filter(Boolean).join(' · ');
    var term=document.getElementById('mechanism-search').value.trim().toLowerCase();
    ['type','target'].forEach(function(dimension){
      var suffix=dimension==='type'?'types':'targets',limit=dimension==='type'?16:24,total=0,shown=0,found=0;
      Array.prototype.forEach.call(mechanismPanel.querySelectorAll('button[data-dimension="'+dimension+'"]'),function(b){
        var selected=(dimension==='type'?mechanismType:mechanismTarget)===b.dataset.value;
        var hit=!term||b.dataset.search.indexOf(term)>=0;
        b.hidden=term?!hit&&!selected:!mechanismsExpanded[dimension]&&Number(b.dataset.index)>limit&&!selected;
        b.classList.toggle('on',selected);b.setAttribute('aria-pressed',String(selected));
        if(b.dataset.value){total++;if(!b.hidden)shown++;if(hit)found++;}
      });
      var more=document.getElementById('more-mechanism-'+suffix),status=document.getElementById('mechanism-'+suffix+'-status'),hidden=total-shown;
      status.textContent=term?'找到 '+found+' 项'+(shown>found?'，另保留已选项':''):'共 '+total+' 项 · '+(hidden?'当前显示 '+shown+' 项，还有 '+hidden+' 项':'已全部显示');
      more.hidden=!!term||(!hidden&&!mechanismsExpanded[dimension]);
      more.textContent=mechanismsExpanded[dimension]?'收起，显示常用选项':'还有 '+hidden+' 项'+(dimension==='type'?'治疗方式':'靶点')+'，展开全部 ↓';
      more.setAttribute('aria-expanded',String(mechanismsExpanded[dimension]));
    });
    expandMechanisms.textContent=mechanismsExpanded.type&&mechanismsExpanded.target?'收起全部':'展开全部方式与靶点';expandMechanisms.setAttribute('aria-expanded',String(mechanismsExpanded.type&&mechanismsExpanded.target));
  }
  document.getElementById('mechanism-search').oninput=updateMechanisms;
  ['type','target'].forEach(function(dimension){document.getElementById('more-mechanism-'+(dimension==='type'?'types':'targets')).onclick=function(){mechanismsExpanded[dimension]=!mechanismsExpanded[dimension];updateMechanisms();};});
  expandMechanisms.onclick=function(){var expand=!(mechanismsExpanded.type&&mechanismsExpanded.target);mechanismsExpanded.type=expand;mechanismsExpanded.target=expand;updateMechanisms();};
  document.getElementById('clear-mechanism').onclick=function(){mechanismType='';mechanismTarget='';page=0;render();};
  var kcount={}; rows.forEach(function(r){vals(r,'kras').forEach(function(v){if(v)kcount[v]=(kcount[v]||0)+1;});});
  var krasTags=document.getElementById('kras-tags');
  if(Object.keys(kcount).length){
    Object.keys(kcount).sort(function(a,b){return kcount[b]-kcount[a];}).forEach(function(k){
      var c=document.createElement('button'); c.className='chip'; c.dataset.k=k;
      c.appendChild(document.createTextNode(krasLabel(k)));var total=document.createElement('span');total.className='chip-count';total.textContent=kcount[k];c.appendChild(total);
      c.onclick=function(){var on=filters.kras===k; filters.kras=on?'':k;
        page=0; render();};
      krasTags.appendChild(c);
    });
  }
  // 每个目标亚型独立三分类；只收其他亚型也算不收，空白不能当作不收。
  function krasScope(tags,target){
    var group=target==='其他G12'||target==='G13'||target==='其他Q61';
    var codon=target==='其他G12'?'G12':target==='其他Q61'?'Q61':target==='G13'?'G13':target.slice(0,-1);
    var members=group?'ACDEFGHIKLMNPQRSTVWY'.split('').map(function(a){return codon+a;}).filter(function(v){
      if(codon==='G13')return v!=='G13G';
      if(codon==='G12')return ['G12G','G12R','G12D','G12V','G12C'].indexOf(v)<0;
      return v!=='Q61Q'&&v!=='Q61R';
    }):[target];
    var excluded=function(v){return tags.indexOf('不收 '+v)>=0||tags.indexOf('不收 '+codon+'X')>=0;};
    if(members.every(excluded))return '不收';
    var broad=tags.indexOf('KRAS 突变（不限亚型）')>=0||tags.some(function(t){return t===codon+'X'||t.indexOf(codon+'X（')===0;});
    if(members.some(function(v){return !excluded(v)&&(broad||tags.indexOf(v)>=0);}))return '可收';
    if(tags.some(function(t){return /^(?:G12|G13|Q61)[A-Z](?:（.*）)?$|^A146[A-Z]$/.test(t)||t==='RAS 野生型';}))return '不收';
    return '未明确';
  }

  var scopeTargets=['G12R','G12D','G12V','G12C','其他G12','G13','Q61R','其他Q61'], scopeStates=['可收','不收','未明确'];
  var scopeFilters={}, scopePanel=document.getElementById('kras-scopes');
  // 仅缓存从公开 KRAS 要求提取的亚型范围，不改入组判定或原始登记标签。
  var rowScopes=rows.map(function(r){var result={};scopeTargets.forEach(function(t){result[t]=krasScope(vals(r,'kras'),t);});return result;});
  scopeTargets.forEach(function(target){
    var group=document.createElement('div');group.className='scope-group';
    var counts={};scopeStates.forEach(function(s){counts[s]=0;});rowScopes.forEach(function(s){counts[s[target]]++;});
    var label=document.createElement('span');label.className='scope-label';label.textContent=target;group.appendChild(label);
    var options=document.createElement('div');options.className='scope-options';options.setAttribute('role','group');options.setAttribute('aria-label',target+' 亚型范围');
    [''].concat(scopeStates).forEach(function(state){
      var button=document.createElement('button');button.className='scope-option';button.appendChild(document.createTextNode(state||'全部'));
      if(state){var total=document.createElement('span');total.className='chip-count';total.textContent=counts[state];button.appendChild(total);}
      button.dataset.scopeTarget=target;button.dataset.scopeState=state;
      button.title=(state||'全部')+' '+target;
      button.onclick=function(){scopeFilters[target]=scopeFilters[target]===state?'':state;page=0;render();};
      options.appendChild(button);
    });
    group.appendChild(options);
    scopePanel.appendChild(group);
  });
  if(cfg.csv){var a=document.createElement('a');a.href=cfg.csv;a.textContent='下载全库表格';a.setAttribute('download','');a.onclick=function(e){e.preventDefault();if(cfg.downloadSrc){var direct=document.createElement('a');direct.href=cfg.downloadSrc;direct.download=cfg.csv;direct.click();return;}function csvValue(v){v=String(v==null?'':v);if(/^[=+@-]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"';}var fields=cfg.fields.filter(function(f){return exportField(f[0]);});var lines=[fields.map(function(f){return csvValue(f[1]);}).join(',')];rows.forEach(function(r){lines.push(fields.map(function(f){return csvValue(f[0]==='contacts'?contactDisplay(r[f[0]]):f[0]==='china_centers'&&!familyCenters?String(r[f[0]]||'').replace(/^\[(?:头部|非头部|港澳台|待核实)\]\s*/gm,''):r[f[0]]);}).join(','));});var url=URL.createObjectURL(new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'}));var link=document.createElement('a');link.href=url;link.download=cfg.csv;link.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);};document.getElementById('catalog-download').appendChild(a);}
  var head=document.getElementById('head');
  var watchHead=document.createElement('th');watchHead.textContent='☆';watchHead.title='关注';watchHead.className='watch';watchHead.scope='col';head.appendChild(watchHead);
  function exportField(k){return k!=='url'&&k!=='center_mix'&&!(cfg.hideEnglishTitle&&k==='title')&&!(!showFamily&&FAMILY_KEYS[k]);}
  function showField(k){return exportField(k)&&k!=='req'&&k!=='kras';}
  cfg.fields.forEach(function(f){ if(showField(f[0])) addColumnHead(f); });
  var q=document.getElementById('q'); q.oninput=function(){page=0;render();};
  function submitSearch(){page=0;render();document.getElementById('results-wrap').scrollIntoView();}
  document.getElementById('search-submit').onclick=submitSearch;
  q.onkeydown=function(e){if(e.key==='Enter'&&!e.isComposing){e.preventDefault();submitSearch();}};
  function resetFilters(){
    document.getElementById('mechanism-search').value='';provinceFilter='';cityFilter='';provinceSelect.value='';updateCities();filters={};scopeFilters={};designFilters={};mechanismType='';mechanismTarget='';centerFilter='';hospitalFilter='';cnOpen=false;hideUnfit=false;pancOnly=false;watchedOnly=false;callOnly=false;hospitalView=false;q.value='';
    Object.keys(selByKey).forEach(function(k){selByKey[k].value='';});page=0;
  }
  document.getElementById('reset-filters').onclick=function(){resetFilters();render();};
  document.getElementById('prev').onclick=function(){if(page>0){page--;render();document.getElementById('results-wrap').scrollIntoView();}};
  document.getElementById('next').onclick=function(){page++;render();document.getElementById('results-wrap').scrollIntoView();};
  var benefitCache=Object.create(null);
  function benefitTuple(r){
    var b=benefitCache[r.id];
    if(!b){b=r._benefit||(window.__drugBenefit?window.__drugBenefit(r):null);benefitCache[r.id]=b||{band:-1,kind:0,magnitude:0,phase:0,year:0,status:0,updated:0,novel:0};}
    if(b.band<0)return [r.china==="是"?1:0,0,-1,0,0,0,0,0,0,-(r._i||0)];
    return [r.china==="是"?1:0,b.novel?1:0,b.band,b.kind,b.magnitude,b.phase,b.year,b.status,b.updated,-(r._i||0)];
  }
  function cmp(a,b){
    var x,y;
    if(sortKey==='pdac_evidence'){
      var ta=benefitTuple(a), tb=benefitTuple(b);
      for(var i=0;i<ta.length;i++){if(ta[i]!==tb[i])return (ta[i]<tb[i]?-1:1)*(asc?1:-1);}
      return 0;
    }
    else {x=a._sort&&Object.prototype.hasOwnProperty.call(a._sort,sortKey)?a._sort[sortKey]:a[sortKey];y=b._sort&&Object.prototype.hasOwnProperty.call(b._sort,sortKey)?b._sort[sortKey]:b[sortKey];
    if(sortKey==='verdict'){x=vRank[x];y=vRank[y];}
    if(typeof x==='number'||typeof y==='number'){x=+x||0;y=+y||0;}else{x=String(x||'');y=String(y||'');}}
    return (x<y?-1:x>y?1:0)*(asc?1:-1);
  }
  function watchCell(r){
    var td=document.createElement('td'),b=document.createElement('button'),selected=isWatched(r);
    td.className='watch';b.className='watch-button'+(selected?' on':'');b.dataset.watchId=r.id;
    b.textContent=selected?'★':'☆';b.title=selected?'取消关注':'关注';b.setAttribute('aria-pressed',String(selected));
    b.setAttribute('aria-label',r.id+(selected?' 取消关注':' 添加关注'));
    b.onclick=function(){
      if(watchUnreadable){watchSummary();return;}
      if(isWatched(r))delete watchEntries[r.id];else watchEntries[r.id]=watchEntry(r);
      watchNotice='';persistWatchlist();render();
      var replacement=document.querySelector('[data-watch-id="'+r.id+'"]');if(replacement)replacement.focus({preventScroll:true});
    };td.appendChild(b);return td;
  }
  function stripCache(text){
    var src=String(text||'').trim();
    if(!/缓存/.test(src))return src;
    var ended=/。$/.test(src);
    var out=src.split('。').map(function(sentence){
      return sentence.split(/[；;]/).map(function(clause){
        if(!/缓存/.test(clause))return clause.trim();
        var cut=clause.replace(/[，,]?[^，,；。]*缓存[^；。]*/g,'');
        return cut.replace(/[，,、]\s*$/,'').replace(/(?:但|另|以及|且)\s*$/,'').trim();
      }).filter(Boolean).join('；').trim();
    }).filter(Boolean).join('。');
    if(out&&ended&&!/。$/.test(out))out+='。';
    return out.replace(/；{2,}/g,'；').replace(/^[；;]+|[；;]+$/g,'');
  }
  function cell(r,k){
    if(!detailReady(r)&&['gate_summary','contacts','drugs','title','req','mechanism'].indexOf(k)>=0)return loadingCell(r,labels[k]||k);
    var td=document.createElement('td'), v=r[k]==null?'':r[k];td.dataset.label=labels[k]||k;
    if(k==='id'){td.className='id';var a=document.createElement('a');a.href=r.url;a.target='_blank';a.rel='noopener';a.textContent=v;td.appendChild(a);
      var quick=document.createElement('details');quick.className='quick-contact';var summary=document.createElement('summary');summary.textContent='医院与联系';quick.appendChild(summary);
      ['china_centers','contacts'].forEach(function(key){var box=document.createElement('div');box.className='contact-content';var content=cell(r,key);while(content.firstChild)box.appendChild(content.firstChild);quick.appendChild(box);});
      var tip=document.createElement('p');tip.className='sub';tip.textContent=cfg.family?'报编号询问是否接收胰腺癌、当前名额及入组条件。':'通用版仅列联系人姓名；电话、邮箱请点编号查看官方登记。';quick.appendChild(tip);td.appendChild(quick);}
    else if(k==='china_centers'){
      td.className='china_centers';var sites=(r.center_sites||[]).slice();
      if(!sites.length){td.textContent=familyCenters?(r.center_mix||'中心信息待核实'):'中心信息待核实';return td;}
      function siteRank(s){return siteMatches(s,provinceFilter,cityFilter,hospitalFilter)&&!!(provinceFilter||cityFilter||hospitalFilter)?-1:familyCenters&&s.group==='非头部'?0:1;}
      sites.sort(function(a,b){return siteRank(a)-siteRank(b);});
      var totals={};sites.forEach(function(s){totals[s.group]=(totals[s.group]||0)+1;});
      var details=document.createElement('details');details.className='center-details';var summary=document.createElement('summary');
      summary.textContent=familyCenters?['非头部','头部','港澳台','待核实'].filter(function(g){return totals[g];}).map(function(g){return g+' '+totals[g];}).join(' · '):sites.length+' 家研究中心';details.appendChild(summary);
      var list=document.createElement('ul');list.className='center-list';sites.forEach(function(s){
        var item=document.createElement('li'),group=document.createElement('span'),status=document.createElement('span');
        if(familyCenters){group.className='center-group'+(s.group==='非头部'?' other':'');group.textContent=s.group;item.appendChild(group);}
        var g=regionOf(s),location=[g.province,g.city].filter(function(v,i,a){return v&&a.indexOf(v)===i;}).join(' ');item.appendChild(document.createTextNode((location||s.city||s.province||'')+' '+s.name));status.className='center-status'+(String(s.status||'').indexOf('未单列')>=0||s.status==='未登记中心状态'?' unknown':'');status.textContent=s.status;status.title=String(s.status||'').indexOf('未单列')>=0?'登记未写该中心单独招募状态，括号内为整项试验状态':'';item.appendChild(status);list.appendChild(item);
      });details.appendChild(list);td.appendChild(details);
    }
    else if(k==='mechanism'){
      td.className='mechanism-detail';(r._mechanisms.displayEntries||r._mechanisms.entries).forEach(function(e){var line=document.createElement('div');line.className='mechanism-entry';var drug=document.createElement('strong');drug.textContent=e.chemotherapy?(e.role==='对照组'?'对照组化疗':'化疗方案'):e.name;line.appendChild(drug);var tags=document.createElement('div');tags.textContent=e.chemotherapy?e.name:e.type+' · '+e.targets.join(' / ');line.appendChild(tags);td.appendChild(line);});
      if(r._mechanisms.note){var note=document.createElement('p');note.className='sub';note.textContent=r._mechanisms.note;td.appendChild(note);}
      var fold=document.createElement('details'),sum=document.createElement('summary');sum.textContent='分类依据';fold.appendChild(sum);r._mechanisms.entries.forEach(function(e){var link=document.createElement(e.url?'a':'span');link.textContent=e.name+'：'+e.basis;if(e.url){link.href=e.url;link.target='_blank';link.rel='noopener';}var line=document.createElement('p');line.appendChild(link);fold.appendChild(line);});td.appendChild(fold);
    }
    else if(k==='verdict'){var b=document.createElement('span');b.className='badge v'+vRank[v];b.textContent=v;td.appendChild(b);}
    else if((k==='kras'||k==='req')&&!String(v||'').trim()){td.className='gate_summary';td.textContent=k==='kras'?'原文未写明 KRAS':'关键门槛未摘出';td.title='不等于没有门槛，报名前以登记全文和中心答复为准';}
    else if(k==='contacts'){
      td.className='contacts';
      var shown=contactDisplay(v);
      var showDetails=cfg.contactDetails&&!(cfg.familyToggle&&!showFamily);
      td.textContent=shown||(showDetails?'登记未写联系方式':'登记未写联系人');
      if(shown)td.title=shown;
      else td.title=showDetails?'公开登记未提供电话/邮箱，或本地尚未抓到详情；可点编号打开登记页':'通用版只显示姓名；电话/邮箱仅家庭版可见，可点编号打开登记页';
    }
    else if(k==='drugs'&&String(v).length>80){td.textContent=String(v).slice(0,80)+'…';td.title=v;}
    else if(k==='score'){td.className='score';td.textContent=v!==''?Number(v).toFixed(2):'';td.title='匹配分是初筛相关度（0–1），越高越值得优先看；不是入组把握，0 也不等于不能问中心。';}
    else{td.textContent=v;}
    if(k==='req'&&String(v||'').trim())td.textContent=stripCache(v);
    if(k==='title')td.className='title'; if(k==='title_zh')td.className='title_zh'; if(k==='reason')td.className='reason'; if(k==='gate_summary'){var gateParts=[];if(String(r.kras||'').trim())gateParts.push('KRAS：'+String(r.kras).trim());if(String(r.lines||'').trim())gateParts.push('线数：'+String(r.lines).trim());if(String(r.phase||'').trim())gateParts.push('分期：'+String(r.phase).trim());if(stripCache(r.req))gateParts.push(stripCache(r.req));td.className='gate_summary';td.textContent=gateParts.length?gateParts.join(' · '):(v||'关键门槛见登记原文');}
    if(k==='lines'){td.className='lines';td.textContent='';var main=document.createElement('span');main.className='line-value';main.textContent=String(v).replace(/（.*?）/g,'');td.appendChild(main);var detail=String(v).match(/（(.*?)）/);if(detail){var sub=document.createElement('span');sub.className='line-detail';sub.textContent=detail[1];td.appendChild(sub);}td.title=r.line_reason||'';}
    if(k==='phase'){td.className='phase';td.textContent='';var value=document.createElement('span');value.className='phase-value';value.textContent=String(v).replace(/III|Ⅲ/g,'三').replace(/IV|Ⅳ/g,'四').replace(/II|Ⅱ/g,'二').replace(/I|Ⅰ/g,'一');td.appendChild(value);td.title=r.phase_reason||'';}
    if(k==='trial_kind'&&v==='未明确')td.title='登记未明确说明是否由研究者发起；未明确不等于非 IIT。';
    return td;
  }
  // A count keeps all active dimensions except the option's own dimension.
  // Evaluate active predicates once per row; at most one failed dimension can
  // contribute to a facet, so search and the other selections always apply.
  var facetGroups={};
  function addFacet(group,node,test,label,getMask){
    var total=node.tagName==='OPTION'?null:node.querySelector('.chip-count');
    if(node.tagName!=='OPTION'&&!total){total=document.createElement('span');total.className='chip-count';node.appendChild(total);}
    var mask=null;
    if(!getMask&&group!=='watchedOnly'){mask=new Uint8Array(rows.length);rows.forEach(function(r,index){mask[index]=test(r,index)?1:0;});}
    (facetGroups[group]||(facetGroups[group]=[])).push({node:node,total:total,test:test,mask:mask,getMask:getMask,label:label,title:node.title||''});
  }
  Object.keys(selByKey).forEach(function(k){
    var s=selByKey[k];Array.prototype.forEach.call(s.options,function(o){
      var value=o.value,label=value?value:'全部';
      addFacet('field:'+k,o,function(r){return !value||vals(r,k).indexOf(value)>=0;},label);
    });
  });
  Array.prototype.forEach.call(centerPanel.querySelectorAll('button'),function(b){addFacet('center',b,function(r){return centerMatches(r,b.dataset.centerFilter);});});
  var hospitalRegionMasks={};
  Array.prototype.forEach.call(hospitalPanel.querySelectorAll('button'),function(b){addFacet('hospital',b,null,null,function(){var key=JSON.stringify([provinceFilter,cityFilter,b.dataset.hospital]);if(!hospitalRegionMasks[key])hospitalRegionMasks[key]=Uint8Array.from(rows,function(r){return (r.center_sites||[]).some(function(s){return siteMatches(s,provinceFilter,cityFilter,b.dataset.hospital);})?1:0;});return hospitalRegionMasks[key];});});
  Array.prototype.forEach.call(designPanel.querySelectorAll('button'),function(b){addFacet('design:'+b.dataset.designKey,b,function(r){return designMatches(r,b.dataset.designKey,b.dataset.designValue);});});
  Array.prototype.forEach.call(mechanismPanel.querySelectorAll('button[data-dimension]'),function(b){addFacet('mechanism',b,null,null,function(){return mechanismMask(b.dataset.dimension==='type'?b.dataset.value:mechanismType,b.dataset.dimension==='target'?b.dataset.value:mechanismTarget);});});
  Array.prototype.forEach.call(krasTags.querySelectorAll('button'),function(b){addFacet('field:kras',b,function(r){return vals(r,'kras').indexOf(b.dataset.k)>=0;});});
  Array.prototype.forEach.call(scopePanel.querySelectorAll('button'),function(b){addFacet('scope:'+b.dataset.scopeTarget,b,function(r,index){return !b.dataset.scopeState||rowScopes[index][b.dataset.scopeTarget]===b.dataset.scopeState;});});
  addFacet('watchedOnly',watchBtn,isWatched);
  addFacet('cnOpen',cnBtn,function(r){return r.china==='是'&&(r.status==='招募中'||r.status==='尚未招募');});
  addFacet('pancOnly',pancBtn,function(r){return typeof r._pancOnly==='boolean'?r._pancOnly:PANC.test((r.title||'')+' '+(r.title_zh||''));});
  if(callBtn)addFacet('callOnly',callBtn,function(r){return !!r.call_ready;});
  if(unfitBtn)addFacet('hideUnfit',unfitBtn,function(r){return r.verdict!=='不适用';});
  function filterAndCount(term){
    var tests=[],bases={},groups=Object.keys(facetGroups),out=[];
    function predicate(group,test){tests.push({group:group,test:test});}
    groups.forEach(function(group){bases[group]=[];});
    Object.keys(filters).forEach(function(k){if(filters[k])predicate('field:'+k,function(r){return vals(r,k).indexOf(filters[k])>=0;});});
    Object.keys(scopeFilters).forEach(function(target){if(scopeFilters[target])predicate('scope:'+target,function(r,index){return rowScopes[index][target]===scopeFilters[target];});});
    Object.keys(designFilters).forEach(function(k){if(designFilters[k])predicate('design:'+k,function(r){return designMatches(r,k,designFilters[k]);});});
    if(mechanismType||mechanismTarget)predicate('mechanism',function(r){return window.__trialMechanismMatches(r._mechanisms,mechanismType,mechanismTarget);});
    if(centerFilter)predicate('center',function(r){return centerMatches(r,centerFilter);});
    if(provinceFilter||cityFilter)predicate('region',function(r){return (r.center_sites||[]).some(function(s){return siteMatches(s,provinceFilter,cityFilter,'');});});
    if(hospitalFilter)predicate('hospital',regionMatches);
    if(hideUnfit)predicate('hideUnfit',function(r){return r.verdict!=='不适用';});
    if(pancOnly)predicate('pancOnly',function(r){return typeof r._pancOnly==='boolean'?r._pancOnly:PANC.test((r.title||'')+' '+(r.title_zh||''));});
    if(callOnly&&cfg.showCallList&&!(cfg.familyToggle&&!showFamily))predicate('callOnly',function(r){return !!r.call_ready;});
    if(watchedOnly)predicate('watchedOnly',isWatched);
    if(cnOpen)predicate('cnOpen',function(r){return r.china==='是'&&(r.status==='招募中'||r.status==='尚未招募');});
    if(term)predicate('search',function(r){if(cfg.searchSrc){if(/^(?:NCT|CTR|ChiCTR)\d+$/i.test(term))return (r._registryRefs||[]).some(function(ref){return ref.indexOf(term)>=0;});return r._search.indexOf(term)>=0;}var info=window.__drugEvidenceFor?window.__drugEvidenceFor(r):{text:''};return (info.text||'').toLowerCase().indexOf(term)>=0||cfg.fields.some(function(f){return String(r[f[0]]==null?'':r[f[0]]).toLowerCase().indexOf(term)>=0;});});
    rows.forEach(function(r,index){
      var failed=null,failures=0;
      for(var i=0;i<tests.length;i++){if(!tests[i].test(r,index)){failed=tests[i].group;if(++failures===2)break;}}
      if(!failures){out.push(r);groups.forEach(function(group){bases[group].push(index);});}
      else if(failures===1&&bases[failed])bases[failed].push(index);
    });
    groups.forEach(function(group){facetGroups[group].forEach(function(facet){
      var n=0,mask=facet.getMask?facet.getMask():facet.mask;
      bases[group].forEach(function(index){if(mask?mask[index]:facet.test(rows[index],index))n++;});
      if(facet.total){facet.total.textContent=n;facet.node.classList.toggle('is-empty',n===0);facet.node.title=facet.title+(facet.title?' · ':'')+'保留其他条件选择此项：'+n+' 条';}
      else facet.node.textContent=facet.label+'（'+n+'）';
    });});
    return out;
  }
  function renderActiveFilters(){
    var box=document.getElementById('active-filters');box.textContent='';var n=0;
    function add(label,clear){n++;var b=document.createElement('button');b.textContent=label+' ×';b.setAttribute('aria-label','移除条件：'+label);b.onclick=function(){clear();page=0;render();};box.appendChild(b);}
    if(q.value.trim())add('搜索：'+q.value.trim(),function(){q.value='';});
    Object.keys(filters).forEach(function(k){if(filters[k])add((labels[k]||k)+'：'+filters[k],function(){delete filters[k];if(selByKey[k])selByKey[k].value='';});});
    Object.keys(scopeFilters).forEach(function(k){if(scopeFilters[k])add(k+'：'+scopeFilters[k],function(){delete scopeFilters[k];});});
    Object.keys(designFilters).forEach(function(k){if(designFilters[k])add((labels[k]||k)+'：'+designFilters[k],function(){delete designFilters[k];});});
    if(centerFilter){var selected=centerPanel.querySelector('[data-center-filter="'+centerFilter+'"]');add('中心：'+selected.firstChild.textContent,function(){centerFilter='';});}
    if(mechanismType)add('治疗方式：'+mechanismType,function(){mechanismType='';});
    if(mechanismTarget)add('靶点：'+(mechanismLabels[mechanismTarget]||mechanismTarget),function(){mechanismTarget='';});
    if(provinceFilter)add('省份：'+provinceFilter,function(){provinceFilter='';cityFilter='';provinceSelect.value='';updateCities();});
    if(cityFilter)add('城市：'+cityFilter,function(){cityFilter='';updateCities();});
    if(hospitalFilter)add('医院：'+hospitalFilter,function(){hospitalFilter='';});
    if(cnOpen)add('国内招募中 / 尚未招募',function(){cnOpen=false;});
    if(hideUnfit)add('隐藏对父亲不适用',function(){hideUnfit=false;});
    if(pancOnly)add('题目写明胰腺',function(){pancOnly=false;});
    if(watchedOnly)add('只看关注',function(){watchedOnly=false;});
    if(callOnly)add('可打电话短名单',function(){callOnly=false;});
    if(!n)box.textContent='当前无筛选，显示全库。';
    document.getElementById('advanced-summary').textContent='更多筛选：KRAS 入组条件'+(n?'（已选条件见下方）':'');
  }
  function mobileMore(r){
    var td=document.createElement('td');td.className='mobile-more';var fold=document.createElement('details');var summary=document.createElement('summary');summary.textContent='更多登记信息（题目、药物、分期等）';fold.appendChild(summary);
    cfg.fields.forEach(function(f){if(!showField(f[0])||primaryField(f[0]))return;var box=document.createElement('div');box.className='mobile-field';var label=document.createElement('strong');label.textContent=f[1];box.appendChild(label);var content=cell(r,f[0]);while(content.firstChild)box.appendChild(content.firstChild);fold.appendChild(box);});td.appendChild(fold);return td;
  }
  function primaryField(k){return ['id','verdict','gate_summary','china_centers'].indexOf(k)>=0;}
  function render(){
    PAGE=window.matchMedia('(max-width:700px)').matches?20:100;
    var term=q.value.trim().toLowerCase();
    if(cfg.searchSrc&&!searchReady&&((term&&!/^(?:NCT|CTR|ChiCTR)\d+$/i.test(term))||(cfg.coreFields.indexOf(sortKey)<0&&sortKey))){count.textContent='正在检索全库资料…';document.getElementById('body').textContent='';loadSearch().then(render).catch(function(error){count.textContent=error.message;var retry=document.createElement('button');retry.textContent='重试搜索';retry.onclick=render;document.getElementById('body').appendChild(retry);});return;}
    var out=filterAndCount(term);
    if(sortKey)out=out.slice().sort(cmp);
    Array.prototype.forEach.call(head.children,function(th){
      if(th===watchHead)return;th.className=th.dataset.k===sortKey?('sorted'+(asc?' asc':'')):'';});
    var pages=Math.max(1,Math.ceil(out.length/PAGE)); if(page>=pages)page=pages-1;
    var body=document.getElementById('body'); body.textContent='';
    var agg=document.getElementById('hospital-agg'), wrap=document.getElementById('results-wrap'), list=document.getElementById('hospital-agg-list'), meta=document.getElementById('hospital-agg-meta');
    agg.hidden=!hospitalView; wrap.hidden=!!hospitalView;
    if(hospitalView){
      var counts=Object.create(null), openCounts=Object.create(null);
      out.forEach(function(r){(r.center_sites||[]).forEach(function(s){
        var name=s.hospital||s.name; if(!name||s.group==='待核实'||!siteMatches(s,provinceFilter,cityFilter,''))return;
        counts[name]=(counts[name]||0)+1;
        if(s.status==='招募中'||s.status==='尚未招募')openCounts[name]=(openCounts[name]||0)+1;
      });});
      var names=Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]||a.localeCompare(b,'zh');});
      meta.textContent='当前筛选下 '+names.length+' 家医院 · 点击医院可回到表格并筛选该院（共 '+out.length+' 条试验）';
      list.textContent='';
      names.slice(0,200).forEach(function(name){
        var b=document.createElement('button');b.className='hospital-agg-item';
        b.appendChild(document.createTextNode(name));
        var c=document.createElement('span');c.className='chip-count';c.textContent=counts[name]+(openCounts[name]?' · 在招/尚未 '+openCounts[name]:'');
        b.appendChild(c);
        b.onclick=function(){hospitalFilter=name;hospitalView=false;page=0;render();};
        list.appendChild(b);
      });
      if(!names.length){meta.textContent='当前筛选下没有可聚合的中国中心。';}
    }
    var visible=out.slice(page*PAGE,(page+1)*PAGE);loadVisibleDetails(visible);
    visible.forEach(function(r){
      var tr=document.createElement('tr');tr.appendChild(watchCell(r));
      cfg.fields.forEach(function(f){if(!showField(f[0]))return;var dataCell=cell(r,f[0]);if(!primaryField(f[0]))dataCell.classList.add('secondary-cell');tr.appendChild(dataCell);if(evidenceAfter(f[0]))tr.appendChild(evidenceCell(r));});
      tr.appendChild(mobileMore(r));body.appendChild(tr);
    });
    if(!out.length&&!hospitalView){var empty=document.createElement('tr'),message=document.createElement('td');message.colSpan=head.children.length;message.className='empty-results';message.textContent=watchedOnly?'暂无符合条件的关注临床；可调整筛选，或关闭“只看关注”添加临床。':callOnly?'暂无符合短名单的试验；可关闭“可打电话短名单”或放宽筛选。':'没有符合当前筛选条件的临床。';var reset=document.createElement('button');reset.textContent='清除全部条件，查看全库';reset.onclick=function(){resetFilters();render();};message.appendChild(document.createElement('br'));message.appendChild(reset);empty.appendChild(message);body.appendChild(empty);}
    renderActiveFilters();
    document.getElementById('prev').disabled=page===0;document.getElementById('next').disabled=page>=pages-1;
    watchBtn.classList.toggle('on',watchedOnly);watchBtn.setAttribute('aria-pressed',String(watchedOnly));watchSummary();
    count.textContent='筛出 '+out.length+' 条 · 共 '+rows.length+' 条';
    cnBtn.classList.toggle('on',cnOpen);pancBtn.classList.toggle('on',pancOnly);if(callBtn){callBtn.classList.toggle('on',callOnly);callBtn.hidden=!!(cfg.familyToggle&&!showFamily);if(cfg.familyToggle&&!showFamily)callOnly=false;}hospViewBtn.classList.toggle('on',hospitalView);recBtn.classList.toggle('on',cnOpen&&(!cfg.unfitLabel||hideUnfit)&&!callOnly&&!hospitalView);if(unfitBtn)unfitBtn.classList.toggle('on',hideUnfit);var famEl=document.getElementById('family-toggle');if(famEl){famEl.classList.toggle('on',showFamily);famEl.textContent=showFamily?'显示对父亲判定：开':'显示对父亲判定：关';if(unfitBtn)unfitBtn.hidden=!showFamily;}
    Array.prototype.forEach.call(centerPanel.querySelectorAll('button'),function(b){var selected=centerFilter===b.dataset.centerFilter;b.classList.toggle('on',selected);b.setAttribute('aria-pressed',String(selected));});
    Array.prototype.forEach.call(hospitalPanel.querySelectorAll('button'),function(b){var selected=hospitalFilter===b.dataset.hospital;b.classList.toggle('on',selected);b.setAttribute('aria-pressed',String(selected));});
    document.getElementById('active-hospital').textContent=hospitalFilter?'已选：'+hospitalFilter:'';
    document.getElementById('clear-hospital').hidden=!hospitalFilter;
    Array.prototype.forEach.call(designPanel.querySelectorAll('button'),function(b){var selected=(designFilters[b.dataset.designKey]||'')===b.dataset.designValue;b.classList.toggle('on',selected);b.setAttribute('aria-pressed',String(selected));});
    document.getElementById('clear-mechanism').hidden=!mechanismType&&!mechanismTarget;updateMechanisms();
    Array.prototype.forEach.call(krasTags.querySelectorAll('[data-k]'),function(c){c.classList.toggle('on',filters.kras===c.dataset.k);});
    document.getElementById('active-raw').textContent=filters.kras?'已选：'+krasLabel(filters.kras):'';
    Array.prototype.forEach.call(scopePanel.querySelectorAll('button[data-scope-target]'),function(c){var selected=(scopeFilters[c.dataset.scopeTarget]||'')===c.dataset.scopeState;c.classList.toggle('on',selected);c.setAttribute('aria-pressed',String(selected));});
    document.getElementById('page').textContent=(page+1)+' / '+pages;
  }
  render();
  document.documentElement.classList.remove('catalog-loading');
  document.getElementById('catalog-loading').hidden=true;
})();
}
if(window.__catalogStyleError)throw new Error('页面样式加载失败');if(!link||link.sheet)start();else{link.addEventListener('load',start,{once:true});
link.addEventListener('error',function(){throw new Error('页面样式加载失败');},{once:true});
}})();