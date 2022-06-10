const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element) => {
  element.addEventListener('click', deleteRapper)
})

Array.from(thumbText).forEach((element) => {
  element.addEventListener('click', addLike)
})

async function deleteRapper() {
  const rapName = this.parentNode.querySelector('.stageName').innerText
  const realName = this.parentNode.querySelector('.birthName').innerText
  try {
    const response = await fetch('deleteRapper', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stageNameS: rapName,
        birthNameS: realName,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}

async function addLike() {
  const rapName = this.parentNode.querySelector('.stageName').innerText
  const realName = this.parentNode.querySelector('.birthName').innerText
  const numLikes = Number(this.parentNode.querySelector('.likes').innerText)
  try {
    const response = await fetch('addOneLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stageNameS: rapName,
        birthNameS: realName,
        likeS: numLikes,
      }),
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}
