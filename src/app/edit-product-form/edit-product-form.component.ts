import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import Product from '../../../models/product.model';

import { ProductServiceService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ]
})

export class EditProductFormComponent implements OnInit {

  productForm: FormGroup;

  again: Boolean = true;

  sus: Subscription = new Subscription;

  p: Product = new Product("", "", 0, 0);

  id = '';

  categorias = [
    'Alimentos',
    'Bebidas',
    'Snacks',
    'Congelados',
    'Higiénicos',
    'Limpieza',
    'Electrónicos',
    'Otros'
  ];

  constructor(fb: FormBuilder, private prodSer: ProductServiceService, private route: ActivatedRoute, private router: Router) {
    this.productForm = fb.group({
      nombre: [null, Validators.required],
      categoria: [null, Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      cantidad: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id === ":id") {
        alert('ELIGE UN PRODUCTO PARA EDITAR');
        this.router.navigateByUrl('/products-list');
      }
    });

    this.sus = this.prodSer.fetchData('https://abarrotes-t598.onrender.com/api/producto/' + this.id).subscribe((data) => {
      this.p = new Product(data.nombre, data.categoria, data.precio, data.cantidad);
      console.log(this.p);
      this.productForm.controls['nombre'].setValue(this.p.nombre);
      this.productForm.controls['precio'].setValue(this.p.precio);
      this.productForm.controls['cantidad'].setValue(this.p.cantidad);
      // this.productForm = this.p;
    })
  }

  categoriasLocales = [
    'Alimentos',
    'Bebidas',
    'Snacks',
    'Congelados',
    'Higiénicos',
    'Limpieza',
    'Otros'
  ];

  getProductToSave() {
    return new Product(this.productForm.controls['nombre'].value, this.productForm.controls['categoria'].value, this.productForm.controls['precio'].value, this.productForm.controls['cantidad'].value);
  }

  sendData(newProduct: Product) {
    const postData = newProduct; // Reemplaza con los datos que quieres enviar
    this.prodSer.updateData('https://abarrotes-t598.onrender.com/api/productos/actualizar/' + this.id, postData).subscribe(
      (response) => {
        console.log('Datos enviados:', response);
        alert('Producto Actualizado!')
        this.router.navigateByUrl('/products-list');
        this.reset();
      },
      (error) => {
        console.error('Error al enviar los datos:', error);
      }
    );
  }

  reset() {
    this.productForm.reset()
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.sendData(this.getProductToSave());
    } else {
      console.log('Formulario inválido');
    }
  }
}