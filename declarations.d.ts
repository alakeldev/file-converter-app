// Ambient declarations for the project.
// This file has no imports or exports so all declarations are globally scoped.

declare module "*.css";

interface Window {
  HSStaticMethods?: {
    autoInit: () => void;
  };
}
