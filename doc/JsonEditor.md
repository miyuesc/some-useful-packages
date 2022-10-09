# JSONEditor

> https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options

## 1. Configuration options 实例化配置项

```typescript
type ConfigurationOptions = {
  mode?: EditorMode;
  modes?: EditorMode[];
  ace?: object;
  ajv?: object;
  escapeUnicode?: boolean;
  sortObjectKeys?: boolean;
  limitDragging?: boolean;
  history?: boolean;
  schema?: object;
  schemaRefs?: object;
  allowSchemaSuggestions?: boolean;
  search?: boolean;
  indentation?: number;
  theme?: string;
  templates?: object;
  autocomplete?: AutocompleteOptions;
  mainMenuBar?: boolean;
  navigationBar?: boolean;
  statusBar?: boolean;
  
  onChange?: () => unknown;
  onChangeJSON?: (json: JSON) => unknown;
  onChangeText?: (jsonString: string) => unknown;
  onClassName?: (cls: ClassNames) => unknown;
  onExpand?: (node: NodeExpand) => unknown;
  onEditable?: (node: NodeStatus) => unknown;
  onError?: (error: Error) => unknown;
  onModeChange?: (newMode: EditorMode, oldMode: EditorMode) => unknown;
  onNodeName?: (nodeName: NodeName) => unknown;
  onValidate?: (json: JSON) => unknown;
  onValidationError?: (errors: ValidationError[]) => unknown;
  onCreateMenu?: (items, node: JsonNode) => unknown;
}

type EditorMode = 'tree' | 'view' | 'form' | 'code' | 'text' | 'preview'
type AutocompleteOptions = {
  filter: string | Function;
  trigger: string;
  confirmKeys: number[];
  caseSensitive: boolean;
  getOptions?: (text: string, path: string[], input: string, editor: JSONEditor) => unknown
}
type ClassNames = {
  path: string[];
  field: string;
  value: string;
}
type NodeExpand = {
  path: string[];
  isExpand: boolean;
  recursive: boolean;
}
type NodeStatus = {
  path: string[];
  field: string;
  value: string;
}
type NodeName = {
  path: string[];
  type: 'object' | 'array';
  size: number;
  value: object
}
type ValidationError = {
  type: string;
  path: string[];
  message: string;
}
type JsonNode = {
  type: 'single' | 'multiple' | 'append';
  path: string[];
  paths: Array<string[]>
}
```