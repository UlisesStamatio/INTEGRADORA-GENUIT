
export interface LibroPage {
    content:          Libro[];
    pageable:         Pageable;
    totalElements:    number;
    last:             boolean;
    totalPages:       number;
    size:             number;
    number:           number;
    numberOfElements: number;
    sort:             Sort;
    first:            boolean;
    empty:            boolean;
}

export interface Libro {
    id:                 number;
    titulo:             string;
    slug:               null | string;
    descripcion:        null | string;
    rutaPortada:        null | string;
    precio:             number;
    fechaCreacion:      Date;
    fechaActualizacion: Date | null;
    urlPortada:         string;
    cupos: number;
    equipos: number;
    proyectores: number;
    direccion: number;
    status: number;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}