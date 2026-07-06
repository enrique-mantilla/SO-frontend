import { defineStore } from "pinia"
import { ref } from "vue"
import { get, post, del } from "../../shared/http/http-client.js"
import { assembleReactionList } from "../infrastructure/reaction.assembler.js"

export const useReactionStore = defineStore("reaction", () => {
  const reactions = ref([])

  async function fetchReactions(postId) {
    const all = await get(`/reacciones`)
    reactions.value = assembleReactionList(
      all.filter((r) => r.publicacionId?._id === postId || r.publicacionId === postId)
    )
  }

  async function toggleReaction(body) {
    const existing = reactions.value.find(
      (r) =>
        (r.usuarioId?._id?.toString() || r.usuarioId) === body.usuarioId &&
        (r.publicacionId?._id?.toString() || r.publicacionId) === body.publicacionId &&
        r.tipo === body.tipo
    )
    if (existing) {
      await del(`/reacciones/${existing.id}`)
      reactions.value = reactions.value.filter((r) => r.id !== existing.id)
      return
    }
    await post(`/reacciones`, body)
    await fetchReactions(body.publicacionId)
  }

  return { reactions, fetchReactions, toggleReaction }
})
