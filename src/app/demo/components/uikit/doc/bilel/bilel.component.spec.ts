import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilelComponent } from './bilel.component';

describe('BilelComponent', () => {
  let component: BilelComponent;
  let fixture: ComponentFixture<BilelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
