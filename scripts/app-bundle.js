define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function App(EventAggregator) {
            _classCallCheck(this, App);

            this.eventAggregator = EventAggregator;
            this.showFade = false;
            this.eventAggregator.subscribe('showFade', function (response) {
                this.showFade = response.active;
            }.bind(this));
        }

        App.prototype.hideFade = function hideFade() {
            this.eventAggregator.publish('showFade', { active: false });
        };

        return App;
    }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'aurelia-i18n', 'i18next-xhr-backend'], function (exports, _environment, _aureliaI18n, _i18nextXhrBackend) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _environment2 = _interopRequireDefault(_environment);

    var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging().feature('resources').plugin('aurelia-i18n', function (instance) {
            var aliases = ['t', 'i18n'];
            instance.i18next.use(_i18nextXhrBackend2.default);
            return instance.setup({
                backend: {
                    loadPath: './locales/{{lng}}/{{ns}}.json'
                },
                ns: ['common', 'navigation'],
                attributes: aliases,
                lng: 'de',
                fallbackLng: 'de',
                debug: false
            });
        });

        if (_environment2.default.debug) {
            aurelia.use.developmentLogging();
        }

        if (_environment2.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }

        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
});
define('navigation-service',['exports', 'data/pages', 'aurelia-framework'], function (exports, _pages, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavigationService = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var NavigationService = exports.NavigationService = function () {
        function NavigationService() {
            _classCallCheck(this, NavigationService);

            this.sections = _pages.pages;
            this.navigatePath = ['etap', 0];
            this.currentPage = this.page;
            this.currentSection = this.section;
            this.navigateToPage(this.navigatePath);
        }

        NavigationService.prototype.navigateToPage = function navigateToPage(path) {
            this.navigatePath = path;
            this.currentPage = this.page;
            this.currentSection = this.section;
        };

        NavigationService.prototype.navigateToFirstOfSection = function navigateToFirstOfSection(section) {
            this.navigateToPage([section, 0]);
        };

        _createClass(NavigationService, [{
            key: 'path',
            get: function get() {
                return this.navigatePath;
            }
        }, {
            key: 'page',
            get: function get() {
                return this.sections[this.navigatePath[0]][this.navigatePath[1]];
            }
        }, {
            key: 'section',
            get: function get() {
                return this.navigatePath[0];
            }
        }]);

        return NavigationService;
    }();
});
define('data/pages',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var pages = exports.pages = {
        etap: [{
            imageId: "Etappe 0",
            title: "Etappe 0",
            headline: "Mal kurz Uwe abholen",
            etap: "0. Etappe: Hamburg - Oldenburg",
            routeURL: 'http://bent-design.com/route/1.kml',
            text: 'Alles hat einen Anfang- so auch diese Tour. Es ist früh am Morgen, das Fahrrad ist frisch geputzt, das Gepäck wartet aufgestapelt darauf, eingepackt zu werden. Ein letztes Frühstück, alle Sachen einpacken, Geschirr spülen und los geht\'s. Es ist Samstag Morgen, die Sonne scheint und es ist nicht zu warm- ideales Radfahrwetter. Mein Weg führt mich zunächst an die <a target="_blank" href="http://de.wikipedia.org/wiki/Elbe">Elbe</a> zum Hamburger Stadtteil <a href="http://de.wikipedia.org/wiki/Neum%C3%BChlen" target="_blank">Neumühlen</a>. Von da aus geht es mit der Fähre am Rand des <a href="http://de.wikipedia.org/wiki/Hamburger_Hafen" target="_blank">Hamburger Hafens</a> vorbei nach <a href="http://de.wikipedia.org/wiki/Hamburg-Finkenwerder" target="_blank">Finkenwerder</a>. Entlang des Airbuswerks fahre ich in Richtung <a href="http://de.wikipedia.org/wiki/Buxtehude" target="_blank">Buxtehude</a>. Ich halte mich nicht lange in der mittelalterlichen Stadt auf, sondern rolle neben der Bahnlinie in Richtung Stade bis nach Neukloster. Richtung <a href="http://de.wikipedia.org/wiki/Harsefeld" target="_blank">Harsefeld</a> geht es dann von der <a href="http://de.wikipedia.org/wiki/Marsch_%28Schwemmland%29" target="_blank">Marsch</a> hoch in die <a href="http://de.wikipedia.org/wiki/Geest" target="_blank">Geest</a>- die erste merkliche Steigung, aber Nichts im Vergleich zu den Anstiegen, die noch kommen sollen. Weiter geht es über <a href="http://de.wikipedia.org/wiki/Bargstedt_%28Niedersachsen%29" target="_blank">Bargstedt</a>, <a href="http://de.wikipedia.org/wiki/Brest_%28Niedersachsen%29" target="_blank">Brest</a>, Favern, <a href="http://de.wikipedia.org/wiki/Sandbostel" target="_blank">Sandbostel</a> nach <a href="http://de.wikipedia.org/wiki/Gnarrenburg" target="_blank">Gnarrenburg</a>. Da ich diesen Weg schon oft gefahren bin, weiß ich, dass ich ich jetzt etwa die Hälfte der Strecke geschafft habe. Weiter geht es Richtung <a href="http://de.wikipedia.org/wiki/Weser" target="_blank">Weser</a> über <a href="http://de.wikipedia.org/wiki/Axstedt" target="_blank">Axstedt</a>, <a href="http://de.wikipedia.org/wiki/Wulsb%C3%BCttel" target="_blank">Wulsbüttel</a>, <a href="http://de.wikipedia.org/wiki/Uthlede" target="_blank">Uthlede</a> nach <a href="http://de.wikipedia.org/wiki/Sandstedt" target="_blank">Sandstedt</a>. Hier brauche ich nicht lange warten, bis mich die Fähre ans andere Ufer nach <a href="http://de.wikipedia.org/wiki/Brake_%28Unterweser%29" target="_blank">Brake</a> bringt. Bis auf einen kleinen Umweg in <a href="http://de.wikipedia.org/wiki/Elsfleth" target="_blank">Elsfleth</a> wegen eines Volksfestes komme ich gut voran so dass ich gegen 19 Uhr <a href="http://de.wikipedia.org/wiki/Oldenburg_%28Oldenburg%29" target="_blank">Oldenburg</a> erreiche. Quer durch die Stadt geht es in Richtung des Oldenburger Stadtteils <a href="http://de.wikipedia.org/wiki/Bloherfelde" target="_blank">Bloherfelde</a>. Hier hat Uwe einen Grillabend seiner Sportgruppe organisiert.  Auch einige Freunde von mir, die ich immer noch in Oldenburg habe, sind gekommen. Nach dem leckeren Essen geht es zu Uwe- unser Gepäck muss gewogen und gleichmäßig verteilt werden. Nachdem die letzten Dinge für die Reise geklärt sind, steige ich in meinen Schlafsack und schließe die Augen.',
            date: "Sa 12.6.: Hamburg - Buxtehude - Harsefeld - Gnarrenburg - Brake -Oldenburg",
            distance: 186.45,
            hm: 408
        }, {
            imageId: "Etappe 1",
            title: "Etappe 1",
            headline: "Auf geht's",
            etap: "1. Etappe: Oldenburg - Detmold",
            routeURL: 'http://bent-design.com/route/1.kml',
            text: 'Es ist frühmorgens am Sonntag, den 13. Juni 2010, als wir uns auf den Weg machen unsere erste gemeinsame Etappe anzugehen. Es ist kühl und dicht bewölkt, aber trocken. Das verspricht gutes Fahrradwetter zu werden. Die 160.000 Einwohner zählende Universitätsstadt <a target="_blank" href="http://de.wikipedia.org/wiki/Oldenburg_(Oldenburg)">Oldenburg</a>, die fahrradfreundliche Nordwest Metropole Niedersachsens verlassen wir standesgemäß auf der Straße fahrend, da zu dieser Zeit weit und breit kein motorisierter Verkehrsteilnehmer zu sehen ist. Vorbei geht es am Alten Landtag und dem Staatstheater in Richtung Bremer Heerstraße. Erst an der <a target="_blank" href="http://de.wikipedia.org/wiki/Cäcilienbrücke">Cäcilienbrücke</a>, einer Hubbrücke über die <a target="_blank" href="http://de.wikipedia.org/wiki/Hunte">Hunte</a>, müssen wir stoppen, da ein Binnenschiff unseren Weg kreuzt. Nach rund 8 km haben wir das Stadtgebiet hinter uns gelassen. Über Kirchhatten, Neerstedt und <a target="_blank" href="http://de.wikipedia.org/wiki/Wildeshausen">Wildeshausen</a> (der Kreisstadt des <a target="_blank" href="http://de.wikipedia.org/wiki/landkreis Oldenburg">Landkreises Oldenburg</a>) geht es weiter nach <a target="_blank" href="http://de.wikipedia.org/wiki/Goldenstedt"> Goldenstedt </a>. Dabei fahren wir durch den <a target="_blank" href="http://de.wikipedia.org/wiki/Wildeshauser_Geest">Naturpark Wildeshauser Geest</a>, einer reizvollen Kultur- u. Naturlandschaft, die seit der Erweiterung um die Delmenhorster Geest zu den größten Naturparken in Deutschland zählt. Kurz vor Goldenstedt plötzlich unsere erste Zwangspause, denn die angepriesenen gut ausgebauten und ausgeschilderten Rad- und Wanderwege durch den Naturpark Wildeshauser Geest weisen doch einige unangenehme Schäden auf.  Ein scharfkantiges Schlagloch kostet uns einen neuen Mantel und Schlauch und die dafür notwendige Reparaturzeit. Leicht abgenervt von dieser frühen Panne erreichen wir nach <a target="_blank" href="http://de.wikipedia.org/wiki/Barnstorf">Barnstorf</a> und <a target="_blank" href="http://de.wikipedia.org/wiki/Wagenfeld">Wagenfeld</a> <a target="_blank" href="http://de.wikipedia.org/wiki/Nordrhein-Westfalen">Nordrhein-Westfalen</a>. Gut eine Stunde später sind wir in <a target="_blank" href="http://de.wikipedia.org/wiki/Lübbecke">Lübbecke</a> und damit am Fuße des <a target="_blank" href="http://de.wikipedia.org/wiki/Wiehengebirge">Wiehengebirge</a>, im <a target="_blank" href="http://de.wikipedia.org/wiki/Naturpark_Nördlicher_Teutoburger_Wald-Wiehengebirge"> Naturpark Nördlicher Teutoburger Wald </a>. Das Wiehengebirge gehört zu dem bis 446 m hohen Mittelgebirgszug Teutoburger Wald in <a target="_blank" href="http://de.wikipedia.org/wiki/Niedersachsen">Niedersachsen</a> und Nordrhein-Westfalen. Rund 3 km hinter Lübbecke führt unsere Route zwischen den drei höchsten Erhebungen des Wiehengebirges, dem <a target="_blank" href="http://de.wikipedia.org/wiki/Heidbrink">Heidbrink</a> (320 m), dem <a target="_blank" href="http://de.wikipedia.org/wiki/Wurzelbrink">Wurzelbrink</a> (318 m) und dem <a target="_blank" href="http://de.wikipedia.org/wiki/Kniebrink">Kniebrink</a> (315 m) durch ein dichtes Waldgebiet durch und sorgt für die erste kleine Passhöhe von 213 m. Knapp 20 km weiter bereitet uns die Stadtdurchfahrt durch die Kreisstadt <a target="_blank" href="http://de.wikipedia.org/wiki/Herford">Herford</a> einige Probleme. Nach einigem Hin und Her schaffen wir es dann doch unseren Weg Richtung <a target="_blank" href="http://de.wikipedia.org/wiki/Detmold">Detmold</a> fortzusetzen. Nach <a target="_blank" href="http://de.wikipedia.org/wiki/Bad_Salzuflen">Bad Salzuflen</a> und <a target="_blank" href="http://de.wikipedia.org/wiki/Lage_(Lippe)">Lage (Lippe)</a> erreichen wir Detmold und damit den Naturpark <a target="_blank" href="http://de.wikipedia.org/wiki/Eggegebirge_und_südlicher_Teutoburger_Wald">Eggegebirge und südlicher Teutoburger Wald</a>. Nach kurzer Stippvisite des Stadtzentrums von Detmold machen wir uns auf die Suche nach dem Campingplatz, der weit außerhalb von Detmold liegt, wobei wir immer wieder nach dem Weg fragen müssen und uns einige Male leicht verfahren, da die nötigen Hinweisschilder fehlen. Im Ortsteil Pivitsheide finden wir dann endlich den recht kleinen Campingplatz Quellental, der immerhin einen Aufenthaltsraum aufweist, den wir für die Übernachtung nutzen, so sparen wir wenigstens den Auf- und Abbau des Zeltes. Von einem „Touralltag“ sind wir noch weit entfernt, da sich routinemäßige Abläufe erst in einigen Tagen einstellen werden. Daher fehlt uns augenblicklich das Gefühl „On Tour“ zu sein und wir können uns noch kaum vorstellen einige Wochen später mit dem Rad an der Atlantikküste in Portugal  zu stehen. Was soll´s, dies war bei früheren Touren auch nicht anders!',
            date: "So 13.6.: Oldenburg - Wildeshausen - Herford - Detmold",
            distance: 189.59,
            hm: 624
        }, {
            imageId: "Etappe 2",
            title: "Etappe 2",
            headline: "Eggegebirge - Habichtswald, die ersten Mittelgebirge",
            etap: "2. Etappe: Detmold (Pivitsheide) – Mandern (Bad Wildungen)",
            routeURL: 'http://bent-design.com/route/2.kml',
            text: 'Etwas unausgeschlafen starten wir in den Tag unserer 2. Etappe, allerdings verscheucht der Morgennebel mit seiner durchdringenden Feuchtigkeit und das kühle Wetter um 12 Grad schnell unsere Müdigkeit. Vom Detmolder Ortsteil Pivitsheide geht es am Stadtrand von Detmold entlang Richtung <a target="_blank" href="http://de.wikipedia.org/wiki/Horn-Bad_Meinberg">Horn-Bad Meinberg</a>, wobei wir uns am Rand des Naturparks Eggegebirge und südlicher Teutoburger Wald bewegen. Unser Frühstück nehmen wir in einer Fußball-WM Fieber verseuchten Bäckerei ein. Dann geht es über Horn nach <a target="_blank" href="http://de.wikipedia.org/wiki/Altenbeken">Altenbeken</a>. Da ich (Uwe) seit einigen Stunden unter Zahnschmerzen leide, suche ich in Altenbeken einen Zahnarzt auf und erlebe eine nette, freundliche Zahnarztcrew, die sogar noch ihre Mittagspause für einen Radreisenden opfert. Mit tauber Backe geht es dann weiter über <a target="_blank" href="http://de.wikipedia.org/wiki/Schwaney">Schwaney</a> und <a target="_blank" href="http://de.wikipedia.org/wiki/Neuenheerse">Neuenheerse</a> nach <a target="_blank" href="http://de.wikipedia.org/wiki/ Willebadessen"> Willebadessen</a>, quer durch den Mittelgebirgszug <a target="_blank" href="http://de.wikipedia.org/wiki/Eggegebirge">Eggegebirge</a>, vorbei an seiner höchsten Erhebung, dem <a target="_blank" href="http://de.wikipedia.org/wiki/Velmerstot">Velmerstot</a> mit seinen 468 m. Entlang dieses waldreichen Höhenzuges führt uns unsere Route nach <a target="_blank" href="http://de.wikipedia.org/wiki/Rimbeck">Rimbeck</a>. Kurze Zeit später erreichen wir 9 km hinter <a target="_blank" href="http://de.wikipedia.org/wiki/Ossendorf_(Warburg)">Ossendorf (Warburg)</a> <a target="_blank" href="http://de.wikipedia.org/wiki/Hessen">Hessen</a>. Ein paar Kilometer weiter kommen wir nach <a target="_blank" href="http://de.wikipedia.org/wiki/Volkmarsen">Volkmarsen</a> und gelangen damit an den Rand vom nordhessischen <a target="_blank" href="http://de.wikipedia.org/wiki/Naturpark_Habichtswald">Naturpark Habichtswald</a>. Der Habichtswald ist der nordöstlichste Höhenzug des <a target="_blank" href="http://de.wikipedia.org/wiki/Westhessisches_Bergland"> Westhessischen Berglandes</a> und zählt mit seinen max. 617 m Höhe ebenfalls zu den Mittelgebirgen. Bis <a target="_blank" href="http://de.wikipedia.org/wiki/Wolfhagen">Wolfhagen</a> radeln wir entlang des Naturparks, bevor wir über <a target="_blank" href="http://de.wikipedia.org/wiki/Balhorn">Balhorn</a> Richtung <a target="_blank" href="http://de.wikipedia.org/wiki/Fritzlar">Fritzlar</a> 21 km durch den Habichtswald fahren. In Fritzlar, einer Kleinstadt im <a target="_blank" href="http://de.wikipedia.org/wiki/Schwalm-Eder-Kreis">Schwalm-Eder-Kreis</a> in <a target="_blank" href="http://de.wikipedia.org/wiki/Nordhessen">Nordhessen</a> , legen wir einen kleinen Stadtrundgang ein. Der Ort gilt weithin als Dom- und Kaiserstadt, von der aus nicht nur die Christianisierung Mittel- und Norddeutschlands mit dem Fällen der <a target="_blank" href="http://de.wikipedia.org/wiki/Donareiche">Donareiche</a> im Jahre 723 durch Bonifatius ihren Ausgangspunkt hatte, sondern auch das mittelalterliche Deutsche Reich durch die Wahl Heinrich I. zum König auf dem Reichstag von 919 ihren Anfang nahm. Dementsprechend interessant zeigt sich das Stadtbild dieser frühmittelalterlichen Stadt. Interessante Fachwerkbauten sahen wir schon den ganzen Tag über, wer sich aber für diese Bauweise näher interessiert, der wird in Fritzlar auf jeden Fall fündig. Bleibt nur noch zu erwähnen, dass das satte Grün im Landschaftsbild mich (Uwe) mehrmals an Irland erinnert hat. Nach dem Stadtrundgang machen wir uns auf die Suche nach dem Campingplatz, der in der Nähe von Fritzlar sein soll. Nach einigen unnötigen Kilometern gelangen wir doch noch bei <a target="_blank" href="http://de.wikipedia.org/wiki/Mandern_(Bad_Wildungen)">Mandern (Bad Wildungen)</a> zu dem von uns gesuchten Campingplatz, der zwischen unzähligen Fischteichen liegt und für jeden Camper genügend Mücken bereithält.',
            date: "Mo 14.6.: Detmold (Pivitsheide) - Rimbeck -  Fritzlar - Mandern (Bad Wildungen)",
            distance: 146.44,
            hm: 1181
        }],
        prolog: [{
            imageId: "Prolog",
            title: "Prolog",
            headline: "Wie alles begann",
            text: 'Unsere Eurotour 2010 ist aus der Not geboren. Wir wollten eigentlich von Oldenburg (Uwe), bzw. von Hamburg (Carsten) `One Way´ nach Peking radeln und dafür mindestens vier Monate Zeit aufwenden. Leider schränkten uns unsere privaten und beruflichen Verpflichtungen so sehr ein, dass die Reise nicht länger als zwei Monate dauern durfte. Nun liegt für uns der Reiz einer Radreise darin, mit ihr möglichst an der eigenen Haustür zu beginnen. So musste eine auf zwei Monate begrenzte Alternative her.<br> Erfahrungen mit Radreisen haben wir beide schon seit längerem. So unternahm Uwe bereits im Jahr 1984 eine gut 6.500 km lange Tour, in dem er alleine von Oldenburg nach Portugal und retour fuhr, was er noch einige Male teils in Begleitung wiederholte. Carstens erste mehrtägige Radtour begann im Sommer 1993, als wir zum ersten Mal gemeinsam unterwegs waren. Vorgesehen war ein einmonatiger Portugalurlaub mit jeweils 14tägiger Hin- und Rückreise per Rad. Angekommen in unserem Zielort Caminha, in Nordportugal am Atlantik liegend, kam uns nach ein paar Tagen die Idee, die uns noch zur Verfügung stehende Zeit für eine verlängerte Rückreise zu nutzen. Ein Blick auf eine Landkarte im Kiosk neben Uwes Lieblingskaffee in Caminha zeigte, dass wir es zurück nach Oldenburg über Basel, Linz, Wien, Budapest, Lwow (Lemberg), Warschau, Kaliningrad und Danzig schaffen könnten. Auf diesem Wege führte uns dieser kleine ungeplante Umweg noch durch die Schweiz, Süddeutschland, Österreich, Ungarn, Slowakei, Ukraine und Polen. Als wir in Oldenburg ankamen, waren wir knapp über 9.000 km in 60 Tagen gefahren. Kurz vorher hatten wir während unserer Stippvisite in Verden (Aller), Uwes Geburtsort, einen Zirkel in einen alten Schulatlas gehauen, um mal zu sehen was 9.000 km Luftlinie von Oldenburg entfernt liegt (ungenaue Methode). Der vom Zirkel gezogene Strich lag auf Peking, so profan ergeben sich plötzlich Reiseziele (www.luftlinie.org kommt nur auf 7.604 km).<br> Seitdem machten wir beide immer wieder Urlaub mit dem Rad, doch die Umstände ermöglichten uns erst jetzt wieder eine lange Radtour gemeinsam zu unternehmen. Vor knapp zwei Jahren starteten wir die Planung der Tour `Oldenburg – Peking´. Als vor einem halben Jahr absehbar wurde, dass Carsten aus beruflichen Gründen nicht mehr als zwei Monate zur Verfügung hat, musste umdisponiert werden.<br><br> Für eine grobe Routenplanung galt es daher neue Eckpunkte zu formulieren:<br> Klar das es nach Nordportugal gehen sollte und dass ein Galão, das ist eine Mischung aus Espresso und Milch, der wie italienischer Latte macchiato üblicherweise in einem Glas serviert wird, in Uwes Stammkaffee in Caminha dazu gehört. Vor einigen Jahren nahm sich Uwe vor den Pico de Veleta (3.400 m) per Rad zu bezwingen, kam aber nicht dazu. Wenn wir schon in Granada sein werden, bietet sich uns auf dem Weg in die Região-Norte an, den höchsten Berg des portugiesischen Festlandes mitzunehmen, den Torre (1.993 m). Bei all unseren Pyrenäen-Überquerungen ging es noch nie per Rad über Andorra, auch in Tschechien sind wir beide noch nie gewesen, so wurde beides in die Route mit aufgenommen. Das würde uns dann auch nach Österreich und Italien führen, zumal die Alpen auf Carstens Wunschzettel standen. Die Dolomiten wurden erst einmal mir einem Fragezeichen versehen. Das Skagerrak musste den französischen Alpen weichen, da der Reiz des Hochgebirges für uns einfach größer ist. Der Wunsch nach einem entspannten Ausrollen fügten dann dem Ganzen Belgien und die Niederlande hinzu. Fertig war die Eurotour 2010.'
        }, {
            imageId: "Start",
            title: "Start",
            headline: "Vorbereitungen",
            text: 'Nachdem wir die ursprüngliche Idee nach Peking zu radeln ad acta legen mussten, blieb uns für eine Alternative ein halbes Jahr Zeit an Vorbereitung. So begannen wir in der Zeit des Jahreswechsels mit der Grobplanung.<br> Es sollte wieder vor der eigenen Haustür losgehen. Statt `One way´ entschieden wir uns für einen Rundkurs. Damit stand fest, wir würden in Europa bleiben. Wir hätten auch um die Ostsee touren können, doch wir entschieden uns für einen Mix aus Revival unserer Tour von 1993 mit dem, was wir in einigen Regionen haben liegenlassen und mit der Aufnahme von etwas Neuem. Nachdem wir die geografischen Eckpunkte für unsere Tour gefunden und die dazwischen liegenden Lücken grob ausgefüllt hatten, setzte die Arbeitsteilung ein. Da Carsten eine Internetseite von dieser Tour im Auge hatte (Aua !) und in Hamburg als Frontend-Entwickler arbeitet, stand fest, wer da an der Internetseite rumbasteln wird.<br> Außerdem ist Carsten von uns beiden der „Fahrradmechaniker“, daher übernahm er die Korrespondenz mit einem Liegeradhersteller, da wir uns auf das Liegerad als Fahrradtyp geeinigt hatten und Uwe noch kein Liegerad besaß. Während Carsten sich um die technischen Details in puncto Liegerad und Grundgerüst der Internetseite kümmerte, bastelte Uwe an der Route, die dieses mal en Detail ausgearbeitet und mit allen wissenswerten Informationen über die zu durchfahrenden Orte und Regionen versehen werden sollte. <br> Drei Monate vergingen, dann stand nicht nur die Route Dank der im Internet auffindbarer Routenplaner, Touristikinformationsquellen und Berg- und Passfahrten Archive fest, sondern auch ein erstes Grobgerüst für die Internetseite war fertig. <br> Nach ständigem Austausch über Telefon und Internet kam es während der Ostertage in Hamburg zu einer folgenschweren Begegnung: „Uwe meets Liegerad!“ Erstmalig auf dem Liegerad, einem sog. High Racer, kippte Uwe einige Male stumpf um, aber schon nach einer halben Stunde ging es noch etwas wackelig auf eine kleine `sightseeing tour´ quer durch Hamburg.<br> In der Folgezeit wurden die Liegeräder für die Tour leicht modifiziert, die Ausrüstung teils erneuert und ergänzt, die Internetseite verfeinert und die ersten kleineren und größeren Trainingstouren absolviert. Nach einem Monat hatte Uwe knapp 2.500 Trainingskilometer in den Beinen, dann traf man sich in Goslar, um im Harz gezielt einige Höhenmeter zu sammeln. Auch weiterhin sorgte ständiger Kontakt via Internet und Telefon für den notwendigen Austausch. Dank einiger Freunde ließen sich einige Dinge auch in Abwesenheit aufrechterhalten, so dass wir dem Start am 13. Juni beruhigt entgegensehen konnten. Dann wurde noch ein Live-Ticker auf der Internetseite eingerichtet, um Freunden und Bekannte die Möglichkeit zu geben, unseren jeweiligen Aufenthaltsort von zu Hause aus verfolgen zu können.'
        }],
        article: [{
            title: "Start",
            headline: "Vorbereitungen",
            text: 'Nachdem wir die ursprüngliche Idee nach Peking zu radeln ad acta legen mussten, blieb uns für eine Alternative ein halbes Jahr Zeit an Vorbereitung. So begannen wir in der Zeit des Jahreswechsels mit der Grobplanung.<br> Es sollte wieder vor der eigenen Haustür losgehen. Statt `One way´ entschieden wir uns für einen Rundkurs. Damit stand fest, wir würden in Europa bleiben. Wir hätten auch um die Ostsee touren können, doch wir entschieden uns für einen Mix aus Revival unserer Tour von 1993 mit dem, was wir in einigen Regionen haben liegenlassen und mit der Aufnahme von etwas Neuem. Nachdem wir die geografischen Eckpunkte für unsere Tour gefunden und die dazwischen liegenden Lücken grob ausgefüllt hatten, setzte die Arbeitsteilung ein. Da Carsten eine Internetseite von dieser Tour im Auge hatte (Aua !) und in Hamburg als Frontend-Entwickler arbeitet, stand fest, wer da an der Internetseite rumbasteln wird.<br> Außerdem ist Carsten von uns beiden der „Fahrradmechaniker“, daher übernahm er die Korrespondenz mit einem Liegeradhersteller, da wir uns auf das Liegerad als Fahrradtyp geeinigt hatten und Uwe noch kein Liegerad besaß. Während Carsten sich um die technischen Details in puncto Liegerad und Grundgerüst der Internetseite kümmerte, bastelte Uwe an der Route, die dieses mal en Detail ausgearbeitet und mit allen wissenswerten Informationen über die zu durchfahrenden Orte und Regionen versehen werden sollte. <br> Drei Monate vergingen, dann stand nicht nur die Route Dank der im Internet auffindbarer Routenplaner, Touristikinformationsquellen und Berg- und Passfahrten Archive fest, sondern auch ein erstes Grobgerüst für die Internetseite war fertig. <br> Nach ständigem Austausch über Telefon und Internet kam es während der Ostertage in Hamburg zu einer folgenschweren Begegnung: „Uwe meets Liegerad!“ Erstmalig auf dem Liegerad, einem sog. High Racer, kippte Uwe einige Male stumpf um, aber schon nach einer halben Stunde ging es noch etwas wackelig auf eine kleine `sightseeing tour´ quer durch Hamburg.<br> In der Folgezeit wurden die Liegeräder für die Tour leicht modifiziert, die Ausrüstung teils erneuert und ergänzt, die Internetseite verfeinert und die ersten kleineren und größeren Trainingstouren absolviert. Nach einem Monat hatte Uwe knapp 2.500 Trainingskilometer in den Beinen, dann traf man sich in Goslar, um im Harz gezielt einige Höhenmeter zu sammeln. Auch weiterhin sorgte ständiger Kontakt via Internet und Telefon für den notwendigen Austausch. Dank einiger Freunde ließen sich einige Dinge auch in Abwesenheit aufrechterhalten, so dass wir dem Start am 13. Juni beruhigt entgegensehen konnten. Dann wurde noch ein Live-Ticker auf der Internetseite eingerichtet, um Freunden und Bekannte die Möglichkeit zu geben, unseren jeweiligen Aufenthaltsort von zu Hause aus verfolgen zu können.'
        }]
    };
});
define('header/header',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Header = exports.Header = function Header() {
    _classCallCheck(this, Header);
  };
});
define('navigation/navigation',['exports', 'aurelia-framework', 'navigation-service', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _navigationService, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.KeysValueConverter = exports.Navigation = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    var _dec, _dec2, _class, _desc, _value, _class2;

    var Navigation = exports.Navigation = (_dec = (0, _aureliaFramework.inject)(_navigationService.NavigationService, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.computedFrom)('navigationActive'), _dec(_class = (_class2 = function () {
        function Navigation(navigationService, EventAggregator) {
            _classCallCheck(this, Navigation);

            this.navigationService = navigationService;
            this.eventAggregator = EventAggregator;
            this.sections = this.navigationService.sections;
            this.navigationActive = false;
            this.eventAggregator.subscribe('showFade', function (response) {
                if (!response.active) {
                    this.navigationActive = response.active;
                }
            }.bind(this));
        }

        Navigation.prototype.hide = function hide() {
            this.navigationActive = false;
            this.eventAggregator.publish('showFade', { active: this.navigationActive });
        };

        Navigation.prototype.show = function show() {
            this.navigationActive = true;
            this.eventAggregator.publish('showFade', { active: this.navigationActive });
        };

        Navigation.prototype.toggleNavigation = function toggleNavigation() {
            this.navigationActive ? this.hide() : this.show();
        };

        _createClass(Navigation, [{
            key: 'currentSection',
            get: function get() {
                return this.navigationService.section;
            }
        }, {
            key: 'navigationVisible',
            get: function get() {
                return this.navigationActive;
            }
        }]);

        return Navigation;
    }(), (_applyDecoratedDescriptor(_class2.prototype, 'navigationVisible', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'navigationVisible'), _class2.prototype)), _class2)) || _class);

    var KeysValueConverter = exports.KeysValueConverter = function () {
        function KeysValueConverter() {
            _classCallCheck(this, KeysValueConverter);
        }

        KeysValueConverter.prototype.toView = function toView(obj) {
            return Reflect.ownKeys(obj);
        };

        return KeysValueConverter;
    }();
});
define('page/page',['exports', 'aurelia-framework', 'navigation-service'], function (exports, _aureliaFramework, _navigationService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Page = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _dec, _class;

    var Page = exports.Page = (_dec = (0, _aureliaFramework.inject)(_navigationService.NavigationService), _dec(_class = function () {
        function Page(navigationService) {
            _classCallCheck(this, Page);

            this.navigationService = navigationService;
            this.currentPage = this.navigationService.currentPage;
        }

        Page.prototype.getCurrentPage = function getCurrentPage() {
            return this.navigationService.currentPage;
        };

        _createClass(Page, [{
            key: 'legacyPage',
            get: function get() {
                return this.navigationService.currentPage;
            }
        }]);

        return Page;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('navigation/section/default',['exports', 'aurelia-framework', 'navigation-service', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _navigationService, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Default = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var Default = exports.Default = (_dec = (0, _aureliaFramework.inject)(_navigationService.NavigationService, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function Default(navigationService, EventAggregator) {
            _classCallCheck(this, Default);

            _initDefineProp(this, 'section', _descriptor, this);

            _initDefineProp(this, 'sectionId', _descriptor2, this);

            this.navigationService = navigationService;
            this.eventAggregator = EventAggregator;
            this.navigationActive = false;
            this.eventAggregator.subscribe('showFade', function (response) {
                if (!response.active) {
                    this.navigationActive = response.active;
                }
            }.bind(this));
        }

        Default.prototype.navigateTo = function navigateTo(navigatePath) {
            this.navigationService.navigateToPage(navigatePath);
            this.eventAggregator.publish('showFade', { active: false });
        };

        _createClass(Default, [{
            key: 'currentItem',
            get: function get() {
                return this.navigationService.page;
            }
        }]);

        return Default;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'section', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'sectionId', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./app.css\"></require><require from=\"./page/page\"></require><require from=\"header/header\"></require><div class=\"all\"><header></header><page></page></div><div click.trigger=\"hideFade()\" class.bind=\"showFade ? 'fade' : ''\"></div></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "html {\n  font-size: 10px;\n  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n  height: 100%; }\n\nbody {\n  background: linear-gradient(0deg, #9c9, #9cf);\n  font-size: 12px;\n  height: 100%;\n  margin: 1.2rem; }\n\n.fade {\n  z-index: 999;\n  background: rgba(0, 0, 0, 0.3);\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n"; });
define('text!header/header.html', ['module'], function(module) { module.exports = "<template><require from=\"./header.css\"></require><require from=\"navigation/navigation\"></require><div class=\"header\"><navigation></navigation><h1 class=\"title\">Eurotour 2010</h1><div class=\"step\"><div class=\"back\">-</div><div class=\"forward\">+</div></div></div></template>"; });
define('text!navigation/navigation.html', ['module'], function(module) { module.exports = "<template><require from=\"./navigation.css\"></require><require from=\"./section/default\"></require><nav><div click.delegate=\"toggleNavigation()\">NAV</div><div class.bind=\"navigationVisible ? 'active navigation' : 'navigation'\"><div repeat.for=\"section of sections  | keys\" class=\"section ${section == currentSection?'active':''}\"><h1>${'navigation:' + section | t}</h1><default section-id.bind=\"section\" section.bind=\"sections[section]\" navigateto.bind=\"navigateTo\"></default></div></div></nav></template>"; });
define('text!header/header.css', ['module'], function(module) { module.exports = ".header {\n  background: rgba(255, 255, 255, 0.4);\n  line-height: 3rem;\n  border-radius: 21px;\n  margin: 6px;\n  padding: 6px 12px;\n  display: flex;\n  justify-content: space-between; }\n  .header .title {\n    margin: 0; }\n  .header .back, .header .forward {\n    display: inline-block;\n    width: 3rem;\n    height: 3rem; }\n"; });
define('text!page/page.html', ['module'], function(module) { module.exports = "<template><require from=\"./page.css\"></require><div class=\"page\"><h2>${navigationService.currentPage.etap}</h2><h1>${navigationService.currentPage.headline}</h1><p innerhtml=\"${navigationService.currentPage.text | sanitizeHTML}\"></p><div>${navigationService.currentPage.date}</div><div><span>${'common:distance' | t:{distance: navigationService.currentPage.distance}}</span> <span>${'common:height_meter' | t:{hm: navigationService.currentPage.hm}}</span></div></div></template>"; });
define('text!navigation/navigation.css', ['module'], function(module) { module.exports = "nav {\n  position: relative;\n  z-index: 1000; }\n\n.navigation {\n  box-shadow: 0 0 1px #999 inset;\n  padding: 12px;\n  color: #000;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: .6rem;\n  display: none;\n  position: absolute;\n  top: 100%;\n  z-index: 9999;\n  justify-content: space-between; }\n  .navigation.active {\n    display: flex; }\n  .navigation .section {\n    margin: 1.2rem; }\n    .navigation .section h1 {\n      margin: 0 0 .6rem; }\n  .navigation .item {\n    cursor: pointer;\n    font-weight: bold; }\n    .navigation .item.active {\n      color: red; }\n"; });
define('text!page/page.css', ['module'], function(module) { module.exports = ".page {\n  padding: 12px;\n  display: inline-block;\n  background: rgba(255, 255, 255, 0.6);\n  border-radius: .6rem; }\n  .page h1 {\n    font-size: 1.6rem; }\n  .page h2 {\n    font-size: 1.2rem; }\n"; });
define('text!navigation/section/default.html', ['module'], function(module) { module.exports = "<template><div class=\"items\"><div repeat.for=\"item of section\" click.trigger=\"navigateTo([sectionId, $index])\" class=\"item ${currentItem == item?'active':''}\">${item.title}</div></div></template>"; });
define('text!navigation/section/default.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map