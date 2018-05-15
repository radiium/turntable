import { Component, Input, Output, OnChanges, SimpleChanges,
    ChangeDetectionStrategy, ChangeDetectorRef,
    OnInit, ElementRef, HostListener, ViewChild,
    Renderer2, EventEmitter} from '@angular/core';

import { Observable, Subscription, timer } from 'rxjs';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { DurationPipe } from 'shared/pipes/duration.pipe';
import { PlayerState, ProgressPosition } from 'core/models';

@Component({
    selector: 'app-player-control',
    templateUrl: './player-control.component.html',
    styleUrls: ['./player-control.component.scss'],
    providers: [ DurationPipe ],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerControlComponent implements OnInit, OnChanges {

    @Input() side: string;
    @Input() player: any; // YT.Player => error YT is defined;
    @Input() playerState: PlayerState;

    @Output() nearEnd = new EventEmitter<string>();
    isSendedNearEnd: boolean;

    // Progress bar
    @ViewChild('progressBar') progressBar: ElementRef;
    videoDuration: number;
    progress: number;
    state: YT.PlayerState;
    tooltip: any;
    widthOver: number;
    tpState = {
        isVisible: false,
        posX: 0,
        posY: 0,
        progressPosX: 0,
        timeValue: 0
    };
    currentTime: number;

    // Volume control
    isOnPlay: boolean;
    currentVolumeIcon: string;
    volumeIconList: Array<string> = [
        'volume-high',
        'volume-medium',
        'volume-off'
    ];

    // Timer
    timer$: Observable<any>;
    sub: Subscription;

    constructor(
    private duration: DurationPipe,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2) {
    }

    ngOnInit() {
        this.isOnPlay = false;
        this.currentVolumeIcon = this.volumeIconList[0];
        this.currentTime = 0;
        this.progress = 0;
        this.widthOver = 0;
        this.videoDuration = 0;
        this.isSendedNearEnd = false;
        this.cdRef.detectChanges();

        this.renderer.listen(
            this.progressBar.nativeElement,
            'mouseenter', (event) => {
                if (this.playerState.video) {
                    this.tpState.isVisible = true;
                    if (!this.tooltip && event.target === this.progressBar.nativeElement) {
                        this.createTooltip();
                    }
                    this.showTooltip();
                }
        });

        this.renderer.listen(
            this.progressBar.nativeElement,
            'mouseleave', (event) => {
                this.tpState.isVisible = false;
                if (this.tooltip) {
                    this.hideTooltip();
                }
                this.widthOver = 0;
                this.cdRef.detectChanges();
        });

        this.renderer.listen(
            this.progressBar.nativeElement,
            'mousemove', (event) => {
                if (this.tpState.isVisible && this.tooltip) {
                    if (this.tooltip) {
                        this.setTooltipPosition(event.clientX);
                    }
                }
        });

        this.renderer.listen(
            this.progressBar.nativeElement,
            'click', (event) => {
                if (this.player) {
                    this.player.seekTo(this.tpState.timeValue / 1000);
                }
                // if (this.tpState.timeValue > 0) {}
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.playerState && changes.playerState.currentValue) {

            if (changes.playerState.currentValue.video) {
                this.videoDuration = changes.playerState.currentValue.video.duration;
                this.isSendedNearEnd = false;
            }

            if (this.playerState.state === 1) {
                this.initTimer();
            } else {
                this.stopTimer();
            }

            this.isOnPlay = this.playerState.state === 1;
            this.setMute(this.playerState.volume === 0);
            this.cdRef.detectChanges();
        }
    }

    updateVolumeIcon() {
        if (this.playerState.volume === 0) {
            this.currentVolumeIcon = this.volumeIconList[2];
         } else if (this.playerState.volume > 0 && this.playerState.volume < 50) {
             this.currentVolumeIcon = this.volumeIconList[1];

         } else if (this.playerState.volume >= 50 && this.playerState.volume <= 100) {
             this.currentVolumeIcon = this.volumeIconList[0];
         }
    }

    setMute(mute: boolean) {
        if (this.player) {
            if (mute) {
                this.player.mute();
                this.currentVolumeIcon = this.volumeIconList[2];
            } else {
                this.player.unMute();
                this.updateVolumeIcon();
            }
        }
    }

    muteUnmute() {
        if (this.player) {
            this.setMute(!this.player.isMuted());
        }
    }

    replay() {
        if (this.player) {
            this.player.seekTo(0);
        }
    }

    stop() {
        if (this.player) {
            this.player.stopVideo();
            this.player.clearVideo();
            this.progress = 0;
        }
    }

    onPlayPause() {
        if (this.player) {
            if (this.playerState.state === 1) {
                this.player.pauseVideo();
                this.isOnPlay = false;
            } else if (this.playerState.state === 2) {
                this.player.playVideo();
                this.isOnPlay = true;
            }
        }
    }

    hasPrev() {
        return false;
    }

    hasNext() {
        return true;
    }

    createTooltip() {
        this.tooltip = document.createElement('span');
        this.tooltip.className += 'ng-tooltip ng-tooltip-top';
        this.tooltip.style.zIndex = 1000;
    }

    showTooltip() {
        this.tooltip.className += 'ng-tooltip-show';
        document.body.appendChild(this.tooltip);
    }
    hideTooltip() {
        this.tooltip.classList.remove('ng-tooltip-show');
        this.tooltip.parentNode.removeChild(this.tooltip);
    }

    setTooltipPosition(mouseX: number) {

        const progressBar = this.progressBar.nativeElement.getBoundingClientRect();
        const tooltip = this.tooltip.getBoundingClientRect();
        const mousePosX = (mouseX - progressBar.left);
        this.widthOver = mousePosX;

        this.tpState.posX = (mouseX - (tooltip.width / 2));
        this.tpState.posY = (progressBar.top - 30);
        this.tpState.progressPosX = (mousePosX / progressBar.width) * 1000;
        this.tpState.timeValue = (this.tpState.progressPosX * this.videoDuration) / 1000;

        this.tooltip.style.top  = this.tpState.posY + 'px';
        this.tooltip.style.left = this.tpState.posX + 'px';
        this.tooltip.style.opacity = '1';
        this.tooltip.innerText = this.duration.transform(this.tpState.timeValue);
        this.cdRef.detectChanges();
    }

    initTimer() {
        this.timer$ = timer(0, 1000);
        this.sub = this.timer$.subscribe((t) => {
            const currentTime = this.player.getCurrentTime();
            this.currentTime = currentTime * 1000;
            this.tpState.timeValue = (this.tpState.progressPosX * this.videoDuration) / 1000;
            const progressBar = this.progressBar.nativeElement.getBoundingClientRect();
            this.progress = progressBar.width * this.currentTime / this.playerState.video.duration;

            const restTime = (this.playerState.video.duration / 1000) - this.player.getCurrentTime();
            if (restTime < 15 && !this.isSendedNearEnd) {
                this.isSendedNearEnd = true;
                this.nearEnd.emit(this.side);
            }

            this.cdRef.detectChanges();
        });
    }

    // Stop timer
    stopTimer() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.timer$ = new EmptyObservable();
    }
}
