import { boardMovementsType, boardType, freeSpaceType, movementType, piecesType, scopeType } from '../domain/chessTypes';

import PieceInterface from './pieceInterface';
import RulesInterface from './rulesInterface';

interface BoardMovements {
    getBoardMovements(): boardMovementsType;
    getLastBoardMovements(): movementType;
    pushNewPiecePositionOnBoard(movement: movementType): void;
    deleteLastPiecePositionOnBoard(): void;
    commitLastPiecePositionOnBoard(): void;
    calculateNewPositionByMovement(movement: movementType): scopeType;
}

export default interface BoardInterface extends RulesInterface<scopeType>, BoardMovements {
    getPositionFreeCharacter(): freeSpaceType;
    getBoardDimension(): number;
    getNullBoard(): boardType;
    getGameBoard(): boardType;
    getGamePieces(): piecesType;
    setGamePieces(pieces: piecesType): void;
    pushGamePiece(piece: PieceInterface): void;
    getInvertedGameBoard(): boardType;
    setBoard(board: boardType): boardType;
    displacePice(movement: movementType): void;
}