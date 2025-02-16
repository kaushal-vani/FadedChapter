import { Route } from '@angular/router';
import { HomeComponent } from '@faded-chapter/pages';
import { AboutUsComponent, ContactUsComponent, RefundReturnsComponent, ShippingPaymentsComponent, SizeGuideComponent, TermsPrivacyComponent } from '@faded-chapter/shared';

export const appRoutes: Route[] = [
  //Pages
  {path:'home', component: HomeComponent},
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
