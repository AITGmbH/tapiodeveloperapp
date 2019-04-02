import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenarioMachinestateComponent } from './scenario-machinestate.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
    {
        path: '',
        component: ScenarioMachinestateComponent
    },
    {
        path: ':tmid',
        component: ScenarioMachinestateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioMachinestateRoutingModule { }
