import { Post } from "../domain/model/post.entity.js"

export function assemblePost(data) {
  return new Post({
    id: data._id,
    usuarioId: data.usuarioId,
    titulo: data.titulo,
    contenido: data.contenido,
    etiquetas: data.etiquetas,
    fechaPublicacion: data.fechaPublicacion,
  })
}

export function assemblePostList(data) {
  return data.map(assemblePost)
}
