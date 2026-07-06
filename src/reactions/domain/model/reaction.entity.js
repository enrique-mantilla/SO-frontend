export class Reaction {
  constructor({ id, usuarioId, publicacionId, tipo, fechaReaccion }) {
    this.id = id
    this.usuarioId = usuarioId
    this.publicacionId = publicacionId
    this.tipo = tipo
    this.fechaReaccion = fechaReaccion
  }
}
