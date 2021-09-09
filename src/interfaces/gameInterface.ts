import BoardInterface from './boardInterface';
import PieceInterface from './pieceInterface';
import RulesInterface from './rulesInterface';
import rulesInterface from './rulesInterface';
import { scopeType } from '../domain/chessTypes';

interface GameInterface extends RulesInterface<BoardInterface> {
    loadGameBoard(): void
    movePiece(piece: PieceInterface, board: BoardInterface, displacement: scopeType): void;
}

export {
    GameInterface
}