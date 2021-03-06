import _ from 'lodash'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
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

  type cell = [number, number]

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
  const [openPosition, setOpenPosition] = useState(fieldClick)
  const [flagPosition, setFlagPosition] = useState(fieldClick)
  const [bombPosition, setBombPosition] = useState(fieldData)

  // prettier-ignore
  const directions: number[][] = [
    [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]
  ]
  const firstBombSet = (cell: cell) => {
    const fc = fieldComponet
    const arr1 = [...Array(8)].map((elm, idx) => idx)
    const arr2 = [...Array(8)].map((elm, idx) => idx)
    const minusX = cell[0] - 1 < 0 ? 0 : cell[0] - 1
    const plusX = cell[0] + 1 > fc.len ? fc.len : cell[0] + 1
    const minusY = cell[1] - 1 < 0 ? 0 : cell[1] - 1
    const plusY = cell[1] + 1 > fc.len ? fc.len : cell[1] + 1
    const arrAfter1: number[] = arr1.filter((e) => e < minusX || e > plusX)
    const arrAfter2: number[] = arr2.filter((e) => e < minusY || e > plusY)
    let arrComb: number[][] = []
    for (const num of arrAfter1) {
      for (const num2 of arrAfter2) {
        arrComb.push([num, num2])
      }
    }
    // ?????????????????????
    arrComb = _.shuffle(arrComb)
    // ?????????????????????????????????????????????????????????????????????
    const combGenerator = (function* () {
      yield* arrComb
    })()
    const bombSetFld = fieldData()
    const combList = [...Array(8)].map(() => combGenerator.next().value)
    for (const val of combList) {
      if (val === undefined) continue
      bombSetFld[val[0]][val[1]] = 99
      for (const direction of directions) {
        const newX = val[0] + direction[0] * 1
        const newY = val[1] + direction[1] * 1
        if (newX < 0 || newY < 0 || newX > fc.len - 1 || newY > fc.len + fc.margin - 1) continue
        if (bombSetFld[newX][newY] != 99) bombSetFld[newX][newY] += 1
      }
    }
    return bombSetFld
  }

  const displayData = (x: number, y: number) => {
    const isPanelOpen = openPosition[x][y]
    const isFlag = flagPosition[x][y]
    const bombN = bombPosition[x][y]
    if (isFlag) return '???'
    if (!isPanelOpen) return ''
    let data = String(bombN)
    if (bombN === 99) data = '???'
    if (bombN === 0) data = ''
    return data
  }

  const revealCells = (openPosition: boolean[][], bombField: number[][], cell: cell) => {
    const fc = fieldComponet
    const side = fc.len + fc.margin
    const x = cell[0]
    const y = cell[1]
    openPosition[x][y] = true
    if (bombField[x][y] > 0) return openPosition
    for (const direction of directions) {
      const newX = x + direction[0] * 1
      const newY = y + direction[1] * 1
      if (newX < 0 || newY < 0 || newX > fc.len - 1 || newY > side - 1) continue
      if (openPosition[newX][newY] === true) continue
      revealCells(openPosition, bombField, [newX, newY])
    }
    return openPosition
  }

  const [isBegin, setIsBegin] = useState(false)

  const beginCheck = (isBegin: boolean, cell: cell) => {
    return new Promise<number[][]>((resolve, reject) => {
      if (!isBegin) {
        const bombField = firstBombSet(cell)
        setIsBegin(true)
        return resolve(bombField)
      }
      return resolve(bombPosition)
    })
  }

  const successCheck = (bombField: number[][], openPosition: boolean[][]) => {
    const fc = fieldComponet
    openPosition
      .flat()
      .map((elm, idx) => {
        return elm
          ? { row: Math.floor(idx / 10), col: idx % 10, val: elm }
          : { row: -1, col: -1, val: elm }
      })
      .filter((x) => x.val)
      .forEach((item) => {
        if (bombField[item.row][item.col] === 99) {
          alert('????????????')
          return false
        }
      })
    const closeN = openPosition.flat().filter((e) => !e).length
    if (fc.bomb === closeN) alert('????????????')
  }

  const openPanel = (cell: cell, isBegin: boolean) => {
    beginCheck(isBegin, cell).then((check) => {
      // bombPosition??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
      let newField = JSON.parse(JSON.stringify(openPosition))
      const bombField = check
      setBombPosition(bombField)
      newField = revealCells(newField, bombField, cell)
      setOpenPosition(newField)
    })
  }

  const clear = () => {
    setOpenPosition(fieldClick())
    setFlagPosition(fieldClick())
    setIsBegin(false)
  }
  const flagSet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cell: cell) => {
    e.preventDefault()
    const newFlagP: boolean[][] = JSON.parse(JSON.stringify(flagPosition))
    newFlagP[cell[0]][cell[1]] = true
    setFlagPosition(newFlagP)
  }

  useEffect(() => {
    successCheck(bombPosition, openPosition)
  })

  return (
    <Container>
      <Head>
        <title>Minesweeper study</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Main>
        <button onClick={clear}>?????????</button>
        <Grid>
          {openPosition.map((row, x) =>
            row.map((col, y) => (
              <Area
                key={`${x}-${y}`}
                clicked={col}
                onClick={() => openPanel([x, y], isBegin)}
                onContextMenu={(e) => flagSet(e, [x, y])}
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
