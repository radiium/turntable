import { EventEmitter } from '@angular/core';
import {} from '@types/youtube';

export interface IPlayerOutputs {
    ready?: EventEmitter<YT.Player>;
    change?: EventEmitter<YT.PlayerEvent>;
}

export interface IPlayerSize {
    height?: number;
    width?: number;
}

export interface IPlayerApiScriptOptions {
    protocol?: string;
}

export interface IPlayerConfig {
    playerId: string;
    width: number;
    height: number;
    videoId: string;
    outputs: {
        ready: EventEmitter<any>,
        change: EventEmitter<any>
    };
}
