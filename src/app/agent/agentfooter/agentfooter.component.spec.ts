import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentfooterComponent } from './agentfooter.component';

describe('AgentfooterComponent', () => {
  let component: AgentfooterComponent;
  let fixture: ComponentFixture<AgentfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
