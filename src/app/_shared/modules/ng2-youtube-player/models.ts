import { EventEmitter } from '@angular/core';
import { YoutubePlayerService } from './services/youtube-player.service';
// import '@types/youtube';

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
