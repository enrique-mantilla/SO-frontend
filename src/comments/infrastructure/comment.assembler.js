import { Comment } from "../domain/model/comment.entity.js"

export function assembleComment(data) {
  return new Comment({
    id: data._id,
    usuarioId: data.usuarioId,
    publicacionId: data.publicacionId,
    texto: data.texto,
    fechaComentario: data.fechaComentario,
  })
}

export function assembleCommentList(data) {
  return data.map(assembleComment)
}
