import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentComponent } from './component/parent/parent.component';
import { SampleComponent } from './component/sample/sample.component';
import { SubwindowComponent } from './component/sample/subwindow/subwindow.component';

const routes: Routes = [
  { path: '', component: ParentComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'sample', component: SampleComponent},
  { path: 'hoge', component: SampleComponent},
  { path: 'subwindow', component: SubwindowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
