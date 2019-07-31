import { ScenarioMachinestateDetailComponent } from "./detail.component";
import { MachineStateService, LastKnownState } from '../scenario-machinestate-service';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as moq from "typemoq";


describe('ScenarioMachinestateDetailComponent', () => {
    let component: ScenarioMachinestateDetailComponent;
    let fixture: ComponentFixture<ScenarioMachinestateDetailComponent>;
    const machineStateServiceMock = moq.Mock.ofType<MachineStateService>();
    machineStateServiceMock
        .setup(mss => mss.getLastKnownStateFromMachine(moq.It.isAnyString()))
        .returns(
            () => of( { } as LastKnownState)
        );
    const activatedRouteMock = moq.Mock.ofType<ActivatedRoute>();
    activatedRouteMock
        .setup(ar => ar.params)
        .returns(
            () => of(['123'])
        );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, SharedModule, HttpClientTestingModule, NgxDatatableModule ],
            declarations: [ ScenarioMachinestateDetailComponent ],
            providers: [
                { provide: MachineStateService, useFactory: () => machineStateServiceMock.object },
                { provide: ActivatedRoute, useFactory: () => activatedRouteMock.object }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScenarioMachinestateDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
