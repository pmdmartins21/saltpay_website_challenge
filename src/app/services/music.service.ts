import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  albumList: Album[] = [];
  favouriteAlbumList: Album[] = [];
  albumsUrl: string = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";
  youtubeApiUrl:string = "https://youtube.googleapis.com/youtube/v3/search?type=video&maxResults=3&key=";
  youtubeApiKey:string ="AIzaSyDTcEGQS1c79tlkFE2lAVLvyoOq2qIraT0"
  youtubeQuery:string = "&q="
  

  constructor(private http:HttpClient) { }

  fetchAlbums(): Observable<Album[]>{

      return this.http.get(this.albumsUrl).
      pipe(map (resp => {
        return this.convertAlbums(resp);
      }))
    }

    // Formatting the Artist name / Album name to small strings
    adjustName(name:string):string {
      if (name.length > 20) {
        return ( name.substring(0,20) + "(...)");
      }
      return name
    } 
    
  convertAlbums(httpResponse) :Album[] {
    let albums: Album[] = [];
    let albumsResponse = httpResponse.feed.entry;
    albumsResponse.forEach(element => {
      albums.push(new Album(this.adjustName(element['im:name'].label) , this.adjustName(element['im:artist'].label), element['im:image'][2].label, element['im:itemCount'].label, element['im:price'].label,
      element.rights.label, element.id.label, element.category.attributes.term, element['im:releaseDate'].label, element.id.attributes['im:id']))
    });
    return albums;
  }
  
  getAlbumDetails(id:string):Album {
    for (let i = 0; i < this.albumList.length; i++) {
      if (this.albumList[i].id === id) {
        return this.albumList[i];
       } 
    }
  }

  

  checkFavorite(album:Album):{index : number , isFavorite: boolean} {
    for (let i = 0; i < this.favouriteAlbumList.length; i++) {
      if (album.id === this.favouriteAlbumList[i].id) {
          return {
            index: i,
            isFavorite: true,
          };
      } 
    }
    return {
      index: -1,
      isFavorite:false};
  }
  
  toggleFavorite(album:Album, index:number, isFavorite: boolean):void {
    !isFavorite ? this.favouriteAlbumList.push(album)
                : this.favouriteAlbumList.splice(index,1);
  }


  fetchYoutubeVideos(artistName:string): Observable<any>{

    return this.http.get(this.youtubeApiUrl + this.youtubeApiKey + this.youtubeQuery + artistName)
  }


}
