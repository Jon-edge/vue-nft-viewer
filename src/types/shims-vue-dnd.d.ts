// src/types/shims-vue-dnd.d.ts
declare module 'vue-dnd' {
  import { DragSourceMonitor, DropTargetMonitor } from 'react-dnd'
  export function useDrag(spec: any): any
  export function useDrop(spec: any): any
}
