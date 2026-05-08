export const objects = [
  // WCAG tab order: górny-lewy → górny-prawy → środek (lewy, centrum, prawy, dolny-lewy) → dół
  {
    id: 'kamien',
    file: '/models/kamien-opt.glb',
    name: 'Kamień Polny',
    shortDesc: 'Gładki kamień polny',
    description:
      'Gładki, wyoblony przez wodę kamień. Minimalistyczny element dekoracyjny o surowym charakterze.',
    position: [-5.0, 1.75, 0],
    mobilePosition: [-1.1, 2.1, 0],
    scale: 1.2,
    rotation: [0, 0, 0],
    rotationSpeed: 0.15,
  },
  {
    id: 'perly',
    file: '/models/perly-opt.glb',
    name: 'Perły',
    shortDesc: 'Naszyjnik z pereł',
    description:
      'Gładkie, błyszczące perły. Obiekt ten wymaga odpowiedniego oświetlenia, by ukazać swój naturalny blask.',
    position: [3.3, 1.75, 0],
    mobilePosition: [1.1, 2.1, 0],
    scale: 1.2,
    rotation: [0, 0.4, 0],
    rotationSpeed: 0.35,
  },
  {
    id: 'muszelka',
    file: '/models/muszelka-opt.glb',
    name: 'Muszla Morska',
    shortDesc: 'Spiralna muszla',
    description:
      `Muszla morska to jeden z najbardziej niezwykłych tworów natury — geometryczny cud, który powstaje bez żadnego planu, bez architekta, wyłącznie w rytm biologicznych praw wzrostu. Ta konkretna muszla, spiralna i precyzyjnie wymodelowana, należy do grupy mięczaków, których skorupa rośnie według zasady złotego podziału: każdy nowy zakręt spirali jest dokładnie tyle razy większy od poprzedniego, co stała liczba φ (fi) — około 1,618. Tę samą proporcję odnajdziemy w kwiatostanie słonecznika, w układzie nasion szyszki, w spirali galaktyk. Natura powtarza swoje ulubione rozwiązania.

Muszle pełniły przez tysiąclecia rolę dalece wykraczającą poza schronienie dla mięczaka. W kulturach prehistorycznych służyły jako pierwotne narzędzia — łyżki, skrobaczki, ozdoby ciała. Badacze odkryli muszle perforowane nitką włókna roślinnego liczące ponad 100 000 lat: to najstarsze znane nam koraliki. Człowiek zdobiił się muszlami zanim nauczył się lepić garnki czy polerować kamień. Były walutą — kauri przez setki lat obiegało jako pieniądz w Afryce subsaharyjskiej, Azji Południowej i Oceanii. Były instrumentami — koncha, wielka muszla trąbkowa, rozbrzmiewała w rytuałach majańskich, azteckich i hinduistycznych. W tradycji buddyjskiej i hinduskiej dźwięk konchy oznajmia świt, zwołuje wiernych, towarzyszy pogrzebowi.

To, co widzimy w tej rzeźbie, to nie tylko ślimak — to zapis czasu. Każda warstwa muszli odpowiada dokładnie jednemu dniowi życia mięczaka. Podobnie jak słoje drzewa opowiadają o suszy i urodzajnych latach, tak przekrój muszli czyta się jak pamiętnik: tu ciepłe lato, tam chłodna zima, tu obfitość pokarmu, tam okresy głodu. Paleontolodzy potrafią na tej podstawie odtworzyć klimat sprzed milionów lat z tygodniową dokładnością. Muszla jest więc archiwum — twardym dyskiem zapisanym wapniem i białkiem.

W aranżacjach wnętrz muszla morska przynosi to, czego nie da żaden projektowany przedmiot: organiczność. Jej faktura jest jednocześnie szorstka i gładka, matowa i błyszcząca — zależy od kąta światła i odległości obserwatora. Połysk masy perłowej (mieszaniny kryształków aragonitu ułożonych jak dachówki) zmienia się z niemal metalicznego w miękkie złoto, gdy pada na nią ciepłe wieczorne słońce. Dlatego muszle sprawdzają się zarówno w nowoczesnym minimalistycznym wnętrzu, gdzie są jedynym organicznym akcentem na tle betonu i szkła, jak i w stylistyce boho czy natural, gdzie współgrają z rattanem, lnem i drewnem.

Pamiętaj: każda muszla, która trafiła na Twój stół lub półkę, jest unikatowa. Nie istnieją dwie identyczne — nawet u tego samego gatunku wzór jest zawsze odrobinę inny, spirala nieco szersza lub ciaśniejsza, barwa przesunięta w stronę różu lub ochry. Masz przed sobą obiekt stworzony przez żywą istotę w niepowtarzalnym momencie jej życia. To czyni ją czymś więcej niż dekoracją — czyni ją reliktem.`,
    position: [-3.4, 0.2, 0],
    mobilePosition: [-1.1, 0.7, 0],
    scale: 1.2,
    rotation: [-0.2, 0.8, 0],
    rotationSpeed: 0.25,
  },
  {
    id: 'grzybki',
    file: '/models/grzybki-opt.glb',
    name: 'Małe Grzybki',
    shortDesc: 'Kolonia drobnych grzybów',
    description:
      'Drobne grzyby rosnące w skupisku. Delikatne tekstury przypominają naturalne środowisko wilgotnego lasu.',
    position: [-0.1, 0.45, 0],
    mobilePosition: [1.1, 0.7, 0],
    scale: 1.2,
    rotation: [0, -0.5, 0],
    rotationSpeed: 0.3,
  },
  {
    id: 'huba',
    file: '/models/huba-opt.glb',
    name: 'Huba Drzewna',
    shortDesc: 'Huba porastająca kory',
    description:
      'Huba drzewna o twardej, porowatej strukturze. Doskonały przykład naturalnego pasożyta drzewnego w formie dekoracyjnej.',
    position: [3.5, -0.6, 0],
    mobilePosition: [-1.1, -0.7, 0],
    scale: 1.2,
    rotation: [0.2, 1.2, 0],
    rotationSpeed: 0.18,
  },
  {
    id: 'liscie',
    file: '/models/liscie-opt.glb',
    name: 'Jesienne Liście',
    shortDesc: 'Kompozycja zwiędłych liści',
    description:
      'Skupisko opadłych liści, oddające dynamikę i kruchość jesiennej natury.',
    position: [-2.4, -1.4, 0],
    mobilePosition: [1.1, -0.7, 0],
    scale: 1.2,
    rotation: [0.5, 0.1, 0.3],
    rotationSpeed: 0.2,
  },
  {
    id: 'grzyby',
    file: '/models/grzyby-opt.glb',
    name: 'Grzyby Leśne',
    shortDesc: 'Kompozycja grzybów leśnych',
    description:
      'Piękna kompozycja leśnych grzybów. Zwróć uwagę na detale kapeluszy i organiczną strukturę trzonu. Idealnie wpasuje się w naturalne wnętrza.',
    position: [-5.5, -2.1, 0],
    mobilePosition: [-1.1, -2.1, 0],
    scale: 1.2,
    rotation: [0, 0.2, 0],
    rotationSpeed: 0.22,
  },
  {
    id: 'ukwial',
    file: '/models/ukwial-opt.glb',
    name: 'Ukwiał Morski',
    shortDesc: 'Koralowiec rafowy',
    description:
      'Złożona struktura ukwiału morskiego. Wyjątkowo skomplikowana geometria dająca piękny efekt wizualny.',
    position: [5.2, -1.9, 0],
    mobilePosition: [1.1, -2.1, 0],
    scale: 1.2,
    rotation: [0, -0.2, 0],
    rotationSpeed: 0.2,
  },
]
