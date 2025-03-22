import React, { useState } from 'react';
import "../styles/styles.css";

function CommunityForum() {
  const categories = ["General", "Tech", "Events", "Clubs", "Announcements"];
  
  const [discussions, setDiscussions] = useState([
    { id: 1, title: "Best AI tools for Tech Clubs?", author: "Alice", category: "Tech", replies: 5, upvotes: 10, downvotes: 2 },
    { id: 2, title: "How to host a successful hackathon?", author: "Bob", category: "Events", replies: 8, upvotes: 15, downvotes: 1 },
    { id: 3, title: "Tips for managing multi-chapter clubs", author: "Charlie", category: "Clubs", replies: 3, upvotes: 7, downvotes: 0 }
  ]);
  
  const [newPost, setNewPost] = useState({ title: "", author: "", category: "General" });
  const [search, setSearch] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.author) {
      setDiscussions([...discussions, { id: discussions.length + 1, ...newPost, replies: 0, upvotes: 0, downvotes: 0 }]);
      setNewPost({ title: "", author: "", category: "General" });
    }
  };

  const handleVote = (id, type) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === id) {
        return { ...discussion, [type]: discussion[type] + 1 };
      }
      return discussion;
    }));
  };

  return (
    // <div className="container-fluid px-4 mt-5">
    //   <h1 className="text-center mb-4">💬 Community Forum</h1>
    //   <p className="text-center">Discuss, share, and collaborate with fellow tech enthusiasts!</p>

    //   {/* Search Bar */}
    //   <div className="col-lg-8 mx-auto mb-4">
    //     <input
    //       type="text"
    //       className="form-control"
    //       placeholder="Search discussions..."
    //       value={search}
    //       onChange={(e) => setSearch(e.target.value)}
    //     />
    //   </div>

    //   {/* Trending Discussions */}
    //   <div className="col-lg-8 mx-auto">
    //     <h3>🔥 Trending Discussions</h3>
    //     <ul className="list-group">
    //       {discussions.filter(discussion => discussion.title.toLowerCase().includes(search.toLowerCase())).map(discussion => (
    //         <li key={discussion.id} className="list-group-item d-flex justify-content-between align-items-center">
    //           <div>
    //             <strong>{discussion.title}</strong>
    //             <br />
    //             <span className="badge bg-secondary me-2">{discussion.category}</span>
    //             <span>👤 {discussion.author} | 💬 {discussion.replies} replies</span>
    //           </div>
    //           <div>
    //             <button className="btn btn-success btn-sm me-2" onClick={() => handleVote(discussion.id, 'upvotes')}>👍 {discussion.upvotes}</button>
    //             <button className="btn btn-danger btn-sm" onClick={() => handleVote(discussion.id, 'downvotes')}>👎 {discussion.downvotes}</button>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    //   {/* Post a Discussion */}
    //   <div className="col-lg-8 mx-auto mt-4">
    //     <div className="card p-4 shadow-sm">
    //       <h3>📝 Start a New Discussion</h3>
    //       <form onSubmit={handlePostSubmit}>
    //         <div className="mb-3">
    //           <label className="form-label">Topic Title</label>
    //           <input 
    //             type="text" 
    //             className="form-control" 
    //             placeholder="Enter your discussion topic..." 
    //             value={newPost.title} 
    //             onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} 
    //             required 
    //           />
    //         </div>
    //         <div className="mb-3">
    //           <label className="form-label">Your Name</label>
    //           <input 
    //             type="text" 
    //             className="form-control" 
    //             placeholder="Enter your name..." 
    //             value={newPost.author} 
    //             onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} 
    //             required 
    //           />
    //         </div>
    //         <div className="mb-3">
    //           <label className="form-label">Category</label>
    //           <select className="form-control" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
    //             {categories.map(category => (
    //               <option key={category} value={category}>{category}</option>
    //             ))}
    //           </select>
    //         </div>
    //         <button type="submit" className="btn btn-primary w-100">Post Discussion</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <div className="container-fluid px-4 mt-5 bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-lg py-5">
    {/* 💬 Section Title */}
    <h1 className="text-center mb-4 text-dark fw-bold">💬 Community Forum</h1>
    <p className="text-center text-lg text-gray-900">
      Discuss, share, and collaborate with fellow tech enthusiasts!
    </p>

    {/* 🔍 Search Bar */}
    <div className="col-lg-8 mx-auto mb-4">
      <input
        type="text"
        className="form-control border-2 border-blue-400 focus:border-blue-600 text-gray-900 rounded-lg shadow-sm"
        placeholder="🔎 Search discussions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* 🔥 Trending Discussions */}
    <div className="col-lg-8 mx-auto">
      <h3 className="text-primary fw-bold mb-3">🔥 Trending Discussions</h3>
      <ul className="list-group">
        {discussions
          .filter((discussion) =>
            discussion.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((discussion) => (
            <li
              key={discussion.id}
              className="list-group-item d-flex justify-between items-center bg-white shadow-sm rounded-lg p-3"
            >
              <div>
                <strong className="text-lg text-gray-900">{discussion.title}</strong>
                <br />
                <span className="badge bg-secondary me-2">{discussion.category}</span>
                <span className="text-sm text-gray-700">
                  👤 {discussion.author} | 💬 {discussion.replies} replies
                </span>
              </div>
              <div>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleVote(discussion.id, "upvotes")}
                >
                  👍 {discussion.upvotes}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleVote(discussion.id, "downvotes")}
                >
                  👎 {discussion.downvotes}
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>

    {/* 📝 Post a Discussion */}
    <div className="col-lg-8 mx-auto mt-4">
      <div className="card p-4 shadow-lg rounded-lg">
        <h3 className="text-primary fw-bold">📝 Start a New Discussion</h3>
        <form onSubmit={handlePostSubmit}>
          {/* 📌 Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Topic Title</label>
            <input
              type="text"
              className="form-control border-2 border-gray-300 focus:border-blue-600 rounded-lg shadow-sm"
              placeholder="Enter your discussion topic..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
          </div>

          {/* 👤 Author */}
          <div className="mb-3">
            <label className="form-label fw-bold">Your Name</label>
            <input
              type="text"
              className="form-control border-2 border-gray-300 focus:border-blue-600 rounded-lg shadow-sm"
              placeholder="Enter your name..."
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              required
            />
          </div>

          {/* 🔖 Category */}
          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
            <select
              className="form-control border-2 border-gray-300 focus:border-blue-600 rounded-lg shadow-sm"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* 🚀 Submit Button */}
          <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
            Post Discussion
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default CommunityForum;