import { ModuleManifest } from '../types/ModuleManifest';
import calculatorManifest from '../../modules/calculator/manifest.json';
import qrReaderManifest from '../../modules/qr-reader/manifest.json';
import pdfModifierManifest from '../../modules/pdf-modifier/manifest.json';

// Registry of all module manifests
export const MODULE_MANIFESTS: Record<string, ModuleManifest> = {
  'calculator': calculatorManifest as ModuleManifest,
  'qr-reader': qrReaderManifest as ModuleManifest,
  'pdf-modifier': pdfModifierManifest as ModuleManifest,
};

/**
 * Get manifest for a specific module
 */
export function getModuleManifest(moduleName: string): ModuleManifest | null {
  return MODULE_MANIFESTS[moduleName] || null;
}

/**
 * Get all module manifests
 */
export function getAllManifests(): ModuleManifest[] {
  return Object.values(MODULE_MANIFESTS);
}

/**
 * Check if a module has a specific permission
 */
export function moduleHasPermission(moduleName: string, permission: string): boolean {
  const manifest = getModuleManifest(moduleName);
  return manifest ? manifest.permissions.includes(permission as any) : false;
}

/**
 * Get all permissions required by a module
 */
export function getModulePermissions(moduleName: string): string[] {
  const manifest = getModuleManifest(moduleName);
  return manifest ? manifest.permissions : [];
}

/**
 * Get modules by category
 */
export function getModulesByCategory(category: string): ModuleManifest[] {
  return getAllManifests().filter(m => m.category === category);
}

/**
 * Search modules by keyword
 */
export function searchModules(query: string): ModuleManifest[] {
  const lowerQuery = query.toLowerCase();
  return getAllManifests().filter(manifest => {
    return (
      manifest.name.toLowerCase().includes(lowerQuery) ||
      manifest.displayName.toLowerCase().includes(lowerQuery) ||
      manifest.description.toLowerCase().includes(lowerQuery) ||
      (manifest.keywords || []).some(k => k.toLowerCase().includes(lowerQuery))
    );
  });
}


