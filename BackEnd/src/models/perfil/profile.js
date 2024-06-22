import mongoose from "mongoose";
const {Shema}=mongoose

const perfilShema = new Shema({
    identificacion:{ required:true },
    name:{ required:true },
    apellido:{ required:true },
    fechaNacimiento:{ required:true },
    sexo:{ required:true },
    telefono:{ required:true },
    correo:{ required:true },
    eps:{ required:true }
});
const Perfil = mongoose.model('Perfil',perfilShema);
export default  Perfil;