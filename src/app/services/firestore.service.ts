import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";
import { FireappService } from './fireapp.service';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db: Firestore;

  constructor(private fireApp: FireappService) {
    this.db = getFirestore(fireApp.app);
  }

//   initDb(app: any){

//     this.db = getFirestore(app);

//  }

  getCwits(){

    const cwits = collection(this.db, 'cwitt');
    return getDocs(cwits).then(snap => snap.docs.map(doc => {
      console.log(doc)
      return {
        text: doc.data()['text'],
        url: doc.data()['url'],
        author: doc.data()['author'],
        creationTime: doc.data()['creationTime'].toDate(),
      }
    }));
  }
}
