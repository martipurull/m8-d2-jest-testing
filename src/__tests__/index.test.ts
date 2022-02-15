import { server } from '../server'
import supertest from 'supertest'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const request = supertest(server)

describe('Checking out jest in typscript', () => {
    it('should test that true is true', () => {
        expect(true).toBe(true)
    })
    test('that false is not true', () => {
        expect(false).not.toBe(true)
    })
})