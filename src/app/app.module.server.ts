// src/app/app.module.server.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [
    // Main client application module containing components/services
    AppModule,
    
    // Angular server-side rendering infrastructure
    ServerModule,
    
    // Configure server-specific routes
    RouterModule.forRoot(serverRoutes, {
      initialNavigation: 'enabledBlocking', // Critical for SSR hydration
      useHash: false,                       // Disable hash-based routing
      scrollPositionRestoration: 'enabled'  // Optional: maintain scroll position
    })
  ],
  providers: [
    // Add server-specific providers here (if any)
  ],
  bootstrap: [AppComponent] // Root component for SSR
})
export class AppServerModule {}
