import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FxBoardComponent } from './fx-board.component';

describe('FxBoardComponent', () => {
  let component: FxBoardComponent;
  let fixture: ComponentFixture<FxBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FxBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FxBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
