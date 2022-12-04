const btn = document.createElement('button')
btn.innerText = 'Say it'
btn.onclick = function() {
  chrome.runtime.sendMessage({ msg: 'speech', text: 'hello tiktok' })
}
document.body.append(btn)
