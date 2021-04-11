let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}



export function getRandomColor() {
  // const letters = '0123456789ABCDEF';
  // let color = '#';
  // for (let i = 0; i < 7; i++) 
  //   color += letters[Math.floor(Math.random() * 16)];
  // return color;
  // let random = function() {
  //   return Math.floor(Math.random() * (255 - 10)) + 10;
  // }
  
  // let color = `rgb(${random()}, ${random()}, ${random()})`;
  // return color;
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

export 	function dateCheck(startSlot,endSlot,start,end) {
  const fDate = new Date(start); 
  const startDate = new Date(startSlot);
  const endDate = new Date(endSlot);
  const lDate = new Date(end);
  
  if(Date.parse(startDate) <= Date.parse(lDate) && Date.parse(startDate) >= Date.parse(fDate)){
    alert("true");
    return true;
  }
  if(Date.parse(endDate) <= Date.parse(lDate) && Date.parse(endDate) >= Date.parse(fDate)){
    alert("true");
    return true;
  }
  //alert("false");
  return false;
}