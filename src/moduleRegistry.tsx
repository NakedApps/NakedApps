// Module Registry - Static imports for Metro bundler compatibility
import Calculator from '../modules/calculator/index';
import QRReader from '../modules/qr-reader/index';
import PDFModifier from '../modules/pdf-modifier/index';
import PermissionTester from '../modules/permission-tester/index';
import TextEditor from '../modules/text-editor/index';
import ImageConverter from '../modules/image-converter/index';
import PasswordGenerator from '../modules/password-generator/index';
import ColorPicker from '../modules/color-picker/index';
import Base64Encoder from '../modules/base64-encoder/index';
import JSONFormatter from '../modules/json-formatter/index';
import URLShortener from '../modules/url-shortener/index';
import MarkdownEditor from '../modules/markdown-editor/index';
import BarcodeScanner from '../modules/barcode-scanner/index';
import UnitConverter from '../modules/unit-converter/index';

// Registry mapping module names to their components
const moduleRegistry: { [key: string]: React.ComponentType } = {
  'calculator': Calculator,
  'qr-reader': QRReader,
  'pdf-modifier': PDFModifier,
  'permission-tester': PermissionTester,
  'text-editor': TextEditor,
  'image-converter': ImageConverter,
  'password-generator': PasswordGenerator,
  'color-picker': ColorPicker,
  'base64-encoder': Base64Encoder,
  'json-formatter': JSONFormatter,
  'url-shortener': URLShortener,
  'markdown-editor': MarkdownEditor,
  'barcode-scanner': BarcodeScanner,
  'unit-converter': UnitConverter,
};

export default moduleRegistry;


