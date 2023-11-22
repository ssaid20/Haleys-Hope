import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const CommentCard = ({ user, comment, date, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  //const params = useParams();
  const { id } = useParams(); // Destructure 'id' here
  const studentId = parseInt(id, 10); // Convert 'id' to a number
  console.log("logging studentId in comments tab:", studentId);

  return (
    <div className="w-2/3 p-4 border border-gray-200 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">{user}</span>
          <span className="text-sm text-gray-500 ml-2">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex space-x-2">
          <img
            src="/assets/icons/edit.svg"
            alt="Edit"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={onEdit}
          />
          <img
            src="/assets/icons/trash.svg"
            alt="Delete"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={onDelete}
          />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-700">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
