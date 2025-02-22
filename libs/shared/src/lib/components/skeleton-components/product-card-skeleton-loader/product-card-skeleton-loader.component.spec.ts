import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardSkeletonLoaderComponent } from './product-card-skeleton-loader.component';

describe('ProductCardSkeletonLoaderComponent', () => {
  let component: ProductCardSkeletonLoaderComponent;
  let fixture: ComponentFixture<ProductCardSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardSkeletonLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
