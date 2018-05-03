import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { WorkerService } from './worker.services';

@Injectable()
export class SplitPane {
    public splitPaneState: boolean;
    public delayNumber: number;

    constructor(
        public platform: Platform,
        public workerService: WorkerService,
    ) {
        console.log("SplitPane Constructor");
        this.splitPaneState = false;
        this.delayNumber = 10000;
    }

    getSplitPane() {
        /*
        for (let i = 0; i < 5; i++) {
            // await is converting Promise<number> into number
            const count: number = await this.delay(this.delayNumber, i);
        }*/

        if (this.workerService.authenticated) {
            this.splitPaneState = true;
            //this.delayNumber = 50000;
        } else {
            this.splitPaneState = false;
        }
        return this.splitPaneState;
    }

    delay(milliseconds: number, count: number): Promise<number> {
        return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
    }

}