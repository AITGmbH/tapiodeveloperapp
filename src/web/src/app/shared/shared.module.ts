import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenarioComponent } from './components/scenario/scenario.component';

@NgModule({
  declarations: [ ScenarioComponent ],
  imports: [
    CommonModule
  ],
  exports: [
      ScenarioComponent
  ]
})
export class SharedModule { }
