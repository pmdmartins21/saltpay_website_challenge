import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { MusicService } from 'src/app/services/music.service';

import { faStar, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  id:string;
  album:Album;
  isFavorite:boolean;
  isFavoriteIndex:number;
  youtubeVideos:{
    items:object[]
  };
  faStar = faStar;
  faArrowAltCircleDown = faArrowAltCircleDown;
  paramsSubscription:Subscription;
  msSubscription:Subscription;

  constructor(private ms:MusicService, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //fetch ID in the route params and use to fetch album
    this.paramsSubscription = this.activeRoute.params.subscribe( params => {
      this.id = params['id'];
    })

    // fetch album by id
    this.msSubscription = this.ms.fetchAlbums().subscribe( (resp) => {
      this.ms.albumList = resp;
      this.album = this.ms.getAlbumDetails(this.id);
      this.isFavorite = this.ms.checkFavorite(this.album).isFavorite;
      this.isFavoriteIndex = this.ms.checkFavorite(this.album).index;

      this.ms.fetchYoutubeVideos(this.album.artistName).subscribe(resp => {
        this.youtubeVideos = resp;
        console.log(this.youtubeVideos)
      });
    });

    //creating the youtube script to implement the element
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  //unsubscribe from Observables
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.msSubscription.unsubscribe();
  }

  //check if album is already favorite.
  toggleFavourites():void {
    this.isFavorite = this.ms.checkFavorite(this.album).isFavorite;
    this.ms.toggleFavorite(this.album,this.isFavoriteIndex,this.isFavorite);
    console.log(this.ms.favouriteAlbumList);
    this.isFavorite = !this.isFavorite;
  }
}
