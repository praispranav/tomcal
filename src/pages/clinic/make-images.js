import namor from 'namor';

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newImage = () => {
  const statusChance = Math.random()
  return {
    fileName: namor.generate({ words: 1, numbers: 0 }),
	filePath: namor.generate({ words: 1, numbers: 0 }),	
    user: namor.generate({ words: 1, numbers: 0 }),
    type: namor.generate({ words: 1, numbers: 0 }),
    reportFile: namor.generate({ words: 1, numbers: 0 }),
	reportFileName: namor.generate({ words: 1, numbers: 0 }),

    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeImages(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newImage(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}