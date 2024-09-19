import {Component, input, OnDestroy, OnInit} from '@angular/core';
import {PlaceServices} from "../../services/place-services";
import {PlaceModel} from "../../models/place.models";
import {Subscription} from "rxjs";
import {AlertController, IonAlert, LoadingController} from "@ionic/angular";
import {LanguageServices} from "../../services/language-services";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit, OnDestroy {

  private placesSubscription = new Subscription()

  places = [] as PlaceModel[]

  constructor(private placesServices: PlaceServices,
              private alertController: AlertController,
              private langServices: LanguageServices) {
  }


  ngOnInit() {
    this.placesSubscription = this.placesServices.getAll().subscribe(data => {
      this.places = data
    })
  }

  handleDelete(place: PlaceModel) {
    this.alertController.create({
      header: this.langServices.gt('Places.Delete'),
      subHeader: `${this.langServices.gt('Places.DeleteMsg')} ${place.name}`,
      buttons: [
        {
          text: this.langServices.gt('Options.Delete'),
          handler: () => this.placesServices.remove(place.id),
        },
        this.langServices.gt('Options.Cancel')
      ],
    })
      .then(x => x.present())
  }

  handleAdd() {
    this.alertController.create({
      header: this.langServices.gt('Options.Add'),
      buttons: [
        {
          text: this.langServices.gt('Options.Add'),
          handler: (data) => data.name.trim().length > 0 && this.placesServices.add(data.name),
        },
        this.langServices.gt('Options.Cancel')
      ],
      inputs: [
        {
          name: 'name',
          placeholder: this.langServices.gt('Options.Name'),
          type: 'text',
        },
      ]
    })
      .then(x => x.present())
  }

  handleEdit(place: PlaceModel) {
    this.alertController.create({
      header: this.langServices.gt('Places.Edit'),
      buttons: [
        {
          text: this.langServices.gt('Options.Save'),
          handler: (data) => data.name.trim().length > 0 && this.placesServices.edit(data),
        },
        this.langServices.gt('Options.Cancel')
      ],
      inputs: [
        {
          name: 'name',
          placeholder: this.langServices.gt('Options.Name'),
          type: 'text',
          label: this.langServices.gt('Options.Name'),
          value: place.name,
        },
        {
          name: 'id',
          type: 'text',
          cssClass: 'hidden',
          value: place.id,
        }
      ]
    })
      .then(x => x.present())
  }

  ngOnDestroy() {
    this.placesSubscription.unsubscribe()
  }
}
