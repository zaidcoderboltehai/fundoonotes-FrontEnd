// src/app/app.module.server.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { RouterModule } from '@angular/router';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot([...serverRoutes], { initialNavigation: 'enabledBlocking' })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}