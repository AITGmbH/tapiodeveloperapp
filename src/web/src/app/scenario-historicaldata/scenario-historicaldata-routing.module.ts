import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenarioHistoricaldataComponent } from './scenario-historicaldata.component';

const routes: Routes = [
    {
        path: '',
        component: ScenarioHistoricaldataComponent
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioHistoricaldataRoutingModule { }
