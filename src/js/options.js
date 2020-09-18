// SPDX-License-Identifier: GPL-3.0-or-later

'use strict';

import {db, testExportText} from '/js/db.js';

(async function(){

let DEBUG = 1;

// get all the data from the database and populate the textarea
await db.data.toArray().then( (items) => {
  let content = items.map(JSON.stringify).join('\n');
  //document.getElementById("data").textContent = content;

  // automatically download the data
  let b = new Blob([content], {type: "text/plain"});
  let url = URL.createObjectURL(b);

  var msgSend = browser.runtime.sendMessage({url: url});
  msgSend.then( msgResp => { DEBUG && console.log("[options] response:", msgResp) } );

}).catch(function(err) {
  console.error(err.stack || err);
});

})();
