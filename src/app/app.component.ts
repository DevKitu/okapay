import { Component,OnInit, OnDestroy } from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { APIService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'okapay';
  mediaSub: Subscription;

  deviceData: {
    size: string,
    xs: boolean,
  };

  constructor(public mediaObserver: MediaObserver, public api: APIService) {
    this.deviceData = {
      size: 'any',
      xs: false
    }

  }

  ngOnInit() {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) =>{
      this.deviceData.size = result.mqAlias;
      this.deviceData.xs = this.deviceData.size === 'xs' ? true : false;

      console.log("device size: ", this.deviceData );


    });


  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
