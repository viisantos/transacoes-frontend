import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoDasTransacoesComponent } from './resumo-das-transacoes.component';

describe('ResumoDasTransacoesComponent', () => {
  let component: ResumoDasTransacoesComponent;
  let fixture: ComponentFixture<ResumoDasTransacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoDasTransacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumoDasTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
