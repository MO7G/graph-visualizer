import { final } from './final.js'

export class Graph{
    constructor(){
        this.board = [];
        this.source = null;
        this.target = null;
    }
    
    update(cell,color){
        switch(color){
            case final.SOURCE_COLOR:
                if(this.source){
                    this.source.update(final.CLEAR_COLOR);
                }
                this.source = cell;
                this.source.update(final.SOURCE_COLOR)
                break;
            case final.TARGET_COLOR:
                if(this.target){
                    this.target.update(final.CLEAR_COLOR);
                }
                this.target = cell;
                this.target.update(final.TARGET_COLOR);
                break;
            default:
                cell.update(color);
            }
    }

    DestroyBoard(){
        this.source = null;
        this.target = null;
        this.board.forEach(function (row){
            row.forEach(function(cell){
                cell.clear();
            })
        })
    }


}