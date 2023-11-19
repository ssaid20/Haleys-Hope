import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

const CommentsTab = () => {
  const dispatch = useDispatch();
  // const params = useParams();
  const { id } = useParams(); // Destructure 'id' here
  const studentId = parseInt(id, 10); // Convert 'id' to a number
  console.log("logging studentId in comments tab:", studentId);

  const confirmDelete = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch({ type: "DELETE_COMMENT", payload: commentId });
      }
    });
  };

  useEffect(() => {
    console.log("*****studentId", studentId);
    dispatch({ type: "FETCH_COMMENTS", payload: studentId });
  }, [dispatch, studentId]);

  //access comments from the redux store
  const { comments, loading, error } = useSelector(
    (state) => state.commentsReducer
  );
  const student = useSelector((store) => store);
  console.log("logging student in comments tab:", student);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  const handleEditStart = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.comments);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return; // prevent adding empty comments
    dispatch({
      type: "ADD_COMMENT",
      payload: { student_id: studentId, comments: newComment },
    });
    setNewComment("");
  };

  const handleEditSave = (commentId) => {
    dispatch({
      type: "UPDATE_COMMENT",
      payload: {
        studentId: studentId,
        commentId: commentId,
        comments: editedComment,
      },
    });
    setEditingCommentId(null);
    setEditedComment("");
  };

  //checking for loading or error
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>Notes</div>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editingCommentId === comment.id ? (
            // Edit mode for the selected comment
            <div>
              <input
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
              <button onClick={() => handleEditSave(comment.id)}>Save</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
            </div>
          ) : (
            // Display mode for comments
            <div>
              {comment.comments}
              <button onClick={() => handleEditStart(comment)}>Edit</button>
              <button onClick={() => confirmDelete(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
      <div>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter a note"
        />
        <button onClick={handleAddComment}>Add Note</button>
      </div>
    </>
  );
};

export default CommentsTab;
