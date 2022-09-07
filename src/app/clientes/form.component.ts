import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
    cliente: Cliente = new Cliente();

    // Inyectamos la clase Service y el módulo Router y Activated Route
    constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {};

    ngOnInit(): void {
        this.cargarCliente()
    };

    cargarCliente(): void {
        this.activatedRoute.params.subscribe(params => {
            let id = params['id']
            if (id) {
                this.clienteService.getCliente(id).subscribe(
                    (cliente) => this.cliente = cliente
                )
            }
        })
    };

    public create(): void {
        this.clienteService.createCliente(this.cliente).subscribe(
            // Aquí va la respuesta después de guardar, como en las promesas y en este caso vamos a redireccionar a una ruta 
            cliente => {
                this.router.navigate(['/clientes'])
                swal.fire(
                    'Cliente creado',
                    `El cliente ${cliente.nombre} ha sido creado con éxito`,
                    'success'
                )
            }
        )
    };

    public update(): void {
        this.clienteService.update(this.cliente).subscribe(
            cliente => {
                this.router.navigate(['/clientes'])
                swal.fire(
                    'Cliente actualizado',
                    `El cliente ${cliente.nombre} ha sido actualizado con éxito`,
                    'success'
                )
            }
        )
    };



}