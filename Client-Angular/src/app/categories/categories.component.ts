import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryServices} from "../../services/category-services";
import {CategoryModel} from "../../models/category-models";
import {Subscription} from "rxjs";
import {AlertController} from "@ionic/angular";
import {LanguageServices} from "../../services/language-services";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private catSubscriptions = new Subscription()

  categories: CategoryModel[] = []

  constructor(private catServices: CategoryServices,
              private alertController: AlertController,
              private ls: LanguageServices) {
  }

  ngOnInit() {
    this.catSubscriptions = this.catServices.getAll().subscribe(data => {
      this.categories = data
    })
  }

  ngOnDestroy() {
    this.catSubscriptions.unsubscribe()
  }

  async handleAdd() {
    this.alertController.create({
      header: this.ls.gt('Categories.Add'),
      buttons: [{
        text: this.ls.gt('Options.Add'),
        handler: data => this.catServices.add(data.name)
      },
        this.ls.gt('Options.Cancel')
      ],
      inputs: [{
        name: 'name',
        placeholder: this.ls.gt('Options.Name'),
        type: 'text',
        label: this.ls.gt('Options.Name'),
      }]
    })
      .then(x => x.present())
  }

  async handleEdit(category: CategoryModel) {
    this.alertController.create({
      header: this.ls.gt('Categories.Edit'),
      buttons: [
        {
          text: this.ls.gt('Options.Save'),
          handler: (data) => data.name.trim().length > 0 && this.catServices.edit(data),
        },
        this.ls.gt('Options.Cancel')
      ],
      inputs: [
        {
          name: 'name',
          placeholder: this.ls.gt('Options.Name'),
          type: 'text',
          label: this.ls.gt('Options.Name'),
          value: category.name,
        },
        {
          name: 'id',
          type: 'text',
          cssClass: 'hidden',
          value: category.id,
        }
      ]
    })
      .then(x => x.present())
  }

  async handleDelete(category: CategoryModel) {
    this.alertController.create({
      header: this.ls.gt('Categories.Delete'),
      subHeader: `${this.ls.gt('Categories.DeleteMsg')} ${category.name}`,
      buttons: [
        {
          text: this.ls.gt('Options.Delete'),
          handler: () => this.catServices.remove(category.id),
        },
        this.ls.gt('Options.Cancel')
      ],
    })
      .then(x => x.present())
  }
}
