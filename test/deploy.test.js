import Computer from '../index'

const opts = {
  seed: 'replace this seed', // use any bip39 passphrase, eg from https://iancoleman.io/bip39/
  chain: 'BSV', //  'BSV' or 'BCH'
  network: 'testnet', // 'testnet' or 'mainnet'
}

describe('Deployment smoke tests', () => {
  test('library export', () => {
    expect(Computer).toBeDefined()
    expect(typeof Computer).toBe('function')
  })

  test('computer object creation', async () => {
    const computer = new Computer(opts)
    expect(computer).toBeDefined()
    expect(computer.db).toBeDefined()
    expect(computer.db.wallet).toBeDefined()
  })

  test('smart object creation and update', async () => {
    class Counter {
      constructor() {
        this.n = 1
      }
      inc(m) {
        this.n += m
      }
    }

    const computer = new Computer(opts)
    const counter = await computer.new(Counter, [])
    await counter.inc(2)
    expect(counter).toBeDefined()
    expect(counter).toEqual({
      _id: expect.any(String),
      _rev: expect.any(String),
      n: 3
    })
  }, 20000)
})
