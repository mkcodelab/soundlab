import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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
  styles: `

    @keyframes modal-appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    .modal-animation {
        animation: modal-appear 0.3s ease;
    }
  `,
})
export class ModalComponent implements AfterViewInit {
  modalSvc = inject(ModalService);
  cdr = inject(ChangeDetectorRef);

  @ViewChild('modalContent', { read: ViewContainerRef })
  modalContent: ViewContainerRef;

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
