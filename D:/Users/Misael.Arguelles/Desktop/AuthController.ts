import express, { Request, Response} from "express";
import Controller from "../../Interfaces/controllers.interfaces";
import Authentication from "../../Middlewares/authentication";
import authInteractors from '../Core/Interactors';
import { IUsuario } from '../Core/entities/Usuario.entities';


// esta es nuestra capa de rutas
export default class AuthController implements Controller {
  public path = "/auth";
  public router = express.Router();
  public server = null;
  public validacion = Authentication;
  public conexion = null;

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(`${this.path}/:usuario`, this.logeoUser);
    this.router.post(`${this.path}`,this.InsertarUsuario);
    this.router.delete(`${this.path}/:correo`, this.EleminarUsuario);
    this.router.patch(`${this.path}`,this.actualizarUsuario);
  }
  logeoUser =  async (req: Request, res: Response) => {
    const { usuario, contra } = req.params;
    try{
      const respuesta = await authInteractors.IniciarSesion(usuario,contra);
      return res.status(201).json({
        ok:true,
        datos:[respuesta]
      });
    }catch(e:any){
        res.json({status:'error', message:e.message});
    }
  };
  InsertarUsuario= async (req:Request,res:Response)=>{
    try{
      const data:IUsuario=req.body;
      if(!data.email){
        return res.json({msg:'Por Favor Enviar tus Datos'});
      }
      const respuesta = await authInteractors.InsertarUsuario(data);
      if(respuesta){
        return res.status(201).json({
          ok:true,
          msg:'Usuario Insertado Correctamente'
        });
      }
      res.status(400).json({
        ok:false,
        msg:'Usuario no Creado'
      });
    }catch(e:any){
      res.json({status:'error', message:e.message});
    }
  }
  EleminarUsuario= async (req:Request, res:Response)=>{
    try{
      const { correo} = req.params;
      if(!correo){
        return res.status(500).json({msg:'Dato Vacio'});
      }
      const respuesta = await authInteractors.EleminarUsuario(correo);
      if(respuesta){
        return res.status(201).json({
          ok:true,
          msg:'Usuario Eleminado Correctamente'
        });
      }
      return res.status(400).json({
        ok:false,
        msg:'Usuario no Eleminado'
      });
    }catch(e:any){
      res.json({status:'error', message:e.message});
    }
  }
  actualizarUsuario=async(req:Request,res:Response)=>{
    try{
      const data:IUsuario=req.body;
      if(!data.email){
        return res.json({msg:'Por Favor Enviar tus Datos'});
      }
      const respuesta = await authInteractors.ActualizarUsuario(data);
      if(respuesta){
        return res.status(201).json({
          ok:true,
          msg:'Usuario Actualizado Correctamente'
        });
      }
      res.status(400).json({
        ok:false,
        msg:'Usuario no Actualizado'
      });
    }catch(e:any){
      res.json({status:'error', message:e.message});
    }
  }
}
