import { Caballo, Peon, Rey } from "./domain/pieces";
import { gameBoardType, piecesType } from "./domain/chessTypes";

import Board from "./domain/board";
import BoardInterface from './interfaces/boardInterface';
import ChessGame from "./application/chessGame";
import { GameInterface } from "./interfaces/gameInterface";

const initialPieces: piecesType = [new Peon(), new Caballo(), new Rey()];
const whiteBoard: BoardInterface = new Board(initialPieces);
const blackBoard: BoardInterface = new Board(initialPieces);
const gameBoard: gameBoardType = [whiteBoard, blackBoard];
const board: GameInterface = new ChessGame(gameBoard);

const whiteBoardPieces = whiteBoard.getGamePieces();
const blackBoardPieces = blackBoard.getGamePieces();
const boardPieces = [whiteBoardPieces, blackBoardPieces];
board.loadGameBoard();

if (boardPieces[0] && boardPieces[1]) {
    board.movePiece(boardPieces[0][1], whiteBoard, [2,0]);
    board.movePiece(boardPieces[0][2], whiteBoard, [1,0]);
}