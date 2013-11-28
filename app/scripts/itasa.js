'use strict';

var getExtUrl = function (file) {
  return chrome.extension.getURL(file);
};

var sendRequest = function (object, fn) {
  chrome.extension.sendRequest(object, function (response) {
    fn(response);
  });
};

var tryTrack = function (category, action, label, value) {
  try {
    sendRequest({category: category, action: action, label: label, value: value});
  } catch (err) {
    console.log(err);
  }
};

var injectCss = function (cssFile) {
  var path = getExtUrl(cssFile);
  $('head').append($('<link>')
    .attr('rel', 'stylesheet')
    .attr('type', 'text/css')
    .attr('href', path));
};

// Workaround non più grezzissimo per non eseguire il focus della nuova tab
var openNewTabNoFocus = function (link) {
  try {
    sendRequest({link: link});
  } catch (err) {
    console.log(err);
  }
};

// Apre tutti i link che vengono passati attendendo un certo tempo
// (timeout) fra un link e l'altro.
var openLinks = function (links, timeout) {
  if (!timeout) {
    timeout = 400;
  }
  var link = links.shift();
  openNewTabNoFocus(link);
  if (links.length === 0) {
    return;
  }
  setTimeout(function () {
    openLinks(links, timeout);
  }, timeout);
};

// Unread replies, rinomina i pulsanti Apri tutto in Apri selezionati
// solo se ci sono checkbox selezionate o se è selezionata quella principale (per ultima)
var renameApriTutti = function (tutti) {
  var checkCnt = $('div#unreadreplies td.windowbg2 input.input_check:checked').length;
  var newCnt = '++ Apri Tutto';
  if (tutti === true || (tutti === undefined && checkCnt > 0)) {
    newCnt = '++ Apri selezionati';
  }
  $('.plus-replies-apri-tutto span').text(newCnt);
};

var afterLoad = function () {
  sendRequest({mStorage: 'unread-replies'}, function (response) {
    var num = $('div#unreadreplies td.subject div a img').parent().length;
    if (response === 'true' && num > 0) {
      // Aggiungo il pulsante
      $('div#recent div.pagesection div.buttonlist ul').append('<li><a class="plus-replies-apri-tutto"><span>++ Apri tutto</span></a></li>');
      // Al check di ogni checkbox rinomino i pulsanti in maniera appropriata
      $('div#unreadreplies td.windowbg2 input.input_check').change(function () {
        renameApriTutti();
      });
      // Al check della checkbox generale rinomino i pulsanti in maniera appropriata
      $('div#unreadreplies tr.catbg input.input_check').change(function () {
        renameApriTutti($('div#unreadreplies tr.catbg input.input_check').is(':checked'));
      });
      // Rinomino in base al contesto (non si sa mai)
      renameApriTutti();
      // Al click del pulsante Apri Tuttto
      $('.plus-replies-apri-tutto').click(function () {
        var checkPar = $('div#unreadreplies');
        var checkCnt = checkPar.find('td.windowbg2 input.input_check:checked').length;
        var links = [];
        if (checkCnt === 0) {
          // Tabella non vuota e nessuna checkbox selezionata: apro tutto (aka 'smarmella mode')
          checkPar.find('td.subject div a img').parent().each(function () {
            links.push($(this).attr('href'));
            // window.open($(this).attr('href'));
          });
        } else {
          // Tabella non vuota ed alcune checkbox selezionate: apro i topic selezionati
          $('div#unreadreplies td.windowbg2 input.input_check:checked').parent().parent().find('td.subject div a img').parent().each(function () {
            links.push($(this).attr('href'));
            // window.open($(this).attr('href'));
          });
        }
        openLinks(links);
        // Itasa++ / invio la statistica a GA
        tryTrack('Action', 'Unread Replies', window.location.pathname, num);
      });
    }
  });

  sendRequest({mStorage: 'unread-board'}, function (response) {
    var num = $('div#messageindex tr td.subject div a img').parent().length;
    if (response === 'true' && num > 0) {
      // Unread board
      $('div.pagesection div.buttonlist ul').first().append('<li><a id="plus-board-apri-non-letti"><span>++ Apri non letti</span></a></li>');

      $('#plus-board-apri-non-letti').click(function () {
        var links = [];
        $('div#messageindex tr td.subject div a img').parent().each(function () {
          links.push($(this).attr('href'));
          // window.open($(this).attr('href') );
        });
        openLinks(links);
        // Itasa++ / invio la statistica a GA
        tryTrack('Action', 'Apri Non Lette', window.location.pathname, num);
      });
    }
  });

  sendRequest({mStorage: 'highlighted-menu'}, function (response) {
    var high = $('div.frame > div#main_menu li strong').parent().parent();
    if (response === 'true' && high.length > 0) {
      // Aggiungo una classe highlighted ad ogni <a> con uno strong all'interno
      high.each(function () {
        $(this).addClass('highlighted');
      });
    }
  });

  sendRequest({mStorage: 'yvonne-spoiler'}, function (response) {
    var menubars = $('ul.reset.smalltext.quickbuttons');
    if (response === 'true' && menubars.length > 0) {
      // Aggiungo il CSS
      injectCss('styles/plus-yvonne-spoiler.css');
      // Aggiungo un pulsante ad ogni menubar
      var newElem = '<li class="myvonne open-spoiler"><a href="javascript:void(0)" original-title="Apri tutti gli spoiler" ></a></li>';
      menubars.each(function () {
        $(this).prepend(newElem);
      });
      // Eseguo il binding per aprire tutti i pulsanti apri spoiler in pagina
      $('ul.reset.smalltext.quickbuttons > li.myvonne > a').click(function () {
        // se l'oggetto è di apertura
        if ($(this).parent().hasClass('open-spoiler')) {
          // imposto tutti i pulsanti con l'icona per la chiusura
          $('ul.reset.smalltext.quickbuttons > li.open-spoiler').removeClass('open-spoiler').addClass('close-spoiler');
          // apro tutti gli spoiler
          $('div.spoiler > div.spoilerbody:not(visible)').parent().find('div.spoilerheader > input.spoilerbutton').click();
        } else {
          // imposto tutti i pulsanti con l'icona per l'apertura
          $('ul.reset.smalltext.quickbuttons > li.close-spoiler').removeClass('close-spoiler').addClass('open-spoiler');
          // chiudo tutti gli spoiler
          $('div.spoiler > div.spoilerbody:visible').parent().find('div.spoilerheader > input.spoilerbutton').click();
        }
      });
    }
  });

  sendRequest({mStorage: 'shorter-post'}, function (response) {
    if (response === 'true') {
      if (window.location.hash) {
        window.location = window.location.hash;
      }
    }
  });

  // Template per le aggiunte dopo il caricamento
  /*
   sendRequest({mStorage: 'nome-opzione'}, function(response) {
   if (response === 'true') {
   blablabla
   }
   });
   */
};

var asap = function () {
  // Appena si inizia a scaricare il documento, imposta la classe "itasaplusplus" sul tag "html"
  $('html').addClass('itasaplusplus');

  sendRequest({mStorage: 'high-contrast'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-contrast.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'High Contrast', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'show-separator'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-separator.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Show Separator', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'shorter-post'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-shorter-post.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Shorter post', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'mini-font'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-font.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Mini Font', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'maxi-font'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-font-maxi.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Maxi Font', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'droid-mode'}, function (response) {
    if (response === 'true') {
      injectCss('styles/roboto.css');
      injectCss('styles/plus-roboto.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Droid Mode', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'kitkat-mode'}, function (response) {
    if (response === 'true') {
      injectCss('styles/roboto.css');
      injectCss('styles/plus-roboto.css');
      injectCss('styles/plus-kitkat.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'KitKat Mode', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'forum-overlay'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-better-overlay.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Better Overlay', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'better-itasa'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-better-itasa.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Better ItaSA', window.location.pathname, 1);
    }
  });

  sendRequest({mStorage: 'highlighted-menu'}, function (response) {
    if (response === 'true') {
      injectCss('styles/plus-highlighted-menu.css');
      // Itasa++ / invio la statistica a GA
      tryTrack('Action', 'Hihglighted Menu', window.location.pathname, 1);
    }
  });
};

asap();

$(document).ready(function () {
  afterLoad();
});