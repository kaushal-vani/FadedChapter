import { ExtraOptions, Route } from '@angular/router';
import { LoginComponent, SignupComponent } from '@faded-chapter/auth';
import {
  CollaborationsComponent,
  HomeComponent,
  ImpactByColorComponent,
  NewArrivalsComponent,
  ShopComponent,
} from '@faded-chapter/pages';
import {
  AboutUsComponent,
  ContactUsComponent,
  RefundReturnsComponent,
  ShippingPaymentsComponent,
  SizeGuideComponent,
  TermsPrivacyComponent,
} from '@faded-chapter/shared';
import {
  CartComponent,
  PersonalizeCookieComponent,
  ProductOverviewComponent,
  WishlistComponent,
} from '@faded-chapter/ui';

export const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top', // Scroll to the top when navigating to a new route
  anchorScrolling: 'enabled', // Enables smooth scrolling to anchor links
};

export const appRoutes: Route[] = [
  //User Features
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  //Pages
  { path: 'impact-by-color', component: ImpactByColorComponent },
  { path: 'collaboration', component: CollaborationsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product/:slug', component: ProductOverviewComponent },
  // Footer Components
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacy-policy', component: TermsPrivacyComponent },
  { path: 'refund-returns', component: RefundReturnsComponent },
  { path: 'shipping-payments', component: ShippingPaymentsComponent },
  { path: 'size-guide', component: SizeGuideComponent },
  //User Experience Components
  { path: 'personalize-cookie', component: PersonalizeCookieComponent },
  //Authentication Components
  { path: 'sign-up', component: SignupComponent },
  { path: 'log-in', component: LoginComponent },

  // Wild Card Routing
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
