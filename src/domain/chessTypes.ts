import BoardInterface from "../interfaces/boardInterface";
import { Peon } from "./pieces";
import PieceInterface from "../interfaces/pieceInterface";

type freeSpaceType = string | 0;
type scopeType = [x: number, y: number];
type pieceType = number | freeSpaceType;
type identityPieceType = {'type': number, 'name': string};
type piecesType = Array<PieceInterface> | null;

type movementType = { piece: PieceInterface, displacement: scopeType };
type gameBoardType = [whitePieces: BoardInterface, blackPieces: BoardInterface];
type boardMovementsType = Array<movementType>;
type boardType = Array<Array<number | freeSpaceType>>;

export type {
    scopeType,
    piecesType,
    identityPieceType,
    pieceType,
    freeSpaceType,
    boardType,
    boardMovementsType,
    gameBoardType,
    movementType
}