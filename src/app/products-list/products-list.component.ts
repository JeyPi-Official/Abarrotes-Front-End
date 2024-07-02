import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ProductsListDataSource, ProductsListItem } from './products-list-datasource';
import { MatButtonModule } from '@angular/material/button';
import { ProductServiceService } from '../services/product.service';
import Product from '../../../models/product.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule]
})
export class ProductsListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductsListItem>;
  // dataSource = new ProductsListDataSource();

  dataSource = new MatTableDataSource<any>(); // Define el origen de datos para la tabla
  displayedColumns: string[] = ['_id', 'nombre', 'categoria', 'precio', 'cantidad', 'opciones']; // Define las columnas que se mostrarán

  constructor(private proSer: ProductServiceService, private router: Router) { }

  ngAfterViewInit(): void {
    console.log(this.dataSource)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData(): void {
    this.proSer.fetchData('https://abarrotes-t598.onrender.com/api/productos').subscribe(
      (data) => {
        this.dataSource.data = data; // Asigna los datos al origen de datos de la tabla
        this.dataSource.paginator = this.paginator; // Asigna el paginador al origen de datos
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteRow(id: string) {
    this.proSer.deleteData('https://abarrotes-t598.onrender.com/api/producto/eliminar/', id).subscribe(
      (data) => {
        this.dataSource.data = data; // Asigna los datos al origen de datos de la tabla
        this.dataSource.paginator = this.paginator; // Asigna el paginador al origen de datos
        alert('Producto Eliminado!');
        this.loadTableData();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  editRow(id: string) {
    // this.proSer.updateData('https://abarrotes-t598.onrender.com/api/productos/actualizar/' + id, body).subscribe(
    //   (data) => {
    //     this.dataSource.data = data; // Asigna los datos al origen de datos de la tabla
    //     this.dataSource.paginator = this.paginator; // Asigna el paginador al origen de datos
    //     alert('Producto Actualizado!');
    //     this.loadTableData();
    //   },
    //   (error) => {
    //     console.error('Error fetching data:', error);
    //   }
    // );
    this.router.navigate(['/edit-product/' + id]);
  }
}
