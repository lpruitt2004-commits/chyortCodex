import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    theme: "green",
    scanlines: true,
    flicker: true,
    fontSize: "medium",
    soundEffects: true,
    notifications: true,
    autoSave: true,
    encryption: true,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="settings-container">
      <h2>System Configuration</h2>

      <div className="settings-section">
        <h3>Display Settings</h3>
        <div className="setting-item">
          <label>Theme Color</label>
          <select
            value={settings.theme}
            onChange={(e) => updateSetting("theme", e.target.value)}
            className="setting-select"
          >
            <option value="green">GREEN (Classic)</option>
            <option value="amber">AMBER</option>
            <option value="cyan">CYAN</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Font Size</label>
          <select
            value={settings.fontSize}
            onChange={(e) => updateSetting("fontSize", e.target.value)}
            className="setting-select"
          >
            <option value="small">SMALL</option>
            <option value="medium">MEDIUM</option>
            <option value="large">LARGE</option>
          </select>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.scanlines}
              onChange={() => toggleSetting("scanlines")}
            />
            CRT Scanlines
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.flicker}
              onChange={() => toggleSetting("flicker")}
            />
            Screen Flicker Effect
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>System Settings</h3>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.soundEffects}
              onChange={() => toggleSetting("soundEffects")}
            />
            Sound Effects
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => toggleSetting("notifications")}
            />
            Notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={() => toggleSetting("autoSave")}
            />
            Auto-Save
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3>Security Settings</h3>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.encryption}
              onChange={() => toggleSetting("encryption")}
              disabled
            />
            End-to-End Encryption (Always On)
          </label>
        </div>
      </div>

      <div className="settings-actions">
        <button className="reset-btn">RESET TO DEFAULTS</button>
      </div>
    </div>
  );
}

export default Settings;
