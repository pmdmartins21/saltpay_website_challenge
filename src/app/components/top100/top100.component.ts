import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-top100',
  templateUrl: './top100.component.html',
  styleUrls: ['./top100.component.css']
})
export class Top100Component implements OnInit, OnDestroy {
  albumList:Album[] =[];
  categoryList:string[] = [];
  filteredCategoryList:string[] = [];
  searchText:string;
  msSubscription:Subscription;

  constructor(private ms:MusicService) { }

  ngOnInit(): void {
    this.msSubscription = this.ms.fetchAlbums().subscribe( resp => { //Since this is the only component using this logic, I created it on this component. On a more advance aplication a reactive approach should be more efficient.
      this.albumList = resp;
      this.categoryList = this.loadCategories(resp);
    });
  }

  ngOnDestroy() {
    this.msSubscription.unsubscribe();
  }


  loadCategories(albumArray:Album[]):string[] {
    let categoryArray:string[] = [];
    let uniqueCategoryArray:string[] = [];

    albumArray.forEach(element => {
      categoryArray.push(element.genre);
    });

    uniqueCategoryArray = [... new Set(categoryArray)];

    return uniqueCategoryArray;
  }

  filterCategory(category:string):void {
    this.filteredCategoryList.includes(category) ? 
    this.filteredCategoryList.splice(this.filteredCategoryList.indexOf(category),1)
    : this.filteredCategoryList.push(category);
  }

  isCategoryFiltered(category:string):boolean {
    return this.filteredCategoryList.includes(category);
  }
}
