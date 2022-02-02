import { IUsuario } from '../entities/Usuario.entities';
import AuthRepository from "../Repositores/serviceauth.respocitores";


export default class AuthInteractors{


    constructor(private readonly authRepository:AuthRepository){}

    async InsertarUsuario(data:IUsuario){
        const respuesta = await this.authRepository.insertarUsuario(data);
        return respuesta;
    }

    async IniciarSesion(usuario:string, passwird:string){
        const respuesta = await this.authRepository.getUser(usuario,passwird);
        return respuesta;
    }
    async EleminarUsuario(correo:string){
        const respuesta = await this.authRepository.eleminarUsuario(correo);
        return respuesta;
    }
    async ActualizarUsuario(data:IUsuario){
        const respuesta = await this.authRepository.actualizarUsuario(data);
        return respuesta;
    }
    
    /*async RecuperarUsuario(id:number){
        const respuesta = await this.authRepository.recuperarUsuario(id);
        return respuesta;
    }*/
}