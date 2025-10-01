type coordinate = {
  x: number;
  y: number;
}

function distance(coorA: coordinate, coorB: coordinate) {
  return Math.max(Math.abs(coorA.x - coorB.x), Math.abs(coorA.y - coorB.y))
}

function entryTime(s: string, keypad: string): number {
  // Write your code here
  let coordinateMap = new Map()
  for (let i = 0; i < keypad.length; i++) {
      
      coordinateMap.set(keypad[i], {
          x: i % 3,
          y: (i - i % 3) / 3
      })
      
  }
  
//   console.log(coordinateMap)
  
  let totalDis = 0;
  for (let i = 0; i < s.length - 1; i++) {
    const dis = distance(coordinateMap.get(s[i]), coordinateMap.get(s[i+1]))
    console.log(`Distance between ${s[i]} and ${s[i+1]} is ${dis}`)
    totalDis += dis
  }
  
  return totalDis;
}

console.log(entryTime('423692', '923857614'), 'should be 8')