import { ExtraOptions, Route } from '@angular/router';

export const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appRoutes: Route[] = [
  // 🛒 User Features
  { path: 'cart', loadComponent: () => import('@faded-chapter/ui').then(m => m.CartComponent) },
  { 
    path: 'wishlist', 
    loadComponent: () => import('@faded-chapter/ui').then(m => m.WishlistComponent), 
    canActivate: [() => import('@faded-chapter/auth').then(m => m.AuthGuard)] 
  },

  // 📄 Pages
  { path: 'impact-by-color', loadComponent: () => import('@faded-chapter/pages').then(m => m.ImpactByColorComponent) },
  { path: 'collaboration', loadComponent: () => import('@faded-chapter/pages').then(m => m.CollaborationsComponent) },
  { path: 'home', loadComponent: () => import('@faded-chapter/pages').then(m => m.HomeComponent) },
  { path: 'new-arrivals', loadComponent: () => import('@faded-chapter/pages').then(m => m.NewArrivalsComponent) },
  { path: 'shop', loadComponent: () => import('@faded-chapter/pages').then(m => m.ShopComponent) },
  { path: 'product/:slug', loadComponent: () => import('@faded-chapter/ui').then(m => m.ProductOverviewComponent) },

  // 📌 Footer Components
  { path: 'about-us', loadComponent: () => import('@faded-chapter/shared').then(m => m.AboutUsComponent) },
  { path: 'contact-us', loadComponent: () => import('@faded-chapter/shared').then(m => m.ContactUsComponent) },
  { path: 'privacy-policy', loadComponent: () => import('@faded-chapter/shared').then(m => m.TermsPrivacyComponent) },
  { path: 'refund-returns', loadComponent: () => import('@faded-chapter/shared').then(m => m.RefundReturnsComponent) },
  { path: 'shipping-payments', loadComponent: () => import('@faded-chapter/shared').then(m => m.ShippingPaymentsComponent) },
  { path: 'size-guide', loadComponent: () => import('@faded-chapter/shared').then(m => m.SizeGuideComponent) },

  // 🎭 User Experience Components
  { path: 'personalize-cookie', loadComponent: () => import('@faded-chapter/ui').then(m => m.PersonalizeCookieComponent) },

  // 🔐 Authentication Components
  { path: 'sign-up', loadComponent: () => import('@faded-chapter/auth').then(m => m.SignupComponent) },
  { path: 'log-in', loadComponent: () => import('@faded-chapter/auth').then(m => m.LoginComponent) },

  // 👤 **Protected User Routes**
  {
    path: 'profile',
    canActivate: [() => import('@faded-chapter/auth').then(m => m.AuthGuard)],
    children: [
      { path: '', loadComponent: () => import('@faded-chapter/user-dashboard').then(m => m.UserProfileComponent) },
      { path: 'order-history', loadComponent: () => import('@faded-chapter/user-dashboard').then(m => m.OrderHistoryComponent) }
    ]
  },

  // 🛠 **Admin Dashboard (Protected)**
  {
    path: 'admin',
    canActivate: [() => import('@faded-chapter/auth').then(m => m.AuthGuard)],
    data: { isAdmin: true },
    children: [
      { 
        path: '', 
        loadComponent: () => import('@faded-chapter/pages')
          .then(m => m.AdminDashboardComponent), 
        data: { isAdmin: true }
      },
      { path: 'products', loadComponent: () => import('@faded-chapter/admin').then(m => m.ProductManagementComponent) }
    ]
  },

  // 🔀 **Wild Card Routing**
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
