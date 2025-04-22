// importing local code, code we have written
import {Path, Text, Circle, Polygon} from "@svgdotjs/svg.js";
import {Window, Widget, RoleType} from "../core/ui";
// importing code from SVG.js library
import {Rect, IdleUpWidgetState} from "../core/ui";

class scrollBar extends Widget{
    private _scrollTrack: Rect;
    private _scrollTrackHeight: number = 150;
    private _scrollTrackWidth: number = 20;
    private _scrollThumb: Rect;
    private _scrollThumbHeight: number = 50;
    private _upButton: Rect;
    private _downButton: Rect;
    private _upArrow: Polygon;
    private _downArrow: Polygon;
    private _scrollThumbX: number = 0;
    private _scrollThumbY: number = 0;

    constructor(parent:Window){
        super(parent);
        this.role = RoleType.scrollbar;
        this.setState(new IdleUpWidgetState());
        this.isDraggable = true;
        this.render();
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this.outerSvg = this._group;

        //Background bar
        this._scrollTrack = this._group
            .rect(this._scrollTrackWidth, this._scrollTrackHeight)
            .fill('white')
            .stroke({ color: 'black', width: 2 });

        //Scroll bar
        this._scrollThumb = this._group
            .rect(this._scrollTrackWidth - 2, this._scrollThumbHeight)
            .fill('pink')
            .move(1, 0);

        //Up Button
        this._upButton = this._group
            .rect(this._scrollTrackWidth, this._scrollTrackWidth)
            .fill('white')
            .stroke({ color: 'black', width: 2 })
            .move(0, -this._scrollTrackWidth)

        //Down Button
        this._downButton = this._group
            .rect(this._scrollTrackWidth, this._scrollTrackWidth)
            .fill('white')
            .stroke({ color: 'black', width: 2 })
            .move(0, this._scrollTrackHeight);

        //Up Arrow
        this._upArrow = this._group
            .polygon("10,-15 5,-5 15,-5")
            .fill('pink');

        //Down Arrow
        this._downArrow = this._group
            .polygon("10,5 5,-5 15,-5")
            .fill('pink')
            .move(5, this._scrollTrackHeight + 5);

        this.registerEvent(this._group);
    }

    //set the height of the scroll bar
    set scrollTrackHeight(value: number){
        this._scrollTrackHeight = value;
    }

    //TODO: get the position of the scroll thumb
    get scrollBarPosition() {
        return this._scrollThumbX, this._scrollThumbY;
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    idleupState(): void {
    }
    idledownState(): void {
    }
    pressedState(): void {
        if (this.rawEvent && this._group) {
            const point = this._group.root().point(this.rawEvent.clientX, this.rawEvent.clientY);
            //console.log(`Mouse moved to SVG coordinates: x=${point.x}, y=${point.y}`);
            this._scrollThumb.move(13, point.y)
            
            if (point.y < this._scrollThumbY) {
                console.log('Scroll log has moved up.')
            }
            else if (point.y > this._scrollThumbY) {
                console.log('Scroll log has moved down.')
            }
            this._scrollThumbX = point.x;
            this._scrollThumbY = point.y;
            }
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

export {scrollBar}