export type Color = {
    r: number
    g: number
    b: number
}

export type Camera = {
    x: number,
    y: number
}

export enum LayerType {
    Rectangle = "RECTANGLE",
    Ellipse = "ELLIPSE",
    Path = "PATH",
    Text = "TEXT",
    Note = "NOTE"
}

export type RectangleLayer = {
    type: LayerType.Rectangle,
    x: number,
    y: number,
    height: number,
    width: number,
    fill: Color
    value?: string
}

export type EllipseLayer = {
    type: LayerType.Ellipse,
    x: number,
    y: number,
    height: number,
    width: number,
    fill: Color,
    value?: string
}

export type PathLayer = {
    type: LayerType.Path,
    x: number,
    y: number,
    height: number,
    width: number,
    fill: Color,
    points: number[][]
    value?: string
}

export type TextLayer = {
    type: LayerType.Text,
    x: number,
    y: number,
    height: number,
    width: number,
    fill: Color,
    value?: string
}

export type NoteLayer = {
    type: LayerType.Note,
    x: number,
    y: number,
    height: number,
    width: number,
    fill: Color,
    value?: string
}

export type Point = {
    x: number,
    y: number,
}

export type XYWH = {
    x: number,
    y: number,
    height: number,
    width: number,
}

export type SIDE = {
    top: 1,
    bottom: 2,
    left: 4,
    right: 8,
}

export type CanvasState = 
| {
    mode: CanvasMode.None
} | {
    mode: CanvasMode.SelectionNet,
    origin: Point,
    current?: Point
} | {
    mode: CanvasMode.Translating,
    current: Point
} | {
    mode: CanvasMode.Inserting,
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note
} | {
    mode: CanvasMode.Pencil
} | {
    mode: CanvasMode.Pressing,
    origin: Point
} | {
    mode: CanvasMode.Resizing,
    initialBounds: XYWH
    corner: SIDE
}


export enum CanvasMode {
    None = 'NONE',
    Pressing = "PRESSING",
    SelectionNet = 'SELECTION_NET',
    Translating = 'TRANSLATING',
    Inserting = 'INSERTING',
    Resizing = 'RESIZING',
    Pencil = 'PENCIL'
}