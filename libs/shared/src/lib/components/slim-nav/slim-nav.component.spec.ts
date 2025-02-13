import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlimNavComponent } from './slim-nav.component';

describe('SlimNavComponent', () => {
  let component: SlimNavComponent;
  let fixture: ComponentFixture<SlimNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlimNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlimNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
