import { useState } from 'react';
import { useScript } from '../../hooks/useScript';

function CloudifyUploadForm({ onImageUpload }) { // Accepting the callback function as a prop
  const [state, setState] = useState({
    file_url: null,
    file_type: "image",
    description: ''
  });

  const openWidget = () => {
    !!window.cloudinary && window.cloudinary.createUploadWidget(
      {
        sources: ['local', 'url', 'camera'],
        cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
        uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setState({
            ...state,
            file_url: result.info.secure_url
          });
          onImageUpload(result.info.secure_url); // Call the callback function with the image URL
        }
      },
    ).open();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!state.file_url) {
      alert('Please select a file for upload'); // Replace with your alert mechanism
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>Upload New File</h2>
        {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
        <button type="button" onClick={openWidget}>Pick File</button>
        <br />
        File Type:
        <select onChange={(e) => setState({ ...state, file_type: e.target.value })} value={state.file_type}>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
        </select>
        {state.file_url && <p>Uploaded Image URL: {state.file_url} <br /><img src={state.file_url} width={100}/></p>}
        <br />
        Description: <input onChange={(e) => setState({ ...state, description: e.target.value })} value={state.description} />
        <div>
          <button type="submit">Submit Image</button>
        </div>
      </form>
    </>
  )
}

export default CloudifyUploadForm;
