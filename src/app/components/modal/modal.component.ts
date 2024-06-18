import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'modal-container',
  templateUrl: './modal.component.html',
  imports: [],
  standalone: true,
})
export class ModalComponent implements OnInit, AfterViewInit {
  modalSvc = inject(ModalService);
  cdr = inject(ChangeDetectorRef);

  @ViewChild('modalContent', { read: ViewContainerRef })
  modalContent: ViewContainerRef;

  ngOnInit() {
    console.log(this.template);
  }

  ngAfterViewInit() {
    this.modalContent.createEmbeddedView(this.template);
    this.cdr.detectChanges();
  }

  get template(): TemplateRef<any> {
    return this.modalSvc.template;
  }

  get isOpen() {
    return this.modalSvc.isOpen;
  }

  get config() {
    return this.modalSvc.config;
  }

  close() {
    this.modalSvc.close();
  }
}
