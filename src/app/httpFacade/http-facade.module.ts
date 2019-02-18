import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetsService } from './gets.service'
import { HttpfacadeService } from './httpfacade.service'
import { PostsService } from './posts.service';
import { PatchsService } from './patchs.service';
import { DeletesService } from './deletes.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpfacadeService,

    GetsService,
    PostsService,
    PatchsService,
    DeletesService
  ]
})
export class HttpFacadeModule { }
