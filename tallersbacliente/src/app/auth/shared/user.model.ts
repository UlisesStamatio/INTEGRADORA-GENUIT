export interface Usuario {
    nombres: String;
    apellidos: String;
    email: String;
    passwordPlain: String;
    cargo: String;
    fechaRegistro?: Date;
}