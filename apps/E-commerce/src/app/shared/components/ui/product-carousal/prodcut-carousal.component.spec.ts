import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdcutCarousalComponent } from './prodcut-carousal.component';

describe('ProdcutCarousalComponent', () => {
  let component: ProdcutCarousalComponent;
  let fixture: ComponentFixture<ProdcutCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdcutCarousalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdcutCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
