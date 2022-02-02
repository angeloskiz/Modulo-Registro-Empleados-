import User,{ IUsuario,IUser,IUsuarioLogeo } from "../Core/entities/Usuario.entities";
import AuthRepository from "../Core/Repositores/serviceauth.respocitores";
import '../../MongoDb/database';
import Authentication from "../../Middlewares/authentication";


export default class DalAuth implements AuthRepository {
  
  public async insertarUsuario(data:IUsuario):Promise<boolean> {

    const user = await User.findOne({email:data.email});
    if(user){
      return false;
    }
    const newUser = new User(data);
    newUser.save();
     return true;
  }
  public async getUser(usuario: string, contra: string): Promise<IUsuarioLogeo> {
    const user = await User.findOne({NEmpleado:usuario});
    if(!user){
      const datos:IUsuarioLogeo={
        Token:''
      }
      return datos;
    }
    /*const isMatch= await user.comparePassword(contra);
    if(!isMatch){
      const datos:IUsuarioLogeo={
        Token:''
      }
      return datos;
    }*/
    const datos:IUsuarioLogeo={
      email:user.email,
    nombre:user.nombre,
    puesto:user.puesto,
    autorizacion:user.autorizacion,
      Token:Authentication.instanceWEB.GenerarToken()
    }
    return datos;
  }
  public async  eleminarUsuario(correo: string): Promise<boolean> {
      const user = await User.findOne({email:correo});
      if(!user){
        return false;
      }
      await User.deleteOne({email:correo});
      return true;
  }
  public async actualizarUsuario(data: IUsuario): Promise<boolean> {
    const user = await User.findOne({email:data.email});
    if(!user){
      return false;
    }console.log(data);
    // actualizar por puesto
    User.updateOne({"email": user.email},{
      $set:{"puesto":data.puesto}
    }).then(result => console.log(result));
    return true;
  }

}
