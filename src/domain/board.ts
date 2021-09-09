import { boardMovementsType, boardType, freeSpaceType, movementType, pieceType, piecesType, scopeType } from "./chessTypes";

import BoardInterface from "../interfaces/boardInterface";
import PieceInterface from "../interfaces/pieceInterface";

export default class Board implements BoardInterface {
    private boardMovements: boardMovementsType = [];
    private readonly positionFreeCharacter = 0;
    private readonly dimension: number = 8;
    private pieces: piecesType;
    private board: boardType;
    
    constructor(pieces: piecesType = null, board?: boardType) {
        this.board = this.constructorBoard(board);
        this.pieces = this.constructorPieces(pieces);
    }

    commitLastPiecePositionOnBoard(): void {
        const lastMovement = this.getLastBoardMovements(); 
        console.log('last', this.getLastBoardMovements());
        this.displacePice({
            piece: lastMovement.piece, 
            displacement: lastMovement.displacement
        })
    }
    
    getBoardMovements(): boardMovementsType {
        return this.boardMovements;
    }

    getLastBoardMovements(): movementType {
        const lastIndex = this.boardMovements.length - 1;
        return this.getBoardMovements()[lastIndex];
    }

    calculateNewPositionByMovement(movement: movementType): scopeType 
    {
        const oldPiecePosition: scopeType = movement.piece.getPositionOnBoard();
        const posXold: number = oldPiecePosition[0];
        const posYold: number = oldPiecePosition[1];
        const posX: number = posXold + movement.displacement[0];
        const posY: number = posYold + movement.displacement[1];
        const newPosition: scopeType = [posX, posY]; 
        return newPosition
    }
    
    pushNewPiecePositionOnBoard(movement: movementType): void {
        this.boardMovements.push(movement);
    }

    deleteLastPiecePositionOnBoard(): void {
        this.boardMovements.splice(-1, 1);
    }

    getPositionFreeCharacter(): freeSpaceType
    {
        return this.positionFreeCharacter;
    }

    private constructorBoard(board?: boardType): boardType 
    {
        if (board) {
            board = this.setBoard(board);
        } else {
            board = this.initializeBoard();
        }

        return board;
    }

    private constructorPieces(pieces: piecesType): piecesType 
    {
        this.initializePieces(pieces);
        const newPieces: piecesType = this.getGamePieces();
        return newPieces;
    }

    fillRow(positionX: number, piece: PieceInterface): void {
        for (let i = 0; i < this.board[positionX].length; i++) {
            const newPiece = piece.getNewCopy();
            this.displacePice({
                piece: newPiece, 
                displacement: [positionX, i]
            })
            this.pushGamePiece(newPiece);
        }
    }

    fillColumn(positionY: number, piece: PieceInterface): void {
        for (let i = 0; i < this.board.length; i++) {
            const newPiece = piece.getNewCopy();
            this.displacePice({
                piece: newPiece, 
                displacement: [i, positionY]
            })
            this.pushGamePiece(newPiece);
        }
    }
    
    getNullBoard(): boardType {
        return new Board().getGameBoard();
    }

    getGameBoard(): boardType {
        return this.board;
    }
    
    getInvertedGameBoard(): boardType {
        const invertedBoard: boardType = this.board.reverse();
        invertedBoard.forEach((rows, posY) => {
            invertedBoard[posY] = rows.reverse();
        });
        const newBoard: BoardInterface = new Board(this.pieces, invertedBoard); 
        this.board.reverse();
        return newBoard.getGameBoard();
    }

    getGamePieces(): piecesType {
        return this.pieces;
    }

    setGamePieces(pieces: piecesType): void {
        this.pieces = pieces;
    }

    pushGamePiece(piece: PieceInterface): void {
        if (this.pieces == null) {
            this.pieces = [];
        }
        
        const indedx = this.pieces.length;
        piece.setId(indedx);
        this.pieces.push(piece);
    }

    initializePieces(pieces: piecesType): void {
        if (pieces) {
            pieces.forEach((piece: PieceInterface) => {
                const pieceClassName = piece.constructor.name;
                const startPositions = piece.getStartPositions();
                let posX = 0;
                let posY = 0;
                startPositions.forEach((position, index) => {
                    let newPiece = piece.getNewCopy();
                    piece.setId(index);
                    if (position[0] != -1 && position[1] != -1) {
                        let newPosition: scopeType = [position[0], position[1]]; 
                        this.displacePice({
                            piece: newPiece, 
                            displacement: newPosition
                        })
                        this.pushGamePiece(newPiece);
                    } else {
                        if (position[0] === -1) {
                            this.fillColumn(position[1], newPiece);
                        }
                        if (position[1] === -1) {
                            this.fillRow(position[0], newPiece);
                        }
                    }
                });
            });
        }
    }

    initializeBoard(): boardType {
        const pieces: piecesType = this.getGamePieces();
        let newBoard = [];
        
        for (let i = 0; i < this.dimension; i++) {
            let posX = new Array(this.dimension).fill(0);
            newBoard.push(posX);
        }
        
        return newBoard;
    }

    setBoard(board: boardType): boardType {
        this.board = board;
        return board;
    }

    displacePice(movement: movementType): void {
        const currentPiecePosition: scopeType = movement.piece.getPositionOnBoard();
        const newPositionOnBoard: scopeType = this.calculateNewPositionByMovement(movement);
        
        const posXcurrent: number = currentPiecePosition[0];
        const posYcurrent: number = currentPiecePosition[1];
        
        const posX: number = newPositionOnBoard[0];
        const posY: number = newPositionOnBoard[1];
        
        this.board[posXcurrent][posYcurrent] = this.getPositionFreeCharacter();
        movement.piece.setPositionOnBoard([posX, posY]);
        this.board[posX][posY] = movement.piece.getPiece().type;
    }

    getPieceByPosition(position: scopeType): pieceType {
        const posX: number = position[0];
        const posY: number = position[1];
        return this.getGameBoard()[posX][posY];
    }

    checkValidity(position: scopeType): boolean {
        const value = this.getPieceByPosition(position);
        
        if (value !== this.getPositionFreeCharacter()) {
            console.log(value,  position)
            throw new Error("Invalid movement, space occupied");
        }
        
        return true;
    }

    getBoardDimension(): number {
        return this.dimension;
    }
}