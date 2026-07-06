export class Post {
  constructor({ id, usuarioId, titulo, contenido, etiquetas, fechaPublicacion }) {
    this.id = id
    this.usuarioId = usuarioId
    this.titulo = titulo
    this.contenido = contenido
    this.etiquetas = etiquetas
    this.fechaPublicacion = fechaPublicacion
  }
}
