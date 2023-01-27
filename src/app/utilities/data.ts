export interface Body<R> { code: number; message: string; response: R; }
export interface Project { id?: number, name: string }
export interface Skill { id?: number, easy: number, hard: number, name: string, normal: number }