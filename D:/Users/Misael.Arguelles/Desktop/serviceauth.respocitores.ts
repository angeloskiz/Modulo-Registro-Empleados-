import {IUsuario,IUsuarioLogeo} from '../entities/Usuario.entities';

export default interface AuthRepository{
    insertarUsuario(data:IUsuario):Promise<boolean>;
    getUser(usuario:string, contra:string):Promise<IUsuarioLogeo>;
    //recuperarUsuario(idUsuario:number):Promise<IAcceso>;
    eleminarUsuario(correo:string):Promise<boolean>;
    actualizarUsuario(data:IUsuario):Promise<boolean>
}