import React, { useEffect, useState } from "react";
import {
  Card, CardHeader, CardContent, CardActions,
  Avatar, Typography, IconButton, Grid,
  Box, Button, TextField, Badge, Dialog,
  DialogTitle, DialogContent, DialogActions,
  List, ListItem, ListItemText
} from "@mui/material";
import { Favorite, ChatBubbleOutline } from "@mui/icons-material";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [commentOpenFor, setCommentOpenFor] = useState(null);
  const [commentText, setCommentText] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const userId = storedUser?.id || "guest";
  const username = storedUser?.name || "Anonymous";

  useEffect(() => { fetchPosts(); }, []);

  {posts.map((post) => (
  <div key={post._id} className="post-card">
    <div className="post-header">
      <strong>{post.user?.name || "Anonymous"}</strong>
      <span>{new Date(post.createdAt).toLocaleString()}</span>
    </div>

    {post.image && (
      <img
        src={`http://localhost:5000${post.image}`}
        alt="post"
        className="post-image"
      />
    )}

    <p>{post.text}</p>

    <div className="post-actions">
      <button>Like ({post.likes?.length || 0})</button>
      <button>Comment ({post.comments?.length || 0})</button>
    </div>
  </div>
))}

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) { console.error(err); }
  };

  const handleCreate = async () => {
    if (!text.trim() && !image) return alert("Add text or image");

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("username", username);
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API}/posts`, {
        method: "POST",
        body: formData
      });
      const created = await res.json();
      setPosts(prev => [created, ...prev]);
      setText("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Could not create post");
    }
  };

  const toggleLike = async (postId) => {
    setPosts(prev => prev.map(p =>
      p._id === postId
        ? {
            ...p,
            likes: (p.likes || []).includes(userId)
              ? p.likes.filter(u => u !== userId)
              : [...(p.likes || []), userId]
          }
        : p
    ));

    await fetch(`${API}/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });
  };

  const submitComment = async () => {
    if (!commentText.trim()) return;
    const postId = commentOpenFor;

    await fetch(`${API}/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username, text: commentText })
    });

    fetchPosts();
    setCommentText("");
    setCommentOpenFor(null);
  };

  return (
    <Box sx={{ mt: 2, mb: 10 }}>
      <Card sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Create a Post</Typography>
        <TextField
          label="What's on your mind?"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginTop: 10 }}
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCreate}>
          Post
        </Button>
      </Card>

      <Grid container spacing={2}>
        {posts.map((p) => (
          <Grid item xs={12} key={p._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
              <CardHeader
                avatar={<Avatar>{(p.username || "A")[0].toUpperCase()}</Avatar>}
                title={p.username}
                subheader={new Date(p.createdAt).toLocaleString()}
              />
              {p.imageUrl && (
                <Box
                  component="img"
                  src={p.imageUrl}
                  alt="post"
                  sx={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
                />
              )}
              <CardContent>
                <Typography variant="body1">{p.text}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton onClick={() => toggleLike(p._id)}>
                  <Badge badgeContent={(p.likes || []).length} color="error">
                    <Favorite
                      color={(p.likes || []).includes(userId) ? "error" : "inherit"}
                    />
                  </Badge>
                </IconButton>
                <IconButton onClick={() => setCommentOpenFor(p._id)}>
                  <Badge badgeContent={(p.comments || []).length} color="primary">
                    <ChatBubbleOutline />
                  </Badge>
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!commentOpenFor} onClose={() => setCommentOpenFor(null)} fullWidth>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <List>
            {posts.find(p => p._id === commentOpenFor)?.comments?.map((c, i) => (
              <ListItem key={i}>
                <ListItemText primary={c.user || "Anonymous"} secondary={c.text} />
              </ListItem>
            ))}
          </List>
          <TextField
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            label="Write a comment"
            fullWidth
            multiline
            rows={2}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentOpenFor(null)}>Close</Button>
          <Button variant="contained" onClick={submitComment}>Post Comment</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
  
}
