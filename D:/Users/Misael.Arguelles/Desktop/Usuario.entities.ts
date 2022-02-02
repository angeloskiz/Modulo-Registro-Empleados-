import {model, Schema,Document} from 'mongoose';
import bcry from 'bcrypt';
export interface IUsuario{
    email:string;
    nombre:string;
    puesto:string;
    autorizacion:boolean;
    NEmpleado:string;
}
export interface IUsuarioLogeo{
    Token:string;
    email?:string;
    nombre?:string;
    puesto?:string;
    autorizacion?:boolean;
}

export interface IUser extends Document{
    nombre:string;
    puesto:string;
    email:string;
    password:string;
    comparePassword:(password:string)=>Promise<boolean>
    autorizacion:boolean;
    NEmpleado:string;
}

const userSchema = new Schema({
    
    nombre:{
        type:String,
        lowercase:true,
        trim:true
    },
    puesto:{
        type:String,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    autorizacion:{
        type:Boolean,

    },
    NEmpleado:{
        type:String,
        required:true
    }
});

userSchema.pre<IUser>('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    const salt= await bcry.genSalt(10);
    const hash = await bcry.hash(user.password,salt);
    user.password= hash;
    next();
});

userSchema.methods.comparePassword= async function(password:string):Promise<boolean>{
    return await bcry.compare(password, this.password);
}

export default model<IUser>('User', userSchema);