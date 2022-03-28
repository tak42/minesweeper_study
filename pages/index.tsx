import _ from 'lodash'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  margin-top: 3rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`

const Area = styled.div<{ clicked: boolean }>`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  background-color: ${(props) => (props.clicked ? 'transparent' : 'green')};
  text-align: center;
  line-height: 50px;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;

  a {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
`

const Logo = styled.span`
  height: 1em;
  margin-left: 0.5rem;
`

const Home: NextPage = () => {
  const [level, setLevel] = useState(0)

  const fieldComponet = useMemo(() => {
    return {
      len: level < 1 ? 8 : 14,
      margin: level < 1 ? 2 : 4,
      bomb: level < 1 ? 8 : 16,
    }
  }, [level])

  const fieldData = () => {
    const fc = fieldComponet
    return [...Array(fc.len)].map(() => [...Array(fc.len + fc.margin)].map(() => 0))
  }

  const fieldClick = () => {
    const fc = fieldComponet
    return [...Array(fc.len)].map(() => [...Array(fc.len + fc.margin)].map(() => false))
  }
  const [field, setField] = useState(fieldClick)
  const [bombPosition, setBombPosition] = useState(fieldData)
  const shuffle = (max: number, min: number) => {
    const fc = fieldComponet
    const arr = [...Array(fc.bomb)].map((elm, idx) => idx)
    let a = arr.length
    while (a) {
      const j = Math.floor(Math.random() * (max - min)) + min
      const t = arr[--a]
      arr[a] = arr[j]
      arr[j] = t
    }
    return arr
  }
  // 与えられた配列の要素を、同じ要素は返さないようにランダムに取得する関数を返す（高階）関数
  const randomNextMaker = (ary: number[]) => {
    // 引数のary のコピーを作成
    ary = [...ary]
    return () => {
      // 配列が空になっている場合
      if (ary.length === 0) return { done: true }
      // 0以上 ary.length-1以下の整数を取得
      const randomIndex = Math.floor(Math.random() * ary.length)
      // 返却すべき要素を取得
      const value = ary[randomIndex]
      // randomIndexの位置の要素を除去
      ary.splice(randomIndex, 1)
      return { value, done: false }
    }
  }
  const firstBombSet = () => {
    const fc = fieldComponet
    // movieComb の重複無しランダム取得関数を得る。
    const nextComb = randomNextMaker([0, 1, 2, 3, 4, 5, 6, 7])
    for (let i = 0; i < 8; i++) {
      console.log(nextComb())
    }
    const arr1 = [...Array(8)].map((elm, idx) => idx)
    const arr2 = [...Array(8)].map((elm, idx) => idx)
    const arrAfter1: number[] = arr1.filter((e) => e < 0 || e > 2)
    const arrAfter2: number[] = arr2.filter((e) => e < 1 || e > 3)
    let arrComb = []
    for (const num of arrAfter1) {
      for (const num2 of arrAfter2) {
        arrComb.push([num, num2])
      }
    }
    // シャッフルする
    arrComb = _.shuffle(arrComb)
    // 次の組み合わせを得るためのジェネレーターを作成
    const combGenerator = (function* () {
      yield* arrComb
    })()
    const bombSetFld = fieldData()
    for (let i = 0; i < 8; i++) {
      const nextObj = combGenerator.next()
      const val = nextObj.value
      if (val === undefined) {
        continue
      }
      bombSetFld[val[0]][val[1]] = 99
      for (const direction of directions) {
        const newX = val[0] + direction[0] * 1
        const newY = val[1] + direction[1] * 1
        if (newX < 0 || newY < 0 || newX > fc.len - 1 || newY > fc.len + fc.margin - 1) break
        if (bombSetFld[newX][newY] != 99) bombSetFld[newX][newY] += 1
      }
    }
    setBombPosition(bombSetFld)
  }
  // prettier-ignore
  const directions: number[][] = [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]
  ]

  const bombSet = (x: number, y: number) => {
    const fc = fieldComponet
    const a1 = shuffle(x + 1, x - 1)
    const a2 = shuffle(y + 1, y - 1)
    const bombSetFld = fieldData()
    for (let i = 0; i < fc.len; i++) {
      const x = a1[i]
      const y = a2[i]
      bombSetFld[x][y] = 99
      for (const direction of directions) {
        const newX = x + direction[0] * 1
        const newY = y + direction[1] * 1
        if (newX < 0 || newY < 0 || newX > fc.len - 1 || newY > fc.len + fc.margin - 1) break
        if (bombSetFld[newX][newY] != 99) bombSetFld[newX][newY] += 1
      }
    }
    return bombSetFld
  }

  const displayData = (x: number, y: number) => {
    const isPanelOpen = field[x][y]
    const bombN = bombPosition[x][y]
    if (!isPanelOpen) return ''
    return bombN === 99 ? <i className="fas fa-bomb fa-lg" /> : bombN
  }

  const zeroOpen = (field: boolean[][], x: number, y: number) => {
    const fc = fieldComponet
    const candidates = []
    const side = fc.len + fc.margin
    // 1.まずはクリックされた0と隣り合う1以上のマスを探す
    // 2.1のものが存在するまで探す
    // 3.探索を中止して1以上のマスまでをオープンする
    if (bombPosition[x][y] > 0) return false
    // for (const direction of directions) {
    //   const newX = x === fc.len - 1 || x === 0 ? x : x + direction[0]
    //   const newY = y === side - 1 || y === 0 ? y : y + direction[1]
    //   if (!bombPosition[newX][newY]) field[newX][newY] = true
    // }
    for (let i = 0; i < fc.len; i++) {
      for (let l = 0; l < side; l++) {
        if (!bombPosition[i][l]) field[i][l] = true
      }
    }
    return field
  }
  const [isBegin, setIsBegin] = useState(false)

  const beginCheck = (isBegin: boolean) => {
    return new Promise((resolve, reject) => {
      if (!isBegin) {
        firstBombSet()
        setIsBegin(true)
      }
      resolve
    })
  }
  const openPanel = (x: number, y: number, isBegin: boolean) => {
    console.log(isBegin)
    beginCheck(isBegin).then(() => {
      let newField = JSON.parse(JSON.stringify(field))
      if (bombPosition[x][y] === 0) newField = zeroOpen(newField, x, y)
      newField[x][y] = true
      setField(newField)
    })
  }

  const clear = () => {
    setField(fieldClick())
    // setBombPosition(bombSet)
  }

  return (
    <Container>
      <Head>
        <title>Minesweeper study</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="favicon.ico" />
        <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet" />
      </Head>

      <Main>
        <button onClick={clear}>クリア</button>
        <Grid>
          {field.map((row, x) =>
            row.map((col, y) => (
              <Area
                key={`${x}-${y}`}
                clicked={field[x][y]}
                onClick={() => openPanel(x, y, isBegin)}
              >
                {displayData(x, y)}
              </Area>
            ))
          )}
        </Grid>
      </Main>

      <Footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Logo>
            <img src="vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </Logo>
        </a>
      </Footer>
    </Container>
  )
}

export default Home
