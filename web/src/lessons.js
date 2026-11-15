// Obsah kurzu: w = slovíčka "es|cs", s = věty "es|cs", q = gramatické otázky [zadání, [možnosti], správná, vysvětlení]
// r = čtení {t: text (řádky), tr: překlad, q: [[otázka, [možnosti], správná]]}
// V gramatice <e>...</e> = španělský příklad, na který jde ťuknout a poslechnout si ho.
const LESSONS = [
{ t:'Pozdravy a výslovnost', ic:'👋',
g:`<h3>Jak se španělsky čte</h3>
<p>Španělština se čte skoro tak, jak se píše. Stačí znát pár pravidel:</p>
<table class="tb">
<tr><td><b>h</b></td><td>nečte se: <e>hola</e> = „ola“</td></tr>
<tr><td><b>j</b>, <b>g</b> před e, i</td><td>jako naše ch: <e>jamón</e>, <e>gente</e></td></tr>
<tr><td><b>ll</b>, <b>y</b></td><td>jako j: <e>llave</e> = „jabe“, <e>yo</e> = „jo“</td></tr>
<tr><td><b>ñ</b></td><td>jako ň: <e>España</e></td></tr>
<tr><td><b>c</b> před e, i a <b>z</b></td><td>ve Španělsku šišlavě (anglické th), v Latinské Americe jako s: <e>gracias</e></td></tr>
<tr><td><b>c</b> jinde, <b>qu</b></td><td>jako k: <e>casa</e>, <e>qué</e></td></tr>
<tr><td><b>v</b></td><td>skoro jako b: <e>vino</e> = „bino“</td></tr>
<tr><td><b>r</b> / <b>rr</b></td><td>r jedno kmitnutí, rr (a r na začátku slova) se „vrčí“: <e>perro</e></td></tr>
</table>
<h3>Přízvuk</h3>
<p>Slovo končící na samohlásku, <b>n</b> nebo <b>s</b> má přízvuk na <b>předposlední</b> slabice (<e>buenos</e>), ostatní na <b>poslední</b> (<e>hablar</e>). Čárka nad samohláskou neznačí délku, ale <b>přízvuk</b>: <e>adiós</e>.</p>
<h3>Otázky a zvolání</h3>
<p>Na začátku věty se píše obrácený znak: <e>¿Qué tal?</e> <e>¡Hola!</e></p>
<p class="tip">💡 U každého slova ťukni na 🔊. Pomalá verze je pod 🐢. Nahlas po aplikaci opakuj, i když tě nikdo neslyší.</p>`,
w:['hola|ahoj','buenos días|dobré ráno / dobrý den','buenas tardes|dobré odpoledne','buenas noches|dobrý večer / dobrou noc','adiós|na shledanou','hasta luego|uvidíme se / zatím','por favor|prosím (když o něco žádám)','gracias|děkuji','de nada|není zač','sí|ano','no|ne','perdón|promiňte','¿qué tal?|jak se máš?','bien|dobře','mal|špatně','muy|velmi'],
s:['Hola, ¿qué tal?|Ahoj, jak se máš?','Muy bien, gracias.|Velmi dobře, děkuji.','Buenos días, señor.|Dobrý den, pane.','Adiós, hasta luego.|Na shledanou, zatím.','Un café, por favor.|Kávu, prosím.','Perdón, gracias.|Promiňte, děkuji.'],
q:[['Které písmeno se ve slově „hola“ nečte?',['h','o','l','a'],0,'H se ve španělštině nikdy nečte.'],
['Jak se čte „ll“ ve slově „llave“?',['jako j','jako l','jako dvě l','jako ch'],0,'ll se čte jako j: „jabe“.'],
['Kam patří přízvuk ve slově „buenos“?',['bue-','-nos','na obě slabiky','nikam'],0,'Končí na -s → přízvuk na předposlední slabice.'],
['Co znamená čárka v „adiós“?',['přízvuk na této slabice','dlouhé ó','otázku','nic'],0,'Čárka ve španělštině značí přízvuk, ne délku.'],
['Správný zápis otázky:',['¿Qué tal?','Qué tal¿','?Qué tal?','Qué tal?'],0,'Otázka začíná obráceným ¿ a končí ?.'],
['„Děkuji“ – „…“',['De nada','Gracias','Por favor','Perdón'],1,'Gracias = děkuji. De nada = není zač.']],
r:{t:`—¡Hola, Pedro! Buenos días.
—Buenos días, Ana. ¿Qué tal?
—Muy bien, gracias. ¿Y tú?
—Bien, bien. Perdón, un café, por favor.
—Adiós, Pedro. ¡Hasta luego!
—Adiós.`,
tr:`—Ahoj, Pedro! Dobré ráno.
—Dobré ráno, Ano. Jak se máš?
—Velmi dobře, děkuji. A ty?
—Dobře, dobře. Promiňte, kávu, prosím.
—Na shledanou, Pedro. Zatím!
—Na shledanou.`,
q:[['Jaká je denní doba?',['ráno / dopoledne','večer','noc'],0],['Jak se má Ana?',['velmi dobře','špatně','je unavená'],0],['Co si Pedro objednává?',['kávu','pivo','vodu'],0]]}
},

{ t:'Kdo jsem – sloveso ser', ic:'🙋',
g:`<h3>Osobní zájmena a sloveso SER (být)</h3>
<table class="tb">
<tr><td><e>yo soy</e></td><td>já jsem</td></tr>
<tr><td><e>tú eres</e></td><td>ty jsi</td></tr>
<tr><td><e>él / ella es</e></td><td>on / ona je</td></tr>
<tr><td><e>usted es</e></td><td>vy jste (vykání jedné osobě)</td></tr>
<tr><td><e>nosotros somos</e></td><td>my jsme</td></tr>
<tr><td><e>vosotros sois</e></td><td>vy jste (tykání více lidem)</td></tr>
<tr><td><e>ellos / ellas son</e></td><td>oni / ony jsou</td></tr>
</table>
<p>Zájmeno se často <b>vynechává</b>, protože tvar slovesa už osobu prozradí: <e>Soy Karel.</e> = Jsem Karel.</p>
<p>Při vykání se používá <b>usted</b> + tvar jako pro „on“: <e>¿Usted es español?</e></p>
<h3>Národnost a rod</h3>
<p>Muž: <e>checo</e>, <e>español</e>. Žena: <e>checa</e>, <e>española</e>. Ženský tvar často končí na <b>-a</b>.</p>
<p>Původ: <e>Soy de Praga.</e> = Jsem z Prahy.</p>`,
w:['yo|já','tú|ty','él|on','ella|ona','usted|vy (vykání)','nosotros|my','ellos|oni','ser|být (kdo, co, odkud)','me llamo|jmenuji se','¿cómo te llamas?|jak se jmenuješ?','checo|Čech / český','checa|Češka / česká','español|Španěl / španělský','de|z, od','¿de dónde eres?|odkud jsi?','encantado|těší mě'],
s:['Yo soy Karel.|Já jsem Karel.','Soy de la República Checa.|Jsem z České republiky.','Ella es española.|Ona je Španělka.','Nosotros somos checos.|My jsme Češi.','¿Eres de Madrid?|Jsi z Madridu?','Me llamo Ana, encantada.|Jmenuji se Ana, těší mě.'],
q:[['Yo ___ checo.',['soy','eres','es','son'],0,'yo → soy'],
['Ellos ___ de España.',['somos','es','son','sois'],2,'ellos → son'],
['¿Tú ___ español?',['soy','eres','es','somos'],1,'tú → eres'],
['Ana ___ de Madrid.',['es','eres','soy','son'],0,'ella (Ana) → es'],
['Nosotros ___ amigos.',['son','somos','sois','es'],1,'nosotros → somos'],
['„Ona je Češka.“',['Ella es checa.','Ella es checo.','Él es checa.','Ella soy checa.'],0,'Žena → checa, ona → es.']],
r:{t:`¡Hola! Me llamo Lucía.
Soy española, de Sevilla.
Mi amigo se llama Tomáš.
Él es checo, de Praga.
Nosotros somos estudiantes.`,
tr:`Ahoj! Jmenuji se Lucía.
Jsem Španělka, ze Sevilly.
Můj kamarád se jmenuje Tomáš.
On je Čech, z Prahy.
My jsme studenti.`,
q:[['Odkud je Lucía?',['ze Sevilly','z Prahy','z Madridu'],0],['Kdo je Tomáš?',['Čech z Prahy','Španěl','Lucíin bratr'],0],['Co jsou Lucía a Tomáš?',['studenti','učitelé','sourozenci'],0]]}
},

{ t:'Věci kolem nás – členy a rod', ic:'🏠',
g:`<h3>Rod a člen</h3>
<p>Každé podstatné jméno je <b>mužského</b> nebo <b>ženského</b> rodu (střední neexistuje).</p>
<table class="tb">
<tr><th></th><th>určitý (ten)</th><th>neurčitý (nějaký)</th></tr>
<tr><td>mužský</td><td><e>el libro</e></td><td><e>un libro</e></td></tr>
<tr><td>ženský</td><td><e>la casa</e></td><td><e>una casa</e></td></tr>
<tr><td>množ. m.</td><td><e>los libros</e></td><td><e>unos libros</e></td></tr>
<tr><td>množ. ž.</td><td><e>las casas</e></td><td><e>unas casas</e></td></tr>
</table>
<p>Na <b>-o</b> bývá mužský, na <b>-a</b> ženský rod. U ostatních se člen učíme se slovem: <e>el coche</e>, <e>la llave</e>.</p>
<h3>Množné číslo</h3>
<p>Po samohlásce <b>+s</b>: <e>perro → perros</e>. Po souhlásce <b>+es</b>: <e>ciudad → ciudades</e>.</p>
<p class="tip">💡 Slovíčka si vždycky uč i se členem, ušetříš si pozdější zmatek.</p>`,
w:['el libro|kniha','la casa|dům','el coche|auto','la mesa|stůl','la silla|židle','el teléfono|telefon','la puerta|dveře','la ventana|okno','el perro|pes','el gato|kočka','el agua|voda','la llave|klíč','el hombre|muž','la mujer|žena','y|a','esto|tohle, toto'],
s:['El perro y el gato.|Pes a kočka.','Esto es una casa.|Tohle je dům.','Los libros y las llaves.|Knihy a klíče.','¿Esto es un teléfono?|Je tohle telefon?','Una mesa y una silla.|Stůl a židle.','El hombre y la mujer.|Muž a žena.'],
q:[['___ casa',['el','la','los','un'],1,'casa končí na -a → ženský rod → la'],
['___ libro',['la','las','el','una'],2,'libro → el (mužský rod)'],
['___ perros',['los','las','el','la'],0,'mužský rod, množné číslo → los'],
['___ ventanas',['los','las','la','unos'],1,'ženský rod, množné číslo → las'],
['Množné číslo: el coche → ...',['los coches','las coches','los cochos','el coches'],0,'samohláska + s; mužský rod → los'],
['___ gato (nějaká kočka)',['un','una','unos','la'],0,'neurčitý člen, mužský rod → un']],
r:{t:`Esto es mi casa.
En la casa hay una mesa y cuatro sillas.
Hay una ventana grande.
El perro se llama Max.
El gato se llama Luna.`,
tr:`Tohle je můj dům.
V domě je stůl a čtyři židle.
Je tam jedno velké okno.
Pes se jmenuje Max.
Kočka se jmenuje Luna.`,
q:[['Kolik je v domě židlí?',['čtyři','dvě','jedna'],0],['Jak se jmenuje pes?',['Max','Luna','Pedro'],0],['Jaké je okno?',['velké','malé','modré'],0]]}
},

{ t:'Čísla 0–20', ic:'🔢',
g:`<h3>Čísla</h3>
<table class="tb">
<tr><td><e>cero</e> 0</td><td><e>uno</e> 1</td><td><e>dos</e> 2</td></tr>
<tr><td><e>tres</e> 3</td><td><e>cuatro</e> 4</td><td><e>cinco</e> 5</td></tr>
<tr><td><e>seis</e> 6</td><td><e>siete</e> 7</td><td><e>ocho</e> 8</td></tr>
<tr><td><e>nueve</e> 9</td><td><e>diez</e> 10</td><td><e>once</e> 11</td></tr>
<tr><td><e>doce</e> 12</td><td><e>trece</e> 13</td><td><e>catorce</e> 14</td></tr>
<tr><td><e>quince</e> 15</td><td><e>dieciséis</e> 16</td><td><e>diecisiete</e> 17</td></tr>
<tr><td><e>dieciocho</e> 18</td><td><e>diecinueve</e> 19</td><td><e>veinte</e> 20</td></tr>
</table>
<p>16–19 = „deset a …“: <b>dieci-</b> + číslo.</p>
<p><b>uno</b> se před mužským jménem zkracuje: <e>un libro</e>; před ženským: <e>una casa</e>.</p>
<h3>HAY = je tam / jsou tam</h3>
<p><e>Hay tres libros.</e> = Jsou tam tři knihy. <e>¿Cuántos hay?</e> = Kolik jich je?</p>`,
w:['cero|nula','uno|jedna','dos|dva','tres|tři','cuatro|čtyři','cinco|pět','seis|šest','siete|sedm','ocho|osm','nueve|devět','diez|deset','once|jedenáct','doce|dvanáct','quince|patnáct','veinte|dvacet','hay|je tam / jsou tam','¿cuántos?|kolik?'],
s:['Hay tres libros.|Jsou tam tři knihy.','Hay un gato y dos perros.|Je tam kočka a dva psi.','¿Cuántos coches hay?|Kolik je tam aut?','Hay diez sillas.|Je tam deset židlí.','Cinco y cinco son diez.|Pět a pět je deset.','Tengo doce llaves.|Mám dvanáct klíčů.'],
q:[['tres + cuatro =',['siete','seis','ocho','nueve'],0,'3 + 4 = 7 = siete'],
['doce − dos =',['diez','once','ocho','doce'],0,'12 − 2 = 10 = diez'],
['15 je …',['cinco','quince','cincuenta','once'],1,'15 = quince'],
['___ casa (jeden dům)',['un','uno','una','unos'],2,'ženský rod → una'],
['dieciséis = …',['16','6','60','19'],0,'dieci + seis = 16'],
['„Kolik je tam knih?“',['¿Cuántos libros hay?','¿Hay cuántos libros?','¿Cuántos hay libro?','¿Qué libros hay?'],0,'¿Cuántos + podstatné jméno + hay?']],
r:{t:`En la clase hay quince estudiantes.
Hay ocho chicas y siete chicos.
Hay una profesora.
En la mesa hay tres libros y un teléfono.`,
tr:`Ve třídě je patnáct studentů.
Je tam osm dívek a sedm chlapců.
Je tam jedna učitelka.
Na stole jsou tři knihy a jeden telefon.`,
q:[['Kolik je ve třídě studentů?',['15','8','7'],0],['Kolik je tam chlapců?',['7','8','5'],0],['Co je na stole?',['tři knihy a telefon','jedna kniha','klíče'],0]]}
},

{ t:'Rodina – sloveso tener', ic:'👨‍👩‍👧‍👦',
g:`<h3>TENER = mít</h3>
<table class="tb">
<tr><td><e>tengo</e></td><td>mám</td></tr>
<tr><td><e>tienes</e></td><td>máš</td></tr>
<tr><td><e>tiene</e></td><td>má (on, ona, vy)</td></tr>
<tr><td><e>tenemos</e></td><td>máme</td></tr>
<tr><td><e>tenéis</e></td><td>máte</td></tr>
<tr><td><e>tienen</e></td><td>mají</td></tr>
</table>
<h3>Věk se „má“</h3>
<p><e>Tengo cuarenta años.</e> = Je mi 40 let (doslova „mám 40 let“). <e>¿Cuántos años tienes?</e></p>
<h3>Můj, tvůj, jeho</h3>
<p><e>mi padre</e> můj otec · <e>tu madre</e> tvoje matka · <e>su hijo</e> jeho / její / váš syn</p>
<p>V množném čísle přidáme -s: <e>mis padres</e>, <e>tus hijos</e>, <e>sus hermanos</e>.</p>`,
w:['la familia|rodina','el padre|otec','la madre|matka','los padres|rodiče','el hermano|bratr','la hermana|sestra','el hijo|syn','la hija|dcera','los hijos|děti (synové a dcery)','el marido|manžel','la esposa|manželka','el abuelo|dědeček','la abuela|babička','tener|mít','mi|můj, moje','tu|tvůj, tvoje','su|jeho, její, váš','el año|rok'],
s:['Tengo un hijo y una hija.|Mám syna a dceru.','Mi hermana tiene dos hijos.|Moje sestra má dvě děti.','¿Cuántos años tienes?|Kolik je ti let?','Tengo veinte años.|Je mi dvacet let.','Mis padres son de Zlín.|Moji rodiče jsou ze Zlína.','¿Tienes hermanos?|Máš sourozence?'],
q:[['Yo ___ dos hermanos.',['tengo','tienes','tiene','tienen'],0,'yo → tengo'],
['¿Tú ___ hijos?',['tengo','tienes','tenemos','tiene'],1,'tú → tienes'],
['Ella ___ veinte años.',['tiene','es','tienes','está'],0,'Věk se vyjadřuje slovesem tener: tiene veinte años.'],
['Nosotros ___ un perro.',['tienen','tenemos','tengo','tenéis'],1,'nosotros → tenemos'],
['„moji rodiče“',['mis padres','mi padres','mis padre','tus padres'],0,'množné číslo → mis'],
['„Je mi 12 let.“',['Tengo doce años.','Soy doce años.','Estoy doce años.','Tengo doce año.'],0,'Věk = tener … años.']],
r:{t:`Me llamo Pablo y tengo una familia grande.
Mi padre se llama Juan y mi madre se llama Carmen.
Tengo dos hermanas y un hermano.
Mi abuela tiene ochenta años.
Mi abuelo tiene un perro muy viejo.`,
tr:`Jmenuji se Pablo a mám velkou rodinu.
Můj otec se jmenuje Juan a moje matka se jmenuje Carmen.
Mám dvě sestry a jednoho bratra.
Mé babičce je osmdesát let.
Můj dědeček má velmi starého psa.`,
q:[['Jak se jmenuje Pablova matka?',['Carmen','Juan','Ana'],0],['Kolik má Pablo sester?',['dvě','jednu','žádnou'],0],['Kolik let je babičce?',['80','18','8'],0]]}
},

{ t:'Jak se mám a kde jsem – estar', ic:'📍',
g:`<h3>ESTAR = být (kde a jak)</h3>
<table class="tb">
<tr><td><e>estoy</e></td><td>jsem</td></tr>
<tr><td><e>estás</e></td><td>jsi</td></tr>
<tr><td><e>está</e></td><td>je</td></tr>
<tr><td><e>estamos</e></td><td>jsme</td></tr>
<tr><td><e>estáis</e></td><td>jste</td></tr>
<tr><td><e>están</e></td><td>jsou</td></tr>
</table>
<h3>SER nebo ESTAR?</h3>
<p><b>SER</b>: kdo/co jsem, odkud jsem, povaha, povolání → <e>Soy checo.</e> <e>Es médico.</e></p>
<p><b>ESTAR</b>: <b>kde</b> jsem a <b>jak se cítím</b> (dočasný stav) → <e>Estoy en casa.</e> <e>Estoy cansado.</e></p>
<p>Přídavné jméno se shoduje: muž <e>cansado</e>, žena <e>cansada</e>.</p>
<p class="tip">💡 Pomůcka: „Jak se cítíš a kde jsi, na to ESTAR používej ty.“</p>`,
w:['estar|být (kde, jak)','¿cómo estás?|jak se máš?','cansado|unavený','contento|spokojený, rád','enfermo|nemocný','triste|smutný','ocupado|zaneprázdněný','aquí|tady','allí|tam','en|v, na','en casa|doma','la ciudad|město','el trabajo|práce','la calle|ulice','¿dónde?|kde?','el baño|koupelna, záchod'],
s:['Estoy cansado.|Jsem unavený.','¿Dónde está el baño?|Kde je záchod?','Mi madre está en casa.|Moje máma je doma.','Estamos en Madrid.|Jsme v Madridu.','¿Cómo estás? Estoy bien.|Jak se máš? Mám se dobře.','Ella está muy ocupada.|Ona je velmi zaneprázdněná.'],
q:[['Yo ___ en casa.',['estoy','soy','es','está'],0,'místo → estar; yo → estoy'],
['Ella ___ española.',['está','es','estás','son'],1,'národnost → ser'],
['¿Dónde ___ tus padres?',['son','están','estamos','está'],1,'místo, ellos → están'],
['Nosotros ___ cansados.',['somos','estamos','están','estoy'],1,'stav (únava) → estar'],
['Él ___ de Praga.',['está','es','estoy','eres'],1,'původ → ser'],
['„Ana je unavená.“',['Ana está cansada.','Ana es cansada.','Ana está cansado.','Ana estás cansada.'],0,'stav → estar; žena → cansada']],
r:{t:`—¡Hola, Marta! ¿Dónde estás?
—Estoy en el trabajo. ¿Y tú?
—Estoy en casa. Estoy un poco enfermo.
—¡Oh! ¿Estás bien?
—Sí, sí. Solo estoy cansado.`,
tr:`—Ahoj, Marto! Kde jsi?
—Jsem v práci. A ty?
—Jsem doma. Jsem trochu nemocný.
—Ach! Jsi v pořádku?
—Ano, ano. Jsem jen unavený.`,
q:[['Kde je Marta?',['v práci','doma','na ulici'],0],['Kde je druhý člověk?',['doma','v práci','v Madridu'],0],['Jak se cítí?',['trochu nemocný a unavený','smutný','spokojený'],0]]}
},

{ t:'Slovesa na -ar', ic:'🗣️',
g:`<h3>Pravidelná slovesa na -AR</h3>
<p>Odtrhneme <b>-ar</b> a přidáme koncovku. Vzor <e>hablar</e> (mluvit):</p>
<table class="tb">
<tr><td><e>hablo</e></td><td>mluvím</td><td>-o</td></tr>
<tr><td><e>hablas</e></td><td>mluvíš</td><td>-as</td></tr>
<tr><td><e>habla</e></td><td>mluví</td><td>-a</td></tr>
<tr><td><e>hablamos</e></td><td>mluvíme</td><td>-amos</td></tr>
<tr><td><e>habláis</e></td><td>mluvíte</td><td>-áis</td></tr>
<tr><td><e>hablan</e></td><td>mluví (oni)</td><td>-an</td></tr>
</table>
<h3>Zápor a otázka</h3>
<p>Zápor: <b>no</b> před sloveso: <e>No hablo inglés.</e></p>
<p>Otázka: stačí změnit intonaci: <e>¿Hablas español?</e></p>`,
w:['hablar|mluvit','trabajar|pracovat','estudiar|studovat, učit se','comprar|kupovat','escuchar|poslouchat','mirar|dívat se','llegar|přijet, přijít','necesitar|potřebovat','cocinar|vařit','viajar|cestovat','la música|hudba','el español|španělština','el inglés|angličtina','mucho|hodně','poco|málo','también|také'],
s:['Hablo un poco de español.|Mluvím trochu španělsky.','Trabajo en Zlín.|Pracuji ve Zlíně.','¿Hablas inglés?|Mluvíš anglicky?','Ellos escuchan música.|Oni poslouchají hudbu.','No necesito el coche.|Nepotřebuji auto.','Estudiamos español.|Učíme se španělsky.'],
q:[['Yo ___ español.',['estudio','estudias','estudia','estudian'],0,'yo → -o'],
['Tú ___ mucho.',['trabajo','trabajas','trabaja','trabajan'],1,'tú → -as'],
['Ella ___ inglés.',['hablo','hablas','habla','hablamos'],2,'ella → -a'],
['Nosotros ___ música.',['escuchan','escucho','escuchamos','escucháis'],2,'nosotros → -amos'],
['Ellos ___ pan.',['compran','compra','compramos','compro'],0,'ellos → -an'],
['„Nemluvím anglicky.“',['No hablo inglés.','Hablo no inglés.','No habla inglés.','Hablo inglés no.'],0,'no stojí před slovesem; yo → hablo']],
r:{t:`Carlos trabaja en un hotel en Barcelona.
Habla español, inglés y un poco de alemán.
Por la tarde estudia francés.
Los fines de semana cocina con su esposa.
Después escuchan música.`,
tr:`Carlos pracuje v hotelu v Barceloně.
Mluví španělsky, anglicky a trochu německy.
Odpoledne studuje francouzštinu.
O víkendech vaří se svou manželkou.
Potom poslouchají hudbu.`,
q:[['Kde Carlos pracuje?',['v hotelu','v restauraci','ve škole'],0],['Jaký jazyk studuje?',['francouzštinu','angličtinu','němčinu'],0],['Co dělá o víkendu?',['vaří s manželkou','cestuje','pracuje'],0]]}
},

{ t:'Jídlo a pití – slovesa na -er, -ir', ic:'🥘',
g:`<h3>Slovesa na -ER a -IR</h3>
<table class="tb">
<tr><th>comer (jíst)</th><th>vivir (bydlet)</th></tr>
<tr><td><e>como</e></td><td><e>vivo</e></td></tr>
<tr><td><e>comes</e></td><td><e>vives</e></td></tr>
<tr><td><e>come</e></td><td><e>vive</e></td></tr>
<tr><td><e>comemos</e></td><td><e>vivimos</e></td></tr>
<tr><td><e>coméis</e></td><td><e>vivís</e></td></tr>
<tr><td><e>comen</e></td><td><e>viven</e></td></tr>
</table>
<h3>QUERER = chtít (e → ie)</h3>
<p><e>quiero</e>, <e>quieres</e>, <e>quiere</e>, <e>queremos</e>, <e>queréis</e>, <e>quieren</e></p>
<p>V restauraci: <e>Quiero un café, por favor.</e> Zdvořileji: <e>Quisiera un café.</e> (Chtěl bych…)</p>`,
w:['comer|jíst','beber|pít','vivir|bydlet, žít','querer|chtít','el pan|chléb','la carne|maso','el pescado|ryba (jídlo)','la fruta|ovoce','el café|káva','la leche|mléko','la cerveza|pivo','el vino|víno','el queso|sýr','el desayuno|snídaně','la comida|jídlo, oběd','la cena|večeře','con|s','sin|bez'],
s:['Quiero un café con leche.|Chci kávu s mlékem.','Vivo en Kroměříž.|Bydlím v Kroměříži.','No como carne.|Nejím maso.','¿Quieres una cerveza?|Chceš pivo?','Bebemos vino tinto.|Pijeme červené víno.','Ellos viven en España.|Oni žijí ve Španělsku.'],
q:[['Yo ___ pan.',['como','comes','come','comen'],0,'yo → como'],
['¿Dónde ___ tú?',['vivo','vives','vive','vivimos'],1,'tú → vives'],
['Ella ___ agua.',['bebo','bebes','bebe','beben'],2,'ella → bebe'],
['Nosotros ___ en Praga.',['vivimos','vivemos','viven','vivís'],0,'-ir slovesa: nosotros → -imos'],
['Yo ___ un café.',['quero','quiero','quiere','queremos'],1,'querer mění e → ie: quiero'],
['„Kávu bez mléka.“',['Un café sin leche.','Un café con leche.','Un leche sin café.','Un café de leche.'],0,'sin = bez, con = s']],
r:{t:`—Buenas tardes. ¿Qué quieren comer?
—Yo quiero pescado con patatas.
—Y yo quiero carne con ensalada.
—¿Y para beber?
—Una cerveza y un vino tinto, por favor.`,
tr:`—Dobré odpoledne. Co si dáte k jídlu?
—Já chci rybu s bramborami.
—A já chci maso se salátem.
—A k pití?
—Pivo a červené víno, prosím.`,
q:[['Co si objednává první host?',['rybu s bramborami','maso','salát'],0],['Co pijí?',['pivo a červené víno','vodu','kávu'],0],['Jaká je denní doba?',['odpoledne','ráno','noc'],0]]}
},

{ t:'Barvy a vlastnosti', ic:'🎨',
g:`<h3>Přídavná jména</h3>
<p>Stojí obvykle <b>za</b> podstatným jménem: <e>un coche rojo</e> = červené auto.</p>
<p>Shodují se v rodě a čísle:</p>
<table class="tb">
<tr><td><e>el coche rojo</e></td><td><e>los coches rojos</e></td></tr>
<tr><td><e>la casa roja</e></td><td><e>las casas rojas</e></td></tr>
</table>
<p>Končí-li na <b>-e</b> nebo souhlásku, mají pro oba rody stejný tvar: <e>una casa grande</e>, <e>un coche grande</e>, <e>el cielo azul</e> → <e>los ojos azules</e>.</p>
<p>Barva se popisuje se slovesem SER: <e>¿De qué color es?</e> <e>Es verde.</e></p>`,
w:['el color|barva','rojo|červený','azul|modrý','verde|zelený','amarillo|žlutý','blanco|bílý','negro|černý','grande|velký','pequeño|malý','nuevo|nový','viejo|starý','bueno|dobrý','malo|špatný','bonito|hezký','caro|drahý','barato|levný','pero|ale'],
s:['Tengo un coche negro.|Mám černé auto.','La casa es grande y bonita.|Dům je velký a hezký.','Las puertas son rojas.|Dveře jsou červené.','Este vino es bueno y barato.|Tohle víno je dobré a levné.','¿De qué color es?|Jakou to má barvu?','Mi perro es pequeño pero muy bueno.|Můj pes je malý, ale velmi hodný.'],
q:[['una casa ___',['blanco','blanca','blancos','blancas'],1,'casa je ženského rodu → blanca'],
['los coches ___',['rojo','roja','rojos','rojas'],2,'mužský rod, množné číslo → rojos'],
['una mesa ___',['grande','granda','grando','grandes'],0,'grande má stejný tvar pro oba rody'],
['las llaves ___',['azul','azules','azulas','azuls'],1,'po souhlásce + es → azules'],
['un perro ___',['pequeña','pequeño','pequeños','pequeñas'],1,'perro → mužský rod, jednotné číslo'],
['„levná káva“',['un café barato','un barato café','un café barata','una café barato'],0,'přídavné jméno za podstatným; café je mužského rodu']],
r:{t:`Mi casa es pequeña pero bonita.
La puerta es azul y las ventanas son blancas.
Tengo un coche viejo; es verde.
Mi hermano tiene un coche nuevo.
Su coche es rojo y muy caro.`,
tr:`Můj dům je malý, ale hezký.
Dveře jsou modré a okna jsou bílá.
Mám staré auto; je zelené.
Můj bratr má nové auto.
Jeho auto je červené a velmi drahé.`,
q:[['Jakou barvu mají dveře?',['modrou','bílou','zelenou'],0],['Jaké je auto vypravěče?',['staré a zelené','nové a červené','černé'],0],['Kdo má drahé auto?',['bratr','vypravěč','sestra'],0]]}
},

{ t:'Dny a hodiny', ic:'🕒',
g:`<h3>Kolik je hodin?</h3>
<p><e>¿Qué hora es?</e></p>
<table class="tb">
<tr><td>1:00</td><td><e>Es la una.</e></td></tr>
<tr><td>2:00</td><td><e>Son las dos.</e></td></tr>
<tr><td>3:15</td><td><e>Son las tres y cuarto.</e></td></tr>
<tr><td>4:30</td><td><e>Son las cuatro y media.</e></td></tr>
<tr><td>5:45</td><td><e>Son las seis menos cuarto.</e></td></tr>
</table>
<p>V kolik? <e>a las ocho</e> = v osm.</p>
<h3>Dny</h3>
<p>Píšou se malým písmenem. <e>el lunes</e> = v pondělí, <e>los lunes</e> = každé pondělí.</p>
<p><e>de lunes a viernes</e> = od pondělí do pátku.</p>
<p class="tip">💡 <e>mañana</e> = zítra, ale <e>la mañana</e> = ráno/dopoledne. <e>mañana por la mañana</e> = zítra ráno.</p>`,
w:['lunes|pondělí','martes|úterý','miércoles|středa','jueves|čtvrtek','viernes|pátek','sábado|sobota','domingo|neděle','hoy|dnes','mañana|zítra','ayer|včera','la semana|týden','la hora|hodina','¿qué hora es?|kolik je hodin?','la mañana|ráno, dopoledne','la tarde|odpoledne','la noche|noc, večer','y media|a půl (… a třicet)','y cuarto|a čtvrt (… a patnáct)'],
s:['Hoy es lunes.|Dnes je pondělí.','Son las tres y media.|Je půl čtvrté.','Es la una.|Je jedna hodina.','Trabajo de lunes a viernes.|Pracuji od pondělí do pátku.','Mañana es sábado.|Zítra je sobota.','Llego a las ocho.|Přijdu v osm.'],
q:[['2:00',['Son las dos.','Es la dos.','Son dos.','Es las dos.'],0,'Od dvou výš: son las …'],
['1:00',['Son las una.','Es la una.','Es una.','Son la una.'],1,'Jedna hodina: es la una'],
['3:30',['Son las tres y cuarto.','Son las tres y media.','Son las media tres.','Es la tres y media.'],1,'y media = a třicet'],
['Den po pondělí:',['martes','miércoles','domingo','jueves'],0,'lunes → martes'],
['„v sobotu“',['el sábado','en sábado','a sábado','sábado en'],0,'v + den = el + den'],
['5:15',['Son las cinco y cuarto.','Son las cinco menos cuarto.','Son las cinco y media.','Es la cinco y cuarto.'],0,'y cuarto = a patnáct']],
r:{t:`Ana trabaja de lunes a viernes.
Se levanta a las siete.
El trabajo empieza a las ocho y media.
Los sábados va al mercado.
Los domingos come con su familia.`,
tr:`Ana pracuje od pondělí do pátku.
Vstává v sedm.
Práce začíná v půl deváté.
V sobotu chodí na trh.
V neděli obědvá se svou rodinou.`,
q:[['V kolik začíná Anina práce?',['v 8:30','v 7:00','v 9:00'],0],['Co dělá v sobotu?',['jde na trh','pracuje','obědvá s rodinou'],0],['V kolik vstává?',['v sedm','v osm','v šest'],0]]}
},

{ t:'Ve městě – sloveso ir', ic:'🏙️',
g:`<h3>IR = jít, jet</h3>
<table class="tb">
<tr><td><e>voy</e></td><td>jdu</td></tr>
<tr><td><e>vas</e></td><td>jdeš</td></tr>
<tr><td><e>va</e></td><td>jde</td></tr>
<tr><td><e>vamos</e></td><td>jdeme</td></tr>
<tr><td><e>vais</e></td><td>jdete</td></tr>
<tr><td><e>van</e></td><td>jdou</td></tr>
</table>
<p>Kam? → <b>a</b>. Pozor: <b>a + el = al</b>: <e>Voy al banco.</e> ale <e>Voy a la playa.</e></p>
<h3>Budoucnost: IR A + infinitiv</h3>
<p><e>Voy a comer.</e> = Půjdu se najíst / Budu jíst. <e>Vamos a viajar.</e> = Budeme cestovat.</p>
<h3>Ptáme se na cestu</h3>
<p><e>¿Hay un banco cerca?</e> <e>¿Dónde está la estación?</e></p>`,
w:['ir|jít, jet','¿adónde?|kam?','el banco|banka','la tienda|obchod','el restaurante|restaurace','el hotel|hotel','la estación|nádraží','el museo|muzeum','la playa|pláž','el mercado|trh','la farmacia|lékárna','cerca|blízko','lejos|daleko','a la derecha|vpravo','a la izquierda|vlevo','todo recto|rovně'],
s:['¿Dónde está la estación?|Kde je nádraží?','Voy al mercado.|Jdu na trh.','¿Hay una farmacia cerca?|Je tu poblíž lékárna?','Está a la derecha.|Je to vpravo.','Mañana vamos a la playa.|Zítra jedeme na pláž.','Voy a comer en un restaurante.|Půjdu se najíst do restaurace.'],
q:[['Yo ___ al banco.',['voy','vas','va','van'],0,'yo → voy'],
['Nosotros ___ a la playa.',['van','vamos','vais','va'],1,'nosotros → vamos'],
['¿Adónde ___ tú?',['voy','va','vas','vamos'],2,'tú → vas'],
['Voy ___ museo.',['a el','al','a la','en'],1,'a + el = al'],
['Voy ___ tienda.',['al','a la','a el','en la'],1,'la tienda → a la'],
['„Budu pracovat.“',['Voy a trabajar.','Voy trabajar.','Voy a trabajo.','Va a trabajar.'],0,'ir a + infinitiv']],
r:{t:`—Perdón, ¿hay un banco cerca?
—Sí, hay un banco en la calle Mayor.
—¿Cómo voy?
—Usted va todo recto y después a la izquierda.
—¿Está lejos?
—No, está muy cerca, a cinco minutos.`,
tr:`—Promiňte, je tu poblíž banka?
—Ano, na ulici Mayor je banka.
—Jak se tam dostanu?
—Půjdete rovně a pak doleva.
—Je to daleko?
—Ne, je to velmi blízko, pět minut.`,
q:[['Kde je banka?',['na ulici Mayor','u nádraží','na pláži'],0],['Kam se má na konci odbočit?',['doleva','doprava','nikam'],0],['Jak je to daleko?',['5 minut','15 minut','hodinu'],0]]}
},

{ t:'Co mám rád – gustar', ic:'❤️',
g:`<h3>GUSTAR = líbit se</h3>
<p>Španělé neříkají „mám rád“, ale „<b>líbí se mi</b>“:</p>
<table class="tb">
<tr><td><e>me gusta</e></td><td>líbí se mi</td></tr>
<tr><td><e>te gusta</e></td><td>líbí se ti</td></tr>
<tr><td><e>le gusta</e></td><td>líbí se mu / jí / vám</td></tr>
<tr><td><e>nos gusta</e></td><td>líbí se nám</td></tr>
<tr><td><e>les gusta</e></td><td>líbí se jim</td></tr>
</table>
<p>Jedna věc nebo činnost → <b>gusta</b>: <e>Me gusta el café.</e> <e>Me gusta leer.</e></p>
<p>Více věcí → <b>gustan</b>: <e>Me gustan los perros.</e></p>
<p>Zápor: <e>No me gusta.</e> · Já taky: <e>A mí también.</e> · Já taky ne: <e>A mí tampoco.</e></p>
<p><e>Me encanta</e> = zbožňuji, moc se mi líbí.</p>`,
w:['me gusta|líbí se mi, mám rád','te gusta|líbí se ti','le gusta|líbí se mu / jí','me gustan|líbí se mi (více věcí)','me encanta|zbožňuji','el fútbol|fotbal','leer|číst','bailar|tancovat','nadar|plavat','correr|běhat','el cine|kino','la película|film','el deporte|sport','el tiempo libre|volný čas','preferir|dávat přednost','tampoco|také ne'],
s:['Me gusta leer.|Rád čtu.','No me gusta el fútbol.|Nemám rád fotbal.','¿Te gustan los perros?|Máš rád psy?','Me encanta bailar.|Zbožňuji tancování.','A mi hijo le gusta nadar.|Můj syn rád plave.','A mí tampoco.|Já taky ne.'],
q:[['Me ___ el café.',['gusta','gustan','gusto','gustas'],0,'jedna věc → gusta'],
['Me ___ los gatos.',['gusta','gustan','gustas','gusto'],1,'více věcí → gustan'],
['¿Te ___ bailar?',['gusta','gustan','gustas','gusto'],0,'činnost (infinitiv) → gusta'],
['A ella ___ gusta el cine.',['me','te','le','les'],2,'jí → le'],
['Nos ___ las películas.',['gusta','gustan','gustamos','gustáis'],1,'las películas = více věcí → gustan'],
['„Nemám rád pivo.“',['No me gusta la cerveza.','Me no gusta la cerveza.','No gusto la cerveza.','No me gustan la cerveza.'],0,'no stojí před me']],
r:{t:`En mi tiempo libre me gusta mucho leer y ir al cine.
Mi esposa prefiere el deporte.
Le encanta correr y nadar.
A nuestros hijos les gustan los videojuegos.
Pero no les gusta leer.`,
tr:`Ve volném čase moc rád čtu a chodím do kina.
Moje manželka dává přednost sportu.
Zbožňuje běhání a plavání.
Naše děti mají rády videohry.
Ale nebaví je číst.`,
q:[['Co dělá vypravěč ve volném čase?',['čte a chodí do kina','běhá','hraje videohry'],0],['Co zbožňuje manželka?',['běhání a plavání','čtení','kino'],0],['Co děti nebaví?',['čtení','videohry','sport'],0]]}
},

{ t:'Můj den – zvratná slovesa', ic:'☀️',
g:`<h3>Zvratná slovesa (se)</h3>
<p><e>levantarse</e> = vstávat (doslova „zvedat se“):</p>
<table class="tb">
<tr><td><e>me levanto</e></td><td>vstávám</td></tr>
<tr><td><e>te levantas</e></td><td>vstáváš</td></tr>
<tr><td><e>se levanta</e></td><td>vstává</td></tr>
<tr><td><e>nos levantamos</e></td><td>vstáváme</td></tr>
<tr><td><e>se levantan</e></td><td>vstávají</td></tr>
</table>
<h3>Slovesa, která mění kmen</h3>
<p><b>o → ue</b>: <e>volver → vuelvo</e> (vracím se), <e>dormir → duermo</e> (spím), <e>poder → puedo</e> (můžu)</p>
<p>Nepravidelné „já“: <e>hacer → hago</e> (dělám), <e>salir → salgo</e> (odcházím)</p>
<p>V tvarech „my“ a „vy“ se kmen nemění: <e>volvemos</e>, <e>podemos</e>.</p>`,
w:['levantarse|vstávat','ducharse|sprchovat se','desayunar|snídat','salir|odcházet, vycházet','volver|vracet se','dormir|spát','hacer|dělat','poder|moci','después|potom','antes|předtím','temprano|brzy (časně)','tarde|pozdě','normalmente|obvykle','a veces|někdy','nunca|nikdy','todos los días|každý den'],
s:['Me levanto a las seis.|Vstávám v šest.','Normalmente desayuno café y pan.|Obvykle snídám kávu a chleba.','Salgo de casa temprano.|Odcházím z domu brzy.','¿Qué haces hoy?|Co dnes děláš?','No puedo dormir.|Nemůžu spát.','Vuelvo a casa a las cinco.|Vracím se domů v pět.'],
q:[['Yo me ___ a las siete.',['levanto','levantas','levanta','levantan'],0,'yo → me levanto'],
['Ella ___ ducha por la mañana.',['me','te','se','nos'],2,'ona → se'],
['Yo ___ de casa a las ocho.',['salo','salgo','sale','salimos'],1,'salir je v 1. osobě nepravidelné: salgo'],
['Yo ___ ocho horas.',['dormo','duermo','duerme','dormimos'],1,'dormir: o → ue → duermo'],
['¿___ ayudarme?',['Puedes','Podes','Pueden','Puedo'],0,'poder: tú → puedes'],
['¿Qué ___ tú?',['hago','haces','hace','hacemos'],1,'hacer: tú → haces']],
r:{t:`Lucía es médica en un hospital.
Todos los días se levanta muy temprano, a las seis.
Se ducha y desayuna un café con tostadas.
Sale de casa a las siete y vuelve a las cuatro.
A veces trabaja por la noche y después no puede dormir.`,
tr:`Lucía je lékařka v nemocnici.
Každý den vstává velmi brzy, v šest.
Osprchuje se a nasnídá se kávu s topinkami.
Z domu odchází v sedm a vrací se ve čtyři.
Někdy pracuje v noci a potom nemůže spát.`,
q:[['Jaké má Lucía povolání?',['lékařka','učitelka','kuchařka'],0],['V kolik vstává?',['v šest','v sedm','ve čtyři'],0],['Co se stává po noční směně?',['nemůže spát','jde do kina','snídá'],0]]}
},

{ t:'Nakupování – čísla do 100', ic:'🛍️',
g:`<h3>Čísla 21–100</h3>
<table class="tb">
<tr><td><e>veintiuno</e> 21</td><td><e>veintidós</e> 22</td></tr>
<tr><td><e>treinta</e> 30</td><td><e>treinta y cinco</e> 35</td></tr>
<tr><td><e>cuarenta</e> 40</td><td><e>cincuenta</e> 50</td></tr>
<tr><td><e>sesenta</e> 60</td><td><e>setenta</e> 70</td></tr>
<tr><td><e>ochenta</e> 80</td><td><e>noventa</e> 90</td></tr>
<tr><td><e>cien</e> 100</td><td></td></tr>
</table>
<p>21–29 se píše jedním slovem (<b>veinti-</b>), od 31 s <b>y</b>: <e>cuarenta y ocho</e>.</p>
<h3>Kolik to stojí?</h3>
<p>Jedna věc: <e>¿Cuánto cuesta?</e> Více věcí: <e>¿Cuánto cuestan?</e></p>
<p>Tento / tato / tito: <e>este libro</e>, <e>esta camisa</e>, <e>estos zapatos</e>, <e>estas llaves</e></p>`,
w:['treinta|třicet','cuarenta|čtyřicet','cincuenta|padesát','sesenta|šedesát','setenta|sedmdesát','ochenta|osmdesát','noventa|devadesát','cien|sto','el euro|euro','¿cuánto cuesta?|kolik to stojí?','la cuenta|účet','pagar|platit','la tarjeta|karta','en efectivo|v hotovosti','la camisa|košile','los zapatos|boty','la talla|velikost','este / esta|tento / tato'],
s:['¿Cuánto cuesta esta camisa?|Kolik stojí tahle košile?','Cuesta treinta euros.|Stojí třicet eur.','¿Puedo pagar con tarjeta?|Můžu platit kartou?','La cuenta, por favor.|Účet, prosím.','Un kilo de tomates, por favor.|Kilo rajčat, prosím.','Estos zapatos son muy caros.|Tyhle boty jsou moc drahé.'],
q:[['45 =',['cuarenta y cinco','cuatro y cinco','cincuenta y cuatro','cuarenta cinco'],0,'40 + y + 5'],
['22 =',['veinte y dos','veintidós','doce y diez','dos y veinte'],1,'21–29 jedním slovem: veintidós'],
['100 =',['ciento','cien','mil','diez'],1,'samotné sto = cien'],
['¿Cuánto ___ los zapatos?',['cuesta','cuestan','cuesto','costan'],1,'více věcí → cuestan'],
['___ camisa es bonita.',['Este','Esta','Estos','Estas'],1,'camisa je ženského rodu → esta'],
['70 =',['sesenta','setenta','siete','diecisiete'],1,'70 = setenta (60 = sesenta)']],
r:{t:`—Buenos días. ¿Cuánto cuestan las naranjas?
—Dos euros el kilo.
—Quiero dos kilos, por favor. ¿Y el queso?
—El queso cuesta doce euros.
—Muy bien. ¿Puedo pagar con tarjeta?
—No, lo siento. Solo en efectivo.`,
tr:`—Dobrý den. Kolik stojí pomeranče?
—Dvě eura kilo.
—Chci dvě kila, prosím. A sýr?
—Sýr stojí dvanáct eur.
—Výborně. Můžu platit kartou?
—Ne, je mi líto. Jen v hotovosti.`,
q:[['Kolik stojí kilo pomerančů?',['2 eura','12 eur','20 eur'],0],['Kolik kil si zákazník bere?',['dvě','jedno','pět'],0],['Jak se dá platit?',['jen v hotovosti','kartou','kartou i hotově'],0]]}
},

{ t:'Počasí a plány', ic:'🌦️',
g:`<h3>Počasí</h3>
<p><e>¿Qué tiempo hace?</e> = Jaké je počasí?</p>
<p>Většina výrazů používá <b>hacer</b>: <e>hace calor</e> (je horko), <e>hace frío</e> (je zima), <e>hace sol</e> (svítí slunce), <e>hace viento</e> (fouká).</p>
<p>Déšť a sníh mají vlastní sloveso: <e>llueve</e> (prší), <e>nieva</e> (sněží).</p>
<h3>Plány: IR A + infinitiv</h3>
<p><e>Este verano voy a viajar a España.</e> = Letos v létě pojedu do Španělska.</p>
<p><e>¿Qué vas a hacer el fin de semana?</e> = Co budeš dělat o víkendu?</p>
<p class="tip">💡 <e>el tiempo</e> znamená „počasí“ i „čas“ (který plyne).</p>`,
w:['el tiempo|počasí; čas','¿qué tiempo hace?|jaké je počasí?','hace calor|je horko','hace frío|je zima (chladno)','hace sol|svítí slunce','hace viento|fouká vítr','llueve|prší','nieva|sněží','la primavera|jaro','el verano|léto','el otoño|podzim','el invierno|zima (roční období)','las vacaciones|prázdniny, dovolená','el fin de semana|víkend','el año que viene|příští rok','pronto|brzy, zakrátko'],
s:['Hoy hace mucho calor.|Dnes je velké horko.','En invierno nieva en la montaña.|V zimě na horách sněží.','¿Qué tiempo hace en Madrid?|Jaké je počasí v Madridu?','Este verano voy a viajar a España.|Letos v létě pojedu do Španělska.','¿Qué vas a hacer el fin de semana?|Co budeš dělat o víkendu?','Mañana va a llover.|Zítra bude pršet.'],
q:[['V létě: ___ calor.',['hace','es','está','hay'],0,'počasí s hacer: hace calor'],
['„Prší.“',['Hace lluvia.','Llueve.','Es lluvia.','Está llueve.'],1,'llueve = prší'],
['Mañana ___ a nevar.',['va','voy','vas','es'],0,'ir a + infinitiv; počasí → 3. osoba: va a nevar'],
['Roční období po zimě:',['la primavera','el verano','el otoño','el invierno'],0,'po zimě přichází jaro = la primavera'],
['Nosotros ___ a viajar.',['vamos','van','va','voy'],0,'nosotros → vamos'],
['„Je zima (chladno).“',['Hace frío.','Es frío.','Está frío.','Hay frío.'],0,'hace frío']],
r:{t:`En mi ciudad, en invierno hace mucho frío y a veces nieva.
En primavera llueve mucho.
El verano es mi estación favorita: hace sol y calor.
Este año, en vacaciones, voy a viajar a Málaga con mi familia.
Vamos a ir a la playa todos los días.`,
tr:`V mém městě je v zimě velká zima a někdy sněží.
Na jaře hodně prší.
Léto je moje oblíbené roční období: svítí slunce a je teplo.
Letos o prázdninách pojedu s rodinou do Málagy.
Budeme chodit na pláž každý den.`,
q:[['Jaké je oblíbené roční období vypravěče?',['léto','zima','jaro'],0],['Kdy hodně prší?',['na jaře','v létě','v zimě'],0],['Kam pojede o prázdninách?',['do Málagy','do Madridu','na hory'],0]]}
}
];
