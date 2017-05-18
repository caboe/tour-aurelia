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
define('image-service',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-http-client'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ImageService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ImageService = exports.ImageService = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function ImageService(eventAggregator) {
      _classCallCheck(this, ImageService);

      this.eventAggregator = eventAggregator;
      this.currentStage = [];
      this.currentNr = 0;
      this.collection = [];
      this.loadCollections();
    }

    ImageService.prototype.loadCollections = function loadCollections() {
      var _this = this;

      this.eventAggregator.publish('imageCollection', { state: 'load' });
      var client = new _aureliaHttpClient.HttpClient();

      client.jsonp('https://api.flickr.com/services/rest/?method=flickr.collections.getTree&user_id=24537538@N04&api_key=531e7a0d62fe823d91b9ebcfca750195&collection_id=72157624746422138&format=json').then(function (data) {
        _this.collection = data.response.collections.collection[0].set;
        _this.refreshCurrentCollection();
        _this.eventAggregator.publish('imageCollection', { state: 'finished' });
      });
    };

    ImageService.prototype.loadCurrentStage = function loadCurrentStage() {
      this.loadStage(this.currentNr);
    };

    ImageService.prototype.loadStage = function loadStage(nr) {
      if (!this.collection.length) {
        return;
      }

      var setId = this.getIdForStage(nr);
      this.loadStageForId(setId);
    };

    ImageService.prototype.loadStageForId = function loadStageForId(id) {
      var _this2 = this;

      this.eventAggregator.publish('imageStage', { state: 'load' });
      var client = new _aureliaHttpClient.HttpClient();
      var escapeId = encodeURIComponent(id);
      client.jsonp('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=' + escapeId + '&api_key=531e7a0d62fe823d91b9ebcfca750195&format=json&json').then(function (data) {
        _this2.currentStage = data.response.photoset.photo;
        _this2.eventAggregator.publish('imageStage', { state: 'finished' });
        _this2.loadImagesDescriptions();
      });
    };

    ImageService.prototype.loadImagesDescriptions = function loadImagesDescriptions() {
      for (var _iterator = this.currentStage, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var image = _ref;

        loadImageForId(image.id);
      }

      function loadImageForId(id) {
        var client = new _aureliaHttpClient.HttpClient();
        client.jsonp('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&photo_id=' + id + '&api_key=531e7a0d62fe823d91b9ebcfca750195&format=json&jsoncallback=tour.images.addInfo').then(function (data) {
          console.log(data.response.photo);
        });
      }
    };

    ImageService.prototype.getIdForStage = function getIdForStage(nr) {
      return this.collection[nr].id;
    };

    ImageService.prototype.refreshCurrentCollection = function refreshCurrentCollection() {
      this.setCurrentCollection(this.currentNr);
      console.log(this.currentStage);
    };

    ImageService.prototype.setCurrentCollection = function setCurrentCollection(nr) {
      this.currentNr = nr;
      this.loadCurrentStage();
    };

    ImageService.prototype.loadImagesForStageId = function loadImagesForStageId(id) {
      for (var _iterator2 = this.collection, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var stage = _ref2;

        if (stage.title === id) {
          this.loadStageForId(stage.id);
        }
      }
    };

    return ImageService;
  }()) || _class);
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

        NavigationService.prototype.getSectionForPath = function getSectionForPath(section) {
            return this.sections[section];
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
        }],
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
define('slideshow/slideshow',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'image-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _imageService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Slideshow = undefined;

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

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var Slideshow = exports.Slideshow = (_dec = (0, _aureliaFramework.inject)(_imageService.ImageService, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
    function Slideshow(imageService, eventAggregator) {
      var _this = this;

      _classCallCheck(this, Slideshow);

      _initDefineProp(this, 'stageId', _descriptor, this);

      this.eventAggregator = eventAggregator;
      this.imageService = imageService;
      this.collection;
      this.imageService.setCurrentCollection(0);
      this.loading = true;
      this.current = 0;
      this.slidePosition = 0;
      this.tick;
      this.transition = true;
      this.eventAggregator.subscribe('imageCollection', function (_ref) {
        var state = _ref.state;
        if (state === 'finished') _this.imageService.loadImagesForStageId(_this.stageId);
      });
      this.eventAggregator.subscribe('imageStage', function (_ref2) {
        var state = _ref2.state;
        if (state === 'finished') _this.initSlideshow();
      });
    }

    Slideshow.prototype.initSlideshow = function initSlideshow() {
      this.collection = this.imageService.currentStage;
      this.collection.push(this.imageService.currentStage[0]);
      this.start();
      this.loading = false;
    };

    Slideshow.prototype.start = function start() {
      var _this2 = this;

      window.clearInterval(this.tick);
      this.tick = window.setInterval(function () {
        _this2.next();
      }, 3000);
    };

    Slideshow.prototype.directStart = function directStart() {
      this.next();
      this.start();
    };

    Slideshow.prototype.stop = function stop() {
      window.clearInterval(this.tick);
    };

    Slideshow.prototype.next = function next() {
      if (this.current == this.collection.length - 1) {
        this.jumpToStart();
      }
      this.current++;
    };

    Slideshow.prototype.jumpToStart = function jumpToStart() {
      this.current = 0;
    };

    Slideshow.prototype.jumpToEnd = function jumpToEnd() {
      this.transition = false;
      this.current = this.collection.length - 1;
    };

    Slideshow.prototype.previous = function previous() {
      if (this.current == 0) {
        this.jumpToEnd();
        this.transition = true;
      } else {
        this.current--;
      }
    };

    return Slideshow;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'stageId', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var Default = exports.Default = (_dec = (0, _aureliaFramework.inject)(_navigationService.NavigationService, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function Default(navigationService, EventAggregator) {
            _classCallCheck(this, Default);

            _initDefineProp(this, 'sectionId', _descriptor, this);

            this.navigationActive = false;
            this.navigationService = navigationService;
            this.eventAggregator = EventAggregator;
            this.eventAggregator.subscribe('showFade', function (response) {
                if (!response.active) {
                    this.navigationActive = false;
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
        }, {
            key: 'section',
            get: function get() {
                return this.navigationService.getSectionForPath(this.sectionId);
            }
        }]);

        return Default;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'sectionId', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('navigation/section/stageRenderer',['exports', 'aurelia-framework', 'navigation-service', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _navigationService, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StageRenderer = undefined;

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

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var StageRenderer = exports.StageRenderer = (_dec = (0, _aureliaFramework.inject)(_navigationService.NavigationService, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function StageRenderer(navigationService, EventAggregator) {
            _classCallCheck(this, StageRenderer);

            _initDefineProp(this, 'sectionId', _descriptor, this);

            this.navigationActive = false;
            this.navigationService = navigationService;
            this.eventAggregator = EventAggregator;
            this.eventAggregator.subscribe('showFade', function (response) {
                if (!response.active) {
                    this.navigationActive = false;
                }
            }.bind(this));
        }

        StageRenderer.prototype.navigateTo = function navigateTo(navigatePath) {
            this.navigationService.navigateToPage(navigatePath);
            this.eventAggregator.publish('showFade', { active: false });
        };

        _createClass(StageRenderer, [{
            key: 'currentItem',
            get: function get() {
                return this.navigationService.page;
            }
        }, {
            key: 'section',
            get: function get() {
                return this.navigationService.getSectionForPath(this.sectionId);
            }
        }]);

        return StageRenderer;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'sectionId', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('page/prolog/prolog',['exports', 'aurelia-framework', 'navigation-service'], function (exports, _aureliaFramework, _navigationService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Prolog = undefined;

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

    var Prolog = exports.Prolog = (_dec = (0, _aureliaFramework.inject)(_navigationService.NavigationService), _dec(_class = function () {
        function Prolog(navigationService) {
            _classCallCheck(this, Prolog);

            this.navigationService = navigationService;
            this.currentPage = this.navigationService.currentPage;
        }

        Prolog.prototype.getCurrentPage = function getCurrentPage() {
            return this.navigationService.currentPage;
        };

        _createClass(Prolog, [{
            key: 'legacyPage',
            get: function get() {
                return this.navigationService.currentPage;
            }
        }]);

        return Prolog;
    }()) || _class);
});
define('page/stage/stage',['exports', 'aurelia-framework', 'navigation-service'], function (exports, _aureliaFramework, _navigationService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Stage = undefined;

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

    var Stage = exports.Stage = (_dec = (0, _aureliaFramework.inject)(_navigationService.NavigationService), _dec(_class = function () {
        function Stage(navigationService) {
            _classCallCheck(this, Stage);

            this.navigationService = navigationService;
            this.currentPage = this.navigationService.currentPage;
        }

        Stage.prototype.getCurrentPage = function getCurrentPage() {
            return this.navigationService.currentPage;
        };

        _createClass(Stage, [{
            key: 'legacyPage',
            get: function get() {
                return this.navigationService.currentPage;
            }
        }]);

        return Stage;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./app.css\"></require><require from=\"./page/page\"></require><require from=\"header/header\"></require><div class=\"all\"><header></header><page></page></div><div click.trigger=\"hideFade()\" class.bind=\"showFade ? 'fade' : ''\"></div></template>"; });
define('text!header/header.html', ['module'], function(module) { module.exports = "<template><require from=\"./header.css\"></require><require from=\"navigation/navigation\"></require><div class=\"header\"><navigation class=\"hamburger\"></navigation><h1 class=\"title\">Eurotour 2010</h1><div class=\"step\"><div class=\"back\">-</div><div class=\"forward\">+</div></div></div></template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "@font-face {\n  font-family: \"Genericons-Neue\";\n  src: url(\"fonts/Genericons-Neue.eot?3d5e5abe2b62a2e8105ddf2de82c02cd\");\n  font-weight: normal;\n  font-style: normal; }\n\n@font-face {\n  font-family: \"Genericons-Neue\";\n  src: url(\"fonts/Genericons-Neue.eot?3d5e5abe2b62a2e8105ddf2de82c02cd\");\n  src: url(\"fonts/Genericons-Neue.eot?#iefix\") format(\"embedded-opentype\"), url(\"data:application/x-font-woff;charset=utf-8;base64,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\") format(\"woff\"), url(\"fonts/Genericons-Neue.ttf?3d5e5abe2b62a2e8105ddf2de82c02cd\") format(\"truetype\");\n  font-weight: normal;\n  font-style: normal; }\n\nhtml {\n  font-size: 10px;\n  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n  height: 100%;\n  background: linear-gradient(rgba(155, 155, 155, 0.1), rgba(155, 155, 155, 0.4)), url(\"/src/images/europa_final.jpg\");\n  background-size: cover;\n  background-attachment: fixed; }\n\nbody {\n  font-size: 12px;\n  height: 100%;\n  margin: 0; }\n\n.fade {\n  z-index: 999;\n  background: rgba(0, 0, 0, 0.01);\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0; }\n\na {\n  text-decoration: none;\n  color: forestgreen; }\n"; });
define('text!navigation/navigation.html', ['module'], function(module) { module.exports = "<template><require from=\"./navigation.css\"></require><require from=\"./section/default\"></require><require from=\"./section/stageRenderer\"></require><nav><div click.delegate=\"toggleNavigation()\">NAV</div><div class.bind=\"navigationVisible ? 'active navigation' : 'navigation'\"><div repeat.for=\"section of sections  | keys\" class=\"section ${section == currentSection?'active':''}\"><h1>${'navigation:' + section | t}</h1><default if.bind=\"['article', 'prolog'].includes(section)\" section-id.bind=\"section\" section.bind=\"sections[section]\" navigateto.bind=\"navigateTo\"></default><stage-renderer if.bind=\"['etap'].includes(section)\" section-id.bind=\"section\" section.bind=\"sections[section]\" navigateto.bind=\"navigateTo\"></stage-renderer></div></div></nav></template>"; });
define('text!header/header.css', ['module'], function(module) { module.exports = ".header {\n  line-height: 3rem;\n  margin: 1rem 0 1rem;\n  padding: 1rem 2rem;\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);\n  background-image: linear-gradient(rgba(252, 252, 252, 0.9), rgba(255, 255, 255, 0.9)); }\n  .header .title {\n    margin: 0; }\n  .header .back, .header .forward, .header .hamburger {\n    display: inline-block;\n    width: 3rem;\n    height: 3rem;\n    border-radius: 50%;\n    text-align: center;\n    font-size: 28px;\n    margin-left: 1rem;\n    background-color: rgba(255, 255, 255, 0.7);\n    color: #533;\n    font-weight: bold;\n    line-height: 23px; }\n  .header .hamburger {\n    width: auto;\n    border-radius: 1.5rem;\n    font-size: 18px;\n    padding: 0 3rem;\n    line-height: 3rem; }\n"; });
define('text!navigation/navigation.css', ['module'], function(module) { module.exports = "nav {\n  position: relative;\n  z-index: 1000; }\n\n.navigation {\n  box-shadow: 0 0 1px #999 inset;\n  padding: 12px;\n  color: #000;\n  background: rgba(255, 255, 255, 0.95);\n  border-radius: .6rem;\n  display: flex;\n  visibility: hidden;\n  position: absolute;\n  top: 100%;\n  z-index: 9999;\n  justify-content: space-between;\n  opacity: 0;\n  transition: all 1s;\n  font-size: 14px;\n  text-align: left; }\n  .navigation.active {\n    visibility: visible;\n    opacity: 1; }\n  .navigation .section {\n    margin: 0 6rem 0 1.2rem;\n    padding-left: 1rem;\n    box-shadow: -2px 0 0 #000; }\n    .navigation .section h1 {\n      margin: 0 0 .6rem; }\n  .navigation .item {\n    cursor: pointer;\n    font-weight: bold; }\n    .navigation .item.active {\n      color: red; }\n"; });
define('text!page/page.html', ['module'], function(module) { module.exports = "<template><require from=\"./stage/stage\"></require><require from=\"./prolog/prolog\"></require><stage if.bind=\"['etap'].includes(navigationService.section)\"></stage><prolog if.bind=\"['article', 'prolog'].includes(navigationService.section)\"></prolog></template>"; });
define('text!page/page.css', ['module'], function(module) { module.exports = ".page {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin: 3rem 4rem;\n  position: relative; }\n  .page:after, .page:before {\n    position: absolute;\n    right: 0;\n    left: auto;\n    /* bottom: 0; */\n    /* width: 120%; */\n    width: 10px;\n    top: -50%;\n    bottom: -50%;\n    background: radial-gradient(ellipse at 140% 50%, black, rgba(255, 255, 255, 0) 40%); }\n  .page:before {\n    left: 0;\n    right: auto;\n    background: radial-gradient(ellipse at -40% 50%, black, rgba(255, 255, 255, 0) 40%); }\n  .page > .flexChild {\n    flex: 1 0 30rem;\n    align-self: flex-start;\n    margin: 0 2rem 2rem; }\n  .page .report {\n    position: relative;\n    font-size: 12px;\n    text-align: justify;\n    max-width: 480px;\n    margin: 0 auto 2rem;\n    border-radius: 3px;\n    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);\n    background-image: linear-gradient(rgba(252, 255, 255, 0.9), white);\n    padding: 2rem; }\n    .page .report:after, .page .report:before {\n      content: \"\";\n      position: absolute;\n      right: auto;\n      left: 100%;\n      /* bottom: 0; */\n      /* width: 120%; */\n      width: 10px;\n      top: -50%;\n      bottom: -50%;\n      background: radial-gradient(ellipse at -30% 50%, black, rgba(255, 255, 255, 0) 40%); }\n    .page .report:before {\n      left: auto;\n      right: 100%;\n      background: radial-gradient(ellipse at 140% 50%, black, rgba(255, 255, 255, 0) 40%); }\n    @media only screen and (min-width: 768px) {\n      .page .report {\n        font-size: 13px; } }\n    @media only screen and (min-width: 1280px) {\n      .page .report {\n        font-size: 14px; } }\n  .page .slideshowContainer {\n    flex-grow: 4;\n    flex-basis: 50vw; }\n  .page h1 {\n    font-size: 1.6rem;\n    text-align: right; }\n  .page h2 {\n    font-size: 1.2rem; }\n"; });
define('text!slideshow/slideshow.html', ['module'], function(module) { module.exports = "<template><require from=\"./slideshow.css\"></require><div class=\"slideshow\"><img class=\"squareImage\" src=\"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==\" alt=\"\"><div class=\"slideshow_content ${!transition?'jump':''}\" css=\"left: -${current * 100}%\"><div if.bind=\"loading\">Loading</div><div repeat.for=\"params of imageService.currentStage\" class=\"slide\" css=\"left: ${$index * 100}%;background-image: url(http://farm${params.farm}.static.flickr.com/${params.server}/${params.id}_${params.secret}_b.jpg);\"><div class=\"description\">${params.title} ${(!$parent.transition)?'jump':'foo'}</div></div></div><div class=\"slideShadow\"></div></div><div class=\"controls\"><div class=\"start button\" click.trigger=\"directStart()\"></div><div class=\"stop button\" click.trigger=\"stop()\"></div><div class=\"counter\">${current + 1} / ${collection.length}</div><div class=\"previous button\" click.trigger=\"previous()\"></div><div class=\"next button\" click.trigger=\"next()\"></div></div></template>"; });
define('text!slideshow/slideshow.css', ['module'], function(module) { module.exports = ".slideshow {\n  position: relative;\n  overflow: hidden;\n  border-radius: .5rem;\n  margin-bottom: 2rem; }\n  .slideshow .squareImage {\n    max-height: 85vh;\n    display: block;\n    width: 100%;\n    opacity: 0; }\n  .slideshow .slideshow_content {\n    position: absolute;\n    display: block;\n    top: 0;\n    right: auto;\n    bottom: 0;\n    width: 100%;\n    overflow: visible;\n    box-shadow: 0 1px 6px -3px rgba(40, 40, 40, 0.9) inset;\n    border-radius: .5rem;\n    background-position: center;\n    background-size: contain;\n    background-repeat: no-repeat;\n    transition: left 1s;\n    transition-delay: .3s; }\n    .slideshow .slideshow_content.jump {\n      transition: all 0s;\n      left: 0 !important; }\n  .slideshow .slide {\n    display: flex;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-position: center;\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-color: rgba(255, 255, 255, 0.9);\n    border: 5px solid transparent;\n    box-sizing: border-box; }\n  .slideshow .description {\n    background-color: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    font-size: 1.4rem;\n    padding: 1rem 2rem;\n    position: absolute;\n    left: -5px;\n    right: -5px;\n    bottom: -5px; }\n  .slideshow .slideShadow {\n    position: absolute;\n    display: flex;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    box-shadow: 0 0 7px -2px #000 inset;\n    border-radius: 4px; }\n    .slideshow .slideShadow:after, .slideshow .slideShadow:before {\n      content: \"\";\n      position: absolute;\n      right: 0;\n      left: auto;\n      /* bottom: 0; */\n      /* width: 120%; */\n      width: 10px;\n      top: -50%;\n      bottom: -50%;\n      background: radial-gradient(ellipse at 140% 50%, black, rgba(255, 255, 255, 0) 40%); }\n    .slideshow .slideShadow:before {\n      left: 0;\n      right: auto;\n      background: radial-gradient(ellipse at -40% 50%, black, rgba(255, 255, 255, 0) 40%); }\n\n.controls {\n  display: flex;\n  justify-content: center; }\n  .controls .button {\n    cursor: pointer;\n    background-image: radial-gradient(farthest-corner at 5px 5px, rgba(255, 255, 255, 0.8), rgba(100, 100, 100, 0.8));\n    text-align: center;\n    width: 3rem;\n    height: 3rem;\n    border-radius: 50%;\n    margin: .5rem; }\n    .controls .button:before {\n      font-family: \"Genericons-Neue\";\n      display: inline-block;\n      vertical-align: middle;\n      font-weight: normal;\n      font-style: normal;\n      speak: none;\n      text-decoration: inherit;\n      text-transform: none;\n      text-rendering: auto;\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n      font-size: 1.8rem;\n      line-height: 3rem;\n      color: transparent;\n      text-shadow: 0 0 0 rgba(255, 255, 255, 0.6), -1px -1px 0 rgba(0, 0, 0, 0.6); }\n    .controls .button:hover {\n      background-image: radial-gradient(farthest-corner at 5px 5px, rgba(255, 255, 255, 0.6), rgba(120, 120, 120, 0.6)); }\n    .controls .button:active {\n      background-image: radial-gradient(rgba(255, 255, 255, 0.6), rgba(100, 100, 100, 0.6)); }\n    .controls .button.start:before {\n      content: \"\\f452\"; }\n    .controls .button.stop:before {\n      content: \"\\f449\"; }\n    .controls .button.next:before {\n      content: \"\\f451\"; }\n    .controls .button.previous:before {\n      content: \"\\f450\"; }\n  .controls .counter {\n    width: 10rem;\n    text-align: center;\n    background-color: rgba(255, 255, 255, 0.9);\n    color: #000;\n    line-height: 3rem;\n    border-radius: 1.5rem;\n    font-size: 1.8rem;\n    font-weight: bold; }\n"; });
define('text!navigation/section/default.css', ['module'], function(module) { module.exports = ""; });
define('text!navigation/section/default.html', ['module'], function(module) { module.exports = "<template><div class=\"items\"><div repeat.for=\"item of section\" click.trigger=\"navigateTo([sectionId, $index])\" class=\"item ${currentItem == item?'active':''}\">${item.title}</div></div></template>"; });
define('text!navigation/section/stageRenderer.html', ['module'], function(module) { module.exports = "<template><require from=\"./stageRenderer.css\"></require><div class=\"items\"><div class=\"item item_stage\" repeat.for=\"item of section\" click.trigger=\"navigateTo([sectionId, $index])\" class=\"item ${currentItem == item?'active':''}\">${$index}</div></div></template>"; });
define('text!navigation/section/stageRenderer.css', ['module'], function(module) { module.exports = ".item_stage {\n  padding: 0 .6rem;\n  display: inline; }\n"; });
define('text!page/prolog/prolog.css', ['module'], function(module) { module.exports = ".pageProlog {\n  position: relative;\n  font-size: 12px;\n  text-align: justify;\n  max-width: 480px;\n  margin: 0 auto 2rem;\n  border-radius: 3px;\n  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);\n  background-image: linear-gradient(rgba(252, 255, 255, 0.9), white);\n  padding: 2rem; }\n  .pageProlog:after, .pageProlog:before {\n    content: \"\";\n    position: absolute;\n    right: auto;\n    left: 100%;\n    width: 10px;\n    top: -50%;\n    bottom: -50%;\n    background: radial-gradient(ellipse at -30% 50%, black, rgba(255, 255, 255, 0) 40%); }\n  .pageProlog:before {\n    left: auto;\n    right: 100%;\n    background: radial-gradient(ellipse at 140% 50%, black, rgba(255, 255, 255, 0) 40%); }\n  @media only screen and (min-width: 768px) {\n    .pageProlog {\n      font-size: 13px; } }\n  @media only screen and (min-width: 1280px) {\n    .pageProlog {\n      font-size: 14px; } }\n"; });
define('text!page/prolog/prolog.html', ['module'], function(module) { module.exports = "<template><require from=\"./prolog.css\"></require><div class=\"pageProlog\"><h2>${navigationService.currentPage.title}</h2><h1>${navigationService.currentPage.headline}</h1></div></template>"; });
define('text!page/stage/stage.css', ['module'], function(module) { module.exports = ".pageStage {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin: 3rem 4rem;\n  position: relative; }\n  .pageStage:after, .pageStage:before {\n    position: absolute;\n    right: 0;\n    left: auto;\n    /* bottom: 0; */\n    /* width: 120%; */\n    width: 10px;\n    top: -50%;\n    bottom: -50%;\n    background: radial-gradient(ellipse at 140% 50%, black, rgba(255, 255, 255, 0) 40%); }\n  .pageStage:before {\n    left: 0;\n    right: auto;\n    background: radial-gradient(ellipse at -40% 50%, black, rgba(255, 255, 255, 0) 40%); }\n  .pageStage > .flexChild {\n    flex: 1 0 30rem;\n    align-self: flex-start;\n    margin: 0 2rem 2rem; }\n  .pageStage .report {\n    position: relative;\n    font-size: 12px;\n    text-align: justify;\n    max-width: 480px;\n    margin: 0 auto 2rem;\n    border-radius: 3px;\n    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);\n    background-image: linear-gradient(rgba(252, 255, 255, 0.9), white);\n    padding: 2rem; }\n    .pageStage .report:after, .pageStage .report:before {\n      content: \"\";\n      position: absolute;\n      right: auto;\n      left: 100%;\n      width: 10px;\n      top: -50%;\n      bottom: -50%;\n      background: radial-gradient(ellipse at -30% 50%, black, rgba(255, 255, 255, 0) 40%); }\n    .pageStage .report:before {\n      left: auto;\n      right: 100%;\n      background: radial-gradient(ellipse at 140% 50%, black, rgba(255, 255, 255, 0) 40%); }\n    @media only screen and (min-width: 768px) {\n      .pageStage .report {\n        font-size: 13px; } }\n    @media only screen and (min-width: 1280px) {\n      .pageStage .report {\n        font-size: 14px; } }\n  .pageStage .slideshowContainer {\n    flex-grow: 4;\n    flex-basis: 50vw; }\n  .pageStage h1 {\n    font-size: 1.6rem;\n    text-align: right; }\n  .pageStage h2 {\n    font-size: 1.2rem; }\n"; });
define('text!page/stage/stage.html', ['module'], function(module) { module.exports = "<template><require from=\"./stage.css\"></require><require from=\"../../slideshow/slideshow\"></require><div class=\"pageStage\"><div class=\"report flexChild\"><h2>${navigationService.currentPage.etap}</h2><h1>${navigationService.currentPage.headline}</h1><p innerhtml=\"${navigationService.currentPage.text | sanitizeHTML}\"></p><div>${navigationService.currentPage.date}</div><div><span>${'common:distance' | t:{distance: navigationService.currentPage.distance}}</span> <span>${'common:height_meter' | t:{hm: navigationService.currentPage.hm}}</span></div></div>${navigationService.currentPage.imageId}<slideshow class=\"flexChild slideshowContainer\" stage-id.bind=\"navigationService.currentPage.imageId\"></slideshow></div></template>"; });
//# sourceMappingURL=app-bundle.js.map