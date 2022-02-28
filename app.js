const IDB = (function init() {
  let db = null;
  let objectStore = null;

  // Let us open our database
  let DbOpenReq = window.indexedDB.open('StudentDb', 1);


  //Error occurred while trying to open DB
  DbOpenReq.addEventListener('error', (e) => {
    console.warn(err);
  });
  // Successfully open Db
  DbOpenReq.addEventListener('success', (e) => {
    db = e.target.result;
    console.log('success', db);
  });

  //Upgraded db
  DbOpenReq.addEventListener('upgradeneeded', (e) => {
    db = e.target.result;
    console.log('upgrade', db);
    if (!db.objectStoreNames.contains("StudentDB")) {
      objectStore = db.createObjectStore('StudentDb', {
        keyPath: 'id'
      });
    }
  });
})();

