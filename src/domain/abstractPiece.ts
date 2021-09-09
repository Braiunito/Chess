import { identityPieceType, scopeType } from './chessTypes'

import PieceInterface from '../interfaces/pieceInterface'
import RulesInterface from '../interfaces/rulesInterface'

export default abstract class AbstractPiece implements PieceInterface {
    public isFirstMovePerformed: boolean = false;
    newPositionOnBoard: scopeType[] = [];
    protected abstract readonly startPosition: Array<scopeType>;
    protected abstract readonly movementFree: boolean;
    protected abstract readonly piece: identityPieceType;
    protected abstract rangeX: number;
    protected abstract rangeY: number;
    protected positionOnBoard: scopeType = [0, 0];
    protected id: number = 0;

    public abstract afterFirstMove(): void;

    public getNewCopy(child: PieceInterface = this): PieceInterface {
        const copy = Reflect.construct(child.constructor, []);
        return copy;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getPositionOnBoard(): scopeType {
        return this.positionOnBoard;
    }

    getPiece(): identityPieceType {
        return this.piece;
    }

    getStartPositions(): Array<scopeType>
    {
        return this.startPosition;
    }
    
    getLimitRange(): scopeType
    {
        return [this.rangeX, this.rangeY];
    }

    getMovementFree(): boolean {
        return this.movementFree;
    }
    
    getRangeX(): number {
        return this.rangeX;
    }

    getRangeY(): number {
        return this.rangeY;
    }

    setPositionOnBoard(position: scopeType): void {
        this.positionOnBoard = position;
    }
    
    checkValidity(movement: scopeType): boolean {
        if (!this.isValidMovement(movement)) {
            throw new Error(`Invalid movement, can move as maximum of 
            X: ${this.getLimitRange()[0].toString()}
            Y: ${this.getLimitRange()[1].toString()}
            from: ${this.getPositionOnBoard().toString()}`);
        }
        
        return true;
    }

    isValidMovement(movement: scopeType): boolean
    {
        const movementAbs: scopeType = [Math.abs(movement[0]), Math.abs(movement[1])];
        const limitRange: scopeType = this.getLimitRange();
        const canMove: boolean = this.movementFree ? (movementAbs[0] <= limitRange[0] && movementAbs[1] <= limitRange[1]) : movementAbs === limitRange;
        console.log('evaluating movement');
        console.log(movementAbs);
        console.log(limitRange);
        console.log(canMove);
        
        return canMove;
    }
}