import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpactByColorComponent } from './impact-by-color.component';

describe('ImpactByColorComponent', () => {
  let component: ImpactByColorComponent;
  let fixture: ComponentFixture<ImpactByColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactByColorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImpactByColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
