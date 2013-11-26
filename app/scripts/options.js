'use strict';

var tryTrack = function (category, action, label, value) {
  try {
    chrome.extension.sendRequest({category: category, action: action, label: label, value: value});
  } catch (err) {
    console.log(err);
  }
};

var now = function () {
  return new Date().getTime();
};

window.onload = function () {
  var chkBetterItasa = document.getElementById('chk-better-itasa');
  var chkUnreadReplies = document.getElementById('chk-unread-replies');
  var chkUnreadBoard = document.getElementById('chk-unread-board');
  var chkHighContrast = document.getElementById('chk-high-contrast');
  var chkShowSeparator = document.getElementById('chk-show-separator');
  var chkMiniFont = document.getElementById('chk-mini-font');
  var chkMaxiFont = document.getElementById('chk-maxi-font');
  var chkDroidMode = document.getElementById('chk-droid-mode');
  var chkKitKatMode = document.getElementById('chk-kitkat-mode');
  var chkForumOverlay = document.getElementById('chk-forum-overlay');
  var chkHighlightedMenu = document.getElementById('chk-highlighted-menu');
  var chkYvonneSpoiler = document.getElementById('chk-yvonne-spoiler');
  var chkShorterPost = document.getElementById('chk-shorter-post');

  chkBetterItasa.checked = (localStorage['better-itasa'] === 'true');
  chkUnreadReplies.checked = (localStorage['unread-replies'] === 'true');
  chkUnreadBoard.checked = (localStorage['unread-board'] === 'true');
  chkHighContrast.checked = (localStorage['high-contrast'] === 'true');
  chkShowSeparator.checked = (localStorage['show-separator'] === 'true');
  chkMiniFont.checked = (localStorage['mini-font'] === 'true');
  chkMaxiFont.checked = (localStorage['maxi-font'] === 'true');
  chkDroidMode.checked = (localStorage['droid-mode'] === 'true');
  chkKitKatMode.checked = (localStorage['kitkat-mode'] === 'true');
  chkForumOverlay.checked = (localStorage['forum-overlay'] === 'true');
  chkHighlightedMenu.checked = (localStorage['highlighted-menu'] === 'true');
  chkYvonneSpoiler.checked = (localStorage['yvonne-spoiler'] === 'true');
  chkShorterPost.checked = (localStorage['shorter-post'] === 'true');

  // Nascondo tutti i toggle
  var toggles = $('table.options-table tr td a span.ui-icon').parent();
  toggles.parent().parent().find('div.toggle').toggle('blind', undefined, -1);

  // Eseguo il binding del click su tutti i pulsanti toggle
  toggles.click(function () {
    var options = {};
    if ($(this).find('span.ui-icon').is('.ui-icon-circle-plus')) {
      $(this).find('span.ui-icon').removeClass('ui-icon-circle-plus');
      $(this).find('span.ui-icon').addClass('ui-icon-circle-minus');
    } else {
      $(this).find('span.ui-icon').removeClass('ui-icon-circle-minus');
      $(this).find('span.ui-icon').addClass('ui-icon-circle-plus');
    }
    $(this).parent().parent().find('div.toggle').toggle('blind', options, 500);
  });

  // Al click sulla "one checkbox to rule them all"
  $('table.options-table tr th input#chk-all').change(function () {
    var check = $('table.options-table tr th input#chk-all').is(':checked');
    $('table.options-table tr td input:checkbox').each(function () {
      if ($(this).is(':checked') !== check) {
        // Cambio il valore
        $(this).click();
      }
    });
  });

  // Al click sulla "one link to rule them all"
  $('table.options-table tr th a#open-them-all').click(function () {
    $('table.options-table tr td a span.ui-icon-circle-plus').click();
  });

  // Al click sulla "one link to close them all"
  $('table.options-table tr th a#close-them-all').click(function () {
    $('table.options-table tr td a span.ui-icon-circle-minus').click();
  });

  $('#chk-better-itasa').change(function () {
    var check = $('#chk-better-itasa').is(':checked');
    localStorage['better-itasa'] = check;
    tryTrack('Opzioni', 'Better Itasa', now(), check ? 1 : -1);
  });

  $('#chk-unread-replies').change(function () {
    var check = $('#chk-unread-replies').is(':checked');
    localStorage['unread-replies'] = check;
    tryTrack('Opzioni', 'Risposte non lette', now(), check ? 1 : -1);
  });

  $('#chk-unread-board').change(function () {
    var check = $('#chk-unread-board').is(':checked');
    localStorage['unread-board'] = check;
    tryTrack('Opzioni', 'Topic non letti', now(), check ? 1 : -1);
  });

  $('#chk-high-contrast').change(function () {
    var check = $('#chk-high-contrast').is(':checked');
    localStorage['high-contrast'] = check;
    tryTrack('Opzioni', 'Contrasto alto in forum', now(), check ? 1 : -1);
  });

  $('#chk-show-separator').change(function () {
    var check = $('#chk-show-separator').is(':checked');
    localStorage['show-separator'] = check;
    tryTrack('Opzioni', 'Separatore post', now(), check ? 1 : -1);
  });

  $('#chk-shorter-post').change(function () {
    var check = $('#chk-shorter-post').is(':checked');
    localStorage['shorter-post'] = check;
    tryTrack('Opzioni', 'Shorter post', now(), check ? 1 : -1);
  });

  $('#chk-mini-font').change(function () {
    var check = $('#chk-mini-font').is(':checked');
    if (check) {
      $('#chk-maxi-font').attr('checked', !check);
      localStorage['maxi-font'] = !check;
    }
    localStorage['mini-font'] = check;
    tryTrack('Opzioni', 'Font piccolo in forum', now(), check ? 1 : -1);
  });

  $('#chk-maxi-font').change(function () {
    var check = $('#chk-maxi-font').is(':checked');
    if (check) {
      $('#chk-mini-font').attr('checked', !check);
      localStorage['mini-font'] = !check;
    }
    localStorage['maxi-font'] = check;
    tryTrack('Opzioni', 'Font grande in forum', now(), check ? 1 : -1);
  });

  $('#chk-droid-mode').change(function () {
    var check = $('#chk-droid-mode').is(':checked');
    localStorage['droid-mode'] = check;
    tryTrack('Opzioni', 'Font Roboto', now(), check ? 1 : -1);
  });

  $('#chk-kitkat-mode').change(function () {
    var check = $('#chk-kitkat-mode').is(':checked');
    localStorage['kitkat-mode'] = check;
    tryTrack('Opzioni', 'KitKat mode', now(), check ? 1 : -1);
    document.getElementById('chk-droid-mode').disabled = check;
  });

  $('#chk-forum-overlay').change(function () {
    var check = $('#chk-forum-overlay').is(':checked');
    localStorage['forum-overlay'] = check;
    tryTrack('Opzioni', 'Forum Overlay', now(), check ? 1 : -1);
  });

  $('#chk-highlighted-menu').change(function () {
    var check = $('#chk-highlighted-menu').is(':checked');
    localStorage['highlighted-menu'] = check;
    tryTrack('Opzioni', 'Highlighted Menu', now(), check ? 1 : -1);
  });

  $('#chk-yvonne-spoiler').change(function () {
    var check = $('#chk-yvonne-spoiler').is(':checked');
    localStorage['yvonne-spoiler'] = check;
    tryTrack('Opzioni', 'Yvonne Spoiler Mode', now(), check ? 1 : -1);
  });
};