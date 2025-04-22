// importing local code, code we have written
import {Path, Text, Circle, Polygon} from "@svgdotjs/svg.js";
import {Window, Widget, RoleType} from "../core/ui";
// importing code from SVG.js library
import {Rect, IdleUpWidgetState} from "../core/ui";

class progressBar extends Widget{
    private button: Rect;
    private buttonText: Text;
    private progressBackground: Rect;
    private progressBackgroundHeight: number = 20;
    private progressBackgroundWidth: number = 150;
    private progressBar: Rect;
    private progressBarWidth: number = 50;
    private increment: number = 10;
    private progressBarX: number = 0;
    private progressBarY: number = 0;

    constructor(parent:Window){
        super(parent);
        this.role = RoleType.button;
        this.setState(new IdleUpWidgetState());
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;
        //Progress bar background
        this.progressBackground = this._group
            .rect(this.progressBackgroundWidth, this.progressBackgroundHeight)
            .fill('white')
            .stroke({ color: 'black', width: 2 })
            .move (20, 0);

        //Progress bar
        this.progressBar = this._group
            .rect(10, this.progressBackgroundHeight)
            .fill('pink')
            .move(21, 0);

        //Button to increment progress bar
        this.button = this._group
            .rect(20, 20)
            .fill('white')
            .stroke({ color: 'black', width: 2 });
        
        this.buttonText = this._group
            .text("Click")
            .font({ size: 10, family: 'Helvetica', anchor: 'middle' })
            .fill('black')

        this.registerEvent(this.button);
    }

    //set the width of progress bar
    set newProgressBarWidth(value: number){
        this.progressBarWidth = value;
    }

    //set increment value of progress bar
    set newIncrement(value: number){
        this.increment = value;
    }

    //get increment value of progress bar
    get currentIncrement(){
        return this.increment;
    }

    //TODO: increment progress bar
    incrementProgressBar() {
        const newWidth = Math.min(
            this.progressBarWidth + this.increment,
            this.progressBackgroundWidth - 2 // prevent overflow
        );
    
        this.progressBarWidth = newWidth;
        this.progressBar.width(newWidth);
    
        console.log("Progress bar has incremented");
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
    }
    idledownState(): void {
    }
    pressedState(): void {
        this.incrementProgressBar();
    }
    pressReleaseState(): void {
    }
    hoverState(): void {
    }
    hoverPressedState(): void {
    }
    pressedoutState(): void {
    }
    moveState(): void {
    }
    keyupState(): void {
    }
}

export {progressBar}