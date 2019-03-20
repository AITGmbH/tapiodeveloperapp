import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import * as moq from 'typemoq';
import { MachineStateService, LastKnownState } from '../scenario-machinestate-service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { It } from 'typemoq';

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;
    const machineStateServiceMock = moq.Mock.ofType<MachineStateService>();
    machineStateServiceMock
        .setup(mss => mss.getLastKnownStateFromMachine(It.isAnyString()))
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
            declarations: [ DetailComponent ],
            providers: [
                { provide: MachineStateService, useFactory: () => machineStateServiceMock.object },
                { provide: ActivatedRoute, useFactory: () => activatedRouteMock.object }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
