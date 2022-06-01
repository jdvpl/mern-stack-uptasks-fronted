export const dateFormat=date=>{
  const newdate=new Date(date)

  const options={
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric',
    hour:'numeric',
    minute:'numeric',

  }

  return newdate.toLocaleDateString('en-US',options)
}