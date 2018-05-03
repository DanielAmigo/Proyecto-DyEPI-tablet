export interface Worker {
    key: string;              // Algo de firebase
    rol: string;
    identificador: string;
    nombre: string;
    tareaAsignada: string[];
    cliente: string;
    email: string;
    password: string;
}