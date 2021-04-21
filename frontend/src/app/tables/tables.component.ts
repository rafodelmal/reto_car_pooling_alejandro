import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'app/shared/services/reservas.service';
import { User } from '../login/user';
import { data } from 'jquery';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;

    nombre: any;
    documento: any;
    telefono: any;
    total: any;

  constructor(private service: ReservasService) { }


  ngOnInit(): void {

    var user: User;
    let carpooler = 0
    let respuesta;

    console.log(carpooler)

    this.service.getReservas(carpooler).subscribe(data=>{
        respuesta = data;

        console.log(respuesta)

    });
    

   let tabla;
      this.tableData1 = {
          headerRow: [ 'Numero', 'Nombre', 'Cedula', 'Telefono', 'Direccion'],
          dataRows: [
             
          ]
      };

  }




}
