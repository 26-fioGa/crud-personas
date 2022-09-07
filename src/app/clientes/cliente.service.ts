import { Injectable } from '@angular/core';
import { clientes } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    // Ruta
    private urlEndPoint: string = 'http://localhost:5555/api/clientes';
    // Cabaceras
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) {}

    getClientes(): Observable < Cliente[] > {
        return this.http.get(this.urlEndPoint).pipe(
            map((response) => response as Cliente[])
        );
    }

    createCliente(cliente: Cliente): Observable < Cliente > {
        // Después del post también se debe ingresar el tipo de objeto que retornará 
        return this.http.post < Cliente > (this.urlEndPoint, cliente, { headers: this.httpHeaders })
    }

    getCliente(id: any): Observable < Cliente > {
        return this.http.get < Cliente > (`${this.urlEndPoint}/${id}`)
    }

    update(cliente: Cliente): Observable < Cliente > {
        return this.http.put < Cliente > (`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders })
    }

    delete(id: number): Observable < Cliente > {
        return this.http.delete < Cliente > (`${this.urlEndPoint}/${id}`)
    }
}