import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ItemApiService } from '../../service/item-api.service';
import { AuthApiService } from '../../service/auth-api.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
items: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(
    private itemApiService: ItemApiService,
    public authApiService: AuthApiService
  ) { }

  async loadItems(page: number) {
    try {
      this.currentPage = page;
      const response: any = await firstValueFrom(
        this.itemApiService.getItems(page, this.itemsPerPage)
      );
      this.items = response;
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }

  async ngOnInit() {
    await this.loadItems(1);
  }

  async onPageChange(newPage: number) {
    if (newPage > 0) {
      await this.loadItems(newPage);
    }
  }
}
