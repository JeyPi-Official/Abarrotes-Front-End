import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {

  fetchData(url: string): Observable<any> {
    return new Observable<any>((observer) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  postData(url: string, body: any): Observable<any> {
    return new Observable<any>((observer) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  deleteData(url: string, id: string): Observable<any> {
    return new Observable<any>((observer) => {
      fetch(url + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // O response.text() dependiendo de lo que devuelva tu servidor
        })
        .then(data => {
          observer.next(data); // Donde observer es tu objeto Observable
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    }
    )
  }

  updateData(url: string, body: any): Observable<any> {
    return new Observable<any>((observer) => {
      fetch(url, {
        method: 'PUT', // O 'PATCH' dependiendo de tu API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // O response.text() dependiendo de tu API
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

}
