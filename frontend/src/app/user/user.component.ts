import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  showNotification(from, align){
    const type = ['primary'];

    var color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        icon: "pe-7s-map-marker",
        message: "Datos actualizados correctamente."
    },{
        type: type[color],
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
}


}
