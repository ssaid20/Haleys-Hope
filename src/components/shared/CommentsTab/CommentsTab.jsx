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

        // Display success message
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
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

  const usersFirstName = useSelector((store) => store.user.first_name);
  const usersLastName = useSelector((store) => store.user.last_name);
  const usersName = usersFirstName + " " + usersLastName;
  console.log("logging the usersName", usersName);
  //const currentDate = new Date().toISOString().split("T")[0];
  const date = new Date().toISOString();

  const handleAddComment = () => {
    if (!newComment.trim()) return; // prevent adding empty comments
    dispatch({
      type: "ADD_COMMENT",
      payload: {
        student_id: studentId,
        comments: newComment,
        name: usersName,
        date: new Date().toISOString(),
      },
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Comment added",
      showConfirmButton: false,
      timer: 1500,
    });

    setNewComment("");
  };

  const handleEditSave = (commentId) => {
    dispatch({
      type: "UPDATE_COMMENT",
      payload: {
        student_id: studentId,
        comment_id: editingCommentId,
        comments: editedComment,
        name: usersName,
        date: new Date().toISOString(),
      },
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Edit saved",
      showConfirmButton: false,
      timer: 1500,
    });

    setEditingCommentId(null);
    setEditedComment("");
  };

  //checking for loading or error
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notes</h2>
      <div>
        {/* {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-3"> */}
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.name} - {new Date(comment.date).toLocaleDateString()}
            </p>
            <p>{comment.comments}</p>
            {editingCommentId === comment.id ? (
              <div className="flex items-center">
                <input
                  type="text"
                  className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleEditSave(comment.id)}
                >
                  Save
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setEditingCommentId(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <p className="text-gray-700 break-words">{comment.comments}</p>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                    onClick={() => handleEditStart(comment)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => confirmDelete(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="mt-4">
          <textarea
            className="form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter a note"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="4"
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleAddComment}
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsTab;
