import { defineStore } from "pinia"
import { ref } from "vue"
import { get, post, del } from "../../shared/http/http-client.js"
import { assemblePostList } from "../infrastructure/post.assembler.js"

export const usePostStore = defineStore("post", () => {
  const posts = ref([])
  const currentPost = ref(null)

  async function fetchFeed() {
    const data = await get(`/publicaciones`)
    posts.value = assemblePostList(data)
  }

  async function createPost(body) {
    await post(`/publicaciones`, body)
    await fetchFeed()
  }

  async function deletePost(id) {
    await del(`/publicaciones/${id}`)
    posts.value = posts.value.filter((p) => p.id !== id)
  }

  return { posts, currentPost, fetchFeed, createPost, deletePost }
})
