// SPDX-License-Identifier: GPL-3.0-or-later

'use strict';

import {db, testExportText} from '/js/db.js';

(async function(){

// get all the data from the database and populate the textarea
await db.data.toArray().then( (items) => {
  let content = items.map(JSON.stringify).join('\n');
  document.getElementById("data").textContent = content;
}).catch(function(err) {
  console.error(err.stack || err);
});

})();
