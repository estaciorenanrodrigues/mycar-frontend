export interface Veiculo {
  data: ItemVeiculo[];
  success: boolean;
  pagination: Pagination;
}
export interface Pagination {
hasNextPage: boolean;
hasPreviousPage: boolean;
limit: number;
page: number;
totalItems: number;
totalPages: number;
}

export interface ItemVeiculo {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

export interface GetFindByIdVeiculo {
  data: ItemVeiculo;
  success: boolean;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
