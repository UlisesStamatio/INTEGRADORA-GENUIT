export interface Usuario {
    nombres: String;
    apellidos: String;
    email: String;
    passwordPlain: String;
    cargo: String;
    fechaRegistro?: Date;
}
export interface UsuarioPage {
    content:          Usuario[];
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