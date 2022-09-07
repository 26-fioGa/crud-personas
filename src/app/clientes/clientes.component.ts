import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
    clientes: Cliente[] = [];

    constructor(private clienteService: ClienteService) {}

    ngOnInit() {
        this.clienteService.getClientes().subscribe(
            (clientes) => this.clientes = clientes
        );
    }

    public delete(cliente: Cliente): void {
        swal.fire({
            title: 'Eliminar Cliente',
            text: `¿Está seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.clienteService.delete(cliente.id).subscribe(
                    response => {
                        // En esta línea hacemos que quite el cliente eliminado de la tabla sin tener que refrescar o llamar nuevamente al método listar
                        this.clientes = this.clientes.filter(cli => cli !== cliente)
                        swal.fire(
                            'Cliente Eliminado',
                            `Cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado exitosamente`,
                            'success'
                        )
                    }
                )
            }
        })
    };

}