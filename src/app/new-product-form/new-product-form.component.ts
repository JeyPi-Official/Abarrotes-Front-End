import { Component } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import Product from '../../../models/product.model';

import { ProductServiceService } from '../services/product.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrl: './new-product-form.component.scss',
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

export class NewProductFormComponent {

  productForm: FormGroup;

  again: Boolean = true;

  constructor(fb: FormBuilder, private prodSer: ProductServiceService) {
    this.productForm = fb.group({
      nombre: [null, Validators.required],
      categoria: [null, Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      cantidad: [null, [Validators.required, Validators.min(0)]],
    });
  }

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

  getProductToSave() {
    return new Product(this.productForm.controls['nombre'].value, this.productForm.controls['categoria'].value, this.productForm.controls['precio'].value, this.productForm.controls['cantidad'].value);
  }

  sendData(newProduct: Product) {
    const postData = newProduct; // Reemplaza con los datos que quieres enviar
    this.prodSer.postData('https://abarrotes-t598.onrender.com/api/productos', postData).subscribe(
      (response) => {
        console.log('Datos enviados:', response);
        alert('Producto Registrado!')
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