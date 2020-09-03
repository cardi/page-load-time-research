// SPDX-License-Identifier: GPL-3.0-or-later

'use strict';

(async function(){

  let DEBUG = 1;

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // wait until we're loaded before getting performance data
  window.addEventListener('load', async (event) => {
    DEBUG && console.log('page is fully loaded, sleep for 500ms to get accurate timings');
    await sleep(500);
    collectTimingData();
  });

  // get page load time and other metrics, send it to background.js
  async function collectTimingData() {

    // get data from PerformanceNavigationTiming API
    let a = performance.getEntriesByType("navigation")[0].toJSON();

    DEBUG && console.log(a);

    // get absolute timestamp values
    let b = window.performance.timing;

    DEBUG && console.log(b.navigationStart);

    var msgSend = browser.runtime.sendMessage({
                    timestamp: b.navigationStart,
                    entry: a
                  });

    msgSend.then( msgResp => { DEBUG && console.log("[cs] response:", msgResp) } );
  }
})();
