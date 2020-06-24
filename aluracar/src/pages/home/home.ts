import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';

import { Carro } from '../../modelos/carro';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifeCycles } from '../../utils/ionic/nav/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifeCycles{

  public carros: Carro[];

  constructor(public navCtrl: NavController,
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController,
              private _carrosServiceProvider: CarrosServiceProvider) {}
  
  ionViewDidLoad(): void {
    let loading = this._loadingCtrl.create({
      content: 'Carregando carros...'
    });

    loading.present();

    this._carrosServiceProvider
        .lista()
        .subscribe(
          (carros) => {
            this.carros = carros;
            loading.dismiss();
          },
          (err: HttpErrorResponse) => {
            loading.dismiss();
            this._alertCtrl.create({
              title: 'Falha na conexão.',
              subTitle: 'Não foi possível carregar a lista de carros, tente novamente mais tarde!',
              buttons: [{
                text: 'OK'
              }]
            }).present();
          }
        );
  }

}
