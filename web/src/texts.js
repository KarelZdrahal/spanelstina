// Krátká poslechová cvičení – jedno ke každé lekci (index = číslo lekce − 1).
// Text je skrytý, dokud uživatel neodpoví na otázky. q: [otázka, [možnosti], správná]
const LISTEN = [
{ t:`—Buenas tardes, Pedro.
—Buenas tardes, Ana. ¿Qué tal?
—Bien, gracias. ¿Y tú?
—Muy mal. Perdón, adiós.`,
tr:`—Dobré odpoledne, Pedro.
—Dobré odpoledne, Ano. Jak se máš?
—Dobře, děkuji. A ty?
—Velmi špatně. Promiň, na shledanou.`,
q:[['Jaká je denní doba?',['odpoledne','ráno','noc'],0],['Jak se má Ana?',['dobře','špatně','velmi špatně'],0],['Jak se má Pedro?',['velmi špatně','velmi dobře','dobře'],0]] },

{ t:`—Hola, me llamo Pablo. ¿Cómo te llamas?
—Me llamo Eva.
—¿De dónde eres, Eva?
—Soy checa, de Brno. ¿Y tú?
—Yo soy español, de Valencia.`,
tr:`—Ahoj, jmenuji se Pablo. Jak se jmenuješ?
—Jmenuji se Eva.
—Odkud jsi, Evo?
—Jsem Češka, z Brna. A ty?
—Já jsem Španěl, z Valencie.`,
q:[['Jak se jmenuje dívka?',['Eva','Ana','Lucía'],0],['Odkud je Eva?',['z Brna','z Valencie','z Prahy'],0],['Odkud je Pablo?',['z Valencie','z Madridu','ze Sevilly'],0]] },

{ t:`—¿Esto es un libro?
—No, es un teléfono.
—¿Y esto?
—Es una llave. La llave de la casa.`,
tr:`—Je tohle kniha?
—Ne, je to telefon.
—A tohle?
—To je klíč. Klíč od domu.`,
q:[['Co je první věc?',['telefon','kniha','klíč'],0],['Od čeho je klíč?',['od domu','od auta','od dveří kanceláře'],0]] },

{ t:`—¿Cuántos libros hay en la mesa?
—Hay doce libros.
—¿Y cuántas sillas hay?
—Hay cuatro sillas y un gato.`,
tr:`—Kolik knih je na stole?
—Je tam dvanáct knih.
—A kolik je tam židlí?
—Jsou tam čtyři židle a jedna kočka.`,
q:[['Kolik je na stole knih?',['12','2','20'],0],['Kolik je tam židlí?',['4','14','5'],0],['Jaké zvíře tam je?',['kočka','pes','žádné'],0]] },

{ t:`Me llamo Marta y tengo veinte años.
Tengo un hermano. Se llama Luis.
Mi madre se llama Rosa.
Mi padre tiene un perro.`,
tr:`Jmenuji se Marta a je mi dvacet let.
Mám jednoho bratra. Jmenuje se Luis.
Moje matka se jmenuje Rosa.
Můj otec má psa.`,
q:[['Kolik je Martě let?',['20','12','2'],0],['Jak se jmenuje její bratr?',['Luis','Pablo','Juan'],0],['Kdo má psa?',['otec','matka','bratr'],0]] },

{ t:`—Hola, Juan. ¿Dónde estás?
—Estoy en el trabajo.
—¿Cómo estás?
—Estoy muy cansado. Y mi hijo está enfermo. Está en casa con su abuela.`,
tr:`—Ahoj, Juane. Kde jsi?
—Jsem v práci.
—Jak se máš?
—Jsem moc unavený. A můj syn je nemocný. Je doma s babičkou.`,
q:[['Kde je Juan?',['v práci','doma','ve městě'],0],['Jak se Juan cítí?',['je unavený','je smutný','je spokojený'],0],['Kde je Juanův syn?',['doma s babičkou','ve škole','v práci'],0]] },

{ t:`Mi hermana Ana trabaja en Madrid.
Habla español e inglés.
También estudia alemán.
Los sábados cocina para la familia y escucha música.`,
tr:`Moje sestra Ana pracuje v Madridu.
Mluví španělsky a anglicky.
Také studuje němčinu.
V sobotu vaří pro rodinu a poslouchá hudbu.`,
q:[['Kde Ana pracuje?',['v Madridu','v Barceloně','v Praze'],0],['Co Ana studuje?',['němčinu','angličtinu','francouzštinu'],0],['Co dělá v sobotu?',['vaří a poslouchá hudbu','pracuje','cestuje'],0]] },

{ t:`—¿Qué quieres para la cena?
—Quiero pescado con ensalada.
—¿Y para beber? ¿Vino?
—No, gracias. Agua, por favor. No bebo alcohol.`,
tr:`—Co chceš k večeři?
—Chci rybu se salátem.
—A k pití? Víno?
—Ne, děkuji. Vodu, prosím. Nepiju alkohol.`,
q:[['Co si dá k večeři?',['rybu se salátem','maso','sýr a chléb'],0],['Co bude pít?',['vodu','víno','pivo'],0]] },

{ t:`—¿Cuál es tu coche?
—Es el coche rojo. No, perdón: el rojo es de mi hermano.
—¿Y tu coche?
—Mi coche es el pequeño, el blanco. Es viejo, pero es muy bueno.`,
tr:`—Které je tvoje auto?
—To červené. Ne, promiň: to červené je bratrovo.
—A tvoje auto?
—Moje auto je to malé, bílé. Je staré, ale je moc dobré.`,
q:[['Jaké auto má mluvčí?',['malé bílé','červené','velké černé'],0],['Čí je červené auto?',['bratra','otce','mluvčího'],0],['Jaké je auto mluvčího?',['staré, ale dobré','nové a drahé','špatné'],0]] },

{ t:`—Perdón, ¿qué hora es?
—Son las cuatro y media.
—¡Uf! El tren sale a las cinco.
—¿Hoy? Hoy es domingo. El domingo el tren sale a las seis.`,
tr:`—Promiňte, kolik je hodin?
—Je půl páté.
—Uf! Vlak jede v pět.
—Dnes? Dnes je neděle. V neděli jede vlak v šest.`,
q:[['Kolik je hodin?',['4:30','5:30','3:30'],0],['Jaký je dnes den?',['neděle','sobota','pondělí'],0],['V kolik dnes jede vlak?',['v 6','v 5','ve 4:30'],0]] },

{ t:`—Perdón, ¿hay una farmacia cerca?
—Sí, está muy cerca.
—¿Cómo voy?
—Usted va todo recto y después a la derecha. La farmacia está al lado del banco.`,
tr:`—Promiňte, je tu blízko lékárna?
—Ano, je velmi blízko.
—Jak se tam dostanu?
—Půjdete rovně a potom doprava. Lékárna je vedle banky.`,
q:[['Je lékárna daleko?',['ne, blízko','ano, daleko','nikdo neví'],0],['Kam se má na konci odbočit?',['doprava','doleva','nikam'],0],['Vedle čeho je lékárna?',['vedle banky','vedle nádraží','vedle hotelu'],0]] },

{ t:`—¿Te gusta el fútbol?
—No, no me gusta. Prefiero el cine.
—¿Y te gusta bailar?
—¡Sí, me encanta! Y también me gusta nadar.`,
tr:`—Máš rád fotbal?
—Ne, nemám. Raději chodím do kina.
—A tancuješ rád?
—Ano, zbožňuji to! A také rád plavu.`,
q:[['Má rád fotbal?',['ne','ano','trochu'],0],['Čemu dává přednost?',['kinu','sportu','čtení'],0],['Co ještě dělá rád?',['plave','běhá','vaří'],0]] },

{ t:`Normalmente me levanto a las siete.
Desayuno café con leche y salgo de casa a las ocho.
Vuelvo a casa a las seis.
Nunca duermo por la tarde.`,
tr:`Obvykle vstávám v sedm.
Snídám kávu s mlékem a z domu odcházím v osm.
Domů se vracím v šest.
Odpoledne nikdy nespím.`,
q:[['V kolik vstává?',['v 7','v 6','v 8'],0],['Co snídá?',['kávu s mlékem','chléb se sýrem','ovoce'],0],['V kolik se vrací domů?',['v 6','v 8','v 7'],0]] },

{ t:`—¿Cuánto cuestan estos zapatos?
—Cuestan cincuenta euros.
—¿Y la camisa azul?
—Veinte euros.
—Bueno, la camisa, por favor. ¿Puedo pagar con tarjeta?
—Sí, claro.`,
tr:`—Kolik stojí tyhle boty?
—Stojí padesát eur.
—A ta modrá košile?
—Dvacet eur.
—Dobře, tu košili, prosím. Můžu platit kartou?
—Ano, samozřejmě.`,
q:[['Kolik stojí boty?',['50 €','15 €','20 €'],0],['Co si zákazník koupí?',['modrou košili','boty','obojí'],0],['Jak zaplatí?',['kartou','v hotovosti','nezaplatí'],0]] },

{ t:`Hoy en Madrid hace sol y mucho calor.
Mañana por la tarde va a llover.
El fin de semana va a hacer viento y un poco de frío.`,
tr:`Dnes je v Madridu slunečno a velké horko.
Zítra odpoledne bude pršet.
O víkendu bude foukat vítr a bude trochu chladno.`,
q:[['Jaké je dnes počasí?',['slunečno a horko','prší','sněží'],0],['Kdy bude zítra pršet?',['odpoledne','ráno','v noci'],0],['Jaké bude počasí o víkendu?',['větrno a chladněji','horko','sníh'],0]] }
];

// Souvislé texty – zpřístupní se po dokončení lekce `after` (index lekce).
// gl = slovníček nových slov v textu. q může obsahovat i otázky typu pravda/nepravda.
const TEXTS = [
{ id:'rodina', after:4, ic:'👨‍👩‍👧', title:'Moje rodina',
t:`Me llamo Tomás. Soy checo, de Brno, y tengo cuarenta años.
Mi esposa se llama Lenka. Ella no es de Brno; es de Olomouc.
Tenemos dos hijos: un hijo y una hija.
Mi hijo se llama Jakub y tiene doce años.
Mi hija se llama Anna y tiene ocho años.
Mis padres son de Brno también.
Mi madre tiene un gato y mi padre tiene un perro.
Mi hermana Petra no tiene hijos, pero tiene tres gatos.
Mi familia no es grande, pero es muy buena.`,
tr:`Jmenuji se Tomáš. Jsem Čech, z Brna, a je mi čtyřicet let.
Moje žena se jmenuje Lenka. Ona není z Brna; je z Olomouce.
Máme dvě děti: syna a dceru.
Můj syn se jmenuje Jakub a je mu dvanáct let.
Moje dcera se jmenuje Anna a je jí osm let.
Moji rodiče jsou také z Brna.
Moje máma má kočku a můj táta má psa.
Moje sestra Petra nemá děti, ale má tři kočky.
Moje rodina není velká, ale je moc fajn.`,
gl:['cuarenta|čtyřicet','tenemos|máme','también|také','pero|ale','grande|velký','buena|dobrá'],
q:[['Odkud je Tomáš?',['z Brna','z Olomouce','z Prahy'],0],
['Pravda, nebo nepravda? Lenka je z Brna.',['nepravda','pravda'],0],
['Kolik mají Tomáš a Lenka dětí?',['dvě','tři','jedno'],0],
['Kolik je Anně let?',['8','12','40'],0],
['Kdo má tři kočky?',['sestra Petra','Tomášova máma','Anna'],0]] },

{ id:'carmen', after:6, ic:'👩‍🏫', title:'Carmen v Madridu',
t:`Carmen es de Sevilla, pero ahora está en Madrid.
Trabaja en una escuela: es profesora de inglés.
Habla español, inglés y un poco de francés.
Por la mañana trabaja en la escuela.
Por la tarde estudia alemán con una amiga.
Carmen necesita el alemán para su trabajo, porque la escuela tiene muchos estudiantes de Alemania.
Por la noche cocina, escucha música y mira la televisión.
Carmen está cansada, pero contenta: le gusta mucho su trabajo.`,
tr:`Carmen je ze Sevilly, ale teď je v Madridu.
Pracuje ve škole: je učitelka angličtiny.
Mluví španělsky, anglicky a trochu francouzsky.
Dopoledne pracuje ve škole.
Odpoledne studuje s kamarádkou němčinu.
Carmen potřebuje němčinu do práce, protože škola má hodně studentů z Německa.
Večer vaří, poslouchá hudbu a dívá se na televizi.
Carmen je unavená, ale spokojená: svou práci má moc ráda.`,
gl:['ahora|teď','la escuela|škola','la profesora|učitelka','por la mañana|dopoledne, ráno','la amiga|kamarádka','porque|protože','muchos|mnoho','la televisión|televize'],
q:[['Odkud je Carmen?',['ze Sevilly','z Madridu','z Německa'],0],
['Jaké má Carmen povolání?',['učitelka angličtiny','studentka','kuchařka'],0],
['Co dělá odpoledne?',['studuje němčinu','pracuje ve škole','vaří'],0],
['Proč Carmen potřebuje němčinu?',['ve škole je hodně studentů z Německa','chce cestovat','má německého přítele'],0],
['Pravda, nebo nepravda? Carmen je smutná.',['nepravda','pravda'],0]] },

{ id:'restaurante', after:8, ic:'🍽️', title:'V restauraci',
t:`El sábado, Pablo y Lucía comen en un restaurante del centro.
El restaurante es pequeño, pero muy bonito.
Las mesas son blancas y las sillas son rojas.
Pablo quiere carne con patatas y una cerveza.
Lucía no come carne. Ella quiere pescado y una ensalada verde.
Para beber, Lucía quiere un vino blanco.
De postre, los dos comen fruta.
La comida es muy buena y no es cara: cuesta cuarenta euros.
Pablo y Lucía están muy contentos.`,
tr:`V sobotu jedí Pablo a Lucía v restauraci v centru.
Restaurace je malá, ale moc hezká.
Stoly jsou bílé a židle červené.
Pablo chce maso s bramborami a pivo.
Lucía nejí maso. Chce rybu a zelený salát.
K pití chce Lucía bílé víno.
Jako dezert si oba dají ovoce.
Jídlo je moc dobré a není drahé: stojí čtyřicet eur.
Pablo a Lucía jsou moc spokojení.`,
gl:['el centro|centrum','las patatas|brambory','la ensalada|salát','el postre|dezert','los dos|oba','cuesta|stojí (cena)'],
q:[['Jakou barvu mají židle?',['červenou','bílou','zelenou'],0],
['Co si objedná Lucía?',['rybu a zelený salát','maso s bramborami','jen ovoce'],0],
['Pravda, nebo nepravda? Lucía jí maso.',['nepravda','pravda'],0],
['Co pije Pablo?',['pivo','bílé víno','vodu'],0],
['Kolik stojí jídlo?',['40 €','14 €','4 €'],0],
['Pravda, nebo nepravda? Restaurace je drahá.',['nepravda','pravda'],0]] },

{ id:'madrid', after:10, ic:'🏛️', title:'Den v Madridu',
t:`Es sábado. Son las diez de la mañana y Eva está en Madrid.
Primero va al Museo del Prado. El museo está muy cerca del hotel.
A la una y media come en un restaurante de la Plaza Mayor.
Por la tarde va al parque del Retiro.
En el parque hay muchas personas, perros y niños.
Después va a una tienda y compra un libro para su hermano.
A las nueve vuelve al hotel. Está muy cansada.
Mañana va a viajar a Toledo en tren.`,
tr:`Je sobota. Je deset hodin dopoledne a Eva je v Madridu.
Nejdřív jde do muzea Prado. Muzeum je velmi blízko hotelu.
V půl druhé obědvá v restauraci na náměstí Plaza Mayor.
Odpoledne jde do parku Retiro.
V parku je hodně lidí, psů a dětí.
Potom jde do obchodu a koupí knihu pro bratra.
V devět se vrací do hotelu. Je moc unavená.
Zítra pojede vlakem do Toleda.`,
gl:['primero|nejdřív','la plaza|náměstí','las personas|lidé','los niños|děti','después|potom','vuelve|vrací se','el tren|vlak'],
q:[['Jaký je den?',['sobota','neděle','pátek'],0],
['Kam jde Eva nejdřív?',['do muzea Prado','do parku','do obchodu'],0],
['V kolik obědvá?',['ve 13:30','v 10:00','v 21:00'],0],
['Co koupí a pro koho?',['knihu pro bratra','knihu pro sebe','telefon pro sestru'],0],
['Kam pojede zítra a čím?',['do Toleda vlakem','do Toleda autem','domů letadlem'],0]] },

{ id:'correo', after:12, ic:'✉️', title:'E-mail od Clary',
t:`¡Hola, Marta!
¿Qué tal? Yo estoy bien. Ahora vivo en Valencia y trabajo en un hotel.
Me levanto muy temprano, a las seis, porque el trabajo empieza a las siete.
Vuelvo a casa a las tres y por la tarde tengo tiempo libre.
Me gusta mucho correr en la playa y nadar en el mar.
Los fines de semana voy al cine con mis amigos. Me encantan las películas españolas.
No me gusta cocinar; normalmente como en un restaurante cerca de casa.
¿Y tú? ¿Qué haces en tu tiempo libre?
Un abrazo,
Clara`,
tr:`Ahoj, Marto!
Jak se máš? Já se mám dobře. Teď bydlím ve Valencii a pracuji v hotelu.
Vstávám velmi brzy, v šest, protože práce začíná v sedm.
Domů se vracím ve tři a odpoledne mám volno.
Moc ráda běhám po pláži a plavu v moři.
O víkendech chodím s přáteli do kina. Zbožňuji španělské filmy.
Nerada vařím; obvykle jím v restauraci blízko domu.
A ty? Co děláš ve volném čase?
Objímám tě,
Clara`,
gl:['empieza|začíná','el mar|moře','los amigos|přátelé','un abrazo|objímám tě (závěr dopisu)'],
q:[['Kde Clara pracuje?',['v hotelu ve Valencii','v restauraci','v kině'],0],
['Proč Clara vstává tak brzy?',['práce začíná v sedm','běhá ráno po pláži','chodí do kina'],0],
['Co dělá Clara ráda?',['běhá po pláži a plave','vaří','hraje fotbal'],0],
['Pravda, nebo nepravda? Clara ráda vaří.',['nepravda','pravda'],0],
['Co dělá o víkendech?',['chodí s přáteli do kina','pracuje','spí'],0]] },

{ id:'vacaciones', after:14, ic:'🏖️', title:'Prázdniny v Málaze',
t:`Este verano la familia Novák va a viajar a España.
Van a estar dos semanas en Málaga, en un hotel cerca de la playa.
En Málaga, en verano, hace mucho sol y calor. Casi nunca llueve.
El padre quiere ir a la playa todos los días y nadar.
La madre prefiere los museos: en Málaga está el Museo Picasso.
Los hijos quieren comer helado y jugar al fútbol en la playa.
El hotel cuesta noventa euros por noche, pero para Málaga no es caro.
Antes del viaje, toda la familia estudia un poco de español con una aplicación.`,
tr:`Letos v létě pojede rodina Novákových do Španělska.
Budou dva týdny v Málaze, v hotelu blízko pláže.
V Málaze je v létě hodně slunce a horko. Skoro nikdy neprší.
Otec chce chodit každý den na pláž a plavat.
Matka dává přednost muzeím: v Málaze je Picassovo muzeum.
Děti chtějí jíst zmrzlinu a hrát na pláži fotbal.
Hotel stojí devadesát eur za noc, ale na Málagu to není drahé.
Před cestou se celá rodina učí trochu španělsky s aplikací.`,
gl:['casi|skoro','el helado|zmrzlina','jugar|hrát (si)','por noche|za noc','el viaje|cesta','toda|celá'],
q:[['Na jak dlouho pojedou do Málagy?',['na dva týdny','na týden','na měsíc'],0],
['Pravda, nebo nepravda? V Málaze v létě často prší.',['nepravda','pravda'],0],
['Co chce dělat matka?',['chodit do muzeí','plavat','hrát fotbal'],0],
['Co chtějí děti?',['zmrzlinu a fotbal na pláži','do muzea','spát v hotelu'],0],
['Kolik stojí hotel za noc?',['90 €','19 €','900 €'],0],
['Jak se rodina připravuje na cestu?',['učí se španělsky s aplikací','čte knihy o Picassovi','nijak'],0]] }
];
