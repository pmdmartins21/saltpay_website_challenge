import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favAlbumList:Album[] = [];

  constructor(private ms:MusicService) { }

  ngOnInit(): void {
    this.favAlbumList = this.ms.favouriteAlbumList;
  }

}
