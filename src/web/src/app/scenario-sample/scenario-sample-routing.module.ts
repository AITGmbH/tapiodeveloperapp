import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenarioSampleComponent } from './scenario-sample.component';

const routes: Routes = [
    {
        path: 'scenario-sample',
        component: ScenarioSampleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioSampleRoutingModule { }
