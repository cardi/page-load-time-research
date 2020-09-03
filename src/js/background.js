// SPDX-License-Identifier: GPL-3.0-or-later

'use strict';

import {db, testExportText} from '/js/db.js';

(async function(){

let DEBUG = 0;

DEBUG && browser.tabs.create({url: browser.runtime.getURL('options.html') });
DEBUG && console.log("test module export: " + testExportText)

DEBUG && db.data.count( (count) => {
  console.log("[background/db] count =", count);
});

/* ---- */

// handler: user clicks on browser action icon
function handleClick(tab) {
  let url = browser.runtime.getURL('options.html');
  browser.tabs.create({url: url});
};

browser.browserAction.onClicked.addListener(handleClick);

/* ---- */

// handler: tab sends timing information from page to bg
async function handleMessage(request, sender, sendResponse) {

  if (sender.tab != null) {
    DEBUG && console.log("request from tab", sender.tab.id, ":", request);
  } else {
    DEBUG && console.log("request:", request);
  }

  await db.data.add({
    timestamp: request.timestamp,
    entry: request.entry
  })

  return new Promise(resolve => resolve({response: "ok"}));
}

browser.runtime.onMessage.addListener(handleMessage);

/* ---- */

})();
