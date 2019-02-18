import { Injectable, Injector } from '@angular/core';
import { GetsService } from './gets.service';
import { PostsService } from './posts.service';
import { PatchsService } from './patchs.service';
import { DeletesService } from './deletes.service'

@Injectable()
export class HttpfacadeService {

  private _getsService: GetsService;
  public get getsService(): GetsService {
    if(!this._getsService){
      this._getsService = this.injector.get(GetsService)
    }
    return this._getsService
  }

  private _postsService: PostsService;
  public get postsService(): PostsService {
    if(!this._postsService){
      this._postsService = this.injector.get(PostsService)
    }
    return this._postsService
  }

  private _patchsService: PatchsService;
  public get patchsService(): PatchsService {
    if(!this._patchsService){
      this._patchsService = this.injector.get(PatchsService)
    }
    return this._patchsService
  }

  private _deletesService: DeletesService;
  public get deletesService(): DeletesService {
    if(!this._deletesService){
      this._deletesService = this.injector.get(DeletesService)
    }
    return this._deletesService
  }

  constructor(
    private injector: Injector
  ) { }
}
