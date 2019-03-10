import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'scenario-sample',
        loadChildren: './scenario-sample/scenario-sample.module#ScenarioSampleModule'
    },
    {
        path: 'scenario-machineoverview',
        loadChildren: './scenario-machineoverview/scenario-machineoverview.module#ScenarioMachineoverviewModule'
    },
    {
        path: 'scenario-historicaldata',
        loadChildren: './scenario-historicaldata/scenario-historicaldata.module#ScenarioHistoricaldataModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
