import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subscription } from 'rxjs';

import { ProductServiceService } from '../services/product.service';

// TODO: Replace this with your own data model type
export interface ProductsListItem {
  _id: number;
  nombre: string;
  categoria: string;
  precio: number;
  cantidad: number;
}

var products: any[] = [];
var subscription: Subscription;

// TODO: replace this with real data from your application
const proSer = new ProductServiceService();
subscription = proSer.fetchData('https://abarrotes-t598.onrender.com/api/productos').subscribe(
  (data) => {
    products = data;
  },
  (error) => {
    console.error('Error fetching elements:', error);
  }
);;

/**
 * Data source for the ProductsList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProductsListDataSource extends DataSource<ProductsListItem> {
  data: ProductsListItem[] = products;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProductsListItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProductsListItem[]): ProductsListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProductsListItem[]): ProductsListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case '_id': return compare(+a._id, +b._id, isAsc);
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'categoria': return compare(a.categoria, b.categoria, isAsc);
        case 'precio': return compare(+a.precio, +b.precio, isAsc);
        case 'cantidad': return compare(a.cantidad, b.cantidad, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
