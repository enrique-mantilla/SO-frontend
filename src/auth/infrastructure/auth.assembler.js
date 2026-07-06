import { User } from "../domain/model/user.entity.js"

export function assembleUser(data) {
  return new User({
    id: data._id,
    nombre: data.nombre,
    usuario: data.usuario,
    email: data.email,
    contrasena: data.contrasena,
    bio: data.bio,
    fechaRegistro: data.fechaRegistro,
  })
}

export function assembleUserList(data) {
  return data.map(assembleUser)
}
