<template>
  <article class="post-card">
    <div class="post-header">
      <span class="avatar">{{ post.usuarioId?.usuario?.charAt(0).toUpperCase() || "?" }}</span>
      <div class="post-meta">
        <strong>{{ post.usuarioId?.nombre || "Usuario" }}</strong>
        <span>@{{ post.usuarioId?.usuario }}</span>
      </div>
    </div>
    <h3 class="post-title">{{ post.titulo }}</h3>
    <p class="post-content">{{ post.contenido }}</p>
    <div class="post-tags">
      <span v-for="tag in post.etiquetas" :key="tag">#{{ tag }}</span>
    </div>
    <div class="post-actions">
      <ReactionBar :postId="post.id" />
    </div>
    <CommentList :postId="post.id" />
  </article>
</template>

<script setup>
import ReactionBar from "../../../reactions/presentation/components/ReactionBar.vue"
import CommentList from "../../../comments/presentation/components/CommentList.vue"

defineProps({
  post: { type: Object, required: true },
})
</script>

<style scoped>
.post-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.post-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}
.post-meta strong {
  display: block;
  font-size: 14px;
  color: #1a1a2e;
}
.post-meta span {
  font-size: 13px;
  color: #888;
}
.post-title {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #1a1a2e;
}
.post-content {
  font-size: 15px;
  color: #444;
  line-height: 1.6;
  margin-bottom: 10px;
}
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}
.post-tags span {
  font-size: 13px;
  color: #667eea;
  font-weight: 500;
}
.post-actions {
  border-top: 1px solid #f0f2f5;
  padding-top: 10px;
}
</style>
