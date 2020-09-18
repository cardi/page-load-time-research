// SPDX-License-Identifier: GPL-3.0-or-later

'use strict';

export const testExportText = "lorem ipsum";

export const db = new Dexie('plt');

let DEBUG = 0;

db.version(1).stores({
  data: '++id, timestamp, entry'
});

// open db here to fire off 'ready' events
db.open();

// DEBUG
DEBUG && db.data.add({timestamp: new Date().getTime(), entry: "foobar"});

DEBUG && db.data.count( (count) => {
  console.log("[db] count =", count);
});
