import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
      .subscribe(response => {
        console.log('Subs', response);
      }, error => {
        console.error(error);
      }, () => {
        console.log('El operador termino');
      });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('se ha cerrado la pag');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        }

        observer.next(salida);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        // if(contador === 2){
        //   clearInterval(intervalo);
        //   observer.error('Auxilio!');
        // }
      }, 1000);
    }).pipe(
      map(resp => {
        return resp.valor;
      }),
      filter((resp, index) => {
        if ((resp % 2) === 1) {
          return true;
        }else{
          return false;
        }
      })
    );
  }

}
