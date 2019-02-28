import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import * as moq from 'typemoq';
import { MachineStateService } from '../scenario-machinestate-service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DetailComponent', () => {
    let component: DetailComponent;
    let fixture: ComponentFixture<DetailComponent>;
    const machineStateServiceMock = moq.Mock.ofType<MachineStateService>();
    machineStateServiceMock
        .setup(mss => mss.getMachines())
        .returns(
            () => of([])
        );
    const activatedRouteMock = moq.Mock.ofType<ActivatedRoute>();
    activatedRouteMock
        .setup(ar => ar.params)
        .returns(
            () => of(['123'])
        );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, SharedModule, HttpClientTestingModule ],
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
