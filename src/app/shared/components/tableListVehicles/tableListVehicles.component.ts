import { Component, EventEmitter, Input, Output, ViewChild, OnDestroy, AfterViewInit } from "@angular/core";
import { Veiculo } from "../../models/veiculo.model";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-table-list-vehicles',
    templateUrl: './tableListVehicles.component.html',
    styleUrls: ['./tableListVehicles.component.scss']
})

export class TableListVehiclesComponent implements AfterViewInit, OnDestroy {
    @Input() isLoading: boolean = false;
    @Input() veiculos: Veiculo = {
        data: [],
        success: false,
        pagination: {
            hasNextPage: false,
            hasPreviousPage: false,
            limit: 0,
            page: 0,
            totalItems: 0,
            totalPages: 0
        }
    };
    @Input() getCorHex: (cor: string) => string = () => '';
    @Input() pageIndex: number = 0;
    @Input() pageSize: number = 10;
    @Output() editVeiculoEvent = new EventEmitter<number>();
    @Output() deleteVeiculoEvent = new EventEmitter<number>();
    @Output() pageChangeEvent = new EventEmitter<PageEvent>();
    @Output() sortChangeEvent = new EventEmitter<{ sortBy: string; sortOrder: 'asc' | 'desc' }>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    private paginatorSubscription?: Subscription;
    private sortSubscription?: Subscription;

    displayedColumns: string[] = ['id', 'marca', 'modelo', 'ano', 'placa', 'cor', 'tipo', 'editar', 'excluir'];

    ngAfterViewInit() {
        if (this.paginator) {
            this.paginatorSubscription = this.paginator.page.subscribe((event: PageEvent) => {
                this.pageChangeEvent.emit(event);
            });
        }
        if (this.sort) {
            this.sortSubscription = this.sort.sortChange.subscribe((sort: Sort) => {
                const sortBy = sort.active;
                const sortOrder: 'asc' | 'desc' = (sort.direction === 'asc' || sort.direction === 'desc')
                    ? sort.direction
                    : 'asc';
                if (sortBy) {
                    this.sortChangeEvent.emit({ sortBy, sortOrder });
                }
            });
        }

    }

    ngOnDestroy() {
        if (this.paginatorSubscription) {
            this.paginatorSubscription.unsubscribe();
        }
        if (this.sortSubscription) {
            this.sortSubscription.unsubscribe();
        }
    }
}