import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-top100list',
  templateUrl: './top100list.component.html',
  styleUrls: ['./top100list.component.css']
})
export class Top100listComponent implements OnInit, OnChanges, DoCheck {

  @Input()
  filteredCategoryList:string[];

  @Input()
  albumList:Album[];

  @Input()
  searchText:string;
  
  filteredAlbumList:Album[] = [];
  searching:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  // This lifecycle allows to capture the searchText string changes and implement the filtered results array immediately

  ngOnChanges(changes:SimpleChanges):void { 
    if(changes.searchText.currentValue && changes.searchText.currentValue!== "") {
      this.filteredAlbumList = this.albumList.filter(el => el.artistName.toLowerCase().includes(changes.searchText.currentValue.toLowerCase()));
      this.searching = true;
    }else {
      this.searching = false;
    }
  }

    // This lifecycle allows to capture the filtered categories array changes and implement the filtered results array immediately
  ngDoCheck() {
    if(this.filteredCategoryList.length > 0) {
      this.filteredAlbumList = this.albumList.filter(album => this.filteredCategoryList.includes(album.genre));
      this.searching = true;
    }
    else if (this.filteredCategoryList.length === 0 && (this.searchText === "" || this.searchText === undefined)){
      this.searching = false;
    }
    
  }

}
