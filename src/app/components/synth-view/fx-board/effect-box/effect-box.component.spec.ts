import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectBoxComponent } from './effect-box.component';

describe('EffectBoxComponent', () => {
  let component: EffectBoxComponent;
  let fixture: ComponentFixture<EffectBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EffectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
