import { defineStore } from "pinia"
import { ref } from "vue"
import { get, post, del } from "../../shared/http/http-client.js"
import { assembleCommentList } from "../infrastructure/comment.assembler.js"

export const useCommentStore = defineStore("comment", () => {
  const comments = ref([])

  async function fetchComments(postId) {
    const all = await get(`/comentarios`)
    comments.value = assembleCommentList(
      all.filter((c) => c.publicacionId?._id === postId || c.publicacionId === postId)
    )
  }

  async function createComment(body) {
    await post(`/comentarios`, body)
    await fetchComments(body.publicacionId)
  }

  async function deleteComment(id) {
    await del(`/comentarios/${id}`)
    comments.value = comments.value.filter((c) => c.id !== id)
  }

  return { comments, fetchComments, createComment, deleteComment }
})
