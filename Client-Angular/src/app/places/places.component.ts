import {Component, input, OnDestroy, OnInit} from '@angular/core';
import {PlaceServices} from "../../services/place-services";
import {PlaceModel} from "../../models/place.models";
import {Subscription} from "rxjs";
import {AlertController, IonAlert, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit, OnDestroy {

  private placesSubscription = new Subscription()

  places = [] as PlaceModel[]

  constructor(private placesServices: PlaceServices, private alertController: AlertController, private x: LoadingController) {
  }


  ngOnInit() {
    this.placesSubscription = this.placesServices.getAll().subscribe(data => {
      this.places = data
    })
  }

  handleDelete(place: PlaceModel) {
    this.alertController.create({
      header: 'Delete Place',
      subHeader: 'Deleting place ' + place.name,
      buttons: [
        {
          text: 'Delete',
          handler: () => this.placesServices.remove(place.id),
        },
        'Cancel'
      ],
    })
      .then(x => x.present())
  }

  handleAdd() {
    this.alertController.create({
      header: 'Add New Place',
      buttons: [
        {
          text: 'Add',
          handler: (data) => data.name.trim().length > 0 && this.placesServices.add(data.name),
        },
        'Cancel'
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          type: 'text',
        },
      ]
    })
      .then(x => x.present())
  }

  handleEdit(place: PlaceModel) {
    this.alertController.create({
      header: 'Edit',
      buttons: [
        {
          text: 'Save',
          handler: (data) => data.name.trim().length > 0 && this.placesServices.edit(data),
        },
        'Cancel'
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          type: 'text',
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
