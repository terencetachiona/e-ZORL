var Spec={
  templates: {},
};
Spec.title=function(title, lang){
  if(title[lang]) return title[lang];
  if(title.$) return title.$;
  var ret="";
  var done=[];
  termbaseConfigs.lingo.languages.map(lang => {
    if(lang.role=="major" && title[lang.abbr] && done.indexOf(title[lang.abbr])==-1) {
      if(ret+="") ret+="/";
      ret+=title[lang.abbr];
      done.push(title[lang.abbr]);
    }
  });
  if(!ret) ret="???";
  return ret;
};
Spec.getDomain=function(id){
  var ret=null;
  termbaseMetadata.domain=(termbaseMetadata.domain || []);
  termbaseMetadata.domain.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};
Spec.longTitle=function(domain){
  var ret=Spec.title(domain.title);
  if(dom){
    var dom=domain; while(dom.parentID){
      var dom=Spec.getDomain(dom.parentID);
      if(dom) ret=Spec.title(dom.title)+" » "+ret;
    }
  }
  return ret;
};
Spec.domainHasChildren=function(domain){
  var ret=false;
  termbaseMetadata.domain.map(datum => {  if(datum.parentID==domain.id) ret=true; });
  return ret;
};
Spec.getAcceptLabel=function(id){
  var ret=null;
  termbaseMetadata.acceptLabel=(termbaseMetadata.acceptLabel || []);
  termbaseMetadata.acceptLabel.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};
Spec.getLangRole=function(abbr){
  var ret=null;
  termbaseConfigs.lingo.languages.map(lang => { if(!ret && lang.abbr==abbr) ret=lang.role; });
  return ret;
};
Spec.getLang=function(abbr){
  var ret=null;
  termbaseConfigs.lingo.languages.map(lang => { if(!ret && lang.abbr==abbr) ret=lang; });
  return ret;
};
Spec.getInflectLabel=function(id){
  var ret=null;
  termbaseMetadata.inflectLabel=(termbaseMetadata.inflectLabel || []);
  termbaseMetadata.inflectLabel.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};
Spec.getPosLabel=function(id){
  var ret=null;
  termbaseMetadata.posLabel=(termbaseMetadata.posLabel || []);
  termbaseMetadata.posLabel.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};
Spec.getCollection=function(id){
  var ret=null;
  termbaseMetadata.collection=(termbaseMetadata.collection || []);
  termbaseMetadata.collection.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};
Spec.getSource=function(id){
  var ret=null;
  termbaseMetadata.source=(termbaseMetadata.source || []);
  termbaseMetadata.source.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};
Spec.getExtranet=function(id){
  var ret=null;
  termbaseMetadata.extranet=(termbaseMetadata.extranet || []);
  termbaseMetadata.extranet.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};
Spec.getNoteType=function(id){
  var ret=null;
  termbaseMetadata.noteType=(termbaseMetadata.noteType || []);
  termbaseMetadata.noteType.map(datum => {  if(!ret && datum.id==id) ret=datum; });
  return ret;
};

Spec.changeHandler=function($insideme, changeName){
  if(triggers[changeName]){
    if(triggers[changeName].cStatus) $insideme.find('input[name="cStatus"][value="0"]').prop("checked", true);
    if(triggers[changeName].pStatus) $insideme.find('input[name="pStatus"][value="0"]').prop("checked", true);
  }
};

Spec.templates[":top"]={
  type: "object",
  html: `<div>
    <div class="fy_tabs">
      <span class="fy_tab" data-name="admin">${L("ADMIN")}</span>
      <span class="fy_tab" data-name="domains">${L("DOM")}</span>
      <span class="fy_tab on" data-name="terms">${L("TRM")}</span>
      <span class="fy_tab" data-name="intros">${L("INTR")}</span>
      <span class="fy_tab" data-name="definitions">${L("DEF")}</span>
      <span class="fy_tab" data-name="examples">${L("XMPL")}</span>
      <span class="fy_tab" data-name="images">${L("IMG")}</span>
      <span class="fy_tab" data-name="notes">${L("NOT")}</span>
      <span class="fy_tab" data-name="collections">${L("COLL")}</span>
      <span class="fy_tab" data-name="extranets">${L("EXT")}</span>
      <div class="clear"></div>
    </div>
    <div class="fy_body" data-name="admin">
      <div class="title">${L("CHECKING STATUS")}</div>
      <div class="fy_replace" templateName="cStatus" jsonName="cStatus"></div>
      <div class="title">${L("PUBLISHING STATUS")}</div>
      <div class="fy_replace" templateName="pStatus" jsonName="pStatus"></div>
      <div class="title">${L("DRAFTING STATUS")}</div>
      <div class="fy_replace" templateName="dStatus" jsonName="dStatus"></div>
      <div class="title">${L("LAST MAJOR UPDATE")}</div>
      <div class="fy_replace" templateName="dateStamp" jsonName="dateStamp"></div>
      <div class="title">${L("TERM OF THE DAY")}</div>
      <div class="fy_replace" templateName="tod" jsonName="tod"></div>
    </div>
    <div class="fy_body domains" data-name="domains">
      <div class="title">
        ${L("DOMAINS")}
        <button class="metadataOpener" onclick="Fy.doMetadata('../admin/domain/?hideHeader=yes')">${L("Domains")}</button>
      </div>
      <div class="fy_replace" templateName="domains" jsonName="domains"></div>
    </div>
    <div class="fy_body" data-name="terms">
      <div class="title">
        ${L("TERMS")}
        <button class="metadataOpener" onclick="Fy.doMetadata('../config/lingo/?hideHeader=yes')">${L("Languages")}</button>
      </div>
      <div class="fy_replace" templateName="desigs" jsonName="desigs"></div>
    </div>
    <div class="fy_body" data-name="intros">
      <div class="title">${L("INTROS")}</div>
      <div class="fy_replace" templateName="intros" jsonName="intros"></div>
    </div>
    <div class="fy_body" data-name="definitions">
      <div class="title">${L("DEFINITIONS")}</div>
      <div class="fy_replace" templateName="definitions" jsonName="definitions"></div>
    </div>
    <div class="fy_body" data-name="examples">
      <div class="title">${L("EXAMPLES")}</div>
      <div class="fy_replace" templateName="examples" jsonName="examples"></div>
    </div>
    <div class="fy_body" data-name="images">
      <div class="title">${L("IMAGES")}</div>
      <div class="fy_replace" templateName="images" jsonName="images"></div>
    </div>
    <div class="fy_body" data-name="notes">
      <div class="title">
        ${L("NOTES")}
        <button class="metadataOpener" onclick="Fy.doMetadata('../admin/noteType/?hideHeader=yes')">${L("Note types")}</button>
      </div>
      <div class="fy_replace" templateName="notes" jsonName="notes"></div>
    </div>
    <div class="fy_body" data-name="collections">
      <div class="title">
        ${L("COLLECTIONS")}
        <button class="metadataOpener" onclick="Fy.doMetadata('../admin/collection/?hideHeader=yes')">${L("Collections")}</button>
      </div>
      <div class="fy_replace" templateName="collections" jsonName="collections"></div>
    </div>
    <div class="fy_body" data-name="extranets">
      <div class="title">
        ${L("EXTRANETS")}
        <button class="metadataOpener" onclick="Fy.doMetadata('../admin/extranet/?hideHeader=yes')">${L("Extranets")}</button>
      </div>
      <div class="fy_replace" templateName="extranets" jsonName="extranets"></div>
    </div>
    <div class="fy_replace" templateName="xrefs" jsonName="xrefs"></div>
  </div>`,
  refresh: function($me){
    if(termbaseMetadata.domain.length==0){
      $me.find("*.fy_tab[data-name='domains']").hide();
      $me.find("*.fy_body[data-name='domains']").hide();
    }
    if(termbaseConfigs.lingo.languages.length==0){
      $me.find("*.fy_tab[data-name='terms']").hide();
      $me.find("*.fy_body[data-name='terms']").hide();
      $me.find("*.fy_tab[data-name='intros']").hide();
      $me.find("*.fy_body[data-name='intros']").hide();
      $me.find("*.fy_tab[data-name='definitions']").hide();
      $me.find("*.fy_body[data-name='definitions']").hide();
      $me.find("*.fy_tab[data-name='examples']").hide();
      $me.find("*.fy_body[data-name='examples']").hide();
    }
    if(termbaseMetadata.collection.length==0){
      $me.find("*.fy_tab[data-name='collections']").hide();
      $me.find("*.fy_body[data-name='collections']").hide();
    }
    if(termbaseMetadata.extranet.length==0){
      $me.find("*.fy_tab[data-name='extranets']").hide();
      $me.find("*.fy_body[data-name='extranets']").hide();
    }
  },
  preprocess: function(data){
    if(data.dStatus===undefined) data.dStatus="1"; //some entries have no dStatus field
    return data;
  },
};
Spec.templates["hiddenID"]={
  type: "string",
  html: `<input type="hidden"/>`,
  set: function($me, data){
    if(data.toString() || data==="") $me.val(data);
  },
  get: function($me){
    return $me.val();
  },
};
Spec.templates["nonessential"]={
  type: "string",
  html: `<div class="fy_node bottomRight">
    <label class="fy_noness"><input type="checkbox" onchange="Fy.changed('nonessentialChange'); Spec.templates.nonessential.refresh($(this).closest('.fy_node'))"/> ${L("non-essential")}</label>
  </div>`,
  set: function($me, data){
    $me.find("input").prop("checked", (data=="1"));
  },
  get: function($me){
    return ($me.find("input").prop("checked") ? "1" : "0");
  },
  refresh: function($me){
    var val=this.get($me);
    var $box=$me.closest(".fy_box");
    if(val=="1") $box.addClass("nonessential"); else $box.removeClass("nonessential");
    var $box=$me.closest(".fy_container").find(".fy_box");
    if(val=="1") $box.addClass("nonessential"); else $box.removeClass("nonessential");
  }
};

Spec.templates["cStatus"]={
  type: "string",
  html: `<div class="fy_node">
    <label><input type="radio" name="cStatus" value="1" onchange="Fy.changed('cStatusChange')"/> <img src='../../furniture/tick.png'/> ${L("checked")}</label>
    <label><input type="radio" name="cStatus" value="0" onchange="Fy.changed('cStatusChange')"/> <img src='../../furniture/cross.png'/> ${L("not checked")}</label>
  </div>`,
  set: function($me, data){
    $me.find("input[value='"+data+"']").prop("checked", true);
  },
  get: function($me){
    return $me.find("input:checked").val();
  },
};
Spec.templates["pStatus"]={
  type: "string",
  html: `<div class="fy_node">
    <label><input type="radio" name="pStatus" value="1" onchange="Fy.changed('pStatusChange')"/> <img src='../../furniture/tick.png'/> ${L("publishable")}</label>
    <label><input type="radio" name="pStatus" value="0" onchange="Fy.changed('pStatusChange')"/> <img src='../../furniture/cross.png'/> ${L("hidden")}</label>
  </div>`,
  set: function($me, data){
    $me.find("input[value='"+data+"']").prop("checked", true);
  },
  get: function($me){
    return $me.find("input:checked").val();
  },
};
Spec.templates["dStatus"]={
  type: "string",
  html: `<div class="fy_node">
    <label><input type="radio" name="dStatus" value="1" onchange="Fy.changed('dStatusChange')"/> <img src='../../furniture/tick.png'/> ${L("finished entry")}</label>
    <label><input type="radio" name="dStatus" value="0" onchange="Fy.changed('dStatusChange')"/> <img src='../../furniture/cross.png'/> ${L("draft entry")}</label>
  </div>`,
  set: function($me, data){
    $me.find("input[value='"+data+"']").prop("checked", true);
  },
  get: function($me){
    return $me.find("input:checked").val();
  },
};
Spec.templates["dateStamp"]={
  type: "string",
  html: `<div class="fy_node" style="min-height: 2em;">
    <div class="fy_horizon" style="width: 12em; display: inline-block; float: inline-start;">
      <span class="fy_textbox" style="width: 100%"><input class="date" type="date" onchange="Fy.changed('dateStampChange')"/></span>
    </div>
    <button style="margin-top: 1px; margin-inline-start: 1em;" onclick="$(this).closest('.fy_node').find('input').val((new Date()).toISOString().split('T')[0]); Fy.changed('dateStampChange')">${L("set to today")}</button>
  </div>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
};
Spec.templates["tod"]={
  type: "string",
  html: `<div class="fy_node" style="min-height: 2em;">
    <div class="fy_horizon" style="width: 12em; display: inline-block; float: inline-start;">
      <span class="fy_textbox" style="width: 100%"><input class="asterisk" type="date" onchange="Fy.changed('todChange')"/></span>
    </div>
    <button style="margin-top: 1px; margin-inline-start: 1em;" onclick="$(this).closest('.fy_node').find('input').val(todNextAvailableDate); todNextAvailableDateIncrement(); Fy.changed('todChange')">${L("set to next available date")}</button>
  </div>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
};

Spec.templates["domains"]={
  type: "array",
  html: `<div class="fy_nolineabove">
    <div class="fy_replace" templateName="domain" jsonName=":item"></div>
    <span class="fy_adder" templateName="domain" changeName="domainAdd">+ ${L("domain")}</span>
    <button class="metadataOpener" onclick="Fy.doMetadata('../admin/domain/?hideHeader=yes')">${L("Domains")}</button>
  </div>`,
};
Spec.templates["domain"]={
  type: "string",
  html: `<div class="fy_container refreshable" data-templateName="domain">
    <div class="fy_box">
      <div class="fy_horizon">
        <span class="fy_remover" changeName="domainRemove"></span>
        <span class="fy_downer" changeName="domainReorder"></span>
        <span class="fy_upper" changeName="domainReorder"></span>
        <span class="fy_textbox" style="display: block; margin-inline-start: 5px; margin-inline-end: 125px;">
          <select onchange="Fy.changed('domainChange');" size="1" style="width: 100%" onfocus="this.size='10'; Spec.changeSelectTitles(this)" onblur="this.size='1'; Spec.changeSelectTitles(this)"></select>
        </span>
      </div>
    </div>
  </div>`,
  populate: function($me){
    Spec.templates["domain"].refillOptions($me, 0);
  },
  set: function($me, data){
    Spec.templates["domain"].refillOptions($me, data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  refillOptions: function($me, selectedDomainID){
    domains=[];
    var selectedDomain=Spec.getDomain(selectedDomainID);
    if(!selectedDomain){ //if no domain is selected:
      termbaseMetadata.domain.map(domain => { if(!domain.parentID){ domains.push(domain); }});
    } else {
      domains.push(selectedDomain);
      termbaseMetadata.domain.map(domain => { if(domain.parentID==selectedDomainID){ domains.push(domain); }});
      //add all parents to the front of the list:
      var parentID=selectedDomain.parentID;
      while(parentID){
        var domain=Spec.getDomain(parentID);
        parentID=null;
        if(domain){
          domains.unshift(domain);
          parentID=domain.parentID;
        }
      }
    }
    var $select=$me.find("select").html("");
    var level=0;
    if(selectedDomain){
      $select.append(`<option class="oneofmany" value="0">(...)</option>`);
      var level=1;
    }
    var prevDomainID=0;
    domains.map(domain => {
      if(domain.parentID==prevDomainID) level++;
      var padding=""; for(var i=0; i<level; i++) padding+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
      var driller="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; if(Spec.domainHasChildren(domain)) driller="►&nbsp;";
      var shortTitle=`${padding}${driller}${Spec.title(domain.title)}`;
      var longTitle=Spec.longTitle(domain);
      var $option=$(`<option class="oneofmany" value="${domain.id}">${longTitle}</option>`);
      $option.data("shortTitle", shortTitle);
      $option.data("longTitle", longTitle);
      $select.append($option);
      prevDomainID=domain.id;
    });
    $select.find("option").on("click", function(e){
      Spec.templates["domain"].refillOptions($me, $(e.delegateTarget).attr("value"));
    });
    Spec.changeSelectTitles($select);
    $select.val(selectedDomainID);
  },
};
Spec.changeSelectTitles=function(select){
  var $select=$(select);
  if($select.attr("size")=="1"){
    $select.find("option").each(function(){
      var $option=$(this);
      if($option.data("longTitle")) $option.html($option.data("longTitle"));
    });
  } else {
    $select.find("option").each(function(){
      var $option=$(this);
      if($option.data("shortTitle")) $option.html($option.data("shortTitle"));
    });
  }
};

Spec.templates["desigs"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="desig" jsonName=":item"></div>
    <span class="fy_adder" templateName="desig" changeName="desigAdd">+ ${L("term")}</span>
  </div>`,
};
Spec.templates["desig"]={
  type: "object",
  blank: {term: {lang: "", wording: "", inflects: [], annots: []}, clarif: "", accept: "", sources: []},
  html: `<div class="fy_container fy_collapsible">
    <div class="fy_replace" templateName="term" jsonName="term"></div>
    <div class="fy_replace fy_hidable" templateName="accept" jsonName="accept"></div>
    <div class="fy_replace fy_hidable" templateName="clarif" jsonName="clarif"></div>
    <div class="fy_replace fy_hidable" templateName="sources" jsonName="sources"></div>
    <div class="fy_replace fy_hidable" templateName="nonessential" jsonName="nonessential"></div>
  </div>`,
  refresh: function($me){
    if(termbaseMetadata.source.length==0){
      $me.find(".jsonName_sources > .fy_adder").replaceWith("&nbsp;");
    }
    if(termbaseMetadata.acceptLabel.length==0){
      $me.find(".jsonName_accept").remove();
    }
  },
  postprocess: function(data){
    if(!data.accept) data.accept=null;
    return data;
  },
};
Spec.templates["term"]={
  type: "object",
  html: `<div class="fy_box">
    <div class="fy_replace" templateName="hiddenID" jsonName="id"></div>
    <div class="fy_bubble" style="display: none;"></div>
    <!-- <div class="fy_bubble fullon">2</div> -->
    <!-- <div class="fy_bubble sublime">2</div> -->
    <!-- <div class="fy_bubble fullon">2<span class="sublime">2</span></div> -->
    <!-- <div class="fy_bubble invisible">2</div> -->
    <div class="fy_horizon">
      <span class="fy_remover" changeName="desigRemove"></span>
      <span class="fy_downer" changeName="desigReorder"></span>
      <span class="fy_upper" changeName="desigReorder"></span>
      <span class="fy_replace" templateName="lang" jsonName="lang"></span>
      <span class="fy_replace" templateName="wording" jsonName="wording"></span>
    </div>
    <div class="fy_replace fy_hidable" templateName="annots" jsonName="annots"></div>
    <div class="fy_replace fy_hidable" templateName="inflects" jsonName="inflects"></div>
  </div>`,
  refresh: function($me){
    var termID=$me.find(".jsonName_id").first().val();
    var lang=$me.find(".jsonName_lang").first().find("select").val();
    var wording=$me.find(".jsonName_wording").first().find("input").val();
    Spec.sharEnquire($me, termID, lang, wording);
    if(termbaseMetadata.inflectLabel.length==0){
      $me.find(".jsonName_inflects").remove();
    }
  },
  postprocess: function(data){
    if(!data.inflects) data.inflects=[];
    return data;
  },
};
Spec.templates["lang"]={
  type: "string",
  html: `<span class="fy_textbox refreshable" data-templateName="lang" style="width: 95px;">
    <select style="font-weight: bold;" onchange="Fy.changed('termLangChange'); Spec.templates.lang.changed(this)"></select>
  </span>`,
  set: function($me, data){
    if(data.toString()) $me.find("select").val(data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  populate: function($me){
    var $select=$me.find("select");
    termbaseConfigs.lingo.languages.map(lang => {
      $select.append(`<option value="${lang.abbr}" title="${Spec.title(lang.title)}">${lang.abbr.toUpperCase()}</option>`)
    });
  },
  changed: function(select){
    $(select).closest(".jsonName_term").find(".jsonName_label").each(function(){
      var $label=$(this);
      if($label.data("template").refresh) $label.data("template").refresh($label);
    });
    Spec.templates.term.refresh($(select).closest(".jsonName_term"));
  },
};
Spec.templates["wording"]={
  type: "string",
  html: `<span class="fy_textbox" style="position: absolute; inset-inline-start: 100px; inset-inline-end: 110px;">
    <input style="font-weight: bold;" onkeyup="Spec.templates.wording.changed(this, 'eager')" onchange="Fy.changed('termWordingChange'); Spec.templates.wording.changed(this, 'lazy')"/>
  </span>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
  changed: function(input, how){
    $(input).closest(".jsonName_term").find(".jsonName_annots > .fy_node").each(function(){
      var $annot=$(this);
      $annot.data("template").refresh($annot);
    });
    if(!how || how=="lazy") Spec.templates.term.refresh($(input).closest(".jsonName_term"));
  },
};
Spec.templates["clarif"]={
  type: "string",
  html: `<div class="fy_horizon">
    <span class="fy_label" style="width: 245px;">${L("clarification")}</span>
    <span class="fy_textbox" style="position: absolute; inset-inline-start: 250px; inset-inline-end: 0px;"><input onchange="Fy.changed('desigClarifChange')"/></span>
  </div>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
  hidable: function($me){
    return ($me.find("input").val()=="");
  },
};
Spec.templates["accept"]={
  type: "string",
  html: `<div class="fy_horizon refreshable" data-templateName="accept">
    <span class="fy_label" style="width: 245px;">${L("acceptability")}<button title="${L("Acceptability labels")}" class="metadataOpener" onclick="Fy.doMetadata('../admin/acceptLabel/?hideHeader=yes')">&nbsp;</button></span>
    <span class="fy_textbox" style="position: absolute; inset-inline-start: 250px; inset-inline-end: 0px;">
      <select onchange="Fy.changed('desigAcceptChange')"></select>
    </span>
  </div>`,
  set: function($me, data){
    $me.find("select").val(data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  hidable: function($me){
    return !$me.find("select").val();
  },
  populate: function($me){
    var $select=$me.find("select");
    $select.html(`<option data-langs='"all"' value=""></option>`);
    termbaseMetadata.acceptLabel.map(datum => {
      $select.append(`<option value="${datum.id}" data-langs='${JSON.stringify(datum.langs)}'>${Spec.title(datum.title)}</option>`)
    });
  },
};
Spec.templates["sources"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="source" jsonName=":item"></div>
    <span class="fy_adder" templateName="source" changeName="sourceAdd">+ ${L("source")}</span>
  </div>`,
};
Spec.templates["source"]={
  type: "string",
  blank: "",
  html: `<div class="fy_horizon refreshable" data-templateName="source">
    <span class="fy_remover" changeName="sourceRemove"></span>
    <span class="fy_downer" changeName="sourceReorder"></span>
    <span class="fy_upper" changeName="sourceReorder"></span>
    <span class="fy_label" style="width: 245px;">${L("source")}<button title="${L("Sources")}" class="metadataOpener" onclick="Fy.doMetadata('../admin/source/?hideHeader=yes')">&nbsp;</button></span>
    <span class="fy_textbox" style="position: absolute; inset-inline-start: 250px; inset-inline-end: 110px;">
      <select onchange="Fy.changed('sourceChange')"></select>
    </span>
  </div>`,
  set: function($me, data){
    if(data.toString()) $me.find("select").val(data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  populate: function($me){
    if(user.level<4 && !user.isAdmin) $me.find(".metadataOpener").hide();
    var $select=$me.find("select");
    termbaseMetadata.source.map(datum => {
      $select.append(`<option value="${datum.id}" data-langs='${JSON.stringify(datum.langs)}'>${Spec.title(datum.title)}</option>`)
    });
  },
};
Spec.templates["inflects"]={
  type: "array",
  html: `<div class="fy_lineabove">
    <div class="fy_replace" templateName="inflect" jsonName=":item"></div>
    <span class="fy_adder" templateName="inflect" changeName="termInflectAdd">+ ${L("inflected form")}</span>
    <button class="metadataOpener" onclick="Fy.doMetadata('../admin/inflectLabel/?hideHeader=yes')">${L("Inflection labels")}</button>
  </div>`,
};
Spec.templates["inflect"]={
  type: "object",
  blank: {label: "", text: ""},
  html: `<div class="fy_horizon">
    <span class="fy_remover" changeName="termInflectRemove"></span>
    <span class="fy_downer" changeName="termInflectReorder"></span>
    <span class="fy_upper" changeName="termInflectReorder"></span>
    <span class="fy_replace" templateName="inflectLabel" jsonName="label"/>
    <span class="fy_replace" templateName="inflectText" jsonName="text"/>
  </div>`,
};
Spec.templates["inflectLabel"]={
  type: "string",
  html: `<span class="fy_textbox refreshable" data-templateName="inflectLabel" style="width: 95px">
    <select onchange="Fy.changed('termInflectLabelChange')"></select>
  </span>`,
  set: function($me, data){
    if(data.toString()) $me.find("select").val(data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  populate: function($me){
    var $select=$me.find("select");
    termbaseMetadata.inflectLabel.map(datum => {
      $select.append(`<option value="${datum.id}" title="${Spec.title(datum.title)}" data-isfor='${JSON.stringify(datum.isfor)}'>${datum.abbr}</option>`)
    });
  },
  refresh: function($me){
    var lang=$me.closest(".jsonName_term").find(".jsonName_lang select").val();
    var val=$me.find("select").val();
    $me.find("select option").each(function(){
      var $option=$(this);
      var isfor=JSON.parse($option.attr("data-isfor"));
      if(isfor.indexOf(lang)>-1 || isfor.indexOf("_all")>-1 || (Spec.getLangRole(lang)=="major" && isfor.indexOf("_allmajor")>-1) || (Spec.getLangRole(lang)=="minor" && isfor.indexOf("_allminor")>-1)) {
        $option.prop("disabled", false).show();
      } else {
        $option.prop("disabled", true).hide();
        if($option.attr("value")==val) $me.find("select").val("");
      }
    });
    if(!$me.find("select").val()){
      var val=$me.find("select").find("option").not(":disabled").first().attr("value");
      $me.find("select").val(val);
    }
  },
};
Spec.templates["inflectText"]={
  type: "string",
  html: `<span class="fy_textbox" style="position: absolute; inset-inline-start: 100px; inset-inline-end: 150px;"><input onchange="Fy.changed('termInflectTextChange')"/></span>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  }
};
Spec.templates["annots"]={
  type: "array",
  html: `<div class="fy_lineabove">
    <div class="fy_replace" templateName="annot" jsonName=":item"></div>
    <span class="fy_adder" templateName="annot" changeName="termAnnotAdd">+ ${L("annotation")}</span>
    <button class="metadataOpener" onclick="Fy.doMetadata('../admin/posLabel/?hideHeader=yes')">${L("Part-of-speech labels")}</button>
  </div>`,
};
Spec.templates["annot"]={
  type: "object",
  blank: {start: "1", stop: "0", label: null},
  html: `<div class="fy_horizon">
    <span class="fy_remover" changeName="termAnnotRemove"></span>
    <span class="fy_downer" changeName="termAnnotReorder"></span>
    <span class="fy_upper" changeName="termAnnotReorder"></span>
  <span class="fy_replace" templateName="annotPosition" jsonName="start"/>
    <span class="fy_replace" templateName="annotPosition" jsonName="stop"/>
    <span class="fy_textbox fy_preview" style="margin-left: 10px;"></span>
    <span class="fy_replace" templateName="annotLabel" jsonName="label"/>
    </div>`,
  refresh: function($me){
    var wording=$me.closest(".jsonName_term").find(".jsonName_wording input").val();
    var start=parseInt($me.find(".jsonName_start").find("input").val()) || 1;
    var stop=parseInt($me.find(".jsonName_stop").find("input").val()) || wording.length;
    if(start>stop) {
      stop=start;
      $me.find(".jsonName_stop").find("input").val(stop);
    }
    var $textbox=$me.find(".fy_preview");
    $textbox.html("");
    for(var i=0; i<wording.length; i++){
      var $char=$("<span class='char'></span>");
      var char=wording[i];
      $char.html(char);
      if(char==" " || char=="\t") $char.html("&nbsp;");
      if(i+1>=start && i+1<=stop) $char.addClass("on");
      $textbox.append($char);
    }
  },
};
Spec.templates["annotPosition"]={
  type: "string",
  html: `<span class="annotPosition" style="display: inline-block; width: 45px; text-align: center; overflow: hide;">
    <button class="fy_tinybutton" onclick="Spec.templates.annotPosition.clickLess(this)">◀</button>
    <button class="fy_tinybutton" onclick="Spec.templates.annotPosition.clickMore(this)">▶</button>
    <input style="display: none;"/>
  </span>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
  clickLess: function(button){
    if($(button).closest(".fy_uneditable").length>0) return;
    var MIN=1;
    if($(button).closest('.jsonName_stop').length>0) MIN=parseInt($(button).closest(".jsonName_item").find('.jsonName_start').find("input").val());
    if(!MIN) MIN=1;
    var $input=$(button).closest('.annotPosition').find('input');
    var val=parseInt($input.val());
    if(val==0 && $(button).closest('.jsonName_stop')) val=$(button).closest(".jsonName_term").find(".jsonName_wording input").val().length;
    if(val>MIN) {
      $input.val(val-1);
      Fy.changed("termAnnotPositionChange");
      var $annot=$input.closest(".jsonName_annots > .fy_node");
      $annot.data("template").refresh($annot);
    }
  },
  clickMore: function(button){
    if($(button).closest(".fy_uneditable").length>0) return;
    var MAX=$(button).closest(".jsonName_term").find('.jsonName_wording input').val().length;
    if($(button).closest('.jsonName_start').length>0) MAX=parseInt($(button).closest(".jsonName_item").find('.jsonName_stop').find("input").val());
    if(!MAX) MAX=$(button).closest(".jsonName_term").find(".jsonName_wording input").val().length;
    var $input=$(button).closest('.annotPosition').find('input');
    var val=parseInt($input.val());
    if(val==0 && $(button).closest('.jsonName_stop')) val=$(button).closest(".jsonName_term").find(".jsonName_wording input").val().length;
    if(val<MAX) {
      $input.val(val+1);
      Fy.changed("termAnnotPositionChange");
      var $annot=$input.closest(".jsonName_annots > .fy_node");
      $annot.data("template").refresh($annot);
    }
  },
};
Spec.templates["annotLabel"]={
  type: "object",
  blank: {type: "", value: ""},
  html: `<span class="fy_textbox refreshable" data-templateName="annotLabel" style="width: 95px">
      <select onchange="Fy.changed('termAnnotLabelChange')"></select>
  </span>`,
  set: function($me, data){
    if(data) $me.find("select").val(data.value);
  },
  get: function($me){
    return {
      type: $me.find("select option:selected").attr("data-type"),
      value: $me.find("select").val()
    }
  },
  populate: function($me){
    var $select=$me.find("select");
    if(termbaseMetadata.posLabel.length>0){
      var $optgroup=$(`<optgroup label='${L("part of speech")}'></optgroup>`).appendTo($select);
      termbaseMetadata.posLabel.map(datum => {
        $optgroup.append(`<option data-type="posLabel" value="${datum.id}" title="${Spec.title(datum.title)}" data-isfor='${JSON.stringify(datum.isfor)}'>${datum.abbr}</option>`)
      });
    }
    if(termbaseMetadata.inflectLabel.length>0){
      var $optgroup=$(`<optgroup label='${L("inflection")}'></optgroup>`).appendTo($select);
      termbaseMetadata.inflectLabel.map(datum => {
        $optgroup.append(`<option data-type="inflectLabel" value="${datum.id}" title="${Spec.title(datum.title)}" data-isfor='${JSON.stringify(datum.isfor)}'>${datum.abbr}</option>`)
      });
    }
    if(termbaseConfigs.lingo.languages.length>1){
      var $optgroup=$(`<optgroup label='${L("language of origin")}'></optgroup>`).appendTo($select);
      termbaseConfigs.lingo.languages.map(lang => {
        $optgroup.append(`<option data-type="langLabel" value="${lang.abbr}" title="${Spec.title(lang.title)}">${lang.abbr.toUpperCase()}</option>`)
      });
    }
    var $optgroup=$(`<optgroup label='${L("symbol")}'></optgroup>`).appendTo($select);
    $optgroup.append(`<option data-type="symbol" value="tm" title="${L("trademark")}">TM</option>`);
    $optgroup.append(`<option data-type="symbol" value="regtm" title="${L("registered trademark")}">®</option>`);
    $optgroup.append(`<option data-type="symbol" value="proper" title="${L("proper noun")}">¶</option>`);
    var $optgroup=$(`<optgroup label='${L("formatting")}'></optgroup>`).appendTo($select);
    $optgroup.append(`<option data-type="formatting" value="italic">${L("italic")}</option>`);
  },
  refresh: function($me){
    var lang=$me.closest(".jsonName_term").find(".jsonName_lang select").val();
    var val=$me.find("select").val();
    $me.find("select option").each(function(){
      var $option=$(this);
      if($option.attr("data-type")=="posLabel" || $option.attr("data-type")=="inflectLabel") {
        var isfor=JSON.parse($option.attr("data-isfor"));
        if(isfor.indexOf(lang)>-1 || isfor.indexOf("_all")>-1 || (Spec.getLangRole(lang)=="major" && isfor.indexOf("_allmajor")>-1) || (Spec.getLangRole(lang)=="minor" && isfor.indexOf("_allminor")>-1)) {
          $option.prop("disabled", false).show();
        } else {
          $option.prop("disabled", true).hide();
          if($option.attr("value")==val) $me.find("select").val("");
        }
      } else if($option.attr("data-type")=="langLabel") {
        if($option.attr("value")!=lang){
          $option.prop("disabled", false).show();
        } else {
          $option.prop("disabled", true).hide();
          if($option.attr("value")==val) $me.find("select").val("");
        }
      }
    });
    if(!$me.find("select").val()){
      var val=$me.find("select").find("option").not(":disabled").first().attr("value");
      $me.find("select").val(val);
    }
  },
};

Spec.templates["intros"]={
  type: "object",
  html: function(){
    var html=`<div class="fy_container">
      <div class="fy_box">`;
      termbaseConfigs.lingo.languages.map(lang => {
        if(lang.role=="major"){
          html+=`<div class="fy_horizon">
              <span class="fy_label" style="width: 245px;">${lang.abbr.toUpperCase()} (${Spec.title(lang.title)})</span>
              <span class="fy_replace" templateName="intro" jsonName="${lang.abbr}"></span>
            </div>`;
        }
      });
      html+=`</div>
    </div>`;
    return html;
  },
};
Spec.templates["intro"]={
  type: "string",
  html: `<span class="fy_textbox" style="position: absolute; inset-inline-start: 250px; inset-inline-end: 0px;"><input onchange="Fy.changed('introChange')"/></span>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
};

Spec.templates["definitions"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="definition" jsonName=":item"></div>
    <span class="fy_adder" templateName="definition" changeName="definitionAdd">+ ${L("definition")}</span>
  </div>`,
};
Spec.templates["definition"]={
  type: "object",
  blank: {texts: {}, domains: [], sources: []},
  html: `<div class="fy_container nonessentialOutside">
    <div class="fy_box">
      <div class="fy_replace" templateName="defTexts" jsonName="texts"></div>
      <div class="fy_box">
        <div class="fy_replace" templateName="lingySources" jsonName="sources"></div>
      </div>
      <div class="fy_replace" templateName="domains" jsonName="domains"></div>
      <div class="fy_horizon blind">
        <span class="fy_remover" changeName="definitionRemove"></span>
        <span class="fy_downer" changeName="definitionReorder"></span>
        <span class="fy_upper" changeName="definitionReorder"></span>
      </div>
    </div>
    <div class="fy_replace" templateName="nonessential" jsonName="nonessential"></div>
  </div>`,
  refresh: function($me){
    if(termbaseMetadata.source.length==0){
      $me.find(".jsonName_sources").remove();
    }
    if(termbaseMetadata.domain.length==0){
      $me.find(".jsonName_domains > .fy_adder").replaceWith("&nbsp;");
    }
  },
  postprocess: function(data){
    if(!data.sources) data.sources=[];
    return data;
  },
};
Spec.templates["defTexts"]={
  type: "object",
  html: function(){
    var html=`<div class="fy_container">`;
      termbaseConfigs.lingo.languages.map(lang => {
        if(lang.role=="major"){
          html+=`<div class="fy_horizon textarea">
              <div class="fy_label">${lang.abbr.toUpperCase()} (${Spec.title(lang.title)})</div>
              <span class="fy_replace" templateName="defText" jsonName="${lang.abbr}"></span>
            </div>`;
        }
      });
      html+=`</div>`;
    return html;
  },
};
Spec.templates["defText"]={
  type: "string",
  html: `<span class="fy_textbox"><textarea onchange="Fy.changed('definitionTextChange')"/></textarea></span>`,
  set: function($me, data){
    $me.find("textarea").val(data);
  },
  get: function($me){
    return $me.find("textarea").val();
  },
};

Spec.templates["notes"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="note" jsonName=":item"></div>
    <span class="fy_adder" templateName="note" changeName="noteAdd">+ ${L("note")}</span>
  </div>`,
};
Spec.templates["note"]={
  type: "object",
  blank: {texts: {}, domains: [], sources: []},
  html: `<div class="fy_container fy_collapsible">
      <div class="fy_box">
        <div class="fy_replace" templateName="noteType" jsonName="type"></div>
        <div class="fy_box fy_hidable">
          <div class="fy_replace" templateName="noteTexts" jsonName="texts"></div>
        </div>
        <div class="fy_box fy_hidable">
          <div class="fy_replace" templateName="lingySources" jsonName="sources"></div>
        </div>
        <div class="fy_replace fy_hidable" templateName="nonessential" jsonName="nonessential"></div>
      </div>
  </div>`,
  refresh: function($me){
    if(termbaseMetadata.source.length==0){
      $me.find(".jsonName_sources").remove();
    }
  },
  postprocess: function(data){
    if(!data.sources) data.sources=[];
    return data;
  },
};
Spec.templates["noteType"]={
  type: "object",
  blank: "",
  html: `<div class="fy_container refreshable" data-templateName="noteType">
    <span style="display: none;"></span>
    <div class="fy_horizon">
      <span class="fy_textbox" style="position: absolute; inset-inline-start: 0px; inset-inline-end: 125px;">
        <select onchange="Fy.changed('noteTypeChange');"></select>
      </span>
      <span class="fy_remover" changeName="noteRemove"></span>
      <span class="fy_downer" changeName="noteReorder"></span>
      <span class="fy_upper" changeName="noteReorder"></span>
    </div>
    <span style="display: none;"></span>
  </div>`,
  set: function($me, data){
    if(data.toString()) $me.find("select").val(data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  populate: function($me){
    var $select=$me.find("select");
    termbaseMetadata.noteType.map(datum => {
      var levelLabel="";
      if(datum.level=="0") levelLabel=L("private note, not shown on extranets");
      if(datum.level=="1") levelLabel=L("private note, shown on extranets");
      if(datum.level=="2") levelLabel=L("public note");
      $select.append(`<option value="${datum.id}">${Spec.title(datum.title)} (${levelLabel})</option>`)
    });
  },
};
Spec.templates["noteTexts"]={
  type: "object",
  html: function(){
    var html=`<div class="fy_container">`;
      termbaseConfigs.lingo.languages.map(lang => {
        if(lang.role=="major"){
          html+=`<div class="fy_horizon textarea">
              <div class="fy_label">${lang.abbr.toUpperCase()} (${Spec.title(lang.title)})</div>
              <span class="fy_replace" templateName="noteText" jsonName="${lang.abbr}"></span>
            </div>`;
        }
      });
      html+=`</div>`;
    return html;
  },
};
Spec.templates["noteText"]={
  type: "string",
  html: `<span class="fy_textbox"><textarea onchange="Fy.changed('noteTextChange')"/></textarea></span>`,
  set: function($me, data){
    $me.find("textarea").val(data);
  },
  get: function($me){
    return $me.find("textarea").val();
  },
};

Spec.templates["examples"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="example" jsonName=":item"></div>
    <span class="fy_adder" templateName="example" changeName="exampleAdd">+ ${L("example")}</span>
  </div>`,
};
Spec.templates["example"]={
  type: "object",
  blank: {texts: {}, sources: []},
  html: `<div class="fy_container nonessentialOutside">
    <div class="fy_box">
      <div class="fy_replace" templateName="exampleTexts" jsonName="texts"></div>
      <div class="fy_box">
        <div class="fy_replace" templateName="lingySources" jsonName="sources"></div>
      </div>
      <div class="fy_horizon blind">
        <span class="fy_remover" changeName="exampleRemove"></span>
        <span class="fy_downer" changeName="exampleReorder"></span>
        <span class="fy_upper" changeName="exampleReorder"></span>
      </div>
    </div>
    <div class="fy_replace" templateName="nonessential" jsonName="nonessential"></div>
  </div>`,
  refresh: function($me){
    if(termbaseMetadata.source.length==0){
      $me.find(".jsonName_sources > .fy_adder").replaceWith("&nbsp;");
    }
  },
};
Spec.templates["exampleTexts"]={
  type: "object",
  html: function(){
    var html=`<div class="fy_container">`;
      termbaseConfigs.lingo.languages.map(lang => {
        if(lang.role=="major"){
          html+=`<div class="fy_horizon textarea">
              <div class="fy_label">${lang.abbr.toUpperCase()} (${Spec.title(lang.title)})</div>
              <span class="fy_replace" templateName="exampleText" jsonName="${lang.abbr}"></span>
            </div>`;
        }
      });
      html+=`</div>`;
    return html;
  },
};
Spec.templates["exampleText"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="exampleTextItem" jsonName=":item"></div>
    <span class="fy_adder" templateName="exampleTextItem" changeName="exampleTextAdd">+ ${L("sentence")}</span>
  </div>`,
};
Spec.templates["exampleTextItem"]={
  type: "string",
  html: `<span class="fy_node fy_textbox linebelow" style="position: relative;">
    <div class="fy_horizon blinder">
      <span class="fy_remover" changeName="exampleTextRemove"></span>
      <span class="fy_downer" changeName="exampleTextReorder"></span>
      <span class="fy_upper" changeName="exampleTextReorder"></span>
    </div>
    <textarea onchange="Fy.changed('exampleTextChange')" style="padding-inline-end: 125px;"/></textarea>
  </span>`,
  set: function($me, data){
    $me.find("textarea").val(data);
  },
  get: function($me){
    return $me.find("textarea").val();
  },
};

Spec.templates["images"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="image" jsonName=":item"></div>
    <span class="fy_adder" templateName="image" changeName="imageAdd">+ ${L("image")}</span>
  </div>`,
};
Spec.templates["image"]={
  type: "object",
  blank: {texts: {}, sources: []},
  html: `<div class="fy_container nonessentialOutside">
    <div class="fy_box">
      <div class="fy_replace" templateName="imageContent" jsonName="content"></div>
      <div class="fy_replace" templateName="imageCredits" jsonName="credits"></div>
      <div class="fy_replace" templateName="imageLink" jsonName="link"></div>
    </div>
    <div class="fy_replace" templateName="nonessential" jsonName="nonessential"></div>
  </div>`,
  refresh: function($me){
  },
};
Spec.templates["imageContent"]={
  type: "string",
  html: `<div class="fy_container">
    <div class="fy_horizon">
      <span class="fy_remover" changeName="imageRemove"></span>
      <span class="fy_downer" changeName="imageReorder"></span>
      <span class="fy_upper" changeName="imageReorder"></span>
      <span class="fy_textbox" style="display: block; border: 2px dashed #cccccc; background-color: #f9f9f9; margin: -2px 3px;">
        <label class="img" style="display: block; min-height: 100px; cursor: pointer; padding: 3px; margin: 0px;">
          <input type="file" accept="image/*" onchange="Fy.changed('imageContentChange'); Spec.templates.imageContent.changed(this)" style="display: none" />
          <img style="display: none; max-height: 250px; max-width: 500px; top: 0px; margin: 0px auto; border: 1px solid #cccccc; background-color: #ffffff"/>
        </label>
      </span>
    </div>
  </div>`,
  set: function($me, data){
    $me.find("img").attr("src", data);
    if(typeof(data)=="string" && data!=""){
      $me.find("img").css("display", "block");
    } else {
      $me.find("img").css("display", "none");
    }
  },
  get: function($me){
    return $me.find("img").attr("src");
  },
  changed: function(input){
    const MAX_SIZE=250000; //250,000 bytes
    const file=input.files[0];
    if(file){
      if(file.size>MAX_SIZE){
        alert(L("The file is too large. The maximum allowed size is $1 bytes.").replace("$1", MAX_SIZE.toLocaleString(uilang)));
      } else {
        const reader=new FileReader();
        reader.addEventListener("load", () => {
            // convert image file to base64 string
            const dataURL=reader.result; //type: string
            $(input).closest(".fy_textbox").find("img").attr("src", dataURL).css("display", "block");
          }, false
        );
        reader.readAsDataURL(file);
      }
    }
  },
};
Spec.templates["imageCredits"]={
  type: "string",
  html: `<div class="fy_horizon">
    <span class="fy_label" style="width: 245px;">${L("credits")}</span>
    <span class="fy_textbox" style="position: absolute; inset-inline-start: 250px; inset-inline-end: 0px;"><input onchange="Fy.changed('imageCreditsChange')"/></span>
  </div>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
};
Spec.templates["imageLink"]={
  type: "string",
  html: `<div class="fy_horizon">
    <span class="fy_label" style="width: 245px;">${L("link to source")}</span>
    <span class="fy_textbox" style="position: absolute; inset-inline-start: 250px; inset-inline-end: 0px;"><input onchange="Fy.changed('imageLinkChange')" placeholder="https://"/></span>
  </div>`,
  set: function($me, data){
    $me.find("input").val(data);
  },
  get: function($me){
    return $me.find("input").val();
  },
};


Spec.templates["collections"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="collection" jsonName=":item"></div>
    <span class="fy_adder" templateName="collection" changeName="collectionAdd">+ ${L("collection")}</span>
  </div>`,
};
Spec.templates["collection"]={
  type: "object",
  blank: "",
  html: `<div class="fy_container refreshable" data-templateName="collection">
    <div class="fy_box">
      <div class="fy_horizon">
        <span class="fy_remover" changeName="collectionRemove"></span>
        <span class="fy_downer" changeName="collectionReorder"></span>
        <span class="fy_upper" changeName="collectionReorder"></span>
        <span class="fy_textbox" style="position: absolute; inset-inline-start: 0px; inset-inline-end: 125px;">
          <select onchange="Fy.changed('collectionChange');"></select>
        </span>
      </div>
    </div>
  </div>`,
  set: function($me, data){
    if(data.toString()) $me.find("select").val(data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  populate: function($me){
    var $select=$me.find("select");
    termbaseMetadata.collection.map(datum => {
      $select.append(`<option value="${datum.id}">${Spec.title(datum.title)}</option>`)
    });
  },
};

Spec.templates["extranets"]={
  type: "array",
  html: `<div>
    <div class="fy_replace" templateName="extranet" jsonName=":item"></div>
    <span class="fy_adder" templateName="extranet" changeName="extranetAdd">+ ${L("extranet")}</span>
  </div>`,
};
Spec.templates["extranet"]={
  type: "object",
  blank: "",
  html: `<div class="fy_container refreshable" data-templateName="extranet">
    <div class="fy_box">
      <div class="fy_horizon">
        <span class="fy_remover" changeName="extranetRemove"></span>
        <span class="fy_downer" changeName="extranetReorder"></span>
        <span class="fy_upper" changeName="extranetReorder"></span>
        <span class="fy_textbox" style="position: absolute; inset-inline-start: 0px; inset-inline-end: 125px;">
          <select onchange="Fy.changed('extranetChange');"></select>
        </span>
      </div>
    </div>
  </div>`,
  set: function($me, data){
    if(data.toString()) $me.find("select").val(data);
  },
  get: function($me){
    return $me.find("select").val();
  },
  populate: function($me){
    var $select=$me.find("select");
    termbaseMetadata.extranet.map(datum => {
      $select.append(`<option value="${datum.id}">${Spec.title(datum.title)}</option>`)
    });
  },
};

Spec.templates["lingySources"]={
  type: "array",
  html: `<div class="fy_nolineabove">
    <div class="fy_replace" templateName="lingySource" jsonName=":item"></div>
    <span class="fy_adder" templateName="lingySource" changeName="sourceAdd">+ ${L("source")}</span>
    <button class="metadataOpener" onclick="Fy.doMetadata('../admin/source/?hideHeader=yes')">${L("Sources")}</button>
  </div>`,
};
Spec.templates["lingySource"]={
  type: "object",
  blank: {id: "", lang: ""},
  html: `<div class="fy_horizon refreshable" data-templateName="lingySource">
    <span class="fy_remover" changeName="sourceRemove"></span>
    <span class="fy_downer" changeName="sourceReorder"></span>
    <span class="fy_upper" changeName="sourceReorder"></span>
    <span class="fy_label" style="width: 245px;">
      <select class="hanger" onchange="Fy.changed('sourceLangChange')"></select>
      ${L("source")}
    </span>
    <span class="fy_textbox" style="position: absolute; inset-inline-start: 250px; inset-inline-end: 110px;">
      <select class="id" onchange="Fy.changed('sourceChange')"></select>
    </span>
  </div>`,
  set: function($me, data){
    $me.find("select.id").val(data.id);
    $me.find("select.hanger").val(data.lang);
  },
  get: function($me){
    return {
      id: $me.find("select.id").val(),
      lang: $me.find("select.hanger").val(),
    };
  },
  populate: function($me){
    var $select=$me.find("select.id");
    termbaseMetadata.source.map(datum => {
      $select.append(`<option value="${datum.id}">${Spec.title(datum.title)}</option>`);
    });
    var $select=$me.find("select.hanger");
    $select.append(`<option value=""></option>`);
    termbaseConfigs.lingo.languages.map(datum => {
      if(datum.role=="major") $select.append(`<option value="${datum.abbr}" title="${Spec.title(datum.title)}">${datum.abbr.toUpperCase()}</option>`);
    });
  },
};

Spec.templates["xrefs"]={
  type: "array",
  html: `<div/>`,
  set: function($me, data){
    $me.data("data", data);
  },
  get: function($me){
    return $me.data("data");
  },

};

Spec.sharEnquire=function($term, termID, lang, wording){
  var $bubble=$term.find(".fy_bubble").hide().removeClass("fullon").removeClass("sublime").removeClass("invisible").html("");
  $.ajax({url: "./sharEnquire.json", dataType: "json", method: "POST", data: {termID: termID, lang: lang, wording: wording}}).done(function(data){
    //remove the current entry:
    if(data.sharedBy && data.sharedBy.length>0) data.sharedBy.map((entry, i) => {
      if(entry.entryID==Screenful.Editor.entryID) data.sharedBy.splice(i, 1);
    });

    if(data.sharedBy.length>0){
      $bubble.addClass("fullon").html(data.sharedBy.length).show();
      $bubble.on("click", function(e){
        e.stopPropagation();
        Spec.sharPopup($term, termID, lang, wording, data);
      });
    } else if(data.similarTo.length>0){
      $bubble.addClass("sublime").html(data.similarTo.length).show();
      $bubble.on("click", function(e){
        e.stopPropagation();
        Spec.sharPopup($term, termID, lang, wording, data);
      });
    }
  });
};

Spec.sharPopup=function($term, termID, lang, wording, data){
  Fy.showPopup($term.find(".fy_bubble"));

  if(data.sharedBy && data.sharedBy.length>0){
    $("#fy_popup").append("<div class='title'>"+L("Other entries that share this term")+"</div>");
    var $actions=$("<div class='actions'><span class='action stopSharing'>"+L("stop sharing")+"</span> <span class='action addToWorklist'>"+L("add to worklist")+"</span></div>").appendTo($("#fy_popup"));
    $actions.find(".action.stopSharing").on("click", function(){
      //disconnect:
      var $id=$term.find(".jsonName_id");
      Spec.templates["hiddenID"].set($id, "");
      Spec.sharEnquire($term, "", lang, wording);
      Fy.changed();
      $("#fy_popup").remove();
    });
    $actions.find(".action.addToWorklist").on("click", function(){
      var ids=[]; if(Screenful.Editor.entryID) ids.push(Screenful.Editor.entryID); data.sharedBy.map(entry => {ids.push(entry.entryID)});
      Screenful.Editor.addToStarlist(ids);
    });
    data.sharedBy.map(entry => {
      if(entry.entryID!=Screenful.Editor.entryID){
        var entryID=entry.entryID; entry=JSON.parse(entry.json);
        var $div=$("<div class='clickable arrow prettyEntry large'></div>").appendTo($("#fy_popup")).html(PrettyLarge.entryOneliner(entry)).on("click", function(e){
          Fy.hidePopup();
          Screenful.Editor.open(e, entryID);
        });
      }
    });
  }

  if(data.similarTo && data.similarTo.length>0){
    $("#fy_popup").append("<div class='title'>"+L("Similar terms (click to insert)")+"</div>");
    data.similarTo.map(term => {
      var termID=term.termID; term=JSON.parse(term.json); term.id=termID;
      var $div=$("<div class='clickable prettyEntry large'></div>").appendTo($("#fy_popup")).html(PrettyLarge.desig({term: term}, true)).on("click", function(e){
        //replace:
        var $replacer=Fy.renderNode(term, Spec.templates.term, Spec, false).data("jsonName", "term").addClass("jsonName_term");
        $term.replaceWith($replacer);
        $replacer.closest(".jsonName_item").find(".collapsor").html("-").trigger("click");
        Spec.sharEnquire($replacer, term.id, term.lang, term.wording);
        Fy.changed();
      });
    });
  }

  //disconnect:
  // var $id=$term.find(".jsonName_id");
  // console.log($id);
  // Spec.templates["hiddenID"].set($id, "");
  // Spec.sharEnquire($term, "", lang, wording);
  // Fy.changed();
};
