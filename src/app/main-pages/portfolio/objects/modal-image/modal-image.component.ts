import { Component, Input, OnInit, OnDestroy, Injector } from '@angular/core';
import { ModalService } from 'app/app-services/modal.service';

@Component({
  selector: 'modal-image',
  templateUrl: './modal-image.component.html'
})
export class ModalImageComponent implements OnInit {

  imgFullPath: string;
  imgCaption: string;

  constructor(private modalService: ModalService, private injector: Injector) { 
    this.imgFullPath = this.injector.get('imgFullPath');
    this.imgCaption = this.injector.get('imgCaption');
  }

  ngOnInit() { }

  openModalImage(){ this.modalService.open('modalImage'); }
  closeModalImage(){ this.modalService.close('modalImage'); }
}

