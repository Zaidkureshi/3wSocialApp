import React from 'react';
import api from '../api/axios';

export default function PostCard({ post, currentUser, onUpdate }){
  const like = async () => {
    try{
      const token = localStorage.getItem('token');
      const res = await api.post(`/posts/${post._id}/like`, {}, { headers: { Authorization: `Bearer ${token}` }});
      onUpdate(post._id, { likes: Array(res.data.likesCount).fill(null) }); // simple count update
    }catch(err){ console.error(err); }
  };

  const addComment = async () => {
    const text = prompt('Comment text:');
    if(!text) return;
    try{
      const token = localStorage.getItem('token');
      const res = await api.post(`/posts/${post._id}/comment`, { text, username: currentUser?.name }, { headers: { Authorization: `Bearer ${token}` }});
      onUpdate(post._id, { comments: Array(res.data.commentsCount).fill(null) });
    }catch(err){ console.error(err); }
  };

  return (
    <div style={{ border:'1px solid #eee', padding:12, borderRadius:8 }}>
      <div style={{ fontWeight:600 }}>{post.username}</div>
      <div style={{ color:'#555', marginTop:6 }}>{post.text}</div>
      {post.imageUrl && <img src={post.imageUrl} alt="" style={{ width:'100%', marginTop:8, borderRadius:6 }} />}
      <div style={{ display:'flex', gap:8, marginTop:8 }}>
        <button onClick={like}>Like ({post.likes?.length || 0})</button>
        <button onClick={addComment}>Comment ({post.comments?.length || 0})</button>
      </div>
    </div>
  );
}
