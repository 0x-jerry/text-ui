function sleep(ts = 1000) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ts)
  })
}

const testStr =
  ' test <span style="color:red;"> abbc <span style="color: blue"> bccb <span style="color: green"> cccb </span> ttt </span> xxx </span> very cool'

const el = document.createElement('div')
el.innerHTML = `<span>${testStr}</span>`

const root = document.createElement('div')

document.body.append(root)

const cursor = document.createElement('span')
cursor.classList.add('cursor')

cursor.textContent = '|'

visitNode(el.firstChild as HTMLElement, root)
root.appendChild(cursor)

async function visitNode(node: HTMLElement, parent: HTMLElement) {
  const isNode = node.hasChildNodes()
  const el = isNode ? document.createElement(node.tagName) : null

  if (isNode) {
    parent.appendChild(el!)
    el!.style.color = node.style.color

    for (const n of Array.from(node.childNodes)) {
      await visitNode(n as HTMLElement, el!)
    }
  } else {
    const txt = document.createTextNode('')
    parent.appendChild(txt)

    for (const t of node.textContent!.split('')) {
      await sleep(100)
      txt.textContent += t
    }
  }
}
