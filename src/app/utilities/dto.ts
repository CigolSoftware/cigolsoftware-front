import { Project } from "./data";

export enum Color { DANGER = 'danger', PRIMARY = 'primary', SUCCESS = 'success', WARNING = 'warning' }

export enum Icon {
    CHECK = 'check',
    DOWNLOAD = 'download',
    EXCLAMATION = 'exclamation',
    PEN = 'pen',
    PLUS = 'plus',
    TRASH = 'trash'
}

export interface Filter { page: number; size?: number, value?: string; }
export interface Page { projects: Project[]; total: number; }
export interface Toast { color: Color; message: string; }