const assert = require('assert')

const K = require('../../lib/constants')
const Tokenizer = require('../../lib/tokenizer')

/* global describe it */
describe('Tokenizer', () => {
    it('should return [] when the input is \'\'', () => {
        assert.deepEqual(Tokenizer(''), [])
    })

    it('should return PLAIN token when the input is a plain string', () => {
        assert.deepEqual(Tokenizer('hello'), [{ type: K.TOKEN_PLAIN, value: 'hello' }])
    })

    it('should return EXPRESSION token when the input is \'[[ ... ]]\'', () => {
        assert.deepEqual(Tokenizer('[[ x ]]'), [{ type: K.TOKEN_EXPRESSION, value: 'x' }])
    })

    it('should return FOR token when the input is \'[[ for ... ]]\'', () => {
        assert.deepEqual(Tokenizer('[! for x in xs !]'), [{ type: K.TOKEN_FOR, value: 'x in xs' }])
    })

    it('should return EFOR token when the input is \'[[ efor ]]\'', () => {
        assert.deepEqual(Tokenizer('[! efor !]'), [{ type: K.TOKEN_EFOR, value: null }])
    })

    it('should return IF token when the input is \'[[ if ... ]]\'', () => {
        assert.deepEqual(Tokenizer('[! if x === 1 !]'), [{ type: K.TOKEN_IF, value: 'x === 1' }])
    })

    it('should return ELSEIF token when the input is \'[[ else if ... ]]\'', () => {
        assert.deepEqual(Tokenizer('[! else if y === 2 !]'), [{ type: K.TOKEN_ELSEIF, value: 'y === 2' }])
    })

    it('should return ELSE token when the input is \'[[ else ]]\'', () => {
        assert.deepEqual(Tokenizer('[! else !]'), [{ type: K.TOKEN_ELSE, value: null }])
    })

    it('should return EIF token when the input is \'[[ eif ]]\'', () => {
        assert.deepEqual(Tokenizer('[! eif !]'), [{ type: K.TOKEN_EIF, value: null }])
    })

    it('should return array of tokens from external file when the input is \'[@ ... @]\'', () => {
        assert.deepEqual(Tokenizer('[@ test/text.txt @]'), Tokenizer('Hello [[ name ]]!\n'))
    })

    it('should return PLAIN token for exmpty whitespace', () => {
        assert.deepEqual(Tokenizer(' '), [{ type: K.TOKEN_PLAIN, value: ' ' }])
    })

    it('should return same EXPRESSION token regardless of whitespace', () => {
        assert.deepEqual(Tokenizer('[[x]]'), Tokenizer('[[x]]'))
    })

    it('should return same FOR token regardless of whitespace', () => {
        assert.deepEqual(Tokenizer('[!for x in xs!]'), Tokenizer('[! for x in xs !]'))
    })

    it('should return same EFOR token regardless of whitespace', () => {
        assert.deepEqual(Tokenizer('[!efor!]'), Tokenizer('[! efor !]'))
    })

    it('should return same IF token regardless of whitespace', () => {
        assert.deepEqual(Tokenizer('[!if x === 1!]'), Tokenizer('[! if x === 1 !]'))
    })

    it('should return same ELSEIF token regardless of whitespace', () => {
        assert.deepEqual(Tokenizer('[!else if y === 2!]'), Tokenizer('[! else if y === 2 !]'))
    })

    it('should return same ELSE token regardless of whitespace', () => {
        assert.deepEqual(Tokenizer('[!else!]'), Tokenizer('[! else !]'))
    })

    it('should return same EIF token regardless of whitespace', () => {
        assert.deepEqual(Tokenizer('[!eif!]'), Tokenizer('[! eif !]'))
    })
})