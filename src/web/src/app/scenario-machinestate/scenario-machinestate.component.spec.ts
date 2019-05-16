import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioMachinestateComponent } from './scenario-machinestate.component';
import * as moq from 'typemoq';
import { MachineStateService } from './scenario-machinestate-service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScenarioMachinestateDetailComponent } from './detail/detail.component';

describe('ScenarioMachinestateComponent', () => {
    let component: ScenarioMachinestateComponent;
    let fixture: ComponentFixture<ScenarioMachinestateComponent>;
    const machineStateServiceMock = moq.Mock.ofType<MachineStateService>();
    machineStateServiceMock
        .setup(mss => mss.getMachines())
        .returns(
            () => of([])
        );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, SharedModule, HttpClientTestingModule ],
            declarations: [ ScenarioMachinestateComponent, ScenarioMachinestateDetailComponent ],
            providers: [
                { provide: MachineStateService, useFactory: () => machineStateServiceMock.object }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioMachinestateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
