import { gameBoardType, movementType, scopeType } from "../domain/chessTypes";

import BoardInterface from "../interfaces/boardInterface";
import { GameInterface } from "../interfaces/gameInterface";
import PieceInterface from "../interfaces/pieceInterface";

export default class ChessGame implements GameInterface {
    private gameBoard: gameBoardType;

    constructor(gameBoard: gameBoardType) {
        this.gameBoard = gameBoard;
    }

    movePiece(piece: PieceInterface, board: BoardInterface, displacement: scopeType): void {
        const newMovement: movementType = {
            piece: piece,
            displacement: displacement
        };
        board.pushNewPiecePositionOnBoard(newMovement);
        piece.checkValidity(displacement);
        board.checkValidity(board.calculateNewPositionByMovement(newMovement));

        console.log('MOVING PIECE ', [piece.getPiece().name, piece.getId()])
        board.commitLastPiecePositionOnBoard();
        console.log(board.getGameBoard())

        if (!piece.isFirstMovePerformed) {
            piece.afterFirstMove();
            piece.isFirstMovePerformed = true;
        }
    }
    
    checkValidity(gameBoard: BoardInterface): boolean {
        const board = gameBoard.getGameBoard();
        const boardNull = gameBoard.getNullBoard();
        
        if (JSON.stringify(board) === JSON.stringify(boardNull)) {
            throw new Error("Null board is not permited.");
        }
        
        return true
    }

    loadGameBoard(): void {
        this.gameBoard.forEach((board: BoardInterface) => {
            this.checkValidity(board);
        });
        console.log('------------------ Starting new game... ------------------')
        console.log('White pieces board!')
        console.log(this.gameBoard[0].getGameBoard())
        console.log('Black pieces board!')
        console.log(this.gameBoard[1].getInvertedGameBoard())
        console.log('------------------ New game started... ------------------')
    }
}