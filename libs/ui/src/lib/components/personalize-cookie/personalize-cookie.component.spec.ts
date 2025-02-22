import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizeCookieComponent } from './personalize-cookie.component';

describe('PersonalizeCookieComponent', () => {
  let component: PersonalizeCookieComponent;
  let fixture: ComponentFixture<PersonalizeCookieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizeCookieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalizeCookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
