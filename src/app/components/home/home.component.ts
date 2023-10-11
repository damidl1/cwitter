import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Cwitt } from 'src/app/model/cwitt';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  cwits: Cwitt[] = [];

  constructor(private firestore: FirestoreService){}


  ngOnInit(): void {

   this.firestore.getCwits().then(data => {
    console.log(data);
    this.cwits = data as Cwitt[]
  });

  }

}
