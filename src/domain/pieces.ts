import { identityPieceType, scopeType } from './chessTypes';

import AbstractPiece from './abstractPiece'
import pieceInterface from '../interfaces/pieceInterface';

class Peon extends AbstractPiece {
    protected id: number = 3;
    protected piece: identityPieceType = {'name': 'Peon', 'type': 3};
    protected startPosition: Array<scopeType> = [[1, -1]];
    protected movementFree: boolean = true;
    protected rangeX: number = 2;
    protected rangeY: number = 0;

    public afterFirstMove(): void 
    {
        this.rangeY = 1;
    }
}

class Caballo extends AbstractPiece {
    protected id: number = 2;
    protected piece: identityPieceType = {'name': 'Caballo', 'type': 2};
    protected startPosition: Array<scopeType> = [[0, 1], [0, 6]];
    protected movementFree: boolean = false;
    protected rangeX: number = 2;
    protected rangeY: number = 1;

    public afterFirstMove(): void 
    {}
}

class Rey extends AbstractPiece {
    protected id: number = 1;
    protected piece: identityPieceType = {'name': 'Rey', 'type': 1};
    protected startPosition: Array<scopeType> = [[0, 4]];
    protected movementFree: boolean = false;
    protected rangeX: number = 1;
    protected rangeY: number = 1;

    public afterFirstMove(): void 
    {}
}

export {
    Peon,
    Caballo,
    Rey
}