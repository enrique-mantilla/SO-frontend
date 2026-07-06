import { Reaction } from "../domain/model/reaction.entity.js"

export function assembleReaction(data) {
  return new Reaction({
    id: data._id,
    usuarioId: data.usuarioId,
    publicacionId: data.publicacionId,
    tipo: data.tipo,
    fechaReaccion: data.fechaReaccion,
  })
}

export function assembleReactionList(data) {
  return data.map(assembleReaction)
}
