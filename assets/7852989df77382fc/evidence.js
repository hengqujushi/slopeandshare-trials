/* Patient-facing names: verified development codes first; registry values stay unchanged. */
(function(root,policies){
  function escape(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
  function pattern(s){var x=escape(s).replace(/-/g,'[- ]?');return new RegExp(/[^\x00-\x7f]/.test(s)?x:'(?<![a-z0-9])'+x+'(?![a-z0-9])','gi');}
  var replacements=[];
  policies.forEach(function(p){p.aliases.forEach(function(alias){replacements.push({alias:alias,pattern:pattern(alias),value:p.code});});});
  replacements.sort(function(a,b){return b.alias.length-a.alias.length;});
  function text(value){
    var value=String(value==null?'':value);
    replacements.forEach(function(p){value=value.replace(p.pattern,p.value);});
    policies.forEach(function(p){var c=escape(p.code);value=value.replace(new RegExp(c+'\\s*[（(]\\s*'+c+'(?:\\s*[,，、/]\\s*'+c+')*\\s*[）)]','g'),p.code).replace(new RegExp(c+'(?:\\s*[/／]\\s*'+c+')+','g'),p.code);});
    return value;
  }
  function name(value){
    if(value&&typeof value==='object'&&value.preferredName)return value.preferredName;
    var id=value&&typeof value==='object'?value.id:value;
    var source=value&&typeof value==='object'?value.name:String(value||'');
    var p=policies.find(function(p){return p.id===id||text(source).split(/[（(]/)[0]===p.code;});
    return p?p.label:source;
  }
  root.__trialDrugDisplayText=text;
  root.__trialDrugDisplayName=name;
  root.__trialDrugDisplayList=function(value){
    var seen={};return String(value||'').split('、').map(function(part){var shown=text(part).trim(),p=policies.find(function(p){return shown===p.code;});return p?p.label:shown;}).filter(function(part){if(seen[part])return false;seen[part]=true;return true;}).join('、');
  };
  root.__TRIAL_DRUG_LABELS__=policies;
})(window,[{"id": "daraxonrasib", "label": "RMC-6236（daraxonrasib）", "code": "RMC-6236", "aliases": ["daraxonrasib", "达拉索雷塞", "RMC-6236"]}, {"id": "zoldonrasib", "label": "RMC-9805（zoldonrasib）", "code": "RMC-9805", "aliases": ["zoldonrasib", "RMC-9805"]}, {"id": "asp3082", "label": "ASP3082（setidegrasib）", "code": "ASP3082", "aliases": ["setidegrasib", "ASP3082"]}, {"id": "tng462", "label": "TNG462（vopimetostat）", "code": "TNG462", "aliases": ["vopimetostat", "TNG462"]}, {"id": "intismeran", "label": "mRNA-4157（V940）", "code": "mRNA-4157", "aliases": ["intismeran autogene", "intismeran", "mRNA-4157", "V940"]}, {"id": "eli0027p", "label": "ELI-002 7P（camupepimut）", "code": "ELI-002 7P", "aliases": ["camupepimut", "ELI-002 7P"]}, {"id": "yl201", "label": "YL201（tambotatug pelitecan）", "code": "YL201", "aliases": ["tambotatug pelitecan", "依康坦博妥塔单抗", "YL201"]}, {"id": "hs20093", "label": "HS-20093（risvutatug rezetecan）", "code": "HS-20093", "aliases": ["risvutatug rezetecan", "Ris-Rez", "HS-20093", "HS20093"]}, {"id": "blb01d1", "label": "BL-B01D1（izalontamab brengitecan）", "code": "BL-B01D1", "aliases": ["izalontamab brengitecan", "iza-bren", "BL-B01D1", "BLB01D1"]}, {"id": "db1311", "label": "DB-1311（BNT324）", "code": "DB-1311", "aliases": ["elfetabart drozuntecan", "Elfe-D", "DB-1311", "BNT324"]}, {"id": "temab-a", "label": "ABBV-400（telisotuzumab adizutecan）", "code": "ABBV-400", "aliases": ["telisotuzumab adizutecan", "Temab-A", "ABBV-400"]}, {"id": "sac-tmt", "label": "SKB264（MK-2870，芦康沙妥珠单抗）", "code": "SKB264", "aliases": ["sacituzumab tirumotecan", "芦康沙妥珠单抗", "sac-TMT", "SKB264", "MK-2870"]}, {"id": "disitamab", "label": "RC48（维迪西妥单抗）", "code": "RC48", "aliases": ["disitamab vedotin", "维迪西妥单抗", "RC48", "RC-48"]}, {"id": "tdxd", "label": "DS-8201（德曲妥珠单抗）", "code": "DS-8201", "aliases": ["trastuzumab deruxtecan", "德曲妥珠单抗", "T-DXd", "DS-8201"]}, {"id": "bt5528", "label": "BT5528（nuzefatide pevedotin）", "code": "BT5528", "aliases": ["nuzefatide pevedotin", "BT5528"]}, {"id": "ct041", "label": "CT041（舒瑞基奥仑赛）", "code": "CT041", "aliases": ["satricabtagene autoleucel", "satri-cel", "舒瑞基奥仑赛", "CT041"]}, {"id": "glecirasib", "label": "JAB-21822（格来雷塞）", "code": "JAB-21822", "aliases": ["glecirasib", "格来雷塞", "JAB-21822"]}, {"id": "bnt327", "label": "BNT327（pumitamig，PM8002）", "code": "BNT327", "aliases": ["pumitamig", "BNT327", "PM8002"]}, {"id": "sacituzumab-govitecan", "label": "IMMU-132（戈沙妥珠单抗）", "code": "IMMU-132", "aliases": ["sacituzumab govitecan", "戈沙妥珠单抗", "IMMU-132", "Trodelvy"]}]);
window.__DRUG_EVIDENCE__={asOf:"2026-10-15",drugs:[
{id:"daraxonrasib",name:"达拉索雷塞（daraxonrasib，RMC-6236）",maker:"Revolution Medicines",level:"上市",priority:34,
 aliases:["daraxonrasib","rmc-6236","达拉索雷塞"],
 items:[
  {grade:"这味药",text:"2026 年 8 月 26 日已在美国上市。口服的 RAS 药。",source:"美国说明书",url:"https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=13a65923-d072-4dac-8620-8eabbf8c3641&version=1"},
  {grade:"怎么起作用",text:"胰腺癌里的 RAS 蛋白经常卡在打开的状态，催着肿瘤长。这味药抓住还开着的 RAS。",source:"美国说明书，2026-08-26 批准",url:"https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=13a65923-d072-4dac-8620-8eabbf8c3641&version=1"},
  {grade:"已经有的数据",text:"既往一线全身治疗后进展的转移性胰腺癌，单药每天 300 mg，500 人（248 对 252），对比研究者选择的化疗。中位总生存 13.2 对 6.7 个月（风险比 0.40），客观缓解率 30% 对 11%。",source:"美国说明书，RASolute 302，NCT06625320",url:"https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=13a65923-d072-4dac-8620-8eabbf8c3641&version=1"},
  {grade:"你正在看的这项",text:"上面是单药对比化疗的三期。你看到的这一行如果是和别的药一起用，或是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"hr070803",name:"盐酸伊立替康脂质体（HR070803，越优力）",maker:"恒瑞医药",level:"上市",priority:28,
 aliases:["hr070803","越优力"],
 items:[
  {grade:"这味药",text:"伊立替康做成脂质体，中国产品名越优力。",source:"",url:""},
  {grade:"怎么起作用",text:"化疗药。和氟尿嘧啶、亚叶酸钙一起用。",source:"",url:""},
  {grade:"已经有的数据",text:"吉西他滨方案失败后的局部晚期或转移性胰腺癌，298 人。本品加氟尿嘧啶/亚叶酸钙对比安慰剂加氟尿嘧啶/亚叶酸钙：中位总生存 7.4 对 5.0 个月（风险比 0.63，P=0.0019），中位无进展生存 4.2 对 1.5 个月，客观缓解率 12.8% 对 0.7%。",source:"Cui 等，Signal Transduction and Targeted Therapy，2024（PAN-HEROIC-1，NCT05074589）",url:"https://www.nature.com/articles/s41392-024-01948-4"},
  {grade:"已经有的数据",text:"2023-12-29 在中国上市。适应症为联合氟尿嘧啶和亚叶酸钙，用于吉西他滨为基础化疗失败的不可切除局部晚期或转移性胰腺癌。",source:"国家医保局 2025 年目录调整申报材料（恒瑞）",url:"https://www.nhsa.gov.cn/attach/Ypsn2025/YPSW202500190/YPSW202500190(ppt).pdf"},
  {grade:"你正在看的这项",text:"上面是吉西他滨方案失败后，这味药加氟尿嘧啶/亚叶酸钙的三期。你看到的这一行如果是和别的药一起用，或是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"nalirifox",name:"NALIRIFOX（脂质体伊立替康+奥沙利铂+氟尿嘧啶+亚叶酸钙）",maker:"脂质体伊立替康（Onivyde）由益普生销售；其余为化疗药",level:"上市",priority:24,
 aliases:["nalirifox"],
 matchAll:[["伊立替康脂质体","liposomal irinotecan","nanoliposomal","nal-iri","onivyde","hr070803","越优力"],["oxaliplatin","奥沙利铂"],["氟尿嘧啶","fluorouracil","5-fu","leucovorin","亚叶酸"]],
 items:[
  {grade:"这味药",text:"脂质体伊立替康、奥沙利铂、氟尿嘧啶、亚叶酸钙，四味一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"和普通四药 FOLFIRINOX 的差别，是把伊立替康换成了脂质体伊立替康。",source:"",url:""},
  {grade:"已经有的数据",text:"一线转移性胰腺癌，770 人。NALIRIFOX 对比吉西他滨加白蛋白紫杉醇：中位总生存 11.1 对 9.2 个月（风险比 0.83，P=0.036），中位无进展生存 7.4 对 5.6 个月（风险比 0.69）。客观缓解率 42% 对 36%，P=0.11，缓解率差异没有统计学意义。",source:"Wainberg 等，Lancet，2023（NAPOLI-3）",url:"https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)01366-1/fulltext"},
  {grade:"你正在看的这项",text:"上面是一线 NALIRIFOX 对比吉西他滨加白蛋白紫杉醇的三期。你看到的这一行如果是在这个方案上再加别的药，或是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"onivyde",name:"伊立替康脂质体（Onivyde 这一类）",maker:"原研 Merrimack，现由益普生（Ipsen）销售",level:"上市",priority:12,
 aliases:["onivyde","nal-iri","nanoliposomal irinotecan","liposomal irinotecan","伊立替康脂质体"],
 items:[
  {grade:"这味药",text:"脂质体伊立替康。",source:"",url:""},
  {grade:"怎么起作用",text:"化疗药。不同厂家的脂质体，不能直接共用同一组数字。",source:"",url:""},
  {grade:"已经有的数据",text:"吉西他滨治疗后的转移性胰腺癌。脂质体伊立替康加氟尿嘧啶/亚叶酸钙（117 人）对比氟尿嘧啶/亚叶酸钙：中位总生存 6.1 对 4.2 个月（风险比 0.67，P=0.012）。单药脂质体伊立替康没有延长总生存（4.9 对 4.2 个月）。终分析时联合组客观缓解率 17% 对 1%，中位无进展生存 3.1 对 1.5 个月。不同厂家的脂质体，不能直接用这组数字。",source:"Wang-Gillam 等，Lancet，2016（NAPOLI-1）；终分析见 Annals of Oncology",url:"https://pubmed.ncbi.nlm.nih.gov/26615328/"},
  {grade:"你正在看的这项",text:"上面是吉西他滨治疗后，脂质体伊立替康加氟尿嘧啶/亚叶酸钙的三期。你看到的这一行如果是和别的药一起用，或是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"ag",name:"吉西他滨 + 白蛋白紫杉醇",maker:"白蛋白紫杉醇原研为百时美施贵宝（Abraxane，原新基）；吉西他滨原研为礼来（健择）。国内试验常用国产。",level:"上市",priority:20,guideline:true,
 aliases:["ag"],
 matchAll:[["gemcitabine","吉西他滨"],["nab-paclitaxel","nab paclitaxel","albumin-bound paclitaxel","白蛋白紫杉醇","白蛋白结合型紫杉醇"]],
 items:[
  {grade:"这味药",text:"吉西他滨加白蛋白紫杉醇。",source:"",url:""},
  {grade:"怎么起作用",text:"两种化疗药一起用。",source:"",url:""},
  {grade:"已经有的数据",text:"一线转移性胰腺癌，861 人。联合方案对比单药吉西他滨：中位总生存 8.5 对 6.7 个月（风险比 0.72），中位无进展生存 5.5 对 3.7 个月，独立评审客观缓解率 23% 对 7%。",source:"Von Hoff 等，NEJM，2013（MPACT）。新基资助。",url:"https://www.nejm.org/doi/full/10.1056/NEJMoa1304369"},
  {grade:"你正在看的这项",text:"一线转移性胰腺癌，861 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"folfirinox",name:"FOLFIRINOX",maker:"奥沙利铂、伊立替康、氟尿嘧啶、亚叶酸钙都是已上市化疗药，这个方案没有单一厂商。",level:"上市",priority:20,guideline:true,
 aliases:["folfirinox"],
 exclude:["脂质体","liposomal","nalirifox","nal-iri","onivyde","hr070803"],
 items:[
  {grade:"这味药",text:"奥沙利铂、伊立替康、氟尿嘧啶、亚叶酸钙。",source:"",url:""},
  {grade:"怎么起作用",text:"四种化疗药一起用。给体力较好的人。",source:"",url:""},
  {grade:"已经有的数据",text:"一线转移性胰腺癌、体力较好，342 人。FOLFIRINOX 对比单药吉西他滨：中位总生存 11.1 对 6.8 个月（风险比 0.57），中位无进展生存 6.4 对 3.3 个月，客观缓解率 31.6% 对 9.4%。",source:"Conroy 等，NEJM，2011（PRODIGE 4 / ACCORD 11）",url:"https://www.nejm.org/doi/full/10.1056/NEJMoa1011923"},
  {grade:"你正在看的这项",text:"一线转移性胰腺癌、体力较好，342 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"nimotuzumab",name:"尼妥珠单抗",maker:"百泰生物（商品名泰欣生）",level:"上市",priority:22,
 aliases:["nimotuzumab","尼妥珠单抗","泰欣生"],
 items:[
  {grade:"这味药",text:"EGFR 抗体，商品名泰欣生。",source:"",url:""},
  {grade:"怎么起作用",text:"挡住肿瘤细胞表面的 EGFR。已公布的数字只包括 KRAS 野生型。",source:"",url:""},
  {grade:"已经有的数据",text:"只纳入 KRAS 野生型的局部晚期或转移性胰腺癌，82 人。尼妥珠单抗加吉西他滨对比安慰剂加吉西他滨：中位总生存 10.9 对 8.5 个月，这个差别还不够确定（P=0.08）。论文换了一种统计算法（限制平均生存时间），得到 18.05 对 11.14 个月（P=0.036）。这两个数不是中位生存，不能和别的卡比。中位无进展生存 4.2 对 3.6 个月。客观缓解率 7% 对 10%，没有提高。KRAS 突变（包括 G12R）不在这组人里。",source:"JCO，2023（NOTABLE，NCT02395016）",url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC10666986/"},
  {grade:"已经有的数据",text:"百泰生物官网历程写明 2023 年 6 月胰腺癌适应症获批。具体人群以说明书为准。",source:"百泰生物官网",url:"http://www.biotechplc.com/history.html"},
  {grade:"你正在看的这项",text:"只纳入 KRAS 野生型的局部晚期或转移性胰腺癌，82 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"ivonescimab",name:"依沃西单抗（AK112）",maker:"康方生物",level:"还没有胰腺癌疗效数字",priority:18,
 aliases:["ivonescimab","ak112","依沃西"],
 items:[
  {grade:"这味药",text:"同时挡住 PD-1 和 VEGF 的药。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的 PD-1 刹车，同时挡住 VEGF。",source:"",url:""},
  {grade:"你正在看的这项",text:"一线转移性胰腺癌的三期在 2025 年 7 月收了第一个人。还没有公布肿瘤缩小或生存的数字。",source:"康方生物新闻稿，2025-07-23",url:"https://www.prnewswire.com/news-releases/akeso-announces-first-patient-enrollment-in-phase-iii-trial-of-ivonescimab-for-pancreatic-cancer-302512598.html"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"ql1706",name:"艾帕洛利托沃瑞利单抗（QL1706）",maker:"齐鲁制药（商品名齐倍安）",level:"还没有胰腺癌疗效数字",priority:18,
 aliases:["ql1706","艾帕洛利托沃瑞利","齐倍安"],
 items:[
  {grade:"这味药",text:"齐鲁的双抗，商品名齐倍安。",source:"",url:""},
  {grade:"怎么起作用",text:"已经上市的适应症是宫颈癌，不是胰腺癌。",source:"",url:""},
  {grade:"已经有的数据",text:"这个药已经上市，批的是复发或转移的宫颈癌，不是胰腺癌。胰腺癌里它和化疗一起试，还没有公布肿瘤缩小的数字。",source:"齐鲁制药产品页；ClinicalTrials.gov NCT06313970",url:"https://www.qilu-pharma.com/products_details/113.html"},
  {grade:"你正在看的这项",text:"胰腺癌里和化疗一起试，还没有公布肿瘤缩小的数字。已经上市的适应症是宫颈癌。",source:"",url:""}
 ]},
{id:"hrs-4642",name:"HRS-4642",maker:"恒瑞医药",level:"一/二期有数字",priority:32,
 aliases:["hrs-4642","hrs4642"],
 items:[
  {grade:"这味药",text:"恒瑞的 KRAS G12D 药。",source:"",url:""},
  {grade:"怎么起作用",text:"只认 KRAS G12D，不认 G12R。",source:"",url:""},
  {grade:"已经有的数据",text:"KRAS G12D 晚期胰腺癌、标准治疗失败。全部剂量 24 人：确认客观缓解率 20.8%（5/24），中位无进展生存 4.1 个月，中位总生存 7.2 个月。1200 mg 每两周 12 人：确认客观缓解率 25%（3/12），疾病控制率 100%，中位无进展生存 4.4 个月。这是 G12D，不是 G12R。",source:"Xiong 等，Annals of Oncology 2025 摘要 915O，数据截止 2025-03-14",url:"https://www.annalsofoncology.org/article/S0923-7534(25)02404-4/fulltext"},
  {grade:"已经有的数据",text:"初治的 KRAS G12D 晚期胰腺癌，30 人，加吉西他滨和白蛋白紫杉醇。确认客观缓解率 63.3%（95% 区间 43.9%–80.1%），中位随访 12.3 个月。3 级及以上治疗相关不良反应 90.3%，主要是化疗相关的血液学毒性。没有因不良反应停药或死亡。",source:"Cui 等，Nature Medicine，2026-07-09，NCT06520488，数据截止 2025-12-05",url:"https://www.nature.com/articles/s41591-026-04538-9"},
  {grade:"已经有的数据",text:"不用化疗。既往治疗过的 KRAS G12D 转移性胰腺癌，加阿得贝利单抗。推荐剂量 37 人：确认客观缓解率 43.2%（95% 区间 27.1%–60.5%），疾病控制率 81.1%，中位缓解持续 6.9 个月，中位无进展生存 5.7 个月，中位总生存 11.5 个月。这是 G12D，不是 G12R，这是两药合用的结果，不是 HRS-4642 单独用。",source:"Shi 等，Cancer Cell，2026，NCT06427239",url:"https://doi.org/10.1016/j.ccell.2026.08.012"},
  {grade:"已经有的数据",text:"已经治疗过、KRAS G12D 突变、肿瘤上有 Nectin-4 的 30 人，用 HRS-4642 加另一款抗体偶联药 SHR-A2102。确认客观缓解率 36.7%（11 人部分缓解），疾病控制率 86.7%，中位无进展生存 4.1 个月。这不是单药结果。",source:"JCO 2026 摘要 4191，数据截止 2025-12-31",url:"https://ascopubs.org/doi/10.1200/JCO.2026.44.16_suppl.4191"},
  {grade:"你正在看的这项",text:"KRAS G12D 晚期胰腺癌、标准治疗失败。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"gfh375",name:"GFH375（海外代号 VS-7375）",maker:"劲方医药；海外由 Verastem 推进",level:"一/二期有数字",priority:32,
 aliases:["gfh375","vs-7375"],
 items:[
  {grade:"这味药",text:"劲方的药，海外代号 VS-7375。",source:"",url:""},
  {grade:"怎么起作用",text:"只认 KRAS G12D，不认 G12R。",source:"",url:""},
  {grade:"已经有的数据",text:"经治的 KRAS G12D 晚期胰腺癌，600 mg 每天。至少做过一次疗效评估的 59 人：客观缓解率 40.7%，疾病控制率 96.7%，中位无进展生存 5.52 个月，4 个月总生存率 92.2%，中位总生存还没达到，中位随访 5.65 个月。68.2% 的人已经接受过至少两线治疗。新闻稿没有写这些缓解是否都已确认。这是 G12D，不是 G12R。不是对照试验。",source:"劲方新闻稿，ESMO 2025 口头报告 LBA84，2025-10-19，NCT06500676",url:"https://www.genfleet.com/en/press_release-97"},
  {grade:"你正在看的这项",text:"经治的 KRAS G12D 晚期胰腺癌，600 mg 每天。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"ibi343",name:"IBI343",maker:"信达生物",level:"一期有数字",priority:31,
 aliases:["ibi343"],
 items:[
  {grade:"这味药",text:"信达的药，认 CLDN18.2。",source:"",url:""},
  {grade:"怎么起作用",text:"只看肿瘤细胞上的 CLDN18.2。至少 60% 的癌细胞上有这个标志，才有这组数字。",source:"",url:""},
  {grade:"已经有的数据",text:"标准治疗失败的胰腺癌，至少 60% 的癌细胞上有 CLDN18.2，用 6 mg/kg 的 44 人：确认客观缓解率 22.7%（95% 区间 11.5%–37.8%），疾病控制率 81.8%，中位无进展生存 5.4 个月，中位总生存 8.5 个月，10 个确认部分缓解的中位缓解持续 6.7 个月。表达低于 60% 的 12 人没有客观缓解，中位无进展生存 1.4 个月。",source:"JCO 2025 摘要 4017，NCT05458219，数据截止 2024-12-27",url:"https://ascopubs.org/doi/10.1200/JCO.2025.43.16_suppl.4017"},
  {grade:"你正在看的这项",text:"上面的数字是标准治疗失败、CLDN18.2 至少 60% 的胰腺癌。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"jab-23e73",name:"JAB-23E73",maker:"加科思。中国以外授权给阿斯利康；中国内地双方共同开发和商业化。",level:"一期有数字",priority:31,
 aliases:["jab-23e73","jab23e73"],
 items:[
  {grade:"这味药",text:"加科思的药。",source:"",url:""},
  {grade:"怎么起作用",text:"JAB-23E73是泛KRAS抑制剂，作用于多个KRAS亚型的活化态和非活化态。已公布的胰腺癌人数少，没有按G12R单独报。",source:"加科思：JAB-23E73官方管线说明",url:"https://www.jacobiopharma.com/en/pipeline/pan-kras"},
  {grade:"已经有的数据",text:"中国一期，数据截止 2026-01-15。预测有效剂量范围内、可评估的胰腺癌 13 人（2 人二线，11 人三线及以后）：客观缓解率 38.5%，疾病控制率 84.6%。公司写明缓解包含尚未确认的。人数少，也没有按 G12R 单独报。2026 年 2 月获准开展一线联合化疗的 I/III 期试验，还没有疗效数字。",source:"加科思 2025 年报新闻稿，2026-03-11",url:"https://www.jacobiopharma.com/en/news/2025_annual_results"},
  {grade:"你正在看的这项",text:"中国一期，数据截止 2026-01-15。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"mrg004a",name:"MRG004A",maker:"乐普生物",level:"一期有数字",priority:30,
 aliases:["mrg004a","mrg004"],
 items:[
  {grade:"这味药",text:"乐普的药，和组织因子有关。",source:"",url:""},
  {grade:"怎么起作用",text:"和肿瘤上的组织因子有关。组织因子高不高，数字不一样。",source:"",url:""},
  {grade:"已经有的数据",text:"2 mg/kg、可评估胰腺癌。2024 年报告：既往中位 3 线的 12 人，客观缓解率 33.3%（4/12），疾病控制率 83.3%。其中组织因子高表达且既往不超过 2 线的 5 人里 4 人部分缓解。2025 年更新：既往 1 线的 10 人，客观缓解率 40%，中位无进展生存 5.8 个月，中位总生存 13.2 个月；既往至少 2 线的 27 人，客观缓解率 18.5%，中位无进展生存 2.7 个月，中位总生存 5.8 个月。",source:"JCO 2024 摘要 3002；Annals of Oncology 2025 摘要 2225P",url:"https://ascopubs.org/doi/10.1200/JCO.2024.42.16_suppl.3002"},
  {grade:"你正在看的这项",text:"2 mg/kg、可评估胰腺癌。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"xnw28012",name:"XNW28012",maker:"信诺维（Evopoint）",level:"一/二期有数字",priority:30,
 aliases:["xnw28012"],
 items:[
  {grade:"这味药",text:"组织因子抗体偶联药。",source:"",url:""},
  {grade:"怎么起作用",text:"把化疗药带到有组织因子的细胞上。",source:"",url:""},
  {grade:"已经有的数据",text:"组织因子抗体偶联药。剂量扩展里可评估的胰腺癌：2.4 mg/kg、既往 1 线 21 人，客观缓解率 47.6%（10/21），疾病控制率 90.5%，中位无进展生存 6.4 个月，中位总生存 14.6 个月；既往至少 2 线 27 人，客观缓解率 25.9%（7/27），疾病控制率 85.2%，中位无进展生存 5.2 个月，中位总生存 9.0 个月。2.0 mg/kg 的客观缓解率是 1 线 28%（7/25）、至少 2 线 15%（3/20）。数字来自会议摘要的转载，还没在期刊发表。",source:"I/II 期摘要文本，NCT06799637",url:"https://exa.ai/library/publication/xr2rcykwqvv"},
  {grade:"你正在看的这项",text:"三期 2025 年 7 月开始给转移性胰腺癌病人用药，结果还没出。",source:"信诺维新闻，2025-07-28",url:"https://www.evopointbio.com/en/news/detail?id=194"}
 ]},
{id:"shr-a1904",name:"SHR-A1904",maker:"恒瑞医药",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["shr-a1904","shra1904"],
 items:[
  {grade:"这味药",text:"恒瑞的 CLDN18.2 抗体偶联药。",source:"登记入选标准核对，2026-10-03",url:""},
  {grade:"怎么起作用",text:"认肿瘤细胞上的 CLDN18.2，把化疗药带过去。",source:"登记入选标准核对，2026-10-03",url:""},
  {grade:"已经有的数据",text:"混合瘤种的早期试验里有 9 名胰腺癌，摘要只报了全部 51 人的缓解率，没有单独的胰腺癌数字。胃癌里的结果，不能用来看胰腺癌。专门收胰腺癌的试验还没有公布结果。",source:"JCO 2026 摘要 e15018；Nature Medicine 2025 胃癌一期",url:"https://ascopubs.org/doi/10.1200/JCO.2026.44.16_suppl.e15018"},
  {grade:"你正在看的这项",text:"专门收胰腺癌的试验还没有公布结果。上面混合瘤种里的 9 人，没有单独的胰腺癌数字。",source:"",url:""}
 ]},
{id:"gemcitabine",name:"吉西他滨",maker:"原研为礼来（健择，Gemzar）。国内试验常用国产。",level:"上市",priority:10,guideline:true,
 aliases:["gemcitabine","gemzar","吉西他滨"],
 items:[
  {grade:"这味药",text:"化疗药吉西他滨。",source:"",url:""},
  {grade:"怎么起作用",text:"单药和氟尿嘧啶比过。那不是吉西他滨加白蛋白紫杉醇，也不是术后辅助。",source:"",url:""},
  {grade:"已经有的数据",text:"有症状的晚期胰腺癌，126 人，单药吉西他滨对比每周氟尿嘧啶。临床获益（疼痛、体力或体重至少一项持续好转）23.8% 对 4.8%（P=0.0022）。中位总生存 5.65 对 4.41 个月（P=0.0025），一年生存率 18% 对 2%。这是单药对照，不是吉西他滨加白蛋白紫杉醇，也不是术后辅助。",source:"Burris 等，Journal of Clinical Oncology，1997",url:"https://ascopubs.org/doi/10.1200/JCO.1997.15.6.2403"},
  {grade:"你正在看的这项",text:"有症状的晚期胰腺癌，126 人，单药吉西他滨对比每周氟尿嘧啶。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"s-1",name:"替吉奥（S-1）",maker:"大鹏药品（Taiho）",level:"上市",priority:14,
 aliases:["s-1","替吉奥"],
 items:[
  {grade:"这味药",text:"口服化疗药替吉奥。",source:"",url:""},
  {grade:"怎么起作用",text:"氟尿嘧啶这一类。晚期和术后是两组不同的数字。",source:"",url:""},
  {grade:"已经有的数据",text:"初治的局部晚期或转移性胰腺癌，共 834 人。中位总生存：吉西他滨 8.8 个月，替吉奥 9.7 个月，两药合用 10.1 个月。替吉奥不劣于吉西他滨（风险比 0.96）。两药合用没有显示出优于单药吉西他滨（风险比 0.88，P=0.15）。研究在日本和台湾。",source:"Ueno 等，JCO，2013（GEST）",url:"https://ascopubs.org/doi/10.1200/JCO.2012.43.3680"},
  {grade:"已经有的数据",text:"日本可切除胰腺癌术后，按方案人群替吉奥 187 人、吉西他滨 190 人。五年总生存 44.1% 对 24.4%，死亡风险比 0.57。这是日本术后人群。",source:"Uesaka 等，Lancet，2016（JASPAC-01）",url:"https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)30583-9/abstract"},
  {grade:"你正在看的这项",text:"初治的局部晚期或转移性胰腺癌，共 834 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"capecitabine",name:"卡培他滨",maker:"原研为罗氏（希罗达，Xeloda）",level:"上市",priority:12,
 aliases:["capecitabine","xeloda","卡培他滨"],
 items:[
  {grade:"这味药",text:"口服化疗药，商品名希罗达。",source:"",url:""},
  {grade:"怎么起作用",text:"氟尿嘧啶这一类。胰腺癌里公布的是和吉西他滨一起用于术后。",source:"",url:""},
  {grade:"已经有的数据",text:"胰腺癌切除后，730 人。吉西他滨加卡培他滨对比单药吉西他滨：中位总生存 28.0 对 25.5 个月（风险比 0.82，95% 区间 0.68–0.98，P=0.032）。这是两药联合的术后辅助，不是卡培他滨单药治疗晚期胰腺癌。",source:"Neoptolemos 等，Lancet，2017（ESPAC-4）",url:"https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)32409-6/fulltext"},
  {grade:"你正在看的这项",text:"胰腺癌切除后，730 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"olaparib",name:"奥拉帕利（olaparib）",maker:"阿斯利康与默沙东",level:"上市",priority:22,
 aliases:["olaparib","lynparza","奥拉帕利","azd2281"],
 items:[
  {grade:"这味药",text:"口服药奥拉帕利，商品名利普卓。",source:"",url:""},
  {grade:"怎么起作用",text:"只适用于验血能查出的、天生带的 BRCA1 或 BRCA2 有害突变。",source:"",url:""},
  {grade:"已经有的数据",text:"只收天生带的 BRCA1 或 BRCA2 有害突变（验血能查）、一线含铂化疗至少 16 周没有进展的转移性胰腺癌。154 人，奥拉帕利维持对比安慰剂：中位无进展生存 7.4 对 3.8 个月（风险比 0.53，P=0.004）。最终总生存没有差别：19.0 对 19.2 个月（风险比 0.83，P=0.35）。没有这种天生突变的人，不在这组数据里。",source:"Golan 等，NEJM，2019；最终总生存见 JCO，2022（POLO）",url:"https://www.nejm.org/doi/full/10.1056/NEJMoa1903387"},
  {grade:"你正在看的这项",text:"只收天生带的 BRCA1 或 BRCA2 有害突变（验血能查）、一线含铂化疗至少 16 周没有进展的转移性胰腺癌。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"pembrolizumab",name:"帕博利珠单抗",maker:"默沙东（可瑞达，Keytruda）",level:"二期有数字",priority:18,
 aliases:["pembrolizumab","keytruda","mk-3475","帕博利珠","帕玻利珠"],
 items:[
  {grade:"这味药",text:"PD-1 抗体，商品名可瑞达。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的刹车。下面的数字只属于 MSI-H 或 dMMR 这一种少见类型。",source:"",url:""},
  {grade:"已经有的数据",text:"只收一种少见类型的晚期胰腺癌（MSI-H 或 dMMR，要专门检测），而且这项试验把多种癌放在一起做。胰腺癌 22 人：客观缓解率 18.2%（1 人完全缓解，3 人部分缓解；95% 区间 5.2%–40.3%），中位无进展生存 2.1 个月，中位总生存 3.7 个月，三年总生存率 22.7%。没有这种少见类型的胰腺癌，不在这组结果里。",source:"Maio 等，Annals of Oncology，2022（KEYNOTE-158，数据截止 2020-10-05）",url:"https://www.annalsofoncology.org/article/S0923-7534(22)01720-3/fulltext"},
  {grade:"你正在看的这项",text:"只收一种少见类型的晚期胰腺癌（MSI-H 或 dMMR，要专门检测），而且这项试验把多种癌放在一起做。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"cend-1",name:"CEND-1（certepetide，LSTA1）",maker:"DrugCendR",level:"一/二期有数字",priority:21,
 aliases:["cend-1","certepetide","lsta1","lsta-1"],
 items:[
  {grade:"这味药",text:"和吉西他滨、白蛋白紫杉醇一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"CEND-1 是一种肿瘤穿透肽，作用是先结合肿瘤血管上的 αV 整合素，再通过 NRP-1（神经纤毛蛋白 1）相关通路，帮助同时使用的化疗药更容易进入肿瘤组织。",source:"NCI：CEND-1 / iRGD 作用机制",url:"https://www.cancer.gov/publications/dictionaries/cancer-drug/def/internalized-arginylglycylaspartic-acid-cyclic-peptide"},
  {grade:"已经有的数据",text:"初治转移性胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂。可评估 29 人：客观缓解率 59%（17/29，含 1 人完全缓解），中位随访 26 个月，中位总生存 13.2 个月。没有对照。",source:"Dean 等，Lancet Gastroenterology & Hepatology，2022，NCT03517176",url:"https://www.thelancet.com/journals/langas/article/PIIS2468-1253(22)00167-4/abstract"},
  {grade:"已经有的数据",text:"同一化疗骨架，随机、双盲，这一组一开始就不是为了下定论设计的，只能当探索看。CEND-1 42 人对比安慰剂 21 人：6 个月无进展生存率 60.8% 对 25%，中位无进展生存 7.5 对 4.7 个月（风险比 0.60，P=0.08），客观缓解率 45.2% 对 19%，初步中位总生存 10.3 对 9.2 个月。",source:"Annals of Oncology 2025 摘要 260MO（ASCEND 队列 B，NCT05042128）",url:"https://www.annalsofoncology.org/article/S0923-7534(25)00478-8/fulltext"},
  {grade:"你正在看的这项",text:"初治转移性胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"adebrelimab",name:"阿得贝利单抗",maker:"恒瑞医药",level:"一/二期有数字",priority:19,
 aliases:["adebrelimab","阿得贝利","shr-1316"],
 items:[
  {grade:"这味药",text:"PD-L1 抗体阿得贝利。",source:"",url:""},
  {grade:"怎么起作用",text:"单药治疗胰腺癌的缓解率还没有公布。下面的数字都是和其他药一起用的。",source:"",url:""},
  {grade:"已经有的数据",text:"阿得贝利是 PD-L1 抗体。单药治疗胰腺癌的缓解率还没有公布。下面的数字都是和其他药一起用的。和 HRS-4642 合用、经治 KRAS G12D 的推荐剂量 37 人：确认客观缓解率 43.2%，中位总生存 11.5 个月。这是 G12D，不是 G12R。另一项一线转移性胰腺癌，加地西他滨、吉西他滨和白蛋白紫杉醇，22 人：客观缓解率 46%（10 人部分缓解），疾病控制率 86.4%，中位无进展生存 6.47 个月。单臂，没有对照。",source:"Shi 等，Cancer Cell，2026；JCO 2026 摘要 4200",url:"https://doi.org/10.1016/j.ccell.2026.08.012"},
  {grade:"你正在看的这项",text:"阿得贝利是 PD-L1 抗体。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"sac-tmt",name:"芦康沙妥珠单抗（sacituzumab tirumotecan，SKB264，MK-2870）",maker:"科伦博泰开发，默沙东有海外权益",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["sacituzumab tirumotecan","skb264","mk-2870","芦康沙妥珠"],
 items:[
  {grade:"这味药",text:"TROP2 抗体偶联药。",source:"",url:""},
  {grade:"怎么起作用",text:"把化疗药带到 TROP2 较多的细胞上。",source:"",url:""},
  {grade:"你正在看的这项",text:"混合瘤种的早期试验没有单独给出胰腺癌缓解率。专门收胰腺癌的试验还没有结果。",source:"ClinicalTrials.gov NCT06428409；Journal of Hematology & Oncology，2025 混合瘤种一期",url:"https://clinicaltrials.gov/study/NCT06428409"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"nivolumab",name:"纳武利尤单抗",maker:"百时美施贵宝（欧狄沃，Opdivo）",level:"二期有数字",priority:17,
 aliases:["nivolumab","opdivo","纳武利尤","纳武单抗"],
 items:[
  {grade:"这味药",text:"PD-1 抗体，商品名欧狄沃。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的刹车。",source:"",url:""},
  {grade:"已经有的数据",text:"既往治疗过的胰腺癌。纳武利尤单抗单药 18 人、加伊匹木单抗 21 人：客观缓解率都是 0。再加考比替尼的 30 人，研究者评估客观缓解率 6.7%（2/30）。三组中位无进展生存 1.4、1.4、3.0 个月，中位总生存 5.1、4.0、6.2 个月。",source:"Callahan 等，Journal for ImmunoTherapy of Cancer，2024（CheckMate 032）",url:"https://jitc.bmj.com/content/12/2/e007883"},
  {grade:"已经有的数据",text:"难治转移性胰腺癌。立体定向放疗加纳武利尤单抗 41 人：临床获益率 17.1%，1 人部分缓解。再加伊匹木单抗 43 人：临床获益率 37.2%，6 人部分缓解，中位缓解持续 5.4 个月。",source:"Chen 等，JCO，2022（CheckPAC，NCT02866383）",url:"https://ascopubs.org/doi/10.1200/JCO.21.02511"},
  {grade:"你正在看的这项",text:"既往治疗过的胰腺癌。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"ipilimumab",name:"伊匹木单抗",maker:"百时美施贵宝（Yervoy）",level:"二期有数字",priority:17,
 aliases:["ipilimumab","yervoy","伊匹木"],
 items:[
  {grade:"这味药",text:"CTLA-4 抗体伊匹木单抗。",source:"",url:""},
  {grade:"怎么起作用",text:"挡住 CTLA-4。胰腺癌里公布的数字都是和纳武利尤单抗一起用。",source:"",url:""},
  {grade:"已经有的数据",text:"伊匹木单抗挡住 CTLA-4。胰腺癌里公布的数字都是和纳武利尤单抗一起用。两药合用 21 人，客观缓解率 0。再加上放疗的 43 人里，6 人肿瘤部分缩小。",source:"CheckMate 032；CheckPAC",url:"https://jitc.bmj.com/content/12/2/e007883"},
  {grade:"你正在看的这项",text:"伊匹木单抗挡住 CTLA-4。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"sintilimab",name:"信迪利单抗",maker:"信达生物（达伯舒）",level:"二期有数字",priority:17,
 aliases:["sintilimab","信迪利"],
 items:[
  {grade:"这味药",text:"PD-1 抗体，商品名达伯舒。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的刹车。",source:"",url:""},
  {grade:"已经有的数据",text:"转移或复发胰腺癌，信迪利单抗加改良 FOLFIRINOX 对比单用改良 FOLFIRINOX，各分配 55 人。客观缓解率 50.0% 对 23.9%。中位总生存 10.9 对 10.8 个月（风险比 1.07），中位无进展生存 5.9 对 5.7 个月。试验最看重的是总生存，两组几乎一样。",source:"Fu 等，Annals of Surgical Oncology，2023（CISPD3，NCT03977272）",url:"https://doi.org/10.1245/s10434-023-13383-w"},
  {grade:"你正在看的这项",text:"转移或复发胰腺癌，信迪利单抗加改良 FOLFIRINOX 对比单用改良 FOLFIRINOX，各分配 55 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"camrelizumab",name:"卡瑞利珠单抗",maker:"恒瑞医药（艾瑞卡）",level:"二期有数字",priority:17,
 aliases:["camrelizumab","卡瑞利珠"],
 items:[
  {grade:"这味药",text:"PD-1 抗体，商品名艾瑞卡。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的刹车。下面的数字不是单药。",source:"",url:""},
  {grade:"已经有的数据",text:"这不是单药。一线局部晚期或转移性胰腺癌，索凡替尼加卡瑞利珠单抗加白蛋白紫杉醇和替吉奥，对比吉西他滨加白蛋白紫杉醇，各 45 人。客观缓解率 51.1%（23/45）对 24.4%（11/45），中位无进展生存 7.9 对 5.3 个月（风险比 0.63，P=0.045），中位总生存 13.0 对 11.0 个月（风险比 0.77，P=0.318）。试验最看重的是总生存，两组差别还不够确定。",source:"Jia 等，Signal Transduction and Targeted Therapy，2025（NCT05218889）",url:"https://doi.org/10.1038/s41392-025-02441-2"},
  {grade:"你正在看的这项",text:"一线局部晚期或转移性胰腺癌，索凡替尼加卡瑞利珠单抗加白蛋白紫杉醇和替吉奥，对比吉西他滨加白蛋白紫杉醇，各 45 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"surufatinib",name:"索凡替尼",maker:"和黄医药",level:"二期有数字",priority:17,
 aliases:["surufatinib","索凡替尼"],
 items:[
  {grade:"这味药",text:"和卡瑞利珠单抗、化疗一起用的药。",source:"",url:""},
  {grade:"怎么起作用",text:"抑制肿瘤血管生成。",source:"",url:""},
  {grade:"已经有的数据",text:"数字来自和卡瑞利珠单抗、白蛋白紫杉醇、替吉奥的联合，不是索凡替尼单药。对比吉西他滨加白蛋白紫杉醇，各 45 人：客观缓解率 51.1% 对 24.4%，中位无进展生存 7.9 对 5.3 个月，中位总生存 13.0 对 11.0 个月（P=0.318）。",source:"Jia 等，Signal Transduction and Targeted Therapy，2025（NCT05218889）",url:"https://doi.org/10.1038/s41392-025-02441-2"},
  {grade:"你正在看的这项",text:"数字来自和卡瑞利珠单抗、白蛋白紫杉醇、替吉奥的联合，不是索凡替尼单药。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"toripalimab",name:"特瑞普利单抗",maker:"君实生物（拓益）",level:"一/二期有数字",priority:17,
 aliases:["toripalimab","特瑞普利"],
 items:[
  {grade:"这味药",text:"PD-1 抗体，商品名拓益。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的刹车。下面是加化疗的单臂数字。",source:"",url:""},
  {grade:"已经有的数据",text:"一线局部晚期或转移性胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂 72 人。客观缓解率 33.3%（24/72），疾病控制率 90.3%，中位无进展生存 5.6 个月，中位总生存 8.9 个月。没有对照。这个总生存和既往单用该化疗的三期结果处在同一范围，不能据此说加了特瑞普利就延长生存。",source:"Cheng 等，Signal Transduction and Targeted Therapy，2024（ChiCTR2000032293）",url:"https://www.nature.com/articles/s41392-024-02031-8"},
  {grade:"你正在看的这项",text:"一线局部晚期或转移性胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂 72 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"tislelizumab",name:"替雷利珠单抗",maker:"百济神州（百泽安）",level:"二期有数字",priority:16,
 aliases:["tislelizumab","替雷利珠"],
 items:[
  {grade:"这味药",text:"PD-1 抗体，商品名百泽安。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的刹车。下面只有 15 人。",source:"",url:""},
  {grade:"已经有的数据",text:"一线局部晚期或转移性胰腺癌，加化疗，只有 15 人可评估。改良 FOLFIRINOX 加替雷利珠 6 人，客观缓解率 16.7%（1/6）；吉西他滨加白蛋白紫杉醇加替雷利珠 9 人，客观缓解率 55.6%（5/9）。人数少，单臂。",source:"Annals of Oncology 2025 摘要 2260eP",url:"https://www.annalsofoncology.org/article/S0923-7534(25)03797-4/fulltext"},
  {grade:"你正在看的这项",text:"一线局部晚期或转移性胰腺癌，加化疗，只有 15 人可评估。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"cadonilimab",name:"卡度尼利单抗",maker:"康方生物（开坦尼）",level:"二期有数字",priority:18,
 aliases:["cadonilimab","卡度尼利","ak104"],
 items:[
  {grade:"这味药",text:"同时挡住 PD-1 和 CTLA-4 的双抗，商品名开坦尼。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的两处刹车。下面是加化疗的单臂数字，没有化疗对照。",source:"",url:""},
  {grade:"已经有的数据",text:"一线不可切除胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂。可评估 56 人：客观缓解率 33.9%（19/56），疾病控制率 96.4%。局部晚期中位无进展生存 11.1 个月、中位总生存 23.4 个月；转移性是 7.2 个月和 10.5 个月。没有化疗对照，两组不要混成一个生存数字。",source:"AACR 2026 摘要 CT145（COMPASSION-26），数据截止 2025-10-20",url:"https://aacrjournals.org/cancerres/article/86/8_Supplement/CT145/782944/Abstract-CT145-A-phase-II-multicenter-open-label"},
  {grade:"你正在看的这项",text:"一线不可切除胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"anlotinib",name:"安罗替尼",maker:"正大天晴（福可维）",level:"二期有数字",priority:16,
 aliases:["anlotinib","安罗替尼"],
 items:[
  {grade:"这味药",text:"和替吉奥、信迪利单抗一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"抑制肿瘤血管生成。",source:"",url:""},
  {grade:"已经有的数据",text:"这不是单药。肝转移胰腺癌二线，替吉奥加信迪利单抗加安罗替尼，可评估 19 人：客观缓解率 10.5%（2/19），疾病控制率 52.6%，中位无进展生存 3.53 个月，中位总生存 8.53 个月。单臂。",source:"Qiu 等，Frontiers in Immunology，2024",url:"https://doi.org/10.3389/fimmu.2024.1210859"},
  {grade:"你正在看的这项",text:"上面的数字是肝转移胰腺癌二线，替吉奥加信迪利单抗加安罗替尼，单臂。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"apatinib",name:"阿帕替尼",maker:"恒瑞医药（艾坦）",level:"还没有胰腺癌疗效数字",priority:15,
 aliases:["apatinib","阿帕替尼"],
 items:[
  {grade:"这味药",text:"挡住 VEGFR2 的药阿帕替尼。",source:"",url:""},
  {grade:"怎么起作用",text:"挡住肿瘤血管上的 VEGFR2。",source:"",url:""},
  {grade:"你正在看的这项",text:"二线胰腺癌有几项登记还在做，还没有公布肿瘤缩小的数字。",source:"ClinicalTrials.gov",url:"https://clinicaltrials.gov/study/NCT02726854"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"not-drug",name:"不是药物治疗",maker:"不适用",level:"不是肿瘤疗效",priority:1,
 aliases:["biospecimen collection","biospecimen collected","questionnaire administration","electronic health record","computed tomography","magnetic resonance imaging","multi-cancer detection","specimen collection","biopsy","ctdna","blood sample","blood sampling","surveillance","fluorescence imaging","optical coherence","perfusion phantom","quantitative sensory","secretin","aromatherapy","artificial intelligence","fine needle","elastography","pet/ct","68ga","89zr","exendin","c-peptide","microbiota","semistructured interview","decision support","nurse-led","app","biological collection","biological sample","blood draw","glucose measurement","cfdna","avantect","lewis genotype","smi imaging","microvascular imaging","diagnostic procedure","artidis","smart glasses","standard of care","treatment plan"],
 exclude:["gemcitabine","吉西他滨","paclitaxel","紫杉","pembrolizumab","nivolumab","olaparib","folfirinox","oxaliplatin","irinotecan","fluorouracil","氟尿","capecitabine","卡培他滨","替吉奥","单抗","替尼","疫苗","vaccine","car-t","化疗","chemotherapy","抑制剂","inhibitor"],
 items:[
  {grade:"这一行是什么",text:"这项登记写的是影像、取材、问卷或早筛检测，不是在测一种药对胰腺癌的缓解率或生存。",source:"",url:""}
 ]},
{id:"radiotherapy",name:"放疗",maker:"不适用",level:"不是肿瘤疗效",priority:5,
 aliases:["stereotactic body radiotherapy","stereotactic body radiation","sbrt","碳离子","carbon ion radiotherapy","不可逆电穿孔","irreversible electroporation","纳米刀","stereotactic ablative","sabr","mridian","brachytherapy","iodine125","125-seeds","diffusing alpha","dart","radiofrequency ablation","thermal ablation","photodynamic","碘-125","放射性粒子","cyberknife","imrt","mr guided radiotherapy","mr-guided","adaptive radiation","dose-painted","hyperthermia","histosonics","pipac","consolidative radiation","high dose radiation","whole-body hyperthermia","大分割放疗","chemoradiotherapy","y-90","yttrium","放射"],
 items:[
  {grade:"这一行是什么",text:"放疗、碳离子或不可逆电穿孔本身不是药物。若同一试验还写了药名，药物的数据看另一张卡。",source:"",url:""}
 ]},
{id:"hlx43",name:"HLX43",maker:"复宏汉霖",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["hlx43"],
 items:[
  {grade:"这味药",text:"抗 PD-L1 的抗体偶联药。",source:"",url:""},
  {grade:"怎么起作用",text:"把化疗药带到有 PD-L1 的细胞上。",source:"",url:""},
  {grade:"你正在看的这项",text:"胰腺癌的二期还没开始招人，没有结果。",source:"ClinicalTrials.gov NCT07301229，申办复宏汉霖",url:"https://clinicaltrials.gov/study/NCT07301229"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"bnt327",name:"BNT327（PM8002，pumitamig）",maker:"BioNTech；也曾用普米斯代号 PM8002",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["bnt327","pm8002","pumitamig"],
 items:[
  {grade:"这味药",text:"同时挡住 PD-L1 和 VEGF 的双抗。",source:"",url:""},
  {grade:"怎么起作用",text:"一头挡住 PD-L1，一头挡住 VEGF。",source:"",url:""},
  {grade:"你正在看的这项",text:"一线转移性胰腺癌加化疗的试验还没有结果。",source:"ClinicalTrials.gov NCT07255404",url:"https://clinicaltrials.gov/study/NCT07255404"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"ponsegromab",name:"Ponsegromab",maker:"辉瑞",level:"二期有数字",priority:14,
 aliases:["ponsegromab","pf-06946860"],
 items:[
  {grade:"这味药",text:"挡住 GDF-15 的抗体。",source:"",url:""},
  {grade:"怎么起作用",text:"看的是恶病质时的体重，不是肿瘤缩小。",source:"",url:""},
  {grade:"已经有的数据",text:"这不是肿瘤缓解率。癌症恶病质、GDF-15 升高的 187 人里约 32% 是胰腺癌，但体重没有按癌种分开报。400 mg 对比安慰剂，12 周体重多增加的中位数是 2.81 公斤。专门看转移性胰腺癌肿瘤缓解的 NCT06989437 还没有结果。",source:"Groarke 等，NEJM，2024（NCT05546476）",url:"https://www.nejm.org/doi/full/10.1056/NEJMoa2409515"},
  {grade:"你正在看的这项",text:"癌症恶病质、GDF-15 升高的 187 人里约 32% 是胰腺癌，但体重没有按癌种分开报。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"temab-a",name:"Telisotuzumab adizutecan（ABBV-400，Temab-A）",maker:"艾伯维",level:"一期有数字",priority:22,
 aliases:["telisotuzumab adizutecan","abbv-400","temab-a"],
 items:[
  {grade:"这味药",text:"c-Met 抗体偶联药。",source:"",url:""},
  {grade:"怎么起作用",text:"把化疗药带到有 c-Met 的细胞上。",source:"",url:""},
  {grade:"已经有的数据",text:"经一线治疗后进展的晚期胰腺癌 42 人，单药。确认客观缓解率全体 24%；一线用过吉西他滨加白蛋白紫杉醇的人是 40%。数据截止时缓解持续时间和总生存还不成熟。",source:"Annals of Oncology 2025 摘要 2214MO，NCT06084481，数据截止 2024-11-06",url:"https://www.annalsofoncology.org/article/S0923-7534(25)03751-2/pdf"},
  {grade:"你正在看的这项",text:"经一线治疗后进展的晚期胰腺癌 42 人，单药。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"tqb2868",name:"TQB2868",maker:"正大天晴（中国生物制药）",level:"二期有数字",priority:18,
 aliases:["tqb2868"],
 items:[
  {grade:"这味药",text:"PD-1/TGF-β 双功能融合蛋白。",source:"",url:""},
  {grade:"怎么起作用",text:"下面是加安罗替尼和化疗的单臂数字，没有对照。",source:"",url:""},
  {grade:"已经有的数据",text:"一线转移性胰腺癌，加安罗替尼、吉西他滨和白蛋白紫杉醇，单臂。40 人入组，36 人可评估：客观缓解率 63.9%（23/36），疾病控制率 100%，中位随访 5.9 个月，6 个月无进展生存率 86%，中位总生存还没达到。没有对照，随访还短。",source:"港交所公告及 ASCO 2025 摘要，NCT06767813，随访至 2025-01",url:"https://www.hkexnews.hk/listedco/listconews/sehk/2025/0529/2025052901503_c.pdf"},
  {grade:"你正在看的这项",text:"一线转移性胰腺癌，加安罗替尼、吉西他滨和白蛋白紫杉醇，单臂。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"xh001",name:"XH001",maker:"新合生物",level:"还没有胰腺癌疗效数字",priority:15,
 aliases:["xh001"],
 items:[
  {grade:"这味药",text:"按这个人的肿瘤做的新抗原疫苗。",source:"",url:""},
  {grade:"怎么起作用",text:"用在手术之后，看会不会复发。",source:"",url:""},
  {grade:"你正在看的这项",text:"还没有生存结果。新闻稿只说安全和能引起免疫反应。",source:"ClinicalTrials.gov NCT06353646",url:"https://clinicaltrials.gov/study/NCT06353646"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{"id": "gfh276", "name": "GFH276", "maker": "劲方医药", "level": "一期有数字", "priority": 24, "aliases": ["gfh276"], "evidenceUpdated": "2026-10-26", "items": [{"grade": "怎么起作用", "text": "GFH276 是活化状态 RAS 的分子胶抑制剂，通过形成复合物阻断下游信号。", "url": "https://www.genfleet.com/en/press_release-123", "source": "GenFleet 2026-10-26"}, {"grade": "已经有的数据", "text": "ESMO 2026 LBA33：GFH276 单药一期 Ia，既往接受治疗的胰腺导管腺癌；40–160 mg 每日一次，61 人至少完成一次治疗后评估。数据截止 2026-09-15，客观缓解率 41.1%，疾病控制率 91.8%；未用过 RAS 抑制剂者客观缓解率 43.1%。新闻稿未说明缓解是否全部确认，未报告中位无进展或总生存，也未单列 G12R。无随机对照，不能当作 GFH276 联合西妥昔单抗、化疗或 GFH375 的结果。", "url": "https://www.genfleet.com/en/press_release-123", "source": "ESMO 2026 LBA33；GenFleet 2026-10-26"}]},
{id:"yl201",name:"YL201（依康坦博妥塔单抗）",maker:"宜联生物",level:"一/二期有数字",priority:21,
 aliases:["yl201","依康坦博妥"],
 items:[
  {grade:"这味药",text:"B7-H3 抗体偶联药。",source:"",url:""},
  {grade:"怎么起作用",text:"把化疗药带到有 B7-H3 的细胞上。",source:"",url:""},
  {grade:"已经有的数据",text:"既往至少一线、且没用过伊立替康的转移性胰腺癌 60 人。确认客观缓解率 28.3%（95% 区间 17.5%–41.4%），疾病控制率 85.0%，中位缓解持续 7.6 个月，中位无进展生存 7.7 个月，中位总生存 14.6 个月。中位随访 9.2 个月，数据截止 2025-12-12。肿瘤 B7-H3 高低和缓解没有看出关系。3 级及以上治疗相关不良反应 43.3%。数字来自会议摘要，不是期刊全文。",source:"会议摘要，宜联生物新闻",url:"https://bydrug.pharmcube.com/news/detail/4c6d44ec09ddecf824e614cd5e474c6f"},
  {grade:"你正在看的这项",text:"既往至少一线、且没用过伊立替康的转移性胰腺癌 60 人。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"glecirasib",name:"格来雷塞（glecirasib，JAB-21822）",maker:"加科思",level:"一/二期有数字",priority:22,
 aliases:["glecirasib","jab-21822"],
 items:[
  {grade:"这味药",text:"加科思的 KRAS G12C 药。",source:"",url:""},
  {grade:"怎么起作用",text:"只覆盖 KRAS G12C，不覆盖 G12R。",source:"",url:""},
  {grade:"已经有的数据",text:"只覆盖 KRAS G12C，不覆盖 G12R。两项一/二期合并，胰腺癌 32 人：确认客观缓解率 46.9%（95% 区间 29.1%–65.3%），中位无进展生存 5.5 个月，中位总生存 10.8 个月。数据截止 2024-06-30。",source:"Li 等，Cancer Communications，2025",url:"https://journal.hep.com.cn/cc/EN/10.1002/cac2.70056"},
  {grade:"你正在看的这项",text:"只覆盖 KRAS G12C，不覆盖 G12R。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"ct041",name:"舒瑞基奥仑赛（CT041，satri-cel）",maker:"科济药业",level:"一期有数字",priority:21,
 aliases:["ct041","satri-cel","舒瑞基"],
 items:[
  {grade:"这味药",text:"用病人自己的 T 细胞做成的 CAR-T。",source:"",url:""},
  {grade:"怎么起作用",text:"改造成能认 CLDN18.2。",source:"",url:""},
  {grade:"已经有的数据",text:"用病人自己的 T 细胞改造成能认 CLDN18.2 的 CAR-T。既往治疗过的转移性胰腺癌，两项早期试验合并 24 人：客观缓解率 16.7%，疾病控制率 70.8%，输注后中位无进展生存 3.3 个月，中位总生存 10.0 个月，中位缓解持续 9.5 个月。",source:"Qi 等，JCO，2024",url:"https://ascopubs.org/doi/10.1200/JCO.23.02314"},
  {grade:"你正在看的这项",text:"用病人自己的 T 细胞改造成能认 CLDN18.2 的 CAR-T。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"dn022150",name:"DN022150",maker:"科维药业（Kvvit）",level:"一/二期有数字",priority:22,
 aliases:["dn022150"],
 items:[
  {grade:"这味药",text:"科维的 KRAS G12D 药。",source:"",url:""},
  {grade:"怎么起作用",text:"只覆盖 KRAS G12D，不覆盖 G12R。",source:"",url:""},
  {grade:"已经有的数据",text:"只覆盖 KRAS G12D，不覆盖 G12R。公司称二线及以后、650 mg 每周静脉给药、可评估 31 人：客观缓解率 41.9%，疾病控制率 93.5%。数据截止 2026-04-05。这是新闻稿，不是期刊全文。三期对照还没有结果。",source:"科维药业新闻，2026-06，ASCO 口头报告",url:"https://kvvit.com/en/news-center/company-news/476"},
  {grade:"你正在看的这项",text:"只覆盖 KRAS G12D，不覆盖 G12R。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"hrs-7058",name:"HRS-7058",maker:"恒瑞医药",level:"一期有数字",priority:18,
 aliases:["hrs-7058"],
 items:[
  {grade:"这味药",text:"恒瑞的 KRAS G12C 药。",source:"",url:""},
  {grade:"怎么起作用",text:"只覆盖 KRAS G12C，不覆盖 G12R。人数太少。",source:"",url:""},
  {grade:"已经有的数据",text:"只覆盖 KRAS G12C，不覆盖 G12R。胰腺癌只有 3 到 4 人，会议摘要和公司新闻的说法不一致。人数太少，看不出真实效果。二期还没有结果。",source:"Annals of Oncology 2025 摘要 914O；恒瑞新闻",url:"https://www.annalsofoncology.org/article/S0923-7534(25)02403-2/pdf"},
  {grade:"你正在看的这项",text:"只覆盖 KRAS G12C，不覆盖 G12R。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"utidelone",name:"优替德隆",maker:"华昊中天",level:"二期有数字",priority:16,
 aliases:["utidelone","优替德隆"],
 items:[
  {grade:"这味药",text:"和吉西他滨一起用的化疗药。",source:"",url:""},
  {grade:"怎么起作用",text:"不是单药。",source:"",url:""},
  {grade:"已经有的数据",text:"和吉西他滨合用，不是单药。不可切除晚期胰腺癌一线，单臂。大会报告时入组 20 人，11 人完成首次评估：3 人部分缓解，客观缓解率 27%，疾病控制率 73%，中位总生存 9.57 个月。人数少，还不是完整分析。",source:"华昊中天新闻，CSCO 2024 报告",url:"https://biostar-pharm.com/news/view/247.html"},
  {grade:"你正在看的这项",text:"和吉西他滨合用，不是单药。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"albumin-docetaxel",name:"多西他赛（白蛋白结合型）",maker:"石药集团",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["白蛋白结合型多西他赛","多西他赛（白蛋白","albumin-bound docetaxel","albumin bound docetaxel"],
 items:[
  {grade:"这味药",text:"白蛋白包着的多西他赛。",source:"",url:""},
  {grade:"怎么起作用",text:"和白蛋白紫杉醇不是同一种药。",source:"",url:""},
  {grade:"你正在看的这项",text:"二期还没有公布结果。",source:"药审中心登记",url:"https://trial.medpath.com/clinical-trial/9ca9d563a5dd5024/ctr20222900-albumin-bound-docetaxel-pancreatic-cancer"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"mitoxantrone-liposome",name:"盐酸米托蒽醌脂质体",maker:"石药集团",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["米托蒽醌脂质体","mitoxantrone hydrochloride liposome"],
 items:[
  {grade:"这味药",text:"脂质体米托蒽醌。",source:"",url:""},
  {grade:"怎么起作用",text:"想让药更多留在肿瘤附近。",source:"",url:""},
  {grade:"你正在看的这项",text:"晚期胰腺癌二期还没有公布结果。",source:"ClinicalTrials.gov NCT05100329",url:"https://clinicaltrials.gov/study/NCT05100329"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"skb571",name:"SKB571",maker:"科伦博泰",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["skb571"],
 items:[
  {grade:"这味药",text:"放在同时试多种药的二期里。",source:"",url:""},
  {grade:"怎么起作用",text:"它是哪一类药，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"还没有公布胰腺癌的结果。",source:"ClinicalTrials.gov NCT07814066",url:"https://clinicaltrials.gov/study/NCT07814066"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"nrt6008",name:"NRT6008（钇-90 炭微球）",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["nrt6008","nrt-6008"],
 items:[
  {grade:"这味药",text:"从血管打到肿瘤附近的放射性微球。",source:"",url:""},
  {grade:"怎么起作用",text:"用钇-90 照射。",source:"",url:""},
  {grade:"你正在看的这项",text:"一期还没有公布肿瘤缩小的数字。",source:"ClinicalTrials.gov NCT06278454",url:"https://clinicaltrials.gov/study/NCT06278454"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"ast-001",name:"AST-001",maker:"艾欣达伟",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["ast-001"],
 items:[
  {grade:"这味药",text:"把多种癌合在一起报过的药。",source:"",url:""},
  {grade:"怎么起作用",text:"一期没有单独的胰腺癌人数或缓解率。",source:"",url:""},
  {grade:"你正在看的这项",text:"一期把多种癌合在一起报，没有单独的胰腺癌人数或缓解率。胰腺癌二期还没有结果。",source:"艾欣达伟新闻；ClinicalTrials.gov NCT06245330",url:"https://www.ascentawits.com/CompanyNews/info.aspx?itemid=1299"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"fapi-imaging",name:"FAPI 显像",maker:"显像剂，不是抗肿瘤药",level:"不是肿瘤疗效",priority:3,
 aliases:["fapi-46","fapi-74","fapi"],
 items:[
  {grade:"这一行是什么",text:"这是正电子显像用的成纤维细胞活化蛋白探针，用来看肿瘤在哪里。登记不是在报一种药缩小胰腺癌的缓解率。",source:"",url:""}
 ]},
{id:"enzyme",name:"胰酶替代",maker:"消化酶补充，不是抗肿瘤药",level:"不是肿瘤疗效",priority:3,
 aliases:["pancreatic enzyme","exocrine pancreatic enzyme","nortase","胰酶","creon","ang003","nhs7108","zenpep"],
 items:[
  {grade:"这一行是什么",text:"这是补充胰酶、帮助消化，不是用来治胰腺癌的药。",source:"",url:""}
 ]},
{id:"indomethacin",name:"吲哚美辛",maker:"已上市的解热镇痛药",level:"不是肿瘤疗效",priority:4,
 aliases:["indomethacin","吲哚美辛","yinduomeixin"],
 items:[
  {grade:"这一行是什么",text:"这些登记用它预防做内镜之后的胰腺炎。不是用来缩小胰腺癌的药。",source:"",url:""}
 ]},
{id:"rehab",name:"运动或术前预康复",maker:"不适用",level:"不是肿瘤疗效",priority:2,
 aliases:["baduanjin","八段锦","prehabilitation","预康复"],
 items:[
  {grade:"这一行是什么",text:"这是运动或手术前康复，不是抗肿瘤药物。",source:"",url:""}
 ]},
{id:"pancreatitis",name:"胰腺炎，不是胰腺癌",maker:"不适用",level:"不是肿瘤疗效",priority:2,
 aliases:["pancreatitis","胰腺炎"],
 exclude:["胰腺癌","pdac","ductal adenocarcinoma","导管腺癌"],
 items:[
  {grade:"这一行是什么",text:"题目是胰腺炎的预防或治疗，不是用来治胰腺导管腺癌的。",source:"",url:""}
 ]},
{id:"pnet",name:"胰腺神经内分泌瘤",maker:"不适用",level:"不是肿瘤疗效",priority:3,
 aliases:["neuroendocrine","神经内分泌","dotatate","dotatoc","octreotide","奥曲肽"],
 exclude:["导管腺癌","pdac","ductal adenocarcinoma"],
 items:[
  {grade:"这一行是什么",text:"这是另一种胰腺肿瘤，神经内分泌瘤，不是导管腺癌。别的瘤种的治疗数字不能拿过来用。",source:"",url:""}
 ]},
{id:"surgery-endo",name:"手术或内镜操作",maker:"不适用",level:"不是肿瘤疗效",priority:2,
 aliases:["pancreaticoduodenectomy","whipple","胰十二指肠","distal pancreatectomy","胰体尾","胰瘘","fistula","ercp","plastic stent","支架","drainage","引流","laparoscopic pancreaticoduodenectomy","pancreatectomy","robotic pancreatoduodenectomy","blumgart","anastomosis","neurolysis","lithotripsy","腰方肌","神经阻滞","ramps","lramps","liver resection","robotic","stent removal","radiofrequency-assisted","endoscopic ultrasonography","duct decompression","动脉切除"],
 exclude:["gemcitabine","吉西他滨","paclitaxel","紫杉","pembrolizumab","nivolumab","olaparib","folfirinox","oxaliplatin","irinotecan","fluorouracil","氟尿","capecitabine","卡培他滨","替吉奥","单抗","替尼","疫苗","vaccine","car-t","化疗","chemotherapy"],
 items:[
  {grade:"这一行是什么",text:"这是手术方式、吻合、胰瘘、引流、支架或内镜操作，不是一种抗肿瘤药的缓解率。",source:"",url:""}
 ]},
{id:"diabetes-device",name:"糖尿病设备或胰岛",maker:"不适用",level:"不是肿瘤疗效",priority:2,
 aliases:["artificial pancreas","omnipod","control-iq","closed-loop","闭环","胰岛素泵","islet transplant","胰岛","t:slim"],
 exclude:["导管腺癌","pdac","胰腺癌"],
 items:[
  {grade:"这一行是什么",text:"这是糖尿病的胰岛素设备或胰岛移植，不是用来治胰腺导管腺癌的。",source:"",url:""}
 ]},
{id:"supportive",name:"症状、营养、麻醉或康复",maker:"不适用",level:"不是肿瘤疗效",priority:2,
 aliases:["exercise","physical exercise","营养","nutrition","anesthesia","麻醉","music therapy","音乐","lidocaine","利多卡因","ketamine","氯胺酮","remimazolam","hydrocortisone","esketamine","艾司氯胺酮","opioid","hand grip","actigraphy","dietitian","高蛋白"],
 exclude:["抑制剂","inhibitor","car-t","疫苗","vaccine","单抗","替尼"],
 items:[
  {grade:"这一行是什么",text:"这是运动、营养、麻醉或处理症状，不是抗肿瘤药。",source:"",url:""}
 ]},
{id:"sotorasib",name:"索托拉西布（sotorasib）",maker:"安进",level:"一/二期有数字",priority:22,
 aliases:["sotorasib","lumakras","索托拉西"],
 items:[
  {grade:"这味药",text:"安进的 KRAS G12C 药。",source:"",url:""},
  {grade:"怎么起作用",text:"只覆盖 KRAS G12C，不覆盖 G12R。",source:"",url:""},
  {grade:"已经有的数据",text:"只覆盖 KRAS G12C，不覆盖 G12R。既往化疗过的晚期胰腺癌 38 人：中心确认客观缓解率 21%（8 人，95% 区间 10%–37%），中位无进展生存 4.0 个月，中位总生存 6.9 个月。",source:"Strickler 等，NEJM，2023，CodeBreaK 100",url:"https://www.nejm.org/doi/full/10.1056/NEJMoa2208470"},
  {grade:"你正在看的这项",text:"只覆盖 KRAS G12C，不覆盖 G12R。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"napabucasin",name:"GB201（napabucasin）",maker:"住友旗下 Boston Biomedical。国内试验名叫 GB201，申办方是 1Globe。",level:"三期未成功",priority:20,
 aliases:["napabucasin","bbi-608","gb201"],
 items:[
  {grade:"这味药",text:"口服药。国内这项试验用的名字是 GB201。",source:"ClinicalTrials.gov NCT03721744",url:"https://clinicaltrials.gov/study/NCT03721744"},
  {grade:"怎么起作用",text:"药先不干活。肿瘤里较多的酶 NQO1 把它打开以后，它才主要在肿瘤细胞里起作用。打开之后，细胞内的活性氧变多。活性氧是一类很活泼的分子，太多会把细胞撑坏。肿瘤细胞本来活性氧就偏高，再被抬高，就可能死去。STAT3 是帮助胰腺癌生长、往外侵袭的一条信号。论文认为，活性氧变多之后有可能把这条信号压低。药并不直接粘在 STAT3 上。这是设计时的设想。细胞和小鼠实验里，一类比较不怕化疗的肿瘤干细胞，聚成球的能力被压住，但那不是人体结果。",source:"Bekaii-Saab 等，eClinicalMedicine，2023",url:"https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(23)00074-3/fulltext"},
  {grade:"已经有的数据",text:"一线转移性胰腺癌。一组在吉西他滨加白蛋白紫杉醇之上再加这味药（565 人），另一组只用吉西他滨加白蛋白紫杉醇（569 人）。中位总生存 11.4 对 11.7 个月。没有活得更久，试验因此提前停了。",source:"Bekaii-Saab 等，eClinicalMedicine，2023（CanStem111P）",url:"https://www.thelancet.com/journals/eclinm/article/PIIS2589-5370(23)00074-3/fulltext"},
  {grade:"你正在看的这项",text:"一线化疗失败之后，用 GB201，加上每周紫杉醇和低剂量吉西他滨，看人能不能比当时的标准治疗活得更久。这套用法还没有公布结果。上面那组数字来自另一套用法。",source:"ClinicalTrials.gov NCT03721744；药审中心 CTR20180947",url:"https://clinicaltrials.gov/study/NCT03721744"}
 ]},
{id:"asp3082",name:"ASP3082（setidegrasib）",maker:"安斯泰来",level:"一期有数字",priority:22,
 aliases:["asp3082","setidegrasib"],
 items:[
  {grade:"这味药",text:"安斯泰来的 KRAS G12D 药。",source:"",url:""},
  {grade:"怎么起作用",text:"只覆盖 KRAS G12D，不覆盖 G12R。",source:"",url:""},
  {grade:"已经有的数据",text:"只覆盖 KRAS G12D，不覆盖 G12R。600 mg 单药、二线或三线、至少有一次影像评估的 18 人：确认客观缓解率 27.8%（5 人部分缓解，95% 区间 9.7%–53.5%），疾病控制率 66.7%。数据截止 2025-02-23。一线加 mFOLFIRINOX 只有 5 人可评估、3 人确认部分缓解，人数太少。三期对照还没有结果。数字来自会议摘要，不是期刊全文。",source:"ASCO 摘要，数据截止 2025-02-23",url:"https://exa.ai/library/publication/70fm01zvvpz"},
  {grade:"你正在看的这项",text:"只覆盖 KRAS G12D，不覆盖 G12R。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"qls31905",name:"QLS31905",maker:"齐鲁制药",level:"一/二期有数字",priority:20,
 aliases:["qls31905"],
 items:[
  {grade:"这味药",text:"针对 CLDN18.2 的双特异性抗体。",source:"",url:""},
  {grade:"怎么起作用",text:"只适合肿瘤上有 CLDN18.2 的人。",source:"",url:""},
  {grade:"已经有的数据",text:"一线加吉西他滨和白蛋白紫杉醇，单臂。可评估 82 人：客观缓解率 59.8%（95% 区间 48.3%–70.4%），疾病控制率 89.0%，中位无进展生存 8.74 个月，中位总生存 15.87 个月。数据截止 2025-12-11。这不是和单独化疗对照的三期结果。胃癌的数字没有算进来。数字来自会议摘要，不是期刊全文。",source:"会议摘要，数据截止 2025-12-11",url:"https://exa.ai/library/publication/mk4n66cf5sc"},
  {grade:"你正在看的这项",text:"一线加吉西他滨和白蛋白紫杉醇，单臂。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"ulixertinib",name:"Ulixertinib（BVD-523）",maker:"BioMed Valley",level:"一期有数字",priority:16,
 aliases:["ulixertinib","bvd-523"],
 items:[
  {grade:"这味药",text:"和吉西他滨、白蛋白紫杉醇一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"不是单药。可评估只有 5 人。",source:"",url:""},
  {grade:"已经有的数据",text:"和吉西他滨、白蛋白紫杉醇合用，不是单药。未治疗的转移性胰腺癌。可评估只有 5 人：1 人部分缓解。做了三药的 15 人中位无进展生存 5.46 个月、中位总生存 12.23 个月。因为耐受差提前停了。看不出比单用化疗更好。",source:"Grierson 等，Oncologist，2023",url:"https://pubmed.ncbi.nlm.nih.gov/36427020/"},
  {grade:"你正在看的这项",text:"和吉西他滨、白蛋白紫杉醇合用，不是单药。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"cobimetinib",name:"考比替尼",maker:"罗氏 / Exelixis",level:"二期有数字",priority:15,
 aliases:["cobimetinib","考比替尼"],
 items:[
  {grade:"这味药",text:"和免疫药一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"不是单药。",source:"",url:""},
  {grade:"已经有的数据",text:"不是单药。既往治疗过的胰腺癌里，纳武利尤单抗加伊匹木单抗再加考比替尼 30 人，研究者评估客观缓解率 6.7%（2/30）。另一项里，阿替利珠单抗加考比替尼：二线 14 人客观缓解率 0，三线 14 人里 2 人部分缓解（14.3%）。",source:"Callahan 等，JITC，2024；MORPHEUS-PDAC，The Oncologist，2026",url:"https://jitc.bmj.com/content/12/2/e007883"},
  {grade:"你正在看的这项",text:"上面的数字是和免疫药一起用，不是考比替尼单药。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"oncosil",name:"OncoSil（磷-32 微粒）",maker:"OncoSil Medical",level:"二期有数字",priority:14,
 aliases:["oncosil","32p microparticle","phosphorus-32","磷-32"],
 items:[
  {grade:"这味药",text:"打进肿瘤里的磷-32 微粒。",source:"",url:""},
  {grade:"怎么起作用",text:"必须和化疗一起用，不是代替化疗。",source:"",url:""},
  {grade:"已经有的数据",text:"瘤内放疗微粒，必须和化疗一起用，不是代替化疗。不可切除局部晚期、植入成功 42 人：客观缓解率 31%（95% 区间 18%–47%），16 周局部控制率 90.5%，中位总生存 16.0 个月。单臂，没有同期对照。",source:"Annals of Oncology 摘要 O-1，PanCO",url:"https://www.annalsofoncology.org/article/S0923-7534(20)39353-4/fulltext"},
  {grade:"你正在看的这项",text:"瘤内放疗微粒，必须和化疗一起用，不是代替化疗。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"paclitaxel-micelle",name:"紫杉醇聚合物胶束",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["paclitaxel polymeric micelles","紫杉醇聚合物胶束"],
 items:[
  {grade:"这味药",text:"包在聚合物胶束里的紫杉醇。",source:"",url:""},
  {grade:"怎么起作用",text:"和白蛋白紫杉醇不是同一种制剂。",source:"",url:""},
  {grade:"你正在看的这项",text:"和吉西他滨合用，对照是吉西他滨加白蛋白紫杉醇。这项三期自己的结果还没出。",source:"药审中心登记",url:"https://trial.medpath.com/clinical-trial/770ab999fd3bce89/ctr20244818-paclitaxel-polymeric-micelles-gemcitabine-metastatic-pancreatic-cancer"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"ibi363",name:"IBI363",maker:"信达生物",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["ibi363"],
 items:[
  {grade:"这味药",text:"PD-1 抗体带上白介素-2。",source:"",url:""},
  {grade:"怎么起作用",text:"想松开 T 细胞的刹车，并推动它。",source:"",url:""},
  {grade:"你正在看的这项",text:"二线加化疗的试验还没有结果。",source:"ClinicalTrials.gov NCT07342725",url:"https://clinicaltrials.gov/study/NCT07342725"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"lorigerlimab",name:"Lorigerlimab（MGD019）",maker:"MacroGenics",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["lorigerlimab","mgd019"],
 items:[
  {grade:"这味药",text:"同时挡住 PD-1 和 CTLA-4 的药。",source:"",url:""},
  {grade:"怎么起作用",text:"松开 T 细胞上的两处刹车。",source:"",url:""},
  {grade:"你正在看的这项",text:"这项只收 BRCA1/2、PALB2 或 RAD51C/D 天生带的有害变异（验血能查）的胰腺癌。还没有结果。没有这些变异的人进不了这组。",source:"ClinicalTrials.gov NCT07565155",url:"https://clinicaltrials.gov/study/NCT07565155"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"inavolisib",name:"Inavolisib",maker:"罗氏",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["inavolisib"],
 items:[
  {grade:"这味药",text:"已上市用于乳腺癌里的 PI3K 改变。",source:"",url:""},
  {grade:"怎么起作用",text:"不是胰腺癌的治疗。胰腺癌里还没有肿瘤缩小或生存的数字。",source:"",url:""},
  {grade:"已经有的数据",text:"已上市用于乳腺癌里的 PI3K 改变，不是胰腺癌。胰腺癌里还没有公布肿瘤缩小或生存的数字。",source:"公开登记",url:"https://clinicaltrials.gov/study/NCT07694973"},
  {grade:"你正在看的这项",text:"胰腺癌里还没有公布肿瘤缩小或生存的数字。已经上市的是乳腺癌里的 PI3K 改变。",source:"",url:""}
 ]},
{id:"balixafortide",name:"Balixafortide",maker:"Polyphor / Spexis",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["balixafortide"],
 items:[
  {grade:"这味药",text:"挡住 CXCR4 的药。",source:"",url:""},
  {grade:"怎么起作用",text:"和 PD-L1 抗体一起试。",source:"",url:""},
  {grade:"你正在看的这项",text:"一期还没有结果。",source:"ClinicalTrials.gov NCT06981806",url:"https://clinicaltrials.gov/study/NCT06981806"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"odetiglucan",name:"Odetiglucan",maker:"Hibercell",level:"一期有数字",priority:12,
 aliases:["odetiglucan"],
 items:[
  {grade:"这味药",text:"维持治疗里用的药。",source:"",url:""},
  {grade:"怎么起作用",text:"和 CD40 抗体一起用，不是单药。人数太少。",source:"",url:""},
  {grade:"已经有的数据",text:"一线化疗没进展之后的维持治疗，加 CD40 抗体，不是单药。可评估 4 人：1 人部分缓解，1 人稳定，2 人进展。研究因经费提前关闭。人数太少。",source:"AACR 摘要 PR-10",url:"https://aacrjournals.org/cancerres/article/84/17_Supplement_2/PR-10/747743/Abstract-PR-10-Phase-1b-study-of-maintenance"},
  {grade:"你正在看的这项",text:"一线化疗没进展之后的维持治疗，加 CD40 抗体，不是单药。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"rnk08954",name:"RNK08954",maker:"冉诺医药（Ranok）",level:"一期有数字",priority:20,
 aliases:["rnk08954"],
 items:[
  {grade:"这味药",text:"只覆盖 KRAS G12D 的药。",source:"",url:""},
  {grade:"怎么起作用",text:"不覆盖 G12R。人数少。",source:"",url:""},
  {grade:"已经有的数据",text:"只覆盖 KRAS G12D，不覆盖 G12R。可评估的胰腺癌 13 人：2 人部分缓解、9 人稳定，疾病控制率 84.6%。1000–1200 mg 这 6 人里客观缓解率 33%（2 人部分缓解，其中 1 人尚未确认），疾病控制率 100%。中位随访 4.85 个月。人数少，含未确认缓解。",source:"Cancer Discovery，2026",url:"https://aacrjournals.org/cancerdiscovery/article/16/5/895/784410/Preclinical-Characterization-and-Clinical-Activity"},
  {grade:"你正在看的这项",text:"只覆盖 KRAS G12D，不覆盖 G12R。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"cisplatin-brca",name:"顺铂",maker:"多家生产",level:"二期有数字",priority:16,
 aliases:["cisplatin","顺铂"],
 items:[
  {grade:"这味药",text:"已有的化疗药顺铂。",source:"",url:""},
  {grade:"怎么起作用",text:"这组人都带有天生的 BRCA1/2 或 PALB2 突变。没有这些突变，不能看这组数字。",source:"",url:""},
  {grade:"已经有的数据",text:"这组人都带有天生的 BRCA1/2 或 PALB2 突变。没有这些突变的人，不能看这组数字。吉西他滨加顺铂、不加维利帕尼：客观缓解率 65.2%，中位无进展生存 9.7 个月，中位总生存 16.4 个月。加上维利帕尼缓解率 74.1%，生存没有更好，血液毒性更重。可评估共 50 人。",source:"O'Reilly 等，JCO，2020",url:"https://ascopubs.org/doi/10.1200/JCO.19.02931"},
  {grade:"你正在看的这项",text:"这组人都带有天生的 BRCA1/2 或 PALB2 突变。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"binimetinib",name:"Binimetinib（康奈非尼合用）",maker:"辉瑞；康奈非尼为 Pierre Fabre",level:"二期有数字",priority:16,
 aliases:["binimetinib","encorafenib"],
 items:[
  {grade:"这味药",text:"和康奈非尼一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"只适用于 BRAF V600E，不适用于 KRAS 突变。",source:"",url:""},
  {grade:"已经有的数据",text:"只适用于体细胞 BRAF V600E，不适用于 KRAS 突变。康奈非尼加 binimetinib，二线及以后。入组 6 人后因入组慢停止：24 周客观缓解率 33%，总客观缓解率 50%，中位无进展生存 7.1 个月，中位总生存 15.0 个月。",source:"JCO 2026 摘要 4219",url:"https://ascopubs.org/doi/10.1200/JCO.2026.44.16_suppl.4219"},
  {grade:"你正在看的这项",text:"只适用于体细胞 BRAF V600E，不适用于 KRAS 突变。这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。",source:"",url:""}
 ]},
{id:"iexosome",name:"KRAS G12D siRNA 外泌体",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["kras g12d sirna","iexokras","mesenchymal stromal cells-derived exosomes"],
 items:[
  {grade:"这味药",text:"只针对 KRAS G12D。",source:"",url:""},
  {grade:"怎么起作用",text:"一期没有给出客观缓解率。",source:"",url:""},
  {grade:"已经有的数据",text:"只针对 KRAS G12D。一期说部分人疾病稳定。摘要没有给出客观缓解率。",source:"Nature Communications，2025，NCT03608631",url:"https://www.nature.com/articles/s41467-025-63718-2"},
  {grade:"你正在看的这项",text:"一期摘要没有给出客观缓解率。你看到的这一行自己的结果还没出来。",source:"",url:""}
 ]},
{id:"namodenoson",name:"Namodenoson（CF102）",maker:"Can-Fite",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["namodenoson","cf102"],
 items:[
  {grade:"这味药",text:"公司新闻稿里的二期药。",source:"",url:""},
  {grade:"怎么起作用",text:"新闻稿没有给出客观缓解率或生存中位数。",source:"",url:""},
  {grade:"已经有的数据",text:"公司 2026-04-30 新闻稿写晚期胰腺癌二期 20 人可评估，主要终点安全性达到，约 35% 的人仍在用药。新闻稿没有给出客观缓解率或生存中位数。",source:"Can-Fite 新闻稿，2026-04-30",url:"https://ir.canfite.com/news-events/press-releases/detail/1110/can-fite-reports-positive-phase-2a-data-with-namodenoson-in"},
  {grade:"你正在看的这项",text:"新闻稿没有给出客观缓解率或生存中位数。你看到的这一行如果就是那项二期，以登记公布的数字为准。",source:"",url:""}
 ]},
{id:"gta182",name:"GTA182",maker:"Apeiron Therapeutics",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["gta182"],
 items:[
  {grade:"这味药",text:"只和肿瘤里 MTAP 基因缺失的人有关。",source:"",url:""},
  {grade:"怎么起作用",text:"一期没有单独的胰腺癌人数或缓解率。",source:"",url:""},
  {grade:"已经有的数据",text:"只和肿瘤里 MTAP 基因缺失的人有关。一期把多种癌合在一起报，没有单独的胰腺癌人数或缓解率。",source:"Annals of Oncology 2025 摘要 LBA14",url:"https://www.annalsofoncology.org/article/S0923-7534(25)05631-5/fulltext"},
  {grade:"你正在看的这项",text:"一期没有单独的胰腺癌人数或缓解率。你看到的这一行自己的结果还没出来。",source:"",url:""}
 ]},
{id:"bt5528",name:"Nuzefatide pevedotin（BT5528）",maker:"Bicycle Therapeutics",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["bt5528","nuzefatide"],
 items:[
  {grade:"这味药",text:"公司公布过别的癌的缓解率。",source:"",url:""},
  {grade:"怎么起作用",text:"尿路上皮癌的数字不能用来看胰腺癌。",source:"",url:""},
  {grade:"你正在看的这项",text:"公司公布的确认缓解率是尿路上皮癌。胰腺癌这项二期还没有病人的缓解率。",source:"ClinicalTrials.gov NCT07450859；公司新闻 2026",url:"https://clinicaltrials.gov/study/NCT07450859"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"blu-924",name:"BLU-924（SAR449336）",maker:"Blueprint / 赛诺菲",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["blu-924","sar449336"],
 items:[
  {grade:"这味药",text:"针对多种KRAS亚型的药。",source:"",url:""},
  {grade:"怎么起作用",text:"BLU-924（SAR449336）是泛KRAS抑制剂，针对多个KRAS突变亚型。",source:"ClinicalTrials.gov：BLU-924官方登记说明",url:"https://clinicaltrials.gov/study/NCT07629960"},
  {grade:"你正在看的这项",text:"一期还没有结果。",source:"ClinicalTrials.gov NCT07629960",url:"https://clinicaltrials.gov/study/NCT07629960"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"vilastobart",name:"Vilastobart（XTX101）",maker:"Xilio",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["vilastobart","xtx101"],
 items:[
  {grade:"这味药",text:"Vilastobart。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"专门的二期只收 BRCA1/2 或 PALB2 缺陷，NCT07765836 还没有结果。",source:"ClinicalTrials.gov NCT07765836",url:"https://clinicaltrials.gov/study/NCT07765836"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"samuraciclib",name:"Samuraciclib",maker:"Carrick Therapeutics",level:"还没有胰腺癌疗效数字",priority:13,
 aliases:["samuraciclib"],
 items:[
  {grade:"这味药",text:"CDK7 抑制剂。",source:"",url:""},
  {grade:"怎么起作用",text:"CDK7 抑制剂，和吉西他滨、白蛋白紫杉醇一起用。",source:"",url:""},
  {grade:"你正在看的这项",text:"只针对 basal-like 这一类胰腺癌，不是所有人。还没有结果。",source:"ClinicalTrials.gov NCT07665684",url:"https://clinicaltrials.gov/study/NCT07665684"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"anakinra",name:"阿那白滞素（anakinra）",maker:"Sobi",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["anakinra","阿那白滞"],
 items:[
  {grade:"这味药",text:"已上市的白介素-1 受体拮抗剂。",source:"",url:""},
  {grade:"怎么起作用",text:"用来减轻炎症，不是直接缩小肿瘤的药。",source:"",url:""},
  {grade:"你正在看的这项",text:"和化疗一起用于胰腺癌的登记，还没有公布肿瘤缩小或生存的数字。",source:"公开登记",url:"https://clinicaltrials.gov/study/NCT02550327"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"huaier",name:"槐耳颗粒",maker:"启东盖天力",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["huaier","槐耳"],
 items:[
  {grade:"这味药",text:"中成药槐耳颗粒。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"还没有可引用的胰腺癌肿瘤缩小或生存对比。",source:"公开登记",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"aguix",name:"AGuIX",maker:"NH TherAguix",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["aguix"],
 items:[
  {grade:"这味药",text:"含钆的纳米颗粒。",source:"",url:""},
  {grade:"怎么起作用",text:"放疗时想让肿瘤更吃射线。",source:"",url:""},
  {grade:"你正在看的这项",text:"还没有公布胰腺癌的肿瘤缩小数字。",source:"公开登记",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"asp2138",name:"ASP2138",maker:"安斯泰来",level:"还没有胰腺癌疗效数字",priority:14,
 aliases:["asp2138"],
 items:[
  {grade:"这味药",text:"把 T 细胞拉到肿瘤细胞上的药。",source:"",url:""},
  {grade:"怎么起作用",text:"认的是肿瘤细胞上的 CLDN18.2。",source:"",url:""},
  {grade:"你正在看的这项",text:"胰腺癌里还没有公布肿瘤缩小或生存的数字。",source:"公开登记",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"alpelisib",name:"Alpelisib",maker:"诺华",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["alpelisib"],
 items:[
  {grade:"这味药",text:"已上市用于乳腺癌里 PI3K 改变的药。",source:"",url:""},
  {grade:"怎么起作用",text:"不是胰腺癌的治疗。",source:"",url:""},
  {grade:"你正在看的这项",text:"这项登记没有报告它治胰腺癌的效果。",source:"公开登记",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"da-3501",name:"DA-3501",maker:"东亚 ST",level:"还没有胰腺癌疗效数字",priority:13,
 aliases:["da-3501","da 3501"],
 items:[
  {grade:"这味药",text:"和 CLDN18.2 有关的药。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"一期还没有结果。",source:"ClinicalTrials.gov NCT07481357",url:"https://clinicaltrials.gov/study/NCT07481357"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"azeliragon",name:"Azeliragon（TTP488）",maker:"vTv Therapeutics",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["azeliragon","ttp488"],
 items:[
  {grade:"这味药",text:"原本研究阿尔茨海默病的药。",source:"",url:""},
  {grade:"怎么起作用",text:"挡住 RAGE。",source:"",url:""},
  {grade:"你正在看的这项",text:"胰腺癌里还没有公布肿瘤缩小的数字。",source:"公开登记",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"cell-vaccine",name:"细胞治疗或疫苗",maker:"各产品不同",level:"还没有胰腺癌疗效数字",priority:8,
 aliases:["car-t","car-nk","car nk","car-m","tcr-t","tcr","疫苗","vaccine","neoantigen","新抗原","溶瘤","oncolytic","tumor infiltrating","til","dendritic","inkt","adenovirus","bgt007","mt-601"],
 exclude:["blood sample","ct041","舒瑞基"],
 items:[
  {grade:"这味药",text:"细胞治疗、疫苗或溶瘤病毒，不是同一种药。",source:"",url:""},
  {grade:"怎么起作用",text:"每种产品要单独看。",source:"",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"这一行自己的肿瘤缩小或生存结果还没有公布。",source:"",url:""}
 ]},
{id:"tdm1",name:"恩美曲妥珠单抗（T-DM1）",maker:"罗氏",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["trastuzumab emtansine","t-dm1","恩美曲妥珠"],
 items:[
  {grade:"这味药",text:"HER2 抗体偶联药。",source:"",url:""},
  {grade:"怎么起作用",text:"把化疗药带到 HER2 上。",source:"",url:""},
  {grade:"你正在看的这项",text:"乳腺癌里的缓解率，不能用来看胰腺癌。胰腺癌这项研究还没有公布结果。",source:"公开登记",url:"https://clinicaltrials.gov/study/NCT07825753"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"liposome-ii",name:"伊立替康脂质体（未标明是 Onivyde）",maker:"登记没写明是哪一种",level:"还没有胰腺癌疗效数字",priority:11,
 aliases:["irinotecan liposome"],
 exclude:["onivyde","nal-iri","hr070803","越优力"],
 items:[
  {grade:"这味药",text:"脂质体伊立替康。",source:"",url:""},
  {grade:"怎么起作用",text:"登记没有写明是 Onivyde 还是越优力。",source:"",url:""},
  {grade:"你正在看的这项",text:"已经公布的生存数字只属于写明药名的那一个产品。这里还没有自己的对照结果。",source:"公开登记",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"fap-2286",name:"FAP-2286 放射性配体",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:12,
 aliases:["fap-2286","177lu-fap"],
 items:[
  {grade:"这味药",text:"认 FAP 的放射性治疗药。",source:"",url:""},
  {grade:"怎么起作用",text:"认成纤维细胞活化蛋白 FAP，不是做 PET 显像的那种。",source:"",url:""},
  {grade:"你正在看的这项",text:"比较镥-177 和锕-225 的登记还没有公布胰腺癌的结果。",source:"公开登记",url:""},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"cht102",name:"CHT102",maker:"天津医科大学肿瘤医院与南京卡姆豪（Calmhome）",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["cht102"],
 items:[
  {grade:"这味药",text:"用别人捐献的 T 细胞做成的 CAR-T。",source:"",url:""},
  {grade:"怎么起作用",text:"改造成能认间皮素，不需要配病人自己的细胞。",source:"ClinicalTrials.gov NCT06760364",url:"https://clinicaltrials.gov/study/NCT06760364"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"只收间皮素阳性、标准治疗失败或不能耐受的晚期胰腺癌，从动脉输进去。单臂一期。结果还没有公布。",source:"ClinicalTrials.gov NCT06760364",url:"https://clinicaltrials.gov/study/NCT06760364"}
 ]},
{id:"htmc0435",name:"HTMC0435",maker:"上海汇伦",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["htmc0435","htmc-0435"],
 items:[
  {grade:"这味药",text:"抑制 PARP1 和 PARP2 的口服片。",source:"",url:""},
  {grade:"怎么起作用",text:"它同时抑制 PARP1 和 PARP2，用来挡住肿瘤细胞修 DNA。",source:"智慧芽药物页；药审中心 CTR20230616",url:"https://synapse.zhihuiya.com/drug/e2742371454b42deba355f9757ce786b"},
  {grade:"已经有的数据",text:"本页暂未收录可核实的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"二期研究 HTMC0435 单药治疗晚期胰腺癌的初步效果。本项胰腺癌方案的疗效数字尚待核实。",source:"药审中心 CTR20230616",url:"http://www.chinadrugtrials.org.cn/clinicaltrials.searchlist.dhtml?keywords=CTR20230616"}
 ]},
{id:"ainuosaite",name:"艾诺赛特",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["艾诺赛特"],
 items:[
  {grade:"这味药",text:"给已经没有标准治疗可用的晚期胰腺癌口服。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"先找能耐受的剂量，再看肿瘤有没有变化。它怎么起作用，公开资料里还没说。还没有结果。",source:"药审中心 CTR20220062",url:"http://www.chinadrugtrials.org.cn/clinicaltrials.searchlist.dhtml?keywords=CTR20220062"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"gkl-006",name:"GKL-006",maker:"Gene Key，中文名未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["gkl-006"],
 items:[
  {grade:"这味药",text:"注射液，一期看晚期胰腺癌用了是否安全、有没有初步效果。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"它是哪类药，公开资料还没说清。",source:"ClinicalTrials.gov NCT07777211：胰腺癌联合 AG 登记，不能用 Allo 产品代替本产品机制",url:"https://clinicaltrials.gov/study/NCT07777211"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"mr001",name:"MR001",maker:"Shenzhen Maijiarui Biotechnology",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["mr001"],
 items:[
  {grade:"这味药",text:"双特异性抗体，加标准化疗。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"本项胰腺癌研究的具体用法、入组人群和结果，需要分别核对登记与对应资料。",source:"ClinicalTrials.gov NCT07235202",url:"https://clinicaltrials.gov/study/NCT07235202"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"agen2373",name:"AGEN2373",maker:"Agenus",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["agen2373"],
 items:[
  {grade:"这味药",text:"激活 CD137（4-1BB）的抗体，想推动肿瘤里的 T 细胞和 NK 细胞。",source:"",url:""},
  {grade:"怎么起作用",text:"想推动肿瘤里的 T 细胞和 NK 细胞。",source:"ASCO 2023 摘要 2524；登记 NCT06782932",url:"https://ascopubs.org/doi/10.1200/JCO.2023.41.16_suppl.2524"},
  {grade:"已经有的数据",text:"混合瘤种的单药一期有过缓解，那不是胰腺癌的数字。",source:"ASCO 2023 摘要 2524；登记 NCT06782932",url:"https://ascopubs.org/doi/10.1200/JCO.2023.41.16_suppl.2524"},
  {grade:"你正在看的这项",text:"把它和新辅助的 GVAX 疫苗、PD-1 抗体一起用，对象是还能手术的人。胰腺癌。",source:"ASCO 2023 摘要 2524；登记 NCT06782932",url:"https://ascopubs.org/doi/10.1200/JCO.2023.41.16_suppl.2524"}
 ]},
{id:"sgm-101",name:"SGM-101",maker:"手术用荧光剂",level:"不是肿瘤疗效",priority:16,
 aliases:["sgm-101"],
 items:[
  {grade:"这一行是什么",text:"对准癌胚抗原 CEA 的荧光染料，手术时帮医生看肿瘤边界。不是用来缩小肿瘤的药，没有客观缓解率这种数字。",source:"ClinicalTrials.gov NCT05984810",url:"https://clinicaltrials.gov/study/NCT05984810"}
 ]},
{id:"ltc004",name:"LTC004",maker:"北京志道生物",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["ltc004"],
 items:[
  {grade:"这味药",text:"重组的白介素-2 类药。",source:"",url:""},
  {grade:"怎么起作用",text:"重组的白介素-2 类药，优先推动 CD8+ T 细胞和 NK 细胞，尽量少推动会压住免疫的那类 T 细胞。胰腺癌这项把它和 MIL-97、化疗一起用于晚期病人。这项还没有公布肿瘤缩小或生存的数字。",source:"ClinicalTrials.gov NCT06255912；志道生物公开资料见 NCT05666635",url:"https://clinicaltrials.gov/study/NCT06255912"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"这一行自己的肿瘤缩小或生存结果还没有公布。",source:"",url:""}
 ]},
{id:"mil-97",name:"MIL-97",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["mil-97"],
 items:[
  {grade:"这味药",text:"和 LTC004、化疗一起用于晚期或转移性胰腺癌。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"它怎么起作用，公开资料里还没说。还没有结果。",source:"ClinicalTrials.gov NCT06255912",url:"https://clinicaltrials.gov/study/NCT06255912"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"ef-009",name:"EF-009",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["ef-009"],
 items:[
  {grade:"这味药",text:"一期到 IIa 期，在胰腺癌里看是否安全、肿瘤有没有变化。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"它怎么起作用，公开资料里还没说。还没有结果。",source:"ClinicalTrials.gov NCT04381130",url:"https://clinicaltrials.gov/study/NCT04381130"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"oatd-02",name:"OATD-02",maker:"Molecure",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["oatd-02"],
 items:[
  {grade:"这味药",text:"口服，同时抑制精氨酸酶 ARG1 和 ARG2。",source:"",url:""},
  {grade:"怎么起作用",text:"肿瘤周围精氨酸被耗掉后，T 细胞和 NK 细胞不容易工作；这味药想把精氨酸补回来。",source:"ClinicalTrials.gov NCT05759923",url:"https://clinicaltrials.gov/study/NCT05759923"},
  {grade:"怎么起作用",text:"非临床试验里，剂量越高，肿瘤生长越慢，精氨酸也升高。这是动物或细胞实验，不是胰腺癌病人的缓解率。",source:"Molecure，ESMO 2023 海报",url:"https://molecure.com/app/uploads/2023/10/ESMO_final_28.09.pdf"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"这一行自己的肿瘤缩小或生存结果还没有公布。",source:"",url:""}
 ]},
{id:"ptm-101",name:"PTM-101",maker:"PanTher Therapeutics",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["ptm-101"],
 items:[
  {grade:"这味药",text:"可吸收的植入物，里面是已有化疗药紫杉醇，放在肿瘤局部，和术前标准化疗一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"化疗药紫杉醇放在肿瘤局部。全身用紫杉醇的数字，不能用来说明这个植入物已经有效。",source:"ClinicalTrials.gov NCT06673017",url:"https://clinicaltrials.gov/study/NCT06673017"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"对象是还没做过全身治疗、交界可切除或局部晚期的胰腺癌。",source:"ClinicalTrials.gov NCT06673017",url:"https://clinicaltrials.gov/study/NCT06673017"}
 ]},
{id:"vrt106",name:"VRT106",maker:"广州威溶特",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["vrt106"],
 items:[
  {grade:"这味药",text:"溶瘤病毒，和化疗一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"病毒选择感染肿瘤细胞并把它裂开，同时想带动免疫。",source:"ClinicalTrials.gov NCT06758544",url:"https://clinicaltrials.gov/study/NCT06758544"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"收可切除胰腺癌。还没有公布肿瘤缩小或生存的数字。",source:"ClinicalTrials.gov NCT06758544",url:"https://clinicaltrials.gov/study/NCT06758544"}
 ]},
{id:"kinisoquin",name:"Kinisoquin",maker:"Quercis Pharma",level:"不是肿瘤疗效",priority:16,
 aliases:["kinisoquin","isoquercetin"],
 items:[
  {grade:"这一行是什么",text:"异槲皮素做成的胶囊，加维生素 C 和维生素 B3。三期比的是转移性或局部晚期胰腺癌在开始化疗后会不会出现血栓，对照是安慰剂。不是看肿瘤缩小。",source:"ClinicalTrials.gov NCT06861088",url:"https://clinicaltrials.gov/study/NCT06861088"}
 ]},
{id:"rr001",name:"RR001",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["rr001"],
 items:[
  {grade:"这味药",text:"和化疗一起，用于局部晚期胰腺癌，从低剂量往上加，看能耐受多少。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"本项胰腺癌研究的具体用法、入组人群和结果，需要分别核对登记与对应资料。",source:"ClinicalTrials.gov NCT06861452",url:"https://clinicaltrials.gov/study/NCT06861452"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"tmt101",name:"TMT101",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["tmt101"],
 items:[
  {grade:"这味药",text:"每周打一针肌肉注射，一期看晚期胰腺癌或肺癌是否耐受。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"它怎么起作用，公开资料里还没说。还没有结果。",source:"ClinicalTrials.gov NCT06861543",url:"https://clinicaltrials.gov/study/NCT06861543"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"br2021",name:"BR2021",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["br2021"],
 items:[
  {grade:"这味药",text:"BR2021 和 BR2021-1，两种制剂。",source:"",url:""},
  {grade:"怎么起作用",text:"比的是生物等效和安全，不是一套新的抗肿瘤机制。",source:"ClinicalTrials.gov NCT06867497",url:"https://clinicaltrials.gov/study/NCT06867497"},
  {grade:"已经有的数据",text:"没有胰腺癌缓解率。",source:"ClinicalTrials.gov NCT06867497",url:"https://clinicaltrials.gov/study/NCT06867497"},
  {grade:"你正在看的这项",text:"比较这两种制剂是否安全、是否生物等效。",source:"ClinicalTrials.gov NCT06867497",url:"https://clinicaltrials.gov/study/NCT06867497"}
 ]},
{id:"bi765049",name:"BI 765049",maker:"勃林格殷格翰",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["bi 765049","bi765049"],
 items:[
  {grade:"这味药",text:"一头认 B7-H6、一头认 CD3 的双抗。",source:"",url:""},
  {grade:"怎么起作用",text:"一头认肿瘤细胞上的 B7-H6，一头认 T 细胞上的 CD3，把 T 细胞拉过去杀肿瘤。",source:"Cancer Immunology Research，2022",url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC9713360/"},
  {grade:"怎么起作用",text:"细胞和动物实验：只杀死带 B7-H6 的胃肠肿瘤细胞，包括胰腺癌细胞。肿瘤缩小，T 细胞进到瘤里，但那不是人体结果。",source:"Cancer Immunology Research，2022",url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC9713360/"},
  {grade:"你正在看的这项",text:"晚期结直肠癌、胃癌或胰腺癌里找能耐受的剂量。申办方已决定停止。没有公布疗效数字。",source:"ClinicalTrials.gov NCT06882746",url:"https://clinicaltrials.gov/study/NCT06882746"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"omo-103",name:"OMO-103",maker:"Peptomyc",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["omo-103","omomyc"],
 items:[
  {grade:"这味药",text:"91 个氨基酸的小蛋白，挡住 MYC。",source:"",url:""},
  {grade:"怎么起作用",text:"MYC 是很多肿瘤里过度活跃、推着癌细胞长的基因。这味药挡住它。",source:"Nature Medicine，2024",url:"https://www.nature.com/articles/s41591-024-02805-1"},
  {grade:"已经有的数据",text:"混合实体瘤 22 人里，可评估的 19 人有 8 人疾病稳定。没有按胰腺癌单独算。这不是胰腺癌的疗效数字。",source:"Nature Medicine，2024",url:"https://www.nature.com/articles/s41591-024-02805-1"},
  {grade:"你正在看的这项",text:"胰腺癌这项看的是药在瘤里的作用，要做活检。",source:"Nature Medicine，2024",url:"https://www.nature.com/articles/s41591-024-02805-1"}
 ]},
{id:"xer-001",name:"XER-001",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["xer-001"],
 items:[
  {grade:"这味药",text:"和放疗一起，用于局部晚期肿瘤，看是否安全、有没有效果。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"它怎么起作用，公开资料里还没说。还没有结果。",source:"ClinicalTrials.gov NCT07157033",url:"https://clinicaltrials.gov/study/NCT07157033"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"jdb153",name:"JDB153",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["jdb153"],
 items:[
  {grade:"这味药",text:"和斯鲁利单抗一起用。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"斯鲁利单抗是 PD-1 抗体，负责松开 T 细胞上的刹车。JDB153 怎么起作用，公开资料里还没说。还没有结果。",source:"ClinicalTrials.gov NCT07175389",url:"https://clinicaltrials.gov/study/NCT07175389"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"imd10",name:"IMD10",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["imd10"],
 items:[
  {grade:"这味药",text:"和伊立替康、奥沙利铂、氟尿嘧啶一起，用于交界可切除或局部晚期胰腺癌。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"本项胰腺癌研究的具体用法、入组人群和结果，需要分别核对登记与对应资料。",source:"ClinicalTrials.gov NCT07325214",url:"https://clinicaltrials.gov/study/NCT07325214"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"al8326",name:"AL8326",maker:"Advenchen Laboratories",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["al8326"],
 items:[
  {grade:"这味药",text:"抑制 Aurora B、VEGFR 和 FGFR 的口服药。",source:"",url:""},
  {grade:"怎么起作用",text:"口服，同时抑制 Aurora B、VEGFR 和 FGFR，想挡住细胞分裂，也想挡住肿瘤长血管。一期收以胰腺癌为主的晚期肿瘤。还没有可引用的胰腺癌缓解率。",source:"美国国家癌症研究所药物词典",url:"https://www.cancer.gov/publications/dictionaries/cancer-drug/def/aurora-b-vegfr-fgfr-inhibitor-al8326"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"这一行自己的肿瘤缩小或生存结果还没有公布。",source:"",url:""}
 ]},
{id:"asp546c",name:"ASP546C",maker:"安斯泰来的编号",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["asp546c"],
 items:[
  {grade:"这味药",text:"只收肿瘤上有 CLDN18.2 的局部晚期或转移性实体瘤。",source:"",url:""},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"你正在看的这项",text:"只收肿瘤上有 CLDN18.2 的局部晚期或转移性实体瘤，和 XNW27011 一起用。它是抗体还是偶联药，公开资料里还没说。不是按 KRAS 突变收的，G12R 对不上入组条件。没有疗效数字。",source:"ClinicalTrials.gov NCT07488676",url:"https://clinicaltrials.gov/study/NCT07488676"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""}
 ]},
{id:"es502",name:"ES502",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["es502"],
 items:[
  {grade:"这味药",text:"让免疫系统认出 RAS G12V 的注射剂。",source:"",url:""},
  {grade:"怎么起作用",text:"它不直接关掉 RAS 蛋白，而是让免疫系统认出带 G12V 的癌细胞。能不能认出要看 HLA 分型，所以要先验。也不覆盖 G12R。",source:"ClinicalTrials.gov NCT07649928",url:"https://clinicaltrials.gov/study/NCT07649928"},
  {grade:"已经有的数据",text:"还没有可引用的胰腺癌肿瘤缩小或生存数字。",source:"",url:""},
  {grade:"你正在看的这项",text:"只收 RAS G12V，而且要做 HLA 分型。结果还没有公布。",source:"ClinicalTrials.gov NCT07649928",url:"https://clinicaltrials.gov/study/NCT07649928"}
 ]},
{id:"k-001",name:"K-001",maker:"未公开",level:"还没有胰腺癌疗效数字",priority:16,
 aliases:["k-001"],
 exclude:["cl-nk","nk-001"],
 items:[
  {grade:"这味药",text:"口服胶囊。通用名是螺旋藻肽聚糖复合物，主要成分是海洋微生物来的肽聚糖。它不是盯着某一个蛋白的靶向药。",source:"ClinicalTrials.gov NCT04183478",url:"https://clinicaltrials.gov/study/NCT04183478"},
  {grade:"怎么起作用",text:"它怎么起作用，公开资料里还没说。",source:"",url:""},
  {grade:"已经有的数据",text:"2021 年一篇预印本，还没在正式期刊发表。晚期胰腺癌 12 人，没有一人肿瘤明显缩小（客观缓解率 0%）；到第 29 天，10 人病情稳定。没有对照，人数少。",source:"Cui 等，Research Square 预印本，2021-04-06",url:""},
  {grade:"你正在看的这项",text:"三线及以后，和最佳支持治疗一起用。这项自己的结果还没有公布。",source:"药审中心 CTR20171139",url:"http://www.chinadrugtrials.org.cn/clinicaltrials.searchlist.dhtml?keywords=CTR20171139"}
 ]},
{id:"peri-support",name:"围手术期、代谢或对症用药",maker:"不适用",level:"不是肿瘤疗效",priority:3,
 aliases:["custodiol","envarsus","letermovir","meropenem","methylprednisolone","bupivacaine","omeprazole","奥美拉唑","tripegfilgrastim","曲拉西利","megestrol","甲地孕酮","propranolol","普萘洛尔","tamoxifen","他莫昔芬","cannabis","大麻","meal replacement","fasting","禁食","dulaglutide","度拉糖肽","mazdutide","玛仕度肽","dorzagliatin","多格列艾汀","pramlintide","semaglutide","司美格鲁肽","strength training","硬膜外","护理方案","aspirin","acetylsalicylic","enoxaparin","tinzaparin","dalteparin","histamine dihydrochloride","nnc0487","cordyceps","通便","medical food","high protein","frailty","preoperative optimisation","antibiotics","corsano","intrathecal","autotransfusion","通便胶囊"],
 items:[
  {grade:"这一行是什么",text:"这些是保存器官、抗病毒、抑酸、升白、增加食欲、止痛、降糖或护理。有的试验把降糖药加到标准治疗里，但没有公布肿瘤缩小的数字。",source:"",url:""}
 ]},
{id:"residual",name:"这一行还没有病人结果",maker:"不适用",level:"不是肿瘤疗效",priority:2,
 aliases:["car27","pancreatosplenectomy","weekly pro","cyst fluid","pyruvate","cure-dm","paln","polyomavirus","abdominal trunk","perfusion phantom","g-glip","g-flip","mitomycin","upfront surgery","islet organoid","fpbmc","ceb-01","oncobind","epsmi","tcmcb07","extracellular dna","thick needle","device arm","shouhui","首荟","endocrine cell","pal-chw","asp-1929","tlfvb","oryz-aspergillus","molecularly tailored","多模态肿瘤","ai决策","检查点抑制剂","complement inhibition","dynamic assessment","bile duct cancer cohort","radiotherapy + gx","随访干预","structured follow-up","mek抑制剂","jm-83","total pancreatectomy","gs","liver resection","tissue sample","surgical resection of both","mrd","neumed","autologous neutro","chemptherapy","crg-002","smad4","动脉切除"],
 exclude:["folfirinox","gemcitabine","吉西他滨","nab-paclitaxel","白蛋白紫杉醇"],
 items:[
  {grade:"这一行是什么",text:"这一行是手术、检查、支持治疗，或只留了一个还没写清的药名。公开资料里还没有胰腺癌病人的肿瘤缩小或生存对比。如果旁边已经有写明药名的说明，看那一张。",source:"公开登记",url:""}
 ]}
]};
(function(){var c=window.__DRUG_EVIDENCE__.drugs.find(function(c){return c.id==="daraxonrasib";});c.evidenceUpdated="2026-10-26";c.items.push({"grade": "已经有的数据", "text": "ESMO 2026 LBA82：RASolute 302 单药对化疗三期的探索性亚组，沿用 2026-02-10 截止数据，并非新随访。总生存风险比：G12D 0.49（95%区间 0.33–0.74），G12V 0.32（0.19–0.54），G12R 0.61（0.29–1.30），Q61 0.37（0.09–1.44），未检出 RAS 突变 0.43（0.09–1.98）。G12R 等区间跨过 1，不能说每个亚组均单独证实有效，也不能把总体生存延长幅度套到某个亚型。", "url": "https://ir.revmed.com/node/13651/pdf", "source": "Revolution Medicines 2026-10-23，ESMO LBA82", "studyIds": ["NCT06625320"]});})();
(function(){var c=window.__DRUG_EVIDENCE__.drugs.find(function(c){return c.id==="gfh375";});c.evidenceUpdated="2026-10-26";c.items.push({"grade": "已经有的数据", "text": "2026-10-15 公司公告新增两组 KRAS G12D 胰腺导管腺癌早期研究，均无随机对照。中国 GFH375 600 mg 每日联合西妥昔单抗，一线 24 人至少一次治疗后评估，截至 2026-09-16，客观缓解率 71%，疾病控制率 100%，21 人仍在治疗；未说明缓解是否全部确认。另一个海外 VS-7375 900 mg 每日单药队列，二线及以后 22 人，截至 2026-10-07，确认客观缓解率 41%，疾病控制率 86%，中位随访 6.4 个月。两组剂量、线数及搭配不同，不可合并，不能作为中国三期结果。", "url": "https://www.genfleet.com/en/press_release-124", "source": "GenFleet 2026-10-15"});})();
window.__DRUG_EVIDENCE__.drugs.push({"id": "intismeran", "name": "Intismeran autogene（mRNA-4157 / V940）", "maker": "Moderna / MSD", "level": "一期有数字", "priority": 18, "aliases": ["intismeran", "mrna-4157", "v940"], "evidenceUpdated": "2026-10-26", "items": [{"grade": "怎么起作用", "text": "按患者肿瘤突变设计的个体化新抗原 mRNA 疫苗，诱导 T 细胞应答。", "source": "Moderna ESMO 2026-10-25 海报3151P", "url": "https://irp.cdn-website.com/89dd0539/files/uploaded/mRNA-4157-P101+Poster_ESMO+2026_Final.pdf"}, {"grade": "已经有的数据", "text": "ESMO 2026 海报 3151P：mRNA-4157-P101 A2 队列，20 名切除后的胰腺导管腺癌患者，个体化 intismeran autogene 疫苗联合 FOLFIRINOX，单臂一期。截止 2026-07-22，中位随访约 17 个月，11 人仍无复发，未报告死亡；这是描述性随访，不是无复发生存率估计或随机对照获益。19/19 可评估者产生免疫应答，不等于 100% 肿瘤缓解。全因 3 级及以上治疗期间不良事件 15/20，归因疫苗者 1/20（疲劳）。无对照，不能判断优于 FOLFIRINOX；不能当作其他癌种、另一种 mRNA 疫苗或后续三期结果。", "source": "Moderna ESMO 2026-10-25 海报3151P", "url": "https://irp.cdn-website.com/89dd0539/files/uploaded/mRNA-4157-P101+Poster_ESMO+2026_Final.pdf"}]});
window.__DRUG_EVIDENCE__.evidenceReview={checked:"2026-10-26",scope:"ESMO 2026：GFH276、TNG462 联合 daraxonrasib、ELI-002 7P、daraxonrasib 亚组、intismeran 胰腺癌队列；另补 GFH375 2026-10-15 公告。另逐项核实 23 项 ADC 摘要；其余大会索引属于候选关联。其他药物保留各条原来源日期。"};
window.__DRUG_EVIDENCE__.drugs.push.apply(window.__DRUG_EVIDENCE__.drugs,[{"id": "tng462", "name": "Vopimetostat（TNG462）", "maker": "Tango Therapeutics", "level": "一/二期有数字", "priority": 25, "aliases": ["tng462", "tng-462", "vopimetostat"], "evidenceUpdated": "2026-10-26", "items": [{"grade": "怎么起作用", "text": "TNG462 是针对 MTAP 缺失背景开发的 PRMT5 抑制剂；下列结果来自与 RAS 抑制剂联合用药。", "url": "https://ir.tangotx.com/news-releases/news-release-details/tango-presents-promising-results-phase-12-study-vopimetostat-and", "source": "Tango 2026-10-23"}, {"grade": "已经有的数据", "text": "ESMO 2026：TNG462（vopimetostat）联合 daraxonrasib，二/三线、MTAP 缺失且 RAS 突变的转移性胰腺导管腺癌。数据截止 2026-08-20，22 人可评估（首次用药距截止至少 14 周），中位随访 7.1 个月；客观缓解率 82%（18/22），截止时 11 人确认、7 人尚未确认，公司称后者随后均确认；疾病控制率 100%，中位无进展生存未达到，9 个月无进展生存率 88%。无随机对照，不能作为单药、其他搭配或一线三期结果。200 mg/100 mg 剂量组安全性 25 人：3 级治疗相关不良事件 40%，无 4/5 级；较高剂量 4 人中 2 人发生剂量限制毒性。", "url": "https://ir.tangotx.com/news-releases/news-release-details/tango-presents-promising-results-phase-12-study-vopimetostat-and", "source": "ESMO 2026；Tango 2026-10-23"}]}, {"id": "eli0027p", "name": "Camupepimut（ELI-002 7P）", "maker": "Elicio Therapeutics", "level": "二期有数字", "priority": 20, "aliases": ["eli-002 7p", "eli0027p", "camupepimut"], "evidenceUpdated": "2026-10-26", "items": [{"grade": "怎么起作用", "text": "ELI-002 7P 是靶向淋巴结的七价突变 KRAS 肽疫苗，诱导 T 细胞免疫反应。", "url": "https://www.nature.com/articles/s41591-026-04734-7", "source": "Nature Medicine 2026-10-23"}, {"grade": "已经有的数据", "text": "ESMO 2026 同期 Nature Medicine：AMPLIFY-7P 随机二期，I–III 期 KRAS 突变胰腺导管腺癌，手术及标准治疗后影像无复发；ELI-002 7P 96 人对观察 48 人。数据截止 2026-04-20，主要无病生存终点未达到：中位无病生存 23.8 对 21.2 个月，风险比 0.85，P=0.5329。事后校正或亚组信号不能替代主要分析；总生存尚不成熟，98.9% 的免疫应答不是肿瘤缓解率。3 级及以上不良事件 10.4% 对 14.6%。不能用于判断晚期转移性患者或 ELI-002 2P 的疗效。", "url": "https://www.nature.com/articles/s41591-026-04734-7", "source": "Nature Medicine 2026-10-23；NCT05726864"}]}]);
window.__DRUG_EVIDENCE__.drugs.push.apply(window.__DRUG_EVIDENCE__.drugs,[{"id": "elraglusib", "structuredEvidence": true, "name": "Elraglusib（9-ING-41）", "maker": "Actuate Therapeutics", "level": "二期有数字", "priority": 30, "aliases": ["elraglusib", "9-ing-41", "9ing41"], "items": [{"grade": "怎么起作用", "text": "Elraglusib 抑制 GSK-3β，研究希望干扰肿瘤生长及对化疗的耐受机制。", "source": "Nature Medicine 2026-04-14", "url": "https://www.nature.com/articles/s41591-026-04327-4"}, {"grade": "已经有的数据", "text": "未经转移期治疗的胰腺导管腺癌，随机二期，Elraglusib 加吉西他滨和白蛋白紫杉醇，对比相同化疗。改良意向治疗人群 155 对 78 人：中位总生存 10.1 对 7.2 个月（风险比 0.62，P=0.01），一年生存率 44.1% 对 22.3%。完整意向治疗分析为 8.9 对 7.2 个月。数据截止 2025-04-27；联合组 3 级及以上不良事件更多，仍需三期验证。这不是单药或加入免疫药后的结果。", "source": "Nature Medicine 2026-04-14，NCT03678883", "url": "https://www.nature.com/articles/s41591-026-04327-4"}]}, {"id": "quemliclustat", "structuredEvidence": true, "name": "Quemliclustat（AB680）", "maker": "Arcus Biosciences", "level": "一期有数字", "priority": 27, "aliases": ["quemliclustat", "ab680", "ab-680"], "items": [{"grade": "怎么起作用", "text": "Quemliclustat 抑制 CD73，减少肿瘤周围具有免疫抑制作用的腺苷。", "source": "Nature Medicine 2026-03-30", "url": "https://www.nature.com/articles/s41591-026-04283-z"}, {"grade": "已经有的数据", "text": "一线转移性胰腺癌，ARC-8 一期 b 期。Quemliclustat 100 mg 加吉西他滨和白蛋白紫杉醇，联合或不联合 zimberelimab 的汇总人群 122 人：确认客观缓解率 29%，中位无进展生存 6.3 个月，中位总生存 15.7 个月。数据截止 2023-06-19。汇总了不同联合用药人群，没有同期单独化疗随机对照，不能据此判断优于化疗；不能当作三期 PRISM-1 的结果。", "source": "Nature Medicine 2026-03-30，NCT04104672", "url": "https://www.nature.com/articles/s41591-026-04283-z"}]}, {"id": "vcn-01", "structuredEvidence": true, "name": "VCN-01（zabilugene almadenorepvec）", "maker": "Theriva Biologics", "level": "二期有数字", "priority": 27, "aliases": ["vcn-01", "vcn01", "zabilugene almadenorepvec"], "items": [{"grade": "怎么起作用", "text": "表达透明质酸酶的溶瘤腺病毒，研究希望通过病毒在肿瘤内复制和改变肿瘤间质，增强联合治疗作用。", "source": "Nature Medicine 2026-09-30", "url": "https://www.nature.com/articles/s41591-026-04705-y"}, {"grade": "已经有的数据", "text": "一线转移性胰腺癌，VIRAGE 随机二期 b 期，VCN-01 加吉西他滨和白蛋白紫杉醇，对比相同化疗。意向治疗人群 53 对 48 人：中位总生存 10.6 对 8.6 个月（风险比 0.69，P=0.196），未达到通常的统计学显著性。完整分析集各 48 人，中位总生存 10.8 对 8.6 个月（P=0.055）；两组客观缓解率未见显著差异。分析人群和预设统计标准需结合原文看，不能概括为已证实延长生存。仍需三期验证。", "source": "Nature Medicine 2026-09-30，NCT05673811", "url": "https://www.nature.com/articles/s41591-026-04705-y"}]}]);
window.__DRUG_EVIDENCE__.drugs.forEach(function(c){
  if(!c.evidenceUpdated)return;
  (c.items||[]).filter(function(it){return /2026-10-(?:15|23|25|26)/.test(it.source||'');}).forEach(function(it){
    if(c.id==='gfh276')it.trialIds=['NCT07198321'];
    else if(c.id==='tng462')it.trialIds=['NCT06922591'];
    else it.contextOnly=true;
  });
});
// ESMO_ADC_2026_BEGIN: reviewed facts only; complete capture/matches stay separate.
(function(programmes){Object.keys(programmes).forEach(function(id){
 var incoming=programmes[id],c=window.__DRUG_EVIDENCE__.drugs.find(function(c){return c.id===id;});
 if(!c){c=Object.assign({},incoming,{items:[]});delete c.mechanism;window.__DRUG_EVIDENCE__.drugs.push(c);}
 c.evidenceUpdated='2026-10-26';
 if(incoming.mechanism)c.items.push(incoming.mechanism);
 incoming.items.forEach(function(item){c.items.push(item);});
});})({"mhb088c": {"items": [{"grade": "已经有的数据", "text": "QLC5508（MHB088C）一/二期，标准治疗失败的胰腺导管腺癌：49 人入组、48 人可评估，客观缓解率 22.9%，疾病控制率 68.8%，中位缓解持续 3.91 个月、中位无进展生存 5.36 个月、中位总生存 8.44 个月。2.0 mg/kg 每两周一次、既往一线失败的 22 人亚组：缓解率 27.3%，中位总生存 9.03 个月。无随机对照；原文未说明全部缓解是否确认。全瘤种安全性为 138 人，3 级及以上治疗相关不良事件 32.6%，不能当作胰腺癌专属发生率。 数据截止：2026-04-07。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=38#presentation-abstract-55991805919613", "source": "ESMO 2026 1053P；2026-10-26 原文核对", "contextOnly": false, "trialIds": ["NCT07102004"]}], "id": "mhb088c", "name": "QLC5508（MHB088C）", "aliases": ["mhb088c", "mhb-088c", "qlc5508"], "level": "一/二期有数字", "priority": 24, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "QLC5508（MHB088C） 是靶向 B7-H3 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 1053P；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=38#presentation-abstract-55991805919613"}}, "disitamab": {"items": [{"grade": "已经有的数据", "text": "HER2 表达（IHC 1+/2+/3+）晚期胰腺癌，单臂二期，27 人分两队列。联合吉西他滨队列：18 人入组、15 人可评估，4 人部分缓解、6 人稳定、5 人进展；既往一线未用吉西他滨或不能耐受非吉西他滨方案。单药后线队列：9 人入组、8 人可评估，0 人缓解、3 人稳定、5 人进展。总人群 4 人发生 3 级治疗相关不良事件。摘要中的 25% 是设计预期缓解率，不是实测结果；尚无 PFS/OS 数字，也没有随机对照。 数据截止：2026-03-24。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=107#presentation-abstract-34492000446269", "source": "ESMO 2026 3145P；2026-10-26 原文核对", "contextOnly": false, "trialIds": ["NCT06233864"]}], "id": "disitamab", "name": "维迪西妥单抗（disitamab vedotin，RC48）", "aliases": ["disitamab vedotin", "rc48", "rc-48", "维迪西妥"], "level": "二期有数字", "priority": 24, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "维迪西妥单抗（disitamab vedotin，RC48） 是靶向 HER2 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 3145P；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=107#presentation-abstract-34492000446269"}}, "ibi3001": {"items": [{"grade": "已经有的数据", "text": "IBI3001 单药一期 Ia：胰腺导管腺癌 6/8 mg/kg 剂量的 13 人队列，中位无进展生存 7.0 个月（46.2% 已发生事件），未单列胰腺癌缓解率。全瘤种 57 人入组、50 人可评估，不能把总体缓解率或 8 人生物标志物阳性组的 87.5% 缓解率当作这 13 人的结果。全瘤种安全性 57 人，3 级及以上治疗相关不良事件 47.4%，无对照。 数据截止：2026-03-31。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=57#presentation-abstract-7497740069338", "source": "ESMO 2026 1001O；2026-10-26 原文核对", "contextOnly": false, "trialIds": ["NCT06349408"]}], "id": "ibi3001", "name": "IBI3001", "aliases": ["ibi3001"], "level": "一期有数字", "priority": 24, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "IBI3001 是靶向 EGFR × B7-H3 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 1001O；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=57#presentation-abstract-7497740069338"}}, "cm518d1": {"items": [{"grade": "其他癌种数据", "text": "CM518D1 首次人体一/二期：84 人入组，其中结直肠癌 71 人、胃/胃食管交界癌 10 人、胰腺癌 3 人。疗效仅单列可评估结直肠癌人群；未给出这 3 名胰腺癌患者的缓解率或生存结果。不能将结直肠癌剂量组的缓解率套到胰腺癌。 数据截止：2026-05-08。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-75081020977173", "source": "ESMO 2026 1015P；2026-10-26 原文核对", "contextOnly": true}], "id": "cm518d1", "name": "CM518D1", "aliases": ["cm518d1"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "CM518D1 是靶向 CDH17 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 1015P；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-75081020977173"}}, "yl211": {"items": [{"grade": "其他癌种数据", "text": "YL211 单药一期递增，全瘤种 27 人，23 人可评估，客观缓解率 13.0%、疾病控制率 87%；其中结直肠癌 14 人缓解率 21.4%。未单列胰腺癌队列结果。全瘤种 3 级及以上治疗相关不良事件 37.0%，4 人发生剂量限制毒性。以上不是胰腺癌疗效。 数据截止：2026-04-14。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-61921483294026", "source": "ESMO 2026 1017P；2026-10-26 原文核对", "contextOnly": true}], "id": "yl211", "name": "YL211", "aliases": ["yl211"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "YL211 是靶向 c-Met 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 1017P；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-61921483294026"}}, "obi992": {"items": [{"grade": "其他癌种数据", "text": "OBI-992 首次人体递增，全瘤种 15 人，未确认客观缓解率 20%（3/15），疾病控制率 53%，中位随访仅 1.74 个月。未单列胰腺癌结果；RP2D 暂定 6 mg/kg 每三周一次，不能把混合瘤种结果当作胰腺癌效果。 数据截止：2025-12-29。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-85541257710032", "source": "ESMO 2026 1018P；2026-10-26 原文核对", "contextOnly": true}], "id": "obi992", "name": "OBI-992", "aliases": ["obi-992", "obi992"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "OBI-992 是靶向 TROP2 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 1018P；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-85541257710032"}}, "yl201": {"items": [{"grade": "安全性数据", "text": "YL201（tambotatug pelitecan）一期/二期跨瘤种肺炎分析：723 人（其中胰腺癌 76 人）中 22 人发生间质性肺病，约 3%；13 人为 1/2 级、9 人为 3 级，无 4/5 级；7 人因肺病永久停药。摘要没有给出胰腺癌专属肺病发生率，也没有新的胰腺癌缓解率。该安全性分析不能替代具体剂量、队列的疗效数据。 数据截止：2026-03-16。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=39#presentation-abstract-81061210728830", "source": "ESMO 2026 1057P；2026-10-26 原文核对", "contextOnly": true}]}, "hs20093": {"items": [{"grade": "安全性数据", "text": "Risvutatug rezetecan（HS-20093）两个一期/二期研究的跨瘤种安全性汇总，301 人中 12 人发生间质性肺病（4%），10 人被判断与治疗相关；3 人为 3 级及以上，包含 1 例治疗相关死亡。两个研究截止日分别为 2026-02-18 和 2026-01-13。未给出胰腺癌专属发生率，不能与 YL201 的非随机汇总直接比较安全性高低。 数据截止：2026-02-18 / 2026-01-13。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=40#presentation-abstract-2018837641406", "source": "ESMO 2026 1068P；2026-10-26 原文核对", "contextOnly": true}, {"grade": "其他癌种数据", "text": "EMBOLD PanTumor-101 全球剂量递增，70 名经治实体瘤患者。不同剂量的确认缓解率分别报告，其中最高剂量小组仅 3 人，不能当作整体缓解率；未报告胰腺癌独立结果。安全性随剂量变化，不能将其他剂量或其他瘤种结果套到当前胰腺癌试验。 数据截止：2026-02-18。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=40#presentation-abstract-2394649739827", "source": "ESMO 2026 1071P；2026-10-26 原文核对", "contextOnly": true}], "id": "hs20093", "name": "Risvutatug rezetecan（HS-20093）", "aliases": ["risvutatug rezetecan", "hs-20093", "hs20093"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "Risvutatug rezetecan（HS-20093） 是靶向 B7-H3 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 1071P；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=40#presentation-abstract-2394649739827"}}, "blb01d1": {"items": [{"grade": "其他癌种数据", "text": "PANKU-Breast01，BL-B01D1（izalontamab brengitecan）对化疗，HR+/HER2− 经治晚期乳腺癌，383 人：中位无进展生存 8.18 对 4.01 个月，风险比 0.41；确认缓解率 40.5% 对 20.2%。总生存尚不成熟。这是乳腺癌随机三期结果，不是胰腺癌疗效。 数据截止：2026-07-21。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=13#presentation-abstract-62672027347711", "source": "ESMO 2026 LBA50；2026-10-26 原文核对", "contextOnly": true}, {"grade": "其他癌种数据", "text": "PANKU-Lung01，BL-B01D1 对含铂化疗，第三代 EGFR-TKI 后进展的 EGFR 突变非鳞肺癌，422 人：中位无进展生存 11.14 对 5.65 个月，风险比 0.40；确认缓解率 60.2% 对 34.5%。总生存尚不成熟，不能作为胰腺癌结果。 数据截止：2026-07-15。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=118#presentation-abstract-61221333272337", "source": "ESMO 2026 LBA71；2026-10-26 原文核对", "contextOnly": true}], "id": "blb01d1", "name": "Izalontamab brengitecan（BL-B01D1）", "aliases": ["izalontamab brengitecan", "iza-bren", "bl-b01d1", "blb01d1"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "Izalontamab brengitecan（BL-B01D1） 是靶向 EGFR × HER3 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 LBA71；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=118#presentation-abstract-61221333272337"}}, "ibi343": {"items": [{"grade": "其他癌种数据", "text": "G-HOPE-001，IBI343（arcotatug tavatecan）对研究者选择治疗，CLDN18.2 高表达的经治晚期胃/胃食管交界癌，408 人：中位无进展生存 5.5 对 2.9 个月，风险比 0.47；缓解率 23.6% 对 5.3%。本次中期分析的总生存后续仍需按预设分析确认；这是胃癌三期，不能替代胰腺癌数据。 数据截止：2026-02-13。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=13#presentation-abstract-2000100405555", "source": "ESMO 2026 LBA77；2026-10-26 原文核对", "contextOnly": true}]}, "temab-a": {"items": [{"grade": "其他癌种数据", "text": "ABBV-400（telisotuzumab adizutecan）一期经治非鳞非小细胞肺癌：EGFR 野生型 48 人、突变型 41 人，中位总生存分别 13.8 和 16.2 个月，中位随访分别 27 和 26 个月。没有随机化疗对照，未报告新的胰腺癌队列结果；不能把肺癌生存数字套到胰腺癌。 数据截止：摘要未单列新的截止日期。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=32#presentation-abstract-408726588227", "source": "ESMO 2026 2658RO；2026-10-26 原文核对", "contextOnly": true}]}, "sac-tmt": {"items": [{"grade": "其他癌种数据", "text": "OptiTROP-Breast01，sac-TMT 对化疗，既往至少两次系统治疗的转移性三阴乳腺癌，263 人；最终总生存分析为 14.7 对 9.9 个月，风险比 0.60。数据截止较会议日期早一年，属于既有队列的延长随访；不是胰腺癌疗效。 数据截止：2025-09-17。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=126#presentation-abstract-7238390818744", "source": "ESMO 2026 4639RO；2026-10-26 原文核对", "contextOnly": true}, {"grade": "其他癌种数据", "text": "OptiTROP-Lung06，一线 PD-L1<1%、无 EGFR/ALK 变异非鳞肺癌，455 人；sac-TMT 联合帕博利珠单抗对化疗联合相同免疫药，中位无进展生存 15.0 对 5.7 个月，风险比 0.49；总生存尚不成熟。不是单药或胰腺癌试验结果。 数据截止：2026-06-09。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=84#presentation-abstract-4298305383845", "source": "ESMO 2026 LBA66；2026-10-26 原文核对", "contextOnly": true}, {"grade": "其他癌种数据", "text": "OptiTROP-Lung04，EGFR-TKI 后进展的 EGFR 突变肺癌，376 人；sac-TMT 对含铂化疗最终总生存 25.9 对 17.4 个月，风险比 0.69，中位随访 32.3 个月。后续 ADC 治疗的校正分析与原始主要分析分开报告，不用于判断胰腺癌疗效。 数据截止：2026-08-06。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=84#presentation-abstract-58111245728297", "source": "ESMO 2026 LBA67；2026-10-26 原文核对", "contextOnly": true}, {"grade": "其他癌种数据", "text": "TroFuse-005，既往铂类和 PD-(L)1 治疗后的晚期/复发子宫内膜癌，776 人；sac-TMT 对研究者选择治疗，中位无进展生存 7.2 对 3.9 个月（风险比 0.59），总生存 19.0 对 12.1 个月（风险比 0.68）。这是子宫内膜癌随机三期结果，不用于判断胰腺癌获益。 数据截止：2026-03-23。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=145#presentation-abstract-1268184933625", "source": "ESMO 2026 LBA11；2026-10-26 原文核对", "contextOnly": true}]}, "db1311": {"items": [{"grade": "其他癌种数据", "text": "DB-1311/BNT324（elfetabart drozuntecan）联合 pumitamig 的全球二期早期结果：110 人用药、67 人可评估，未确认缓解率 36%、疾病控制率 90%，中位随访 3 个月；报告头颈癌、宫颈癌和肝癌等队列，未单列胰腺癌结果。是联合方案，不能作为 DB-1311 单药或胰腺癌的疗效。 数据截止：2026-04-08。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=56#presentation-abstract-3471268437709", "source": "ESMO 2026 999O；2026-10-26 原文核对", "contextOnly": true}], "id": "db1311", "name": "Elfetabart drozuntecan（DB-1311 / BNT324）", "aliases": ["elfetabart drozuntecan", "db-1311", "db1311", "bnt324"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "Elfetabart drozuntecan（DB-1311 / BNT324） 是靶向 B7-H3 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 999O；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=56#presentation-abstract-3471268437709"}}, "shr-a1904": {"items": [{"grade": "其他癌种数据", "text": "SHR-A1904 联合阿得贝利单抗，伴或不伴 5-FU，一线 CLDN18.2 阳性胃/胃食管交界癌，报告一期 b 期部分：127 人入组、122 人可评估。三个方案组的确认缓解率分别 55.1%、70.0%、76.7%，并非一个汇总缓解率；无进展生存分别 6.9、11.0、11.1 个月。不能作为该登记三期或胰腺癌结果。 数据截止：2026-03-22。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=101#presentation-abstract-18671365966089", "source": "ESMO 2026 2912P；2026-10-26 原文核对", "contextOnly": true}]}, "tdxd": {"items": [{"grade": "其他癌种数据", "text": "ESPERANZA 采用既有 T-DXd 单臂二期数据与真实世界外部对照比较，HER2 IHC3+ 多瘤种二线及以后。泛瘤种分析 322 人，加权中位总生存 17.2 对 7.0 个月；纳入胰腺癌但未单列其结果。并非随机对照，原文也说明两侧 PFS 定义不同；不能把总体生存差当作胰腺癌获益，也不能用于 T-DM1。 数据截止：摘要未明确新的统一截止日期。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-35511556721184", "source": "ESMO 2026 1014P；2026-10-26 原文核对", "contextOnly": true}], "id": "tdxd", "name": "Trastuzumab deruxtecan（T-DXd，DS-8201）", "aliases": ["trastuzumab deruxtecan", "t-dxd", "ds-8201", "ds8201", "德曲妥珠单抗"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "Trastuzumab deruxtecan（T-DXd，DS-8201） 是靶向 HER2 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 1014P；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=35#presentation-abstract-35511556721184"}}, "mrg007": {"items": [{"grade": "其他癌种数据", "text": "MRG007（ARR-217）首次人体，123 人用药，其中结直肠癌 113 人；未给出胰腺癌疗效。结直肠癌 6 mg/kg 组摘要报 13/29 人缓解（44.8%），摘要未完整说明所有缓解患者的确认构成，不能将 44.8% 当作全部确认的缓解率。该结果不属于胰腺癌队列。 数据截止：2026-08-05。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=75#presentation-abstract-4306512175396", "source": "ESMO 2026 LBA34；2026-10-26 原文核对", "contextOnly": true}], "id": "mrg007", "name": "MRG007（ARR-217）", "aliases": ["mrg007", "mrg-007", "arr-217", "arr217"], "level": "本页未录入胰腺癌疗效数字", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "MRG007（ARR-217） 是靶向 CDH17 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 LBA34；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=75#presentation-abstract-4306512175396"}}, "sacituzumab-govitecan": {"items": [{"grade": "回顾性数据", "text": "戈沙妥珠单抗（sacituzumab govitecan）在至少两次既往方案后的晚期胰腺癌，20 人回顾性观察，混合单药和联合免疫治疗，中位总生存 6.40 个月、中位无进展生存 3.20 个月。不同起始剂量、体力状态和是否联合免疫都存在选择差异，不能据关联推断加量或联合免疫提高生存；仍需前瞻性验证。它不是 sacituzumab tirumotecan（sac-TMT）。 数据截止：治疗发生于 2023-01 至 2026-01；未单列统一随访截止日。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_2/presentation?p=110#presentation-abstract-74181978611765", "source": "ESMO 2026 3263eP；2026-10-26 原文核对", "contextOnly": true}], "id": "sacituzumab-govitecan", "name": "戈沙妥珠单抗（sacituzumab govitecan）", "aliases": ["sacituzumab govitecan", "immu-132", "immu132", "trodelvy", "戈沙妥珠单抗"], "level": "仅回顾性数据", "priority": 15, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "戈沙妥珠单抗（sacituzumab govitecan） 是靶向 TROP2 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 3263eP；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_2/presentation?p=110#presentation-abstract-74181978611765"}}, "lcb02a": {"items": [{"grade": "临床前数据", "text": "LCB02A 为 CLDN18.2 抗体偶联药；本摘要报告细胞和小鼠胃癌、胰腺癌移植模型，未报告人体缓解率或生存结果。NCT07460375 是拟推进的人体研究登记，不能把它反过来当作这份摘要已有临床结果的依据。 数据截止：摘要未给出数据截止日。", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_2/presentation?p=99#presentation-abstract-6710551990777", "source": "ESMO 2026 3012eP；2026-10-26 原文核对", "contextOnly": true}], "id": "lcb02a", "name": "LCB02A", "aliases": ["lcb02a", "lcb-02a"], "level": "仅临床前", "priority": 24, "maker": "见官方登记申办方", "mechanism": {"grade": "怎么起作用", "text": "LCB02A 是靶向 CLDN18.2 的抗体偶联药，通过抗体递送细胞毒载荷。", "source": "ESMO 2026 3012eP；2026-10-26 原文核对", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_2/presentation?p=99#presentation-abstract-6710551990777"}}});
// ESMO_ADC_2026_END
(function(){
  var RANK={"上市":6,"三期":6,"三期有结果":6,"三期未成功":6,"二期有数字":5,"一/二期有数字":4.5,"一期有数字":4,"仅临床前":3,"无公开人体数据":2,"还没有胰腺癌疗效数字":2,"不是肿瘤疗效":2};
  var BENCH={
    folfirinox:{label:"四药 FOLFIRINOX",text:"一线、体力较好的人。2011 年一项三期里，四药组中位总生存 11.1 个月，客观缓解率 31.6%。"},
    ag:{label:"AG（吉西他滨加白蛋白紫杉醇）",text:"一线。2013 年一项三期里，AG 组中位总生存 8.5 个月，客观缓解率 23%。"},
    nalirifox:{label:"NALIRIFOX",text:"一线。2023 年一项三期里，NALIRIFOX 组中位总生存 11.1 个月，客观缓解率 42%。对照是吉西他滨加白蛋白紫杉醇：总生存 9.2 个月，客观缓解率 36%。缓解率的差别不够确定。"}
  };
  var PROCEDURE={"not-drug":1,"radiotherapy":1,"fapi-imaging":1,"enzyme":1,"indomethacin":1,"rehab":1,"pancreatitis":1,"pnet":1,"surgery-endo":1,"diabetes-device":1,"supportive":1,"peri-support":1,"residual":1,"kinisoquin":1,"sgm-101":1};
  var FAMILIAR={"gemcitabine":1,"ag":1,"folfirinox":1,"nalirifox":1,"onivyde":1,"hr070803":1,"s-1":1,"capecitabine":1};
  var IMMUNO={"ivonescimab":1,"ql1706":1,"pembrolizumab":1,"adebrelimab":1,"nivolumab":1,"ipilimumab":1,"sintilimab":1,"camrelizumab":1,"toripalimab":1,"tislelizumab":1,"cadonilimab":1,"bnt327":1,"tqb2868":1,"ibi363":1,"lorigerlimab":1};
  function settingText(row){
    return (row.title||"")+" "+(row.title_zh||"")+" "+(row.setting||"");
  }
  function neoadjuvant(row){
    return /新辅助|neoadjuvant/i.test(settingText(row));
  }
  function adjuvant(row){
    if(neoadjuvant(row))return false;
    return /辅助|adjuvant|术后|切除后|resected/i.test(settingText(row));
  }
  function immunoSentence(row, names, cited){
    var drugs=String(row.drugs||"").trim();
    var han=(drugs.match(/[\u4e00-\u9fff]/g)||[]).length;
    var regimen="";
    if(drugs&&drugs.length<=80&&han>=4&&!/Arm [AB]|Biopsy/i.test(drugs)){
      var dlow=drugs.toLowerCase();
      var covered=names.some(function(n){
        return n.toLowerCase().split(/[（(，,、]/).some(function(part){
          part=part.replace(/[）)]/g,"").trim();
          return part.length>=2&&dlow.indexOf(part.toLowerCase())>=0;
        });
      });
      if(covered)regimen=drugs.replace(/[。．]+$/,"");
    }
    var stage=neoadjuvant(row)?"新辅助":(adjuvant(row)?"术后":(/二线/.test(settingText(row))?"二线及以后":(/一线|first[- ]line|previously untreated|既往未接受/i.test(settingText(row))?"一线":"")));
    var title=(row.title||"")+" "+(row.title_zh||"");
    var design=/单臂|single-arm|single arm/i.test(title)?"单臂，没有对照":(/安慰剂|placebo/i.test(title)?"对照里有安慰剂":(/对比|对照|\bvs\b|versus|compared/i.test(title)?"有对照":""));
    var head=regimen?("这一行是"+regimen):("这一行用了"+names.join("、"));
    if(!regimen){
      var found=/of\s+([A-Z0-9][A-Za-z0-9-]{2,})\s+in Combination/i.exec(row.title||"");
      if(found&&names.join(" ").indexOf(found[1])<0)head+="，以及"+found[1];
    }
    var mid=[];
    if(stage)mid.push("用在"+stage);
    if(design&&!(regimen&&/单臂|对照|安慰剂/.test(regimen)))mid.push(design);
    var sentence=head+(mid.length?"。"+mid.join("，"):"");
    if(!cited)sentence+="。这项自己的结果还没出来";
    if(sentence.slice(-1)!=="。")sentence+="。";
    return sentence;
  }
  var PUBLISHED="这是已经发表的试验。你看到的这一行如果是另一项还在做的，它自己的结果还没出来。";
  function cardCitesRow(card, id){
    return (card.items||[]).some(function(it){return ((it.source||"")+" "+(it.url||"")).indexOf(id)>=0;});
  }
  function rewritePublished(card, row){
    if(!(card.items||[]).some(function(it){return (it.text||"").indexOf(PUBLISHED)>=0;}))return card;
    var replacement=cardCitesRow(card, row.id)?"上面的数字来自这项登记本身已经发表的结果。登记上仍是在招或尚未招募。":"上面的数字来自另一项已经发表的研究，不是你正在看的这一行。这一行自己的结果还没出来。";
    return {id:card.id,name:card.name,maker:card.maker,level:card.level,priority:card.priority,items:card.items.map(function(it){
      if((it.text||"").indexOf(PUBLISHED)<0)return it;
      return {grade:it.grade,text:it.text.replace(PUBLISHED, replacement),source:it.source,url:it.url};
    })};
  }
  function nasoxBlob(blob){
    var lipo=/伊立替康脂质体|liposomal irinotecan|nal-iri|onivyde|irinotecan liposome|hr070803|越优力/.test(blob);
    var ox=/奥沙利铂|oxaliplatin/.test(blob);
    var s1=/替吉奥|tegafur|\bs-1\b/.test(blob);
    return lipo&&ox&&s1;
  }
  var ADJ_GUIDE="参考：根治术后的指南化疗在别的试验里的成绩，不是这一行的结果。改良四药，体力较好的人。2018 年一项三期（PRODIGE 24），中位总生存 54.4 对 35.0 个月（风险比 0.64），对照是吉西他滨。替吉奥，日本术后（JASPAC-01），五年总生存 44.1% 对 24.4%（风险比 0.57），对照是吉西他滨。吉西他滨加卡培他滨（ESPAC-4），中位总生存 28.0 对 25.5 个月（风险比 0.82），对照是单药吉西他滨。";
  var NASOX_LINE="NASOX 是脂质体伊立替康、奥沙利铂、替吉奥。已发表的是晚期一线，41 人：客观缓解率 58.5%，中位无进展生存 6.5 个月，中位总生存 11.4 个月（95% 区间 9.8–15.5）。这是晚期，不是术后。术后辅助的中位生存还没发表。European Journal of Cancer，2024。";
  function guidelineBenches(cards){
    var hasFolf=cards.some(function(c){return c.id==="folfirinox";});
    var hasAg=cards.some(function(c){return c.id==="ag";});
    var hasNali=cards.some(function(c){return c.id==="nalirifox";});
    var lines=[];
    if(!(hasFolf&&!hasAg))lines.push(BENCH.folfirinox);
    if(!(hasAg&&!hasFolf))lines.push(BENCH.ag);
    if(!hasNali)lines.push(BENCH.nalirifox);
    return lines;
  }
  var PANC=/胰腺|胰头|胰体|胰尾|pancrea|\bPDAC\b/i;
  function low(s){return String(s||"").toLowerCase();}
  function hasAlias(text,alias){
    var a=low(alias);
    if(!a)return false;
    if(/^[a-z0-9][a-z0-9 -]*$/.test(a)){
      return new RegExp("(^|[^a-z0-9])"+a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"(?![a-z0-9])").test(text);
    }
    return text.indexOf(a)>=0;
  }
  function cardHit(card,text){
    if((card.exclude||[]).some(function(a){return hasAlias(text,a);}))return false;
    var byAlias=(card.aliases||[]).some(function(a){return hasAlias(text,a);});
    var byAll=card.matchAll&&card.matchAll.every(function(group){return group.some(function(a){return hasAlias(text,a);});});
    return !!(byAlias||byAll);
  }
  var PLAN_OPENERS={
    NCT07491445:"一线转移性胰腺癌，达拉索雷塞单药或联合吉西他滨与白蛋白紫杉醇，对比单独使用吉西他滨与白蛋白紫杉醇",
    NCT06625320:"既往接受过一线治疗的转移性胰腺导管腺癌，达拉索雷塞单药对比研究者选择的标准化疗",
    CTR20251413:"一线转移性胰腺癌，依沃西单抗联合化疗，联合或不联合 AK117，对照是安慰剂联合化疗",
    ChiCTR2500109903:"胰腺癌根治术后的辅助治疗，NASOX（脂质体伊立替康、奥沙利铂、替吉奥）加阿得贝利单抗，单臂，没有对照",
    CTR20243288:"胰腺癌根治术后的辅助治疗，NASOX（脂质体伊立替康、奥沙利铂、替吉奥），对照是吉西他滨加卡培他滨",
    NCT07621718:"只纳入 KRAS G12D 的一线转移性胰腺癌，佐多拉塞（zoldonrasib，RMC-9805）加上研究者选择的化疗，对照是相同化疗加安慰剂",
    NCT06807437:"用兰瑞肽预防术后胰瘘，有对照"
  };
  var AGREED_PROSE={
    NCT05365581:"这个临床方案是给肿瘤有 CLDN18.2、已经转移或局部晚期不能手术的胰腺癌患者，用 ASP2138 加上 mFOLFIRINOX（改良四药化疗）。这是一期/1b 期。ASP2138 认的是肿瘤细胞上的 CLDN18.2，把 T 细胞拉到肿瘤细胞上。这个方案自己的结果还没出来。",
    NCT07024615:"这个临床方案是给肿瘤有 CLDN18.2、还可以手术的胰腺癌患者，手术前单用 ASP2138，手术后的化疗由研究者选择。这是一期 b 期。ASP2138 认的是肿瘤细胞上的 CLDN18.2，把 T 细胞拉到肿瘤细胞上。这个方案自己的结果还没出来。",
    CTR20241945:"这个临床方案是在胰腺腺癌患者中研究 ASP2138。登记没有把胰腺癌组的联合用药写开。ASP2138 认的是肿瘤细胞上的 CLDN18.2，把 T 细胞拉到肿瘤细胞上。这个方案自己的结果还没出来。",
    NCT05438459:"这个临床方案是给微卫星稳定、有恶性腹水的晚期胃癌或胰腺癌患者，往腹腔里给 GAIA-102。胰腺癌的二期组是在标准治疗上加 GAIA-102 和帕博利珠单抗，对照是标准治疗。这是一期/二期。这个方案自己的结果还没出来。",
    NCT05132504:"这个临床方案是给还可以手术的局限胰腺癌患者，先做新辅助 FOLFIRINOX，再用帕博利珠单抗，然后手术。这是二期。这个方案自己的结果还没出来。",
    NCT02600949:"这个临床方案是给晚期胰腺导管腺癌或结直肠腺癌患者，用个体化多肽疫苗。这个方案自己的结果还没出来。",
    NCT05431270:"这个临床方案是给一线胰腺导管腺癌患者，用 mavrostobart（PT199）加上化疗。这是一期/二期。这个方案自己的结果还没出来。",
    NCT06384560:"这个临床方案是给还可以手术或临界可切除的胰腺癌患者，新辅助用 mFOLFIRINOX、帕博利珠单抗和立体定向放疗。单臂，没有对照。这是一期 b/二期。这个方案自己的结果还没出来。",
    ChiCTR2500110471:"这个临床方案是一线晚期胰腺癌，丙酸钠加上白蛋白紫杉醇、吉西他滨和一种 PD-1 抑制剂。单臂，没有对照。这是二期。这个方案自己的结果还没出来。",
    NCT06831136:"这个临床方案是给局部晚期不能手术或已经转移的胰腺导管腺癌患者，用标准化疗加上帕博利珠单抗和超声内镜射频消融。单臂，没有对照。这是二期。这个方案自己的结果还没出来。",
    NCT05403554:"这个临床方案是给肿瘤有间皮素的胰腺癌患者，研究 NI-1801。可以单用，或加上抗 PD-1 抗体，或加上每周紫杉醇。这是一期。这个方案自己的结果还没出来。",
    NCT05462496:"这个临床方案是胰腺癌新辅助化疗之后，调整肠道菌群，再用免疫检查点抑制剂，然后手术。这个方案自己的结果还没出来。",
    NCT05916261:"这个临床方案是给晚期胰腺癌患者，用个体化肿瘤疫苗 mRNA-0217/S001，可以单用，或加上帕博利珠单抗。这是早期一期。这个方案自己的结果还没出来。",
    NCT05745233:"这个临床方案是给有恶性腹水的胃癌、胰腺癌或胆道癌患者，把免疫检查点抑制剂打进腹腔。看的是腹水。这个方案自己的结果还没出来。",
    NCT04901741:"这个临床方案是给微卫星稳定的转移性胰腺癌患者，用 olaptesed pegol（NOX-A12）加上帕博利珠单抗，再加脂质体伊立替康方案或吉西他滨加白蛋白紫杉醇。这是二期。这个方案自己的结果还没出来。",
    CTR20260141:"这个临床方案是一线转移性胰腺导管腺癌，西奥罗尼加上一种 PD-1 单抗、白蛋白紫杉醇和吉西他滨。这是三期，还在导入阶段。这个方案自己的结果还没出来。",
    CTR20222060:"这个临床方案是晚期胰腺癌，CT-707 联合特瑞普利单抗和吉西他滨。CT-707 抑制 FAK 信号，研究者希望借此改变不利于免疫细胞发挥作用的肿瘤微环境；特瑞普利单抗阻断 PD-1，吉西他滨则通过干扰 DNA 合成杀伤肿瘤细胞。这是联合用药的研究思路，尚不能据此判断临床效果。",
    CTR20230616:"这个临床方案是 HTMC0435 单药治疗晚期胰腺癌的二期研究。它抑制 PARP1 和 PARP2，阻碍肿瘤细胞修复 DNA 损伤。",
    NCT06813079:"这个临床方案是胰腺癌的二期单臂试验，按类器官结果选择用药。这个方案自己的结果还没出来。",
    ChiCTR2600130583:"这个临床方案是按分期和分子特征，给胰腺腺泡细胞癌选治疗。这是二期。这个方案自己的结果还没出来。",
    NCT06060405:"这个临床方案是给还可以手术的胰腺癌患者，在手术窗口期用度伐利尤单抗和 oleclumab。这是二期。这个方案自己的结果还没出来。",
    NCT04172532:"这个临床方案是给局部晚期胰腺癌患者，用 peposertib（M3814）加上大分割放疗。这是一期/二期。这个方案自己的结果还没出来。",
    CTR20231760:"这个临床方案是胰腺癌切除之后，用 CT041 自体 CAR-T 细胞注射液。CT041 认的是肿瘤细胞上的 CLDN18.2。这是一期。这个方案自己的结果还没出来。",
    NCT06353646:"这个临床方案是胰腺癌切除之后的辅助治疗，XH001 新抗原疫苗序贯联合免疫检查点抑制剂和化疗。这个方案自己的结果还没出来。",
    NCT07493421:"这个临床方案是胰腺癌有腹膜转移时，做胰腺切除和肿瘤减灭，再加上腹腔热灌注，药是顺铂和紫杉醇。这个方案自己的结果还没出来。",
    NCT06761027:"这个临床方案是一线、局部晚期或转移性胰腺癌，mFOLFIRINOX 加上安罗替尼和信迪利单抗。单臂，没有对照。这是一期 b/二期。安罗替尼抑制肿瘤血管生成，信迪利单抗松开 T 细胞上的刹车。这个方案自己的结果还没出来。",
    CTR20253176:"这个临床方案是一线转移性胰腺导管腺癌，TQB2868 加上安罗替尼和化疗，对照是安慰剂加化疗。这是三期。TQB2868 是同时作用在 PD-1 和 TGF-β 上的药。安罗替尼抑制肿瘤血管生成。这个方案自己的结果还没出来。",
    NCT07165951:"这个临床方案是一线转移性胰腺导管腺癌，TQB2868 加上安罗替尼、吉西他滨和紫杉醇，对照是安慰剂加化疗。这是三期。TQB2868 是同时作用在 PD-1 和 TGF-β 上的药。安罗替尼抑制肿瘤血管生成。这个方案自己的结果还没出来。",
    NCT06662006:"这个临床方案是二线转移性胰腺癌，脂质体伊立替康方案加上贝莫苏拜单抗和安罗替尼，可以再加立体定向放疗。单臂，没有对照。这是二期。贝莫苏拜单抗挡住 PD-L1。安罗替尼抑制肿瘤血管生成。这个方案自己的结果还没出来。",
    NCT06767813:"这个临床方案是一线胰腺癌，TQB2868 加上安罗替尼、吉西他滨和白蛋白紫杉醇。这是二期。TQB2868 是同时作用在 PD-1 和 TGF-β 上的药。安罗替尼抑制肿瘤血管生成。这项登记已经公布的早期结果：36 人可评估，客观缓解率 63.9%，没有对照，随访还短，中位总生存还没达到。",
    NCT06051851:"这个临床方案是一线晚期转移性胰腺癌，派安普利单抗加上安罗替尼、吉西他滨和白蛋白紫杉醇。单臂，没有对照。这是二期。派安普利单抗松开 T 细胞上的刹车。安罗替尼抑制肿瘤血管生成。这个方案自己的结果还没出来。",
    NCT06621095:"这个临床方案是一线晚期转移性胰腺癌，安罗替尼加上贝莫苏拜单抗、吉西他滨和白蛋白紫杉醇，对照是吉西他滨加白蛋白紫杉醇。这是二期。贝莫苏拜单抗挡住 PD-L1。安罗替尼抑制肿瘤血管生成。这个方案自己的结果还没出来。",
    CTR20263221:"这个临床方案是吉西他滨方案失败后的转移性胰腺癌，YL201 对比脂质体伊立替康加氟尿嘧啶和亚叶酸钙。这是三期。YL201 是 B7-H3 抗体偶联药，把化疗药带到有 B7-H3 的细胞上。同一套药更早的研究，既往至少一线、且没用过伊立替康的转移性胰腺癌 60 人：确认客观缓解率 28.3%，中位总生存 14.6 个月。这项三期自己的结果还没出来。",
    NCT07803783:"这个临床方案是吉西他滨方案失败后的转移性胰腺癌，YL201 对比脂质体伊立替康加氟尿嘧啶和亚叶酸钙。这是三期。YL201 是 B7-H3 抗体偶联药，把化疗药带到有 B7-H3 的细胞上。同一套药更早的研究，既往至少一线、且没用过伊立替康的转移性胰腺癌 60 人：确认客观缓解率 28.3%，中位总生存 14.6 个月。这项三期自己的结果还没出来。"
  };
  function regimenMiss(row, text){
    var blob=low(proseTitle(row)+" "+(row.drugs||"")+" "+(row.setting||""));
    var data=String(text||"");
    if(/三期|phase\s*(?:3|iii)/i.test(data))return false;
    if(/替吉奥|tegafur|\bS-1\b|\bS1\b/i.test(data)&&!/替吉奥|tegafur|s-1|s1/.test(blob))return true;
    if(/二线/.test(data)&&/一线|first-line/.test(blob)&&!/二线/.test(blob))return true;
    if(/MSI-H|dMMR/i.test(data)&&!/msi|dmmr|错配/.test(blob))return true;
    if(/G12D/i.test(data)&&!/g12d/.test(blob))return true;
    if(/G12C/i.test(data)&&!/g12c/.test(blob))return true;
    if(/BRCA|PALB2/i.test(data)&&!/brca|palb2/.test(blob))return true;
    if(/BRAF\s*V600/i.test(data)&&!/braf/.test(blob))return true;
    return false;
  }
  function knownPhase(card, text){
    var map={"一期有数字":"一期","一/二期有数字":"一/二期","二期有数字":"二期","三期":"三期","三期有结果":"三期"};
    if(card&&map[card.level])return map[card.level];
    var note=((card&&card.items)||[]).map(function(it){return it.text||"";}).join(" ");
    var m=(String(text||"")+" "+note).match(/上面是[^。]{0,40}?([一二三]期)/);
    return m?m[1]:"";
  }
  function stampPrior(card, text){
    var s=String(text||"");
    if(/更早的|已经发表的|同一套药更早|这项登记已经公布/.test(s))return s;
    return "更早的"+(knownPhase(card, s)||"研究")+"："+s;
  }
  function proseClean(s){
    return String(s||"").replace(/这一行|这行/g,"这个方案").replace(/这味药/g,"这种药").replace(/吉西它滨/g,"吉西他滨").replace(/\s+/g," ").trim();
  }
  function proseTitle(row){return proseClean(row.title_zh||row.title);}
  function fistulaPlan(row){
    return /胰瘘|pancreatic fistula/i.test(proseTitle(row))&&/预防|prevent/i.test(proseTitle(row));
  }
  function zoldOnly(row){
    var title=proseTitle(row);
    return /zoldonrasib|rmc-?\s*9805|佐多/i.test(title)&&!/daraxonrasib|rmc-?\s*6236|达拉索雷塞/i.test(title);
  }
  function planDesign(row){
    var title=proseTitle(row);
    if(/单臂|single[- ]arm/i.test(title))return "单臂，没有对照";
    if(/安慰剂|placebo/i.test(title))return "有安慰剂对照";
    if(/随机|randomi[sz]ed|对照|对比|versus|\bvs\b|compared/i.test(title))return "有对照";
    return "";
  }
  var CHEMO_ZH={
    gemcitabine:"吉西他滨","nab paclitaxel":"白蛋白紫杉醇","nab-paclitaxel":"白蛋白紫杉醇",
    paclitaxel:"紫杉醇",fluorouracil:"氟尿嘧啶","5-fluorouracil":"氟尿嘧啶","5 fluorouracil":"氟尿嘧啶",
    oxaliplatin:"奥沙利铂",irinotecan:"伊立替康","liposomal irinotecan":"脂质体伊立替康",
    leucovorin:"亚叶酸钙","folinic acid":"亚叶酸钙",leucovorina:"亚叶酸钙",
    capecitabine:"卡培他滨",folfox:"FOLFOX",folfirinox:"FOLFIRINOX",mfolfirinox:"mFOLFIRINOX",
    pembrolizumab:"帕博利珠单抗",nivolumab:"纳武利尤单抗",sintilimab:"信迪利单抗"
  };
  function mostlyEnglish(row){
    var t=proseTitle(row);
    return ((t.match(/[\u4e00-\u9fff]/g)||[]).length)<8;
  }
  function shortDrugs(drugs){
    var seen={}, out=[];
    String(drugs||"").split(/[、,;；]/).forEach(function(raw){
      var tok=raw.replace(/^子研究\d+[：:]/,"").trim();
      if(!tok||/^对照[:：]/.test(tok))return;
      if(/biospecimen|sample|specimen|collection|questionnaire|administra|device|usage|health record|detection|assay|mcd|mced|drain|glue|adhesive|cyanoacrylate|glubran|physical activity|nutrition|resistance|sensory|placebo|安慰剂|最佳支持|counsel|biopsy|tomography|computed|surgery|resection|injection|therapy|\bstandard\b|\bcontrol\b/i.test(tok))return;
      var key=tok.toLowerCase().replace(/\s+/g," ");
      var zh=CHEMO_ZH[key]||"";
      if(!zh){
        var core=tok.split(/[（(]/)[0].trim();
        zh=CHEMO_ZH[core.toLowerCase()]||"";
        if(!zh){
          if(/[\u4e00-\u9fff]/.test(core))zh=core.slice(0,18);
          else if(core.length<=28)zh=core.slice(0,24);
        }
      }
      if(!zh||seen[zh])return;
      seen[zh]=1;
      out.push(zh);
    });
    if(out.length>4)return out.slice(0,3).join("、")+"等";
    return out.join("、");
  }
  function englishOpening(row){
    var title=row.title||"";
    var who=[];
    if(/CLDN18/i.test(title))who.push("肿瘤有 CLDN18.2");
    if(/\bG12D\b/i.test(title))who.push("KRAS G12D");
    else if(/\bG12C\b/i.test(title))who.push("KRAS G12C");
    if(/MSI-?H|dMMR/i.test(title))who.push("微卫星高度不稳定");
    if(/BRCA|PALB2/i.test(title))who.push("有 BRCA 或 PALB2 突变");
    var line=row.lines&&!/未明确/.test(row.lines)?row.lines:"";
    var stage=/新辅助/.test(row.setting||"")?"新辅助":(/辅助|术后/.test(row.setting||"")?"术后":"");
    if(line&&stage&&line.indexOf(stage)>=0)stage="";
    var head=[line,stage].filter(Boolean).join("");
    head+=(head?"、":"")+(who.length?who.join("、")+"的胰腺癌":"胰腺癌");
    var drugs=shortDrugs(row.drugs);
    if(!drugs && /olaparib|奥拉帕利/i.test(title))drugs="奥拉帕利";
    if(drugs.split("、").join("").length>36)drugs=drugs.split("、").slice(0,2).join("、");
    var design=planDesign(row);
    var phase=row.phase&&row.phase!=="未明确"&&row.phase!=="未写"?"这是"+String(row.phase).replace(/\s+/g,"")+"。":"";
    return "这个临床方案是"+head+(drugs?"，"+drugs:"")+(design?"。"+design:"")+"。"+phase;
  }
  function planOpening(row){
    if(PLAN_OPENERS[row.id])return "这个临床方案是"+PLAN_OPENERS[row.id]+"。";
    if(fistulaPlan(row)){
      var drug=/lanreotide|兰瑞肽/i.test(proseTitle(row))?"兰瑞肽":"预防胰瘘的药物";
      var design=/random|随机/i.test(proseTitle(row))?"，有对照":"";
      return "这个临床方案是用"+drug+"预防术后胰瘘"+design+"。";
    }
    var scope=evidenceScope(row);
    if(scope==='basket'||scope==='unconfirmed')return '这个临床方案是'+(scope==='basket'?'多癌种研究':'登记未单列胰腺癌队列的研究')+'。登记题目：'+row.title+'。'+(row.drugs?'登记列出的干预：'+shortDrugs(row.drugs)+'。':'');
    if(mostlyEnglish(row))return englishOpening(row);
    var title=proseTitle(row).replace(/[。；]+$/,"");
    if(title.length>72){
      title=title
        .replace(/的有效性和安全性/g,"")
        .replace(/随机、平行对照、开放标签、多中心的?/g,"")
        .replace(/多中心、随机、双盲、安慰剂对照的?/g,"")
        .replace(/开放标签、多中心的?/g,"")
        .replace(/注册临床研究|临床研究|临床试验/g,"")
        .replace(/^一项/,"")
        .replace(/\s+/g,"")
        .replace(/[，、]{2,}/g,"，")
        .replace(/^[，、]+|[，、]+$/g,"");
      if(title.length>68){
        var cut=title.slice(0,68);
        var at=Math.max(cut.lastIndexOf("，"),cut.lastIndexOf("、"),cut.lastIndexOf("用于"),cut.lastIndexOf("对比"));
        if(at>36)cut=cut.slice(0,at);
        title=cut;
      }
    }
    var extra=[];
    var stage=neoadjuvant(row)?"新辅助":(adjuvant(row)?"术后":"");
    if(stage&&title.indexOf("辅助")<0&&title.indexOf("术后")<0&&title.indexOf("新辅助")<0)extra.push(stage);
    var design=planDesign(row);
    if(design&&title.indexOf("对照")<0&&title.indexOf("单臂")<0&&!/versus|\bvs\b|compared/i.test(title))extra.push(design);
    return "这个临床方案是"+title+(extra.length?"。"+extra.join("，"):"")+"。";
  }
  function planGap(row, dataText){
    var blob=treatmentText(row)+" "+(row.setting||"");
    var bits=[];
    if(adjuvant(row))bits.push("用在术后");
    else if(neoadjuvant(row))bits.push("用在新辅助");
    else if(/一线|first-line/i.test(blob))bits.push("是一线");
    else if(/二线/.test(blob))bits.push("是二线及以后");
    if(/单药/.test(dataText||"")&&/联合|吉西他滨|gemcitabine|化疗|\+|plus|with|combination/i.test(blob))bits.push("和化疗一起用");
    if(!bits.length)return "这个方案自己的结果还没出来。";
    return "这个方案"+bits.join("，")+"，自己的结果还没出来。";
  }
  // Mechanism-only copy verified separately; never supplies efficacy numbers.
  var MECHANISM_EXPLANATIONS={
"cisplatin-brca":{"text": "顺铂在 DNA 上形成交联，妨碍肿瘤细胞复制和修复 DNA。具体制剂、给药方式和联合方案的效果仍需分别核对。", "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/cisplatin", "source": "NCI：顺铂作用机制"},
"albumin-docetaxel":{"text": "这一制剂的抗肿瘤成分是多西他赛，通过稳定微管、干扰细胞分裂发挥作用。白蛋白结合型属于不同制剂，不能直接套用其他多西他赛制剂的疗效。", "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/docetaxel", "source": "NCI：多西他赛作用机制；本项制剂见药审中心登记"},
  "hrs-4642": {
    "text": "HRS-4642 抑制突变的 KRAS G12D 蛋白，阻断它推动肿瘤生长的信号。",
    "url": "https://www.sciencedirect.com/science/article/pii/S1535610824002265",
    "source": "Cancer Cell：HRS-4642 作用机制"
  },
  "gfh375": {
    "text": "GFH375 抑制突变的 KRAS G12D 蛋白，阻断它推动肿瘤生长的信号。",
    "url": "https://ascopubs.org/doi/10.1200/JCO.2025.43.16_suppl.3013",
    "source": "JCO：GFH375 研究摘要"
  },
  "asp3082": {
    "text": "ASP3082 把 KRAS G12D 蛋白交给细胞内的降解系统清除，减少推动肿瘤生长的信号。",
    "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/kras-g12d-degrader-asp3082",
    "source": "NCI：ASP3082 作用机制"
  },
  "qls31905": {
    "text": "QLS31905 一头结合肿瘤细胞上的 CLDN18.2，一头结合 T 细胞上的 CD3，把 T 细胞拉到肿瘤旁发挥杀伤作用。",
    "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/anti-claudin182-anti-cd3-bispecific-antibody-qls31905",
    "source": "NCI：QLS31905 作用机制"
  },
  "olaparib": {
    "text": "奥拉帕利抑制 PARP，妨碍肿瘤细胞修复 DNA 损伤，让损伤更难修好。",
    "url": "https://www.cancer.gov/publications/dictionaries/cancer-drug/def/olaparib",
    "source": "NCI：奥拉帕利作用机制"
  }
};
  function currentMechanismCard(card,profile){
    if(FAMILIAR[card.id])return card;
    // The public detail chunk has the same cited explanations as the portable
    // fact table. Reading that profile avoids depending on a private-only global.
    var entry=(profile&&profile.entries||[]).find(function(e){return !e.provisional&&e.explanation&&(card.aliases||[]).some(function(a){return String(e.name).replace(/[-\s]/g,'').toLowerCase()===String(a).replace(/[-\s]/g,'').toLowerCase();});});
    if(!entry)return card;
    return Object.assign({},card,{items:(card.items||[]).filter(function(it){return it.grade!=='怎么起作用';}).concat([{grade:'怎么起作用',text:entry.explanation,url:entry.url||'',source:entry.basis||'药物机制资料'}])});
  }
  function planProse(row, matched){
    if(AGREED_PROSE[row.id])return AGREED_PROSE[row.id];
    var out=planOpening(row);
    var pending="这个方案自己的结果还没出来。";
    if(fistulaPlan(row)||PLAN_OPENERS[row.id]==="用兰瑞肽预防术后胰瘘，有对照")return out+"比较的是术后胰瘘，不是肿瘤能不能缩小、人能不能活得更久。"+pending;
    if(zoldOnly(row))return out+(/G12D|G12 D/i.test(proseTitle(row))?"要看的是 KRAS G12D 这一类。":"")+"达拉索雷塞的二线单药结果不是这个方案的结果。"+pending;
    var relevant=matched.filter(function(c){return !(zoldOnly(row)&&c.id==="daraxonrasib");});
    var darax=relevant.filter(function(c){return c.id==="daraxonrasib";})[0];
    if(darax){
      var data=(darax.items||[]).filter(function(it){return it.grade==="已经有的数据";})[0];
      var os=data&&data.text.match(/中位总生存\s*[0-9.]+\s*对\s*[0-9.]+\s*个月/);
      var nPeople=data&&data.text.match(/(\d+)\s*人/);
      out+="达拉索雷塞已经在美国上市，作用是抓住还开着的 RAS。";
      if(os)out+="更早的"+(knownPhase(darax, data.text)||"研究")+"，二线单药"+(nPeople?"，"+nPeople[1]+" 人":"")+"："+os[0]+"。";
      var same=data&&row.id&&((data.source||"")+" "+(data.url||"")).indexOf(row.id)>=0;
      return out+(same?"这是这个登记已经发表的部分，还在招募的部分还没出来。":planGap(row, data&&data.text));
    }
    if(nasoxBlob(low(treatmentText(row)))){
      var published=NASOX_LINE.match(/41 人：[^\u3002]+/);
      if(published)out+="更早的研究，晚期一线，"+published[0]+"。那是晚期一线，不是这个方案的结果。";
      return out+(adjuvant(row)?"这里要看的是术后会不会复发、能活多久。":"")+pending;
    }
    var candidates=[];
    relevant.forEach(function(c){
      if(FAMILIAR[c.id]||IMMUNO[c.id]||PROCEDURE[c.id])return;
      (c.items||[]).forEach(function(it){
        if(it.grade!=="已经有的数据"||!/\d/.test(it.text)||!/缓解|生存|疾病控制/.test(it.text))return;
        if(regimenMiss(row, it.text))return;
        candidates.push({card:c,item:it});
      });
    });
    candidates.sort(function(a,b){
      function weight(x){return /三期|phase\s*(?:3|iii)/i.test(x.item.text+" "+x.item.source)?1:0;}
      return weight(b)-weight(a);
    });
    var best=candidates[0];
    var lead=best?best.card:relevant.filter(function(c){return !FAMILIAR[c.id]&&!IMMUNO[c.id]&&!PROCEDURE[c.id];})[0];
    if(lead){
      if(lead.level==="上市")out+=lead.name.split(/[（(]/)[0]+"已经上市。";
      var mechanism=(lead.items||[]).filter(function(it){return it.grade==="怎么起作用";})[0];
      if(MECHANISM_EXPLANATIONS[lead.id])out+=MECHANISM_EXPLANATIONS[lead.id].text;
      else if(mechanism){
        var mech=proseClean(mechanism.text);
        if(!/怎么起作用|公开资料里还没说|下面的数字|这不是单药|不是.{0,6}单药/.test(mech)){
          if(lead.name && mech.indexOf(lead.name.split(/[（(]/)[0])<0 && /抑制肿瘤血管生成|松开 T 细胞/.test(mech))mech=lead.name.split(/[（(]/)[0]+mech;
          out+=mech.replace(/。$/,"")+"。";
        }
      }
    }
    if(best){
      var bestBody=proseClean(best.item.text);
      var bestCited=row.id&&((best.item.source||"")+" "+(best.item.url||"")).indexOf(row.id)>=0;
      out+=bestCited?bestBody:stampPrior(best.card, bestBody);
      if(!/。$/.test(out))out+="。";
      out+=bestCited?"这是这个登记已经发表的部分，还在招募的部分还没出来。":planGap(row, best.item.text);
      return out;
    }
    var immuno=relevant.filter(function(c){return IMMUNO[c.id];})[0];
    if(immuno){
      var mech=(immuno.items||[]).filter(function(it){return it.grade==="怎么起作用";})[0];
      var none=(immuno.items||[]).filter(function(it){return it.grade==="已经有的数据";})[0];
      if(mech){
        var mechText=(proseClean(mech.text).split(/。/).filter(function(s){
          return s && !/下面的数字|这不是单药|不是.{0,8}单药|只属于|公开资料里还没说|怎么起作用/.test(s);
        })[0]||"");
        if(mechText){
          if(immuno.name && mechText.indexOf(immuno.name)<0 && /松开 T 细胞|挡住 PD-L1|挡住 CTLA-4/.test(mechText))mechText=immuno.name+mechText;
          out+=mechText.replace(/。$/,"")+"。";
        }
      }
      if(none && !regimenMiss(row, none.text)){
        var immunoCited=row.id&&((none.source||"")+" "+(none.url||"")).indexOf(row.id)>=0;
        var immunoBody=proseClean(none.text);
        out+=(immunoCited?immunoBody:stampPrior(immuno, immunoBody)).replace(/。$/,"")+"。";
      }
    }
    var proc=!lead&&!immuno&&relevant.filter(function(c){return PROCEDURE[c.id];})[0];
    if(proc){
      var what=(proc.items||[]).filter(function(it){return it.grade==="这一行是什么";})[0];
      if(what)return out+proseClean(what.text);
    }
    return out+pending;
  }
  // Reviewed copy edits apply only to background text, after evidence extraction.
  // Exact source phrases prevent a new cohort or result from inheriting old wording.
  var BACKGROUND_COPY_EDITS=[
  [
    "奥拉帕利已经上市。只适用于验血能查出的、天生带的 BRCA1 或 BRCA2 有害突变。更早的研究：只收天生带的 BRCA1 或 BRCA2 有害突变（验血能查）、一线含铂化疗至少 16 周没有进展的转移性胰腺癌。最终总生存没有差别：19.0 对 19.2 个月（风险比 0.83，P=0.35）。没有这种天生突变的人，不在这组数据里。",
    "奥拉帕利已经上市。这里引用的研究纳入携带胚系（天生带有、可通过验血检测）BRCA1 或 BRCA2 有害突变的转移性胰腺癌患者，且要求一线含铂化疗至少 16 周未进展。没有这些胚系突变的患者不在这组数据中。\n\n最终总生存为 19.0 对 19.2 个月（风险比 0.83，P=0.35），未显示出差别。"
  ],
  [
    "看的是恶病质时的体重，不是肿瘤缩小。更早的二期：这不是肿瘤缓解率。癌症恶病质、GDF-15 升高的 187 人里约 32% 是胰腺癌，但体重没有按癌种分开报。400 mg 对比安慰剂，12 周体重多增加的中位数是 2.81 公斤。专门看转移性胰腺癌肿瘤缓解的 NCT06989437 还没有结果。",
    "已有的二期研究评估癌症恶病质患者的体重变化，纳入 GDF-15 升高的 187 人，其中约 32% 为胰腺癌，但结果未按癌种分别报告。400 mg 剂量与安慰剂相比，12 周体重多增加的中位数为 2.81 公斤。\n\n这是体重改善数据，不能作为肿瘤缓解率。专门评估转移性胰腺癌肿瘤缓解的 NCT06989437 尚未公布结果。"
  ],
  [
    "只覆盖 KRAS G12D，不覆盖 G12R。更早的一期：只覆盖 KRAS G12D，不覆盖 G12R。数据截止 2025-02-23。一线加 mFOLFIRINOX 只有 5 人可评估、3 人确认部分缓解，人数太少。三期对照还没有结果。数字来自会议摘要，不是期刊全文。",
    "该药针对 KRAS G12D，不覆盖 G12R。已有的一期研究数据截至 2025-02-23，来自会议摘要，而非期刊全文。\n\n一线联合 mFOLFIRINOX 的队列仅有 5 人可评估，其中 3 人确认部分缓解，样本量很小；三期对照研究的结果尚未公布。"
  ],
  [
    "药先不干活。STAT3 是帮助胰腺癌生长、往外侵袭的一条信号。药并不直接粘在 STAT3 上。这是设计时的设想。细胞和小鼠实验里，一类比较不怕化疗的肿瘤干细胞，聚成球的能力被压住，但那不是人体结果。更早的研究：一线转移性胰腺癌。没有活得更久，试验因此提前停了。",
    "该药需要激活后才能发挥作用，并不直接结合 STAT3。其设计设想是间接压低这条参与胰腺癌生长和侵袭的信号；细胞与小鼠实验中，对化疗相对耐受的肿瘤干细胞形成细胞球的能力受到抑制，但这些并非人体疗效。\n\n已有的一线转移性胰腺癌研究未显示生存改善，因此提前终止。"
  ],
  [
    "这组人都带有天生的 BRCA1/2 或 PALB2 突变。没有这些突变，不能看这组数字。更早的二期：这组人都带有天生的 BRCA1/2 或 PALB2 突变。没有这些突变的人，不能看这组数字。加上维利帕尼缓解率 74.1%，生存没有更好，血液毒性更重。",
    "已有的二期研究只纳入携带胚系（天生带有的）BRCA1/2 或 PALB2 突变的患者，因此不能将这组结果直接用于没有这些突变的人群。研究中，加入维利帕尼后的缓解率为 74.1%，但生存未改善，血液毒性更重。"
  ],
  [
    "尼妥珠单抗已经上市。已公布的数字只包括 KRAS 野生型。论文换了一种统计算法（限制平均生存时间），得到 18.05 对 11.14 个月（P=0.036）。这两个数不是中位生存，不能和别的卡比。KRAS 突变（包括 G12R）不在这组人里。",
    "尼妥珠单抗已经上市，但这里引用的研究只纳入 KRAS 野生型患者，不包含 KRAS 突变患者（包括 G12R）。\n\n论文还报告了限制平均生存时间：18.05 对 11.14 个月（P=0.036）。这与中位生存是不同的统计指标，不能当作中位生存与其他研究直接比较。"
  ],
  [
    "已公布的胰腺癌人数少，没有按G12R单独报。更早的一期：中国一期，数据截止 2026-01-15。公司写明缓解包含尚未确认的。人数少，也没有按 G12R 单独报。2026 年 2 月获准开展一线联合化疗的 I/III 期试验，还没有疗效数字。",
    "已有的中国一期研究数据截至 2026-01-15，胰腺癌样本量较小，且公司报告的缓解包含尚未确认的结果，也未单独报告 G12R 人群。\n\n一线联合化疗的 I/III 期试验于 2026 年 2 月获准开展，尚未公布疗效数据。"
  ],
  [
    "只认 KRAS G12D，不认 G12R。更早的一/二期：经治的 KRAS G12D 晚期胰腺癌，600 mg 每天。68.2% 的人已经接受过至少两线治疗。新闻稿没有写这些缓解是否都已确认。这是 G12D，不是 G12R。不是对照试验。",
    "已有的一/二期研究针对接受过治疗的 KRAS G12D 晚期胰腺癌患者，用药剂量为每天 600 mg；其中 68.2% 的患者已接受至少两线治疗。\n\n这项研究没有对照组，新闻稿也未说明缓解是否均已确认。该药针对 G12D，不覆盖 G12R，这组结果不能直接用于判断 G12R 人群的疗效。"
  ],
  [
    "只适合肿瘤上有 CLDN18.2 的人。更早的一/二期：一线加吉西他滨和白蛋白紫杉醇，单臂。数据截止 2025-12-11。这不是和单独化疗对照的三期结果。胃癌的数字没有算进来。数字来自会议摘要，不是期刊全文。",
    "相关研究面向肿瘤表达 CLDN18.2 的患者。已有的一/二期研究采用单臂设计，将该药与吉西他滨、白蛋白紫杉醇联用，作为一线治疗。\n\n这里仅列胰腺癌数据，不包含胃癌结果；数据截至 2025-12-11，来自会议摘要，而非期刊全文。由于研究没有单独化疗对照组，尚不能据此判断联合方案是否优于单独化疗，也不能将其视为三期对照研究的结果。"
  ],
  [
    "只覆盖 KRAS G12D，不覆盖 G12R。更早的一/二期：只覆盖 KRAS G12D，不覆盖 G12R。数据截止 2026-04-05。这是新闻稿，不是期刊全文。三期对照还没有结果。",
    "该药针对 KRAS G12D，不覆盖 G12R。已有的一/二期研究数据截至 2026-04-05，来源为新闻稿，而非期刊全文；三期对照研究的结果尚未公布。"
  ],
  [
    "只适用于 BRAF V600E，不适用于 KRAS 突变。更早的二期：只适用于体细胞 BRAF V600E，不适用于 KRAS 突变。康奈非尼加 binimetinib，二线及以后。",
    "已有的二期研究在二线及以后使用康奈非尼联合 binimetinib，针对携带体细胞 BRAF V600E 变异的患者，不适用于 KRAS 突变人群。"
  ],
  [
    "更早的研究：混合瘤种的早期试验里有 9 名胰腺癌，摘要只报了全部 51 人的缓解率，没有单独的胰腺癌数字。胃癌里的结果，不能用来看胰腺癌。专门收胰腺癌的试验还没有公布结果。",
    "已有的早期研究纳入多种肿瘤，其中有 9 名胰腺癌患者，但摘要只报告全部 51 人的缓解率，未单独给出胰腺癌结果。\n\n因此，不能将总体或胃癌数据直接用于判断胰腺癌疗效；专门纳入胰腺癌患者的试验尚未公布结果。"
  ],
  [
    "和肿瘤上的组织因子有关。组织因子高不高，数字不一样。更早的一期：2 mg/kg、可评估胰腺癌。其中组织因子高表达且既往不超过 2 线的 5 人里 4 人部分缓解。",
    "这些结果需要结合肿瘤的组织因子表达水平阅读。已有的一期研究在 2 mg/kg 剂量下，组织因子高表达、既往治疗不超过 2 线的 5 名可评估胰腺癌患者中，有 4 人部分缓解；这一小组的结果不宜直接用于其他表达水平的人群。"
  ],
  [
    "更早的一期：一线化疗没进展之后的维持治疗，加 CD40 抗体，不是单药。可评估 4 人：1 人部分缓解，1 人稳定，2 人进展。研究因经费提前关闭。人数太少。",
    "已有的一期研究在一线化疗未进展后，将该药与 CD40 抗体联用作为维持治疗。可评估的 4 人中，1 人部分缓解、1 人稳定、2 人进展。\n\n研究因经费原因提前关闭，样本量很小；这些结果属于联合用药的初步观察，不能作为单药疗效。"
  ],
  [
    "已经上市的适应症是宫颈癌，不是胰腺癌。更早的研究：这个药已经上市，批的是复发或转移的宫颈癌，不是胰腺癌。胰腺癌里它和化疗一起试，还没有公布肿瘤缩小的数字。",
    "该药已获批用于复发或转移性宫颈癌。胰腺癌中正在研究它与化疗联用的方案，但尚未公布肿瘤缩小的数据；宫颈癌的上市适应症不能作为胰腺癌疗效的依据。"
  ],
  [
    "更早的一期：和吉西他滨、白蛋白紫杉醇合用，不是单药。未治疗的转移性胰腺癌。可评估只有 5 人：1 人部分缓解。因为耐受差提前停了。看不出比单用化疗更好。",
    "已有的一期研究在未治疗的转移性胰腺癌患者中，将该药与吉西他滨、白蛋白紫杉醇联用；仅有 5 人可评估，其中 1 人部分缓解。\n\n研究因耐受性差而提前终止，现有结果未显示出优于单用化疗的证据，也不能作为单药疗效。"
  ],
  [
    "这个方案是手术、检查、支持治疗，或只留了一个还没写清的药名。公开资料里还没有胰腺癌病人的肿瘤缩小或生存对比。如果旁边已经有写明药名的说明，看那一张。",
    "该登记涉及手术、检查或支持治疗，或尚未明确具体药物。现有公开资料没有可引用的胰腺癌肿瘤缩小或生存对比；若已注明其他药物，可结合相应药物的资料阅读。"
  ],
  [
    "已经上市的适应症是宫颈癌，不是胰腺癌。这个药已经上市，批的是复发或转移的宫颈癌，不是胰腺癌。胰腺癌里它和化疗一起试，还没有公布肿瘤缩小的数字。",
    "该药已获批用于复发或转移性宫颈癌。胰腺癌中正在研究它与化疗联用的方案，但尚未公布肿瘤缩小的数据；宫颈癌的上市适应症不能作为胰腺癌疗效的依据。"
  ],
  [
    "只覆盖 KRAS G12C，不覆盖 G12R。更早的一/二期：只覆盖 KRAS G12C，不覆盖 G12R。数据截止 2024-06-30。",
    "已有的一/二期研究数据截至 2024-06-30，针对 KRAS G12C 人群。该药不覆盖 G12R，不能将这组结果直接用于判断 G12R 人群的疗效。"
  ],
  [
    "只认 KRAS G12D，不认 G12R。更早的一/二期：KRAS G12D 晚期胰腺癌、标准治疗失败。这是 G12D，不是 G12R。",
    "已有的一/二期研究纳入标准治疗失败后的 KRAS G12D 晚期胰腺癌患者。该药针对 G12D，不覆盖 G12R，因此这组结果不能直接用于判断 G12R 人群的疗效。"
  ],
  [
    "不覆盖 G12R。人数少。更早的一期：只覆盖 KRAS G12D，不覆盖 G12R。中位随访 4.85 个月。人数少，含未确认缓解。",
    "该药针对 KRAS G12D，不覆盖 G12R。已有的一期研究中位随访为 4.85 个月，样本量较小，且部分缓解尚未确认，因此仍需谨慎理解这些初步结果。"
  ],
  [
    "更早的二期：伊匹木单抗挡住 CTLA-4。胰腺癌里公布的数字都是和纳武利尤单抗一起用。再加上放疗的 43 人里，6 人肿瘤部分缩小。",
    "伊匹木单抗通过阻断 CTLA-4 发挥作用，已有的二期胰腺癌数据来自与纳武利尤单抗的联合用药。在进一步联合放疗的 43 人中，6 人肿瘤部分缩小；这些结果不能作为伊匹木单抗的单药疗效。"
  ],
  [
    "更早的研究：公司 2026-04-30 新闻稿写晚期胰腺癌二期 20 人可评估，主要终点安全性达到，约 35% 的人仍在用药。",
    "公司在 2026-04-30 的新闻稿中报告，晚期胰腺癌二期研究有 20 人可评估，已达到主要安全性终点，约 35% 的患者仍在用药。"
  ],
  [
    "必须和化疗一起用，不是代替化疗。更早的二期：瘤内放疗微粒，必须和化疗一起用，不是代替化疗。单臂，没有同期对照。",
    "已有的二期研究将瘤内放疗微粒与化疗联用，采用单臂设计，没有同期对照组。这种治疗需要配合化疗使用，不能替代化疗。"
  ],
  [
    "只覆盖 KRAS G12C，不覆盖 G12R。更早的一/二期：只覆盖 KRAS G12C，不覆盖 G12R。",
    "已有的一/二期研究针对 KRAS G12C 人群。该药不覆盖 G12R，不能将这组结果直接用于判断 G12R 人群的疗效。"
  ],
  [
    "更早的二期：一线不可切除胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂。没有化疗对照，两组不要混成一个生存数字。",
    "已有的二期研究在不可切除胰腺癌患者中，将该药与吉西他滨、白蛋白紫杉醇联用作为一线治疗。研究采用单臂设计，未设单独化疗对照组；不同组别的生存数据需要分别阅读，不能合并成一个数字。"
  ],
  [
    "没有对照。这个总生存和既往单用该化疗的三期结果处在同一范围，不能据此说加了特瑞普利就延长生存。",
    "这项研究没有对照组，报告的总生存与既往单用该化疗的三期结果处于相近范围。因此，尚不能据此判断加入特瑞普利是否延长了生存。"
  ],
  [
    "更早的二期：和吉西他滨合用，不是单药。不可切除晚期胰腺癌一线，单臂。人数少，还不是完整分析。",
    "已有的二期研究在不可切除晚期胰腺癌患者中，将该药与吉西他滨联用作为一线治疗。研究采用单臂设计，样本量较小，且目前报告尚非完整分析，因此不能将其视为单药疗效。"
  ],
  [
    "这组人都带有天生的 BRCA1/2 或 PALB2 突变。没有这些突变，不能看这组数字。",
    "这组研究只纳入携带胚系（天生带有的）BRCA1/2 或 PALB2 突变的患者，结果不能直接用于没有这些突变的人群。"
  ],
  [
    "奥拉帕利已经上市。只适用于验血能查出的、天生带的 BRCA1 或 BRCA2 有害突变。",
    "奥拉帕利已经上市；这里讨论的用法针对携带胚系（天生带有、可通过验血检测）BRCA1 或 BRCA2 有害突变的患者。"
  ],
  [
    "只看肿瘤细胞上的 CLDN18.2。至少 60% 的癌细胞上有这个标志，才有这组数字。",
    "这组结果来自至少 60% 的肿瘤细胞表达 CLDN18.2 的患者；理解这些数字时，需要注意这一人群条件。"
  ],
  [
    "更早的二期：一线局部晚期或转移性胰腺癌，加化疗，只有 15 人可评估。人数少，单臂。",
    "已有的二期研究在局部晚期或转移性胰腺癌患者中，将该药与化疗联用作为一线治疗。研究采用单臂设计，仅有 15 人可评估，结果仍属小样本的初步观察。"
  ],
  [
    "放疗、碳离子或不可逆电穿孔本身不是药物。若同一试验还写了药名，药物的数据看另一张卡。",
    "本研究涉及放疗、碳离子或不可逆电穿孔等治疗方式。若同时包含药物，还需结合相应药物的研究结果分别理解，不能将这些局部治疗当作药物疗效。"
  ],
  [
    "更早的一期：用病人自己的 T 细胞改造成能认 CLDN18.2 的 CAR-T。",
    "已有的一期研究使用患者自身 T 细胞制成的 CAR-T，使其能够识别肿瘤细胞上的 CLDN18.2。"
  ],
  [
    "这是另一种胰腺肿瘤，神经内分泌瘤，不是导管腺癌。别的瘤种的治疗数字不能拿过来用。",
    "本研究针对胰腺神经内分泌瘤，与胰腺导管腺癌不同，其治疗数据不宜直接用于判断导管腺癌疗效。"
  ],
  [
    "这项登记写的是影像、取材、问卷或早筛检测，不是在测一种药对胰腺癌的缓解率或生存。",
    "这项研究涉及影像、取材、问卷或早筛检测，评估的并非药物治疗胰腺癌的缓解率或生存获益。"
  ],
  [
    "更早的一/二期：初治转移性胰腺癌，加吉西他滨和白蛋白紫杉醇，单臂。没有对照。",
    "已有的一/二期研究在初治转移性胰腺癌患者中，将该药与吉西他滨、白蛋白紫杉醇联用。研究采用单臂设计，没有对照组，尚不能据此判断加入该药是否带来额外获益。"
  ],
  [
    "更早的研究：2021 年一篇预印本，还没在正式期刊发表。没有对照，人数少。",
    "现有结果来自 2021 年发布的预印本，尚未在正式期刊发表。研究样本量较小，且没有对照组，需要谨慎理解。"
  ],
  [
    "这是手术方式、吻合、胰瘘、引流、支架或内镜操作，不是一种抗肿瘤药的缓解率。",
    "这类研究评估手术方式、吻合、胰瘘、引流、支架或内镜操作等问题，其结果不能作为抗肿瘤药物的缓解率证据。"
  ],
  [
    "只覆盖 KRAS G12C，不覆盖 G12R。人数太少。",
    "该药针对 KRAS G12C，不覆盖 G12R；目前样本量很小，结果仍需谨慎理解。"
  ],
  [
    "更早的研究：还没有可引用的胰腺癌肿瘤缩小或生存数字。",
    "目前尚无可引用的胰腺癌肿瘤缩小或生存数据。"
  ],
  [
    "只认 KRAS G12D，不认 G12R。",
    "该药针对 KRAS G12D，不覆盖 G12R。"
  ],
  [
    "数据截止时缓解持续时间和总生存还不成熟。",
    "截至数据截止日，缓解持续时间与总生存的随访尚不成熟，仍需等待后续结果。"
  ],
  [
    "数字来自会议摘要的转载，还没在期刊发表。",
    "这些数据来自会议摘要的转载，尚未在期刊发表。"
  ],
  [
    "试验最看重的是总生存，两组几乎一样。",
    "研究的主要终点是总生存，两组结果相近。"
  ],
  [
    "单药治疗胰腺癌的缓解率还没有公布。",
    "目前尚未公布单药治疗胰腺癌的缓解率。"
  ],
  [
    "更早的二期：既往治疗过的胰腺癌。",
    "已有的二期研究纳入接受过治疗的胰腺癌患者。"
  ],
  [
    "更早的二期：不是单药。",
    "已有的二期结果来自联合用药，不能作为单药疗效。"
  ],
  [
    "每种产品要单独看。",
    "不同细胞治疗或疫苗的结果需要分别判断，不能互相替代。"
  ]
];
  function backgroundCopy(text){
    BACKGROUND_COPY_EDITS.forEach(function(edit){text=text.split(edit[0]).join(edit[1]);});
    return text;
  }
  function evidenceParts(prose){
    var sentences=String(prose||"").split(/(?<=。)/).map(function(s){return s.trim();}).filter(Boolean);
    var plan=[], why=[], numbers=[], tail=[], planOpen=true, phaseSeen="";
    sentences.forEach(function(s){
      var phaseMark=s.match(/更早的(?:一\/二期|[一二三]期)/);
      if(phaseMark)phaseSeen=phaseMark[0];
      if(/这些数字对应的是所说的人群和用法/.test(s))return;
      if(/自己的结果还没出来|还在招募的部分还没出来|不是这个方案的结果|这里要看的是|比较的是术后胰瘘/.test(s)){tail.push(s);planOpen=false;return;}
      if(/客观缓解率|中位总生存|中位无进展生存|疾病控制率/.test(s)){
        if(/没有[^。]{0,16}(?:客观缓解率|中位总生存|中位无进展生存)/.test(s) && !/\d+(?:\.\d+)?\s*%|\d+(?:\.\d+)?\s*个月/.test(s)){planOpen=false;return;}
        numbers.push(s);planOpen=false;return;
      }
      if(planOpen&&(/^这个临床方案是/.test(s)||/^这是[^。]{0,12}期/.test(s)||/^(单臂|有对照|有安慰剂对照)/.test(s))){plan.push(s);return;}
      planOpen=false;
      why.push(s);
    });
    var extra=[];
    tail.forEach(function(s){
      if(/自己的结果还没出来|还在招募的部分还没出来|此登记的结果尚未核实|后续部分的结果需另行核实/.test(s))return;
      else if(numbers.length&&/不是这个方案的结果|这里要看的是/.test(s))return;
      else extra.push(s);
    });
    if(extra.length)why=why.concat(extra);
    var numberHead=numbers.map(function(s){return s.split(/[；;]/)[0];}).join("");
    if(numbers.length && !/人/.test(numberHead)){
      var cohort=why.filter(function(s){return /人/.test(s) && !/松开|抑制|上市|抓住|带到|作用是/.test(s);});
      var counted=cohort.filter(function(s){return /\d+\s*人/.test(s);});
      var pick=counted.length?counted[counted.length-1]:cohort[cohort.length-1];
      if(pick){
        numbers[0]=pick.replace(/。$/,"")+"："+numbers[0];
        why=why.filter(function(s){return s!==pick;});
      }
    }
    var PLAN_WORD={
      chemotherapy:"化疗",gemcitabine:"吉西他滨",irinotecan:"伊立替康",oxaliplatin:"奥沙利铂",
      paclitaxel:"紫杉醇","nab-paclitaxel":"白蛋白紫杉醇","nab paclitaxel":"白蛋白紫杉醇",
      capecitabine:"卡培他滨",adebrelimab:"阿得贝利单抗",nimotuzumab:"尼妥珠单抗",
      toripalimab:"特瑞普利单抗",sintilimab:"信迪利单抗",pembrolizumab:"帕博利珠单抗",
      nivolumab:"纳武利尤单抗",cetuximab:"西妥昔单抗",lenvatinib:"仑伐替尼",
      indomethacin:"吲哚美辛",biopsy:"活检",surgery:"手术",resection:"切除",
      injection:"注射液",gnp:"吉西他滨加白蛋白紫杉醇",mgnp:"吉西他滨加白蛋白紫杉醇"
    };
    function localizePlan(text){
      var s=String(text||"");
      Object.keys(PLAN_WORD).sort(function(a,b){return b.length-a.length;}).forEach(function(k){
        s=s.replace(new RegExp("\\b"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","ig"), PLAN_WORD[k]);
      });
      return s.replace(/、{2,}/g,"、").replace(/，{2,}/g,"，");
    }
    function usefulWhy(text){
      return text.split(/(?<=。)/).filter(function(s){
        return s && !/每种产品要单独看|不是同一种药|不是同一种制剂|没有单独的胰腺癌|还没有可引用|公开资料里还没说|别的瘤种的治疗数字不能拿过来用|还不成熟/.test(s);
      }).join("");
    }
    var planText=localizePlan(plan.join(""));
    var parts=[];
    if(planText)parts.push({k:"方案",v:planText});
    var background=[], mechanisms=[];
    // Positive action statements only: phase/cohort/result labels are not mechanisms.
    why.forEach(function(sentence){
      sentence=sentence.replace(/这是不适用。/g, "").trim();
      if(!sentence)return;
      if(/已经在美国上市，作用是/.test(sentence)){background.push(sentence.split("，")[0]+"。");sentence=sentence.replace("已经在美国上市，作用是","的作用是");}
      var study=/更早的|已经发表|这项登记|[一二三]期|一期\/二期|新辅助|单臂|对照|\d+\s*人|数字|缓解|生存|结果|上市|适应症|胃癌|尿路上皮癌|只覆盖|不覆盖|只认|只针对|只适合|只适用于|只看肿瘤|和.*一起试|不是单药|必须和化疗/.test(sentence);
      var action=/抑制|挡住|带到|带过去|拉到|拉过去|杀|裂开|细胞.*改造|改造成|松开|作用是|抓住|照射|补回|推动|放在肿瘤|精氨酸|NQO1|活性氧|压低|用来减轻|帮助消化|帮医生|催着肿瘤|推着癌细胞|同时作用|认出|降解/.test(sentence);
      if(!study&&action)mechanisms.push(sentence);else background.push(sentence);
    });
    var whyText=usefulWhy(mechanisms.join(""));
    whyText=whyText.replace(/把化疗药带到([^。]+)细胞上。/g,'把化疗药带到$1细胞上，借此杀伤这些细胞。');
    if(/NQO1/.test(whyText))whyText="肿瘤内的 NQO1 酶可激活这种药，使细胞内活性氧增加；活性氧过多可能损伤并杀死肿瘤细胞。这是机制设想，不代表人体治疗已经成功。";
    whyText=whyText.replace(/^改造成能认 CLDN18.2。/,"把病人自己的 T 细胞改造成能识别 CLDN18.2 的 CAR-T，帮助它们识别带这个标志的细胞。");
    whyText=whyText.replace(/^改造成能认间皮素，不需要配病人自己的细胞。/,"把捐献者的 T 细胞改造成能识别间皮素的 CAR-T，帮助它们识别带这个标志的细胞。");
    if(whyText)parts.push({k:"为什么可能有用",v:whyText});
    if(numbers.length){
      var numText=numbers.join("");
      if(phaseSeen && !/[一二三]期|一\/二期/.test(numText))numText=phaseSeen+"："+numText.replace(/^更早的研究[：，]/,"");
      parts.push({k:"已有数字",v:numText});
    }
    // Preserve meaningful cohort and limitation information beside, not inside, mechanism.
    var context=background.filter(function(text,index){
      return background.indexOf(text)===index && !/^更早的(?:研究|一\/二期|[一二三]期)：组织因子抗体偶联药。$/.test(text) && text!=="新辅助。" && !/^这是[^。]{0,12}期。$/.test(text);
    }).join("");
    if(context)parts.push({k:"研究背景与限制",v:backgroundCopy(context)});
    return parts;
  }
  var COMMON_REGIMENS=[
    "一线、转移、体力较好：四药 FOLFIRINOX，2011 年三期，342 人，中位总生存 11.1 对 6.8 个月，对照是吉西他滨。",
    "一线、转移：吉西他滨加白蛋白紫杉醇，2013 年三期，861 人，中位总生存 8.5 对 6.7 个月，对照是吉西他滨。",
    "一线、转移：NALIRIFOX，2023 年三期，770 人，中位总生存 11.1 对 9.2 个月，对照是吉西他滨加白蛋白紫杉醇。",
    "一线、局部晚期或转移：替吉奥，2013 年三期，834 人，中位总生存 9.7 个月，吉西他滨是 8.8 个月。",
    "二线、单药：达拉索雷塞，三期，500 人，中位总生存 13.2 对 6.7 个月，对照是化疗。",
    "吉西他滨治疗后：脂质体伊立替康加氟尿嘧啶，2016 年三期，117 人，中位总生存 6.1 对 4.2 个月。",
    "吉西他滨失败后：中国的脂质体伊立替康，三期，298 人，中位总生存 7.4 对 5.0 个月。",
    "术后、体力较好：改良四药，2018 年三期，中位总生存 54.4 对 35.0 个月，对照是吉西他滨。",
    "术后：吉西他滨加卡培他滨，2017 年三期，730 人，中位总生存 28.0 对 25.5 个月，对照是吉西他滨。",
    "日本术后：替吉奥，2016 年三期，五年总生存 44.1% 对 24.4%，对照是吉西他滨。"
  ].join("\n");
  function commonRegimens(row, matched){
    var scope=evidenceScope(row);if(scope!=="pancreatic"&&scope!=="pancreatic-cohort")return "";
    var blob=low(settingText(row)+" "+(row.lines||"")+" "+(row.drugs||""));
    if(/神经内分泌|neuroendocrine|胰瘘|pancreatic fistula|胰酶|胰腺炎|pancreatitis|奥曲肽|octreotide/i.test(blob))return "";
    if(fistulaPlan(row))return "";
    var tumor=(matched||[]).some(function(c){return c.level!=="不是肿瘤疗效";});
    var nontumor=(matched||[]).some(function(c){return c.level==="不是肿瘤疗效"&&c.id!=="residual";});
    if(nontumor&&!tumor)return "";
    return COMMON_REGIMENS;
  }
  function treatmentText(row){
    if(typeof row._treatmentText==='string')return row._treatmentText;
    if(window.__trialTreatmentText)return window.__trialTreatmentText(row);
    return [row.title,row.title_zh,row.drugs].join(" ");
  }
  var ESMO_2026_EVIDENCE={"NCT07198321": {"parts": [{"k": "方案", "v": "GFH276 单药 I/II 期多癌种研究；以下为已公布的 Ia 期胰腺癌队列。"}, {"k": "为什么可能有用", "v": "GFH276 通过分子胶复合物抑制活化状态 RAS 的下游信号。"}, {"k": "已有数字", "v": "ESMO 2026 LBA33：GFH276 单药一期 Ia，既往接受治疗的胰腺导管腺癌；40–160 mg 每日一次，61 人至少完成一次治疗后评估。数据截止 2026-09-15，客观缓解率 41.1%，疾病控制率 91.8%；未用过 RAS 抑制剂者客观缓解率 43.1%。新闻稿未说明缓解是否全部确认，未报告中位无进展或总生存，也未单列 G12R。无随机对照，不能当作 GFH276 联合西妥昔单抗、化疗或 GFH375 的结果。"}], "sources": [{"label": "ESMO 2026 LBA33，GenFleet 2026-10-26", "url": "https://www.genfleet.com/en/press_release-123"}], "reviewedAt": "2026-10-26"}, "NCT06922591": {"parts": [{"k": "方案", "v": "TNG462-C102 一/二期，多种联合用药队列；以下只报告 TNG462 联合 daraxonrasib 的胰腺癌队列。"}, {"k": "为什么可能有用", "v": "联合抑制 PRMT5 与 RAS 信号；本组要求 MTAP 缺失及 RAS 突变。"}, {"k": "已有数字", "v": "ESMO 2026：TNG462（vopimetostat）联合 daraxonrasib，二/三线、MTAP 缺失且 RAS 突变的转移性胰腺导管腺癌。数据截止 2026-08-20，22 人可评估（首次用药距截止至少 14 周），中位随访 7.1 个月；客观缓解率 82%（18/22），截止时 11 人确认、7 人尚未确认，公司称后者随后均确认；疾病控制率 100%，中位无进展生存未达到，9 个月无进展生存率 88%。无随机对照，不能作为单药、其他搭配或一线三期结果。200 mg/100 mg 剂量组安全性 25 人：3 级治疗相关不良事件 40%，无 4/5 级；较高剂量 4 人中 2 人发生剂量限制毒性。"}], "sources": [{"label": "ESMO 2026，Tango 2026-10-23", "url": "https://ir.tangotx.com/news-releases/news-release-details/tango-presents-promising-results-phase-12-study-vopimetostat-and"}], "reviewedAt": "2026-10-26"}, "NCT05726864": {"parts": [{"k": "方案", "v": "AMPLIFY-7P 术后随机二期，ELI-002 7P 对观察；非转移期治疗研究。"}, {"k": "为什么可能有用", "v": "七价突变 KRAS 肽疫苗诱导 T 细胞免疫应答，免疫应答本身不等于临床获益。"}, {"k": "已有数字", "v": "ESMO 2026 同期 Nature Medicine：AMPLIFY-7P 随机二期，I–III 期 KRAS 突变胰腺导管腺癌，手术及标准治疗后影像无复发；ELI-002 7P 96 人对观察 48 人。数据截止 2026-04-20，主要无病生存终点未达到：中位无病生存 23.8 对 21.2 个月，风险比 0.85，P=0.5329。事后校正或亚组信号不能替代主要分析；总生存尚不成熟，98.9% 的免疫应答不是肿瘤缓解率。3 级及以上不良事件 10.4% 对 14.6%。不能用于判断晚期转移性患者或 ELI-002 2P 的疗效。"}], "sources": [{"label": "Nature Medicine 2026-10-23，AMPLIFY-7P", "url": "https://www.nature.com/articles/s41591-026-04734-7"}], "reviewedAt": "2026-10-26"}, "NCT03313778": {"parts": [{"k": "研究队列", "v": "多癌种一期登记；本次更新仅限 A2 术后胰腺癌队列。登记当前为进行中不招募，不能据此申请现有名额。"}, {"k": "方案", "v": "Intismeran autogene 加 FOLFIRINOX 辅助治疗；本队列不含帕博利珠单抗。"}, {"k": "为什么可能有用", "v": "疫苗编码个体肿瘤新抗原，激活 T 细胞识别肿瘤；免疫反应不能替代临床获益验证。"}, {"k": "已有数字", "v": "ESMO 2026 海报 3151P：mRNA-4157-P101 A2 队列，20 名切除后的胰腺导管腺癌患者，个体化 intismeran autogene 疫苗联合 FOLFIRINOX，单臂一期。截止 2026-07-22，中位随访约 17 个月，11 人仍无复发，未报告死亡；这是描述性随访，不是无复发生存率估计或随机对照获益。19/19 可评估者产生免疫应答，不等于 100% 肿瘤缓解。全因 3 级及以上治疗期间不良事件 15/20，归因疫苗者 1/20（疲劳）。无对照，不能判断优于 FOLFIRINOX；不能当作其他癌种、另一种 mRNA 疫苗或后续三期结果。"}], "sources": [{"label": "Moderna ESMO 2026 海报3151P", "url": "https://irp.cdn-website.com/89dd0539/files/uploaded/mRNA-4157-P101+Poster_ESMO+2026_Final.pdf"}], "reviewedAt": "2026-10-26"}, "NCT07102004": {"parts": [{"k": "方案", "v": "QLC5508（MHB088C）；以下仅限摘要明确报告的胰腺癌队列，不包括其他瘤种或后续三期。"}, {"k": "为什么可能有用", "v": "靶向 B7-H3 的抗体偶联药，递送细胞毒载荷；机制不等于已证实临床获益。"}, {"k": "已有数字", "v": "QLC5508（MHB088C）一/二期，标准治疗失败的胰腺导管腺癌：49 人入组、48 人可评估，客观缓解率 22.9%，疾病控制率 68.8%，中位缓解持续 3.91 个月、中位无进展生存 5.36 个月、中位总生存 8.44 个月。2.0 mg/kg 每两周一次、既往一线失败的 22 人亚组：缓解率 27.3%，中位总生存 9.03 个月。无随机对照；原文未说明全部缓解是否确认。全瘤种安全性为 138 人，3 级及以上治疗相关不良事件 32.6%，不能当作胰腺癌专属发生率。 数据截止：2026-04-07。"}], "sources": [{"label": "ESMO 2026 1053P 原始摘要", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=38#presentation-abstract-55991805919613"}], "reviewedAt": "2026-10-26"}, "NCT06233864": {"parts": [{"k": "方案", "v": "维迪西妥单抗（disitamab vedotin，RC48）；以下仅限摘要明确报告的胰腺癌队列，不包括其他瘤种或后续三期。"}, {"k": "为什么可能有用", "v": "靶向 HER2 的抗体偶联药，递送细胞毒载荷；机制不等于已证实临床获益。"}, {"k": "已有数字", "v": "HER2 表达（IHC 1+/2+/3+）晚期胰腺癌，单臂二期，27 人分两队列。联合吉西他滨队列：18 人入组、15 人可评估，4 人部分缓解、6 人稳定、5 人进展；既往一线未用吉西他滨或不能耐受非吉西他滨方案。单药后线队列：9 人入组、8 人可评估，0 人缓解、3 人稳定、5 人进展。总人群 4 人发生 3 级治疗相关不良事件。摘要中的 25% 是设计预期缓解率，不是实测结果；尚无 PFS/OS 数字，也没有随机对照。 数据截止：2026-03-24。"}], "sources": [{"label": "ESMO 2026 3145P 原始摘要", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal_1/presentation/list?p=107#presentation-abstract-34492000446269"}], "reviewedAt": "2026-10-26"}, "NCT06349408": {"parts": [{"k": "方案", "v": "IBI3001；以下仅限摘要明确报告的胰腺癌队列，不包括其他瘤种或后续三期。"}, {"k": "为什么可能有用", "v": "靶向 EGFR × B7-H3 的抗体偶联药，递送细胞毒载荷；机制不等于已证实临床获益。"}, {"k": "已有数字", "v": "IBI3001 单药一期 Ia：胰腺导管腺癌 6/8 mg/kg 剂量的 13 人队列，中位无进展生存 7.0 个月（46.2% 已发生事件），未单列胰腺癌缓解率。全瘤种 57 人入组、50 人可评估，不能把总体缓解率或 8 人生物标志物阳性组的 87.5% 缓解率当作这 13 人的结果。全瘤种安全性 57 人，3 级及以上治疗相关不良事件 47.4%，无对照。 数据截止：2026-03-31。"}], "sources": [{"label": "ESMO 2026 1001O 原始摘要", "url": "https://cslide.ctimeetingtech.com/esmo2026/attendee/confcal/presentation/list?p=57#presentation-abstract-7497740069338"}], "reviewedAt": "2026-10-26"}};
  var EVIDENCE_CLARIFICATIONS={
    CTR20222060:{
      why:'CT-707 抑制 FAK 信号，研究者希望借此改变不利于免疫细胞发挥作用的肿瘤微环境；特瑞普利单抗阻断 PD-1，吉西他滨则通过干扰 DNA 合成杀伤肿瘤细胞。将三者联合是一种研究思路，尚不能据此判断临床效果。',
      data:'截至 2026-10-15，本轮未检索到可对应这项三药联合胰腺癌方案的缓解率或生存结果。官方登记 NCT05580445 未张贴结果；其他方案的数据不能作为本项效果。',
      sources:[{label:'ClinicalTrials.gov：CT-707 三药联合登记 NCT05580445',url:'https://clinicaltrials.gov/study/NCT05580445'},{label:'Nature Medicine 2016：FAK 抑制联合免疫治疗的临床前研究',url:'https://www.nature.com/articles/nm.4123'}]
    },
    CTR20230616:{
      data:'截至 2026-10-15，本轮未检索到这项胰腺癌单药研究可核实的缓解率或生存结果。HTMC0435 已有小细胞肺癌联合替莫唑胺的公开研究，癌种和用药方案均不同，不能作为本项胰腺癌单药效果。',
      sources:[{label:'药审中心：HTMC0435 胰腺癌登记 CTR20230616',url:'http://www.chinadrugtrials.org.cn/clinicaltrials.searchlist.dhtml?keywords=CTR20230616'},{label:'BMC Medicine 2026-10-08：HTMC0435 联合替莫唑胺的小细胞肺癌研究',url:'https://link.springer.com/article/10.1186/s12916-026-05292-y'}]
    }
  };
  function evidenceScope(row){
    var title=(row.title||'')+' '+(row.title_zh||'');
    var details=(row.req||'')+' '+(row.gate_summary||'');
    if(PANC.test(title))return 'pancreatic';
    if(PANC.test(details))return 'pancreatic-cohort';
    if(/实体[肿]?瘤|恶性肿瘤|solid\s+tumo[ur]+s?|advanced\s+malignanc|消化道肿瘤|gastrointestinal\s+(?:cancer|tumo)/i.test(title))return 'basket';
    if(/^(?:NCT\d{8}|CTR\d+|ChiCTR\d+)$/.test(row.id||'')&&row.source)return 'unconfirmed';
    return '';
  }
  function otherPancreaticResearch(matched){
    var seen={},out=[];
    matched.forEach(function(c){
      if(FAMILIAR[c.id]||PROCEDURE[c.id]||c.level==='不是肿瘤疗效')return;
      (c.items||[]).forEach(function(it){
        // Require a pancreatic population, an actual efficacy value and a source.
        // Counts of patients, other cancers and preclinical numbers do not qualify.
        if(it.grade!=='已经有的数据'||!/^https?:\/\//.test(it.url||'')||!PANC.test(it.text)||!/(?:客观缓解率|疾病控制率|中位总生存|中位无进展生存)\s*(?:为|是)?\s*\d/.test(it.text))return;
        var key=it.url+'|'+it.text;if(seen[key])return;seen[key]=true;
        out.push(c.name+'：'+it.text);
      });
    });
    return out.length?'下面是药物在其他胰腺癌研究中的数字，人群和联合用药见各段说明，不能当作本项临床试验的结果，也不能直接比较优劣。\n\n'+out.join('\n\n'):'';
  }
  function explainWhyInFull(parts,row,matched,profile,sources){
    var part=parts.find(function(p){return p.k==='为什么可能有用';});
    if(!part)return;
    var text=String(part.v||'').replace(/ 这里只解释已核实的干预，不能据此判断整个方案已经有效。/g,'').trim();
    if(text.length<105&&matched.some(function(c){return c.id==='daraxonrasib';})&&/RAS/.test(text)&&!/PRMT5/.test(text)){
      text='RAS 像细胞生长信号的开关。RMC-6236 与细胞内亲环素 A 形成复合物，结合处于开启状态的 RAS，阻断它向下游传递促生长信号。'+(row.id==='NCT06625320'?'本项用随机分组比较 RMC-6236 单药与研究者选择的化疗，检验阻断 RAS 是否改善生存。':'不同治疗线数及联合方案需分别判断；二线单药研究不能直接代表本项方案。');
      sources.push({label:'美国药品说明书：RMC-6236 作用机制',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=13a65923-d072-4dac-8620-8eabbf8c3641'});
    }else if(text.length<100&&/BNT327/.test(text)&&/PD-L1/.test(text)&&/VEGF/.test(text)){
      text='BNT327 同时针对 PD-L1 与 VEGF：阻断 PD-L1 是想解除对 T 细胞的抑制，阻断 VEGF 是想减少支持肿瘤生长的新生血管。两种作用同时存在，不等于已证实这个胰腺癌联合方案优于单独用药。';
      sources.push({label:'NCI：PD-L1／VEGF 双靶点抗体的作用原理',url:'https://www.cancer.gov/publications/dictionaries/cancer-drug/def/anti-pd-l1-anti-vegf-bispecific-antibody-ap505'});
    }else if(text.length<100&&/抗体偶联药|ADC/.test(text)&&(profile&&profile.entries||[]).some(function(e){return e.type==='ADC 抗体偶联药'&&!e.provisional;})){
      text+= '抗体负责识别所列靶点，连接的细胞毒药物负责杀伤细胞；是否能在这项研究的人群中带来足够的缓解，还要同时看靶点表达、给药剂量和副作用。';
      sources.push({label:'NCI：抗体偶联药的基本作用原理',url:'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/antibody-drug-conjugate'});
    }else if(text.length<95&&(profile&&profile.entries||[]).some(function(e){return e.type==='RAS 直接抑制'&&!e.provisional&&(e.targets||[]).some(function(t){return /KRAS G12[CDRV]/.test(t);});})){
      var subtype=(profile.entries.filter(function(e){return e.type==='RAS 直接抑制'&&!e.provisional;}).map(function(e){return (e.targets||[]).join(' ');}).join(' ').match(/KRAS G12[CDRV]/)||[])[0];
      text+='KRAS 突变可让促生长信号持续开启，这也是研究抑制 '+subtype+' 的生物学依据。靶向一个变体的机制和结果不能自动套到其他 KRAS 亚型。';
      sources.push({label:'NCI：KRAS 突变与持续生长信号',url:'https://www.cancer.gov/news-events/cancer-currents-blog/2021/fda-sotorasib-lung-cancer-kras'});
    }else if(text.length<90&&/PARP/.test(text)&&(profile&&profile.entries||[]).some(function(e){return e.type==='DNA 修复抑制剂'&&!e.provisional;})){
      text+='PARP 参与细胞修复 DNA 损伤；抑制它，是想让肿瘤细胞累积难以修复的损伤。哪些患者可能受益还取决于本登记的基因门槛与具体联合方案。';
      sources.push({label:'NCI：PARP 与 DNA 损伤修复',url:'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/parp'});
    }else if(text.length<85&&(profile&&profile.entries||[]).some(function(e){return e.type==='CAR-T 细胞'&&!e.provisional;})){
      text+='CAR-T 是在实验室改造的 T 细胞，表面受体帮助它识别带有相应标记的细胞并发动杀伤；这个标记也可能出现在正常组织，仍须看具体产品的安全性和人体结果。';
      sources.push({label:'NCI：CAR-T 细胞识别肿瘤的原理',url:'https://www.cancer.gov/about-cancer/treatment/research/car-t-cells'});
    }else if(text.length<85&&/T 细胞上的两处刹车/.test(text)){
      text='卡度尼利单抗同时阻断 PD-1 和 CTLA-4 两条抑制 T 细胞的信号，研究者希望借此增强免疫细胞对肿瘤的攻击。联合其他药物后的效果，须按这项研究的人群和方案单独判断。';
      sources.push({label:'NCI：PD-1 和 CTLA-4 免疫检查点',url:'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/immune-checkpoint-protein'});
    }else if(text.length<85&&/松开 T 细胞上的刹车|阻断 PD-1|挡住 PD-L1/.test(text)){
      text+='PD-1 与 PD-L1 接触时会压低 T 细胞的杀伤能力；阻断这条信号，是希望让免疫细胞重新攻击肿瘤。该机制本身不能说明这项联合方案在胰腺癌中的效果。';
      sources.push({label:'NCI：PD-1 与 T 细胞的作用',url:'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/pd-1'});
    }else if(text.length<85&&/挡住 CTLA-4/.test(text)){
      text+='CTLA-4 会抑制 T 细胞活化；阻断后，研究者希望增强免疫细胞对肿瘤的反应。胰腺癌中已公布的联合用药结果不能当作本药单用的效果。';
      sources.push({label:'NCI：伊匹木单抗与 CTLA-4 作用机制',url:'https://www.cancer.gov/publications/dictionaries/cancer-drug/def/ipilimumab'});
    }else if(text.length<80&&/抑制肿瘤血管生成/.test(text)){
      text+='VEGF 等信号促使肿瘤形成新血管；阻断相关通路，是希望减少肿瘤获得的血液供应。这个作用原理不能推断联合方案能延长生存。';
      sources.push({label:'NCI：血管生成抑制剂的作用原理',url:'https://www.cancer.gov/publications/dictionaries/cancer-terms/def/angiogenesis-inhibitor'});
    }
    // A one-drug explanation is misleading when the current intervention names
    // additional verified drugs. Describe their own mechanism without assuming
    // that alternative arms are given together.
    var extras=[];
    var drugsOnly=low(row.drugs||'');
    function namedInDrugs(name){
      var value=low(name||'');if(value.length<4)return false;
      if(/[^\x00-\x7f]/.test(value))return drugsOnly.indexOf(value)>=0;
      var escaped=value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      return new RegExp('(^|[^a-z0-9])'+escaped+'(?=$|[^a-z0-9])','i').test(drugsOnly);
    }
    matched.forEach(function(c){
      if(extras.length>=2||FAMILIAR[c.id]||PROCEDURE[c.id]||c.id==='cisplatin-brca'||!cardHit(c,drugsOnly))return;
      var display=window.__trialDrugDisplayName(c),code=display.split(/[（(]/)[0];
      if(window.__trialDrugDisplayText(text).toLowerCase().indexOf(code.toLowerCase())>=0)return;
      var entry=(profile&&profile.entries||[]).find(function(e){return e.name===c.name||window.__trialDrugDisplayText(e.name).toLowerCase()===code.toLowerCase();});
      if(entry&&entry.type==='ADC 抗体偶联药'&&(entry.targets||[]).some(function(t){return text.indexOf(t)>=0;})&&/抗体偶联|抗体负责识别/.test(text))return;
      var it=(c.items||[]).find(function(x){return /怎么起作用|作用机制/.test(x.grade)&&/^https?:\/\//.test(x.url||'')&&/抑制|阻断|挡住|递送|带到|识别|杀伤|降解|修复/.test(x.text||'')&&!/还没说|未公开|不知道|其他癌种/.test(x.text||'');});
      if(!it)return;
      if(/抗体偶联|抗体负责识别/.test(text)&&(profile&&profile.entries||[]).some(function(e){return e.type==='ADC 抗体偶联药'&&(e.targets||[]).some(function(t){return text.indexOf(t)>=0&&it.text.indexOf(t)>=0;});}))return;
      var copy=String(it.text||'').split(/。/)[0].trim();
      if(!copy||copy.length>125||/胃癌|肺癌|乳腺癌|结直肠癌/.test(copy))return;
      if(window.__trialDrugDisplayText(copy).toLowerCase().indexOf(code.toLowerCase())<0)copy=code+'：'+copy;
      extras.push('登记还列有 '+copy+'。');
      sources.push({label:display+'：作用机制来源',url:it.url});
    });
    (profile&&profile.entries||[]).forEach(function(e){
      if(extras.length>=2||e.provisional||e.chemotherapy||e.role==='对照组'||e.type==='化疗 / 化疗递送'||e.type==='机制待细分'||!e.explanation||!/^https?:\/\//.test(e.url||'')||!namedInDrugs(e.name))return;
      var name=window.__trialDrugDisplayText(e.name),code=name.split(/[（(]/)[0];
      if(window.__trialDrugDisplayText(text).toLowerCase().indexOf(code.toLowerCase())>=0||window.__trialDrugDisplayText(extras.join('')).toLowerCase().indexOf(code.toLowerCase())>=0)return;
      if(e.type==='ADC 抗体偶联药'&&(e.targets||[]).some(function(t){return text.indexOf(t)>=0;})&&/抗体偶联|抗体负责识别/.test(text))return;
      var copy=name==='AK109'?'AK109 阻断 VEGF 与 VEGFR2 结合，研究者希望减少支持肿瘤生长的新生血管':String(e.explanation).split(/。/).filter(function(x){return x&&!/胃癌|肺癌|乳腺癌|结直肠癌/.test(x);}).slice(0,2).join('。');
      if(!copy||copy.length>160||window.__trialDrugDisplayText(text).indexOf(window.__trialDrugDisplayText(copy))>=0)return;
      extras.push('登记还列有 '+copy.replace(/^([^：]{1,35}：)\s*/,name+'：')+'。');
      sources.push({label:name+'：作用机制来源',url:e.url});
    });
    if(extras.length)text+='\n\n'+extras.join('');
    part.v=text;
  }
  function restoreSourceNumbers(parts,row,matched,reviewed,sources){
    if(reviewed)return;
    var part=parts.find(function(p){return p.k==='已有数字';});
    if(!part||part.v.length>330)return;
    function tokens(value){
      var out=(String(value||'').match(/\d+(?:\.\d+)?\s*(?:对\s*\d+(?:\.\d+)?\s*)?(?:%|个月)/g)||[]).map(function(x){return x.replace(/\s+/g,'');});
      if(/客观缓解率\s*0(?:\s*%|[，。；]|$)/.test(value))out.push('客观缓解率0');
      return out;
    }
    var wanted=tokens(part.v),choices=[];
    matched.forEach(function(c){(c.items||[]).forEach(function(it){
      if(it.grade!=='已经有的数据'||!/^https?:\/\//.test(it.url||'')||!PANC.test(it.text||''))return;
      if(!itemApplies(it.text,row)||regimenMiss(row,it.text))return;
      var have=tokens(it.text),hits=wanted.filter(function(x){return have.indexOf(x)>=0;}).length;
      if(hits)choices.push({card:c,item:it,hits:hits});
    });});
    choices.sort(function(a,b){return b.hits-a.hits;});
    if(!choices.length||(choices[1]&&choices[0].hits===choices[1].hits))return;
    var best=choices[0].item,body=String(best.text||'').trim();
    if(body.length<=part.v.length+20||body.length>650)return;
    var same=(best.trialIds||best.studyIds||[]).indexOf(row.id)>=0||((best.source||'')+' '+best.url).indexOf(row.id)>=0;
    part.v=(same?'本项已公布的结果：':'同药相关研究（不能直接当作本项方案结果）：')+body;
    sources.push({label:best.source||choices[0].card.name+'：研究结果',url:best.url});
  }
  function completeEvidenceParts(row, original, matched, reviewed){
    var numericBasis=original.some(function(p){return p.k==='已有数字'&&/\d/.test(p.v||'');});
    var parts=original.map(function(p){return Object.assign({},p);});
    // Newly reviewed studies retain their complete cohort, regimen and caveats.
    // Do not reconstruct these fields by clipping sentences out of prose.
    var treatment=(window.__TRIAL_TREATMENTS__||{})[row.id];
    if(!row._reviewedEvidence&&!(treatment&&treatment.evidence)){
      var studies=[];
      matched.filter(function(c){return c.structuredEvidence;}).forEach(function(c){
        (c.items||[]).filter(function(it){return it.grade==='已经有的数据'&&!regimenMiss(row,it.text)&&itemApplies(it.text,row);}).forEach(function(it){studies.push(c.name+'（其他研究，不能当作本项试验结果）：'+it.text);});
      });
      if(studies.length){
        var numeric=parts.find(function(p){return p.k==='已有数字';});
        if(numeric)numeric.v=studies.join('\n\n');else parts.push({k:'已有数字',v:studies.join('\n\n')});
      }
    }
    var fix=EVIDENCE_CLARIFICATIONS[row.id]||{},sources=(fix.sources||[]).slice();
    var why=parts.find(function(p){return p.k==='为什么可能有用';});
    if(fix.why){if(why)why.v=fix.why;else parts.splice(Math.min(1,parts.length),0,{k:'为什么可能有用',v:fix.why});}
    if(!parts.some(function(p){return p.k==='为什么可能有用';})){
      var mechanisms=row._mechanisms||(window.__trialMechanismFor?window.__trialMechanismFor(row):null);
      var known=(mechanisms&&mechanisms.entries||[]).filter(function(e){return e.explanation&&!e.provisional;});
      var text=known.map(function(e){if(e.url)sources.push({label:e.name+'：作用机制来源',url:e.url});return e.explanation;}).join('');
      // A chemotherapy entry must not suppress a separately cited study intervention.
      text+=matched.map(function(c){
        var covered=known.some(function(e){return cardHit(c,low(e.name))||String(e.name).replace(/[-\s]/g,'').toLowerCase()===c.name.split(/[（(]/)[0].replace(/[-\s]/g,'').toLowerCase();});
        if(covered)return '';
        var m=MECHANISM_EXPLANATIONS[c.id];if(m){sources.push({label:m.source,url:m.url});return m.text;}
        return (c.items||[]).filter(function(it){return /起作用|作用机制/.test(it.grade)&&/抑制|阻断|挡住|松开|带到|递送|拉到|杀|降解|改造|照射/.test(it.text)&&!/还没说|未公开|不知道|不是单药/.test(it.text);}).map(function(it){
          if(it.url)sources.push({label:c.name+'：作用机制资料',url:it.url});return c.name+'：'+it.text;
        }).join('');
      }).join('');
      var unresolved=matched.filter(function(c){
        if(FAMILIAR[c.id]||PROCEDURE[c.id]||c.id==='cell-vaccine')return false;
        return !known.some(function(e){return cardHit(c,low(e.name))||String(e.name).replace(/[-\s]/g,'').toLowerCase()===c.name.split(/[（(]/)[0].replace(/[-\s]/g,'').toLowerCase();})&&!MECHANISM_EXPLANATIONS[c.id]&&!(c.items||[]).some(function(it){return /起作用|作用机制/.test(it.grade)&&/抑制|阻断|挡住|松开|带到|递送|拉到|杀|降解|改造|照射/.test(it.text)&&!/还没说|未公开|不知道|不是单药/.test(it.text);});
      }).map(function(c){return c.name.split(/[（(]/)[0];});
      if(unresolved.length)text=unresolved.join('、')+' 的具体作用机制，本页尚未补齐，仍待核实。'+text;
      parts.splice(Math.min(1,parts.length),0,{k:'为什么可能有用',v:text?text+' 这里只解释已核实的干预，不能据此判断整个方案已经有效。':'本页暂未收录这项方案可核实的机制说明，仍需补查研究药物及其作用依据。'});
    }
    // Updated drug data from a different registered study belongs with other
    // pancreatic research, even when a short plan synopsis quoted its number.
    if(!reviewed){
      var currentNumeric=parts.find(function(p){return p.k==='已有数字';});
      if(currentNumeric){
        var otherUpdated=matched.some(function(c){return (c.evidenceUpdated||c.structuredEvidence)&&(c.items||[]).some(function(it){
          if(it.grade!=='已经有的数据')return false;
          var same=(it.trialIds||it.studyIds||[]).indexOf(row.id)>=0||((it.source||'')+' '+(it.url||'')).indexOf(row.id)>=0;
          if(same)return false;
          var metrics=String(it.text||'').match(/\d+(?:\.\d+)?\s*(?:%|个月)/g)||[];
          return metrics.some(function(v){return currentNumeric.v.indexOf(v)>=0;});
        });});
        if(otherUpdated)parts=parts.filter(function(p){return p!==currentNumeric;});
      }
    }
    explainWhyInFull(parts,row,matched,row._mechanisms||(window.__trialMechanismFor?window.__trialMechanismFor(row):null),sources);
    restoreSourceNumbers(parts,row,matched,reviewed,sources);
    if(!parts.some(function(p){return p.k==='已有数字';})){
      var whyAt=parts.findIndex(function(p){return p.k==='为什么可能有用';});
      parts.splice(whyAt+1,0,{k:'疗效数据',v:fix.data||'目前可核对的是登记中的方案和研究依据；本页未找到与这项登记、胰腺癌队列及联合用药同时对应的疗效数字。下方若列有同药其他研究，其结果不能直接套用于这一行。'});
    }
    function appendPart(key,text){
      if(!text)return;
      var compact=function(s){return String(s||'').replace(/\s+/g,'');};
      if(parts.some(function(p){return compact(p.v).indexOf(compact(text))>=0;}))return;
      var part=parts.find(function(p){return p.k===key;});
      if(part)part.v+='\n\n'+text;else parts.push({k:key,v:text});
    }
    if(!parts.some(function(p){return p.k==='已有数字';})){
      appendPart('药物的其他胰腺癌研究',otherPancreaticResearch(matched.filter(function(c){return !c.evidenceUpdated&&!c.structuredEvidence;})));
    }
    var ownData=[];
    matched.filter(function(c){return c.evidenceUpdated||c.structuredEvidence;}).forEach(function(c){
      (c.items||[]).filter(function(it){return /^(已经有的数据|安全性数据|其他癌种数据|回顾性数据|临床前数据)$/.test(it.grade)&&/^https?:\/\//.test(it.url||'');}).forEach(function(it){
        sources.push({label:it.source||c.name,url:it.url});
        var body=it.text||'';
        if(parts.some(function(p){return String(p.v||'').replace(/\s+/g,'').indexOf(body.replace(/\s+/g,''))>=0;}))return;
        var sameStudy=(it.trialIds||it.studyIds||[]).indexOf(row.id)>=0||((it.source||'')+' '+it.url).indexOf(row.id)>=0;
        if(it.grade==='已经有的数据'&&sameStudy){
          // An explicitly reviewed newer edition owns this study's summary.
          // Keep older source links without reintroducing superseded figures.
          if(reviewed&&reviewed.reviewedAt&&reviewed.reviewedAt>=(it.reviewedAt||c.evidenceUpdated||''))return;
          ownData.push(body);return;
        }
        var text=c.name+'：'+body;
        if(it.grade==='已经有的数据'||it.grade==='回顾性数据'){
          appendPart('药物的其他胰腺癌研究','其他研究或队列，不能当作本项方案的结果。'+text);
        }else{
          var label=it.grade==='安全性数据'?'安全性资料：':it.grade==='临床前数据'?'临床前资料：':'其他癌种资料：';
          appendPart('研究背景与限制',label+text);
        }
      });
    });
    if(ownData.length){
      var numeric=parts.find(function(p){return p.k==='已有数字';});
      if(numeric)ownData.forEach(function(body){if(numeric.v.replace(/\s+/g,'').indexOf(body.replace(/\s+/g,''))<0)numeric.v+='\n\n'+body;});else parts.push({k:'已有数字',v:ownData.join('\n\n')});
      parts=parts.filter(function(p){return p.k!=='疗效数据';});
    }
    // Conferences are provenance, not a separate layer in the patient flow.
    (row._conferenceUpdates||[]).filter(function(ref){return /^https:\/\//.test(ref.url||'');}).forEach(function(ref){
      var meeting=ref.conference||ref.meeting||(/\/esmo2026\//.test(ref.url)?'ESMO 2026':'会议摘要');
      var basis=ref.basis==='clinical_trial_identification'?'相同登记，队列待核实':ref.basis==='methods_only_needs_review'?'方法段提及，需核对':'药物相同，方案或人群可能不同';
      sources.push({label:meeting+' '+(ref.number||'')+' · '+ref.title+'（'+basis+(ref.type==='trial_in_progress'?'；在研方案，无疗效结果':'')+'）',url:ref.url});
    });
    if(!fix.data&&parts.some(function(p){return p.k==='药物的其他胰腺癌研究';}))parts=parts.filter(function(p){return p.k!=='疗效数据';});
    // Older or different-study drug results must never sit under the current
    // trial's "已有数字" heading. Their score basis is retained separately.
    var priorNumeric=parts.find(function(p){return p.k==='已有数字'&&(/^(?:同药相关研究|更早|早期|另一项|其他研究)/.test(p.v||'')||/（其他研究，不能当作本项试验结果）/.test(p.v||''));});
    if(priorNumeric){
      var priorText=priorNumeric.v.replace(/^同药相关研究（不能直接当作本项方案结果）：/,'');
      var related=parts.find(function(p){return p!==priorNumeric&&p.k==='药物的其他胰腺癌研究';});
      if(related){if(related.v.indexOf(priorText)<0)related.v=priorText+'\n\n'+related.v;parts=parts.filter(function(p){return p!==priorNumeric;});}
      else{priorNumeric.k='药物的其他胰腺癌研究';priorNumeric.v=priorText;}
    }
    var scope=evidenceScope(row);
    if(scope==='basket'||scope==='unconfirmed'||scope==='pancreatic-cohort')parts.unshift({k:'研究队列',v:scope==='unconfirmed'?'登记资料尚未确认胰腺癌队列。所列资料介绍研究干预，不表示本项接收胰腺癌；须核对登记与研究中心。':scope==='basket'?'这是一项多癌种研究。下面的机制说明属于登记中的研究药物，不能据此认定有胰腺癌名额；是否接收胰腺癌及其具体队列、搭配需核对登记。':'入组资料涉及胰腺癌，但题目未单列该队列。药物机制和既有研究可供参考，具体胰腺癌队列及搭配需核对登记。'});
    return {parts:parts,sources:sources,mechanismGaps:unresolved||[],numericBasis:numericBasis};
  }
  window.__drugEvidenceFor=function(row){
    var blob=low(treatmentText(row));
    // Recruitment controls availability, not whether research evidence exists.
    var inScope=!!evidenceScope(row);
    if(!inScope)return {inScope:false,cards:[],benches:[],prose:"",rank:0,text:""};
    var profile=row._mechanisms||(window.__trialMechanismFor?window.__trialMechanismFor(row):null);
    var matched=(window.__DRUG_EVIDENCE__.drugs||[]).filter(function(card){return cardHit(card,blob);}).map(function(card){return currentMechanismCard(card,profile);});
    matched.sort(function(a,b){return (b.priority||0)-(a.priority||0);});
    var treatment=(window.__TRIAL_TREATMENTS__||{})[row.id];
    var recorded=row._reviewedEvidence||(treatment&&treatment.evidence),prior=ESMO_2026_EVIDENCE[row.id];
    var reviewed=recorded&&recorded.reviewedAt&&(!prior||recorded.reviewedAt>prior.reviewedAt)?recorded:(prior||recorded);
    var prose=reviewed?reviewed.parts.map(function(p){return p.v;}).join(''):planProse(row, matched);
    if(row.status!=='招募中'&&row.status!=='尚未招募'&&!reviewed){
      prose=prose.replace(/(?:这个方案|这项(?:[一二三四]期)?|本项|它)?自己的结果还没出来/g,'此登记的结果尚未核实').replace(/还在招募的部分还没出来/g,'后续部分的结果需另行核实');
    }
    var cards=matched.map(function(card){var copy=rewritePublished(card, row);var mechanism=MECHANISM_EXPLANATIONS[card.id];if(mechanism)copy=Object.assign({},copy,{items:(copy.items||[]).concat([{grade:'作用机制',text:mechanism.text,url:mechanism.url,source:mechanism.source}])});return copy;});
    var rank=cards.reduce(function(m,c){return Math.max(m,RANK[c.level]||1);}, 1);
    var completed=completeEvidenceParts(row,reviewed?reviewed.parts:evidenceParts(prose),matched,reviewed);
    var parts=completed.parts;
    function removeEmptyStatus(value){return String(value||'').replace(/(?:这个方案|这项[一二三四]期|本项|它)[^。]{0,45}自己的结果还没出来。/g,'').replace(/还在招募的部分还没出来。/g,'').replace(/这是这个登记已经发表的部分，后续部分的结果需另行核实。/g,'').trim();}
    parts=parts.map(function(p){return Object.assign({},p,{v:removeEmptyStatus(window.__trialDrugDisplayText(p.v))});});
    prose=removeEmptyStatus(window.__trialDrugDisplayText(prose));
    cards=cards.map(function(c){return Object.assign({},c,{name:window.__trialDrugDisplayName(c)});});
    var bench=reviewed?'':commonRegimens(row, matched);
    if(bench)parts.push({k:"常见方案效果",v:bench});
    var sourceSeen={},sourceLinks=(reviewed?reviewed.sources:[]).concat(completed.sources).filter(function(it){if(sourceSeen[it.url])return false;sourceSeen[it.url]=true;return true;});
    return {inScope:true,cards:cards,benches:[],sources:sourceLinks,mechanismGaps:completed.mechanismGaps,numericBasis:completed.numericBasis,note:"",prose:prose,parts:parts,rank:rank,text:prose+" "+parts.filter(function(p){return p.k!=="常见方案效果";}).map(function(p){return p.v;}).join(" ")+" "+matched.map(function(c){return [c.name].concat(c.aliases||[]).join(" ");}).join(" ")};
  };
  var PHASE={"上市":30,"三期":30,"三期有结果":30,"二期有数字":20,"一/二期有数字":15,"一期有数字":10,"三期未成功":8};
  var STATUS_SCORE={"招募中":5,"可申请（扩大使用）":4,"尚未招募":3,"进行中不招募":2,"见登记页":1};
  function maxYear(s){var ys=String(s||"").match(/(?:19|20)\d{2}/g);return ys?Math.max.apply(null,ys.map(Number)):0;}
  function firstNum(re,text){var m=re.exec(text);return m?+m[1]:null;}
  function pValue(s){var m=/P\s*=\s*(0?\.\d+)/i.exec(s);return m?+m[1]:null;}
  function betterScore(a,b){
    var keys=["band","kind","magnitude","phase","year"];
    for(var i=0;i<keys.length;i++){if(a[keys[i]]!==b[keys[i]])return a[keys[i]]>b[keys[i]]?a:b;}
    return a;
  }
  function scoreItem(text,level){
    var sentences=String(text||"").split(/。/);
    var os=null,pfsWin=null,mos=null,orr=null,pfs=null,fail=false,osNegative=false;
    sentences.forEach(function(s){
      if(/没有活得更久|没有延长总生存|提前停了|没有一人肿瘤明显缩小|客观缓解率\s*0\s*%|看不出比|没有提高/.test(s))fail=true;
      var osAt=s.search(/总生存/);
      if(osAt>=0){
        var tail=s.slice(osAt);
        var hr=firstNum(/风险比\s*([0-9]+(?:\.[0-9]+)?)/,tail);
        var op=pValue(tail);
        var osig=op==null||op<0.05;
        var oblocked=/没有差别|不够确定|没有统计学意义|不劣于|没有显示出优于/.test(tail);
        if(hr!=null&&hr<1&&osig&&!oblocked){
          var mag=Math.round((1-hr)*1000)/10;
          if(!os||mag>os)os=mag;
        }else if(hr!=null||oblocked||(op!=null&&op>=0.05))osNegative=true;
        if(mos==null&&!osNegative){var m=firstNum(/中位总生存\s*([0-9]+(?:\.[0-9]+)?)/,s);if(m!=null)mos=m;}
      }
      var pfsAt=s.search(/无进展生存/);
      if(pfsAt>=0){
        var ptail=s.slice(pfsAt);
        var pp=pValue(ptail);
        var psig=pp==null||pp<0.05;
        var pblocked=/不够确定|没有统计学意义/.test(ptail);
        var phr=firstNum(/风险比\s*([0-9]+(?:\.[0-9]+)?)/,ptail);
        if(phr!=null&&phr<1&&psig&&!pblocked){
          var pmag=Math.round((1-phr)*1000)/10;
          if(!pfsWin||pmag>pfsWin)pfsWin=pmag;
        }
        if(pfs==null){var f=firstNum(/中位无进展生存\s*([0-9]+(?:\.[0-9]+)?)/,s);if(f!=null)pfs=f;}
      }
      if(orr==null){var o=firstNum(/客观缓解率\s*([0-9]+(?:\.[0-9]+)?)\s*%/,s);if(o!=null)orr=o;}
    });
    var phase=PHASE[level]||((os!=null||pfsWin!=null||mos!=null||orr!=null||pfs!=null)?12:0);
    if(os!=null)return {band:5,kind:4,magnitude:os,phase:phase};
    if(fail||level==="三期未成功"){
      var nmag=mos!=null?mos:(orr!=null?orr:(pfs||0));
      return {band:4,kind:mos!=null?2:(orr!=null?1:0),magnitude:nmag,phase:phase};
    }
    if(pfsWin!=null)return {band:5,kind:3,magnitude:pfsWin,phase:phase};
    if(mos!=null)return {band:5,kind:2,magnitude:mos,phase:phase};
    if(orr!=null)return {band:5,kind:1,magnitude:orr,phase:phase};
    if(pfs!=null)return {band:5,kind:0,magnitude:pfs,phase:phase};
    return null;
  }
  function itemApplies(text,row){
    if(adjuvant(row)&&/转移|一线|经治/.test(text)&&!/术后|辅助|切除后/.test(text))return false;
    var adjuvantOnly=/术后|辅助|切除后/.test(text);
    if(!adjuvantOnly)return true;
    return /(?<!新)辅助|(?<!neo)adjuvant|术后|切除后/i.test((row.title||"")+" "+(row.title_zh||"")+" "+(row.setting||""));
  }
  function scoreCard(card,row){
    var best=null, year=0;
    (card.items||[]).forEach(function(it){
      if(it.contextOnly||(it.trialIds&&it.trialIds.indexOf(row.id)<0))return;
      if(it.grade!=="已经有的数据"||!itemApplies(it.text,row)||regimenMiss(row,it.text))return;
      year=Math.max(year,maxYear(it.source),maxYear(it.text));
      var s=scoreItem(it.text,card.level);
      if(!s)return;
      s.year=Math.max(maxYear(it.source),maxYear(it.text));
      best=best?betterScore(best,s):s;
    });
    if(best){if(!best.year)best.year=year;return best;}
    var blob=(card.items||[]).map(function(it){return it.text;}).join(" ");
    if(/小鼠|临床前|细胞实验|动物或细胞/.test(blob))return {band:3,kind:0,magnitude:0,phase:0,year:maxYear(blob)};
    if(card.level==="不是肿瘤疗效")return {band:1,kind:0,magnitude:0,phase:0,year:0};
    return {band:2,kind:0,magnitude:0,phase:0,year:0};
  }
  window.__drugBenefit=function(row){
    var empty={band:-1,kind:0,magnitude:0,phase:0,year:0,status:0,updated:0,novel:0};
    if(!PANC.test((row.title||"")+" "+(row.title_zh||"")))return empty;
    var blob=low(treatmentText(row));
    var matched=(window.__DRUG_EVIDENCE__.drugs||[]).filter(function(card){return cardHit(card,blob);});
    var best=null;
    var nasox=nasoxBlob(blob);
    var experimental=matched.filter(function(c){return !FAMILIAR[c.id]&&!IMMUNO[c.id]&&!PROCEDURE[c.id];});
    var pool=experimental.length?experimental:matched;
    pool.forEach(function(card){
      if(nasox&&(card.id==="s-1"||card.id==="onivyde"))return;
      if(IMMUNO[card.id]||PROCEDURE[card.id])return;
      var s=scoreCard(card,row);best=best?betterScore(best,s):s;
    });
    if(best&&best.band>=5){
      var shown=window.__drugEvidenceFor(row);
      var hasNum=shown&&(shown.numericBasis||(shown.parts||[]).some(function(p){return p.k==="已有数字"&&/\d/.test(p.v||"");}));
      if(!hasNum)best={band:2,kind:0,magnitude:0,phase:0,year:best.year||0};
    }
    if(!best)best={band:0,kind:0,magnitude:0,phase:0,year:0};
    var novel=matched.some(function(c){return !FAMILIAR[c.id]&&!IMMUNO[c.id]&&!PROCEDURE[c.id];})?1:0;
    var updated=String(row.updated||"").replace(/-/g,"");
    return {band:best.band,kind:best.kind,magnitude:best.magnitude,phase:best.phase,year:best.year,status:STATUS_SCORE[row.status]||0,updated:+updated||0,novel:novel};
  };
})();
