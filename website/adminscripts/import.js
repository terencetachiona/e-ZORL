const today="2019-06-17T18:00:00";

const fs=require("fs-extra");
const sqlite3 = require('sqlite3').verbose(); //https://www.npmjs.com/package/sqlite3
const ops=require("./../ops");
  ops.propagator=require("./../propagator.js")

const xmldom=require("xmldom"); //https://www.npmjs.com/package/xmldom
const domParser=new xmldom.DOMParser();

const dbpath="/home/mbm/terminologue/data/termbases/rialacha.sqlite";
var db=new sqlite3.Database(dbpath, sqlite3.OPEN_READWRITE);
db.run('PRAGMA journal_mode=WAL');
db.run('PRAGMA foreign_keys=on');

var lang_id2abbr={}; //eg. "432543" -> "ga"
var subdomain2superdomain={}; //eg. "545473" --> "544354"
var lowAcceptLabelIDs=[];
var changeID=0;
var xrefs={}; //conceptID -> [conceptID]
var todDates={}; //termID -> [date]
var noteTypeIDs=["913502", "4141127", "913493", "913508", "5346857", "913504"];

//deed(100);
//deed(1000000);
//DoWords();
//DoLemmatize();
//DoSpelling();
DoExtranet(db);

function deed(stop){
  // readTOD();
  readXrefs();
  db.exec("delete from entries; delete from history; delete from metadata; delete from terms; delete from entry_term; delete from sqlite_sequence", function(err){
    console.log(`database emptied`);
    db.run("BEGIN TRANSACTION");
    doLanguages(db, function(){
      doAcceptLabels(db, function(){
        doInflectLabels(db, function(){
          doSources(db, function(){
            doPosLabels(db, function(){
              doDomains(db, function(){
                doCollections(db, function(){
                  doNoteTypes(db, function(){
                    doConcepts(db, 0, stop, function(){
                      db.run("COMMIT");
                      db.close();
                      console.log(`finito`);
                      // var obj={
                      //   title: {ga: "Téarmaí ar gá féachaint orthu", en: "Terms that need to be looked at", $: "Téarmaí ar gá féachaint orthu"},
                      //   live: "1",
                      //   users: ["valselob@gmail.com"]
                      // };
                      // ops.metadataCreate(db, "bnt", "extranet", null, JSON.stringify(obj), function(){
                      //   db.run("COMMIT");
                      //   db.close();
                      //   console.log(`finito`);
                      // });
                  });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

function readTOD(){
  var txt=fs.readFileSync("/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-in/tod.txt", "utf8");
  var lines=txt.split("\r\n");
  lines.map(line => {
    var cols=line.split("\t");
    if(cols.length==2 && cols[0].startsWith("2")){
      var date=cols[0].substring(0, 10);
      var termID=cols[1];
      if(!todDates[termID]) todDates[termID]=[];
      todDates[termID].push(date);
    }
  });
}

function readXrefs(){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.xrefgroup/";
  var filenames=fs.readdirSync(dir);
  filenames.map(filename => {
    if(filename.match(/\.xml$/)){
      var xrefGroupID=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var els=doc.getElementsByTagName("concept");
      var conceptIDs=[];
      for(var i=0; i<els.length; i++){
        var el=els[i];
        var conceptID=el.getAttribute("default");
        conceptIDs.push(conceptID);
      }
      if(conceptIDs.length>0){
        conceptIDs.map(motherID => {
          if(!xrefs[motherID]) xrefs[motherID]=[];
          conceptIDs.map(childID => {
            if(childID!=motherID) xrefs[motherID].push(childID);
          });
        });
      }
    }
  });
}

function doLanguages(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.language/";
  var lingo={languages: [
    {abbr: "ga", role: "major", title: {ga: "Gaeilge", en: "Irish"}},
    {abbr: "en", role: "major", title: {ga: "Béarla", en: "English"}},
  ]};
  var filenames=fs.readdirSync(dir);
  filenames.map(filename => {
    if(filename.match(/\.xml$/)){
      var id=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var abbr=doc.documentElement.getAttribute("abbr");
      lang_id2abbr[id]=abbr;
      if(abbr!="ga" && abbr!="en") {
        var json={abbr: abbr, role: "minor", title: {
          ga: doc.getElementsByTagName("nameGA")[0].getAttribute("default"),
          en: doc.getElementsByTagName("nameEN")[0].getAttribute("default"),
        }};
        lingo.languages.push(json);
      }
    }
  });
  ops.configUpdate(db, "bnt", "lingo", JSON.stringify(lingo), function(){
    var defaultAbc=[["a", "á", "à", "â", "ä", "ă", "ā", "ã", "å", "ą", "æ"],["b"],["c", "ć", "ċ", "ĉ", "č", "ç"],["d", "ď", "đ"],["e", "é", "è", "ė", "ê", "ë", "ě", "ē", "ę"],["f"],["g", "ġ", "ĝ", "ğ", "ģ"],["h", "ĥ", "ħ"],["i", "ı", "í", "ì", "i", "î", "ï", "ī", "į"],["j", "ĵ"],["k", "ĸ", "ķ"],["l", "ĺ", "ŀ", "ľ", "ļ", "ł"],["m"],["n", "ń", "ň", "ñ", "ņ"],["o", "ó", "ò", "ô", "ö", "ō", "õ", "ő", "ø", "œ"],["p"],["q"],["r", "ŕ", "ř", "ŗ"],["s", "ś", "ŝ", "š", "ş", "ș", "ß"],["t", "ť", "ţ", "ț"],["u", "ú", "ù", "û", "ü", "ŭ", "ū", "ů", "ų", "ű"],["v"],["w", "ẃ", "ẁ", "ŵ", "ẅ"],["x"],["y", "ý", "ỳ", "ŷ", "ÿ"],["z", "ź", "ż", "ž"]]
    ops.configUpdate(db, "bnt", "abc", JSON.stringify({en: defaultAbc, ga: defaultAbc}), function(){
      console.log("languages done");
      callnext();
    });
  });
}
function doAcceptLabels(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.acceptLabel/";
  var filenames=fs.readdirSync(dir);
  doOne();
  function doOne(){
    if(filenames.length>0){
      var filename=filenames.pop();
      var id=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var json={
        title: {
          ga: doc.getElementsByTagName("nameGA")[0].getAttribute("default"),
          en: doc.getElementsByTagName("nameEN")[0].getAttribute("default"),
        },
        level: doc.getElementsByTagName("level")[0].getAttribute("default") || "0",
      };
      if(parseInt(json.level)<0) lowAcceptLabelIDs.push(id);
      ops.metadataUpdate(db, "bnt", "acceptLabel", id, JSON.stringify(json), function(){
        doOne();
      })
    } else {
      console.log("acceptability labels done");
      callnext();
    }
  };
}
function doInflectLabels(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.inflectLabel/";
  var filenames=fs.readdirSync(dir);
  doOne();
  function doOne(){
    if(filenames.length>0){
      var filename=filenames.pop();
      var id=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var json={
        abbr: doc.documentElement.getAttribute("abbr"),
        title: {
          ga: doc.getElementsByTagName("nameGA")[0].getAttribute("default"),
          en: doc.getElementsByTagName("nameEN")[0].getAttribute("default"),
        },
        isfor: [],
      };
      var isForGA=(doc.getElementsByTagName("isForGA")[0].getAttribute("default")=="1");
      var isForNonGA=(doc.getElementsByTagName("isForNonGA")[0].getAttribute("default")=="1");
      if(isForGA && isForNonGA) json.isfor=["_all"];
        else if(isForGA) json.isfor=["ga"];
        else if(isForNonGA) json.isfor=["en", "_allminor"];
      ops.metadataUpdate(db, "bnt", "inflectLabel", id, JSON.stringify(json), function(){
        doOne();
      })
    } else {
      console.log("inflect labels done");
      callnext();
    }
  };
}
function doSources(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.source/";
  var filenames=fs.readdirSync(dir);
  doOne();
  function doOne(){
    if(filenames.length>0){
      var filename=filenames.pop();
      var id=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var json={
        title: {
          ga: doc.getElementsByTagName("name")[0].getAttribute("default"),
          en: doc.getElementsByTagName("name")[0].getAttribute("default"),
        },
      };
      ops.metadataUpdate(db, "bnt", "source", id, JSON.stringify(json), function(){
        doOne();
      })
    } else {
      console.log("sources done");
      callnext();
    }
  };
}
function doPosLabels(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.posLabel/";
  var filenames=fs.readdirSync(dir);
  doOne();
  function doOne(){
    if(filenames.length>0){
      var filename=filenames.pop();
      var id=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var json={
        abbr: doc.documentElement.getAttribute("abbr"),
        title: {
          ga: doc.getElementsByTagName("nameGA")[0].getAttribute("default"),
          en: doc.getElementsByTagName("nameEN")[0].getAttribute("default"),
        },
        isfor: [],
      };
      var isForGA=(doc.getElementsByTagName("isForGA")[0].getAttribute("default")=="1");
      var isForNonGA=(doc.getElementsByTagName("isForNonGA")[0].getAttribute("default")=="1");
      if(isForGA && isForNonGA) json.isfor=["_all"];
        else if(isForGA) json.isfor=["ga"];
        else if(isForNonGA) json.isfor=["en", "_allminor"];
      ops.metadataUpdate(db, "bnt", "posLabel", id, JSON.stringify(json), function(){
        doOne();
      })
    } else {
      console.log("pos labels done");
      callnext();
    }
  };
}
function doDomains(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.domain/";
  var filenames=fs.readdirSync(dir);
  var domains={}; //"3543543" -> {...}
  filenames.map(filename => {
    var id=filename.replace(/\.xml$/, "");
    var xml=fs.readFileSync(dir+filename, "utf8");
    var doc=domParser.parseFromString(xml, 'text/xml');
    var json={
      _parentID: (doc.getElementsByTagName("parent").length>0 ? doc.getElementsByTagName("parent")[0].getAttribute("default") : null),
      title: {
        ga: (doc.getElementsByTagName("nameGA").length>0 ? doc.getElementsByTagName("nameGA")[0].getAttribute("default") : ""),
        en: (doc.getElementsByTagName("nameEN").length>0 ? doc.getElementsByTagName("nameEN")[0].getAttribute("default") : ""),
      },
      subdomains: [],
    };
    domains[id]=json;
  });
  var domainhier=[];
  for(domainID in domains){
    var domain=domains[domainID];
    if(domain._parentID) {
      domains[domain._parentID].subdomains.push(domain);
      domain.lid=domainID;
    } else {
      domainhier.push(domain);
      domain._id=domainID;
    }
    delete domain._parentID;
  }
  doOne();
  function doOne(){
    if(domainhier.length>0){
      var domain=domainhier.pop();
      var id=domain._id;
      delete domain._id;
      remember(id, domain.subdomains);
      ops.metadataUpdate(db, "bnt", "domain", id, JSON.stringify(domain), function(){
        doOne();
      })
    } else {
      console.log("domains done");
      callnext();
    }
  };
  function remember(superdomainID, subdomains){
    subdomains.map(subdomain => {
      subdomain2superdomain[subdomain.lid]=superdomainID;
      remember(superdomainID, subdomain.subdomains);
    });
  }
}
function doCollections(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.collection/";
  var filenames=fs.readdirSync(dir);
  doOne();
  function doOne(){
    if(filenames.length>0){
      var filename=filenames.pop();
      var id=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var json={
        title: {
          ga: doc.getElementsByTagName("nameGA")[0].getAttribute("default"),
          en: doc.getElementsByTagName("nameEN").length>0 ? doc.getElementsByTagName("nameEN")[0].getAttribute("default") : doc.getElementsByTagName("nameGA")[0].getAttribute("default"),
        },
      };
      ops.metadataUpdate(db, "bnt", "collection", id, JSON.stringify(json), function(){
        doOne();
      })
    } else {
      console.log("collections done");
      callnext();
    }
  };
}
function doNoteTypes(db, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.noteType/";
  var filenames=fs.readdirSync(dir);
  doOne();
  function doOne(){
    if(filenames.length>0){
      var filename=filenames.pop();
      var id=filename.replace(/\.xml$/, "");
      var xml=fs.readFileSync(dir+filename, "utf8");
      var doc=domParser.parseFromString(xml, 'text/xml');
      var json={
        title: {
          ga: doc.getElementsByTagName("name")[0].getAttribute("default"),
          en: "",
        },
        level: "1",
      };
      if(noteTypeIDs.indexOf(id)>-1){
        ops.metadataUpdate(db, "bnt", "noteType", id, JSON.stringify(json), function(){
          doOne();
        })
      } else {
        doOne();
      }
    } else {
      console.log("note types done");
      callnext();
    }
  };
}
function doConcepts(db, start, stop, callnext){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.concept/";
  var filenames=fs.readdirSync(dir).slice(start, stop);
  var todo=0;
  var done=0;
  filenames.map((filename, filenameIndex) => {
    var id=filename.replace(/\.xml$/, "");
    console.log(`starting to process entry ID ${id}`);
    var xml=fs.readFileSync(dir+filename, "utf8");
    var doc=domParser.parseFromString(xml, 'text/xml');
    var json={
      cStatus: (doc.documentElement.getAttribute("checked")=="0" ? "0" : "1"),
      pStatus: (doc.documentElement.getAttribute("hidden")=="1" ? "0" : "1"),
      dStatus: "1",
      dateStamp: "",
      tod: "",
      domains: [],
      desigs: [],
      intros: {ga: "", en: ""},
      definitions: [],
      examples: [],
      collections: [],
      extranets: [],
      xrefs: [],
      notes: [],
    };
    //xrefs:
    if(xrefs[id]) json.xrefs=xrefs[id];
    //count number of non-low-priority terms in each language:
    var goodTermsCountByLang={};
    var els=doc.getElementsByTagName("term");
    for(var i=0; i<els.length; i++) { var el=els[i];
      var accept=el.getAttribute("acceptLabel") || null;
      if(lowAcceptLabelIDs.indexOf(accept)==-1){
        var termID=el.getAttribute("default");
        var term=getTerm(termID);
        if(term) {
          if(!goodTermsCountByLang[term.lang]) goodTermsCountByLang[term.lang]=0;
          goodTermsCountByLang[term.lang]++;
        }
      }
    }
    //desigs:
    var els=doc.getElementsByTagName("term");
    for(var i=0; i<els.length; i++) { var el=els[i];
      var desig={
        term: {},
        clarif: el.getAttribute("clarification") || "",
        accept: el.getAttribute("acceptLabel") || null,
        sources: [],
      };
      //sources:
      var subels=el.getElementsByTagName("source");
      for(var ii=0; ii<subels.length; ii++) { var subel=subels[ii];
        desig.sources.push(subel.getAttribute("default"));
      }
      //the term:
      var termID=el.getAttribute("default");
      desig.term=getTerm(termID);
      //is the desig non-essential?
      desig.nonessential="0";
      if(desig.accept && lowAcceptLabelIDs.indexOf(desig.accept)>-1 && desig.term && goodTermsCountByLang[desig.term.lang]>0){
        desig.nonessential="1";
      }
      //desig done:
      if(desig.term) json.desigs.push(desig);
    }

    //tod:
    json.desigs.map(desig => {
      if(todDates[desig.term.id]){
        todDates[desig.term.id].map(date => {
          if(date>json.tod){
            json.tod=date;
          }
        });
      }
    });

    //domains:
    var els=doc.getElementsByTagName("domain");
    for(var i=0; i<els.length; i++) { el=els[i];
      if(el.parentNode.nodeName=="concept"){
        var domainID=el.getAttribute("default");
        if(subdomain2superdomain[domainID]) json.domains.push({superdomain: subdomain2superdomain[domainID], subdomain: domainID});
        else json.domains.push({superdomain: domainID, subdomain: null});
      }
    }
    //intros:
    var els=doc.getElementsByTagName("introGA");
    if(els.length>0 && els[0].getAttribute("default")!="") json.intros.ga=els[0].getAttribute("default");
    var els=doc.getElementsByTagName("introEN");
    if(els.length>0 && els[0].getAttribute("default")!="") json.intros.en=els[0].getAttribute("default");
    //definitions:
    var els=doc.getElementsByTagName("definition");
    for(var i=0; i<els.length; i++) { el=els[i];
      var domains=[];
      var domels=el.getElementsByTagName("domain");
      for(var ii=0; ii<domels.length; ii++) { domel=domels[ii];
        var domainID=domel.getAttribute("default");
        if(subdomain2superdomain[domainID]) domains.push({superdomain: subdomain2superdomain[domainID], subdomain: domainID});
        else domains.push({superdomain: domainID, subdomain: null});
      }
      var obj={texts: {ga: "", en: ""}, domains: domains, sources: [], nonessential: "0"};
      var subels=doc.getElementsByTagName("textEN");
      if(subels.length>0) {
        var text=subels[0].getAttribute("default");
        if(text!="") obj.texts["en"]=text;
      }
      subels=doc.getElementsByTagName("textGA");
      if(subels.length>0) {
        var text=subels[0].getAttribute("default");
        if(text!="") obj.texts["ga"]=text;
      }
      json.definitions.push(obj);
    }
    //examples:
    var els=doc.getElementsByTagName("example");
    for(var i=0; i<els.length; i++) { el=els[i];
      var example=getExample(el.getAttribute("default"));
      if(example) json.examples.push(example);
    }
    //collections:
    var els=doc.getElementsByTagName("collection");
    for(var i=0; i<els.length; i++) { el=els[i];
      json.collections.push(el.getAttribute("default"));
    }
    //notes:
    var els=doc.getElementsByTagName("note");
    for(var i=0; i<els.length; i++) { el=els[i];
      if(noteTypeIDs.indexOf(el.getAttribute("type"))>-1){
        json.notes.push({
          type: el.getAttribute("type"),
          texts: {
            ga: el.getAttribute("default"),
            en: "",
          },
          "sources": [],
          "nonessential": "0",
        });
      }
    }

    if(json.collections.indexOf("5346855")>-1) { //"Rialacha na nUaschúirteanna 2019 inmheánach"
      //save the entry:
      todo++;
      fs.appendFileSync("/home/mbm/terminologue/temp/entries.txt", line([
        id.toString(),
        JSON.stringify(json),
        json.cStatus,
        json.pStatus,
        "",
        json.tod,
        json.dStatus,
      ]));
      //save entry into history:
      fs.appendFileSync("/home/mbm/terminologue/temp/history.txt", line([
        (++changeID),
        id.toString(),
        "update",
        today,
        "",
        JSON.stringify(json),
        JSON.stringify({diff: [{desc: "iompórtáilte as Léacslann"}]})
      ]));
      //save entry sortings:
      var sortkeys=[];
      ["ga", "en"].map(lang => {
        var str="";
        json.desigs.map(desig => { if(desig.term.lang==lang) str+=desig.term.wording; });
        var abc=defaultAbc[lang];
        var sortkey=toSortkey(str, abc);
        sortkeys.push({lang: lang.abbr, key: sortkey})
        fs.appendFileSync("/home/mbm/terminologue/temp/entry_sortkey.txt", line([
          id.toString(),
          lang,
          sortkey
        ]));
      });
      //save connections:
      json.desigs.map(desig => {
        fs.appendFileSync("/home/mbm/terminologue/temp/entry_term.txt", line([
          id.toString(),
          desig.term.id,
          desig.accept||"0",
          desig.clarif||""
        ]));
      });
      //save domains:
      json.domains.map(obj => {
        fs.appendFileSync("/home/mbm/terminologue/temp/entry_domain.txt", line([
          id.toString(),
          obj.superdomain,
          obj.subdomain||"0"
        ]));
      });
      //save collections:
      json.collections.map(obj => {
        fs.appendFileSync("/home/mbm/terminologue/temp/entry_collection.txt", line([
          id.toString(),
          obj
        ]));
      });
      //save intros:
      for(var key in json.intros){
        fs.appendFileSync("/home/mbm/terminologue/temp/entry_intro.txt", line([
          id.toString(),
          json.intros[key]
        ]));
      }
      //save definitions:
      json.definitions.map(def => {
        for(var key in def.texts){
          if(def.texts[key]){
            fs.appendFileSync("/home/mbm/terminologue/temp/entry_def.txt", line([
              id.toString(),
              def.texts[key]
            ]));
          }
        }
      });
      //save notes:
      json.notes.map(note => {
        for(var key in note.texts){
          if(note.texts[key]){
            fs.appendFileSync("/home/mbm/terminologue/temp/entry_note.txt", line([
              id.toString(),
              note.type,
              key,
              note.texts[key],
            ]));
          }
        }
      });
      //save examples:
      json.examples.map(ex => {
        for(var key in ex.texts){
          ex.texts[key].map(text => {
            if(text){
              fs.appendFileSync("/home/mbm/terminologue/temp/entry_xmpl.txt", line([
                id.toString(),
                text
              ]));
            }
          });
        }
      });
      //save xrefs:
      json.xrefs.map(targetID => {
        fs.appendFileSync("/home/mbm/terminologue/temp/entry_xref.txt", line([
          id.toString(),
          targetID
        ]));
      });
    }

    //concept done:
    done++;
    if(done>=filenames.length) callnext();
  });
  console.log(`finished`);
}
var termsDone=[];
function getTerm(termID){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.term/";
  if(!fs.existsSync(dir+termID+".xml")) return null;
  var xml=fs.readFileSync(dir+termID+".xml", "utf8");
  var doc=domParser.parseFromString(xml, 'text/xml');
  var json={
    id: termID,
    lang: lang_id2abbr[ doc.getElementsByTagName("language")[0].getAttribute("default") ],
    wording: doc.getElementsByTagName("wording")[0].getAttribute("default"),
    annots: [],
    inflects: [],
  };
  //annotations:
  var els=doc.getElementsByTagName("annotation");
  for(var i=0; i<els.length; i++) { el=els[i];
    if(el.getAttribute("posLabel")){
      var annot={start: el.getAttribute("start"), stop: el.getAttribute("stop"), label: {type: "posLabel", value: el.getAttribute("posLabel")}};
      json.annots.push(annot);
    }
    if(el.getAttribute("inflectLabel")){
      var annot={start: el.getAttribute("start"), stop: el.getAttribute("stop"), label: {type: "inflectLabel", value: el.getAttribute("inflectLabel")}};
      json.annots.push(annot);
    }
    if(el.getAttribute("langLabel")){
      var annot={start: el.getAttribute("start"), stop: el.getAttribute("stop"), label: {type: "langLabel", value: lang_id2abbr[el.getAttribute("langLabel")]}};
      json.annots.push(annot);
    }
    if(el.getAttribute("tm")=="1"){
      var annot={start: el.getAttribute("start"), stop: el.getAttribute("stop"), label: {type: "symbol", value: "tm"}};
      json.annots.push(annot);
    }
    if(el.getAttribute("regTM")=="1"){
      var annot={start: el.getAttribute("start"), stop: el.getAttribute("stop"), label: {type: "symbol", value: "regtm"}};
      json.annots.push(annot);
    }
    if(el.getAttribute("proper")=="1"){
      var annot={start: el.getAttribute("start"), stop: el.getAttribute("stop"), label: {type: "symbol", value: "proper"}};
      json.annots.push(annot);
    }
    if(el.getAttribute("italic")=="1"){
      var annot={start: el.getAttribute("start"), stop: el.getAttribute("stop"), label: {type: "formatting", value: "italic"}};
      json.annots.push(annot);
    }
  }
  //inflects:
  var els=doc.getElementsByTagName("inflect");
  for(var i=0; i<els.length; i++) { el=els[i];
    var inflect={label: el.getAttribute("label"), text: el.getAttribute("text")};
    json.inflects.push(inflect);
  }
  //optionally save the term:
  if(termsDone.indexOf(termID)==-1){
    termsDone.push(termID);
    fs.appendFileSync("/home/mbm/terminologue/temp/terms.txt", line([
      termID.toString(),
      JSON.stringify(json),
      json.lang,
      json.wording
    ]));
    //save words:
    // var words=ops.wordSplit(json.wording, json.lang);
    // words.map(word => {
    //   fs.appendFileSync("/home/mbm/terminologue/temp/words.txt", line([
    //     termID.toString(),
    //     word,
    //     "0"
    //   ]));
    //   // getLemmas(json.lang, word, function(lemmas){
    //   //   lemmas.map(lemma => {
    //   //     fs.appendFileSync("/home/mbm/terminologue/temp/words.txt", line([
    //   //       termID.toString(),
    //   //       lemma,
    //   //       "1"
    //   //     ]));
    //   //   });
    //   // });
    // });
  }
  //return the term:
  return json;
}
function getExample(exampleID){
  var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/focdli.example/";
  if(!fs.existsSync(dir+exampleID+".xml")) return null;
  var xml=fs.readFileSync(dir+exampleID+".xml", "utf8");
  var doc=domParser.parseFromString(xml, 'text/xml');
  var json={
    texts: {ga: [], en: []},
    sources: [],
    nonessential: "0"
  };
  //English phrases:
  var els=doc.getElementsByTagName("phraseEN");
  for(var i=0; i<els.length; i++) { el=els[i];
    if(el.getAttribute("default")!="") json.texts.en.push(el.getAttribute("default"));
  }
  //Irish phrases:
  var els=doc.getElementsByTagName("phraseGA");
  for(var i=0; i<els.length; i++) { el=els[i];
    if(el.getAttribute("default")!="") json.texts.ga.push(el.getAttribute("default"));
  }
  return json;
}

var langDBs={};
function getLangDB(lang){
  if(lang=="ga" || lang=="en"){
    if(langDBs[lang]){
      return langDBs[lang];
    } else {
      var db=null;
      if(fs.existsSync("/home/mbm/terminologue/data/lang/"+lang+".sqlite")){
        db=new sqlite3.Database("/home/mbm/terminologue/data/lang/"+lang+".sqlite", sqlite3.OPEN_READONLY, function(err){});
        db.serialize();
        langDBs[lang]=db;
      }
      return db;
    }
  }
  return null;
}
function getLemmasMulti(lang, words, callnext){
  var langDB=getLangDB(lang);
  if(!langDB) callnext([]); else {
    var str="";
    words.map(word => {
      if(str!="") str+=",";
      str+="'"+word.replace(/'/g, "''")+"'";
    });
    langDB.all("select lemma from lemmatization where token in ("+str+")", {}, function(err, rows){
      var lemmas=[];
      for(var i=0; i<rows.length; i++) if(lemmas.indexOf(rows[i]["lemma"])==-1) lemmas.push(rows[i]["lemma"]);
      callnext(lemmas);
    });
  }
}

var defaultAbc={
  "en": [
    [
      "a",
      "á",
      "à",
      "â",
      "ä",
      "ă",
      "ā",
      "ã",
      "å",
      "ą",
      "æ"
    ],
    [
      "b"
    ],
    [
      "c",
      "ć",
      "ċ",
      "ĉ",
      "č",
      "ç"
    ],
    [
      "d",
      "ď",
      "đ"
    ],
    [
      "e",
      "é",
      "è",
      "ė",
      "ê",
      "ë",
      "ě",
      "ē",
      "ę"
    ],
    [
      "f"
    ],
    [
      "g",
      "ġ",
      "ĝ",
      "ğ",
      "ģ"
    ],
    [
      "h",
      "ĥ",
      "ħ"
    ],
    [
      "i",
      "ı",
      "í",
      "ì",
      "i",
      "î",
      "ï",
      "ī",
      "į"
    ],
    [
      "j",
      "ĵ"
    ],
    [
      "k",
      "ĸ",
      "ķ"
    ],
    [
      "l",
      "ĺ",
      "ŀ",
      "ľ",
      "ļ",
      "ł"
    ],
    [
      "m"
    ],
    [
      "n",
      "ń",
      "ň",
      "ñ",
      "ņ"
    ],
    [
      "o",
      "ó",
      "ò",
      "ô",
      "ö",
      "ō",
      "õ",
      "ő",
      "ø",
      "œ"
    ],
    [
      "p"
    ],
    [
      "q"
    ],
    [
      "r",
      "ŕ",
      "ř",
      "ŗ"
    ],
    [
      "s",
      "ś",
      "ŝ",
      "š",
      "ş",
      "ș",
      "ß"
    ],
    [
      "t",
      "ť",
      "ţ",
      "ț"
    ],
    [
      "u",
      "ú",
      "ù",
      "û",
      "ü",
      "ŭ",
      "ū",
      "ů",
      "ų",
      "ű"
    ],
    [
      "v"
    ],
    [
      "w",
      "ẃ",
      "ẁ",
      "ŵ",
      "ẅ"
    ],
    [
      "x"
    ],
    [
      "y",
      "ý",
      "ỳ",
      "ŷ",
      "ÿ"
    ],
    [
      "z",
      "ź",
      "ż",
      "ž"
    ]
  ],
  "ga": [
    [
      "a",
      "á",
      "à",
      "â",
      "ä",
      "ă",
      "ā",
      "ã",
      "å",
      "ą",
      "æ"
    ],
    [
      "b"
    ],
    [
      "c",
      "ć",
      "ċ",
      "ĉ",
      "č",
      "ç"
    ],
    [
      "d",
      "ď",
      "đ"
    ],
    [
      "e",
      "é",
      "è",
      "ė",
      "ê",
      "ë",
      "ě",
      "ē",
      "ę"
    ],
    [
      "f"
    ],
    [
      "g",
      "ġ",
      "ĝ",
      "ğ",
      "ģ"
    ],
    [
      "h",
      "ĥ",
      "ħ"
    ],
    [
      "i",
      "ı",
      "í",
      "ì",
      "i",
      "î",
      "ï",
      "ī",
      "į"
    ],
    [
      "j",
      "ĵ"
    ],
    [
      "k",
      "ĸ",
      "ķ"
    ],
    [
      "l",
      "ĺ",
      "ŀ",
      "ľ",
      "ļ",
      "ł"
    ],
    [
      "m"
    ],
    [
      "n",
      "ń",
      "ň",
      "ñ",
      "ņ"
    ],
    [
      "o",
      "ó",
      "ò",
      "ô",
      "ö",
      "ō",
      "õ",
      "ő",
      "ø",
      "œ"
    ],
    [
      "p"
    ],
    [
      "q"
    ],
    [
      "r",
      "ŕ",
      "ř",
      "ŗ"
    ],
    [
      "s",
      "ś",
      "ŝ",
      "š",
      "ş",
      "ș",
      "ß"
    ],
    [
      "t",
      "ť",
      "ţ",
      "ț"
    ],
    [
      "u",
      "ú",
      "ù",
      "û",
      "ü",
      "ŭ",
      "ū",
      "ů",
      "ų",
      "ű"
    ],
    [
      "v"
    ],
    [
      "w",
      "ẃ",
      "ẁ",
      "ŵ",
      "ẅ"
    ],
    [
      "x"
    ],
    [
      "y",
      "ý",
      "ỳ",
      "ŷ",
      "ÿ"
    ],
    [
      "z",
      "ź",
      "ż",
      "ž"
    ]
  ]
};
function toSortkey(s, abc){
  const keylength=5;
  var ret=s.replace(/\<[\<\>]+>/g, "").toLowerCase();
  //replace any numerals:
  var pat=new RegExp("[0-9]{1,"+keylength+"}", "g");
  ret=ret.replace(pat, function(x){while(x.length<keylength+1) x="0"+x; return x;});
  //prepare characters:
  var chars=[];
  var count=0;
  for(var pos=0; pos<abc.length; pos++){
    var key=(count++).toString(); while(key.length<keylength) key="0"+key; key="_"+key;
    for(var i=0; i<abc[pos].length; i++){
      if(i>0) count++;
      chars.push({char: abc[pos][i], key: key});
    }
  }
  chars.sort(function(a,b){ if(a.char.length>b.char.length) return -1; if(a.char.length<b.char.length) return 1; return 0; });
  //replace characters:
  for(var i=0; i<chars.length; i++){
    if(!/^[0-9]$/.test(chars[i].char)) { //skip chars that are actually numbers
      while(ret.indexOf(chars[i].char)>-1) ret=ret.replace(chars[i].char, chars[i].key);
    }
  }
  //remove any remaining characters that aren't a number or an underscore:
  ret=ret.replace(/[^0-9_]/g, "");
  return ret;
}
function line(arr){
  var ret="";
  arr.map((s, i) => {
    if(i>0) ret+="\t";
    ret+=s.toString().replace(/[\t\n]/g, " ");
  });
  ret+="\n";
  return ret;
}

function DoWords(){
  var wordsStream=fs.createWriteStream("/home/mbm/terminologue/temp/words.txt", {flags:'a'});
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('/home/mbm/terminologue/temp/terms.txt')
  });
  var termCounter=0;
  lineReader.on('line', function(_line) {
    var columns=_line.split('\t');
    if(columns.length==4){
      termCounter++;
      var termID=columns[0];
      var lang=columns[2];
      var wording=columns[3];
      var words=ops.wordSplit(wording);
      for(var i=0; i<words.length; i++){
        var word=words[i];
        console.log(termCounter, word);
        wordsStream.write(line([
          termID.toString(),
          word,
          "0"
        ]));
      }
    }
  });
}
function DoLemmatize(){
  var wordsStream=fs.createWriteStream("/home/mbm/terminologue/temp/words-lemmatized.txt", {flags:'a'});
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('/home/mbm/terminologue/temp/terms.txt')
  });
  var termCounter=0;
  lineReader.on('line', function(_line) {
    var columns=_line.split('\t');
    if(columns.length==4){
      termCounter++;
      var lang=columns[2];
      if(lang=="en" || lang=="ga") {
        var termID=columns[0];
        var wording=columns[3];
        var langDB=getLangDB(lang);
        if(langDB){
          var words=ops.wordSplit(wording);
          console.log(termCounter, wording);
          getLemmasMulti(lang, words, function(lemmas){
            for(var ii=0; ii<lemmas.length; ii++){
              var lemma=lemmas[ii];
              console.log("  -->", lemma);
              wordsStream.write(line([
                termID.toString(),
                lemma,
                "1"
              ]));
            }
          });
        }
      }
    }
  });
}
function DoSpelling(){
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('/home/mbm/terminologue/temp/terms.txt')
  });
  var termCounter=0;
  lineReader.on('line', function(_line) {
    var columns=_line.split('\t');
    if(columns.length==4){
      termCounter++;
      var termID=columns[0];
      var wording=columns[3];
      var si=ops.getSpellindex(wording);
      console.log(termCounter, wording);
      fs.appendFileSync("/home/mbm/terminologue/temp/spelling.txt", line([
        termID.toString(),
        wording,
        wording.length.toString(),
        si.a, si.b, si.c, si.d, si.e, si.f, si.g, si.h, si.i, si.j, si.k, si.l, si.m, si.n, si.o, si.p, si.q, si.r, si.s, si.t, si.u, si.v, si.w, si.x, si.y, si.z
      ]));
    }
  });
}

function DoExtranet(db){
  var extranetID=1;
  var extranet={
    "title": {"$": "Eislíon a bhí ar Léacslann"},
    "live": "0",
    "users": [],
  };
  ops.metadataCreate(db, "bnt", "extranet", extranetID, JSON.stringify(extranet), function(){
    var dir="/media/mbm/Windows/MBM/Fiontar/Export2Terminologue/data-out/extranet.comment/";
    var filenames=fs.readdirSync(dir);
    filenames.map((filename) => {
      if(filename.match(/\.xml$/)){
        var id=filename.replace(/\.xml$/, "");
        var xml=fs.readFileSync(dir+filename, "utf8");
        var doc=domParser.parseFromString(xml, 'text/xml');
        var entryID=doc.documentElement.getAttribute("about");
        var when=doc.documentElement.getAttribute("datetime");
        var email="";
        var body=doc.documentElement.getAttribute("body")+" — "+doc.documentElement.getAttribute("author");
        console.log(id);
        fs.appendFileSync("/home/mbm/terminologue/temp/comments.txt", line([
          id,
          entryID,
          extranetID,
          "",
          when,
          "",
          body,
        ]));
      }
    });
  })
}
