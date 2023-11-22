import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import CommentCard from "../../Cards/CommentCrad";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      sx={{
        maxWidth: "80%",
        "& .MuiSnackbarContent-root": {
          fontSize: "1rem",
          padding: "8px 24px",
          boxShadow:
            "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)", // Example shadow
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          fontSize: "1.3rem",
          padding: "8px 24px",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

const CommentsTab = () => {
  const dispatch = useDispatch();
  // const params = useParams();
  const { id } = useParams(); // Destructure 'id' here
  const studentId = parseInt(id, 10); // Convert 'id' to a number
  console.log("logging studentId in comments tab:", studentId);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const openConfirmDialog = (commentId) => {
    setCommentToDelete(commentId);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const handleDelete = () => {
    if (commentToDelete !== null) {
      dispatch({ type: "DELETE_COMMENT", payload: commentToDelete });
      dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Successfully Deleted", severity: "success" } });

      setCommentToDelete(null);
    }
    closeConfirmDialog();
  };
  // Function to open snackbar
  const openSnackbar = (message, severity = "info") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  // Function to handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_COMMENTS", payload: studentId });
  }, [dispatch, studentId]);

  //access comments from the redux store
  const { comments, loading, error } = useSelector((state) => state.commentsReducer);
  const student = useSelector((store) => store);
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
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Comment Added", severity: "success" } });

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
    dispatch({ type: "SHOW_SNACKBAR", payload: { message: "Note Updated", severity: "success" } });

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
        {comments.map((comment) => (
          <div>
            <CommentCard
              key={comment.id}
              user={comment.name}
              comment={comment.comments}
              date={comment.date}
              onEdit={() => handleEditStart(comment)}
              onDelete={() => openConfirmDialog(comment.id)}
            />
            {/* <p>
              {comment.name} - {new Date(comment.date).toLocaleDateString()}
            </p> */}

            {editingCommentId === comment.id ? (
              <div className="w-2/3 my-4 flex items-center">
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
                {/* <p className="text-gray-700 break-words">{comment.comments}</p> */}
                <div className="flex space-x-2">
                  {/* <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                    onClick={() => handleEditStart(comment)}
                  >
                    Edit
                  </button> */}
                  {/* <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => openConfirmDialog(comment.id)}
                  >
                    Delete
                  </button> */}
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

      {/* Snackbar for notifications */}
      <CustomSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this comment? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommentsTab;
