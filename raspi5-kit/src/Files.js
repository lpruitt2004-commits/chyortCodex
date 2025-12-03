import React, { useState } from "react";

const DIRECTORY_STRUCTURE = {
  mathematics: ["overview.md", "algebra.md", "calculus.md", "statistics.md"],
  "computer-science": ["overview.md", "algorithms.md", "data-structures.md"],
  physics: ["overview.md", "mechanics.md", "thermodynamics.md"],
  chemistry: ["overview.md", "organic.md", "inorganic.md"],
  biology: ["overview.md", "genetics.md", "ecology.md"],
  philosophy: ["overview.md", "ethics.md", "metaphysics.md"],
  psychology: ["overview.md", "cognitive.md", "behavioral.md"],
  history: ["overview.md", "ancient.md", "modern.md"],
  literature: ["overview.md", "poetry.md", "prose.md"],
  economics: ["overview.md", "micro.md", "macro.md"],
  art: ["overview.md", "visual.md", "music.md"],
};

function Files() {
  const [currentDir, setCurrentDir] = useState(null);
  const [fileContent, setFileContent] = useState(null);

  const loadFile = async (discipline, filename) => {
    try {
      const response = await fetch(`/directory/${discipline}/${filename}`);
      const text = await response.text();
      setFileContent({ name: filename, content: text, discipline });
    } catch (error) {
      setFileContent({
        name: filename,
        content: "Error loading file.",
        discipline,
      });
    }
  };

  const goBack = () => {
    if (fileContent) {
      setFileContent(null);
    } else if (currentDir) {
      setCurrentDir(null);
    }
  };

  if (fileContent) {
    return (
      <div className="files-container">
        <div className="files-header">
          <button onClick={goBack} className="back-btn">
            ← BACK
          </button>
          <h2>
            {fileContent.discipline.toUpperCase()} / {fileContent.name}
          </h2>
        </div>
        <div className="file-content">
          <pre>{fileContent.content}</pre>
        </div>
      </div>
    );
  }

  if (currentDir) {
    const files = DIRECTORY_STRUCTURE[currentDir] || [];
    return (
      <div className="files-container">
        <div className="files-header">
          <button onClick={goBack} className="back-btn">
            ← BACK
          </button>
          <h2>{currentDir.toUpperCase()}</h2>
        </div>
        <div className="file-list">
          {files.map((file) => (
            <div
              key={file}
              className="file-item"
              onClick={() => loadFile(currentDir, file)}
            >
              <span className="file-icon">📄</span>
              <span className="file-name">{file}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="files-container">
      <h2>Knowledge Directory</h2>
      <p className="files-intro">Browse academic disciplines and resources</p>
      <div className="directory-grid">
        {Object.keys(DIRECTORY_STRUCTURE).map((dir) => (
          <div
            key={dir}
            className="directory-item"
            onClick={() => setCurrentDir(dir)}
          >
            <span className="dir-icon">📁</span>
            <span className="dir-name">
              {dir.replace("-", " ").toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Files;
