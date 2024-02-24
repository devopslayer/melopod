import React, { useState, useEffect, useRef } from 'react';
import '../App.css'

function Container() {
  const [uploadedAudioFiles, setUploadedAudioFiles] = useState(() => {
    const storedFiles = localStorage.getItem('uploadedAudioFiles');
    return storedFiles ? JSON.parse(storedFiles) : [];
  });
  const [currentUploadedAudioIndex, setCurrentUploadedAudioIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPaused, setWasPaused] = useState(false); // Track if audio was paused due to selecting new file
  const [pausedTime, setPausedTime] = useState(0); // Track the paused time
  const audioRef = useRef();

  useEffect(() => {
    return () => {
      // Clear localStorage when the component is unmounted
      localStorage.removeItem('uploadedAudioFiles');
    };
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const processedFiles = files.map((file) => {
      return {
        file,
        name: file.name, // Store file name separately
        dataURL: URL.createObjectURL(file),
        image: '' // Placeholder for image URL (you need to implement this)
      };
    });

    setUploadedAudioFiles((prevFiles) => [...prevFiles, ...processedFiles]); // Append new files to the existing array
    setCurrentUploadedAudioIndex(null); // Reset current audio index
    setIsPlaying(false); // Pause playback when selecting new file
    setWasPaused(false); // Reset the flag
    e.target.value = ''; // Clear the input field
  };

  const handlePlay = () => {
    setIsPlaying(true);
    if (wasPaused) {
      audioRef.current.currentTime = pausedTime; // Set current time if playback was resumed from paused state
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    setWasPaused(true); // Set the flag to indicate the audio was paused
    setPausedTime(audioRef.current.currentTime); // Store the current time when the audio is paused
  };

  const handleEnded = () => {
    setCurrentUploadedAudioIndex((prevIndex) => {
      if (prevIndex === uploadedAudioFiles.length - 1) {
        return 0; // Start from the beginning if reached the end of the playlist
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePlaylistItemClick = (index) => {
    setCurrentUploadedAudioIndex(index);
    setIsPlaying(true); // Start playing the selected audio file
    setWasPaused(false); // Reset the flag
    setPausedTime(0); // Reset paused time
  };

  useEffect(() => {
    if (currentUploadedAudioIndex !== null && !wasPaused) {
      audioRef.current.load();
    }
  }, [currentUploadedAudioIndex, wasPaused]);

  return (
    <div className="audio-container mt-5">
      <div className="row">
        <div className="col">
          <label className="custom-file-input">
            <input type="file" accept="audio/*" onChange={handleFileChange} multiple />
            Choose Audio Files
          </label>
          <h2 className="playlist-header">Playlist</h2>
          <div className="playlist">
            {uploadedAudioFiles.map((item, index) => (
              <div key={index} className={`playlist-item ${index === currentUploadedAudioIndex ? 'active' : ''}`} onClick={() => handlePlaylistItemClick(index)}>
                {item.image && <img src={item.image} alt={item.name} className="audio-image" />}
                <span className="audio-name">{item.name}</span> {/* Display file name */}
              </div>
            ))}
          </div>
        </div>
        <div className="col">
          <h2 className="now-playing-header">Now Playing</h2>
          {currentUploadedAudioIndex !== null && (
            <div className="now-playing-card">
              <div className="now-playing-body">
                <h5 className="now-playing-title">{uploadedAudioFiles[currentUploadedAudioIndex]?.name}</h5> {/* Display file name */}
                <audio
                  ref={audioRef}
                  controls
                  autoPlay={isPlaying}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onEnded={handleEnded}
                >
                  <source src={uploadedAudioFiles[currentUploadedAudioIndex]?.dataURL} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Container;