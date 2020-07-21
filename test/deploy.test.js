import Computer from '../index'

const opts = {
  seed: process.env.BC_SEED,
  chain: process.env.BC_CHAIN,
  network: process.env.BC_NETWORK,
}

describe('Deployment smoke tests', () => {
  test('library export', () => {
    expect(Computer).toBeDefined()
    expect(typeof Computer).toBe('function')
  })

  test('computer object creation', async () => {
    const opts = {
      seed: process.env.BC_SEED,
      chain: process.env.BC_CHAIN,
      network: process.env.BC_NETWORK,
    }
    const computer = new Computer(opts)
    expect(computer).toBeDefined()
    expect(computer.db).toBeDefined()
    expect(computer.db.wallet).toBeDefined()
  })

  test('smart object creation', async () => {
    class A {
      constructor() {
        this.n = 1
      }
    }

    const computer = new Computer(opts)

    const a = await computer.new(A, [])
    expect(a).toBeDefined()
    expect(a).toEqual({
      _id: expect.any(String),
      _rev: expect.any(String),
      n: 1
    })
  })

  test('smart object update', async () => {
    class Counter {
      constructor() {
        this.n = 1
      }
      inc(m) {
        this.n += m
      }
    }

    const computer = new Computer(opts)

    try {
      const counter = await computer.new(Counter, [])
      await counter.inc(2)
      expect(counter).toBeDefined()
      expect(counter).toEqual({
        _id: expect.any(String),
        _rev: expect.any(String),
        n: 3
      })
    } catch (error) {
      if (error.response && error.response.data === '258: txn-mempool-conflict')
        throw new Error(`Node Error 258: txn-mempool-conflict.

Running all tests at once broadcast too many transactions for the Bitcoin node to handle.
Try again in a few minutes or try run the failing test in isolation (using "test.only").`)
      throw error
    }
  }, 10000)
})
