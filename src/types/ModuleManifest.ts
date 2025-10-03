// Module Manifest Types - Configuration and Permissions

export type Permission = 
  | 'camera'          // Access to camera
  | 'microphone'      // Access to microphone
  | 'geolocation'     // Access to GPS location
  | 'bluetooth'       // Access to Bluetooth devices
  | 'usb'             // Access to USB devices
  | 'filesystem'      // Access to file system (read/write)
  | 'clipboard'       // Access to clipboard
  | 'notifications'   // Show notifications
  | 'internet'        // Make network requests
  | 'storage'         // Access to local storage
  | 'fullscreen'      // Request fullscreen mode
  | 'print';          // Access to print functionality

export interface ModuleManifest {
  // Basic Information
  name: string;                    // Module internal name (kebab-case)
  displayName: string;             // User-friendly name
  version: string;                 // Semantic version (e.g., "1.0.0")
  description: string;             // Short description
  longDescription?: string;        // Detailed description
  
  // Author & Metadata
  author?: {
    name: string;
    email?: string;
    url?: string;
  };
  
  // Visual
  icon?: string;                   // Emoji or icon identifier
  color?: string;                  // Primary color (hex)
  category?: ModuleCategory;       // Module category
  
  // Permissions
  permissions: Permission[];       // Required permissions
  
  // Features & Requirements
  features?: string[];             // List of features
  keywords?: string[];             // Search keywords
  
  // Links
  homepage?: string;
  repository?: string;
  documentation?: string;
  
  // Status
  status?: 'stable' | 'beta' | 'alpha' | 'experimental';
  
  // Size & Performance
  estimatedSize?: string;          // e.g., "1.2 MB"
  performanceImpact?: 'low' | 'medium' | 'high';
}

export type ModuleCategory = 
  | 'productivity'
  | 'media'
  | 'development'
  | 'utilities'
  | 'communication'
  | 'finance'
  | 'education'
  | 'other';

// Permission metadata
export interface PermissionInfo {
  id: Permission;
  name: string;
  description: string;
  icon: string;
  risk: 'low' | 'medium' | 'high';
}

export const PERMISSIONS_INFO: Record<Permission, PermissionInfo> = {
  camera: {
    id: 'camera',
    name: 'Camera',
    description: 'Access your camera to take photos or scan codes',
    icon: '📷',
    risk: 'high',
  },
  microphone: {
    id: 'microphone',
    name: 'Microphone',
    description: 'Record audio from your microphone',
    icon: '🎤',
    risk: 'high',
  },
  geolocation: {
    id: 'geolocation',
    name: 'Location',
    description: 'Access your geographic location',
    icon: '📍',
    risk: 'high',
  },
  bluetooth: {
    id: 'bluetooth',
    name: 'Bluetooth',
    description: 'Connect to Bluetooth devices',
    icon: '📶',
    risk: 'medium',
  },
  usb: {
    id: 'usb',
    name: 'USB',
    description: 'Connect to USB devices',
    icon: '🔌',
    risk: 'medium',
  },
  filesystem: {
    id: 'filesystem',
    name: 'File System',
    description: 'Read and write files on your device',
    icon: '📁',
    risk: 'medium',
  },
  clipboard: {
    id: 'clipboard',
    name: 'Clipboard',
    description: 'Read and write to your clipboard',
    icon: '📋',
    risk: 'low',
  },
  notifications: {
    id: 'notifications',
    name: 'Notifications',
    description: 'Show notifications',
    icon: '🔔',
    risk: 'low',
  },
  internet: {
    id: 'internet',
    name: 'Internet',
    description: 'Make network requests to the internet',
    icon: '🌐',
    risk: 'medium',
  },
  storage: {
    id: 'storage',
    name: 'Storage',
    description: 'Store data locally on your device',
    icon: '💾',
    risk: 'low',
  },
  fullscreen: {
    id: 'fullscreen',
    name: 'Fullscreen',
    description: 'Display content in fullscreen mode',
    icon: '⛶',
    risk: 'low',
  },
  print: {
    id: 'print',
    name: 'Print',
    description: 'Print documents',
    icon: '🖨️',
    risk: 'low',
  },
};


