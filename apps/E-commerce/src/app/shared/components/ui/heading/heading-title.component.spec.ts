import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingTitleComponent } from './heading-title.component';

describe('HeadingTitleComponent', () => {
  let component: HeadingTitleComponent;
  let fixture: ComponentFixture<HeadingTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadingTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
