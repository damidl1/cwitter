import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { FireappService } from './fireapp.service';
import { OurUser } from '../model/ourUser';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  db: Firestore;

  constructor(private fireApp: FireappService) {
    this.db = getFirestore(this.fireApp.app);
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

  postOurUser(ourUser: OurUser, uid: string){
    const docUrl = doc(this.db, 'user', uid);
    setDoc(docUrl, ourUser).then((data) => {
      console.log('riuscito', data)
    }).catch(error => {
      console.log('merda!', error.message);
    })
  }

  getOurUser(uid: string){
    const docUrl = doc(this.db, 'user', uid);
    getDoc(docUrl).then((snap) => {
      console.log('riuscito', snap.data())
    }).catch(error => {
      console.log('merda!', error.message);
    })
  }
}
