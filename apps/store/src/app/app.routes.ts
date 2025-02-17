import { ExtraOptions, Route } from '@angular/router';
import { HomeComponent, ShopComponent } from '@faded-chapter/pages';
import { AboutUsComponent, ContactUsComponent, RefundReturnsComponent, ShippingPaymentsComponent, SizeGuideComponent, TermsPrivacyComponent } from '@faded-chapter/shared';
import { CartComponent, WishlistComponent } from '@faded-chapter/ui';

export const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',  // Scroll to the top when navigating to a new route
  anchorScrolling: 'enabled'         // Enables smooth scrolling to anchor links
};


export const appRoutes: Route[] = [
  //User Features
  {path:'wishlist', component: WishlistComponent},
  {path:'cart', component: CartComponent},
  //Pages
  {path:'home', component: HomeComponent},
  {path:'shop', component: ShopComponent},
  // Footer Components
  { path: 'size-guide', component: SizeGuideComponent },
  { path: 'shipping-payments', component: ShippingPaymentsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'refund-returns', component: RefundReturnsComponent },
  { path: 'privacy-policy', component: TermsPrivacyComponent },
  // Wild Card Routing
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
