import { identityPieceType, scopeType } from '../domain/chessTypes'

import RulesInterface from './rulesInterface';

interface PieceMovenetsInterface {
    getStartPositions(): Array<scopeType>;
    getMovementFree(): boolean;
    getLimitRange(): scopeType;
    getRangeX(): number;
    getRangeY(): number;
    setPositionOnBoard(position: scopeType): void;
    getPositionOnBoard(): scopeType;
    afterFirstMove(): void;
}

export default interface PieceInterface extends RulesInterface<scopeType>, PieceMovenetsInterface {
    isFirstMovePerformed: boolean;
    getNewCopy(): PieceInterface,
    getPiece(): identityPieceType; 
    getId(): number;
    setId(id: number): void;
}