import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalculatorService } from 'app/shared/services/calculator.service';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { combineAll } from 'rxjs-compat/operator/combineAll';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  sumandoUno: Number;
  sumandoDos: Number;
  resultado: any;
  mostrarResultado: boolean;

  constructor(private service: CalculatorService ) { }

  ngOnInit(): void {
    

  }

  desactivaresultado():void{
  this.mostrarResultado = false;

  }

  sumar(){

    this.mostrarResultado = true;
    console.log('supuestamente deberia sumar');

    let numerouno = this.sumandoUno;
    let numerodos = this.sumandoDos;
  
    console.log(numerouno);
    console.log(numerodos);

    this.service.getsuma(numerouno, numerodos).subscribe(data=>
     this.resultado=data);

  }


}
