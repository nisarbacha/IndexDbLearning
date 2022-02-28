import { uid } from "./uid.js";
console.log(uid())
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
    let oldVersion = e.oldVersion;
    let newVersion = e.newVersion || db.version;
    console.log('DB updated from version', oldVersion, 'to', newVersion);

    console.log('upgrade', db);
    if (!db.objectStoreNames.contains("StudentStore")) {
      objectStore = db.createObjectStore('StudentStore', {
        keyPath: 'id'
      });
    }
  });
  document.studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let rollno = document.getElementById('stdId').value.trim();
    let name = document.getElementById('stdName').value.trim();
    let marks = parseInt(document.getElementById('stdMarks').value);
    let department = document.getElementById('stdDepartment').value.trim();
    let regular = document.getElementById('stdStatus').checked;
    let student = {
      id: uid(),
      rollno,
      name,
      marks,
      department,
      regular,
    };

    let tx = makeTX('StudentStore', 'readwrite');
    tx.oncomplete = (e) => {
      console.log(e);
    };

    tx.onerror = (err) => {
      console.warn(err);
    };

    let store = tx.objectStore('StudentStore');
    let request = store.add(student);
    request.onsuccess = (e) => {
      console.log('successfully added in object');
    };
    request.onsuccess = (e) => {
      console.log('error in request to add');
    }
  });
  function makeTX(storeName, mode) {
    let tx = db.transaction(storeName, mode);
    return tx;
  }
})();

