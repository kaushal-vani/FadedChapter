import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyFormatterComponent } from './currency-formatter.component';

describe('CurrencyFormatterComponent', () => {
  let component: CurrencyFormatterComponent;
  let fixture: ComponentFixture<CurrencyFormatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyFormatterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
