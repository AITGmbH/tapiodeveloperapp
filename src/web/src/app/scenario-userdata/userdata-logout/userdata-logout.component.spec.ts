import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LogoutComponent } from "./userdata-logout.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterTestingModule } from "@angular/router/testing";
import { ScenarioUserDataService } from "../scenario-userdata.service";

describe("UserdataLogoutComponent", () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      providers: [ScenarioUserDataService],
      declarations: [LogoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
