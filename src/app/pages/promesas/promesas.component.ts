import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres()
      .then(
        () => console.log('Termino!')
      )
      .catch(error => console.log(error));

  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;
        console.log(contador);
        if (contador === 3) {
          resolve();
          clearInterval(intervalo);
        }
      }, 1000);
    });

  }

}
