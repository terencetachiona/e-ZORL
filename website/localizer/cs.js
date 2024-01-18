function L(s, gloss){
  if(s=="only") return function(s){
    return "jen "+s;
  };
  if(s=="READ-ONLY") return "JEN KE ČTENÍ";
  if(s=="Editing") return "Editace";
  if(s=="Dublin City University") return "Dublin City University";
  if(s=="Log out") return "Odhlásit se";
  if(s=="Change your password") return "Změnit si heslo";
  if(s=="Registered user login") return "Registrovaní uživatelé";
  if(s=="Get an account") return "Zřídit si účet";
  if(s=="Forgot your password?") return "Zapomenuté heslo?";
  if(s=="E-mail address") return "E-mailová adresa";
  if(s=="Password") return "Heslo";
  if(s=="Log in") return "Přihlásit se";
  if(s=="Your termbases") return "Tvoje terminologické databáze";
  if(s=="You have no termbases yet.") return "Zatím žádnou nemáš.";
  if(s=="Create a termbase") return "Vytvořit terminologickou databázi";
  if(s=="Administration") return "Administrace";
  if(s=="Users") return "Uživateĺé";
  if(s=="Termbases") return "Terminologické databáze";
  if(s=="smart search") return "chytré hledání";
  if(s=="complete term") return "celý termín";
  if(s=="start of term") return "začátek termínu";
  if(s=="end of term") return "konec termínu";
  if(s=="any part of term") return "jakákoliv část termínu";
  if(s=="any part except start or end") return "jakákoliv část kromě začátku a konce";
  if(s=="search in all languages") return "hledat ve všech jazycích";
  if(s=="Configuration") return "Konfigurace";
  if(s=="ADMIN") return "ADMIN";
  if(s=="TRM") return "TRM";
  if(s=="DOM") return "DOM";
  if(s=="DEF") return "DEF";
  if(s=="XMPL") return "NAPŘ"
  if(s=="CHECKING STATUS") return "STAV ZKONTROLOVANOSTI";
  if(s=="PUBLISHING STATUS") return "STAV PUBLIKOVATELNOSTI";
  if(s=="TERMS") return "TERMÍNY";
  if(s=="DOMAINS") return "DOMÉNY";
  if(s=="term") return "termín";
  if(s=="clarification") return "vysvětlivka";
  if(s=="acceptability") return "přijatelnost";
  if(s=="source") return "zdroj";
  if(s=="inflected form") return "vyskloňovaná forma";
  if(s=="annotation") return "anotace";
  if(s=="domain") return "doména";
  if(s=="part of speech") return "slovní druh";
  if(s=="inflection") return "sklonění";
  if(s=="language of origin") return "jazyk původu";
  if(s=="symbol") return "symbol";
  if(s=="trademark") return "obchodní značka";
  if(s=="registered trademark") return "zapsaná obchodní značka";
  if(s=="proper noun") return "vlastní jméno";
  if(s=="formatting") return "formátování";
  if(s=="italic") return "kurzívou";
  if(s=="Created") return "Vytvořeno";
  if(s=="Changed") return "Změněno";
  if(s=="Deleted") return "Smazáno";
  if(s=="Bulk-deleted") return "Hromadně smazáno";
  if(s=="while uploading") return "během nahrávání";
  if(s=="By") return "Kým";
  if(s=="When") return "Kdy";
  if(s=="any checking status") return "jakýkoliv stav zkontrolovanosti";
  if(s=="any publishing status") return "jakýkoliv stav publikovatelnosti";
  if(s=="any language") return "jakýkoliv jazyk";
  if(s=="any acceptability or no acceptability") return "jakákoliv přijatelnost nebo žádná";
  if(s=="any acceptability") return "jakákoliv přijatelnost";
  if(s=="no acceptability") return "žádná přijatelnost";
  if(s=="any domain or no domain") return "jakákoliv doména nebo žádná";
  if(s=="any domain") return "jakákoliv doména";
  if(s=="no domain") return "žádná doména";
  if(s=="LAST MAJOR UPDATE") return "POSLEDNÍ VELKÁ ZMÉNA";
  if(s=="set to today") return "změnit na dnešek";
  if(s=="Invalid e-mail address or password.") return "Neplatná e-mailová adresa nebo neplatné heslo.";
  if(s=="INTR") return "ÚVD";
  if(s=="COLL") return "SBÍR";
  if(s=="INTROS") return "ÚVODY";
  if(s=="DEFINITIONS") return "DEFINICE";
  if(s=="EXAMPLES") return "PŘÍKLADY";
  if(s=="COLLECTIONS") return "SBÍRKY";
  if(s=="definition") return "definice";
  if(s=="example") return "příklad";
  if(s=="sentence") return "věta";
  if(s=="collection") return "sbírka";
  if(s=="any collection or no collection") return "jakákoliv sbírka nebo žádná";
  if(s=="any collection") return "jakákoliv sbírka";
  if(s=="no collection") return "žádná sbírka";
  if(s=="comments") return "komentáře";
  if(s=="with or without comments") return "má komentář nebo nemá";
  if(s=="with comments") return "má komentář";
  if(s=="without comments") return "nemá komentář";
  if(s=="my comments") return "komentáře ode mě";
  if(s=="with or without my comments") return "má komentář ode mě nebo nemá";
  if(s=="with my comments") return "má komentář ode mě";
  if(s=="without my comments") return "nemá komentář ode mě";
  if(s=="other people's comments") return "komentáře od ostatních";
  if(s=="with or without other people's comments") return "má komentáře od ostatních nebo nemá";
  if(s=="with other people's comments") return "má komentáře od ostatních";
  if(s=="without other people's comments") return "nemá komentáře od ostatních";
  if(s=="EXTRANET") return "EXTRANET";
  if(s=="EXT") return "EXT";
  if(s=="EXTRANETS") return "EXTRANETY";
  if(s=="extranet") return "extranet";
  if(s=="any extranet or no extranet") return "jakýkoliv extranet nebo žádný";
  if(s=="any extranet") return "jakýkoliv extranet";
  if(s=="no extranet") return "žádný extranet";
  if(s=="sorting language") return "jazyk abecedního řazení";
  if(s=="Create mutual cross-references") return "Propojit vzájemnými odkazy";
  if(s=="Remove mutual cross-references") return "Rozpojit vzájemné odkazy";
  if(s=="Merge into a single entry") return "Sloučit do jednoho hesla";
  if(s=="SEE ALSO") return "VIZ TAKÉ";
  if(s=="add to worklist") return "dát na pracovní seznam";
  if(s=="Domains") return "Domény";
  if(s=="Part-of-speech labels") return "Slovní druhy";
  if(s=="Inflection labels") return "Názvy vyskloňovaných forem";
  if(s=="Acceptability labels") return "Názvy přijatelnosti";
  if(s=="Sources") return "Zdroje";
  if(s=="Collections") return "Sbírky";
  if(s=="Tags") return "Značky";
  if(s=="Extranets") return "Extranety";
  if(s=="Name and blurb") return "Jméno a úvod";
  if(s=="Features") return "Vlastnosti databáze";
  if(s=="Languages") return "Jazyky";
  if(s=="Publishing") return "Publikování";
  if(s=="Change the termbase's URL") return "Změnit URL databáze";
  if(s=="Delete the termbase") return "Smazat databázi";
  if(s=="TITLE") return "NADPIS";
  if(s=="abbreviation") return "zkratka";
  if(s=="LANGUAGES") return "JAZYKY";
  if(s=="select all") return "vybrat všechny";
  if(s=="unselect all") return "odvybrat všechny";
  if(s=="PRIORITY") return "PRIORITA";
  if(s=="high") return "vysoká";
  if(s=="medium") return "střední";
  if(s=="low") return "nízká";
  if(s=="USERS") return "UŹIVATElĚ";
  if(s=="e-mail address") return "e-mailová adresa";
  if(s=="user") return "uživatel";
  if(s=="Alphabetical order") return "Abecední řazení";
  if(s=="Similar terms (click to insert)") return "Podobné termíny (klinutím vložit)";
  if(s=="Other entries that share this term") return "Ostatní hesla, se kterými se termín sdílí";
  if(s=="stop sharing") return "přestat sdílet";
  if(s=="Change checking status to") return "Změnit stav zkontrolovanosti na";
  if(s=="Change publishing status to") return "Změnit stav publikovatelnosti na";
  if(s=="Add to extranet") return "Přidat na extranet";
  if(s=="Remove from extranet") return "Odebrat z extranetu";
  if(s=="checked") return "zkontrolováno";
  if(s=="not checked") return "nezkontrolováno";
  if(s=="publishable") return "publikovatelné";
  if(s=="hidden") return "skryté";
  if(s=="CHECKED") return "ZKONTROLOVÁNO";
  if(s=="NOT CHECKED") return "NEZKONTROLOVÁNO";
  if(s=="PUBLISHABLE") return "PUBLIKOVATELNÉ";
  if(s=="HIDDEN") return "SKRYTÉ";
  if(s=="non-essential") return "nedůležité";
  if(s=="STATUS") return "STATUS";
  if(s=="live") return "živý";
  if(s=="not live") return "neživý";
  if(s=="any clarification or no clarification") return "jakákoliv vysvětlivka nebo žádná";
  if(s=="any clarification") return "jakákoliv vysvětlivka";
  if(s=="no clarification") return "žádná vysvětlivka";
  if(s=="clarification containing...") return "vysvětlivka obsahující...";
  if(s=="any intro or no intro") return "jakýkoliv úvod nebo žádný";
  if(s=="any intro") return "jakýkoliv úvod";
  if(s=="no intro") return "žádný úvod";
  if(s=="intro containing...") return "úvod obsahující...";
  if(s=="any definition or no definition") return "jakákoliv definice nebo žádná";
  if(s=="any definition") return "jakákoliv definice";
  if(s=="no definition") return "žádná definice";
  if(s=="definition containing...") return "definice obsahující...";
  if(s=="any example or no example") return "jakýkoliv příklad nebo žádný";
  if(s=="any example") return "jakýkoliv příklad";
  if(s=="no example") return "žádný příklad";
  if(s=="example containing...") return "příklad obsahující...";
  if(s=="Automatic changes") return "Automatické změny";
  if(s=="NAME") return "JMÉNO";
  if(s=="BLURB") return "ÚVOD";
  if(s=="level") return "úroveň";
  if(s=="reader") return "čtenář";
  if(s=="editor") return "měnitel";
  if(s=="creator") return "tvořitel";
  if(s=="administrator") return "administrátor";
  if(s=="configurator") return "konfigurátor";
  if(s=="no change") return "bez změny";
  if(s=="change to 'not checked'") return "změnit na 'nezkontrolováno'";
  if(s=="change to 'hidden'") return "změnit na 'skryté'";
  if(s=="change to 'not checked' and 'hidden'") return "změnit na 'nezkontrolováno' a 'skryté'";
  if(s=="LAST SEEN") return "NAPOSLED VIDĚN";
  if(s=="NEVER") return "NIKDY";
  if(s=="No termbases") return "Nemá žádné terminologické databáze.";
  if(s=="language") return "jazyk";
  if(s=="major") return "hlavní jazyk";
  if(s=="minor") return "vedlejší jazyk";
  if(s=="role") return "role";
  if(s=="title") return "nadpis";
  if(s=="ACCESS LEVEL") return "ÚROVEŃ PŘÍSTUPU";
  if(s=="LICENCE") return "LICENCE";
  if(s=="private") return "soukromá";
  if(s=="public") return "veřejná";
  if(s=="trigger_dateStampChange") return "změněno datum hesla";
  if(s=="trigger_domainAdd") return "připojena doména k heslu";
  if(s=="trigger_domainRemove") return "odpojena doména od hesla";
  if(s=="trigger_domainReorder") return "změněno pořadí domén v heslu";
  if(s=="trigger_domainChange") return "změněna doména hesla";
  if(s=="trigger_desigAdd") return "přidán termín do hesla";
  if(s=="trigger_desigRemove") return "odebrán termín z hesla";
  if(s=="trigger_desigReorder") return "změněno pořadí termínů v hesle";
  if(s=="trigger_desigClarifChange") return "změněna vysvětlivka termínu";
  if(s=="trigger_desigAcceptChange") return "změněna přijatelnost termínu";
  if(s=="trigger_termLangChange") return "změněn jazyk termínu";
  if(s=="trigger_termWordingChange") return "změněna znění termínu";
  if(s=="trigger_termInflectAdd") return "přidána vyskloňovaná forma termínu";
  if(s=="trigger_termInflectRemove") return "odebrána vyskloňovaná forma termínu";
  if(s=="trigger_termInflectReorder") return "změněno pořadí vyskloňovaných forem";
  if(s=="trigger_termInflectLabelChange") return "změněn název vyskloňované formy";
  if(s=="trigger_termInflectTextChange") return "změněno znění vyskloňované formy";
  if(s=="trigger_termAnnotAdd") return "přidána anotace termínu";
  if(s=="trigger_termAnnotRemove") return "odebrána anotace termínu";
  if(s=="trigger_termAnnotReorder") return "změněno pořadí anotací termínu";
  if(s=="trigger_termAnnotPositionChange") return "změněna poloha anotace v termínu";
  if(s=="trigger_termAnnotLabelChange") return "změněn název anotace termínu";
  if(s=="trigger_introChange") return "změněn úvod do hesla";
  if(s=="trigger_definitionAdd") return "přidána definice do hesla";
  if(s=="trigger_definitionRemove") return "odebrána definice z hesla";
  if(s=="trigger_definitionReorder") return "změněno pořadí definic v hesle";
  if(s=="trigger_definitionTextChange") return "změněno znění definice";
  if(s=="trigger_exampleAdd") return "přidán příklad do hesla";
  if(s=="trigger_exampleRemove") return "odebrán příklad z hesla";
  if(s=="trigger_exampleReorder") return "změněno pořadí příkladů v hesle";
  if(s=="trigger_exampleTextAdd") return "přídána věta do příkladu";
  if(s=="trigger_exampleTextRemove") return "odebrána věta z příkladu";
  if(s=="trigger_exampleTextReorder") return "změněno pořadí vět v příkladu";
  if(s=="trigger_exampleTextChange") return "změněno znění věty v příkladu";
  if(s=="trigger_collectionAdd") return "připojena sbírka k heslu";
  if(s=="trigger_collectionRemove") return "odpojena sbírka od hesla";
  if(s=="trigger_collectionReorder") return "změněno pořadí sbírek v hesle";
  if(s=="trigger_collectionChange") return "změněna sbírka hesla";
  if(s=="trigger_extranetAdd") return "připojen extranet k heslu";
  if(s=="trigger_extranetRemove") return "odpojen extranet od hesla";
  if(s=="trigger_extranetReorder") return "změněno pořadí extranetů v hesle";
  if(s=="trigger_extranetChange") return "změněn extranet hesla";
  if(s=="trigger_sourceAdd") return "připojen zdroj k něčemu v hesle";
  if(s=="trigger_sourceRemove") return "odpojen zdroj od něčeho v hesle";
  if(s=="trigger_sourceReorder") return "změněno přadí zdrojů něčeho v hesle";
  if(s=="trigger_sourceChange") return "změněn zdroj něčeho v hesle";
  if(s=="trigger_nonessentialChange") return "změněna nedůležitost něčeho v hesle";
  if(s=="(blank)") return "(prázdná)";
  if(s=="Simple Multilingual Termbase") return "Jednoduchá mnohojazyčná terminologická databáze";
  if(s=="Simple Bilingual Termbase") return "Jednoduchá dvojjazyčná terminologická databáze";
  if(s=="Simple Monolingual Termbase") return "Jednoduchá jednojazyčná terminologická databáze";
  if(s=="Enter a human-readable title such as \"My Dictionary of Sports Terms\". You will be able to change this later.") return "Obdařte svou databázi nějakým zajímavým názvem, například  \"Můj slovník sportovních termínů\". Kdykoliv ho budete moci změnit.";
  if(s=="This will be your termbase's address on the web. You will be able to change this later.") return "Tohle bude internetová adresa vaší databáze. Kdykoliv ji budete moci změnit.";
  if(s=="You can choose a template here to start you off. Each template comes with a few sample entries. You will be able to change or delete those and to customize the template.") return "Vyberte si šablonu, ze které chcete začít. Každá šablona má pár ukázkových hesel. Ukázková hesla můžete změnit nebo vymazat a celou šablonu si můžete přizpůsobit svým potřebám.";
  if(s=="Your termbase is ready.") return "Vaše databáze je připravená.";
  if(s=="TERM OF THE DAY") return "TERMÍN DNE";
  if(s=="set to next available date") return "změnit na nejbližší volné datum";
  if(s=="Display from") return "Zobrazovat od";
  if(s=="Display until") return "Zobrazovat do";
  if(s=="News and announcements") return "Zprávy a oznámení";
  if(s=="Create your account") return "Vytvořit účet";
  if(s=="Reset your password") return "Nové heslo";
  if(s=="Terminologue signup") return "Váš nový účet pro Terminologue";
  if(s=="Please follow the link below to create your Terminologue account:") return "Chcete-li su vytvořit účet v systému Terminologue, klikněte laskavě na tento odkaz:";
  if(s=="Terminologue password reset") return "Zapomenuté heslo pro Terminologue";
  if(s=="Please follow the link below to reset your Terminologue password:") return "Chcete-li si vytvořit nové heslo v systému Terminologue, klikněte laskavě na tento odkaz:";
  if(s=="This page is only available in English.") return "Tato stránka je k dostání jen v angličtině.";
  if(s=="DRAFTING STATUS") return "STAV ROZPRACOVANOSTI";
  if(s=="draft entry") return "pracovní verze";
  if(s=="finished entry") return "konečná verze";
  if(s=="DRAFT") return "PRACOVNÍ VERZE";
  if(s=="FINISHED") return "KONEČNÁ VERZE";
  if(s=="any drafting status") return "jakýkoliv stav rozpracovanosti";
  if(s=="Prefabricated comments") return "Předpřipravené komentáře";
  if(s=="NOTES") return "POZNÁMKY";
  if(s=="note") return "poznámka";
  if(s=="NOT") return "POZN";
  if(s=="with or without notes") return "má nebo nemá poznámky";
  if(s=="with a note") return "má poznámku";
  if(s=="with a note containing...") return "má poznámku obsahující...";
  if(s=="without notes") return "nemá poznámku";
  if(s=="any type") return "jakýkoliv typ";
  if(s=="private note, not shown on extranets") return "soukromá poznámka, neukazuje se na extranetech";
  if(s=="private note, shown on extranets") return "soukromá poznámka, ukazuje se na extranetech";
  if(s=="public note") return "veřejná poznámka";
  if(s=="Note types") return "Typy poznámek";
  if(s=="LEVEL") return "ÚROVEŇ";
  if(s=="with a comment") return "nemá komentář";
  if(s=="with a comment containing...") return "má komentář obsahující...";
  if(s=="TBX export") return "Export TBX";
  if(s=="TBX import") return "Import TBX";
  if(s=="Empty the termbase") return "Vyprázdnit databázi";
  if(s=="Careful now! You are about to delete this termbase. You will not be able to undo this.") return "Pozor! Celá databáze se smaže a nepůjde to vrátit zpátky.";
  if(s=="Careful now! You are about to delete all entries and their history. You will not be able to undo this.") return "Pozor! Smažou se všechna hesla i jejich historie a nepůjde to vrátit zpátky.";
  if(s=="RELATED TERMS") return "PŘÍBUZNÁ HESLA";
  if(s=="Your termbase at a glance") return "Vaše terminologická databáze v číslech";
  if(s=="Number of entries") return "Počet hesel";
  if(s=="Number of items in history log") return "Počet záznamů v historii";
  if(s=="Your termbase is stored in the file %F") return "Vaše databáze je uložena v souboru %F";
  if(s=="File size") return "Velikost souboru";
  if(s=="Download %F") return "Stáhnout %F";
  if(s=="Upload %F") return "Nahrát %F";
  if(s=="Make sure that the file you are uploading is a valid Terminologue termbase. If you upload something else you will do irreparable damage to your termbase.") return "Soubor, který nahráváte, musí být platná terminologická databáze pro Terminologue. Nahrajete-li něco jiného, nenávratně si svou databázi rozbijete.";
  if(s=="PARENT") return "RODIČ";
  if(s=="no parent") return "bez rodiče";
  if(s=="excluding subdomains") return "bez poddomén";
  if(s=="including subdomains") return "včetně poddomén";
  if(s=="the entry has this domain") return "heslo má tuto doménu";
  if(s=="the entry has only this domain") return "heslo má jen tuto doménu";
  if(s=="the entry has not only this domain") return "heslo má nejen tuto doménu";
  if(s=="Careful! If you remove yourself from this termbase you will lose access to it.") return "Pozor! Odstraňujete sami sebe a přijedete tím o přístup do této databáze.";
  if(s=="Leave this termbase") return "Odejít z databáze";
  if(s=="IMG") return "OBR";
  if(s=="IMAGES") return "OBRÁZKY";
  if(s=="image") return "obrázek";
  if(s=="credits") return "autor/zdroj";
  if(s=="link to source") return "odkaz na zdroj";
  if(s=="The file is too large. The maximum allowed size is $1 bytes.") return "Tento soubor je přiliš velký. Nejvyšší povolená velikost souboru je $1 bajtů.";

  if(!gloss) console.log(`if(s=="${s}") return "";`);
  else console.log(`if(s=="${s}", "${gloss}") return "";`);
  //if(s=="") return s;
  return s;
}

try {
  module.exports={
    L: L,
  }
} catch(e){}