export interface Empleado {
    key: string;              // Algo de firebase
    rol: string;
    identificador: string;
    nombre: string;
    tareaAsignada: string[];
    cliente: string;
    password: string;
}