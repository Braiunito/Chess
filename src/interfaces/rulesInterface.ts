import { scopeType } from '../domain/chessTypes'

export default interface RulesInterface<T> {
    checkValidity(object: T): boolean;
}