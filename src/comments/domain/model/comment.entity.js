export class Comment {
  constructor({ id, usuarioId, publicacionId, texto, fechaComentario }) {
    this.id = id
    this.usuarioId = usuarioId
    this.publicacionId = publicacionId
    this.texto = texto
    this.fechaComentario = fechaComentario
  }
}
