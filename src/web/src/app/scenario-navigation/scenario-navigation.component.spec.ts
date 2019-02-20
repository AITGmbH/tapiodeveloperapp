import { TestBed } from '@angular/core/testing';

import { ScenarioNavigationComponent } from './scenario-navigation.component';
import { ScenarioNavigationService, ScenarioEntry } from './scenario-navigation.service';
import { of } from 'rxjs';
import * as moq from 'typemoq';
import { By } from '@angular/platform-browser';

describe('ScenarioNavigationComponent', () => {
    it('should create two entries', () => {
        const scenarioServiceMock = moq.Mock.ofType<ScenarioNavigationService>();
        scenarioServiceMock
            .setup(ms => ms.getEntries())
            .returns(
                () => of([
                    { caption: 'one', url: '/one1' } as ScenarioEntry,
                    { caption: 'two', url: '/two2' } as ScenarioEntry])
            );

        TestBed.configureTestingModule({
            declarations: [ ScenarioNavigationComponent ],
            providers: [
                { provide: ScenarioNavigationService, useFactory: () => scenarioServiceMock.object }
            ]
        }).compileComponents();

        const fixture = TestBed.createComponent(ScenarioNavigationComponent);
        const debugElement = fixture.debugElement;

        fixture.detectChanges();

        const listElements = debugElement.queryAll(By.css('ul > li > a'));

        const firstAnchorElement = listElements[0].nativeElement as HTMLAnchorElement;
        expect(firstAnchorElement.innerText).toBe('one');
        expect(listElements[0].properties.href).toBe('/one1');

        const secondAnchorElement = listElements[1].nativeElement as HTMLAnchorElement;
        expect(secondAnchorElement.innerText).toBe('two');
        expect(listElements[1].properties.href).toBe('/two2');
    });
});
