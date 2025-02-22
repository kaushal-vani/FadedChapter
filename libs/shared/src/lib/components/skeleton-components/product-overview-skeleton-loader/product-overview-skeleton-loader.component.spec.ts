import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductOverviewSkeletonLoaderComponent } from './product-overview-skeleton-loader.component';

describe('ProductOverviewSkeletonLoaderComponent', () => {
  let component: ProductOverviewSkeletonLoaderComponent;
  let fixture: ComponentFixture<ProductOverviewSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductOverviewSkeletonLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductOverviewSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
