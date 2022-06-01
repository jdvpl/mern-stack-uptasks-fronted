export const dateFormat=dateFormat=>{
  let lol=[];
  let dateFull=dateFormat.split('.')[0]
  let fecha=dateFull.split('T')[0].split('-')
  let hora=dateFull.split('T')[1].split(':')
  lol.push(fecha);
  const newdate=new Date(lol)
  const options={
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric',
  }

  return newdate.toLocaleDateString('en-US',options)+'\n'+hora[0]+':'+hora[1]
}