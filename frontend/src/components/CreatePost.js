import React, { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

export default function CreatePost({ onCreated }){
  const [text,setText] = useState('');
  const [image,setImage] = useState(null);
  const { user } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    if(!text && !image) return alert('Add text or image');
    let imageUrl = '';
    try{
      if(image){
        // Simple direct upload to Cloudinary if env vars are set, otherwise skip
        const cloud = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
        if(cloud && preset){
          const fd = new FormData();
          fd.append('file', image);
          fd.append('upload_preset', preset);
          const r = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/upload`, { method:'POST', body:fd });
          const data = await r.json();
          imageUrl = data.secure_url;
        } else {
          alert('Cloudinary not configured; image upload skipped. Set REACT_APP_CLOUDINARY_... in .env');
        }
      }
      const token = localStorage.getItem('token');
      const res = await api.post('/posts', { text, imageUrl, username: user?.name }, { headers: { Authorization: `Bearer ${token}` }});
      onCreated(res.data);
      setText(''); setImage(null);
    }catch(err){ alert(err?.response?.data?.msg || 'Error creating post'); }
  };

  return (
    <form onSubmit={submit} style={{ border:'1px solid #ddd', padding:10, borderRadius:8 }}>
      <textarea placeholder="What's on your mind?" value={text} onChange={e=>setText(e.target.value)} style={{ width:'100%', minHeight:60 }} />
      <div style={{ display:'flex', gap:8, marginTop:8 }}>
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
        <button type="submit">Post</button>
      </div>
    </form>
  );
}
