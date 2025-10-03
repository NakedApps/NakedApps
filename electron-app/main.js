const { app, BrowserWindow } = require('electron');

// Add command line switches to better handle camera on Linux
app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer');
app.commandLine.appendSwitch('disable-features', 'MediaStreamTrack');

// Add scroll-related flags
app.commandLine.appendSwitch('enable-smooth-scrolling');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the Expo web app
  const port = 19007;
  win.loadURL(`http://localhost:${port}`);
  
  // Open DevTools (optional, comment out for production)
  win.webContents.openDevTools();
}

// Wait for the app to be ready before creating the window
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});