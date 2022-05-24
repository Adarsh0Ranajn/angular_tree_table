import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTreeTableModule } from 'angular-tree-table';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,AngularTreeTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
