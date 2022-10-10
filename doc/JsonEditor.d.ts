// https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#configuration-options

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
type ExpandOptions = {
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

type SelectionPosition = {
  row: number;
  column: number;
}
type SerializableNode = {
  value: string|object|number|boolean;
  path: Array<string|number>
}
type ValueEventParams = {
  field: string;
  path: Array<string|number>;
  value: string;
}
type FieldEventParams = {
  field: string;
  path: Array<string|number>;
}
type EventParams = ValueEventParams | FieldEventParams;

type QueryOptions = {
  filter?: {
    field: string | '@'
    relation: '==' | '!=' | '<' | '<=' | '>' | '>='
    value: string
  }
  sort?: {
    field: string | '@'
    direction: 'asc' | 'desc'
  }
  projection?: {
    fields: string[]
  }
}

// 配置项
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
  colorPicker?: boolean;
  language?: string;
  languages?: Record<string, Record<string, string>>;
  modalAnchor?: HTMLElement;
  popupAnchor?: HTMLElement;
  enableSort?: boolean;
  enableTransform?: boolean;
  maxVisibleChilds?: number;
  queryDescription?: string;

  onChange?: () => unknown;
  onChangeJSON?: (json: JSON) => unknown;
  onChangeText?: (jsonString: string) => unknown;
  onClassName?: (cls: ClassNames) => unknown;
  onExpand?: (node: ExpandOptions) => unknown;
  onEditable?: (node: NodeStatus) => unknown;
  onError?: (error: Error) => unknown;
  onModeChange?: (newMode: EditorMode, oldMode: EditorMode) => unknown;
  onNodeName?: (nodeName: NodeName) => unknown;
  onValidate?: (json: JSON) => unknown;
  onValidationError?: (errors: ValidationError[]) => unknown;
  onCreateMenu?: (items, node: JsonNode) => unknown;

  onTextSelectionChange?: (start: SelectionPosition, end: SelectionPosition, text: string) => unknown
  onSelectionChange?: (start: SerializableNode, end: SerializableNode) => unknown;
  onEvent?: (params: EventParams, event: string) => unknown;
  onFocus?: (params: { type: 'focus'; target: any }) => unknown;
  onBlur?: (params: { type: 'focus'; target: any }) => unknown;
  onColorPicker?: (parent, color: string, onChange: Function) => unknown;

  timestampTag?: (params: EventParams) => boolean;
  createQuery?: (json: JSON, queryOptions: QueryOptions) => string;
  executeQuery?: (json: JSON, query: string) => JSON;
}

class JSONEditor {
  constructor(container: HTMLDivElement, options?: ConfigurationOptions, json?: JSON)

  static VALID_OPTIONS: string[]
  static ace?: object
  static Ajv?: Function
  static VanillaPicker?: Function

  collapseAll(): void
  destroy(): void
  expandAll(): void
  expand(options: ExpandOptions): void
  focus(): void
  get(): JSON
  getMode(): EditorMode
  getName(): string | undefined
  getNodesByRange(start: { path: string[]}, end: { path: string[] }): SerializableNode[]
  getSelection(): { start: SerializableNode, end: SerializableNode }
  getText(): string
  getTextSelection(): { start: SelectionPosition, end: SelectionPosition, text: string }
  refresh(): void
  set(json: JSON): void
  setMode(mode: EditorMode): void
  setName(name: string | undefined): void
  setSchema(schema: object, schemas?: object): void
  setSelection(start: { path: string[]}, end: { path: string[] }): void
  setText(jsonString: string): void
  setTextSelection(start: SelectionPosition, end: SelectionPosition): void
  update(json: JSON): void
  updateText(jsonString: string): void
}
