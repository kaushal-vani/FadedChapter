import { Route } from '@angular/router';
import { AboutUsComponent, ContactUsComponent, RefundReturnsComponent, ShippingPaymentsComponent, SizeGuideComponent, TermsPrivacyComponent } from '@faded-chapter/shared';

export const appRoutes: Route[] = [
  { path: 'size-guide', component: SizeGuideComponent },
  { path: 'shipping-payments', component: ShippingPaymentsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'refund-returns', component: RefundReturnsComponent },
  { path: 'privacy-policy', component: TermsPrivacyComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
