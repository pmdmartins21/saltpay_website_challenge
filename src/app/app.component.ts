import { Component, OnInit } from '@angular/core';
import { Album } from './models/album.model';
import { MusicService } from './services/music.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor() {}

  ngOnInit(): void{
   
  }


}
