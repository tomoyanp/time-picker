import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './component/parent/parent.component';
import { TimePickerComponent } from './component/time-picker/time-picker.component';
import { SampleComponent } from './component/sample/sample.component';
import { SubwindowComponent } from './component/sample/subwindow/subwindow.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    TimePickerComponent,
    SampleComponent,
    SubwindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
